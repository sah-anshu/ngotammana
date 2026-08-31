/**
 * One-off migration: reads the HTTrack archive at ../ngotammana and produces
 *   - public/images/**            normalized copies of every media file
 *   - src/data/*.json             typed content extracted from the archive HTML
 *
 * Re-runnable and idempotent. Run with: npm run extract
 */
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'node-html-parser'
import sharp from 'sharp'

import { resolveEventDates } from './lib/event-dates.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const ARCHIVE = path.resolve(ROOT, '..', 'ngotammana')
const OUT_DATA = path.join(ROOT, 'src', 'data')
const OUT_IMG = path.join(ROOT, 'public', 'images')

if (!fs.existsSync(ARCHIVE)) throw new Error(`Archive not found at ${ARCHIVE}`)

/* ------------------------------------------------------------------ media */

/**
 * Every source photo is re-encoded to WebP. The archive's JPEGs are unoptimised
 * camera/scan output (167 MB in total, some over 4000px wide) for images that
 * are never displayed larger than about 800px.
 */
const WEBP_QUALITY = 82

/**
 * Width caps, chosen from how large each image is actually displayed. The
 * carousel is full-bleed and needs to hold up on a wide retina screen; every
 * other image sits in a tile or a floated column no wider than about 420 CSS px,
 * so 1000px still leaves better than 2x headroom.
 */
const CAROUSEL_WIDTH = 1600
const DEFAULT_WIDTH = 1000

const maxWidthFor = (publicRel) =>
  publicRel.startsWith('home/carousel/') ? CAROUSEL_WIDTH : DEFAULT_WIDTH


// Archive directory names that get a friendlier name in public/.
const DIR_ALIASES = {
  'main icon': 'brand',
  carousel_images: 'carousel',
  our_founder: 'founder',
  'other activities': 'other',
  'corona drives': 'corona-drives',
  'project yakeen': 'project-yakeen',
  'go green': 'go-green',
}
// Individual files worth naming by hand (they are referenced directly from JSX).
const FILE_ALIASES = {
  'main icon/default-iconngo.png': 'brand/logo.png',
  'home/teamphoto.jpg': 'home/team-photo.jpg',
}

const slug = (s) => s.toLowerCase().replace(/[_\s]+/g, '-')

/** Source extensions are dropped: everything is emitted as .webp. */
const toWebp = (file) => file.replace(/\.[^.]+$/, '') + '.webp'

/** archive-relative path (below images/) -> public path below /images */
function normalizeImagePath(rel) {
  const lower = rel.split(path.sep).join('/').toLowerCase()
  if (FILE_ALIASES[lower]) return toWebp(FILE_ALIASES[lower])
  const segs = lower.split('/')
  const file = segs.pop()
  const dirs = segs.map((d) => DIR_ALIASES[d] ?? slug(d))
  return toWebp([...dirs, slug(file)].join('/'))
}

function walk(dir, base = dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, base, out)
    else out.push(path.relative(base, full))
  }
  return out
}

/** lowercased archive-relative path -> { src, width, height } */
const media = new Map()

async function copyMedia() {
  const srcDir = path.join(ARCHIVE, 'images')
  const files = walk(srcDir)
  const skipped = []
  let sourceBytes = 0
  let outputBytes = 0
  let resized = 0

  // Clear only the top-level folders this run regenerates, so that an earlier
  // run's naming or format leaves nothing behind — while images added by hand
  // for pages the archive has no content for (public/images/whats-next, say)
  // survive.
  const generatedRoots = new Set(
    files
      .filter((rel) => /\.(jpe?g|png|gif|webp|tiff?)$/i.test(rel))
      .map((rel) => normalizeImagePath(rel).split('/')[0]),
  )
  for (const root of generatedRoots) {
    fs.rmSync(path.join(OUT_IMG, root), { recursive: true, force: true })
  }

  const jobs = files.map(async (rel) => {
    // The archive contains one bogus ".html" file inside images/ (an HTTrack artifact).
    if (!/\.(jpe?g|png|gif|webp|tiff?)$/i.test(rel)) {
      skipped.push(rel)
      return
    }
    const from = path.join(srcDir, rel)
    const publicRel = normalizeImagePath(rel)
    const to = path.join(OUT_IMG, publicRel)

    fs.mkdirSync(path.dirname(to), { recursive: true })

    const input = fs.readFileSync(from)
    sourceBytes += input.length

    const pipeline = sharp(input).rotate() // honour EXIF orientation
    const meta = await pipeline.metadata()

    const maxWidth = maxWidthFor(publicRel)

    if (meta.width && meta.width > maxWidth) {
      pipeline.resize({ width: maxWidth, withoutEnlargement: true })
      resized++
    }

    // The logo is line art with lettering; lossy encoding smears its edges and
    // it is only a few KB either way.
    const isLogo = publicRel.startsWith('brand/')
    const { data, info } = await pipeline
      .webp(isLogo ? { lossless: true, effort: 6 } : { quality: WEBP_QUALITY, effort: 5 })
      .toBuffer({ resolveWithObject: true })

    fs.writeFileSync(to, data)
    outputBytes += data.length

    media.set(rel.split(path.sep).join('/').toLowerCase(), {
      src: '/images/' + publicRel,
      width: info.width,
      height: info.height,
    })
  })

  // Encoding is CPU-bound; run it in batches so sharp's thread pool stays busy
  // without holding every source file in memory at once.
  const BATCH = 24
  for (let i = 0; i < jobs.length; i += BATCH) {
    await Promise.all(jobs.slice(i, i + BATCH))
    console.log(`  encoded ${Math.min(i + BATCH, jobs.length)}/${jobs.length}`)
  }


  const mb = (n) => (n / 1024 / 1024).toFixed(1)
  console.log(
    `media: ${media.size} images -> webp, ${resized} downscaled, ` +
      `${mb(sourceBytes)}MB -> ${mb(outputBytes)}MB ` +
      `(${Math.round((1 - outputBytes / sourceBytes) * 100)}% smaller)`,
  )
  if (skipped.length) console.log(`media: skipped ${skipped.length} (${skipped.join(', ')})`)
}

/* ----------------------------------------------------------------- helpers */

const readHtml = (rel) => parse(fs.readFileSync(path.join(ARCHIVE, rel), 'utf8'))

/** The unique per-page region; every page shares identical chrome outside it. */
const mainOf = (root) => {
  const main = root.querySelector('main[role="main"]')
  if (!main) throw new Error('no <main role="main"> found')
  return main
}

const clean = (s) => (s ?? '').replace(/\s+/g, ' ').trim()

/**
 * Resolve an <img src> from the archive (e.g. "../Images/Gallery/Events/172.jpg",
 * possibly percent-encoded) to the copied public asset.
 */
function resolveImage(src) {
  if (!src) return null
  const decoded = decodeURIComponent(src)
  const i = decoded.toLowerCase().indexOf('images/')
  if (i === -1) return null
  const key = decoded.slice(i + 'images/'.length).toLowerCase()
  const hit = media.get(key)
  if (!hit) {
    console.warn(`  ! unresolved image: ${src}`)
    return null
  }
  return hit
}

/** Build a tile record from an <img>, using its alt / overlay caption. */
function tileFrom(img, caption) {
  const asset = resolveImage(img?.getAttribute('src'))
  if (!asset) return null
  const alt = clean(img.getAttribute('alt'))
  const cap = clean(caption)
  return { ...asset, alt: alt || cap || '', caption: cap || null }
}

const writeJson = (name, value) => {
  fs.mkdirSync(OUT_DATA, { recursive: true })
  fs.writeFileSync(path.join(OUT_DATA, name), JSON.stringify(value, null, 2) + '\n')
  const n = Array.isArray(value) ? value.length : Object.keys(value).length
  console.log(`data:  ${name} (${n} entries)`)
}

/* ------------------------------------------------------------------ events */

function extractEvents(details) {
  const dateById = new Map(details.map((d) => [d.id, { date: d.date, dateSource: d.dateSource }]))
  const main = mainOf(readHtml('Gallery/Events.html'))
  const events = main.querySelectorAll('.custom-event-card').map((card) => {
    const heading = clean(card.querySelector('.event-id-title')?.text)
    const m = /^Event\s+(\d+)\s*:\s*([\s\S]+)$/.exec(heading)
    const href = card.querySelector('a.read-more-link')?.getAttribute('href') ?? ''
    const id = Number(/(\d+)\.html/.exec(href)?.[1])
    const image = resolveImage(card.querySelector('img')?.getAttribute('src'))
    // The archive's template leaves a stray "...;" on every truncated excerpt.
    const excerpt = clean(card.querySelector('.event-excerpt-limited')?.text).replace(
      /\.{2,};?$/,
      '\u2026',
    )
    return {
      id,
      eventNo: m ? Number(m[1]) : null,
      title: m ? clean(m[2]) : heading,
      excerpt,
      image,
      ...(dateById.get(id) ?? { date: null, dateSource: 'none' }),
    }
  })
  writeJson('events.json', events)
  return events
}

function extractEventDetails() {
  const dir = path.join(ARCHIVE, 'Gallery', 'EventDetail')
  const ids = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => Number(path.basename(f, '.html')))
    .sort((a, b) => a - b)

  const details = ids.map((id) => {
    const main = mainOf(readHtml(`Gallery/EventDetail/${id}.html`))
    const meta = clean(main.querySelector('.text-muted')?.text)
    const m = /Event No:\s*(\d+)\s*\|\s*Date:\s*([\d/]+)/.exec(meta)
    const bodyEl = main.querySelector('p[style*="justify"]')
    // The description is stored as one blob with embedded newlines; split to paragraphs.
    const body = (bodyEl?.text ?? '')
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
    return {
      id,
      eventNo: m ? Number(m[1]) : null,
      title: clean(main.querySelector('h2')?.text),
      image: resolveImage(main.querySelector('img')?.getAttribute('src')),
      body,
    }
  })

  // The archive's own date column is an import timestamp, not the event date
  // (88 of 100 rows read 25/11/2025), so recover the real dates from the prose.
  const dated = resolveEventDates(
    details
      .slice()
      .sort((a, b) => a.eventNo - b.eventNo)
      .map((d) => ({ id: d.id, eventNo: d.eventNo, text: [d.title, ...d.body].join(' ') })),
  )

  for (const detail of details) {
    const { date, source } = dated.get(detail.id)
    detail.date = date
    // 'text'     - the write-up stated a full date
    // 'inferred' - it gave a day and month; the year comes from event order
    // 'none'     - the write-up never says when it happened
    detail.dateSource = source
  }

  const counts = details.reduce((a, d) => ({ ...a, [d.dateSource]: (a[d.dateSource] ?? 0) + 1 }), {})
  console.log(
    `dates: ${counts.text ?? 0} from text, ${counts.inferred ?? 0} inferred, ${counts.none ?? 0} unknown`,
  )

  writeJson('event-details.json', details)
  return details
}

/* --------------------------------------------------------------- galleries */

/** Pages built from a flat grid of .ddl-gallery-item tiles. */
function extractTileGallery(file) {
  const main = mainOf(readHtml(file))
  return main
    .querySelectorAll('.ddl-gallery-item')
    .map((item) => tileFrom(item.querySelector('img'), item.querySelector('.overlay-title')?.text))
    .filter(Boolean)
}

/** Corona Drives groups its photos under <h4> drive headings. */
function extractCoronaDrives() {
  const main = mainOf(readHtml('Gallery/CoronaDrives.html'))
  const groups = []
  for (const node of main.querySelectorAll('h4, .row')) {
    if (node.tagName === 'H4') {
      groups.push({ heading: clean(node.text), images: [] })
      continue
    }
    const cards = node.querySelectorAll('.fixed-drive-card')
    if (!cards.length || !groups.length) continue
    for (const card of cards) {
      const tile = tileFrom(card.querySelector('img'))
      if (tile) groups.at(-1).images.push(tile)
    }
  }
  writeJson('corona-drives.json', groups)
  return groups
}

/* -------------------------------------------------------- about / faq bits */

function extractAchievements() {
  const main = mainOf(readHtml('About/Achievements.html'))
  const cards = main
    .querySelectorAll('.achievement-card')
    .map((card) => {
      const img = card.querySelector('img')
      const asset = resolveImage(img?.getAttribute('src'))
      if (!asset) return null
      return {
        ...asset,
        alt: clean(img?.getAttribute('alt')),
        description: clean(card.querySelector('.overlay-content')?.text),
      }
    })
    .filter(Boolean)
  const highlights = main
    .querySelectorAll('.achievement-list-simple li')
    .map((li) => clean(li.text))
    .filter(Boolean)
  writeJson('achievements.json', { cards, highlights })
  return { cards, highlights }
}

function extractFaqs() {
  const main = mainOf(readHtml('Faqs/Faq.html'))
  const questions = main.querySelectorAll('.question')
  const answers = main.querySelectorAll('.answer')
  const faqs = questions
    .map((q, i) => ({
      question: clean(q.text).replace(/^Q:\s*/, ''),
      answer: clean(answers[i]?.text).replace(/^A:\s*/, ''),
    }))
    // The last .question is a closing note with no paired answer.
    .filter((f) => f.answer)
  writeJson('faqs.json', faqs)
  return faqs
}

function extractKeyPoints() {
  const home = mainOf(readHtml('index.html'))
    .querySelectorAll('.key-fact-item')
    .map((li) => clean(li.text))
  const about = mainOf(readHtml('About/TheOrganization.html'))
    .querySelectorAll('.key-points-list li')
    .map((li) => clean(li.text))
  writeJson('key-points.json', { home, about })
  return { home, about }
}

function extractHome() {
  const main = mainOf(readHtml('index.html'))
  const slides = main
    .querySelectorAll('.carousel-item img')
    .map((img, i) => {
      const asset = resolveImage(img.getAttribute('src'))
      return asset && { ...asset, alt: `NGO Tammana volunteers at work \u2014 slide ${i + 1}` }
    })
    .filter(Boolean)
  const intro = main.querySelector('.intro-section-dark')
  writeJson('home.json', {
    slides,
    teamPhoto: resolveImage(intro?.querySelector('img')?.getAttribute('src')),
    quote: clean(intro?.querySelector('h2')?.text),
    blurb: clean(intro?.querySelector('p')?.text),
  })
}

/* -------------------------------------------------------------------- main */

console.log(`archive: ${ARCHIVE}`)
await copyMedia()

const eventDetails = extractEventDetails()
extractEvents(eventDetails)
extractHome()
extractKeyPoints()
extractAchievements()
extractFaqs()
extractCoronaDrives()

writeJson('news.json', extractTileGallery('Gallery/News.html'))
writeJson('project-yakeen.json', extractTileGallery('Gallery/ProjectYakeen.html'))
writeJson('activities-ddl.json', extractTileGallery('Gallery/DDLActivity.html'))
writeJson('activities-go-green.json', extractTileGallery('Gallery/GoGreenActivity.html'))
writeJson('activities-sos.json', extractTileGallery('Gallery/SOSActivity.html'))
writeJson('activities-other.json', extractTileGallery('Gallery/OtherActivity.html'))

console.log('done.')

# NGO Tammana — website

A Next.js (App Router) + Tailwind rebuild of the previous ASP.NET site, recreated
from the HTTrack archive in `../ngotammana`.

## Getting started

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Production build (123 static pages) |
| `npm start` | Serve the production build |
| `npm run extract` | Re-run the migration from `../ngotammana` (see below) |

A production preview runs on a separate port so it can sit alongside the dev server:

```bash
npm run build && npm start -- --port 3100
```

## How content works

There is no CMS. Everything is JSON in `src/data/`, read at build time through
the typed helpers in `src/lib/content.ts`, so every page prerenders as static
HTML.

| File | Contents |
| --- | --- |
| `events.json` | 100 event summaries for the Events grid |
| `event-details.json` | 100 full event write-ups (`/gallery/events/[id]`) |
| `news.json` | 350 press clippings |
| `corona-drives.json` | 15 drives, 60 photos, grouped by heading |
| `activities-*.json` | DDL (34), Go Green (73), S.O.S (21), Other (9) |
| `project-yakeen.json` | 20 photos |
| `achievements.json` | 14 award cards + 15 text highlights |
| `faqs.json`, `key-points.json`, `home.json` | Home and About page copy |
| `site.ts` | Navigation tree, contact details, social links, Google Form ids |

**To add an event:** add a record to `events.json` (id, eventNo, title, excerpt,
image) and a matching one to `event-details.json`, then drop the photo into
`public/images/gallery/events/`. The route and sitemap entry appear automatically.

Longer static prose (What We Do, the founder biography, Corona Drives intro,
Join Us terms) is written directly in the page components, where its emphasis and
links can be marked up properly.

## Re-running the migration

`npm run extract` reads `../ngotammana`, rewrites every JSON file in `src/data/`,
and re-encodes all 688 images into `public/images/` with normalized paths
(lowercase, hyphens instead of spaces). Takes about 20 seconds.

It **clears `public/images/` first**, so that directory is generated output — never
put hand-added files there without also adding them to the archive. It also
overwrites extracted JSON, so hand-edits belong in the page components.

### Image pipeline

Sources are re-encoded to WebP with sharp (`quality: 82`, EXIF orientation applied):
**166.6 MB of JPEG → 65.2 MB of WebP, 61% smaller.**

Width is capped by how large each image is actually displayed, set in
`scripts/extract.mjs`:

| Images | Cap | Why |
| --- | --- | --- |
| `home/carousel/*` | 1600px | Full-bleed; must hold up on a wide retina screen |
| Everything else | 1000px | Tiles and floated columns are never wider than ~420 CSS px |
| `brand/logo` | — | Encoded **lossless**: line art with lettering that lossy WebP smears |

`next/image` then generates responsive variants on top of this, so what a visitor
downloads is much smaller again — the 65 MB figure is repository size, not
transfer size.

## Notable differences from the old site

- **Legacy URLs redirect.** `src/middleware.ts` maps the old PascalCase paths
  (`/Gallery/EventDetail/105`, `/About/OurFounder`, with or without `.html`) to the
  new routes with a 308. This is middleware rather than `next.config.ts` redirects
  because that matcher is case-insensitive and would make
  `/About/Achievements → /about/achievements` an infinite loop.
- **Bootstrap, jQuery and SweetAlert2 are gone.** jQuery and SweetAlert2 were
  loaded on every page but never used; the carousel and menus are now React +
  Tailwind. Font Awesome's CDN is replaced by `react-icons`.
- **Roboto and Lato actually load** via `next/font`. The old stylesheet named them
  but never fetched them, so the site silently rendered in Arial.
- **Hover-only content is reachable.** Gallery captions and achievement
  descriptions now also show on keyboard focus and stay visible on touch devices.
- **Event dates are not displayed.** The old database column held an import
  timestamp, not the event date — 88 of the 100 records share `25/11/2025`. The
  value is kept in `event-details.json` as `importedDate` and rendered nowhere.
- **What's Next is an empty state.** The archived page contained only placeholder
  text (`asdf`) and an image reference pointing at an HTML file.

## Deployment

Targets Vercel or any Node host; `next/image` optimization is enabled. Set
`site.url` in `src/data/site.ts` to the real domain — it feeds `metadataBase`,
Open Graph URLs, `sitemap.xml` and `robots.txt`.

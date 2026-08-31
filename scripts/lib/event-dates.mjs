/**
 * Recovers the real date of each event from its description text.
 *
 * The archived database's date column is an import timestamp, not the event date
 * (88 of 100 rows read 25/11/2025), but almost every write-up states when the
 * event happened. This parses those statements.
 *
 * Many sentences give a day and month but no year ("on Sunday, 29th June").
 * Because events are numbered sequentially in time, a missing year is inferred
 * from the nearest neighbouring events that do carry one.
 */

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const MONTH_ALIASES = {
  sept: 9,
  sep: 9,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  oct: 10,
  nov: 11,
  dec: 12,
}

function monthNumber(word) {
  const w = word.toLowerCase().replace(/\.$/, '')
  const full = MONTHS.indexOf(w)
  if (full !== -1) return full + 1
  return MONTH_ALIASES[w] ?? null
}

const MONTH_WORD = `(?:${MONTHS.join('|')}|jan|feb|mar|apr|jun|jul|aug|sept?|oct|nov|dec)`
const ORD = '(?:st|nd|rd|th)'

// The write-ups sometimes abbreviate the year with a leading quote ("March‘2020")
// and use curly quotes, so allow an optional apostrophe before it.
const YEAR = `(?:\\s*,?\\s*['’‘]?\\s*(\\d{4}))?`

// "12th October 2025", "3rd September, 2017", "22nd April",
// "16th day of August 2020", "5th of June"
const DAY_FIRST = new RegExp(
  `\\b(\\d{1,2})\\s*${ORD}?\\s+(?:day\\s+)?(?:of\\s+)?(${MONTH_WORD})\\b${YEAR}`,
  'gi',
)
// "October 12th, 2025", "June 21", "September 3rd 2017"
const MONTH_FIRST = new RegExp(`\\b(${MONTH_WORD})\\s+(\\d{1,2})\\s*${ORD}?\\b${YEAR}`, 'gi')
// "12/10/2025" or "12-10-2025" (day first, as written in India)
const NUMERIC = /\b(\d{1,2})[/-](\d{1,2})[/-](\d{4})\b/g

const valid = (d, m) => d >= 1 && d <= 31 && m >= 1 && m <= 12

/**
 * Words that, following a number, mean it was a count rather than a day —
 * "May 200 children attended" must not parse as 200 May.
 */
const COUNT_NOUNS =
  /^\s+(?:members?|children|kids|volunteers?|people|persons?|students?|families|women|men|girls?|boys?|residents?|participants?|beneficiaries|patients?|units?|kg|litres?|packets?|kits?)\b/i

/** All date mentions in a block of text, in the order they appear. */
export function findDates(text) {
  const found = []

  const push = (day, month, yearRaw, match, index) => {
    if (!month || !valid(day, month)) return
    found.push({
      day,
      month,
      year: yearRaw ? Number(yearRaw) : null,
      match: match.trim(),
      index,
    })
  }

  for (const m of text.matchAll(DAY_FIRST)) {
    push(Number(m[1]), monthNumber(m[2]), m[3], m[0], m.index)
  }

  for (const m of text.matchAll(MONTH_FIRST)) {
    // "May 21st" is a date; "May 21 members" is a headcount in a May sentence.
    if (COUNT_NOUNS.test(text.slice(m.index + m[0].length))) continue
    push(Number(m[2]), monthNumber(m[1]), m[3], m[0], m.index)
  }

  for (const m of text.matchAll(NUMERIC)) {
    push(Number(m[1]), Number(m[2]), m[3], m[0], m.index)
  }

  return found.sort((a, b) => a.index - b.index)
}

/**
 * Pick the most likely event date from one write-up.
 *
 * Prefers a mention carrying an explicit year, and among those the earliest in
 * the text — the opening sentence is nearly always "organised its Nth event on
 * <date>", while later mentions tend to be background or history.
 */
export function pickDate(text) {
  const all = findDates(text)
  if (!all.length) return null
  const withYear = all.filter((d) => d.year)
  return (withYear.length ? withYear : all)[0]
}

const iso = ({ year, month, day }) =>
  `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

/**
 * Resolve dates for every event.
 *
 * `events` must be ordered by eventNo. Entries whose text gave a day and month
 * but no year borrow the year from the closest event on either side that has
 * one, choosing whichever candidate year keeps the sequence in chronological
 * order.
 */
export function resolveEventDates(events) {
  const parsed = events.map((event) => ({
    id: event.id,
    eventNo: event.eventNo,
    guess: pickDate(event.text),
  }))

  /** Events whose text stated a year outright; these bound the inferences. */
  const anchored = parsed
    .map((p, i) => (p.guess?.year ? { i, date: iso(p.guess) } : null))
    .filter(Boolean)

  const result = new Map()

  // Walk forward, carrying the last date settled so far. A yearless mention gets
  // the earliest year that keeps it at or after that date without overshooting
  // the next stated-year event.
  let previous = null

  for (const [i, p] of parsed.entries()) {
    if (!p.guess) {
      result.set(p.id, { date: null, source: 'none' })
      continue
    }

    if (p.guess.year) {
      const date = iso(p.guess)
      result.set(p.id, { date, source: 'text' })
      previous = date
      continue
    }

    const nextAnchor = anchored.find((a) => a.i > i)?.date
    const lowerBound = previous ?? anchored.find((a) => a.i < i)?.date
    const startYear = lowerBound ? Number(lowerBound.slice(0, 4)) : null
    const endYear = nextAnchor ? Number(nextAnchor.slice(0, 4)) : startYear

    let date = null
    if (startYear) {
      for (let y = startYear; y <= (endYear ?? startYear) + 1; y++) {
        const candidate = iso({ ...p.guess, year: y })
        if (lowerBound && candidate < lowerBound) continue
        if (nextAnchor && candidate > nextAnchor) break
        date = candidate
        break
      }
    } else if (endYear) {
      // Nothing before it: work backwards from the first stated date.
      for (let y = endYear; y >= endYear - 1; y--) {
        const candidate = iso({ ...p.guess, year: y })
        if (candidate <= nextAnchor) {
          date = candidate
          break
        }
      }
    }

    if (date) previous = date
    result.set(p.id, date ? { date, source: 'inferred' } : { date: null, source: 'none' })
  }

  return result
}

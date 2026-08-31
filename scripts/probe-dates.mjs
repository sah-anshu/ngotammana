/**
 * Diagnostic helper (not part of the build): reports how well the date parser
 * covers the event write-ups, and surfaces date-like phrases it did not match.
 */
import fs from 'node:fs'
import path from 'node:path'

import { findDates, resolveEventDates } from './lib/event-dates.mjs'

const root = path.resolve(import.meta.dirname, '..')
const details = JSON.parse(fs.readFileSync(path.join(root, 'src/data/event-details.json'), 'utf8'))

const events = details
  .slice()
  .sort((a, b) => a.eventNo - b.eventNo)
  .map((e) => ({ id: e.id, eventNo: e.eventNo, text: [e.title, ...e.body].join('\n') }))

const resolved = resolveEventDates(events)

const counts = { text: 0, inferred: 0, none: 0 }
for (const v of resolved.values()) counts[v.source]++
console.log('coverage:', counts, 'of', events.length)

// Chronology check: event numbers should increase with date.
let prev = null
const outOfOrder = []
for (const e of events) {
  const r = resolved.get(e.id)
  if (!r.date) continue
  if (prev && r.date < prev.date) outOfOrder.push(`${e.eventNo} ${r.date} after ${prev.no} ${prev.date}`)
  prev = { date: r.date, no: e.eventNo }
}
console.log('out of order:', outOfOrder.length)
outOfOrder.forEach((o) => console.log('  ', o))

if (process.argv.includes('--unmatched')) {
  const MONTHS =
    'january|february|march|april|may|june|july|august|september|october|november|december'
  const context = new RegExp(`.{0,30}\\b(?:${MONTHS})\\b.{0,25}`, 'gi')

  console.log('\n--- month mentions in events with NO date found ---')
  for (const e of events) {
    if (resolved.get(e.id).source !== 'none') continue
    const hits = [...e.text.matchAll(context)].map((m) => m[0].replace(/\s+/g, ' '))
    if (hits.length) console.log(String(e.eventNo).padStart(4), hits.slice(0, 3).join(' | '))
  }

  console.log('\n--- events with no month word at all ---')
  const bare = events.filter(
    (e) => resolved.get(e.id).source === 'none' && !new RegExp(MONTHS, 'i').test(e.text),
  )
  console.log(bare.map((e) => e.eventNo).join(', '), `(${bare.length})`)
}

if (process.argv.includes('--list')) {
  console.log('\n--- all events ---')
  for (const e of events) {
    const r = resolved.get(e.id)
    console.log(
      String(e.eventNo).padStart(4),
      String(e.id).padStart(4),
      (r.date ?? '—').padEnd(11),
      r.source,
    )
  }
}

if (process.argv.includes('--raw')) {
  for (const e of events) console.log(e.eventNo, JSON.stringify(findDates(e.text).slice(0, 4)))
}

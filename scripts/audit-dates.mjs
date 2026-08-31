/** Diagnostic: prints each resolved date beside the sentence it came from. */
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
for (const e of events) {
  const r = resolved.get(e.id)
  if (!r.date) continue
  const all = findDates(e.text)
  const chosen = (all.filter((d) => d.year).length ? all.filter((d) => d.year) : all)[0]
  const ctx = e.text.slice(Math.max(0, chosen.index - 55), chosen.index + chosen.match.length + 30)
  console.log(
    `${String(e.eventNo).padStart(4)} ${r.date} ${r.source.padEnd(9)} [${chosen.match}]  ...${ctx.replace(/\s+/g, ' ').trim()}`,
  )
}

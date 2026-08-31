const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Render an ISO `YYYY-MM-DD` as "12 October 2025".
 *
 * Parsed from the string rather than through `Date`, so the result never shifts
 * by a day depending on the server's or the reader's time zone.
 */
export function formatEventDate(iso: string | null): string | null {
  if (!iso) return null
  const [year, month, day] = iso.split('-').map(Number)
  const name = MONTHS[month - 1]
  if (!year || !name || !day) return null
  return `${day} ${name} ${year}`
}

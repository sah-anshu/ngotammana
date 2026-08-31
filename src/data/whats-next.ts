/**
 * Upcoming events shown on /faqs/whats-next.
 *
 * Hand-maintained — unlike the .json files in this folder, `npm run extract`
 * never touches it. Add the next event here and it appears on the page; empty
 * the array and the page falls back to its "nothing announced yet" state.
 *
 * Images go in `public/images/whats-next/` (a folder the extractor leaves
 * alone) and are referenced as `/images/whats-next/<file>`.
 */
export type UpcomingEvent = {
  /** The NGO's own event number, if it has been assigned yet. */
  eventNo?: number
  title: string
  /** ISO `YYYY-MM-DD`. Omit while the date is still to be confirmed. */
  date?: string
  /** Free text, e.g. "3 pm onwards" — shown beside the date. */
  time?: string
  location?: string
  /** One entry per paragraph. */
  body: string[]
  image?: {
    src: string
    width: number
    height: number
    alt: string
  }
  /** Optional call to action, e.g. a registration form. */
  link?: { href: string; label: string }
}

export const upcomingEvents: UpcomingEvent[] = []

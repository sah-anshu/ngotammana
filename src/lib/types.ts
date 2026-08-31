/** Shapes produced by scripts/extract.mjs. */

export type ImageAsset = {
  src: string
  width: number | null
  height: number | null
}

/** A gallery photo: `alt` is always safe to render, `caption` shows on hover/focus. */
export type Tile = ImageAsset & {
  alt: string
  caption: string | null
}

/**
 * How an event's date was established.
 *
 * The old database's date column was an import timestamp rather than the event
 * date, so dates are recovered from the write-ups by scripts/lib/event-dates.mjs.
 *
 * - `text`     the write-up stated a full date
 * - `inferred` it gave a day and month; the year follows from event ordering
 * - `none`     the write-up never says when it happened, so `date` is null
 */
export type DateSource = 'text' | 'inferred' | 'none'

export type EventSummary = {
  /** Detail-page id from the original database — not the same as `eventNo`. */
  id: number
  /** The number the NGO uses publicly, e.g. "Event 172". */
  eventNo: number | null
  title: string
  excerpt: string
  image: ImageAsset
  /** ISO `YYYY-MM-DD`, or null when the write-up gives no date. */
  date: string | null
  dateSource: DateSource
}

export type EventDetail = {
  id: number
  eventNo: number | null
  title: string
  image: ImageAsset
  body: string[]
  /** ISO `YYYY-MM-DD`, or null when the write-up gives no date. */
  date: string | null
  dateSource: DateSource
}

export type DriveGroup = {
  heading: string
  images: Tile[]
}

export type Achievement = ImageAsset & {
  alt: string
  description: string
}

export type Faq = {
  question: string
  answer: string
}

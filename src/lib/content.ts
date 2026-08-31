/**
 * Typed access to the extracted content in src/data.
 *
 * Everything here is plain JSON read at build time, so pages that use it stay
 * fully static. Regenerate the JSON from the original site with `npm run extract`.
 */
import achievementsJson from '@/data/achievements.json'
import coronaDrivesJson from '@/data/corona-drives.json'
import ddlJson from '@/data/activities-ddl.json'
import eventDetailsJson from '@/data/event-details.json'
import eventsJson from '@/data/events.json'
import faqsJson from '@/data/faqs.json'
import goGreenJson from '@/data/activities-go-green.json'
import homeJson from '@/data/home.json'
import keyPointsJson from '@/data/key-points.json'
import newsJson from '@/data/news.json'
import otherJson from '@/data/activities-other.json'
import projectYakeenJson from '@/data/project-yakeen.json'
import sosJson from '@/data/activities-sos.json'

import type {
  Achievement,
  DriveGroup,
  EventDetail,
  EventSummary,
  Faq,
  ImageAsset,
  Tile,
} from './types'

/** Events, newest first — the order the original Events page used. */
export const events = eventsJson as EventSummary[]
export const eventDetails = eventDetailsJson as EventDetail[]

export const news = newsJson as Tile[]
export const projectYakeen = projectYakeenJson as Tile[]
export const coronaDrives = coronaDrivesJson as DriveGroup[]

export const activities = {
  ddl: ddlJson as Tile[],
  'go-green': goGreenJson as Tile[],
  sos: sosJson as Tile[],
  other: otherJson as Tile[],
}

export type ActivitySlug = keyof typeof activities

export const achievements = achievementsJson as {
  cards: Achievement[]
  highlights: string[]
}

export const faqs = faqsJson as Faq[]
export const keyPoints = keyPointsJson as { home: string[]; about: string[] }

export const home = homeJson as {
  slides: (ImageAsset & { alt: string })[]
  teamPhoto: ImageAsset
  quote: string
  blurb: string
}

const detailsById = new Map(eventDetails.map((d) => [d.id, d]))

export function getEventDetail(id: number): EventDetail | undefined {
  return detailsById.get(id)
}

/** The four most recent events, shown on the home page. */
export const latestEvents = events.slice(0, 4)

/** The six most recent press clippings, shown in the home page "In News" strip. */
export const latestNews = news.slice(0, 6)

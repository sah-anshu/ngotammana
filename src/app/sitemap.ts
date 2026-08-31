import type { MetadataRoute } from 'next'

import { activities, events } from '@/lib/content'
import { absoluteUrl } from '@/lib/site-url'

const STATIC_PATHS = [
  '/',
  '/about/organization',
  '/about/founder',
  '/about/achievements',
  '/about/what-we-do',
  '/faqs',
  '/faqs/whats-next',
  '/gallery/events',
  '/gallery/news',
  '/gallery/corona-drives',
  '/gallery/project-yakeen',
  '/join-us/member',
  '/join-us/intern',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...Object.keys(activities).map((slug) => `/gallery/activities/${slug}`),
    ...events.map((event) => `/gallery/events/${event.id}`),
  ]

  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import GalleryTile from '@/components/gallery/GalleryTile'
import { PageShell } from '@/components/ui/Page'
import { activities, type ActivitySlug } from '@/lib/content'

const PAGES: Record<
  ActivitySlug,
  { heading: string; note?: string; description: string; columns: string }
> = {
  ddl: {
    heading: 'DDL',
    note: '(Donate Drop of Love)',
    description:
      'Donate Drop of Love — NGO Tammana’s live blood and platelet donation drives, running 24×7, 365 days a year on requirement.',
    columns: 'sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
  },
  'go-green': {
    heading: 'Go Green',
    description:
      'Tree plantation drives, nature walks and litter-free, no-plastic events run by NGO Tammana.',
    columns: 'sm:grid-cols-2 md:grid-cols-4',
  },
  sos: {
    heading: 'S.O.S',
    note: '(Sunday of Service)',
    description:
      'Sunday of Service — regular weekend service activities by NGO Tammana volunteers around Chandigarh, Mohali and Zirakpur.',
    columns: 'md:grid-cols-2 lg:grid-cols-4',
  },
  other: {
    heading: 'Other Activities',
    description: 'Further activities and initiatives undertaken by NGO Tammana volunteers.',
    columns: 'md:grid-cols-2 lg:grid-cols-4',
  },
}

const isSlug = (value: string): value is ActivitySlug => value in PAGES

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/gallery/activities/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  if (!isSlug(slug)) return { title: 'Not found' }
  return { title: PAGES[slug].heading, description: PAGES[slug].description }
}

export default async function ActivityPage({ params }: PageProps<'/gallery/activities/[slug]'>) {
  const { slug } = await params
  if (!isSlug(slug)) notFound()

  const page = PAGES[slug]
  const tiles = activities[slug]

  return (
    <PageShell heading={page.heading} title={page.heading} note={page.note}>
      <ul className={`grid grid-cols-1 gap-6 pt-6 ${page.columns}`}>
        {tiles.map((tile) => (
          <li key={tile.src}>
            <GalleryTile tile={tile} fit="cover" />
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

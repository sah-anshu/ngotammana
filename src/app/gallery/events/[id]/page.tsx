import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageHeading } from '@/components/ui/Page'
import { eventDetails, getEventDetail } from '@/lib/content'
import { formatEventDate } from '@/lib/format'

export function generateStaticParams() {
  return eventDetails.map((event) => ({ id: String(event.id) }))
}

function load(id: string) {
  const numeric = Number(id)
  return Number.isInteger(numeric) ? getEventDetail(numeric) : undefined
}

export async function generateMetadata({ params }: PageProps<'/gallery/events/[id]'>): Promise<Metadata> {
  const { id } = await params
  const event = load(id)
  if (!event) return { title: 'Event not found' }

  return {
    title: event.eventNo ? `Event ${event.eventNo}: ${event.title}` : event.title,
    description: event.body[0]?.slice(0, 200),
    openGraph: {
      title: event.title,
      description: event.body[0]?.slice(0, 200),
      images: [event.image.src],
    },
  }
}

export default async function EventDetailPage({ params }: PageProps<'/gallery/events/[id]'>) {
  const { id } = await params
  const event = load(id)
  if (!event) notFound()

  const eventDate = formatEventDate(event.date)

  return (
    <>
      <PageHeading>EVENTS</PageHeading>

      <article className="container-site pb-12 pt-8">
        <h2 className="font-sans text-2xl font-medium text-ink-strong">{event.title}</h2>
        {/*
          The date is recovered from the write-up, not from the old database's
          date column, which held an import timestamp. Events whose text never
          says when they happened simply show the event number.
        */}
        <p className="pt-1 text-sm text-gray-500">
          {event.eventNo && <span>Event No: {event.eventNo}</span>}
          {event.eventNo && eventDate && <span aria-hidden> | </span>}
          {eventDate && <time dateTime={event.date!}>{eventDate}</time>}
        </p>
        <hr className="my-4 border-gray-200" />

        <Image
          src={event.image.src}
          alt={event.title}
          width={event.image.width ?? 800}
          height={event.image.height ?? 600}
          sizes="(min-width: 768px) 420px, 100vw"
          priority
          className="mb-6 h-auto w-full max-w-[420px] rounded shadow-sm md:float-left md:mr-8"
        />

        <h3 className="mb-3 font-sans text-lg font-semibold text-nav-hover">Full Description</h3>
        <div className="font-body text-sm leading-relaxed text-ink">
          {event.body.map((paragraph, i) => (
            <p key={i} className="mb-4 text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="clear-both pt-4">
          <Link href="/gallery/events" className="text-sm font-semibold text-nav-hover underline">
            ← Back to all events
          </Link>
        </p>
      </article>
    </>
  )
}

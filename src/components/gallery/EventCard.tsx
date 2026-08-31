import Image from 'next/image'
import Link from 'next/link'

import { formatEventDate } from '@/lib/format'
import type { EventSummary } from '@/lib/types'

export default function EventCard({
  event,
  priority = false,
}: {
  event: EventSummary
  priority?: boolean
}) {
  const heading = event.eventNo ? `Event ${event.eventNo}: ${event.title}` : event.title
  const eventDate = formatEventDate(event.date)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-md transition-transform transition-shadow duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="truncate px-3 pb-1.5 pt-2.5 text-base font-bold text-ink" title={heading}>
        {heading}
      </h3>

      <div className="relative h-[180px] w-full">
        <Image
          src={event.image.src}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col p-3">
        {/* Only shown when the write-up actually records a date. */}
        {eventDate && (
          <time dateTime={event.date!} className="mb-1 block text-xs font-semibold text-gray-500">
            {eventDate}
          </time>
        )}
        <p className="line-clamp-4 text-sm text-gray-600">{event.excerpt}</p>
        <p className="mt-auto pt-3 text-right">
          <Link
            href={`/gallery/events/${event.id}`}
            className="text-sm font-semibold text-nav-hover underline-offset-2 hover:underline"
          >
            Read more
            <span className="sr-only"> about {heading}</span>
          </Link>
        </p>
      </div>
    </article>
  )
}

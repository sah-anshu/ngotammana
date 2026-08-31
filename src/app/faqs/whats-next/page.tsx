import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaCalendarDay, FaLocationDot, FaRegCalendar } from 'react-icons/fa6'

import { PageShell } from '@/components/ui/Page'
import { site, whatsappUrl } from '@/data/site'
import { upcomingEvents, type UpcomingEvent } from '@/data/whats-next'
import { formatEventDate } from '@/lib/format'

export const metadata: Metadata = {
  title: "What's Next",
  description: upcomingEvents.length
    ? `Upcoming events from ${site.name}: ${upcomingEvents.map((e) => e.title).join(', ')}.`
    : `Upcoming events and activities from ${site.name}.`,
}

/*
 * The archived page had the layout below — a picture beside the write-up — but
 * only placeholder rows ("Event 170: asdf") and an image reference pointing at
 * an HTML file, so there was no content to carry over. Entries are added to
 * src/data/whats-next.ts; with none, the empty state shows instead.
 */
function UpcomingCard({ event }: { event: UpcomingEvent }) {
  const date = formatEventDate(event.date ?? null)
  const heading = event.eventNo ? `Event ${event.eventNo}: ${event.title}` : event.title

  return (
    <article className="grid gap-6 border-b border-gray-200 py-8 last:border-b-0 md:grid-cols-3">
      {event.image && (
        <Image
          src={event.image.src}
          alt={event.image.alt}
          width={event.image.width}
          height={event.image.height}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="h-auto w-full rounded shadow-sm"
        />
      )}

      <div className={event.image ? 'md:col-span-2' : 'md:col-span-3'}>
        <h3 className="font-sans text-lg font-bold text-ink-strong">{heading}</h3>

        {(date || event.location) && (
          <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-body text-sm text-ink">
            {date && (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Date</dt>
                <FaCalendarDay aria-hidden className="h-3.5 w-3.5 shrink-0 text-keypoints" />
                <dd>
                  <time dateTime={event.date}>{date}</time>
                  {event.time && <span>, {event.time}</span>}
                </dd>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Location</dt>
                <FaLocationDot aria-hidden className="h-3.5 w-3.5 shrink-0 text-keypoints" />
                <dd>{event.location}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-3 font-body text-sm leading-relaxed text-ink">
          {event.body.map((paragraph, i) => (
            <p key={i} className="mb-3">
              {paragraph}
            </p>
          ))}
        </div>

        {event.link && (
          <a
            href={event.link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded bg-heading-bar px-4 py-2 font-sans text-sm font-bold text-white"
          >
            {event.link.label}
          </a>
        )}
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
      <FaRegCalendar aria-hidden className="mx-auto mb-4 h-10 w-10 text-keypoints" />
      <h3 className="mb-2 font-sans text-lg font-bold text-ink-strong">
        No upcoming event announced yet
      </h3>
      <p className="mx-auto max-w-xl font-body text-sm text-ink">
        Our events run monthly, mostly on weekends. Details for the next one are shared here and on
        our social channels as soon as they are confirmed.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/gallery/events"
          className="rounded bg-heading-bar px-4 py-2 font-sans text-sm font-bold text-white"
        >
          Browse past events
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded bg-whatsapp px-4 py-2 font-sans text-sm font-bold text-white"
        >
          Ask us on WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function WhatsNextPage() {
  return (
    <PageShell heading="WHAT's NEXT" title="WHAT’s NEXT">
      {upcomingEvents.length ? (
        <>
          {upcomingEvents.map((event) => (
            <UpcomingCard key={`${event.eventNo ?? ''}${event.title}`} event={event} />
          ))}
          <p className="pt-4 font-body text-sm text-ink">
            To take part or to know more, call or WhatsApp{' '}
            <a href={`tel:${site.phoneDigits}`} className="text-nav-hover underline">
              {site.phone}
            </a>
            .
          </p>
        </>
      ) : (
        <EmptyState />
      )}
    </PageShell>
  )
}

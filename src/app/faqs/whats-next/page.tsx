import type { Metadata } from 'next'
import Link from 'next/link'
import { FaRegCalendar } from 'react-icons/fa6'

import { PageShell } from '@/components/ui/Page'
import { site, whatsappUrl } from '@/data/site'

export const metadata: Metadata = {
  title: "What's Next",
  description: `Upcoming events and activities from ${site.name}.`,
}

/*
 * The archived page held only placeholder rows ("Event 170: asdf") and an image
 * reference that pointed at an HTML file rather than a picture, so there was no
 * real content to carry across. This is the empty state until the next event is
 * announced.
 */
export default function WhatsNextPage() {
  return (
    <PageShell heading="WHAT's NEXT" title="WHAT’s NEXT">
      <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
        <FaRegCalendar aria-hidden className="mx-auto mb-4 h-10 w-10 text-keypoints" />
        <h3 className="mb-2 font-sans text-lg font-bold text-ink-strong">
          No upcoming event announced yet
        </h3>
        <p className="mx-auto max-w-xl font-body text-sm text-ink">
          Our events run monthly, mostly on weekends. Details for the next one are shared here and
          on our social channels as soon as they are confirmed.
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
    </PageShell>
  )
}

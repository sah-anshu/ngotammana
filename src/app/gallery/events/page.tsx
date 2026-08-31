import type { Metadata } from 'next'

import EventCard from '@/components/gallery/EventCard'
import { PageShell } from '@/components/ui/Page'
import { events } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Events',
  description: `All ${events.length} events organised by NGO Tammana across Chandigarh, Mohali and Zirakpur.`,
}

export default function EventsPage() {
  return (
    <PageShell heading="EVENTS" title="EVENTS">
      <ul className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2 lg:grid-cols-4">
        {events.map((event, i) => (
          <li key={event.id}>
            {/* Only the first row matters for LCP; the rest lazy-load. */}
            <EventCard event={event} priority={i < 4} />
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

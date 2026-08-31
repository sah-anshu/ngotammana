import Link from 'next/link'

import { PageShell } from '@/components/ui/Page'

export default function NotFound() {
  return (
    <PageShell heading="PAGE NOT FOUND">
      <div className="py-12 text-center">
        <p className="font-body text-sm text-ink">
          Sorry, we couldn’t find that page. It may have moved since our old website.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded bg-heading-bar px-4 py-2 font-sans text-sm font-bold text-white"
          >
            Go to the home page
          </Link>
          <Link
            href="/gallery/events"
            className="rounded bg-panel px-4 py-2 font-sans text-sm font-bold text-white"
          >
            Browse events
          </Link>
        </div>
      </div>
    </PageShell>
  )
}

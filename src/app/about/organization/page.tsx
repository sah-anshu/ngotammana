import type { Metadata } from 'next'

import { PageShell, Prose } from '@/components/ui/Page'
import { keyPoints } from '@/lib/content'

export const metadata: Metadata = {
  title: 'The Organization',
  description:
    'Key points about NGO Tammana — a Punjab-registered, Chandigarh-based voluntary non-profit working since 2008.',
}

export default function OrganizationPage() {
  return (
    <PageShell heading="ABOUT" title="ABOUT" note="Key Points of the organization:">
      <Prose className="pt-4">
        <ul>
          {keyPoints.about.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Prose>
    </PageShell>
  )
}

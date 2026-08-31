import type { Metadata } from 'next'

import { PageShell } from '@/components/ui/Page'
import { site, socials } from '@/data/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${site.name} — call or WhatsApp ${site.phone}, or email ${site.email}.`,
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="font-body text-lg text-link">
      {label} : <span className="font-normal text-black">{children}</span>
    </p>
  )
}

export default function ContactPage() {
  return (
    <PageShell heading="CONTACT US" title="CONTACT US">
      <div className="space-y-3 pt-6">
        <h3 className="font-body text-lg font-medium text-ink">Let’s stay connected –</h3>

        <p className="font-body text-lg font-bold text-link">
          Call / WhatsApp :{' '}
          <a href={`tel:${site.phoneDigits}`} className="font-normal text-black hover:underline">
            {site.phone}
          </a>
        </p>

        <Row label="E-Mail">
          <a href={`mailto:${site.email}`} className="hover:underline">
            {site.email}
          </a>
        </Row>

        {/* Sourced from the shared socials list, which fixed the broken relative
            Twitter link and the mixed http/https URLs on the original page. */}
        {socials.map(({ label, href }) => (
          <Row key={label} label={label}>
            <a href={href} target="_blank" rel="noreferrer" className="hover:underline">
              {href.replace(/^https?:\/\//, '')}
            </a>
          </Row>
        ))}
      </div>
    </PageShell>
  )
}

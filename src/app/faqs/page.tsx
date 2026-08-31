import type { Metadata } from 'next'

import { PageShell } from '@/components/ui/Page'
import { faqs } from '@/lib/content'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Answers to common questions about joining NGO Tammana — membership fees, age limits, time commitment, certification and areas of work.',
}

export default function FaqsPage() {
  return (
    <PageShell heading="FAQs" title="FAQs">
      <dl className="pt-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="mb-4">
            <dt className="font-body text-sm font-bold text-ink">Q: {faq.question}</dt>
            <dd className="pb-1 font-body text-sm text-ink">A: {faq.answer}</dd>
          </div>
        ))}
      </dl>

      <p className="font-body text-sm font-bold text-ink">
        For any other questions / assistance – please call at{' '}
        <a href={`tel:${site.phoneDigits}`} className="text-nav-hover underline">
          {site.phone}
        </a>
        .
      </p>
    </PageShell>
  )
}

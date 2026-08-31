import type { Metadata } from 'next'

import GoogleFormEmbed from '@/components/ui/GoogleFormEmbed'
import { PageShell, Prose } from '@/components/ui/Page'
import { joinForms, site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Join Us as an Intern',
  description:
    'Apply for a certified internship with NGO Tammana — one week to three months, minimum age 18, starting on a date that suits you.',
}

export default function AsInternPage() {
  return (
    <PageShell heading="AS INTERN" title="AS INTERN">
      <Prose className="pt-4">
        <ul>
          <li>Minimum period is 1 week to a maximum of 3 months.</li>
          <li>Minimum Age Limit is 18+</li>
          <li>You can start internship as per your convenient date.</li>
          <li>
            Once you have filled up the form, please wait for at least 24-48 hours for us to
            respond.
          </li>
          <li>
            You will receive an email from{' '}
            <a href="mailto:Internships@tammana.org.in">Internships@tammana.org.in</a> containing all
            the details &amp; process for onboarding.
          </li>
          <li>Rs. 300/- is the Internship Fee.</li>
          <li>
            Please remember your certification depends upon the productivity you deliver in your
            work.
          </li>
          <li>
            The organisation holds the right to withdraw your Internship or withhold your
            certificate in case of any misconduct.
          </li>
          <li>
            For any queries, please reach out at <a href={`tel:${site.phoneDigits}`}>{site.phone}</a>
            .
          </li>
          <li>Incomplete / Unfilled forms shall not be attended to.</li>
        </ul>
      </Prose>

      <GoogleFormEmbed formId={joinForms.intern} title="Internship application form" />
    </PageShell>
  )
}

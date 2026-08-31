import type { Metadata } from 'next'

import GoogleFormEmbed from '@/components/ui/GoogleFormEmbed'
import { PageShell, Prose } from '@/components/ui/Page'
import { joinForms, site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Join Us as a Member',
  description:
    'Become a volunteer member of NGO Tammana — no membership fee, no salary, minimum age 21, certification after six productive months.',
}

export default function AsMemberPage() {
  return (
    <PageShell heading="AS MEMBER" title="AS MEMBER">
      <p className="pt-4 font-body text-sm text-accent">
        Any Incomplete / Unfilled form shall not be attended to. Remember, ALL fields are mandatory.
      </p>

      <Prose className="pt-4">
        <ul>
          <li>Minimum age to join is 21+</li>
          <li>There is no membership fee or salary.</li>
          <li>
            You are eligible for certification only once you have completed a minimum productive
            period of 6 months in the organisation.
          </li>
          <li>Your services are voluntary and not duty bound.</li>
          <li>
            Once you have filled up the form, please wait for at least 48-72 hours for us to
            respond.
          </li>
          <li>
            You will receive an email from us containing all the details &amp; process for
            onboarding.
          </li>
          <li>
            The onboarding process will help you understand all the details about the NGO, its
            functioning, your role and more.
          </li>
          <li>
            For any queries, please reach out at <a href={`tel:${site.phoneDigits}`}>{site.phone}</a>
            .
          </li>
        </ul>
      </Prose>

      <GoogleFormEmbed formId={joinForms.member} title="Membership application form" />
    </PageShell>
  )
}

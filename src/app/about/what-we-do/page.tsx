import type { Metadata } from 'next'
import Link from 'next/link'

import { PageShell, Prose } from '@/components/ui/Page'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'Grassroots humanitarian work by NGO Tammana — monthly events across health, education, empowerment and the environment in Chandigarh, Mohali and Zirakpur.',
}

export default function WhatWeDoPage() {
  return (
    <PageShell heading="WHAT WE DO" title="WHAT WE DO">
      <Prose className="pt-4">
        <p>
          Working at the grassroots level, our NGO encompasses a wide range of events &amp;
          activities that contribute to humanitarian assistance – supporting the less privileged in
          best capacities, driving social change aiming to improve the quality of life for
          individuals and groups around, community development fostering a society that values
          inclusivity and diversity.
        </p>

        <ul>
          <li>
            Our monthly events aim on community building &amp; bonding, health (including mental
            health), empowerment, education &amp; grooming (art, hygiene etc.)
          </li>
          <li>
            We cater to the children primarily, but also focus on the elderly, autistic, orphans,
            cancer patients, visually impaired and other differently / specially abled around us. We
            share festivities together to encourage and bring attention towards their inclusion in
            the society.
          </li>
          <li>
            We encourage physical fitness too with cycle rides, open yoga sessions, sports, breaking
            taboos around periods and also do our bit for the environment with various nature walks,
            tree plantation drives, no plastic &amp; litter free events etc.
          </li>
          <li>
            We arrange different collection &amp; distribution drives for toys, blankets,
            stationery etc. to help bridge the gap between those who have and those who need.
          </li>
          <li>
            We cater to live cases, including live blood donations, medical help, counselling, legal
            assistance etc. We do not provide Financial Aid.
          </li>
          <li>Our area of work is in various slums around, neglected shelter homes and schools etc.</li>
          <li>Formal / Informal Team Meetings &amp; fun get togethers.</li>
          <li>
            Annual Award Ceremony called ASHIA – meaning Life &amp; Hope is organised to honour best
            contributions in the NGO.
          </li>
        </ul>

        <p>
          Check out the <Link href="/gallery/events">Event Gallery</Link> page for more.
        </p>
      </Prose>
    </PageShell>
  )
}

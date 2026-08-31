import type { Metadata } from 'next'
import Image from 'next/image'

import { PageShell, Prose } from '@/components/ui/Page'

export const metadata: Metadata = {
  title: 'Our Founder',
  description:
    'Isha Kakaria founded NGO Tammana at the age of 22 and leads it today — State Awardee, entrepreneur, presenter and philanthropist of 16+ years.',
}

export default function FounderPage() {
  return (
    <PageShell heading="THE FOUNDER" title="THE FOUNDER">
      <Prose className="pt-4">
        {/*
          The original pinned this image to 350x400 at every breakpoint, squashing
          it on phones. It now floats beside the text on wide screens and stacks
          at its natural aspect ratio on narrow ones.
        */}
        <Image
          src="/images/about/founder/isha-mam.webp"
          alt="Isha Kakaria, founder of NGO Tammana"
          width={897}
          height={1024}
          sizes="(min-width: 768px) 350px, 100vw"
          className="mb-4 h-auto w-full max-w-[350px] rounded shadow-sm md:float-left md:mr-8"
        />

        <h3 className="mb-3 font-body text-sm font-bold italic">About Isha Kakaria</h3>

        <ul>
          <li>Founded the NGO at the mere age of 22.</li>
          <li>
            State Awarded (Independence Day Commendation Award) by The Governor of Punjab, India,
            Awarded by IEC Himachal Pradesh &amp; other Universities, Awarded by Hon’ble Minister of
            Parliament Affairs, Govt. of India at the Public Relation Council of India Awards,
            recognized by various radio stations &amp; TV Channels, awarded by Municipal Corporation
            Zirakpur, awarded by Traffic Police Chandigarh, Seva Bharti’s Award &amp; umpteen
            others!
          </li>
          <li>
            Committee Member at The Punjab State Audit Advisory Board 2017, constituted by the
            Comptroller &amp; Auditor General (CAG) of India.
          </li>
          <li>
            Sexual Harassment Complaint Committee Member at Indo Tibetan Border Police Force (ITBP)
            2017
          </li>
          <li>Successful entrepreneur / event planner since 13+ years</li>
          <li>Professional &amp; celebrity presenter / stage artist since 15+ years</li>
          <li>
            Was appointed the First Lady Traffic Marshall with Chandigarh Traffic Police,
            Chandigarh.
          </li>
          <li>
            Holds corporate experience including Voice &amp; Accent Trainer with International
            Brands.
          </li>
          <li>
            Philanthropist since 16+ years now, her work speaks volumes &amp; has been featured
            &amp; quoted several times
          </li>
          <li>
            5 Insanely Interesting Indians You Should Know! carries her name! – Josh Talks (
            <a
              href="https://medium.com/@JoshTalksLive/5-insanely-interesting-people-you-should-know-7ccbe284c09f"
              target="_blank"
              rel="noreferrer"
            >
              Read here
            </a>
            )
          </li>
          <li>Listed as the ‘Young Achiever of Punjab’ by The ‘India Today’ magazine 2011</li>
          <li>Listed under the City’s Celebrity List June 2012 by ‘India Today’ Magazine.</li>
          <li>Featured in ‘Humans of Punjab’ in the March 2016 Edition, La Blend Magazine.</li>
          <li>
            <i>
              ‘Touching lives &amp; inspiring all.’ ‘Only a special heart understands compassion
              &amp; Isha Kakaria indeed has a very special heart’
            </i>{' '}
            …. La Blend Magazine
          </li>
          <li>
            <i>
              ‘Isha is a great inspiration for youngsters. She has motivated many youngsters to join
              her and is doing a tremendous job for society.’
            </i>{' '}
            … <b>Public Relation Council of India.</b>
          </li>
          <li>
            <i>
              ‘Leaving a plum job in an MNC to work for an NGO takes courage, which this youngster –
              Isha Kakaria, has in plenty’…
            </i>{' '}
            The Tribune Trends – <b>Pacesetter</b>
          </li>
          <li>
            <i>‘Live Simply, Dream Big’ Seems to be how Isha Kakaria sees life.’…</i> India Today
            Magazine
          </li>
          <li>
            <i>‘Commendable service towards Voluntary blood donation movement.’…</i> GMSH-16,
            Chandigarh
          </li>
          <li>
            <i>
              “We would like to convey gratitude to Tammana for bringing a healthy positive &amp;
              constructive change in the society and helping the less privileged to grow in life
              &amp; hold their head high with pride”
            </i>{' '}
            …. Chairman, Aryan Group of Colleges
          </li>
        </ul>

        <p>
          While Isha topped her Economics Honors, and is an MBA in HR, she has always pursued what
          she has felt right for her, ensuring she does what she loves and loves what she does.
        </p>
        <p>
          Apart from being a leader with an example, for anyone around, she is a complete entertainer,
          a total fun to be around &amp; spreads a little sparkle wherever she goes! She with utmost
          zest – dances, sings, writes, plays piano, has a green thumb, is an adrenaline junkie,
          shops till she drops, binge watches, loves to play chess, table tennis, badminton, do yoga
          &amp; have coffee, is a make-up &amp; dress up enthusiast, passionate for art &amp; craft
          &amp; the more you dig, more you find in her!
        </p>
        <p>Her cheer for life, the good vibe attracts her tribe.</p>
        <p>With her never-give-up attitude and a clean approach, she has made it far!</p>
      </Prose>
    </PageShell>
  )
}

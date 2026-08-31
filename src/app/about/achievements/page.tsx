import type { Metadata } from 'next'
import Image from 'next/image'
import { FaCertificate } from 'react-icons/fa6'

import { PageShell } from '@/components/ui/Page'
import { achievements } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Achievements',
  description:
    'Awards and recognition earned by NGO Tammana and its founder — from the Punjab Governor’s State Award to honours by municipal corporations, universities and the press.',
}

export default function AchievementsPage() {
  return (
    <PageShell
      heading="Achievements"
      title="Achievements"
      note="Scroll below for list of Achievements:"
    >
      <ul className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {achievements.cards.map((card) => (
          <li key={card.src}>
            {/*
              The description sat in a hover-only overlay on the original, which
              made it invisible on touch devices. It now reveals on hover and
              focus, and is always rendered for assistive technology.
            */}
            <figure
              tabIndex={0}
              className="group relative h-[250px] overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src={card.src}
                alt={card.alt || card.description}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="absolute inset-0 flex items-center justify-center bg-black/60 p-4 text-center font-body text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                {card.description}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <ul className="mt-10 space-y-2">
        {achievements.highlights.map((item) => (
          <li key={item} className="flex gap-3 font-body text-sm text-ink">
            <FaCertificate aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-nav-hover" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

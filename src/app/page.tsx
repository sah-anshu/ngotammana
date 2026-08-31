import Image from 'next/image'
import Link from 'next/link'
import { FaCheck } from 'react-icons/fa6'

import EventCard from '@/components/gallery/EventCard'
import GalleryTile from '@/components/gallery/GalleryTile'
import HomeCarousel from '@/components/gallery/HomeCarousel'
import { home, keyPoints, latestEvents, latestNews } from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <HomeCarousel slides={home.slides} />

      {/* Who we are */}
      <section className="border-y-4 border-navy-edge bg-navy py-6 text-white md:border-b-8">
        <div className="container-site">
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <Image
              src={home.teamPhoto.src}
              alt="Members of the NGO Tammana team"
              width={home.teamPhoto.width ?? 259}
              height={home.teamPhoto.height ?? 175}
              sizes="(min-width: 768px) 259px, 100vw"
              className="h-auto w-full max-w-[259px] self-center rounded md:self-start"
            />
            <div>
              <h2 className="mb-4 font-sans text-2xl font-medium sm:text-[32px]">{home.quote}</h2>
              <p className="font-sans text-sm leading-relaxed">{home.blurb}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest events */}
      <section className="bg-panel py-4">
        <h2 className="py-3 text-center font-sans text-[30px] font-bold text-white">
          Latest Events
        </h2>
        <div className="grid grid-cols-1 gap-6 px-5 pb-4 md:grid-cols-2 lg:grid-cols-4">
          {latestEvents.map((event, i) => (
            <EventCard key={event.id} event={event} priority={i === 0} />
          ))}
        </div>
        <p className="pb-2 text-center">
          <Link
            href="/gallery/events"
            className="font-sans text-sm font-bold text-white underline underline-offset-4"
          >
            See all events
          </Link>
        </p>
      </section>

      {/* Key points */}
      <section className="mx-2 my-4">
        <div className="rounded-[10px] bg-keypoints px-4 py-4">
          <h2 className="text-center font-sans text-2xl font-bold text-white">
            Key Points of the Organization
          </h2>
        </div>
        <ul className="mx-auto max-w-4xl px-4 pt-4 md:px-8">
          {keyPoints.home.map((point) => (
            <li key={point} className="flex gap-3 py-1 font-sans text-base text-ink">
              <FaCheck aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* In the news */}
      <section className="mx-2 my-4 rounded-[20px] bg-panel pb-4">
        <h2 className="px-4 pb-3 pt-8 text-center font-sans text-2xl font-medium text-white">
          In News
        </h2>
        <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-6">
          {latestNews.map((tile) => (
            <GalleryTile
              key={tile.src}
              tile={tile}
              className="h-[200px] bg-white"
              sizes="(min-width: 768px) 16vw, (min-width: 640px) 33vw, 50vw"
            />
          ))}
        </div>
        <p className="pt-4 text-center">
          <Link
            href="/gallery/news"
            className="font-sans text-sm font-bold text-white underline underline-offset-4"
          >
            See all press coverage
          </Link>
        </p>
      </section>
    </>
  )
}

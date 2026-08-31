'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

import type { ImageAsset } from '@/lib/types'

type Slide = ImageAsset & { alt: string }

const INTERVAL = 5000

export default function HomeCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const liveRef = useRef<HTMLDivElement>(null)

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    if (paused || count < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL)
    return () => clearInterval(id)
  }, [paused, count])

  if (!count) return null

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights from our work"
      className="relative w-full overflow-hidden border-t border-dashed border-gray-300"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/*
        The original capped the slide at 400px tall and let overflow hide the
        rest. A fixed-height frame with object-cover gives the same framing
        without the layout shift that came from an auto-height image.
      */}
      <div ref={liveRef} className="relative h-[200px] sm:h-[300px] md:h-[400px]">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className={i === index ? 'absolute inset-0' : 'hidden'}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute inset-y-0 left-0 flex w-10 items-center justify-center text-gray-900/80 transition-colors hover:bg-black/10"
      >
        <FaChevronLeft aria-hidden className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-900/80 transition-colors hover:bg-black/10"
      >
        <FaChevronRight aria-hidden className="h-6 w-6" />
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 w-2.5 rounded-full border border-black transition-colors ${
              i === index ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

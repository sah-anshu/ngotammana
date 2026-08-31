import Image from 'next/image'

import type { Tile } from '@/lib/types'

type Props = {
  tile: Tile
  /**
   * Newspaper clippings and posters are portrait scans that must not be cropped;
   * photographs look better filling the tile.
   */
  fit?: 'cover' | 'contain'
  className?: string
  sizes?: string
}

/**
 * A single gallery photo with its caption. The caption reveals on hover or
 * keyboard focus, and stays visible on touch devices, where the original site's
 * hover-only overlay was simply unreachable.
 */
export default function GalleryTile({
  tile,
  fit = 'contain',
  className = 'h-[250px]',
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
}: Props) {
  return (
    <figure
      tabIndex={tile.caption ? 0 : -1}
      className={`group/tile relative overflow-hidden rounded-lg bg-gray-50 shadow transition-shadow hover:shadow-lg ${className}`}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes={sizes}
        className={`transition-transform duration-300 group-hover/tile:scale-105 ${
          fit === 'cover' ? 'object-cover' : 'object-contain'
        }`}
      />

      {tile.caption && (
        <figcaption
          className="absolute inset-x-0 bottom-0 flex min-h-[50px] items-center justify-center bg-black/75 px-2.5 py-1.5 text-center font-body text-xs text-white opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100 group-focus-within/tile:opacity-100 [@media(hover:none)]:opacity-100"
        >
          {tile.caption}
        </figcaption>
      )}
    </figure>
  )
}

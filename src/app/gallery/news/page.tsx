import type { Metadata } from 'next'

import GalleryTile from '@/components/gallery/GalleryTile'
import { PageShell } from '@/components/ui/Page'
import { news } from '@/lib/content'

export const metadata: Metadata = {
  title: 'News',
  description:
    'Press coverage of NGO Tammana in Dainik Bhaskar, Dainik Jagran, The Tribune and other publications.',
}

export default function NewsPage() {
  return (
    <PageShell heading="NEWS" title="NEWS">
      <ul className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2 lg:grid-cols-4">
        {news.map((tile) => (
          <li key={tile.src}>
            {/* Newspaper scans are portrait; contain keeps the text readable. */}
            <GalleryTile tile={tile} fit="contain" className="h-[250px] bg-white" />
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

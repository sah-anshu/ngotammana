import type { Metadata } from 'next'

import GalleryTile from '@/components/gallery/GalleryTile'
import { PageHeading, PageSubHeading, Prose } from '@/components/ui/Page'
import { projectYakeen } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Project Yakeen',
  description:
    'NGO Tammana’s most challenging initiative — nurturing a government elementary school in Village Singhpura, Zirakpur, Punjab.',
}

export default function ProjectYakeenPage() {
  return (
    <>
      <PageHeading>Project Yakeen</PageHeading>

      <div className="container-site pb-12 pt-8">
        <PageSubHeading title="Project Yakeen" />

        <Prose className="pt-4">
          <p>
            <b>‘Project Yakeen’</b> has by far been the NGO’s most challenging initiative where it
            nurtured a Government Elementary School in Village Singhpura, Zirakpur, Punjab that was
            screaming for attention. Plagued by minimal infrastructure, lack of amenities, and poor
            hygiene, the school faced low attendance &amp; interest of the children.
          </p>
          <p>
            Tammana stepped in &amp; undertook diverse initiatives like regularly organizing
            education, health and environment sensitization drives, dance workshops, yoga, medical
            camps, festive celebrations, donating stationery kits, school bags, woolens, toys, trash
            bins, utensils for mid-day meal, installation of water pump, organising educational
            &amp; fun trips, encouraging best performances with awards, planting saplings, teaching
            crafts, dance &amp; respective subjects are few of the many initiatives taken at the
            school by Tammana.
          </p>
          <p>
            After persistent efforts of letters to the government, significant transformations were
            achieved. A boundary wall and extra classrooms &amp; a new building came up within a
            year.
          </p>
        </Prose>

        <ul className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3">
          {projectYakeen.map((tile) => (
            <li key={tile.src}>
              <GalleryTile
                tile={tile}
                fit="cover"
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

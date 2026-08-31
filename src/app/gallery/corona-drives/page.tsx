import type { Metadata } from 'next'

import GalleryTile from '@/components/gallery/GalleryTile'
import { PageHeading, PageSubHeading, Prose } from '@/components/ui/Page'
import { coronaDrives } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Corona Drives',
  description:
    'The ‘KARO-NA’ initiative — NGO Tammana raised Rs. 3,82,811 and helped 1545 families across 35 locations during the COVID-19 pandemic.',
}

export default function CoronaDrivesPage() {
  return (
    <>
      <PageHeading>Corona Drives</PageHeading>

      <div className="container-site pb-12 pt-8">
        <PageSubHeading title="Corona Drives" />

        <Prose className="pt-4">
          <p>
            Tammana’s resilience and determination were never more evident than during the COVID-19
            pandemic.
          </p>
          <p>
            Leading by example, the ‘KARO-NA’ Initiative; Founder Isha Kakaria &amp; General
            Secretary Jaskaran Singh together ventured into the high risk fields themselves; while
            the whole team together, remarkably <b>raised Rs. 3,82,811/-</b> by connecting 100
            different individual donors.
          </p>
          <p>
            This initiative <b>helped a total of 1545 families</b> by providing repeated rounds of{' '}
            <b>dry ration</b> consisting of Rice, Lentils, Flour, Cooking oil, Spices, Vegetables
            &amp; also other <b>basic essentials</b> for at least 10-12 days for an average size
            family of 5.
          </p>
          <p>
            The drives were successfully conducted at <b>35 various locations</b> inclusive of Guru
            Nanak Colony, Mohali; deep <b>villages</b> of Zirakpur, Singhpura, Baltana, Construction
            Slum, Patiala Road, Near Nabha Sahib, Mohali Pind, Lalru, Dappar, Kauli Majra, Derabassi,
            Industrial Area, Phase-1, Mohali, Dhakoli, Peermuchalla, Bhishampura, Pabhat, Dayalpura,
            Madanpur, Faidapind, Jagatpura, many sectors of Chandigarh and Ram Darbar.
          </p>
          <p>
            1008 <b>garbage collectors and sanitization workers</b> were given safety kits &amp; 500{' '}
            <b>sanitary pads</b> were also distributed to women.
          </p>
          <p className="font-bold">
            The distributions were done without any chaos &amp; taking all necessary precautions.
          </p>
          <p>
            Other than the same, many cases like that of providing all possible aid including{' '}
            <b>Oxygen cylinder</b> availabilities &amp; information, financial help to those who
            lost jobs / in severe need, <b>medicines, Blood or Plasma requirements</b> etc. were
            taken care of, to the best of the abilities under the NGO’s DDL – Donate Drop of Love
            initiative.
          </p>
        </Prose>

        {coronaDrives.map((group) => (
          <section key={group.heading} className="pt-6">
            <h3 className="mb-3 font-body text-sm font-bold text-ink">{group.heading}</h3>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {group.images.map((tile) => (
                <li key={tile.src}>
                  <GalleryTile tile={tile} fit="cover" className="h-[350px]" />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import { Lato, Roboto } from 'next/font/google'

import { SocialFloatingBar, WhatsAppButton } from '@/components/layout/FloatingBars'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteHeader from '@/components/layout/SiteHeader'
import { site } from '@/data/site'

import './globals.css'

// The original stylesheet asked for Roboto and Lato but never loaded either, so
// the site silently fell back to Arial. These are the intended faces.
const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${roboto.variable} ${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <SocialFloatingBar />
        <WhatsAppButton />
      </body>
    </html>
  )
}

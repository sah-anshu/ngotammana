import { site } from '@/data/site'

/**
 * The site's canonical origin, used for `metadataBase`, Open Graph URLs,
 * `sitemap.xml` and `robots.txt`.
 *
 * Resolution order:
 *  1. `NEXT_PUBLIC_SITE_URL` — set this once a real domain is attached.
 *  2. `VERCEL_PROJECT_PRODUCTION_URL` — the project's production hostname,
 *     provided automatically by Vercel, so preview and production builds
 *     advertise the host actually serving them.
 *  3. `site.url` — the intended final domain.
 *
 * Kept out of `site.ts` because that module is imported by client components,
 * and these variables (apart from the NEXT_PUBLIC_ one) exist only on the server.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, '')

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, '').replace(/\/$/, '')}`

  return site.url
}

export const siteUrl = resolveSiteUrl()

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString()

import { NextResponse, type NextRequest } from 'next/server'

/**
 * Redirects from the previous ASP.NET site's PascalCase URLs to the new routes.
 *
 * This lives in middleware rather than next.config's `redirects()` because that
 * matcher is case-insensitive: a rule from "/About/Achievements" to
 * "/about/achievements" matches its own destination and loops forever. Matching
 * here is an exact, case-sensitive lookup, so only genuine old URLs redirect.
 */
const LEGACY_ROUTES = new Map([
  ['/index', '/'],
  ['/About/TheOrganization', '/about/organization'],
  ['/About/OurFounder', '/about/founder'],
  ['/About/Achievements', '/about/achievements'],
  ['/About/WhatWeDo', '/about/what-we-do'],
  ['/Faqs/Faq', '/faqs'],
  ['/Faqs/whatsNext', '/faqs/whats-next'],
  ['/Gallery/Events', '/gallery/events'],
  ['/Gallery/News', '/gallery/news'],
  ['/Gallery/CoronaDrives', '/gallery/corona-drives'],
  ['/Gallery/ProjectYakeen', '/gallery/project-yakeen'],
  ['/Gallery/DDLActivity', '/gallery/activities/ddl'],
  ['/Gallery/GoGreenActivity', '/gallery/activities/go-green'],
  ['/Gallery/SOSActivity', '/gallery/activities/sos'],
  ['/Gallery/OtherActivity', '/gallery/activities/other'],
  ['/JoinUs/AsIntern', '/join-us/intern'],
  ['/JoinUs/AsMember', '/join-us/member'],
  ['/Contact/ContactUs', '/contact'],
])

const EVENT_DETAIL = /^\/Gallery\/EventDetail\/(\d+)$/

export function middleware(request: NextRequest) {
  // The HTTrack mirror saved every page with a .html suffix; accept both forms.
  const pathname = request.nextUrl.pathname.replace(/\.html$/, '')

  const eventMatch = EVENT_DETAIL.exec(pathname)
  const destination = eventMatch
    ? `/gallery/events/${eventMatch[1]}`
    : LEGACY_ROUTES.get(pathname)

  if (!destination) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = destination
  return NextResponse.redirect(url, 308)
}

export const config = {
  // Only interior paths can be legacy URLs; skip assets and Next internals.
  matcher: ['/((?!_next/|images/|favicon.ico|robots.txt|sitemap.xml).*)'],
}

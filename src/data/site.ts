import type { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'

export const site = {
  name: 'NGO Tammana',
  tagline: 'Loving to live for others',
  motto: 'Not doing great things, but little things with great love!',
  description:
    'TAMMANA is a Punjab-registered, Chandigarh-based non-profit NGO working without financial aid for over 16 years for the welfare of society.',
  /** Update this once the site has a real domain; it feeds metadata and the sitemap. */
  url: 'https://www.tammana.org.in',
  email: 'contact@tammana.org.in',
  phone: '+91 9646072207',
  /** Digits only, for wa.me and tel: links. */
  phoneDigits: '919646072207',
  mission:
    'Committed to selfless service since 2008, ensuring small acts of kindness achieve great love and impact in the community.',
} as const

export const whatsappUrl = `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(
  'Hello! I have some queries.',
)}`

export type Social = {
  label: string
  href: string
  Icon: IconType
  /** Tailwind classes for the icon's circular background. */
  className: string
}

// The archive linked these inconsistently (http:// in the header, https:// in the
// footer, a broken relative path on the contact page). One source of truth now.
export const socials: Social[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ngotammana',
    Icon: FaFacebookF,
    className: 'bg-facebook',
  },
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com/NgoTammana',
    Icon: FaXTwitter,
    className: 'bg-black',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/user/NGOTAMMANA',
    Icon: FaYoutube,
    className: 'bg-youtube',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ngotammana',
    Icon: FaInstagram,
    className:
      'bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]',
  },
]

export type NavNode = {
  label: string
  href?: string
  children?: NavNode[]
}

export const nav: NavNode[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'ABOUT',
    children: [
      { label: 'THE ORGANIZATION', href: '/about/organization' },
      { label: 'OUR FOUNDER', href: '/about/founder' },
      { label: 'ACHIEVEMENTS', href: '/about/achievements' },
      { label: 'WHAT WE DO', href: '/about/what-we-do' },
    ],
  },
  {
    label: 'FAQs',
    children: [
      { label: 'FAQs', href: '/faqs' },
      { label: "WHAT's NEXT", href: '/faqs/whats-next' },
    ],
  },
  {
    label: 'GALLERY',
    children: [
      { label: 'EVENTS', href: '/gallery/events' },
      {
        label: 'ACTIVITIES',
        children: [
          { label: 'DDL', href: '/gallery/activities/ddl' },
          { label: 'Go Green', href: '/gallery/activities/go-green' },
          { label: 'S.O.S', href: '/gallery/activities/sos' },
          { label: 'Other Activities', href: '/gallery/activities/other' },
        ],
      },
      { label: 'NEWS', href: '/gallery/news' },
      { label: 'CORONA DRIVES', href: '/gallery/corona-drives' },
      { label: 'PROJECT YAKEEN', href: '/gallery/project-yakeen' },
    ],
  },
  {
    label: 'JOIN US',
    children: [
      { label: 'AS INTERN', href: '/join-us/intern' },
      { label: 'AS MEMBER', href: '/join-us/member' },
    ],
  },
  { label: 'CONTACT US', href: '/contact' },
]

/** Google Form ids embedded on the Join Us pages. */
export const joinForms = {
  member: '1FAIpQLSfXoMY6icch3nXj_V1qLvCETMuqQOfG2cYmPrz3Ecbf6MSpag',
  intern: '1FAIpQLSdLrcMxB8DksCukqp0cusPWsAAGuDbPmRRK2tx4YghdbHF6gA',
} as const

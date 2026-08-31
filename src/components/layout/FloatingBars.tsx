import { FaWhatsapp } from 'react-icons/fa6'

import { socials, whatsappUrl } from '@/data/site'

/** Vertical stack of social links pinned to the right edge, centered vertically. */
export function SocialFloatingBar() {
  return (
    <div className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
      {socials.map(({ label, href, Icon, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-110 ${className}`}
        >
          <Icon aria-hidden className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  )
}

/** Bottom-right "May I Help You" pill linking to WhatsApp. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 font-medium text-white shadow-lg transition-colors transition-transform hover:scale-105 hover:bg-whatsapp-dark"
    >
      <FaWhatsapp aria-hidden className="h-5 w-5" />
      <span className="hidden sm:inline">May I Help You</span>
      <span className="sr-only sm:hidden">Chat with us on WhatsApp</span>
    </a>
  )
}

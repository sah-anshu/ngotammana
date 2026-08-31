import { FaEnvelope, FaPhone } from 'react-icons/fa6'

import { site, socials } from '@/data/site'

export default function SiteFooter() {
  return (
    <footer className="mt-4 bg-footer text-gray-100">
      <div className="container-site py-6">
        <div className="grid gap-8 md:grid-cols-3">
          <section>
            <h2 className="mb-4 text-base font-semibold uppercase text-whatsapp">Contact Us</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <FaPhone aria-hidden className="h-4 w-4 shrink-0" />
                <span>
                  Call/WhatsApp:{' '}
                  <a href={`tel:${site.phoneDigits}`} className="hover:text-whatsapp">
                    {site.phone}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope aria-hidden className="h-4 w-4 shrink-0" />
                <span>
                  Email:{' '}
                  <a href={`mailto:${site.email}`} className="hover:text-whatsapp">
                    {site.email}
                  </a>
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold uppercase text-whatsapp">Follow Us</h2>
            <ul className="flex gap-2">
              {socials.map(({ label, href, Icon, className }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform hover:scale-110 ${className}`}
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold uppercase text-whatsapp">Our Mission</h2>
            <p className="text-sm leading-relaxed">{site.mission}</p>
          </section>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20 py-2 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} {site.name}. All Rights Reserved.
      </div>
    </footer>
  )
}

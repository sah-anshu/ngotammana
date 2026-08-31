'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaChevronDown, FaChevronRight, FaXmark } from 'react-icons/fa6'

import { nav, type NavNode, site } from '@/data/site'

const linkBase =
  'block px-3 py-2 font-sans text-xs font-bold tracking-wide text-nav-fg transition-colors hover:bg-nav-hover hover:text-white focus-visible:bg-nav-hover focus-visible:text-white'

const menuItem =
  'block px-4 py-2.5 font-sans text-xs font-bold text-nav-hover transition-colors hover:bg-nav-hover hover:text-white focus-visible:bg-nav-hover focus-visible:text-white'

const panel =
  'absolute z-40 min-w-max overflow-hidden rounded-md border border-black/10 bg-white shadow-lg ' +
  'invisible opacity-0 transition-opacity duration-150'

/* ------------------------------------------------------------- desktop nav */

/**
 * Menus open on hover (as the original did) and on keyboard focus. Focus-within
 * keeps the panel open while tabbing through it, which the CSS-only hover menus
 * on the old site never allowed.
 */
function DesktopNav() {
  return (
    <ul className="hidden items-center lg:flex">
      {nav.map((item) =>
        item.children ? (
          <li key={item.label} className="group/top relative">
            <button
              type="button"
              aria-haspopup="true"
              className={`${linkBase} flex items-center gap-1.5`}
            >
              {item.label}
              <FaChevronDown aria-hidden className="h-2.5 w-2.5" />
            </button>

            <ul
              className={`${panel} left-1/2 top-full -translate-x-1/2 group-hover/top:visible group-hover/top:opacity-100 group-focus-within/top:visible group-focus-within/top:opacity-100`}
            >
              {item.children.map((child) =>
                child.children ? (
                  <li key={child.label} className="group/sub relative">
                    <button
                      type="button"
                      aria-haspopup="true"
                      className={`${menuItem} flex w-full items-center justify-between gap-6`}
                    >
                      {child.label}
                      <FaChevronRight aria-hidden className="h-2.5 w-2.5" />
                    </button>

                    <ul
                      className={`${panel} left-full top-0 group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100`}
                    >
                      {child.children.map((leaf) => (
                        <li key={leaf.label}>
                          <Link href={leaf.href!} className={menuItem}>
                            {leaf.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={child.label}>
                    <Link href={child.href!} className={menuItem}>
                      {child.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </li>
        ) : (
          <li key={item.label}>
            <Link href={item.href!} className={linkBase}>
              {item.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  )
}

/* -------------------------------------------------------------- mobile nav */

function MobileBranch({ node, depth = 0 }: { node: NavNode; depth?: number }) {
  const [open, setOpen] = useState(false)

  if (!node.children) {
    return (
      <li>
        <Link
          href={node.href!}
          className="block py-2.5 font-sans text-sm font-bold text-nav-fg"
          style={{ paddingLeft: depth * 16 }}
        >
          {node.label}
        </Link>
      </li>
    )
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2.5 font-sans text-sm font-bold text-nav-fg"
        style={{ paddingLeft: depth * 16 }}
      >
        {node.label}
        <FaChevronDown
          aria-hidden
          className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className="border-l border-gray-200">
          {node.children.map((child) => (
            <MobileBranch key={child.label} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

/* ------------------------------------------------------------------ header */

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-t border-dashed border-gray-300 bg-white">
      <nav aria-label="Main" className="mx-auto flex max-w-[1600px] items-center gap-4 px-3 py-2">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/brand/logo.webp"
            alt={`${site.name} — ${site.tagline}`}
            width={147}
            height={46}
            priority
            className="h-auto w-[187px]"
          />
        </Link>

        <div className="flex flex-1 justify-center">
          <DesktopNav />
        </div>

        {/* Balances the logo so the nav sits optically centered, as on the original. */}
        <div className="hidden w-[187px] shrink-0 lg:block" aria-hidden />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="ml-auto rounded border border-gray-300 p-2 text-nav-fg lg:hidden"
        >
          {open ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="border-t border-gray-200 px-4 pb-4 lg:hidden"
          // Any link tap navigates away, so collapse the drawer behind it.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setOpen(false)
          }}
        >
          {nav.map((item) => (
            <MobileBranch key={item.label} node={item} />
          ))}
        </ul>
      )}
    </header>
  )
}

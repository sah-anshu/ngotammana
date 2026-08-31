import type { ReactNode } from 'react'

/** The full-width slate banner that opens every interior page. */
export function PageHeading({ children }: { children: ReactNode }) {
  return (
    <div className="bg-heading-bar px-4 pb-5 pt-3 text-center text-white">
      <h1 className="font-sans text-2xl font-normal sm:text-[34px]">{children}</h1>
    </div>
  )
}

/** The repeated in-container title, optionally with a smaller qualifier beneath. */
export function PageSubHeading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="pt-2">
      <h2 className="font-body text-2xl font-medium text-ink-strong">{title}</h2>
      {note && <p className="pt-1 font-body text-sm font-bold text-ink">{note}</p>}
    </div>
  )
}

/**
 * Body-copy wrapper matching the old .key-points-list rules: 14px Lato, dark
 * grey, with sensible list and emphasis styling.
 */
export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`font-body text-sm leading-relaxed text-ink [&_a]:text-nav-hover [&_a]:underline [&_h4]:mt-5 [&_h4]:font-bold [&_li]:mb-1 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 ${className}`}
    >
      {children}
    </div>
  )
}

/** Standard interior page shell: banner, then a centered content container. */
export function PageShell({
  heading,
  title,
  note,
  children,
}: {
  heading: string
  title?: string
  note?: string
  children: ReactNode
}) {
  return (
    <>
      <PageHeading>{heading}</PageHeading>
      <div className="container-site pb-12 pt-8">
        {title && <PageSubHeading title={title} note={note} />}
        {children}
      </div>
    </>
  )
}

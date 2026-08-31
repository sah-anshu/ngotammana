export default function GoogleFormEmbed({ formId, title }: { formId: string; title: string }) {
  return (
    <div className="pt-6">
      <iframe
        src={`https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`}
        title={title}
        loading="lazy"
        className="h-[900px] w-full max-w-[800px] border-0"
      >
        Loading…
      </iframe>

      {/* Fallback for anyone whose browser blocks the embed. */}
      <p className="pt-2 font-body text-sm text-ink">
        Trouble loading the form?{' '}
        <a
          href={`https://docs.google.com/forms/d/e/${formId}/viewform`}
          target="_blank"
          rel="noreferrer"
          className="text-nav-hover underline"
        >
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  )
}

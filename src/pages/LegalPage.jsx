import { Link, useParams } from 'react-router-dom'
import { COMPANY, POLICIES, POLICY_BY_SLUG } from '../content/legal'
import NotFound from './NotFound'

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export default function LegalPage() {
  const { slug } = useParams()
  const policy = POLICY_BY_SLUG[slug]

  if (!policy) return <NotFound />

  const others = POLICIES.filter((p) => p.slug !== policy.slug)

  return (
    <div className="bg-white">
      {/* header */}
      <div className="border-b border-line bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back to {COMPANY.product}
          </Link>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {policy.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">{policy.tagline}</p>
          <p className="mt-5 text-xs text-ink-soft">Last updated {COMPANY.updated}</p>
        </div>
      </div>

      {/* draft notice — remove once counsel has signed these off */}
      <div className="mx-auto max-w-6xl px-6 pt-10 lg:px-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm leading-relaxed text-amber-900">
            <strong className="font-semibold">Draft pending legal review.</strong> This document is
            a starting point written for an AI voice-agent service. It is not legal advice and has
            not been reviewed for the jurisdictions {COMPANY.product} and its customers operate in.
            Items in [square brackets] still need to be filled in.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-8 lg:py-16">
        {/* body */}
        <article className="min-w-0">
          {policy.sections.map((s) => (
            <section key={s.h} id={slugify(s.h)} className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">{s.h}</h2>

              {s.p?.map((para) => (
                <p key={para} className="mt-4 leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}

              {s.ul && (
                <ul className="mt-4 space-y-2.5">
                  {s.ul.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {s.after?.map((para) => (
                <p key={para} className="mt-4 leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </section>
          ))}

          <div className="mt-10 rounded-2xl border border-line bg-mist p-6">
            <h2 className="text-sm font-semibold text-ink">Questions about this document?</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Write to{' '}
              <a href={`mailto:${COMPANY.legalEmail}`} className="text-brand-600 underline">
                {COMPANY.legalEmail}
              </a>
              . For privacy requests use{' '}
              <a href={`mailto:${COMPANY.privacyEmail}`} className="text-brand-600 underline">
                {COMPANY.privacyEmail}
              </a>
              , and for security reports{' '}
              <a href={`mailto:${COMPANY.securityEmail}`} className="text-brand-600 underline">
                {COMPANY.securityEmail}
              </a>
              .
            </p>
          </div>
        </article>

        {/* side nav */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">On this page</p>
          <ul className="mt-4 space-y-2 border-l border-line pl-4">
            {policy.sections.map((s) => (
              <li key={s.h}>
                <a
                  href={`#${slugify(s.h)}`}
                  className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                >
                  {s.h}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Other documents
          </p>
          <ul className="mt-4 space-y-2 border-l border-line pl-4">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/legal/${p.slug}`}
                  className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

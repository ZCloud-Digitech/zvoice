import { Link } from 'react-router-dom'
import { POLICIES } from '../content/legal'

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8 lg:py-32">
        <p className="font-mono text-sm text-brand-600">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          That page hasn’t been built yet
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-ink-soft">
          The link works, but there’s nothing behind it yet. Try one of these instead.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Back to home
          </Link>
          <Link
            to="/#pricing"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            See pricing
          </Link>
        </div>

        <div className="mt-14 border-t border-line pt-10 text-left">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Legal documents
          </p>
          <ul className="mx-auto mt-5 grid max-w-lg gap-x-8 gap-y-2 sm:grid-cols-2">
            {POLICIES.map((p) => (
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
        </div>
      </div>
    </div>
  )
}

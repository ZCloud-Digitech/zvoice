import { Link } from 'react-router-dom'
const PLANS = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    desc: 'For solo operators testing their first AI agent.',
    features: ['1 phone number', '300 minutes / mo', 'Calendar booking', 'Email support'],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$149',
    period: '/mo',
    desc: 'For small teams who rely on inbound calls daily.',
    features: [
      '3 phone numbers',
      '1,500 minutes / mo',
      'CRM integrations',
      'Call analytics & transcripts',
      'Priority support',
    ],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For multi-location or high-volume call operations.',
    features: [
      'Unlimited numbers',
      'Custom minute volume',
      'Dedicated onboarding',
      'SSO & audit logs',
      'SLA-backed uptime',
    ],
    cta: 'Talk to sales',
    highlighted: false,
  },
]

/* Confirm every line against your actual billing setup before launch. */
const BILLING_TERMS = [
  ['Billing frequency', 'Monthly, charged on the same date each month'],
  ['Included voice minutes', '300 (Starter) · 1,500 (Growth) · custom (Enterprise)'],
  ['Overage pricing', '$0.12 per additional minute, billed in arrears'],
  ['Trial', '14 days free — no card required, no charge if you cancel first'],
  ['Auto-renewal', 'Plans renew automatically until cancelled'],
  ['Cancellation', 'Cancel anytime; access continues to the end of the paid period'],
  ['Taxes', 'Prices exclude VAT/GST, applied at checkout where applicable'],
  ['Unused minutes', 'Do not roll over to the next billing period'],
]

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Simple plans that scale with your call volume
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Every plan includes a 14-day free trial. No setup fees, cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <div
              key={p.name}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`relative flex flex-col rounded-2xl p-8 ${
                p.highlighted
                  ? 'border-2 border-brand-500 bg-white shadow-[0_20px_50px_-15px_rgba(79,70,229,0.35)] lg:-translate-y-3'
                  : 'border border-line bg-white'
              }`}
            >
              {p.highlighted && (
                <span
                  className="pointer-events-none absolute -top-10 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full opacity-60"
                  style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.35) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
              )}
              {p.highlighted && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{p.desc}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-ink">{p.price}</span>
                {p.period && <span className="text-sm text-ink-soft">{p.period}</span>}
              </p>

              <a
                href="#signup"
                className={`mt-6 rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${
                  p.highlighted
                    ? 'bg-brand-500 text-white hover:bg-brand-600'
                    : 'border border-line text-ink hover:border-ink'
                }`}
              >
                {p.cta}
              </a>

              <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-soft">
                By creating an account you agree to the{' '}
                <Link to="/legal/terms-of-service" className="underline hover:text-ink">
                  Terms of Service
                </Link>{' '}
                and acknowledge the{' '}
                <Link to="/legal/privacy-policy" className="underline hover:text-ink">
                  Privacy Policy
                </Link>
                .
              </p>

              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span className="text-brand-500">
                      <Check />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Material billing terms belong on the pricing page itself, not buried
            inside the legal pages. */}
        <div data-reveal className="mt-12 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-ink">Billing conditions</h3>
          <dl className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {BILLING_TERMS.map(([term, detail]) => (
              <div key={term}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {term}
                </dt>
                <dd className="mt-1 text-sm text-ink">{detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-xs">
            <span className="font-medium text-ink-soft">Before you buy:</span>
            <Link to="/legal/refund-policy" className="text-brand-600 underline hover:text-brand-700">
              Refund Policy
            </Link>
            <Link to="/legal/cancellation-policy" className="text-brand-600 underline hover:text-brand-700">
              Cancellation Policy
            </Link>
            <Link to="/legal/terms-of-service" className="text-brand-600 underline hover:text-brand-700">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

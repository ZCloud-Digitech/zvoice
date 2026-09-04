import { Link } from 'react-router-dom'
import { openCookiePreferences } from '../lib/consent'

/* Footer information architecture follows the policy-placement spec:
   Product / Company / Legal / Accessibility. Every legal href points at a
   page that still needs real, reviewed text before launch. */

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Documentation', href: '/docs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Security', href: '/legal/security-policy' },
      { label: 'Responsible Disclosure', href: '/legal/responsible-disclosure' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy-policy' },
      { label: 'Terms of Service', href: '/legal/terms-of-service' },
      { label: 'Cookie Policy', href: '/legal/cookie-policy' },
      { label: 'Cookie Preferences', action: 'cookies' },
      { label: 'Refund Policy', href: '/legal/refund-policy' },
      { label: 'Cancellation Policy', href: '/legal/cancellation-policy' },
      { label: 'Disclaimer', href: '/legal/disclaimer' },
      { label: 'Acceptable Use Policy', href: '/legal/acceptable-use-policy' },
      { label: 'Data Processing Agreement', href: '/legal/data-processing-agreement' },
    ],
  },
  {
    title: 'Accessibility',
    links: [{ label: 'Accessibility Statement', href: '/legal/accessibility-statement' }],
  },
]

const LINK_CLASS = 'text-sm text-ink-soft transition-colors hover:text-ink'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <path d="M9 13.5V18.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
                  <path d="M13.4 10.5V21.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
                  <path d="M17.8 8V24" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
                  <path d="M22.2 11.5V20.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-ink">ZVoice</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Realtime AI voice agents for modern businesses — answering, qualifying, and booking
              so you never miss a call.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.action === 'cookies' ? (
                      <button onClick={openCookiePreferences} className={`${LINK_CLASS} text-left`}>
                        {l.label}
                      </button>
                    ) : (
                      <Link to={l.href} className={LINK_CLASS}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} ZVoice, a product of zvoiceai. All rights reserved.
          </p>
          <p className="text-xs text-ink-soft">voice.zvoiceai.io</p>
        </div>
      </div>

      <div
        className="pointer-events-none -mt-8 select-none overflow-hidden font-display text-[9rem] font-black leading-none tracking-tighter text-ink/[0.03] sm:text-[13rem]"
        aria-hidden="true"
      >
        <p className="text-center">ZVoice</p>
      </div>
    </footer>
  )
}

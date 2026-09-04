import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 shrink-0">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
          <path d="M9 13.5V18.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M13.4 10.5V21.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M17.8 8V24" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M22.2 11.5V20.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-ink">ZVoice</span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      id="top"
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-line bg-white/85 backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#login" className="text-sm font-medium text-ink-soft hover:text-ink">
            Log in
          </a>
          <a
            href="#pricing"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Start free trial
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-line md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {open ? (
              <path d="M4 4L14 14M14 4L4 14" stroke="#0B0D17" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M2 5H16" stroke="#0B0D17" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2 9H16" stroke="#0B0D17" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2 13H16" stroke="#0B0D17" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink-soft"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-line pt-4">
              <a href="#login" className="text-sm font-medium text-ink-soft">
                Log in
              </a>
              <a
                href="#pricing"
                className="rounded-full bg-ink px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Start free trial
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

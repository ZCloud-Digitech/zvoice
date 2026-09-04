const COLUMNS = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'How it works', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Help center', 'API docs', 'Status', 'Security'],
  },
  {
    title: 'Legal',
    links: ['Privacy policy', 'Terms of service', 'Cookie policy'],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="#top" className="flex items-center gap-2">
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              AI voice agents that answer, qualify, and book — so your business never misses a
              call.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ink-soft transition-colors hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} ZVoice, a product of ZenxAI. All rights reserved.
          </p>
          <p className="text-xs text-ink-soft">voice.zenxai.io</p>
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

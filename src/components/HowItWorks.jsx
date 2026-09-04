const STEPS = [
  {
    n: '01',
    title: 'Connect your number',
    desc: 'Port your existing business line or grab a new one — no hardware, no PBX required.',
    detail: '(415) 555-0182 → forwarded to ZVoice in one click',
  },
  {
    n: '02',
    title: 'Train your agent',
    desc: 'Describe your business, upload FAQs, and set the tone. ZVoice learns it in minutes.',
    detail: '"You run a dental clinic open Mon–Sat, 9–6…"',
  },
  {
    n: '03',
    title: 'Go live',
    desc: 'Your agent starts answering calls immediately, escalating to your team when needed.',
    detail: 'First call answered — 00:02 after activation',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            From sign-up to your first booked call in one afternoon
          </h2>
        </div>

        <div className="relative mt-16 space-y-6">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-white p-8 sm:flex-row sm:items-center ${
                i % 2 === 1 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <span
                className="pointer-events-none absolute -top-6 select-none font-display text-[9rem] font-black leading-none text-line/60"
                style={i % 2 === 1 ? { right: '-0.5rem' } : { left: '-0.5rem' }}
                aria-hidden="true"
              >
                {s.n}
              </span>

              <div className={`relative flex-1 ${i % 2 === 1 ? 'sm:text-right' : ''}`}>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  Step {s.n}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                  {i % 2 === 1 ? <span className="sm:ml-auto sm:block">{s.desc}</span> : s.desc}
                </p>
              </div>

              <div
                className={`relative w-full max-w-xs shrink-0 rounded-xl border border-line bg-mist px-4 py-3 font-mono text-xs text-ink-soft ${
                  i % 2 === 1 ? 'sm:mr-auto' : 'sm:ml-auto'
                }`}
              >
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

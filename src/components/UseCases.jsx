const CASES = [
  {
    title: 'Sales & lead intake',
    desc: 'Answer inbound calls, qualify buyers, and hand hot leads to your reps instantly.',
    stat: 'Captures leads outside business hours',
    tint: 'bg-brand-500',
    soft: 'bg-brand-50',
    text: 'text-brand-600',
    icon: (
      <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    ),
  },
  {
    title: 'Customer support',
    desc: 'Resolve common questions, check order status, and escalate anything complex to a human.',
    stat: 'Consistent answers, every call',
    tint: 'bg-accent-500',
    soft: 'bg-teal-50',
    text: 'text-teal-600',
    icon: (
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    ),
  },
  {
    title: 'Appointment scheduling',
    desc: 'Sync with your calendar to book, reschedule, and confirm appointments automatically.',
    stat: 'No double-bookings, no back-and-forth',
    tint: 'bg-fuchsia-500',
    soft: 'bg-fuchsia-50',
    text: 'text-fuchsia-600',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Built for</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            One voice agent, every phone-based workflow
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <div
              key={c.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line p-7"
            >
              <span
                className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-[0.08] transition-transform duration-300 group-hover:scale-125 ${c.tint}`}
              />
              <div className="relative">
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${c.soft} ${c.text}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.desc}</p>
              </div>
              <p className={`relative mt-6 text-sm font-semibold ${c.text}`}>{c.stat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

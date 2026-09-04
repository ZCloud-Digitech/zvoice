const SIDE_FEATURES = [
  {
    title: 'Books to your calendar',
    desc: 'Checks real-time availability and confirms appointments without back-and-forth.',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    title: 'Qualifies every lead',
    desc: 'Asks the right questions, scores intent, and routes hot leads to your team instantly.',
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />,
  },
  {
    title: '30+ languages',
    desc: 'Serve customers in their own language with native-sounding multilingual voices.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 010 18 14 14 0 010-18z" />
      </>
    ),
  },
  {
    title: 'Live in minutes',
    desc: 'Connect your number, write a few instructions, and your agent is ready to take calls.',
    icon: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  },
]

function MiniWave() {
  const bars = [6, 12, 20, 10, 24, 14, 28, 16, 20, 8, 18, 12]
  return (
    <div className="flex items-end gap-[3px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-white/70"
          style={{ height: `${h}px`, animation: `zv-wave2 1.2s ease-in-out ${i * 0.05}s infinite` }}
        />
      ))}
      <style>{`
        @keyframes zv-wave2 { 0%,100% { transform: scaleY(.45); opacity:.55 } 50% { transform: scaleY(1); opacity:1 } }
      `}</style>
    </div>
  )
}

function FeaturedCard() {
  return (
    <div data-reveal className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-ink p-7 text-white sm:col-span-2 sm:row-span-2">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.55) 0%, transparent 70%)' }}
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Sounds human
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold leading-snug">
          Natural voice, real-time interruptions, zero robotic pauses.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
          ZVoice handles overlapping speech, "umms," and topic changes the way a real front-desk
          person would — most callers never guess they're talking to AI.
        </p>
      </div>
      <div className="relative mt-8 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <MiniWave />
        <span className="font-mono text-xs text-white/50">listening…</span>
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Why ZVoice</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Everything a great receptionist does. None of the wait.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            ZVoice picks up on the first ring, understands what your caller needs, and takes the
            right action — every single time.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <FeaturedCard />
          {SIDE_FEATURES.map((f, i) => (
            <div
              key={f.title}
              data-reveal
              style={{ transitionDelay: `${120 + i * 80}ms` }}
              className="rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[0_12px_30px_-12px_rgba(11,13,23,0.12)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

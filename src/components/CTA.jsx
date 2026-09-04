export default function CTA() {
  return (
    <section className="bg-white px-6 pb-20 lg:px-8 lg:pb-28">
      <div data-reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center sm:px-16">
        <span
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.55) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.45) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Your line, answered
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to stop missing calls?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Set up your first ZVoice agent today and start capturing every lead that calls in —
            day or night.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#pricing"
              className="w-full rounded-full bg-brand-500 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-600 sm:w-auto"
            >
              Start your free trial
            </a>
            <a
              href="#demo"
              className="w-full rounded-full border border-white/20 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:border-white/40 sm:w-auto"
            >
              Hear a live demo call
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { claimAudio, onAudioClaim } from '../lib/audio'

/* An auto-playing walkthrough of a single call, start to finish. It behaves
   like a short explainer video — it plays when scrolled into view, loops, and
   can be paused or jumped around — but it's live DOM, so it stays sharp at any
   size and costs nothing to download. */

const STEPS = [
  {
    time: '0:00',
    title: 'The phone rings',
    desc: 'A new caller hits your business line. Nobody is free — or it’s 9pm.',
    ms: 3400,
  },
  {
    time: '0:02',
    title: 'ZVoice picks up',
    desc: 'Answered on the first ring with your greeting, in your tone of voice.',
    ms: 3800,
  },
  {
    time: '0:09',
    title: 'It understands the ask',
    desc: 'Speech becomes intent: what they want, when, and how urgent it is.',
    ms: 4200,
  },
  {
    time: '0:18',
    title: 'It checks your calendar',
    desc: 'Real availability — not a callback promise — offered on the call.',
    ms: 4200,
  },
  {
    time: '0:27',
    title: 'It books the slot',
    desc: 'Name and number captured, appointment written to your calendar.',
    ms: 4000,
  },
  {
    time: '0:34',
    title: 'Everything syncs',
    desc: 'CRM updated, confirmation texted, your team notified. No admin left.',
    ms: 4400,
  },
]

/* Where each step begins inside /sample-call.mp3, in seconds. Measured from
   the individual turns when the file was assembled — with sound on, the
   animation is driven by the audio clock so the two can't drift apart. */
const CUES = [0, 3.65, 11.53, 18.53, 26.16, 41.62]

/* ---------- little building blocks used by the stages ---------- */

function LiveWave({ n = 22, className = 'bg-brand-500' }) {
  return (
    <div className="flex h-8 items-center gap-[3px]">
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className={`zv-anim w-[3px] rounded-full ${className}`}
          style={{
            height: `${8 + ((i * 7) % 26)}px`,
            animation: `zv-wave 1.1s ease-in-out ${i * 0.05}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function Bubble({ from, children, delay = 0 }) {
  const agent = from === 'agent'
  return (
    <p
      className={`zv-anim max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
        agent
          ? 'ml-auto rounded-tr-sm bg-brand-500 text-white'
          : 'rounded-tl-sm bg-white text-ink'
      }`}
      style={{ animation: `zv-word-in .45s cubic-bezier(.2,.7,.3,1) ${delay}s both` }}
    >
      {children}
    </p>
  )
}

function Chip({ children, tone = 'brand', delay = 0 }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-600',
    teal: 'bg-teal-50 text-teal-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  }
  return (
    <span
      className={`zv-anim inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
      style={{ animation: `zv-word-in .4s cubic-bezier(.2,.7,.3,1) ${delay}s both` }}
    >
      {children}
    </span>
  )
}

/* ---------- one screen per step ---------- */

function Stage({ index }) {
  if (index === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <div className="relative grid h-24 w-24 place-items-center">
          <span
            className="zv-anim absolute inset-0 rounded-full border border-brand-500/40"
            style={{ animation: 'zv-ring 2.2s ease-out infinite' }}
          />
          <span
            className="zv-anim absolute inset-0 rounded-full border border-brand-500/40"
            style={{ animation: 'zv-ring 2.2s ease-out .7s infinite' }}
          />
          <span
            className="zv-anim absolute inset-0 rounded-full border border-brand-500/40"
            style={{ animation: 'zv-ring 2.2s ease-out 1.4s infinite' }}
          />
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-brand-500 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
            </svg>
          </span>
        </div>
        <div>
          <p className="font-display text-xl font-bold text-ink">Incoming call</p>
          <p className="mt-1 font-mono text-sm text-ink-soft">+1 (415) 555-0182</p>
          <p className="mt-3 text-xs text-ink-soft">Tuesday · 9:04 PM · after hours</p>
        </div>
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-brand-50 font-display text-sm font-bold text-brand-600">
              Z
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">ZVoice answered</p>
              <p className="text-xs text-ink-soft">0.4s to pick up</p>
            </div>
          </div>
          <LiveWave n={12} />
        </div>
        <Bubble from="agent">
          "Thanks for calling Northside Dental — this is the front desk. How can I help?"
        </Bubble>
        <div className="flex flex-wrap gap-2">
          <Chip delay={0.5}>Your greeting</Chip>
          <Chip tone="teal" delay={0.65}>Your tone</Chip>
          <Chip tone="emerald" delay={0.8}>No hold music</Chip>
        </div>
      </div>
    )
  }

  if (index === 2) {
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <Bubble from="caller">
          "Hi, I'd like to book a consultation for next Tuesday afternoon if you have anything open."
        </Bubble>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Understood as
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip delay={0.15}>Intent · Book appointment</Chip>
            <Chip tone="teal" delay={0.3}>Type · New consultation</Chip>
            <Chip tone="emerald" delay={0.45}>When · Tue, afternoon</Chip>
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-xs text-ink-soft">
            <LiveWave n={8} className="bg-brand-500/60" />
            <span>transcribing · 240ms latency</span>
          </div>
        </div>
      </div>
    )
  }

  if (index === 3) {
    const slots = [
      { t: '9:00 AM', open: false },
      { t: '11:30 AM', open: false },
      { t: '2:30 PM', open: true },
      { t: '4:00 PM', open: true },
    ]
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="rounded-xl border border-line bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Tuesday, 14th</p>
            <span className="text-xs text-ink-soft">Google Calendar · live</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {slots.map((s, i) => (
              <div
                key={s.t}
                className={`zv-anim rounded-lg border px-3 py-2.5 text-sm ${
                  s.open
                    ? 'border-brand-500/40 bg-brand-50 font-semibold text-brand-600'
                    : 'border-line bg-mist text-ink-soft line-through'
                }`}
                style={{ animation: `zv-word-in .4s ease-out ${0.1 + i * 0.12}s both` }}
              >
                {s.t}
              </div>
            ))}
          </div>
        </div>
        <Bubble from="agent" delay={0.7}>
          "I have 2:30 or 4:00 PM open on Tuesday — which works better?"
        </Bubble>
      </div>
    )
  }

  if (index === 4) {
    const rows = [
      ['Name', 'Daniel Reyes'],
      ['Mobile', '+1 (415) 555-0182'],
      ['Slot', 'Tue 14th · 2:30 PM'],
      ['With', 'Dr. Shah'],
    ]
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <Bubble from="caller">"2:30 works great — it's Daniel Reyes, 415-555-0182."</Bubble>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Appointment created
          </p>
          <dl className="mt-3 space-y-2">
            {rows.map(([k, v], i) => (
              <div
                key={k}
                className="zv-anim flex items-center justify-between text-sm"
                style={{ animation: `zv-word-in .4s ease-out ${0.15 + i * 0.16}s both` }}
              >
                <dt className="text-ink-soft">{k}</dt>
                <dd className="font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }

  const done = [
    { label: 'Written to Google Calendar', icon: '📅' },
    { label: 'Contact created in your CRM', icon: '↗' },
    { label: 'Confirmation text sent to Daniel', icon: '💬' },
    { label: 'Summary emailed to your team', icon: '✉' },
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {done.map((d, i) => (
        <div
          key={d.label}
          className="zv-anim flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3"
          style={{ animation: `zv-word-in .45s ease-out ${i * 0.28}s both` }}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-sm">
            {d.icon}
          </span>
          <span className="flex-1 text-sm text-ink">{d.label}</span>
          <span className="text-sm font-bold text-emerald-500">✓</span>
        </div>
      ))}
      <p className="mt-2 text-center text-xs text-ink-soft">
        Total handling time: 38 seconds · Your involvement: none
      </p>
    </div>
  )
}

/* ---------- the player shell ---------- */

export default function CallFlow() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  // Default to playing: if IntersectionObserver never reports (or isn't
  // supported), the demo should still run rather than sit frozen.
  const [inView, setInView] = useState(true)
  const [paused, setPaused] = useState(false)
  const [sound, setSound] = useState(false)
  const sectionRef = useRef(null)
  const rafRef = useRef(null)
  const audioRef = useRef(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Another player (the hero sample) taking over means we go quiet.
  useEffect(
    () =>
      onAudioClaim((owner) => {
        if (owner !== 'callflow' && audioRef.current) {
          audioRef.current.pause()
          setSound(false)
        }
      }),
    []
  )

  // Only run while the section is actually on screen.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const playing = inView && !paused && !reduced.current

  useEffect(() => {
    const audio = audioRef.current
    if (!playing) {
      cancelAnimationFrame(rafRef.current)
      if (audio) audio.pause()
      return
    }
    if (sound && audio && audio.paused) audio.play().catch(() => setSound(false))

    const step = STEPS[active]
    const start = performance.now() - progress * step.ms

    const tick = (now) => {
      const el = audioRef.current
      if (sound && el && !el.paused && el.duration > 0) {
        // audio is the clock
        const t = el.currentTime
        let i = 0
        while (i + 1 < CUES.length && CUES[i + 1] <= t) i++
        const end = i + 1 < CUES.length ? CUES[i + 1] : el.duration
        setActive(i)
        setProgress(Math.min((t - CUES[i]) / (end - CUES[i]), 0.999))
      } else {
        const p = (now - start) / step.ms
        if (p >= 1) {
          setProgress(0)
          setActive((a) => (a + 1) % STEPS.length)
          return
        }
        setProgress(p)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, active, sound]) // eslint-disable-line react-hooks/exhaustive-deps

  const jump = (i) => {
    setActive(i)
    setProgress(0)
    const el = audioRef.current
    if (sound && el) el.currentTime = CUES[i]
  }

  const toggleSound = () => {
    const el = audioRef.current
    if (!el) return
    if (sound) {
      el.pause()
      setSound(false)
      return
    }
    claimAudio('callflow')
    el.currentTime = CUES[active] // start where the visuals already are
    el.play()
      .then(() => {
        setSound(true)
        setPaused(false)
      })
      .catch(() => setSound(false))
  }

  return (
    <section
      id="watch"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-line bg-mist py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Watch a call
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            One missed call, handled end to end
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            This is every step of a real booking — from the ring to the calendar entry — with
            nobody on your team touching the phone.
          </p>
        </div>

        <div data-reveal style={{ transitionDelay: '120ms' }} className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* step list — doubles as the scrubber */}
          <ol className="min-w-0 space-y-1">
            {STEPS.map((s, i) => {
              const isActive = i === active
              const isDone = i < active
              return (
                <li key={s.title}>
                  <button
                    onClick={() => jump(i)}
                    className={`relative w-full overflow-hidden rounded-xl px-4 py-3 text-left transition-colors ${
                      isActive ? 'bg-white shadow-[0_10px_30px_-18px_rgba(11,13,23,0.5)]' : 'hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-y-0 left-0 bg-brand-500/[0.07]"
                        style={{ width: `${progress * 100}%` }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative flex items-start gap-3">
                      <span
                        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                          isActive
                            ? 'bg-brand-500 text-white'
                            : isDone
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-white text-ink-soft'
                        }`}
                      >
                        {isDone ? '✓' : i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-baseline gap-2">
                          <span
                            className={`text-sm font-semibold ${isActive ? 'text-ink' : 'text-ink-soft'}`}
                          >
                            {s.title}
                          </span>
                          <span className="font-mono text-[11px] text-ink-soft">{s.time}</span>
                        </span>
                        {isActive && (
                          <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                            {s.desc}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}

            <li className="flex flex-wrap items-center gap-3 px-4 pt-3">
              <button
                onClick={() => setPaused((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink"
              >
                {paused ? '▶ Play' : '❚❚ Pause'}
              </button>

              <button
                onClick={toggleSound}
                aria-pressed={sound}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  sound
                    ? 'bg-brand-500 text-white hover:bg-brand-600'
                    : 'border border-line bg-white text-ink hover:border-ink'
                }`}
              >
                {sound ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M15.5 8.5a5 5 0 010 7M19 5a9 9 0 010 14" />
                    </svg>
                    Sound on
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M22 9l-6 6M16 9l6 6" />
                    </svg>
                    Hear the call
                  </>
                )}
              </button>

              <span className="text-xs text-ink-soft">
                Step {active + 1} of {STEPS.length}
              </span>
            </li>
          </ol>

          {/* the "screen" */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-white to-mist shadow-[0_30px_70px_-35px_rgba(11,13,23,0.45)]">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="ml-2 flex items-center gap-2 text-xs text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  ZVoice · live call
                </span>
                {sound && (
                  <span className="ml-3 hidden items-center gap-1.5 text-xs font-medium text-brand-600 sm:inline-flex">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
                    </span>
                    audio playing
                  </span>
                )}
                <span className="ml-auto font-mono text-xs text-ink-soft">{STEPS[active].time}</span>
              </div>

              <div key={active} className="h-[360px] p-5 sm:h-[380px] sm:p-6">
                <Stage index={active} />
              </div>

              <div className="h-1 w-full bg-line">
                <div
                  className="h-full bg-brand-500 transition-[width] duration-100 ease-linear"
                  style={{ width: `${((active + progress) / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src="/sample-call.mp3" preload="none" loop />
    </section>
  )
}

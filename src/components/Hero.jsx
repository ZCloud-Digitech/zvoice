import { useEffect, useRef, useState } from 'react'
import { claimAudio, onAudioClaim } from '../lib/audio'
import IndustryStrip from './IndustryStrip'

// Similar-length words keep the headline from reflowing on each swap.
const BUSINESSES = ['salon', 'clinic', 'agency', 'law firm', 'garage', 'studio']

/* Headline word that cycles through business types — the "this could answer
   my phone" moment, without making the visitor read a feature list first. */
function RotatingBusiness() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BUSINESSES.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="relative inline-block whitespace-nowrap align-bottom">
      <span
        key={i}
        className="zv-anim inline-block text-brand-600"
        style={{ animation: 'zv-word-in .5s cubic-bezier(.2,.7,.3,1) both' }}
      >
        {BUSINESSES[i]}
      </span>
      <svg
        className="absolute -bottom-2 left-0 w-full"
        height="12"
        viewBox="0 0 240 12"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          key={i}
          d="M3 8.5C40 3.5 92 2.5 128 4.5C164 6.5 206 8 237 4"
          stroke="var(--color-brand-500)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
          strokeDasharray="240"
          className="zv-anim"
          style={{ animation: 'zv-draw .7s ease-out both' }}
        />
      </svg>
    </span>
  )
}

/* Sample-call player. Plays /sample-call.mp3 and drives the waveform from the
   real audio clock; if the file is missing or blocked, it falls back to a timed
   animation so the control still reads as a player instead of looking broken. */
const SAMPLE_SRC = '/sample-call.mp3'
const FALLBACK_SECONDS = 30

const fmt = (sec) => {
  const s = Math.max(0, Math.floor(sec))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function SampleCallPlayer() {
  const bars = [8, 14, 22, 12, 26, 18, 30, 20, 34, 16, 24, 12, 28, 20, 32, 14, 22, 10, 18, 26, 12, 20, 30, 16, 24, 10, 16, 22, 12, 8]
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(null)
  const [failed, setFailed] = useState(false)
  const audioRef = useRef(null)
  const rafRef = useRef(null)
  const fallbackStart = useRef(0)

  const total = duration || (failed ? FALLBACK_SECONDS : 0)

  // The call-flow demo taking over means this player stops.
  useEffect(
    () =>
      onAudioClaim((owner) => {
        if (owner !== 'hero' && audioRef.current) {
          audioRef.current.pause()
          setPlaying(false)
        }
      }),
    []
  )

  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current)
      return
    }
    const tick = () => {
      const el = audioRef.current
      const live = !failed && el && el.duration > 0
      const p = live
        ? el.currentTime / el.duration
        : (performance.now() - fallbackStart.current) / (FALLBACK_SECONDS * 1000)

      if (p >= 1) {
        setProgress(1)
        setPlaying(false)
        return
      }
      setProgress(p)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, failed])

  const toggle = () => {
    const el = audioRef.current
    if (playing) {
      if (el) el.pause()
      setPlaying(false)
      return
    }
    claimAudio('hero')
    const from = progress >= 1 ? 0 : progress
    setProgress(from)
    fallbackStart.current = performance.now() - from * FALLBACK_SECONDS * 1000
    if (el) {
      if (progress >= 1) el.currentTime = 0
      el.play().then(() => setFailed(false)).catch(() => setFailed(true))
    }
    setPlaying(true)
  }

  const scrub = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const p = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 0.999)
    setProgress(p)
    fallbackStart.current = performance.now() - p * FALLBACK_SECONDS * 1000
    const el = audioRef.current
    if (el && el.duration > 0) el.currentTime = p * el.duration
  }

  const played = Math.round(progress * bars.length)

  return (
    <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-white/80 p-3 pr-5 shadow-[0_10px_40px_-20px_rgba(11,13,23,0.35)] backdrop-blur">
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause sample call' : 'Play sample call'}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-500 text-white transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="3.5" height="12" rx="1" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 1.5v11a.6.6 0 00.92.5l8.5-5.5a.6.6 0 000-1L3.92 1a.6.6 0 00-.92.5z" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1 text-left">
        <p className="text-xs font-semibold text-ink">Sample call · dental clinic front desk</p>
        <button
          type="button"
          onClick={scrub}
          aria-label="Seek within the sample call"
          className="mt-2 flex h-8 w-full cursor-pointer items-center gap-[2px] overflow-hidden"
        >
          {bars.map((h, i) => (
            <span
              key={i}
              className={`w-[3px] shrink-0 rounded-full transition-colors duration-150 ${
                i < played ? 'bg-brand-500' : 'bg-line'
              }`}
              style={{
                height: `${h}px`,
                ...(playing && i >= played && i < played + 4
                  ? { animation: `zv-wave .9s ease-in-out ${(i - played) * 0.08}s infinite` }
                  : null),
              }}
            />
          ))}
        </button>
      </div>

      <span className="shrink-0 font-mono text-xs text-ink-soft">
        {fmt(progress * total)} / {total ? fmt(total) : '·:··'}
      </span>

      <audio
        ref={audioRef}
        src={SAMPLE_SRC}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setFailed(true)}
        onEnded={() => {
          setPlaying(false)
          setProgress(1)
        }}
      />
    </div>
  )
}

function Waveform() {
  const bars = [10, 18, 28, 16, 34, 22, 40, 24, 30, 14, 20, 32, 18, 26, 12]
  return (
    <div className="flex items-center gap-[3px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="zv-anim w-[3px] rounded-full bg-brand-500/70"
          style={{ height: `${h}px`, animation: `zv-wave 1.3s ease-in-out ${i * 0.06}s infinite` }}
        />
      ))}
    </div>
  )
}

/* Outcome chips that orbit the call card: what the agent actually DID,
   not just that it talked. */
function OutcomeChip({ children, className, delay }) {
  return (
    <div
      className={`zv-anim absolute z-20 flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-semibold text-ink shadow-[0_8px_24px_-8px_rgba(11,13,23,0.25)] ${className}`}
      style={{ animation: `zv-float 4.5s ease-in-out ${delay}s infinite` }}
    >
      {children}
    </div>
  )
}

function CallCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* voice emanating from the card */}
      <span
        className="zv-anim pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/30"
        style={{ animation: 'zv-ring 3.6s ease-out infinite' }}
        aria-hidden="true"
      />
      <span
        className="zv-anim pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/30"
        style={{ animation: 'zv-ring 3.6s ease-out 1.2s infinite' }}
        aria-hidden="true"
      />
      <span
        className="zv-anim pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/30"
        style={{ animation: 'zv-ring 3.6s ease-out 2.4s infinite' }}
        aria-hidden="true"
      />

      <OutcomeChip className="-left-3 -top-5 sm:-left-8 sm:-top-6" delay={0}>
        <span className="text-emerald-500">✓</span> Lead qualified
      </OutcomeChip>
      <OutcomeChip className="-bottom-5 -right-3 sm:-bottom-6 sm:-right-8" delay={1.6}>
        <span className="text-brand-500">📅</span> Booked Tue 2:30 PM
      </OutcomeChip>

      <div className="relative z-10 rounded-2xl border border-line bg-white p-5 shadow-[0_30px_70px_-25px_rgba(79,70,229,0.45)]">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-brand-50 font-display font-bold text-brand-600">
              Z
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-ink">ZVoice Agent</p>
              <p className="text-xs text-ink-soft">Answering incoming call…</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        <div className="flex items-center justify-between py-4">
          <Waveform />
          <span className="font-mono text-sm text-ink-soft">00:14</span>
        </div>

        <div className="space-y-3 rounded-xl bg-mist p-3 text-left">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Transcript</p>
          <p className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-sm text-ink shadow-sm">
            "Hi, I'd like to book a consultation for next Tuesday afternoon, if you have anything
            open."
          </p>
          <p className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-brand-500 px-3 py-2 text-sm text-white shadow-sm">
            "Of course — I have 2:30 or 4:00 PM open Tuesday. Which works better for you?"
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-ink-soft">
            <span className="text-accent-500">↗</span> Synced to your CRM
          </span>
          <span className="font-semibold text-emerald-600">✓ Appointment confirmed</span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* dot-grid field + warm brand glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #d9dbe7 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(80% 60% at 50% 25%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(80% 60% at 50% 25%, #000 0%, transparent 75%)',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-[620px]"
        style={{
          background:
            'radial-gradient(55% 55% at 50% 0%, rgba(79,70,229,0.16) 0%, rgba(20,184,166,0.06) 45%, rgba(255,255,255,0) 72%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-4 pt-16 lg:px-8 lg:pt-24">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="min-w-0 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 text-xs font-medium text-ink-soft backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              Answering calls right now for
              <span className="font-semibold text-ink">local businesses</span>
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl lg:text-[3.5rem]">
              The voice that answers
              <br className="hidden sm:block" /> your{' '}
              <RotatingBusiness />
              <br />
              when you can't.
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-soft lg:mx-0">
              ZVoice picks up on the first ring, talks like a real person, qualifies the caller,
              and books them straight into your calendar — 24 hours a day.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#pricing"
                className="w-full rounded-full bg-brand-500 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-600 sm:w-auto"
              >
                Start free trial
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:border-ink sm:w-auto"
              >
                See how it works
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>

            <SampleCallPlayer />

            <p className="mt-4 text-xs text-ink-soft">
              No credit card required · Your first agent is live in under 10 minutes
            </p>
          </div>

          <div className="relative min-w-0 pb-8 lg:pb-0">
            <CallCard />
          </div>
        </div>

        <IndustryStrip />
      </div>
    </section>
  )
}

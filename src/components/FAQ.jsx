import { useState } from 'react'

const FAQS = [
  {
    q: 'Does it sound like a robot?',
    a: 'No — ZVoice uses natural, low-latency AI voices with realistic pacing and interruption handling. Most callers don’t realize they’re speaking with an AI agent.',
  },
  {
    q: 'Can it transfer calls to a real person?',
    a: 'Yes. You can set rules so ZVoice escalates to a live team member for specific topics, VIP callers, or whenever it isn’t confident in an answer.',
  },
  {
    q: 'Do I need a developer to set this up?',
    a: 'No. Most businesses set up their first agent through the dashboard in under 10 minutes — no code required. API access is available if you want deeper customization.',
  },
  {
    q: 'What happens if I go over my minutes?',
    a: 'You’ll get a notification as you approach your limit, and can either upgrade your plan or purchase additional minutes as a one-off top-up.',
  },
  {
    q: 'Which calendars and CRMs does ZVoice support?',
    a: 'ZVoice integrates with Google Calendar and Outlook out of the box, plus popular CRMs on the Growth and Enterprise plans.',
  },
]

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-line py-5">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className={`text-base font-medium ${open ? 'text-brand-600' : 'text-ink'}`}>{q}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all ${
            open ? 'rotate-45 border-brand-500 bg-brand-500 text-white' : 'border-line text-ink-soft'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{a}</p>}
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div data-reveal className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Here's what business owners usually ask before their first ZVoice agent goes live.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Ask us directly
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div>
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

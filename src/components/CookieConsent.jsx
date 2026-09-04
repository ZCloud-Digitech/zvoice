import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ALLOW_ALL,
  CATEGORIES,
  DENY_ALL,
  OPEN_PREFS_EVENT,
  readConsent,
  saveConsent,
} from '../lib/consent'

/* Banner + preference chooser.
   Accept and Reject carry equal visual weight on purpose — no dark patterns,
   and nothing non-essential loads until a choice is made. */

function Toggle({ checked, disabled, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-brand-500' : 'bg-line'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export default function CookieConsent() {
  const [decided, setDecided] = useState(true) // assume decided until we've read storage
  const [showPrefs, setShowPrefs] = useState(false)
  const [draft, setDraft] = useState(DENY_ALL)
  const dialogRef = useRef(null)

  useEffect(() => {
    const record = readConsent()
    setDecided(Boolean(record))
    if (record?.prefs) setDraft({ ...DENY_ALL, ...record.prefs })
  }, [])

  // Footer link (and the banner's own button) can reopen the chooser.
  useEffect(() => {
    const open = () => {
      const record = readConsent()
      setDraft(record?.prefs ? { ...DENY_ALL, ...record.prefs } : DENY_ALL)
      setShowPrefs(true)
    }
    window.addEventListener(OPEN_PREFS_EVENT, open)
    return () => window.removeEventListener(OPEN_PREFS_EVENT, open)
  }, [])

  useEffect(() => {
    if (!showPrefs) return
    const onKey = (e) => e.key === 'Escape' && setShowPrefs(false)
    window.addEventListener('keydown', onKey)
    dialogRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [showPrefs])

  const commit = (prefs) => {
    saveConsent(prefs)
    setDecided(true)
    setShowPrefs(false)
  }

  if (decided && !showPrefs) return null

  return (
    <>
      {!decided && !showPrefs && (
        <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-white p-5 shadow-[0_20px_60px_-20px_rgba(11,13,23,0.35)] sm:flex sm:items-center sm:gap-6">
            <p className="flex-1 text-sm leading-relaxed text-ink-soft">
              We use cookies and similar technologies to keep ZVoice secure, understand website
              usage, and improve your experience.{' '}
              <Link to="/legal/cookie-policy" className="font-medium text-brand-600 underline">
                Cookie Policy
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
              <button
                onClick={() => commit(ALLOW_ALL)}
                className="rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Accept All
              </button>
              <button
                onClick={() => commit(DENY_ALL)}
                className="rounded-full border border-line px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-ink"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setShowPrefs(true)}
                className="rounded-full px-4 py-2.5 text-xs font-semibold text-ink-soft underline transition-colors hover:text-ink"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrefs && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm sm:items-center">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-prefs-title"
            tabIndex={-1}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-white p-6 shadow-2xl outline-none"
          >
            <h2 id="cookie-prefs-title" className="font-display text-xl font-bold text-ink">
              Cookie preferences
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Choose which categories ZVoice may use. You can change this at any time from the
              Cookie Preferences link in the footer.
            </p>

            <div className="mt-6 space-y-4">
              {CATEGORIES.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-line p-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{c.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">{c.desc}</p>
                  </div>
                  {c.required ? (
                    <span className="shrink-0 rounded-full bg-mist px-3 py-1 text-[11px] font-semibold text-ink-soft">
                      Always active
                    </span>
                  ) : (
                    <Toggle
                      label={c.label}
                      checked={Boolean(draft[c.id])}
                      onChange={(v) => setDraft((d) => ({ ...d, [c.id]: v }))}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => commit(draft)}
                className="rounded-full bg-brand-500 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Save preferences
              </button>
              <button
                onClick={() => commit(ALLOW_ALL)}
                className="rounded-full border border-line px-5 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-ink"
              >
                Accept All
              </button>
              <button
                onClick={() => commit(DENY_ALL)}
                className="rounded-full border border-line px-5 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-ink"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

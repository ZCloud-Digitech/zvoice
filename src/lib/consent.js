/* Cookie consent state.
 *
 * IMPORTANT: the categories below must match the technologies the site
 * actually loads. Right now ZVoice ships no analytics or marketing scripts,
 * so those categories exist only as gates for when you add them — wire any
 * new script behind `hasConsent('<category>')`, or delete the category. */

const KEY = 'zvoice.consent.v1'
const EVENT = 'zvoice:consent-change'
export const OPEN_PREFS_EVENT = 'zvoice:open-cookie-preferences'

export const CATEGORIES = [
  {
    id: 'necessary',
    label: 'Necessary cookies',
    desc: 'Required for the site to work — security, load balancing, and remembering these very preferences. Cannot be switched off.',
    required: true,
  },
  {
    id: 'analytics',
    label: 'Analytics cookies',
    desc: 'Help us understand which pages people visit so we can improve them. Aggregated, never sold.',
    required: false,
  },
  {
    id: 'functional',
    label: 'Functional cookies',
    desc: 'Remember choices you make — such as language or a dismissed banner — to personalise your visit.',
    required: false,
  },
  {
    id: 'marketing',
    label: 'Marketing cookies',
    desc: 'Used to measure campaign performance and show relevant ZVoice ads on other sites.',
    required: false,
  },
]

export const DENY_ALL = { necessary: true, analytics: false, functional: false, marketing: false }
export const ALLOW_ALL = { necessary: true, analytics: true, functional: true, marketing: true }

export function readConsent() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveConsent(prefs) {
  const record = { prefs: { ...prefs, necessary: true }, at: new Date().toISOString(), version: 1 }
  try {
    localStorage.setItem(KEY, JSON.stringify(record))
  } catch {
    // storage blocked — consent simply won't persist across visits
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: record }))
  return record
}

/* Gate every non-essential script on this. */
export function hasConsent(category) {
  if (category === 'necessary') return true
  const record = readConsent()
  return Boolean(record && record.prefs && record.prefs[category])
}

export function onConsentChange(fn) {
  const handler = (e) => fn(e.detail)
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}

/* Footer "Cookie Preferences" link calls this to reopen the chooser. */
export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent(OPEN_PREFS_EVENT))
}

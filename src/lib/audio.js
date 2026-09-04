/* Only one thing on the page should be making noise at a time. Players
   announce when they start; everyone else stops. */
const listeners = new Set()

export function claimAudio(owner) {
  listeners.forEach((fn) => fn(owner))
}

export function onAudioClaim(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

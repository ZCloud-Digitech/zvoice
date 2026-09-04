import { useEffect } from 'react'

/* Fades sections up as they come into view. Elements opt in with data-reveal. */
export default function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!els.length || typeof IntersectionObserver === 'undefined') return

    document.documentElement.classList.add('zv-js')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('zv-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))

    // If the observer never reports anything at all, it's broken in this
    // environment — show everything rather than leave the page blank.
    const safety = setTimeout(() => {
      if (!document.querySelector('[data-reveal].zv-in')) {
        els.forEach((el) => el.classList.add('zv-in'))
      }
    }, 2000)

    return () => {
      io.disconnect()
      clearTimeout(safety)
    }
  }, [])
}

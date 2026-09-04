import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* React Router doesn't scroll for you. Land at the top on a new page, or at
   the anchor when one is given — including when arriving from another page. */
export default function useRouteScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // wait a frame so the target section exists after the route swap
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

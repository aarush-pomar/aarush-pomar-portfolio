import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // By the time this effect runs, React has already committed the new
    // route's DOM, so the target element exists -- no need to wait a frame.
    document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
  }, [pathname, hash])

  return null
}

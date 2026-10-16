import { useLenis } from 'lenis/react'
import { useCallback } from 'react'

/**
 * The URL hash is reserved for the audience (#nurses / #facilities), so in-page
 * jumps scroll programmatically instead of using anchor hrefs. Uses Lenis when it's
 * running (smooth) and falls back to native scrolling (reduced motion).
 */
export function useScrollTo() {
  const lenis = useLenis()
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: -88 })
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88 })
    },
    [lenis],
  )
}

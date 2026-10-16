import { useCallback, useEffect, useState } from 'react'
import type { Audience } from '../data/content'
import { track } from './analytics'

/**
 * The selected side of the marketplace lives in the URL hash (#nurses / #facilities)
 * so that ads, emails and sales reps can deep-link straight to the right page,
 * and so the back button works after toggling.
 */
function readHash(): Audience {
  return window.location.hash.replace('#', '') === 'facilities' ? 'facilities' : 'nurses'
}

export function useAudience() {
  const [audience, setAudienceState] = useState<Audience>(readHash)

  useEffect(() => {
    const onHash = () => setAudienceState(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const setAudience = useCallback((next: Audience, source = 'toggle') => {
    if (next === readHash() && window.location.hash) return
    track('audience_selected', { audience: next, source })
    window.history.pushState(null, '', `#${next}`)
    setAudienceState(next)
    window.scrollTo({ top: 0 })
  }, [])

  return { audience, setAudience }
}

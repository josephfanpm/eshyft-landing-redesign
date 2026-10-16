import { AnimatePresence, m } from 'motion/react'
import { CheckCircle2, MapPin, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { states } from '../../data/content'
import { Reveal, SectionHeading } from '../../components/Reveal'
import { track } from '../../lib/analytics'

/**
 * Replaces the current page's list of 30 state links (which all point at the same
 * help article) with the question nurses actually have: "Can I work in my state?"
 */
export function StateChecker() {
  const [query, setQuery] = useState('')

  const match = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return null
    return states.find(([code, name]) => code.toLowerCase() === q || name.toLowerCase().startsWith(q)) ?? false
  }, [query])

  return (
    <section className="container-x py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Coverage"
            title="Is ESHYFT in your state?"
            body={`We're live in ${states.length} states and adding more.`}
          />
          <Reveal delay={0.1} className="mt-8">
            <label htmlFor="state-q" className="sr-only">Your state</label>
            <div className="relative max-w-md">
              <MapPin className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mute" aria-hidden />
              <input
                id="state-q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => match !== null && track('state_checked', { query, found: Boolean(match) })}
                placeholder="Type your state, e.g. New Jersey"
                className="field py-4 pl-11 text-base"
                autoComplete="address-level1"
              />
            </div>
            <div className="mt-4 h-8" aria-live="polite">
              <AnimatePresence mode="wait">
                {match && (
                  <m.p key="yes" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-teal-soft">
                    <CheckCircle2 className="size-5" aria-hidden /> Yes! ESHYFT is live in {match[1]}.
                  </m.p>
                )}
                {match === false && (
                  <m.p key="no" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-mute">
                    <XCircle className="size-5" aria-hidden /> Not yet — download the app to get notified when we launch.
                  </m.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ul className="grid grid-cols-5 gap-2 sm:grid-cols-6" aria-label="States where ESHYFT is available">
            {states.map(([code, name]) => {
              const hit = match && match[0] === code
              return (
                <li
                  key={code}
                  title={name}
                  className={`grid aspect-square place-items-center rounded-xl border text-sm font-semibold transition-all duration-300 ${hit ? 'scale-110 border-teal bg-teal text-ink shadow-[0_0_30px_-4px_var(--color-teal)]' : 'border-line bg-white/[0.03] text-mute'}`}
                >
                  <abbr title={name} className="no-underline">{code}</abbr>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

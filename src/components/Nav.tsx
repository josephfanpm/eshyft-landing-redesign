import { m, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { Audience } from '../data/content'
import { links } from '../data/content'
import { track } from '../lib/analytics'
import { useScrollTo } from '../lib/useScrollTo'
import { AudienceToggle } from './AudienceToggle'
import { Logo } from './Logo'

/**
 * One contextual primary CTA instead of the current site's five competing header
 * buttons ("Schedule a consultation", "Get started", "Apply today", "Schedule a call",
 * "Sign in"). The CTA changes with the selected audience.
 */
export function Nav({ audience, onAudience }: { audience: Audience; onAudience: (a: Audience) => void }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))
  const scrollTo = useScrollTo()

  const cta =
    audience === 'nurses'
      ? { label: 'Get the app', target: 'download' }
      : { label: 'Book a consultation', target: 'consult' }

  return (
    <m.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${scrolled ? 'border-b border-line bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'}`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4 sm:h-[72px]" aria-label="Primary">
        <a href={`#${audience}`} aria-label="ESHYFT home">
          <Logo />
        </a>

        <div className="hidden md:block">
          <AudienceToggle audience={audience} onChange={(a) => onAudience(a)} />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={links.signIn} className="hidden text-sm text-mute transition hover:text-white sm:inline">
            Sign in
          </a>
          <button
            onClick={() => {
              track('cta_clicked', { cta: cta.target, location: 'nav', audience })
              scrollTo(cta.target)
            }}
            className={`btn px-4 py-2.5 text-white ${audience === 'nurses' ? 'bg-coral-strong hover:bg-coral-strong/85' : 'bg-sky-strong hover:bg-sky-soft hover:text-ink'}`}
          >
            {cta.label}
            <ArrowRight className="hidden size-4 sm:block" aria-hidden />
          </button>
        </div>
      </nav>
    </m.header>
  )
}

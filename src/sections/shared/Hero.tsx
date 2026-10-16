import { m } from 'motion/react'
import type { ReactNode } from 'react'
import type { Audience } from '../../data/content'
import { AudienceToggle } from '../../components/AudienceToggle'

/**
 * Shared hero layout. The H1 is rendered immediately (no opacity-0 entrance) because
 * it's the LCP element. Hiding it behind an animation would delay LCP on every visit.
 * Supporting elements animate in around it.
 */
export function HeroShell({
  audience,
  onAudience,
  eyebrow,
  title,
  body,
  actions,
  proof,
  visual,
}: {
  audience: Audience
  onAudience: (a: Audience) => void
  eyebrow: ReactNode
  title: ReactNode
  body: ReactNode
  actions: ReactNode
  proof: ReactNode
  visual: ReactNode
}) {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="container-x grid items-center gap-14 pt-28 pb-16 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24">
      <div>
        <m.div {...fade(0)} className="mb-6 md:hidden">
          <AudienceToggle audience={audience} onChange={onAudience} compact />
        </m.div>
        <m.div {...fade(0.05)}>{eyebrow}</m.div>
        <h1 className="mt-5 text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">{title}</h1>
        <m.p {...fade(0.15)} className="mt-6 max-w-xl text-lg text-mute sm:text-xl">
          {body}
        </m.p>
        <m.div {...fade(0.25)} className="mt-8">
          {actions}
        </m.div>
        <m.div {...fade(0.35)} className="mt-8">
          {proof}
        </m.div>
      </div>
      <m.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {visual}
      </m.div>
    </section>
  )
}

import type { CSSProperties, ReactNode } from 'react'

/**
 * Infinite horizontal marquee. Pure CSS (the content is duplicated and the track
 * translated by -50%), so it costs no JS per frame. Pauses on hover; stops for
 * prefers-reduced-motion via the global media query.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = '',
}: {
  children: ReactNode
  duration?: number
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={`group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}
    >
      <div
        className="flex w-max shrink-0 animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' } as CSSProperties}
      >
        {children}
        <div aria-hidden className="contents">{children}</div>
      </div>
    </div>
  )
}

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
}

/**
 * Counts up when scrolled into view. The final value is rendered for reduced-motion
 * users and is what screen readers get (the animated text is aria-hidden).
 */
export function Counter({ to, decimals = 0, prefix = '', suffix = '', duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setValue })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>{prefix}{fmt(value)}{suffix}</span>
      <span className="sr-only">{prefix}{fmt(to)}{suffix}</span>
    </span>
  )
}

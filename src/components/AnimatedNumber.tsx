import { useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

/** Springs smoothly between values as calculator inputs change. */
export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const reduce = useReducedMotion()
  const spring = useSpring(value, { stiffness: 140, damping: 22 })
  const [animated, setAnimated] = useState(value)

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  useMotionValueEvent(spring, 'change', setAnimated)

  // Reduced motion: skip the tween and render the target directly.
  const shown = reduce ? value : animated

  return (
    <span className="tabular-nums">
      <span aria-hidden>{format(shown)}</span>
      {/* Screen readers get the settled value once, not every animation frame. */}
      <span className="sr-only" aria-live="polite">{format(value)}</span>
    </span>
  )
}

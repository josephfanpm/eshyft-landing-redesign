import { m } from 'motion/react'
import { Building2, Stethoscope } from 'lucide-react'
import type { Audience } from '../data/content'

const options: { id: Audience; label: string; short: string; Icon: typeof Stethoscope }[] = [
  { id: 'nurses', label: "I'm a nurse or CNA", short: 'Nurses', Icon: Stethoscope },
  { id: 'facilities', label: 'I run a facility', short: 'Facilities', Icon: Building2 },
]

/**
 * Segmented control that switches the whole page between the two sides of the
 * marketplace. The active pill slides between options via a shared layoutId.
 * Implemented as a radiogroup for screen readers.
 */
export function AudienceToggle({
  audience,
  onChange,
  compact = false,
}: {
  audience: Audience
  onChange: (a: Audience) => void
  compact?: boolean
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose your side"
      className="relative inline-flex rounded-full border border-line bg-ink-2/80 p-1 backdrop-blur"
    >
      {options.map(({ id, label, short, Icon }) => {
        const active = audience === id
        return (
          <button
            key={id}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(id)}
            className={`relative z-0 flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors sm:px-4 ${active ? 'text-white' : 'text-mute hover:text-white'}`}
          >
            {active && (
              <m.span
                layoutId={compact ? 'toggle-pill-compact' : 'toggle-pill'}
                className={`absolute inset-0 -z-10 rounded-full ${id === 'nurses' ? 'bg-coral-strong' : 'bg-sky-strong'}`}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <Icon className="size-4" aria-hidden />
            <span>{compact ? short : label}</span>
          </button>
        )
      })}
    </div>
  )
}

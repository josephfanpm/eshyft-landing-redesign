import type { ReactNode } from 'react'
import { Reveal } from '../../components/Reveal'

/** A row of hard, verifiable numbers directly under the hero (inside the first two screens). */
export function ProofBar({ items }: { items: { value: ReactNode; label: string }[] }) {
  return (
    <div className="container-x">
      <Reveal className="card grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {items.map((it) => (
          <div key={it.label} className="px-6 py-6 text-center">
            <p className="font-display text-3xl font-semibold text-white sm:text-4xl">{it.value}</p>
            <p className="mt-1 text-sm text-mute">{it.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  )
}

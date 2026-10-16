import { ArrowRight } from 'lucide-react'
import type { Audience } from '../../data/content'
import { Reveal } from '../../components/Reveal'

/**
 * Every page carries a clear exit to the other side of the marketplace. Supply
 * call-outs should be "more aggressive than you're comfortable with" (Rachitsky),
 * and a facility manager who lands on the nurse page should never be stuck.
 */
export function CrossSell({ to, onAudience }: { to: Audience; onAudience: (a: Audience, source?: string) => void }) {
  const copy =
    to === 'facilities'
      ? { q: 'Run a nursing home or LTC facility?', a: 'See how ESHYFT fills open shifts' }
      : { q: 'Are you a CNA, LPN or RN?', a: 'Pick up shifts on your schedule' }
  return (
    <div className="container-x py-10">
      <Reveal>
        <button
          onClick={() => onAudience(to, 'cross_sell')}
          className="group flex w-full items-center justify-between gap-4 rounded-3xl border border-dashed border-white/15 px-6 py-6 text-left transition hover:border-white/30 hover:bg-white/[0.03] sm:px-8"
        >
          <span>
            <span className="block text-sm text-mute">{copy.q}</span>
            <span className="mt-1 block font-display text-xl font-semibold text-white sm:text-2xl">{copy.a}</span>
          </span>
          <ArrowRight className="size-6 shrink-0 text-mute transition group-hover:translate-x-1 group-hover:text-white" aria-hidden />
        </button>
      </Reveal>
    </div>
  )
}

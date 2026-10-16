import { Check } from 'lucide-react'
import { links } from '../data/content'

const items = [
  'Instant Pay — next-day or same-day access to your earnings',
  '24/7 support from the ESHYFT team',
  'Joint Commission certified for healthcare staffing',
  'Shifts at nursing homes in 30 states',
]

/** Airbnb's AirCover block: a short checklist of guarantees, fine print, one dark button. */
export function BackedBy() {
  return (
    <section className="container-page pb-24 sm:pb-32">
      <div className="mx-auto max-w-[640px] text-center">
        <p className="text-lg font-semibold text-coral-ink">Instant Pay, powered by Stripe</p>
        <h2 className="display mt-3 text-[40px] sm:text-[56px]">Every shift is backed by ESHYFT</h2>
        <p className="mt-5 text-xl text-ink-2">Support and fast pay, included every time you work.</p>
      </div>

      <ul className="mx-auto mt-12 max-w-[632px] divide-y divide-hairline">
        {items.map((item) => (
          <li key={item} className="flex items-center justify-between gap-6 py-6 text-lg">
            {item}
            <Check className="size-6 shrink-0 text-success" strokeWidth={2.25} aria-hidden />
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-8 max-w-[680px] text-center text-sm text-ink-2">
        Instant Pay is powered by Stripe. See the Instant Pay page for details and terms.
      </p>
      <div className="mt-10 flex justify-center">
        <a href={links.instantPay} className="btn-dark px-10">Learn about Instant Pay</a>
      </div>
    </section>
  )
}

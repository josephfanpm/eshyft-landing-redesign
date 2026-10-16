import { ChevronDown } from 'lucide-react'
import { faqGroups, links } from '../data/content'

/**
 * Airbnb's "Your questions, answered": gray section, grouped accordions.
 * Native <details>/<summary> — keyboard and screen-reader support built in.
 */
export function Faq() {
  return (
    <section className="bg-mist">
      <div className="container-page py-24 sm:py-32">
        <h2 className="display mx-auto max-w-[560px] text-center text-[40px] sm:text-[56px]">
          Your questions, answered
        </h2>

        <div className="mx-auto mt-14 max-w-[848px] divide-y divide-hairline border-y border-hairline">
          {faqGroups.map((g, gi) => (
            <details key={g.title} open={gi === 0} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[22px] [&::-webkit-details-marker]:hidden">
                {g.title}
                <ChevronDown className="size-5 transition-transform group-open:rotate-180" strokeWidth={2.5} aria-hidden />
              </summary>
              <dl className="space-y-6 pb-6">
                {g.items.map((it) => (
                  <div key={it.q}>
                    <dt className="font-semibold">{it.q}</dt>
                    <dd className="mt-1.5 leading-relaxed text-ink-2">{it.a}</dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl font-bold">Still have questions?</p>
          <p className="mt-2 text-lg text-ink-2">Get answers from ESHYFT’s support team, any time.</p>
          <a href={links.support} className="btn-dark mt-6 w-full max-w-[300px]">Contact support</a>
        </div>
      </div>
    </section>
  )
}

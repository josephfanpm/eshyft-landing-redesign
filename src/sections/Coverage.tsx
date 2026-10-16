import { STATES } from '../data/content'

/**
 * The current page lists 30 states (unsorted), each linking to the same help
 * article. Here: one sorted, scannable list and no dead-end links.
 */
export function Coverage() {
  return (
    <section className="container-page pb-24 sm:pb-32">
      <div className="mx-auto max-w-[848px] border-t border-hairline pt-16">
        <h2 className="text-[32px] font-bold tracking-tight">ESHYFT is in 30 states</h2>
        <ul className="mt-8 columns-2 gap-8 text-ink-2 sm:columns-3 lg:columns-4 [&>li]:py-1.5">
          {STATES.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

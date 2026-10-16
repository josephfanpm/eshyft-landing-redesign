import { appRating, testimonials } from '../data/content'

/** Airbnb's co-host cards, repurposed for nurse testimonials (real quotes from eshyft.com/nurses). */
export function Testimonials() {
  return (
    <section className="container-page pb-24 sm:pb-32">
      <h2 className="display mx-auto max-w-[620px] text-center text-[40px] sm:text-[56px]">Nurses love ESHYFT</h2>
      <p className="mt-5 text-center text-lg text-ink-2 sm:text-xl">
        Rated {appRating.stars} out of 5 from {appRating.count.toLocaleString('en-US')} App Store ratings.
      </p>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-3xl bg-mist p-7 shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-ink text-xl font-semibold text-white">
                {t.name[0]}
              </span>
              <figcaption>
                <span className="block text-lg font-bold">{t.name}</span>
                <span className="block text-sm text-ink-2">{t.role} in {t.state}</span>
              </figcaption>
            </div>
            <blockquote className="mt-6 rounded-2xl bg-white p-5 text-[17px] leading-snug">“{t.quote}”</blockquote>
          </figure>
        ))}
      </div>
    </section>
  )
}

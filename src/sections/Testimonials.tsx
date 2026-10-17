import { appRating, testimonials } from '../data/content'

/**
 * Airbnb's co-host cards, repurposed for nurse testimonials: profile picture, name,
 * a white stat box (shifts worked on ESHYFT + license), then the nurse's own words.
 */
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
            className="flex flex-col items-center rounded-3xl bg-mist px-6 pt-8 pb-6 text-center shadow-[0_6px_16px_rgb(0_0_0/0.06)]"
          >
            <img
              src={`${import.meta.env.BASE_URL}${t.avatar}`}
              alt=""
              width={112}
              height={112}
              loading="lazy"
              className="size-28 rounded-full object-cover"
            />
            <figcaption className="mt-4">
              <span className="block text-2xl font-bold tracking-tight">{t.name}</span>
              <span className="mt-0.5 block text-[15px] text-ink-2">
                {t.role} in {t.state}
              </span>
            </figcaption>

            <div className="mt-5 grid w-full grid-cols-2 divide-x divide-hairline rounded-xl bg-white py-3">
              <p>
                <span className="block text-lg font-bold tabular-nums">{t.shifts.toLocaleString('en-US')}</span>
                <span className="block text-xs text-ink-2">shifts on ESHYFT</span>
              </p>
              <p>
                <span className="block text-lg font-bold">{t.role}</span>
                <span className="block text-xs text-ink-2">license</span>
              </p>
            </div>

            <blockquote className="mt-5 text-[17px] leading-snug">“{t.quote}”</blockquote>
          </figure>
        ))}
      </div>
    </section>
  )
}

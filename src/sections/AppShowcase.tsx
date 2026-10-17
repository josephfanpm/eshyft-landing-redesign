/**
 * Airbnb's "Your place looks great on Airbnb": two phones on gray cards, cropped
 * at the bottom, with a caption underneath. The screens are ESHYFT's real nurse-app
 * designs (Find Shifts and Earnings), exported from ESHYFT's Figma file.
 */
const screens = [
  {
    src: 'app/find-shifts.webp',
    alt: 'ESHYFT nurse app Find Shifts screen: a list of CNA, LPN and RN shifts with dates, distance and pay, and a swipe-to-book hint',
    title: 'Find shifts near you',
    body: 'Filter by pay, date and distance, then swipe to book.',
  },
  {
    src: 'app/earnings.webp',
    alt: 'ESHYFT nurse app Earnings screen: pending shifts with hours, hourly rate and total pay for each shift',
    title: 'Track every dollar',
    body: 'See hours, rate and total pay for each shift, from pending to approved.',
  },
]

export function AppShowcase({ onGetApp }: { onGetApp: () => void }) {
  return (
    <section className="container-page pb-24 sm:pb-32">
      <h2 className="display mx-auto max-w-[620px] text-center text-[40px] sm:text-[56px]">
        Everything happens in the app
      </h2>
      <div className="mx-auto mt-14 grid max-w-[816px] gap-4 sm:grid-cols-2">
        {screens.map((s) => (
          <figure key={s.src}>
            <div className="flex h-[440px] items-start justify-center overflow-hidden rounded-2xl bg-mist pt-10">
              <div className="w-[244px] rounded-t-[44px] border-[8px] border-b-0 border-[#1d1d1f] bg-[#1d1d1f] shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
                <img
                  src={`${import.meta.env.BASE_URL}${s.src}`}
                  alt={s.alt}
                  width={375}
                  height={812}
                  loading="lazy"
                  className="block w-full rounded-t-[36px]"
                />
              </div>
            </div>
            <figcaption className="mt-5 text-center">
              <p className="text-lg font-medium">{s.title}</p>
              <p className="mx-auto mt-1 max-w-[300px] text-ink-2">{s.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <button onClick={onGetApp} className="btn-dark px-10">Get the app</button>
      </div>
    </section>
  )
}

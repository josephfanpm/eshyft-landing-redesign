import { links } from '../data/content'

/** Airbnb's "Curious about hosting? Let's talk" card, aimed at first-time per diem nurses. */
export function SupportBanner() {
  return (
    <section className="container-page">
      <div className="mx-auto flex max-w-[848px] flex-col items-start gap-6 rounded-3xl bg-sand px-8 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <div>
          <p className="text-[22px] font-bold tracking-tight">New to per diem?</p>
          <p className="mt-1 text-ink-2">Get answers from ESHYFT’s support team, 24/7.</p>
        </div>
        <a href={links.help} className="btn shrink-0 border border-ink bg-white px-6 py-3 hover:bg-mist">
          Let’s talk
        </a>
      </div>
    </section>
  )
}

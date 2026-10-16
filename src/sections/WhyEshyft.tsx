import { CalendarCheck, Headset, Wallet } from 'lucide-react'

const reasons = [
  { Icon: CalendarCheck, title: 'It’s flexible', body: 'Pick up as many or as few shifts as you want, at nursing homes near you.' },
  { Icon: Wallet, title: 'It pays fast', body: 'Get paid weekly, or get next-day or same-day access with Instant Pay.' },
  { Icon: Headset, title: 'You’re supported', body: 'A 24/7 support team that has your back, before, during and after every shift.' },
]

/** Airbnb's "Join millions of hosts" trio: icon tile, short title, one sentence. */
export function WhyEshyft() {
  return (
    <section className="container-page py-24 sm:py-32">
      <h2 className="display mx-auto max-w-[620px] text-center text-[40px] sm:text-[56px]">
        Work per diem on your terms
      </h2>
      <div className="mx-auto mt-16 grid max-w-[1040px] gap-12 sm:grid-cols-3 sm:gap-10">
        {reasons.map(({ Icon, title, body }) => (
          <div key={title} className="text-center">
            <span className="mx-auto grid size-[88px] place-items-center rounded-2xl bg-mist">
              <Icon className="size-10" strokeWidth={1.4} aria-hidden />
            </span>
            <h3 className="mt-8 text-[26px] font-bold tracking-tight">{title}</h3>
            <p className="mx-auto mt-3 max-w-[280px] text-lg leading-relaxed text-ink-2">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

import { facilitySteps } from '../../data/content'
import { Reveal, SectionHeading } from '../../components/Reveal'

/** Telling buyers exactly what happens after they fill the form lowers the perceived cost of filling it. */
export function Process() {
  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading eyebrow="Getting started" title="From first call to filled shifts." center />
      <ol className="mt-14 grid gap-4 md:grid-cols-3">
        {facilitySteps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.1} className="card relative overflow-hidden p-6 sm:p-8">
            <span aria-hidden className="absolute -top-6 -right-2 font-display text-[7rem] leading-none font-bold text-white/[0.04]">
              {i + 1}
            </span>
            <p className="text-xs font-semibold tracking-widest text-sky-soft">STEP {i + 1}</p>
            <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-mute">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

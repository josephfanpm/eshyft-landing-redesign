import { m, useScroll, useTransform } from 'motion/react'
import { CalendarCheck, Search, Wallet } from 'lucide-react'
import { useRef } from 'react'
import { nurseSteps } from '../../data/content'
import { Reveal, SectionHeading } from '../../components/Reveal'

const icons = [Search, CalendarCheck, Wallet]

/** Three steps joined by a line that "draws" itself as you scroll through the section. */
export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading eyebrow="How it works" title="From the app to paid in three steps." center />

      <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
        <div aria-hidden className="absolute top-0 bottom-0 left-7 w-px bg-line sm:left-1/2">
          <m.div style={{ scaleY }} className="h-full w-full origin-top bg-gradient-to-b from-coral via-sky to-teal" />
        </div>

        <ol className="space-y-14">
          {nurseSteps.map((step, i) => {
            const Icon = icons[i]
            const right = i % 2 === 1
            return (
              <Reveal
                as="li"
                key={step.title}
                delay={0.05}
                className={`relative grid items-center gap-6 pl-20 sm:grid-cols-2 sm:pl-0 ${right ? 'sm:[&>div]:col-start-2' : ''}`}
              >
                <span className="absolute top-0 left-0 grid size-14 place-items-center rounded-2xl border border-line bg-ink-2 text-white shadow-lg sm:left-1/2 sm:-translate-x-1/2">
                  <Icon className="size-6" aria-hidden />
                </span>
                <div className={`card p-6 ${right ? 'sm:ml-12' : 'sm:mr-12'}`}>
                  <p className="text-xs font-semibold tracking-widest text-coral-soft">STEP {i + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-mute">{step.body}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

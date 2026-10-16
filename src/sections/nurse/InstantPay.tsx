import { m } from 'motion/react'
import { CheckCircle2, Clock4, Zap } from 'lucide-react'
import { Reveal } from '../../components/Reveal'
import { facts } from '../../data/content'

const timeline = [
  { icon: Clock4, label: 'Clock out in the app', tint: 'text-sky-soft' },
  { icon: Zap, label: 'Tap “Cash out”', tint: 'text-coral-soft' },
  { icon: CheckCircle2, label: 'Money is on its way', tint: 'text-teal-soft' },
]

/** Fast pay is the one benefit every supply-side competitor puts in its hero. Give it a dedicated moment. */
export function InstantPay() {
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="card grid items-center gap-10 overflow-hidden p-6 sm:p-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">
            <Zap className="size-3.5 text-teal" aria-hidden /> Instant Pay
          </span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Work today. Get paid today.</h2>
          <p className="mt-4 text-lg text-mute">
            No more waiting for payday. Cash out right after your shift, or get paid weekly — your call. Secure
            payouts powered by {facts.instantPayProvider}.
          </p>
        </Reveal>

        <ol className="relative space-y-4">
          {timeline.map(({ icon: Icon, label, tint }, i) => (
            <m.li
              key={label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.25, type: 'spring', stiffness: 160, damping: 20 }}
              className="flex items-center gap-4 rounded-2xl border border-line bg-ink-2/80 p-4"
            >
              <span className={`grid size-11 place-items-center rounded-xl bg-white/5 ${tint}`}>
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="font-medium text-white">{label}</span>
              {i === timeline.length - 1 && (
                <m.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 400, damping: 15 }}
                  className="ml-auto rounded-full bg-teal px-3 py-1 font-display text-sm font-semibold text-ink"
                >
                  +$216.00
                </m.span>
              )}
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { m } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { facilityPains } from '../../data/content'
import { SectionHeading } from '../../components/Reveal'

/**
 * Lead with the buyer's problem in their own words, then the resolution.
 * Each card animates the pain "striking through" before the fix appears.
 */
export function PainToFix() {
  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Why facilities switch"
        title="Staffing headaches, solved."
        body="The problems your DON and schedulers deal with every week — and how ESHYFT handles them."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {facilityPains.map((p, i) => (
          <m.div
            key={p.pain}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card group p-6 sm:p-8"
          >
            <p className="relative inline-block text-mute">
              {p.pain}
              <m.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                className="absolute top-1/2 left-0 h-px w-full origin-left bg-coral"
              />
            </p>
            <ArrowDown className="my-4 size-4 text-sky-soft" aria-hidden />
            <p className="text-lg font-medium text-white">{p.fix}</p>
          </m.div>
        ))}
      </div>
    </section>
  )
}

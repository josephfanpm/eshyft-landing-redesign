import { Quote } from 'lucide-react'
import { testimonials } from '../../data/content'
import { Marquee } from '../../components/Marquee'
import { Rating } from '../../components/Rating'
import { SectionHeading } from '../../components/Reveal'

const roleTint = { CNA: 'bg-coral/15 text-coral-soft', LPN: 'bg-sky/15 text-sky-soft', RN: 'bg-teal/15 text-teal-soft' }

/** Peer proof: real quotes, tagged with license + state so readers find someone like them. */
export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Nurses ❤️ ESHYFT" title="Loved by the people who use it every shift." center />
        <div className="mt-6 flex justify-center">
          <Rating kind="nurse" />
        </div>
      </div>
      <Marquee className="mt-12" duration={45}>
        {testimonials.map((t) => (
          <figure key={t.name} className="card w-[300px] shrink-0 p-6 sm:w-[360px]">
            <Quote className="size-6 text-white/20" aria-hidden />
            <blockquote className="mt-3 text-lg text-white">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-sm">
              <span className="grid size-9 place-items-center rounded-full bg-white/10 font-semibold text-white">
                {t.name[0]}
              </span>
              <span className="text-mute">
                <span className="block text-white">{t.name}</span>
                {t.state}
              </span>
              <span className={`ml-auto rounded-full px-2.5 py-1 text-xs font-semibold ${roleTint[t.role]}`}>{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  )
}

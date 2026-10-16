import { Sparkles, Zap } from 'lucide-react'
import type { Audience } from '../../data/content'
import { appRatings, facts, nurseFaqs } from '../../data/content'
import { Counter } from '../../components/Counter'
import { DownloadPanel } from '../../components/DownloadPanel'
import { Faq } from '../../components/Faq'
import { PhoneMockup } from '../../components/PhoneMockup'
import { Rating } from '../../components/Rating'
import { Reveal, SectionHeading } from '../../components/Reveal'
import { CrossSell } from '../shared/CrossSell'
import { HeroShell } from '../shared/Hero'
import { ProofBar } from '../shared/ProofBar'
import { EarningsEstimator } from './EarningsEstimator'
import { HowItWorks } from './HowItWorks'
import { InstantPay } from './InstantPay'
import { StateChecker } from './StateChecker'
import { Testimonials } from './Testimonials'

/**
 * Nurse (supply-side) page. Single goal: app download.
 * Order follows the supply-acquisition playbook: money → how → proof → objections → CTA.
 */
export function NursePage({ onAudience }: { onAudience: (a: Audience, source?: string) => void }) {
  return (
    <>
      <HeroShell
        audience="nurses"
        onAudience={onAudience}
        eyebrow={
          <span className="eyebrow">
            <Sparkles className="size-3.5 text-coral-soft" aria-hidden /> For CNAs, LPNs & RNs
          </span>
        }
        title={
          <>
            Pick up nursing shifts near you. <span className="text-gradient">Get paid today.</span>
          </>
        }
        body="Book per diem shifts at nursing homes close to home. Work when you want — and cash out the same day with Instant Pay."
        actions={<DownloadPanel location="hero" />}
        proof={<Rating kind="nurse" />}
        visual={<PhoneMockup />}
      />

      <ProofBar
        items={[
          { value: <Counter to={appRatings.nurse.rating} decimals={1} suffix="★" />, label: 'App Store rating' },
          { value: <Counter to={appRatings.nurse.count} />, label: 'nurse reviews' },
          { value: <Counter to={facts.states} />, label: 'states and growing' },
          {
            value: (
              <span className="inline-flex items-center gap-1">
                <Zap className="hidden size-7 text-teal sm:block" aria-hidden />
                Same day
              </span>
            ),
            label: 'pay with Instant Pay',
          },
        ]}
      />

      <EarningsEstimator />
      <HowItWorks />
      <InstantPay />
      <Testimonials />
      <StateChecker />

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Questions" title="Good to know before you start" />
          <Reveal delay={0.1}>
            <Faq items={nurseFaqs} />
          </Reveal>
        </div>
      </section>

      <section id="download" className="container-x py-10 sm:py-16">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-coral/25 via-ink-2 to-sky/20 px-6 py-14 sm:px-14">
          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold sm:text-5xl">Your next shift is one tap away.</h2>
            <p className="mt-4 text-lg text-mute">Download the free app, finish your profile and start booking shifts near you.</p>
            <div className="mt-8">
              <DownloadPanel location="footer_cta" />
            </div>
          </div>
        </Reveal>
      </section>

      <CrossSell to="facilities" onAudience={onAudience} />
    </>
  )
}

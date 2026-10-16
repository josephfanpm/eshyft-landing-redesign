import { ArrowRight, Building2, ShieldCheck } from 'lucide-react'
import type { Audience } from '../../data/content'
import { appRatings, facilityFaqs, facts, operators } from '../../data/content'
import { Counter } from '../../components/Counter'
import { Faq } from '../../components/Faq'
import { Marquee } from '../../components/Marquee'
import { Reveal, SectionHeading } from '../../components/Reveal'
import { ShiftBoardMockup } from '../../components/ShiftBoardMockup'
import { track } from '../../lib/analytics'
import { useScrollTo } from '../../lib/useScrollTo'
import { CrossSell } from '../shared/CrossSell'
import { HeroShell } from '../shared/Hero'
import { ProofBar } from '../shared/ProofBar'
import { AgencyCostCalculator } from './AgencyCostCalculator'
import { ConsultForm } from './ConsultForm'
import { PainToFix } from './PainToFix'
import { Process } from './Process'

/**
 * Facility (demand-side) page. Single goal: book a consultation.
 * B2B buyers need proof and risk reduction before they'll talk to sales:
 * outcome → who else uses it → quantified pain → how onboarding works → form.
 */
export function FacilityPage({ onAudience }: { onAudience: (a: Audience, source?: string) => void }) {
  const scrollTo = useScrollTo()
  const go = (target: string, cta: string) => {
    track('cta_clicked', { cta, location: 'hero', audience: 'facilities' })
    scrollTo(target)
  }

  return (
    <>
      <HeroShell
        audience="facilities"
        onAudience={onAudience}
        eyebrow={
          <span className="eyebrow">
            <Building2 className="size-3.5 text-sky-soft" aria-hidden /> For nursing homes & LTC
          </span>
        }
        title={
          <>
            Fill open shifts with <span className="text-gradient">trusted nurses.</span>
          </>
        }
        body="Hundreds of nursing homes use ESHYFT to cover call-outs, cut overtime and lean less on agencies. Post a shift; credentialed CNAs, LPNs and RNs nearby book it."
        actions={
          <div className="flex flex-wrap gap-3">
            <button onClick={() => go('consult', 'consult')} className="btn bg-sky-strong text-white shadow-[0_8px_30px_-8px_var(--color-sky)] hover:bg-sky-soft hover:text-ink">
              Book a 15-min consultation <ArrowRight className="size-4" aria-hidden />
            </button>
            <button onClick={() => go('calculator', 'calculator')} className="btn-ghost">
              Estimate your agency spend
            </button>
          </div>
        }
        proof={
          <p className="flex items-center gap-2 text-sm text-mute">
            <ShieldCheck className="size-5 text-teal" aria-hidden />
            <span>
              <strong className="font-semibold text-white">Joint Commission certified</strong> healthcare staffing
            </span>
          </p>
        }
        visual={<ShiftBoardMockup />}
      />

      <section aria-label="Customers" className="pb-16">
        <p className="container-x text-center text-sm text-mute">Trusted by hundreds of nursing homes, including</p>
        <Marquee className="mt-6" duration={35}>
          {operators.map((o) => (
            <span key={o} className="shrink-0 px-6 font-display text-xl font-semibold whitespace-nowrap text-white/45 sm:text-2xl">
              {o}
            </span>
          ))}
        </Marquee>
      </section>

      <ProofBar
        items={[
          { value: 'Hundreds', label: 'of nursing homes served' },
          { value: <Counter to={facts.states} />, label: 'states covered' },
          { value: '3 licenses', label: 'CNAs, LPNs & RNs' },
          { value: <Counter to={appRatings.facility.rating} decimals={1} suffix="★" />, label: 'manager app rating' },
        ]}
      />

      <PainToFix />
      <AgencyCostCalculator onBook={() => go('consult', 'consult_from_calculator')} />
      <Process />
      <ConsultForm />

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Questions" title="What facility leaders ask us" />
          <Reveal delay={0.1}>
            <Faq items={facilityFaqs} />
          </Reveal>
        </div>
      </section>

      <CrossSell to="nurses" onAudience={onAudience} />
    </>
  )
}

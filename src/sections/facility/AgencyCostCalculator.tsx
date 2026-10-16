import { ArrowRight, Info } from 'lucide-react'
import { useRef, useState, type CSSProperties } from 'react'
import { AnimatedNumber } from '../../components/AnimatedNumber'
import { Reveal, SectionHeading } from '../../components/Reveal'
import { track } from '../../lib/analytics'
import { formatUsd } from '../../lib/format'

/**
 * Health Affairs (2024): nursing-home agency staff cost ~50–60% more per hour than
 * direct employees. We use the midpoint (55%) to estimate how much of a facility's
 * agency spend is pure premium. We deliberately do NOT invent an "ESHYFT saves X%"
 * claim — the CTA routes to sales for a real quote.
 */
const AGENCY_PREMIUM = 0.55
const premiumShare = AGENCY_PREMIUM / (1 + AGENCY_PREMIUM)

function Slider({
  id, label, value, min, max, step, onChange, format,
}: {
  id: string; label: string; value: number; min: number; max: number; step: number
  onChange: (n: number) => void; format: (n: number) => string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-white">{label}</label>
        <span className="font-display text-2xl font-semibold text-white tabular-nums">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': `${((value - min) / (max - min)) * 100}%` } as CSSProperties}
        className="mt-4"
      />
    </div>
  )
}

export function AgencyCostCalculator({ onBook }: { onBook: () => void }) {
  const [hours, setHours] = useState(160)
  const [rate, setRate] = useState(55)
  const tracked = useRef(false)

  const touch = () => {
    if (tracked.current) return
    tracked.current = true
    track('calculator_used', { calculator: 'agency_cost' })
  }

  const annualSpend = hours * rate * 52
  const annualPremium = annualSpend * premiumShare

  return (
    <section id="calculator" className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Agency cost estimator"
        title="What is agency staffing really costing you?"
        body="Move the sliders to match a typical week at your facility."
      />
      <Reveal delay={0.1} className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="card space-y-10 p-6 sm:p-8">
          <Slider
            id="agency-hours"
            label="Agency hours per week"
            value={hours}
            min={20}
            max={800}
            step={20}
            onChange={(n) => { setHours(n); touch() }}
            format={(n) => `${n} hrs`}
          />
          <Slider
            id="agency-rate"
            label="Average agency bill rate"
            value={rate}
            min={30}
            max={110}
            step={1}
            onChange={(n) => { setRate(n); touch() }}
            format={(n) => `$${n}/hr`}
          />
        </div>

        <div className="card flex flex-col justify-between bg-gradient-to-br from-sky/20 via-transparent to-teal/15 p-6 sm:p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm text-mute">Annual agency spend</p>
              <p className="mt-2 font-display text-4xl font-semibold text-white">
                <AnimatedNumber value={annualSpend} format={formatUsd} />
              </p>
            </div>
            <div>
              <p className="text-sm text-mute">Est. agency premium</p>
              <p className="mt-2 font-display text-4xl font-semibold text-coral-soft">
                <AnimatedNumber value={annualPremium} format={formatUsd} />
              </p>
            </div>
          </div>
          <p className="mt-6 text-mute">
            That premium is money paid above what the same hours would cost with direct staff. Let's see how much of it
            per diem coverage can win back.
          </p>
          <button onClick={onBook} className="btn mt-6 self-start bg-sky-strong text-white hover:bg-sky-soft hover:text-ink">
            Get your real numbers on a call <ArrowRight className="size-4" aria-hidden />
          </button>
          <p className="mt-6 flex gap-2 text-xs leading-relaxed text-mute">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            Premium assumes agency labor costs ~55% more per hour than direct employees (Health Affairs, 2024: 50–60%).
            Estimate only.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

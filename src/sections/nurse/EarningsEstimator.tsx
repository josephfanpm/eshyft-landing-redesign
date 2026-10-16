import { m } from 'motion/react'
import { Info } from 'lucide-react'
import { useRef, useState, type CSSProperties } from 'react'
import type { Role } from '../../data/content'
import { illustrativeRates } from '../../data/content'
import { AnimatedNumber } from '../../components/AnimatedNumber'
import { Reveal, SectionHeading } from '../../components/Reveal'
import { track } from '../../lib/analytics'
import { formatUsd } from '../../lib/format'

const roles: Role[] = ['CNA', 'LPN', 'RN']
const lengths = [8, 12] as const
const WEEKS_PER_MONTH = 52 / 12

/**
 * Airbnb found earnings estimates were "an order of magnitude more effective than
 * any other value prop" for acquiring hosts (Lenny Rachitsky). This is the nurse equivalent.
 */
export function EarningsEstimator() {
  const [role, setRole] = useState<Role>('CNA')
  const [shifts, setShifts] = useState(3)
  const [hours, setHours] = useState<(typeof lengths)[number]>(8)
  const tracked = useRef(false)

  const rate = illustrativeRates[role]
  const weekly = rate * hours * shifts
  const monthly = weekly * WEEKS_PER_MONTH

  const touch = (field: string) => {
    if (tracked.current) return
    tracked.current = true
    track('calculator_used', { calculator: 'nurse_earnings', field })
  }

  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Earnings estimator"
        title={<>See what your schedule could earn.</>}
        body="Pick your license and how much you want to work. You decide every week."
      />

      <Reveal delay={0.1} className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card space-y-8 p-6 sm:p-8">
          <fieldset>
            <legend className="text-sm font-medium text-white">I am a…</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  key={r}
                  aria-pressed={role === r}
                  onClick={() => {
                    setRole(r)
                    touch('role')
                  }}
                  className={`relative rounded-2xl border px-4 py-3 text-sm font-semibold transition ${role === r ? 'border-coral bg-coral/15 text-white' : 'border-line text-mute hover:text-white'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="shifts" className="text-sm font-medium text-white">Shifts per week</label>
              <span className="font-display text-2xl font-semibold text-white tabular-nums">{shifts}</span>
            </div>
            <input
              id="shifts"
              type="range"
              min={1}
              max={6}
              value={shifts}
              onChange={(e) => {
                setShifts(Number(e.target.value))
                touch('shifts')
              }}
              style={{ '--fill': `${((shifts - 1) / 5) * 100}%` } as CSSProperties}
              className="mt-4"
            />
            <div className="mt-2 flex justify-between text-xs text-mute">
              <span>Side income</span>
              <span>Full-time+</span>
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-white">Shift length</legend>
            <div className="mt-3 inline-flex rounded-full border border-line p-1">
              {lengths.map((h) => (
                <button
                  key={h}
                  aria-pressed={hours === h}
                  onClick={() => {
                    setHours(h)
                    touch('hours')
                  }}
                  className="relative rounded-full px-5 py-2 text-sm font-medium"
                >
                  {hours === h && (
                    <m.span layoutId="len-pill" className="absolute inset-0 -z-0 rounded-full bg-white/10" />
                  )}
                  <span className={`relative ${hours === h ? 'text-white' : 'text-mute'}`}>{h} hours</span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="card relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-coral/20 via-transparent to-sky/15 p-6 sm:p-8">
          <div>
            <p className="text-sm text-mute">Estimated monthly earnings</p>
            <p className="mt-2 font-display text-6xl font-semibold text-white sm:text-7xl">
              <AnimatedNumber value={monthly} format={formatUsd} />
            </p>
            <p className="mt-3 text-mute">
              ≈ <span className="text-white"><AnimatedNumber value={weekly} format={formatUsd} /></span> a week at ~
              {formatUsd(rate)}/hr
            </p>
          </div>
          <p className="mt-10 flex gap-2 text-xs leading-relaxed text-mute">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            Illustrative estimate only, not an offer. Real rates are set per shift and vary by facility, state and
            urgency. See live rates near you in the app.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

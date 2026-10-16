import { Search } from 'lucide-react'
import { lazy, Suspense, useCallback, useRef, useState, type CSSProperties } from 'react'
import { SHIFTS_MAX, SHIFTS_MIN, estimateMonthly, formatUsd, formatUsdCents } from '../lib/estimate'
import type { EstimatorState } from '../lib/useEstimatorState'
import { track } from '../lib/analytics'
import { EstimateMethodDialog } from './EstimateMethodDialog'
import { LocationPicker } from './LocationPicker'

// The map library + tiles load after the headline and slider are interactive.
const NursingHomeMap = lazy(() => import('./NursingHomeMap'))

export function EarningsHero({
  state,
  update,
}: {
  state: EstimatorState
  update: (patch: Partial<EstimatorState>) => void
}) {
  const { city, role, shifts, hours } = state
  const { hourly, monthly } = estimateMonthly(city, role, shifts, hours)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [methodOpen, setMethodOpen] = useState(false)
  const sliderTracked = useRef(false)

  const closePicker = useCallback(() => setPickerOpen(false), [setPickerOpen])

  const changeFromPicker = (patch: Partial<EstimatorState>) => {
    update(patch)
    track('location_changed', {
      city: patch.city?.slug ?? city.slug,
      role: patch.role ?? role,
      hours: patch.hours ?? hours,
    })
  }

  return (
    <section className="container-page grid items-center gap-10 pt-6 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-20 lg:pb-24">
      <div className="mx-auto w-full max-w-[520px] text-center">
        {/* Explicit lines so the number always gets a line of its own, whatever its width. */}
        <h1 className="display text-[44px] sm:text-[64px] lg:text-[72px]">
          <span className="block">You could make</span>
          <span className="block tabular-nums">{formatUsd(monthly)}</span>
          <span className="block">on ESHYFT</span>
        </h1>

        <p className="mt-6 text-lg">
          <span className="font-semibold underline underline-offset-4">
            {shifts} {shifts === 1 ? 'shift' : 'shifts'}
          </span>{' '}
          a month · {formatUsdCents(hourly)}/hr
        </p>
        <p className="mt-1 text-[15px] text-ink-2">
          Learn how we{' '}
          <button
            onClick={() => {
              setMethodOpen(true)
              track('estimate_method_opened')
            }}
            className="underline underline-offset-2 hover:text-ink"
          >
            estimate earnings
          </button>
        </p>

        <div className="mx-auto mt-8 max-w-[340px]">
          <label htmlFor="shifts" className="sr-only">Shifts per month</label>
          <input
            id="shifts"
            type="range"
            className="earnings-range"
            min={SHIFTS_MIN}
            max={SHIFTS_MAX}
            value={shifts}
            aria-valuetext={`${shifts} shifts a month`}
            style={{ '--fill': `${((shifts - SHIFTS_MIN) / (SHIFTS_MAX - SHIFTS_MIN)) * 100}%` } as CSSProperties}
            onChange={(e) => {
              update({ shifts: Number(e.target.value) })
              if (!sliderTracked.current) {
                sliderTracked.current = true
                track('estimate_changed', { control: 'shifts' })
              }
            }}
          />
        </div>

        <div className="relative mx-auto mt-8 max-w-[420px]">
          <button
            onClick={() => setPickerOpen((o) => !o)}
            aria-expanded={pickerOpen}
            aria-haspopup="dialog"
            className="flex w-full items-center gap-4 rounded-full border border-hairline px-6 py-4 text-left transition-shadow hover:shadow-[0_2px_8px_rgb(0_0_0/0.12)]"
          >
            <Search className="size-5 shrink-0 text-coral" strokeWidth={2.5} aria-hidden />
            <span className="min-w-0 sm:truncate">
              <span className="font-semibold">{city.city}</span>
              <span className="text-ink-2 max-sm:block sm:before:content-['_·_']">
                {role} · {hours}-hour shifts
              </span>
            </span>
          </button>
          {pickerOpen && <LocationPicker state={state} onChange={changeFromPicker} onClose={closePicker} />}
        </div>
      </div>

      {/* `isolate` keeps Leaflet's internal z-indexes (400+) from painting over the sticky header and CTA. */}
      <div className="isolate h-[280px] overflow-hidden rounded-2xl bg-mist shadow-[0_6px_20px_rgb(0_0_0/0.12)] sm:h-[420px] lg:h-[600px]">
        <Suspense fallback={null}>
          <NursingHomeMap city={city} role={role} hours={hours} />
        </Suspense>
      </div>

      <EstimateMethodDialog open={methodOpen} onClose={() => setMethodOpen(false)} state={state} />
    </section>
  )
}

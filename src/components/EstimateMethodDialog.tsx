import type { EstimatorState } from '../lib/useEstimatorState'
import { estimateMonthly, formatUsd, formatUsdCents, meta, roleName } from '../lib/estimate'
import { Dialog } from './Dialog'

/** Airbnb's "Learn how we estimate earnings" — show the math, with the user's own numbers. */
export function EstimateMethodDialog({
  open,
  onClose,
  state,
}: {
  open: boolean
  onClose: () => void
  state: EstimatorState
}) {
  const { city, role, shifts, hours } = state
  const { hourly, monthly } = estimateMonthly(city, role, shifts, hours)

  return (
    <Dialog open={open} onClose={onClose} title="How we estimate earnings">
      <p className="text-ink-2">
        Your estimate is based on what a typical {roleName[role].toLowerCase()} earns per hour in the{' '}
        {city.metro}, multiplied by how much you choose to work.
      </p>

      <dl className="mt-6 divide-y divide-hairline rounded-xl border border-hairline">
        <Row label={`Median ${role} wage, ${city.metro}`} value={`${formatUsdCents(hourly)}/hr`} />
        <Row label="Hours per shift" value={`× ${hours}`} />
        <Row label="Shifts per month" value={`× ${shifts}`} />
        <Row label="Estimated monthly earnings" value={formatUsd(monthly)} strong />
      </dl>

      <p className="mt-6 text-sm text-ink-2">
        Hourly wages are the metro-area median from the U.S. Bureau of Labor Statistics Occupational Employment and
        Wage Statistics ({meta.wages.reference}). Estimates are before taxes and aren’t a guarantee of pay. On ESHYFT,
        each facility sets its own shift rates, which can be higher or lower than the median.
      </p>
    </Dialog>
  )
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
      <dt className={strong ? 'font-semibold' : 'text-ink-2'}>{label}</dt>
      <dd className={`tabular-nums ${strong ? 'text-lg font-bold' : 'font-medium'}`}>{value}</dd>
    </div>
  )
}

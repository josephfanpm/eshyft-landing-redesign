import { useEffect, useState } from 'react'
import type { City, Role, ShiftLength } from './estimate'
import { DEFAULT_CITY, ROLES, SHIFTS_MAX, SHIFTS_MIN, SHIFT_LENGTHS, cities } from './estimate'

export type EstimatorState = { city: City; role: Role; shifts: number; hours: ShiftLength }

const DEFAULTS: EstimatorState = { city: DEFAULT_CITY, role: 'RN', shifts: 20, hours: 8 }

function fromUrl(): EstimatorState {
  const q = new URLSearchParams(window.location.search)
  const city = cities.find((c) => c.slug === q.get('city')) ?? DEFAULTS.city
  const role = (ROLES as string[]).includes(q.get('role') ?? '') ? (q.get('role') as Role) : DEFAULTS.role
  // A missing param must not parse as 0 (Number(null) === 0), now that 0 is a valid value.
  const rawShifts = q.get('shifts')
  const shifts = rawShifts === null ? NaN : Number(rawShifts)
  const hours = Number(q.get('hours')) as ShiftLength
  return {
    city,
    role,
    shifts: Number.isInteger(shifts) && shifts >= SHIFTS_MIN && shifts <= SHIFTS_MAX ? shifts : DEFAULTS.shifts,
    hours: SHIFT_LENGTHS.includes(hours) ? hours : DEFAULTS.hours,
  }
}

/**
 * Estimator state mirrors into the query string (?city=pittsburgh-pa&role=RN&shifts=12),
 * so recruiters and paid ads can link straight to a localized estimate and
 * people can share "look what I could make".
 */
export function useEstimatorState() {
  const [state, setState] = useState<EstimatorState>(fromUrl)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    q.set('city', state.city.slug)
    q.set('role', state.role)
    q.set('shifts', String(state.shifts))
    q.set('hours', String(state.hours))
    window.history.replaceState(null, '', `${window.location.pathname}?${q}${window.location.hash}`)
  }, [state])

  const update = (patch: Partial<EstimatorState>) => setState((s) => ({ ...s, ...patch }))
  return [state, update] as const
}

import dataset from '../data/cities.json'

export type Role = 'CNA' | 'LPN' | 'RN'
export type City = (typeof dataset.cities)[number]

export const ROLES: Role[] = ['CNA', 'LPN', 'RN']
export const SHIFT_LENGTHS = [8, 12] as const
export type ShiftLength = (typeof SHIFT_LENGTHS)[number]

export const SHIFTS_MIN = 1
export const SHIFTS_MAX = 20

export const cities = dataset.cities
export const meta = dataset.meta
export const DEFAULT_CITY = cities.find((c) => c.slug === 'philadelphia-pa')!

export const roleName: Record<Role, string> = {
  CNA: 'Certified Nursing Assistant',
  LPN: 'Licensed Practical Nurse',
  RN: 'Registered Nurse',
}

/**
 * Monthly estimate = shifts per month × hours per shift × median hourly wage for the
 * role in the city's metro area (BLS OEWS). Deliberately simple and explainable, the
 * same way Airbnb's estimate is "nights × typical nightly rate nearby".
 */
export function estimateMonthly(city: City, role: Role, shifts: number, hours: ShiftLength) {
  const hourly = city.wages[role]
  return { hourly, perShift: hourly * hours, monthly: hourly * hours * shifts }
}

const usd0 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
export const formatUsd = (n: number) => usd0.format(Math.round(n))
export const formatUsdCents = (n: number) => usd2.format(n)

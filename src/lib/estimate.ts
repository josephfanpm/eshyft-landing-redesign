import dataset from '../data/cities.json'

export type Role = 'CNA' | 'LPN' | 'RN'
export type City = (typeof dataset.cities)[number]

export const ROLES: Role[] = ['CNA', 'LPN', 'RN']
export const SHIFT_LENGTHS = [8, 12] as const
export type ShiftLength = (typeof SHIFT_LENGTHS)[number]

export const SHIFTS_MIN = 0
export const SHIFTS_MAX = 30

export const cities = dataset.cities
export const meta = dataset.meta
export const DEFAULT_CITY = cities.find((c) => c.slug === 'philadelphia-pa')!

export const roleName: Record<Role, string> = {
  CNA: 'Certified Nursing Assistant',
  LPN: 'Licensed Practical Nurse',
  RN: 'Registered Nurse',
}

/**
 * Per diem uplift on the BLS staff median. Per diem shifts typically pay above
 * staff wages; 15% is a product assumption (see docs/CASE_STUDY.md §6) to be
 * replaced by ESHYFT's median posted rate in production.
 */
export const PER_DIEM_UPLIFT = 1.15

export const hourlyRate = (city: City, role: Role) => city.wages[role] * PER_DIEM_UPLIFT

/**
 * Monthly estimate = shifts per month × hours per shift × estimated hourly rate for the
 * role in the city's metro area. Deliberately simple and explainable, the same way
 * Airbnb's estimate is "nights × typical nightly rate nearby".
 */
export function estimateMonthly(city: City, role: Role, shifts: number, hours: ShiftLength) {
  const hourly = hourlyRate(city, role)
  return { hourly, perShift: hourly * hours, monthly: hourly * hours * shifts }
}

const usd0 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
export const formatUsd = (n: number) => usd0.format(Math.round(n))
export const formatUsdCents = (n: number) => usd2.format(n)

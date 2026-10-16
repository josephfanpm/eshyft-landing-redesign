/**
 * Single source of truth for page copy and data.
 *
 * Every *factual* claim here is sourced from eshyft.com or the public App Store API
 * (see docs/CASE_STUDY.md → "Fact sheet"). Anything that is an estimate for the
 * calculators is marked `illustrative` and is disclosed on the page.
 */

export type Audience = 'nurses' | 'facilities'
export type Role = 'CNA' | 'LPN' | 'RN'

export const links = {
  appStoreNurse: 'https://apps.apple.com/us/app/eshyft-per-diem-nursing/id1341456641',
  playStoreNurse: 'https://play.google.com/store/apps/details?id=com.eshyft.app',
  // Single deep link used for the desktop QR code. In production this would be a
  // Branch/OneLink smart link that routes to the right store and carries UTM params.
  smartDownload: 'https://eshyft.com/nurses/',
  signIn: 'https://eshyft.com/',
} as const

/** Pulled from the iTunes Search API on 2026-10-16. */
export const appRatings = {
  nurse: { rating: 4.7, count: 3991 },
  facility: { rating: 4.7, count: 59 },
} as const

export const facts = {
  states: 30,
  jointCommission: true,
  instantPayProvider: 'Stripe',
} as const

export const states = [
  ['AL', 'Alabama'], ['AR', 'Arkansas'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
  ['FL', 'Florida'], ['GA', 'Georgia'], ['IA', 'Iowa'], ['IL', 'Illinois'],
  ['IN', 'Indiana'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['MA', 'Massachusetts'],
  ['MD', 'Maryland'], ['ME', 'Maine'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MO', 'Missouri'], ['NC', 'North Carolina'], ['NE', 'Nebraska'], ['NJ', 'New Jersey'],
  ['NY', 'New York'], ['OH', 'Ohio'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['TN', 'Tennessee'], ['VA', 'Virginia'], ['VT', 'Vermont'],
  ['WI', 'Wisconsin'], ['WV', 'West Virginia'],
] as const

/** Customer names shown on eshyft.com's logo strip. Rendered as wordmarks in this concept. */
export const operators = [
  'Genesis HealthCare', 'Alaris Health', 'Monarch', 'Health Concepts', 'Priority',
  'Embassy Healthcare', 'Divine', 'Concord', 'Autumn Lake', 'Senior Living',
]

/** Verbatim quotes from eshyft.com's "Nurses ❤️ ESHYFT" section. */
export const testimonials = [
  { name: 'Zainab A.', role: 'LPN', state: 'PA', quote: "I love working for ESHYFT. If I have any issues they're always dealt with immediately." },
  { name: 'Kyrra B.', role: 'CNA', state: 'PA', quote: 'Love that you can make your own schedule.' },
  { name: 'Rebecca D.', role: 'CNA', state: 'RI', quote: "Over 8 months in, and it's the best decision ever." },
  { name: 'Jacintha P.', role: 'RN', state: 'MI', quote: 'Best agency yet!' },
  { name: 'ESHYFT nurse', role: 'CNA', state: 'NJ', quote: 'When I tell you I love ESHYFT, I love ESHYFT!' },
] as const

/**
 * Illustrative hourly rates for the earnings estimator. NOT ESHYFT pay data.
 * Real rates vary by facility, state, shift and urgency. In production these
 * would come from a live "median posted rate by role × state" API.
 */
export const illustrativeRates: Record<Role, number> = { CNA: 24, LPN: 38, RN: 48 }

export const nurseSteps = [
  {
    title: 'Browse nearby shifts',
    body: 'Filter by rate, date, distance and facility. See exactly what a shift pays before you commit.',
  },
  {
    title: 'Book in one tap',
    body: 'Instantly book open shifts or accept invites from facilities that already love working with you.',
  },
  {
    title: 'Work, clock out, get paid',
    body: 'Clock in and out in the app. Get paid weekly — or the same day with Instant Pay.',
  },
]

export const nurseFaqs = [
  { q: 'Who can work on ESHYFT?', a: 'Certified Nursing Assistants (CNAs), Licensed Practical Nurses (LPNs) and Registered Nurses (RNs) in the states where ESHYFT operates.' },
  { q: 'Do I have to commit to a schedule?', a: 'No. You choose which shifts to book and when — pick up one shift a month or five a week.' },
  { q: 'How fast do I get paid?', a: `Pay goes out weekly by default. With Instant Pay (powered by ${facts.instantPayProvider}) you can cash out the same day you work.` },
  { q: 'Where is ESHYFT available?', a: `ESHYFT is live in ${facts.states} states. Use the state checker above to see if you're covered.` },
]

export const facilityPains = [
  { pain: '5 a.m. call-out, no one to cover', fix: 'Post the shift in seconds — nearby credentialed CNAs, LPNs and RNs get notified instantly.' },
  { pain: 'Overtime and agency bills eating the budget', fix: 'Fill gaps with per diem professionals only when you need them. No long-term contracts.' },
  { pain: 'Compliance risk with unknown staff', fix: 'Every professional is credential-checked. ESHYFT is Joint Commission certified.' },
  { pain: 'Another system for schedulers to learn', fix: 'Manage shifts from the web or the facility manager app, with timekeeping and integrations built in.' },
]

export const facilitySteps = [
  { title: '15-minute consultation', body: 'Tell us about your open shifts, current agency spend and staffing goals.' },
  { title: 'Onboarding & integrations', body: 'We set up your facility, rates and tech integrations with a dedicated team.' },
  { title: 'Post shifts, see them fill', body: 'Post from web or app. Track fill status, clock-ins and nurse ratings in one place.' },
]

export const facilityFaqs = [
  { q: 'What types of facilities use ESHYFT?', a: 'Primarily skilled nursing facilities and long-term care communities — hundreds of them across the U.S.' },
  { q: 'How are nurses vetted?', a: 'Professionals are credential-checked before they can book. ESHYFT holds Joint Commission certification for healthcare staffing.' },
  { q: 'Is there a long-term commitment?', a: 'ESHYFT is per diem: you post the shifts you need, when you need them.' },
  { q: 'Does it integrate with our systems?', a: 'Yes — ESHYFT supports technology integrations. Ask about your scheduling and payroll stack on the call.' },
]

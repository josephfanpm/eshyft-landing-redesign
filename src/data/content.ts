/**
 * Page copy that isn't generated data. Facts are taken from eshyft.com/nurses and
 * the App Store (see docs/CASE_STUDY.md → "Where every number comes from").
 */

export const links = {
  // ESHYFT's own Branch smart links (from eshyft.com/nurses), which route to the right store.
  appIos: 'https://icccc.app.link/i25AE1Lp60b',
  appAndroid: 'https://icccc.app.link/Jt4Tl4in60b',
  instantPay: 'https://eshyft.com/eshyft-instant-pay/',
  help: 'https://help.eshyft.com/en/',
  support: 'mailto:support@eshyft.com',
  phone: 'tel:18009495188',
  facilities: 'https://eshyft.com/facilities/',
  signIn: 'https://webapp.eshyft.com/auth/login',
} as const

/** iTunes Search API, 2026-10-16 ("ESHYFT - Per Diem Nursing"). */
export const appRating = { stars: 4.7, count: 3991 }

export const STATES = [
  'Alabama', 'Arkansas', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Illinois', 'Indiana',
  'Iowa', 'Kansas', 'Kentucky', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Missouri', 'Nebraska', 'New Jersey', 'New York', 'North Carolina', 'Ohio', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'Tennessee', 'Vermont', 'Virginia', 'West Virginia', 'Wisconsin',
]

/** Verbatim quotes from eshyft.com/nurses. */
export const testimonials = [
  { name: 'Zainab A.', role: 'LPN', state: 'Pennsylvania', quote: "I love working for ESHYFT. If I have any issues they're always dealt with immediately." },
  { name: 'Kyrra B.', role: 'CNA', state: 'Pennsylvania', quote: 'Love that you can make your own schedule.' },
  { name: 'Rebecca D.', role: 'CNA', state: 'Rhode Island', quote: "Over 8 months in, and it's the best decision ever." },
  { name: 'Jacintha P.', role: 'RN', state: 'Michigan', quote: 'Best agency yet!' },
]

export type FaqGroup = { title: string; items: { q: string; a: string }[] }

export const faqGroups: FaqGroup[] = [
  {
    title: 'Getting started',
    items: [
      { q: 'Who can work on ESHYFT?', a: 'Certified Nursing Assistants (CNAs), Licensed Practical Nurses (LPNs) and Registered Nurses (RNs) in the 30 states where ESHYFT operates.' },
      { q: 'How do I sign up?', a: 'Download the ESHYFT app, apply, and upload your credentials to finish setting up your account. Once you’re approved, you can start picking up shifts.' },
      { q: 'Do I have to commit to a schedule?', a: 'No. You choose which shifts to book. Pick up as many or as few as you want.' },
    ],
  },
  {
    title: 'Pay',
    items: [
      { q: 'How fast do I get paid?', a: 'You can get paid weekly, or use Instant Pay for next-day or same-day access to your earnings. Instant Pay is powered by Stripe.' },
      { q: 'How is my estimate calculated?', a: 'We multiply your shifts per month by your shift length and the median hourly wage for your license in your metro area, published by the U.S. Bureau of Labor Statistics. Actual shift rates are set by each facility and may be higher or lower.' },
    ],
  },
  {
    title: 'Support',
    items: [
      { q: 'What if something goes wrong on a shift?', a: 'ESHYFT’s support team is available 24/7. Reach out in the app, email support@eshyft.com or call 1-800-949-5188.' },
    ],
  },
]

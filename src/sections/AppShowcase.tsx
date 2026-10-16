import type { ReactNode } from 'react'

/**
 * Airbnb's "Your place looks great on Airbnb": two phones on gray cards, cropped
 * at the bottom, with a caption underneath. Screens are coded (light, realistic)
 * rather than glossy composites, and reuse ESHYFT's real UI details — the blue
 * "Cash out" button and balance card from eshyft.com's Instant Pay artwork.
 */
export function AppShowcase({ onGetApp }: { onGetApp: () => void }) {
  return (
    <section className="container-page pb-24 sm:pb-32">
      <h2 className="display mx-auto max-w-[620px] text-center text-[40px] sm:text-[56px]">
        Everything happens in the app
      </h2>
      <div className="mx-auto mt-14 grid max-w-[816px] gap-4 sm:grid-cols-2">
        <Card title="Find shifts near you" body="Browse by rate, date and distance, then book in a tap.">
          <ShiftsScreen />
        </Card>
        <Card title="Cash out when you want" body="See your balance and send it to your card with Instant Pay.">
          <PayScreen />
        </Card>
      </div>
      <div className="mt-12 flex justify-center">
        <button onClick={onGetApp} className="btn-dark px-10">Get the app</button>
      </div>
    </section>
  )
}

function Card({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <figure>
      <div className="flex h-[400px] items-start justify-center overflow-hidden rounded-2xl bg-mist pt-8">
        <Phone>{children}</Phone>
      </div>
      <figcaption className="mt-5 text-center">
        <p className="text-lg font-medium">{title}</p>
        <p className="mx-auto mt-1 max-w-[280px] text-ink-2">{body}</p>
      </figcaption>
    </figure>
  )
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden className="w-[228px] rounded-t-[38px] border-[7px] border-b-0 border-[#1d1d1f] bg-white">
      <div className="flex items-center justify-between px-5 pt-2.5 text-[10px] font-semibold">
        <span>9:41</span>
        <span className="h-[18px] w-[72px] rounded-full bg-[#1d1d1f]" />
        <span>5G</span>
      </div>
      <div className="h-[360px] px-3.5 pt-4">{children}</div>
    </div>
  )
}

const shifts = [
  { name: 'Oak Lane Rehab & Nursing', when: 'Tue, Oct 21 · 7a–3p', mi: '1.8 mi', rate: '$24' },
  { name: 'Maple Grove Care Center', when: 'Wed, Oct 22 · 3p–11p', mi: '3.2 mi', rate: '$26' },
  { name: 'Riverside Senior Living', when: 'Sat, Oct 25 · 11p–7a', mi: '5.0 mi', rate: '$27' },
]

function ShiftsScreen() {
  return (
    <div className="text-[11px]">
      <p className="text-[17px] font-bold tracking-tight">Shifts near you</p>
      <div className="mt-2.5 flex gap-1.5">
        {['CNA', '< 10 mi', 'This week'].map((f, i) => (
          <span key={f} className={`rounded-full border px-2 py-1 whitespace-nowrap ${i === 0 ? 'border-ink bg-ink text-white' : 'border-hairline'}`}>
            {f}
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {shifts.map((s) => (
          <li key={s.name} className="rounded-xl border border-hairline p-2.5">
            <div className="flex justify-between gap-2">
              <p className="font-semibold leading-tight">{s.name}</p>
              <p className="shrink-0 text-[13px] font-bold">{s.rate}<span className="text-[9px] font-normal text-ink-2">/hr</span></p>
            </div>
            <p className="mt-1 text-ink-2">{s.when}</p>
            <p className="text-ink-2">{s.mi} away</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PayScreen() {
  return (
    <div className="text-[11px]">
      <p className="text-[17px] font-bold tracking-tight">Earnings</p>
      <div className="mt-3 rounded-xl border border-hairline p-3">
        <p className="text-ink-2">Balance</p>
        <p className="text-[22px] font-bold tracking-tight">$2,346.77</p>
      </div>
      <div className="mt-2.5 rounded-xl border border-hairline p-3">
        <p className="text-ink-2">Enter amount</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-[17px] font-semibold">$450.00</p>
          <span className="rounded-full bg-blue-ink px-3 py-1.5 font-semibold text-white">Cash out</span>
        </div>
      </div>
      <p className="mt-4 font-semibold">Recent</p>
      <ul className="mt-1.5 divide-y divide-hairline">
        {[
          ['Instant payout', 'Oct 14', '$450.00'],
          ['Weekly pay', 'Oct 10', '$1,184.40'],
          ['Instant payout', 'Oct 3', '$212.00'],
        ].map(([label, date, amt]) => (
          <li key={date} className="flex justify-between py-2">
            <span>
              {label}
              <span className="block text-ink-2">{date}</span>
            </span>
            <span className="font-semibold">{amt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

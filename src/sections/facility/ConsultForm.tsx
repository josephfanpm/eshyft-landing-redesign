import { AnimatePresence, m } from 'motion/react'
import { CalendarCheck, Check, PhoneCall, ShieldCheck } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { states } from '../../data/content'
import { Reveal } from '../../components/Reveal'
import { track } from '../../lib/analytics'

const roles = ['Administrator', 'DON / ADON', 'Staffing coordinator', 'Regional / Corporate', 'Other']
const needs = ['1–10', '11–30', '31–60', '60+']

/** Next three weekdays, generated client-side for the mock scheduler. */
function nextWeekdaySlots() {
  const out: { label: string; times: string[] }[] = []
  const d = new Date()
  while (out.length < 3) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    out.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      times: ['10:00 AM', '1:30 PM', '3:00 PM'],
    })
  }
  return out
}

/**
 * Short, visible (not modal) form, then *instant scheduling* on submit rather than
 * "someone will reach out". Fewer fields + booking the meeting in-flow is the
 * Chili Piper / Calendly pattern for lifting demo show rates.
 */
export function ConsultForm() {
  const [step, setStep] = useState<'form' | 'schedule' | 'done'>('form')
  const [need, setNeed] = useState(needs[1])
  const [slot, setSlot] = useState<string | null>(null)
  const started = useRef(false)
  const [slots] = useState(nextWeekdaySlots)

  const onFirstInput = () => {
    if (started.current) return
    started.current = true
    track('consult_form_started')
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) return
    // Production: POST to HubSpot/Salesforce with UTM + calculator inputs, then
    // route by state/size to the right AE's calendar.
    track('consult_form_submitted', { need })
    setStep('schedule')
  }

  return (
    <section id="consult" className="container-x scroll-mt-24 py-20 sm:py-28">
      <Reveal className="grid overflow-hidden rounded-[2.5rem] border border-line bg-ink-2/80 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative bg-gradient-to-br from-sky/25 via-transparent to-teal/15 p-8 sm:p-12">
          <span className="eyebrow">Talk to our team</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Book a 15-minute staffing consultation.</h2>
          <p className="mt-4 text-mute">No commitment. We'll look at your open shifts and agency spend and show you how ESHYFT would cover them.</p>
          <ul className="mt-8 space-y-3 text-sm text-white">
            {['See real rates for your state', 'Walk through the manager app', 'Get an onboarding timeline'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-teal/20 text-teal-soft"><Check className="size-3.5" aria-hidden /></span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-2 text-sm text-mute">
            <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-teal" aria-hidden /> Joint Commission certified</p>
            <p className="flex items-center gap-2"><PhoneCall className="size-4" aria-hidden /> Prefer to call? <a className="text-white underline-offset-4 hover:underline" href="tel:18009495188">1-800-949-5188</a></p>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <AnimatePresence mode="wait">
            {step === 'form' && (
              <m.form
                key="form"
                onSubmit={submit}
                onChange={onFirstInput}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <Field label="Full name" name="name" autoComplete="name" />
                <Field label="Work email" name="email" type="email" autoComplete="email" />
                <Field label="Facility name" name="facility" autoComplete="organization" />
                <div>
                  <label htmlFor="state" className="mb-1.5 block text-sm text-mute">State</label>
                  <select id="state" name="state" required className="field" defaultValue="">
                    <option value="" disabled>Select…</option>
                    {states.map(([c, n]) => <option key={c} value={c}>{n}</option>)}
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="role" className="mb-1.5 block text-sm text-mute">Your role</label>
                  <select id="role" name="role" required className="field" defaultValue="">
                    <option value="" disabled>Select…</option>
                    {roles.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-sm text-mute">Open shifts per month</legend>
                  <div className="flex flex-wrap gap-2">
                    {needs.map((n) => (
                      <button
                        type="button"
                        key={n}
                        aria-pressed={need === n}
                        onClick={() => setNeed(n)}
                        className={`rounded-full border px-4 py-2 text-sm transition ${need === n ? 'border-sky bg-sky/15 text-white' : 'border-line text-mute hover:text-white'}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <button type="submit" className="btn sm:col-span-2 mt-2 bg-sky-strong py-3.5 text-white hover:bg-sky-soft hover:text-ink">
                  Continue to pick a time
                </button>
                <p className="text-xs text-mute sm:col-span-2">Takes about 30 seconds. We never share your information.</p>
              </m.form>
            )}

            {step === 'schedule' && (
              <m.div key="schedule" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="flex items-center gap-2 text-sm text-teal-soft"><Check className="size-4" aria-hidden /> Got it. Now grab a time that works.</p>
                <h3 className="mt-3 text-2xl font-semibold">Pick a time for your 15-min call</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {slots.map((day) => (
                    <div key={day.label}>
                      <p className="mb-2 text-sm font-medium text-white">{day.label}</p>
                      <div className="flex flex-col gap-2">
                        {day.times.map((t) => {
                          const id = `${day.label} ${t}`
                          return (
                            <button
                              key={id}
                              onClick={() => setSlot(id)}
                              aria-pressed={slot === id}
                              className={`rounded-xl border px-3 py-2.5 text-sm transition ${slot === id ? 'border-sky bg-sky-strong text-white' : 'border-line text-mute hover:border-white/30 hover:text-white'}`}
                            >
                              {t}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <button disabled={!slot} onClick={() => setStep('done')} className="btn mt-8 w-full bg-sky-strong text-white disabled:opacity-40">
                  <CalendarCheck className="size-4" aria-hidden /> Confirm {slot ?? 'a time'}
                </button>
              </m.div>
            )}

            {step === 'done' && (
              <m.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full flex-col items-center justify-center py-10 text-center">
                <m.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  className="grid size-16 place-items-center rounded-full bg-teal text-ink"
                >
                  <CalendarCheck className="size-8" aria-hidden />
                </m.span>
                <h3 className="mt-6 text-2xl font-semibold">You're booked for {slot}.</h3>
                <p className="mt-2 max-w-sm text-mute">A calendar invite is on its way. (This is a demo — no data was sent.)</p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}

function Field({ label, name, type = 'text', autoComplete }: { label: string; name: string; type?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-mute">{label}</label>
      <input id={name} name={name} type={type} required autoComplete={autoComplete} className="field" />
    </div>
  )
}

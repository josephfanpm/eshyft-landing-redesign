import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { BadgeCheck, Bell, Clock, MapPin, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Coded (not screenshotted) mock of the nurse app, looping through the core job:
 * see shifts → book one → get paid. "Show the product" is the #1 YC website note;
 * building it in code keeps it crisp at any DPI and ~0 KB of images.
 *
 * Facility names are fictional.
 */
const shifts = [
  { facility: 'Maple Grove Care Center', role: 'CNA', time: 'Today · 3p – 11p', miles: 2.4, rate: 27 },
  { facility: 'Riverside Rehab & Nursing', role: 'CNA', time: 'Tomorrow · 7a – 3p', miles: 4.1, rate: 25 },
  { facility: 'Oakwood Senior Living', role: 'CNA', time: 'Sat · 11p – 7a', miles: 6.8, rate: 31 },
]

type Phase = 'browse' | 'booked' | 'paid'
const sequence: Phase[] = ['browse', 'booked', 'paid']

export function PhoneMockup() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('browse')

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setPhase((p) => sequence[(sequence.indexOf(p) + 1) % sequence.length])
    }, 2600)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]" aria-label="Preview of the ESHYFT nurse app" role="img">
      {/* glow */}
      <div className="absolute inset-8 -z-10 rounded-[3rem] bg-coral/40 blur-3xl" />
      <div className="animate-float rounded-[3rem] border border-white/15 bg-gradient-to-b from-white/15 to-white/5 p-2.5 shadow-2xl">
        <div className="relative h-[580px] overflow-hidden rounded-[2.5rem] bg-[#0E1526]">
          {/* status bar + notch */}
          <div className="flex items-center justify-between px-7 pt-3 text-[11px] font-semibold text-white/80">
            <span>9:41</span>
            <span className="h-6 w-24 rounded-full bg-black" />
            <span>5G</span>
          </div>

          <div className="px-4 pt-4">
            <p className="text-xs text-mute">Good afternoon, Rebecca</p>
            <p className="font-display text-xl font-semibold text-white">Shifts near you</p>
            <div className="mt-3 flex gap-2 text-[11px]">
              {['CNA', '< 10 mi', 'This week'].map((f) => (
                <span key={f} className="rounded-full border border-line bg-white/5 px-2.5 py-1 text-white/80">{f}</span>
              ))}
            </div>
          </div>

          <ul className="mt-4 space-y-2.5 px-4">
            {shifts.map((s, i) => {
              const highlighted = i === 0
              const booked = highlighted && phase !== 'browse'
              return (
                <m.li
                  key={s.facility}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, scale: highlighted && phase === 'browse' ? 1.02 : 1 }}
                  transition={{ delay: reduce ? 0 : 0.3 + i * 0.12, type: 'spring', stiffness: 260, damping: 26 }}
                  className={`rounded-2xl border p-3.5 ${booked ? 'border-teal/50 bg-teal/10' : highlighted ? 'border-coral/50 bg-coral/10' : 'border-line bg-white/[0.04]'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[13px] font-semibold text-white">{s.facility}</p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-mute">
                        <Clock className="size-3" aria-hidden /> {s.time}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-mute">
                        <MapPin className="size-3" aria-hidden /> {s.miles} mi away
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-semibold text-white">${s.rate}</p>
                      <p className="text-[10px] text-mute">/ hr</p>
                    </div>
                  </div>
                  {highlighted && (
                    <div className="mt-3">
                      <AnimatePresence mode="wait" initial={false}>
                        {booked ? (
                          <m.div
                            key="booked"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-teal py-2 text-xs font-semibold text-ink"
                          >
                            <BadgeCheck className="size-4" aria-hidden /> Booked
                          </m.div>
                        ) : (
                          <m.div
                            key="book"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="rounded-xl bg-coral-strong py-2 text-center text-xs font-semibold text-white"
                          >
                            Book shift
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </m.li>
              )
            })}
          </ul>

          {/* Instant Pay notification */}
          <AnimatePresence>
            {phase === 'paid' && (
              <m.div
                initial={{ y: -90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -90, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="absolute inset-x-3 top-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/15 p-3 shadow-xl backdrop-blur-xl"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-teal text-ink">
                  <Zap className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-white">Instant Pay sent</p>
                  <p className="truncate text-[11px] text-white/80">$216.00 is on its way to your card</p>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* tab bar */}
          <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-[#0E1526]/90 px-6 pt-3 pb-6 text-[10px] text-mute backdrop-blur">
            <span className="text-coral-soft">Shifts</span>
            <span>Schedule</span>
            <span className="flex items-center gap-1"><Bell className="size-3" aria-hidden />Inbox</span>
            <span>Pay</span>
          </div>
        </div>
      </div>
    </div>
  )
}

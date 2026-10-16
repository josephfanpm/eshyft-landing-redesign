import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { CheckCircle2, CircleDashed, Send, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Facility-side product shot: a shift board where posted shifts flip from "Open"
 * to "Filled" with the matched professional. Shows the outcome facilities buy
 * (coverage) rather than describing features. Names/units are fictional.
 */
type Row = { unit: string; role: string; time: string; nurse: string; rating: number }

const rows: Row[] = [
  { unit: 'East wing', role: 'CNA', time: 'Tonight · 11p – 7a', nurse: 'Kyrra B.', rating: 4.9 },
  { unit: 'Rehab unit', role: 'LPN', time: 'Tomorrow · 7a – 3p', nurse: 'Zainab A.', rating: 5.0 },
  { unit: 'Memory care', role: 'CNA', time: 'Tomorrow · 3p – 11p', nurse: 'Rebecca D.', rating: 4.8 },
  { unit: 'West wing', role: 'RN', time: 'Sat · 7a – 7p', nurse: 'Jacintha P.', rating: 4.9 },
]

export function ShiftBoardMockup() {
  const reduce = useReducedMotion()
  const [filled, setFilled] = useState(reduce ? rows.length : 0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setFilled((n) => (n >= rows.length + 2 ? 0 : n + 1)), 1300)
    return () => clearInterval(id)
  }, [reduce])

  const done = Math.min(filled, rows.length)
  const pct = Math.round((done / rows.length) * 100)

  return (
    <div className="relative" role="img" aria-label="Preview of the ESHYFT facility shift board filling open shifts">
      <div className="absolute inset-10 -z-10 rounded-[3rem] bg-sky/40 blur-3xl" />
      <div className="card overflow-hidden bg-ink-2/90 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-coral/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-teal/70" />
          <span className="ml-3 text-xs text-mute">Shift board · This week</span>
        </div>

        <div className="p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-mute">Open shifts covered</p>
              <p className="font-display text-3xl font-semibold text-white tabular-nums">
                {done}/{rows.length}
              </p>
            </div>
            <button className="btn-ghost pointer-events-none px-3 py-2 text-xs" tabIndex={-1}>
              <Send className="size-3.5" aria-hidden /> Post shift
            </button>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-3">
            <m.div
              className="h-full rounded-full bg-gradient-to-r from-sky to-teal"
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>

          <ul className="mt-5 space-y-2.5">
            {rows.map((r, i) => {
              const isFilled = i < done
              return (
                <li
                  key={r.unit}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors duration-500 ${isFilled ? 'border-teal/40 bg-teal/[0.07]' : 'border-line bg-white/[0.03]'}`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {r.role} · {r.unit}
                    </p>
                    <p className="text-xs text-mute">{r.time}</p>
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    {isFilled ? (
                      <m.div
                        key="filled"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex shrink-0 items-center gap-2"
                      >
                        <span className="hidden text-right sm:block">
                          <span className="block text-xs font-medium text-white">{r.nurse}</span>
                          <span className="flex items-center justify-end gap-0.5 text-[11px] text-mute">
                            <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden /> {r.rating.toFixed(1)}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-teal/15 px-2.5 py-1 text-xs font-semibold text-teal-soft">
                          <CheckCircle2 className="size-3.5" aria-hidden /> Filled
                        </span>
                      </m.div>
                    ) : (
                      <m.span
                        key="open"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -12 }}
                        className="flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-mute"
                      >
                        <CircleDashed className="size-3.5 animate-spin [animation-duration:3s]" aria-hidden /> Open
                      </m.span>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

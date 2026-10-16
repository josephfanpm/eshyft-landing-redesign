import { Check, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Role, ShiftLength } from '../lib/estimate'
import { ROLES, SHIFT_LENGTHS, cities } from '../lib/estimate'
import type { EstimatorState } from '../lib/useEstimatorState'

/**
 * The search pill's popover — Airbnb's "Toronto · Entire place · 2 bedrooms" becomes
 * "Philadelphia · CNA · 8-hour shifts". Three inputs, one panel.
 */
export function LocationPicker({
  state,
  onChange,
  onClose,
}: {
  state: EstimatorState
  onChange: (patch: Partial<EstimatorState>) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const panel = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    input.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onDown = (e: PointerEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) onClose()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cities
    return cities.filter((c) => `${c.city}, ${c.state}`.toLowerCase().includes(q) || c.state.toLowerCase() === q)
  }, [query])

  return (
    <div
      ref={panel}
      role="dialog"
      aria-label="Location and shift details"
      className="absolute top-[calc(100%+12px)] left-0 z-30 w-full min-w-[300px] overflow-hidden rounded-3xl border border-hairline bg-white text-left shadow-[0_8px_28px_rgb(0_0_0/0.18)] sm:w-[420px]"
    >
      <div className="border-b border-hairline p-4">
        <label className="flex items-center gap-3 rounded-full border border-hairline px-4 py-3 focus-within:border-ink">
          <Search className="size-4 text-ink-2" aria-hidden />
          <span className="sr-only">Search cities</span>
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cities"
            className="w-full bg-transparent outline-none placeholder:text-ink-2"
          />
        </label>
      </div>

      <ul className="max-h-60 overflow-y-auto py-2" role="listbox" aria-label="Cities">
        {results.map((c) => {
          const selected = c.slug === state.city.slug
          return (
            <li key={c.slug} role="option" aria-selected={selected}>
              <button
                onClick={() => {
                  onChange({ city: c })
                  setQuery('')
                }}
                className="flex w-full items-center justify-between gap-3 px-5 py-2.5 text-left hover:bg-mist"
              >
                <span>
                  <span className="font-medium">{c.city}, {c.state}</span>
                  <span className="block text-sm text-ink-2">{c.nursingHomes} nursing homes nearby</span>
                </span>
                {selected && <Check className="size-4" aria-hidden />}
              </button>
            </li>
          )
        })}
        {results.length === 0 && <li className="px-5 py-3 text-ink-2">ESHYFT isn’t in that city yet.</li>}
      </ul>

      <div className="space-y-4 border-t border-hairline p-5">
        <Segmented
          label="License"
          options={ROLES}
          value={state.role}
          onChange={(role) => onChange({ role: role as Role })}
        />
        <Segmented
          label="Shift length"
          options={SHIFT_LENGTHS.map(String)}
          format={(h) => `${h} hours`}
          value={String(state.hours)}
          onChange={(h) => onChange({ hours: Number(h) as ShiftLength })}
        />
        <button onClick={onClose} className="btn-dark w-full py-3">Done</button>
      </div>
    </div>
  )
}

function Segmented({
  label,
  options,
  value,
  onChange,
  format = (s) => s,
}: {
  label: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
  format?: (s: string) => string
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o}
            aria-pressed={o === value}
            onClick={() => onChange(o)}
            className={`flex-1 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${o === value ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'}`}
          >
            {format(o)}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

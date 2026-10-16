/** ESHYFT mark (coral ring + blue cross) and wordmark. */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <circle cx="16" cy="16" r="11" fill="none" stroke="#ef4651" strokeWidth="4" />
        <path d="M16 9.5v13M9.5 16h13" stroke="#3399ff" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="text-[19px] font-semibold tracking-[0.22em]">ESHYFT</span>
    </span>
  )
}

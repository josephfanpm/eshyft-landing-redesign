/** Simplified ESHYFT mark (coral "e" ring + blue cross) and wordmark, drawn in SVG so it's crisp and tiny. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <circle cx="16" cy="16" r="11" fill="none" stroke="var(--color-coral)" strokeWidth="4" />
        <path d="M16 9.5v13M9.5 16h13" stroke="var(--color-sky)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-[0.18em] text-white">ESHYFT</span>
    </span>
  )
}

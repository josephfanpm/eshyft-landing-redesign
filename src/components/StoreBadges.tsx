import { links } from '../data/content'
import { track } from '../lib/analytics'

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.32-3.5ZM14.19 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21Z" />
    </svg>
  )
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path d="M4 2.8v18.4c0 .4.4.6.7.4L14 12 4.7 2.4c-.3-.2-.7 0-.7.4Z" fill="#3399FF" />
      <path d="m14 12 3 3-11.6 6.6L14 12Z" fill="#EF4651" />
      <path d="m14 12-8.6-9.6L17 9l-3 3Z" fill="#15BAA2" />
      <path d="m17 9 3.3 1.9c.8.5.8 1.7 0 2.2L17 15l-3-3 3-3Z" fill="#FFC53D" />
    </svg>
  )
}

export function StoreBadges({ location }: { location: string }) {
  const badge =
    'flex items-center gap-2.5 rounded-xl border border-white/15 bg-black px-4 py-2.5 text-white transition hover:border-white/40 hover:bg-white/5'
  return (
    <div className="flex flex-wrap gap-3">
      <a
        className={badge}
        href={links.appStoreNurse}
        target="_blank"
        rel="noreferrer"
        onClick={() => track('store_badge_clicked', { store: 'ios', location })}
      >
        <AppleGlyph />
        <span className="text-left leading-tight">
          <span className="block text-[10px] text-white/70">Download on the</span>
          <span className="block text-base font-semibold">App Store</span>
        </span>
      </a>
      <a
        className={badge}
        href={links.playStoreNurse}
        target="_blank"
        rel="noreferrer"
        onClick={() => track('store_badge_clicked', { store: 'android', location })}
      >
        <PlayGlyph />
        <span className="text-left leading-tight">
          <span className="block text-[10px] text-white/70">Get it on</span>
          <span className="block text-base font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  )
}

import type { Audience } from '../data/content'

/**
 * Ambient background: blurred brand-colored blobs over a faint grid. The palette
 * shifts per audience (warm coral for nurses, cool blue for facilities) as a
 * subconscious "you switched sides" cue. Pure CSS animation, GPU-friendly.
 */
export function Backdrop({ audience }: { audience: Audience }) {
  const nurse = audience === 'nurses'
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, #000 20%, transparent 70%)',
        }}
      />
      <div
        className={`absolute -top-40 -left-32 size-[38rem] animate-blob rounded-full blur-[120px] transition-colors duration-1000 ${nurse ? 'bg-coral/25' : 'bg-sky/25'}`}
      />
      <div
        className={`absolute top-20 -right-40 size-[34rem] animate-blob rounded-full blur-[120px] transition-colors duration-1000 [animation-delay:-6s] ${nurse ? 'bg-sky/15' : 'bg-teal/20'}`}
      />
      <div className="absolute top-[60%] left-1/3 size-[30rem] animate-blob rounded-full bg-teal/10 blur-[140px] [animation-delay:-12s]" />
    </div>
  )
}

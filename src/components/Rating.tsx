import { Star } from 'lucide-react'
import { appRatings } from '../data/content'

/** Verified third-party proof beats self-reported "top-rated" claims (NN/g trust research). */
export function Rating({ kind = 'nurse' }: { kind?: 'nurse' | 'facility' }) {
  const { rating, count } = appRatings[kind]
  return (
    <div className="flex items-center gap-2 text-sm text-mute">
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`size-4 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
          />
        ))}
      </div>
      <span>
        <strong className="font-semibold text-white">{rating.toFixed(1)}</strong> from{' '}
        {count.toLocaleString('en-US')} App Store ratings
      </span>
    </div>
  )
}

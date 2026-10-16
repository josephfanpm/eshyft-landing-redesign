import { AnimatePresence, m } from 'motion/react'
import { QRCodeSVG } from 'qrcode.react'
import { Check, MessageSquareText } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { links } from '../data/content'
import { track } from '../lib/analytics'
import { StoreBadges } from './StoreBadges'

/**
 * Device-aware download CTA.
 *  - Mobile: store badges (one tap to install).
 *  - Desktop: a QR code + "text me the link". Most nurses discover ESHYFT on a phone,
 *    but those who land on desktop need a bridge to mobile — the Lyft/DoorDash
 *    pattern of asking for a phone number in the hero.
 */
export function DownloadPanel({ location }: { location: string }) {
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const valid = phone.replace(/\D/g, '').length >= 10

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    // Production: POST to an SMS service (e.g. Branch "Text Me The App" / Twilio) with UTM context.
    track('cta_clicked', { cta: 'text_me_link', location })
    setSent(true)
  }

  return (
    <div className="space-y-5">
      <div className="lg:hidden">
        <StoreBadges location={location} />
      </div>

      <div className="hidden items-center gap-5 lg:flex">
        <div className="rounded-2xl bg-white p-2.5 shadow-lg">
          <QRCodeSVG value={links.smartDownload} size={96} bgColor="#ffffff" fgColor="#0B1220" level="M" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">Scan to get the app — or we'll text you the link.</p>
          <form onSubmit={submit} className="mt-3 flex max-w-sm gap-2">
            <label htmlFor={`phone-${location}`} className="sr-only">Mobile number</label>
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <m.p
                  key="sent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 py-3 text-sm text-teal-soft"
                >
                  <Check className="size-4" aria-hidden /> Link sent! Check your messages.
                </m.p>
              ) : (
                <m.div key="form" exit={{ opacity: 0 }} className="flex w-full gap-2">
                  <input
                    id={`phone-${location}`}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 555-0123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field py-2.5"
                  />
                  <button type="submit" disabled={!valid} className="btn-primary shrink-0 px-4 py-2.5 disabled:opacity-50">
                    <MessageSquareText className="size-4" aria-hidden /> Text me
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  )
}

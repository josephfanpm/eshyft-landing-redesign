import { QRCodeSVG } from 'qrcode.react'
import { links } from '../data/content'
import { track } from '../lib/analytics'
import { Dialog } from './Dialog'
import { StoreBadges } from './StoreBadges'

/**
 * Desktop only: the conversion happens on a phone, so desktop visitors get a QR
 * code (ESHYFT's Branch link routes to the right store) plus store badges.
 * Mirrors the three steps from ESHYFT's existing app modal.
 */
export function GetAppDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} title="Get the ESHYFT app">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="shrink-0 rounded-xl border border-hairline p-3">
          <QRCodeSVG value={links.appIos} size={148} level="M" fgColor="#1f2937" />
        </div>
        <div>
          <p className="text-xl font-bold tracking-tight">Scan with your phone’s camera</p>
          <ol className="mt-4 space-y-3 text-ink-2">
            <li><span className="font-semibold text-ink">1. Browse shifts</span> near you</li>
            <li><span className="font-semibold text-ink">2. Upload your license</span> and certifications</li>
            <li><span className="font-semibold text-ink">3. Book shifts</span> and get paid</li>
          </ol>
        </div>
      </div>
      <div className="mt-6 border-t border-hairline pt-6">
        <StoreBadges onClick={(store) => track('store_clicked', { store, location: 'get_app_dialog' })} />
      </div>
    </Dialog>
  )
}

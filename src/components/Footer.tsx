import { ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Audience } from '../data/content'
import { Logo } from './Logo'

export function Footer({ onAudience }: { onAudience: (a: Audience) => void }) {
  return (
    <footer className="border-t border-line pt-16 pb-28 md:pb-16">
      <div className="container-x grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-mute">
            Connecting CNAs, LPNs and RNs with per diem shifts at long-term care facilities.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-white">
            <ShieldCheck className="size-4 text-teal" aria-hidden /> Joint Commission certified
          </p>
        </div>
        <FooterCol title="Nurses">
          <button onClick={() => onAudience('nurses')} className="text-left hover:text-white">For CNAs & nurses</button>
          <a href="https://eshyft.com/eshyft-instant-pay/" className="hover:text-white">Instant Pay</a>
        </FooterCol>
        <FooterCol title="Facilities">
          <button onClick={() => onAudience('facilities')} className="text-left hover:text-white">For nursing homes</button>
          <a href="https://eshyft.com/" className="hover:text-white">Technology integrations</a>
        </FooterCol>
        <FooterCol title="Company">
          <a href="https://eshyft.com/" className="hover:text-white">About</a>
          <a href="https://eshyft.com/" className="hover:text-white">Careers</a>
          <a href="tel:18009495188" className="hover:text-white">1-800-949-5188</a>
        </FooterCol>
      </div>
      <div className="container-x mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:justify-between">
        <p>
          Concept redesign by Joseph Fan for portfolio purposes. Not the official ESHYFT website.
        </p>
        <p>Pay figures shown are illustrative estimates, not offers.</p>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <div className="mt-4 flex flex-col gap-3 text-sm text-mute">{children}</div>
    </div>
  )
}

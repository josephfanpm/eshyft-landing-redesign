import type { ReactNode } from 'react'
import { links } from '../data/content'
import { meta } from '../lib/estimate'

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-mist pb-28 sm:pb-0">
      <div className="container-page">
        <div className="grid gap-10 py-12 sm:grid-cols-3">
          <Col title="Nurses">
            <a href={links.instantPay}>Instant Pay</a>
            <a href={links.help}>Help center</a>
            <a href="https://eshyft.com/faq/">FAQs</a>
          </Col>
          <Col title="Facilities">
            <a href={links.facilities}>ESHYFT for facilities</a>
            <a href="https://eshyft.com/roi-calculator/">ROI calculator</a>
            <a href={links.signIn}>Facility manager sign in</a>
          </Col>
          <Col title="ESHYFT">
            <a href="https://eshyft.com/about-us/">About</a>
            <a href="https://eshyft.com/careers/">Careers</a>
            <a href={links.phone}>1-800-949-5188</a>
          </Col>
        </div>
        <div className="space-y-2 border-t border-hairline py-6 text-sm text-ink-2">
          <p>Concept redesign of eshyft.com/nurses by Joseph Fan. Not an official ESHYFT page.</p>
          <p>
            Wages: {meta.wages.source}, {meta.wages.reference}. Nursing homes: {meta.nursingHomes.source} (
            {meta.nursingHomes.processingDate}); not all are ESHYFT partners. Map data © OpenStreetMap contributors.
          </p>
        </div>
      </div>
    </footer>
  )
}

function Col({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-sm font-bold">{title}</p>
      <div className="mt-4 flex flex-col gap-3 text-sm [&_a:hover]:underline">{children}</div>
    </div>
  )
}

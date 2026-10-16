import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import type { Audience } from '../data/content'
import { links } from '../data/content'
import { track } from '../lib/analytics'
import { useScrollTo } from '../lib/useScrollTo'

/**
 * Thumb-zone CTA on mobile once the hero CTA has scrolled away. For nurses it goes
 * straight to the store (the conversion we want); for facilities it jumps to the form.
 */
export function StickyMobileCta({ audience }: { audience: Audience }) {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 640))
  const scrollTo = useScrollTo()

  const isIos = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent)

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/85 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
        >
          {audience === 'nurses' ? (
            <a
              href={isIos ? links.appStoreNurse : links.playStoreNurse}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('store_badge_clicked', { store: isIos ? 'ios' : 'android', location: 'sticky' })}
              className="btn-primary w-full"
            >
              Download the free app
            </a>
          ) : (
            <button
              onClick={() => {
                track('cta_clicked', { cta: 'consult', location: 'sticky', audience })
                scrollTo('consult')
              }}
              className="btn w-full bg-sky-strong text-white"
            >
              Book a 15-min consultation
            </button>
          )}
        </m.div>
      )}
    </AnimatePresence>
  )
}

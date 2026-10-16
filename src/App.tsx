import { ReactLenis } from 'lenis/react'
import { AnimatePresence, LazyMotion, MotionConfig, m, useReducedMotion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Backdrop } from './components/Backdrop'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { StickyMobileCta } from './components/StickyMobileCta'
import { useAudience } from './lib/useAudience'
import { NursePage } from './sections/nurse/NursePage'

// Nurses are the default (and the "hard side" of the marketplace), so their page ships
// in the main bundle; the facility page is code-split and fetched on demand.
const FacilityPage = lazy(() =>
  import('./sections/facility/FacilityPage').then((mod) => ({ default: mod.FacilityPage })),
)
const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

export default function App() {
  const { audience, setAudience } = useAudience()
  const reduce = useReducedMotion()

  const page = (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <ScrollProgress />
      <Backdrop audience={audience} />
      <Nav audience={audience} onAudience={setAudience} />

      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={audience}
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {audience === 'nurses' ? (
              <NursePage onAudience={setAudience} />
            ) : (
              <Suspense fallback={<div className="min-h-screen" />}>
                <FacilityPage onAudience={setAudience} />
              </Suspense>
            )}
          </m.div>
        </AnimatePresence>
      </main>

      <Footer onAudience={setAudience} />
      <StickyMobileCta audience={audience} />
    </>
  )

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        {/* Smooth scrolling is a nicety, never forced on people who asked for less motion. */}
        {reduce ? page : <ReactLenis root options={{ lerp: 0.12 }}>{page}</ReactLenis>}
      </MotionConfig>
    </LazyMotion>
  )
}

import { useState } from 'react'
import { EarningsHero } from './components/EarningsHero'
import { Footer } from './components/Footer'
import { GetAppDialog } from './components/GetAppDialog'
import { Header } from './components/Header'
import { StickyCta } from './components/StickyCta'
import { track } from './lib/analytics'
import { useEstimatorState } from './lib/useEstimatorState'
import { AppShowcase } from './sections/AppShowcase'
import { BackedBy } from './sections/BackedBy'
import { Coverage } from './sections/Coverage'
import { Faq } from './sections/Faq'
import { SupportBanner } from './sections/SupportBanner'
import { Testimonials } from './sections/Testimonials'
import { WhyEshyft } from './sections/WhyEshyft'

export default function App() {
  const [state, update] = useEstimatorState()
  const [getAppOpen, setGetAppOpen] = useState(false)

  const openGetApp = (location: string) => {
    track('get_app_clicked', { location })
    setGetAppOpen(true)
  }

  return (
    <>
      <Header onGetApp={() => openGetApp('header')} />
      <main>
        <EarningsHero state={state} update={update} />
        <SupportBanner />
        <WhyEshyft />
        <Testimonials />
        <BackedBy />
        <AppShowcase onGetApp={() => openGetApp('app_showcase')} />
        <Coverage />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <GetAppDialog open={getAppOpen} onClose={() => setGetAppOpen(false)} />
    </>
  )
}

import { useEffect, useState } from 'react'
import { Logo } from './Logo'

/** Airbnb's host header: logo + one button. Nothing else competes with the estimate. */
export function Header({ onGetApp }: { onGetApp: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 bg-white transition-[border-color] ${scrolled ? 'border-b border-hairline' : 'border-b border-transparent'}`}>
      <div className="container-page flex h-20 items-center justify-between">
        <a href="https://eshyft.com" aria-label="ESHYFT home">
          <Logo />
        </a>
        <button onClick={onGetApp} className="btn-brand hidden px-6 py-3 sm:inline-flex">
          Get the app
        </button>
      </div>
    </header>
  )
}

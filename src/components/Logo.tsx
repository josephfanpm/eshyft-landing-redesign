import logoUrl from '../assets/eshyft-logo.png'

/** ESHYFT's horizontal logo (388×80 PNG, rendered at 32px tall so it stays sharp on 2x screens). */
export function Logo() {
  return <img src={logoUrl} alt="ESHYFT" width={155} height={32} className="h-8 w-auto" />
}

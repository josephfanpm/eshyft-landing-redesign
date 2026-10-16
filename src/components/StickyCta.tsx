import { links } from '../data/content'
import { track } from '../lib/analytics'

/**
 * Mobile only, always visible — same as Airbnb's host page on a phone.
 * On a phone the button goes straight to ESHYFT's smart link (store or app).
 */
export function StickyCta() {
  const android = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-white px-6 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:hidden">
      <a
        href={android ? links.appAndroid : links.appIos}
        onClick={() => track('get_app_clicked', { location: 'sticky_mobile' })}
        className="btn-brand w-full"
      >
        Get the app
      </a>
    </div>
  )
}

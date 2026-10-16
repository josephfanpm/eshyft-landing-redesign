/**
 * Funnel events for the nurse page. Pushes to a GTM-compatible dataLayer;
 * logs in development. Swap for Segment/GA4/Mixpanel in production.
 */
export type FunnelEvent =
  | 'estimate_changed'
  | 'location_changed'
  | 'map_home_opened'
  | 'estimate_method_opened'
  | 'get_app_clicked'
  | 'store_clicked'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(event: FunnelEvent, props: Record<string, unknown> = {}) {
  window.dataLayer ??= []
  window.dataLayer.push({ event, ...props })
  if (import.meta.env.DEV) console.info('[track]', event, props)
}

/**
 * Funnel instrumentation stub. A landing page redesign is only as good as the
 * measurement behind it, so every conversion-relevant interaction emits an event.
 *
 * In production this would forward to GA4 / Segment / Mixpanel. Here it pushes to
 * window.dataLayer (GTM-compatible) and logs in development.
 */
export type FunnelEvent =
  | 'audience_selected'
  | 'cta_clicked'
  | 'store_badge_clicked'
  | 'calculator_used'
  | 'state_checked'
  | 'consult_form_started'
  | 'consult_form_submitted'

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

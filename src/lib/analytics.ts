/**
 * Public analytics entry — consent-aware, PII-safe.
 * Prefer importing from here or `@/lib/analytics/track`.
 */

export {
  track,
  setAnalyticsConsentGranted,
  isAnalyticsConsentGranted,
  type AnalyticsPayload,
} from "./analytics/track";

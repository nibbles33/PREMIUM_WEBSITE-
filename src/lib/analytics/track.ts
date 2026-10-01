/**
 * Consent-aware analytics facade.
 * Events are emitted only when Analytics consent is granted.
 * Never stockpiles denied events for later flush.
 */

import { readConsentCookie } from "@/lib/consent/storage";
import {
  buildDataLayerEvent,
  type AnalyticsPayload,
} from "./sanitize";

export type { AnalyticsPayload } from "./sanitize";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __pibAnalyticsConsent?: boolean;
  }
}

/** Called by ConsentProvider when analytics preference changes. */
export function setAnalyticsConsentGranted(granted: boolean): void {
  if (typeof window === "undefined") return;
  const prev = window.__pibAnalyticsConsent;
  window.__pibAnalyticsConsent = granted;
  if (granted && prev !== true) {
    window.dispatchEvent(new CustomEvent("pib:analytics-consent-granted"));
  }
}

export function isAnalyticsConsentGranted(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof window.__pibAnalyticsConsent === "boolean") {
    return window.__pibAnalyticsConsent;
  }
  const decision = readConsentCookie();
  return decision.kind === "set" && decision.record.analytics;
}

/**
 * Emit a semantic analytics event to the dataLayer (GTM → GA4).
 * No-ops when Analytics consent is denied or unavailable.
 */
export function track(event: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;
  if (!event || typeof event !== "string") return;
  if (!/^[a-z][a-z0-9_]{1,64}$/.test(event)) return;
  if (!isAnalyticsConsentGranted()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[analytics:denied]", event);
    }
    return;
  }

  const push = buildDataLayerEvent(event, payload);

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(push);
  } catch {
    /* ignore */
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, push);
  }
}

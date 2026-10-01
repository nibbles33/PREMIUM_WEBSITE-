/**
 * Google Consent Mode v2 helpers.
 * Defaults are denied before any Google tags run (see ConsentBootstrapScript).
 */

export type ConsentModeUpdate = {
  analytics_storage: "granted" | "denied";
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Ensure dataLayer + gtag stub exist (idempotent). */
export function ensureGtagStub(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") return;
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
}

export function buildConsentUpdate(analyticsGranted: boolean): ConsentModeUpdate {
  return {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

export function applyConsentMode(analyticsGranted: boolean): void {
  if (typeof window === "undefined") return;
  ensureGtagStub();
  const update = buildConsentUpdate(analyticsGranted);
  try {
    window.gtag?.("consent", "update", update);
  } catch {
    /* ignore */
  }
}

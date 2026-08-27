/**
 * Lightweight analytics shim. Forwards to gtag / dataLayer when present;
 * no-ops otherwise so quote-flow instrumentation is ready for GA4/GTM.
 * Never pass PII (name, phone, email, free-text notes).
 */
export type AnalyticsPayload = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  const clean: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    clean[key] = value;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...clean });
  } catch {
    /* ignore */
  }

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, clean);
    }
  } catch {
    /* ignore */
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, clean);
  }
}

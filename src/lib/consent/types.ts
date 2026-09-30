/** First-party consent categories for PremiumIB. */

export const CONSENT_COOKIE_NAME = "pib_consent";
export const CONSENT_VERSION = 1;
/** Persist preferences for 180 days. */
export const CONSENT_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  experience: boolean;
};

export type ConsentRecord = ConsentCategories & {
  version: number;
  timestamp: string;
};

export type ConsentDecision =
  | { kind: "unset" }
  | { kind: "set"; record: ConsentRecord };

export function createConsentRecord(
  partial: Pick<ConsentCategories, "analytics" | "experience">,
): ConsentRecord {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: Boolean(partial.analytics),
    experience: Boolean(partial.experience),
    timestamp: new Date().toISOString(),
  };
}

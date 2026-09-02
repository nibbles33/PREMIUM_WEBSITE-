import { homepageCarriers } from "@/data/partners";
import { paymentCarriers } from "@/data/payment-carriers";

export type CarrierClaimEntry = {
  carrierName: string;
  logoPath: string;
  claimsPhone?: string;
  claimsUrl?: string;
  afterHoursInfo?: string;
  isDirectInsurer: boolean;
  /** True only when claims contact details are documented in project data. */
  verified: boolean;
};

const PAYMENT_LOGO_BY_NAME = new Map(
  paymentCarriers.map((carrier) => [carrier.name.toLowerCase(), carrier.logo]),
);

function resolveLogo(name: string, fallback?: string): string {
  const paymentLogo = PAYMENT_LOGO_BY_NAME.get(name.toLowerCase());
  if (paymentLogo) return paymentLogo;
  if (fallback) return fallback;
  return "/images/carriers/carrier-intact.jpg";
}

/**
 * Carrier claims directory.
 * Only entries with verified: true include direct claims contact details.
 * Unverified carriers render a Premium broker-assist fallback in the UI.
 */
export const carrierClaimsDirectory: CarrierClaimEntry[] = (() => {
  const seen = new Set<string>();
  const entries: CarrierClaimEntry[] = [];

  const add = (entry: CarrierClaimEntry) => {
    const key = entry.carrierName.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    entries.push(entry);
  };

  for (const carrier of homepageCarriers) {
    add({
      carrierName: carrier.name,
      logoPath: resolveLogo(carrier.name, carrier.src),
      isDirectInsurer: true,
      verified: false,
    });
  }

  for (const carrier of paymentCarriers) {
    add({
      carrierName: carrier.name,
      logoPath: carrier.logo,
      isDirectInsurer: true,
      verified: false,
    });
  }

  return entries;
})();

export const verifiedCarrierClaims = carrierClaimsDirectory.filter(
  (entry) => entry.verified,
);

export const FALLBACK_CLAIMS_MESSAGE =
  "Contact Premium and we'll help connect you with the appropriate claims contact.";

export const BROKER_CLAIMS_PHONE = "226-782-6000";
export const BROKER_CLAIMS_PHONE_HREF = "tel:+12267826000";

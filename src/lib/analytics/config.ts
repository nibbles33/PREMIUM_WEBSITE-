/** Public analytics identifiers — not secrets. */

export const DEFAULT_GTM_ID = "GTM-P54WZ855";
export const DEFAULT_GA4_ID = "G-9HQNJZM5FW";
export const DEFAULT_CLARITY_ID = "yq7xu77cle";

export function getGtmId(): string {
  return process.env.NEXT_PUBLIC_GTM_ID?.trim() || DEFAULT_GTM_ID;
}

export function getGa4Id(): string {
  return process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || DEFAULT_GA4_ID;
}

export function getClarityId(): string {
  return process.env.NEXT_PUBLIC_CLARITY_ID?.trim() || DEFAULT_CLARITY_ID;
}

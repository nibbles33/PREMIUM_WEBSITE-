/**
 * Abuse limits for the homepage Places request.
 * Stores request timestamps only. Review text is never kept here.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;
const MAX_BUCKETS = 2_000;

const buckets = new Map<string, number[]>();

export function resetPlaceRatingSlots(): void {
  buckets.clear();
}

export function takePlaceRatingSlot(ip: string, now = Date.now()): boolean {
  const hits = (buckets.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (hits.length >= MAX_REQUESTS) {
    buckets.set(ip, hits);
    return false;
  }
  hits.push(now);
  buckets.set(ip, hits);
  if (buckets.size > MAX_BUCKETS) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }
  return true;
}

/** Browser fetches from this site send this value. Cross-site calls do not. */
export function isSameOriginPlaceRatingRequest(headers: Headers): boolean {
  return headers.get("sec-fetch-site") === "same-origin";
}

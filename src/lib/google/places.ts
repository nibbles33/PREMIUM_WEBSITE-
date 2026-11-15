/**
 * Server-side Google Places (New) fetch for homepage social proof.
 * Credentials stay on the server — never ship unrestricted keys to the browser.
 *
 * The six-hour revalidate is unchanged. Places API terms allow storing a Place
 * ID indefinitely and latitude/longitude for 30 days. They do not grant a
 * shorter cache window for review text, so the interval is not used as a
 * compliance fix. Failed refreshes are not written over the last good payload.
 */

import { unstable_cache } from "next/cache";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";
import {
  parseGooglePlaceDetails,
  shouldUsePlacesFallback,
  type GooglePlaceRatingLive,
  type GooglePlaceRatingResult,
} from "@/lib/google/place-reviews";

export type {
  GooglePlaceRatingLive,
  GooglePlaceRatingResult,
  GooglePlaceRatingUnavailable,
  GooglePlaceReview,
} from "@/lib/google/place-reviews";

const PLACE_ID = HOMEPAGE_AUTHORITY.google.placeId;
/** rating + count always; reviews only when API returns authentic text */
const FIELD_MASK = "rating,userRatingCount,reviews";
/** Matches the existing homepage revalidation interval. */
const REVALIDATE_SECONDS = 60 * 60 * 6;

class PlacesRefreshError extends Error {
  constructor() {
    super("Google Places refresh failed");
    this.name = "PlacesRefreshError";
  }
}

async function loadGooglePlaceDetails(): Promise<GooglePlaceRatingLive> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) {
    throw new PlacesRefreshError();
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("[google-places] Place Details request failed", {
      status: response.status,
      placeId: PLACE_ID,
    });
    throw new PlacesRefreshError();
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    console.error("[google-places] Place Details response was not JSON", {
      placeId: PLACE_ID,
    });
    throw new PlacesRefreshError();
  }

  const parsed = parseGooglePlaceDetails(data);
  if (parsed.status !== "live") {
    console.error("[google-places] Invalid rating payload", {
      placeId: PLACE_ID,
    });
    throw new PlacesRefreshError();
  }

  return {
    status: "live",
    rating: parsed.rating,
    reviewCount: parsed.reviewCount,
    reviews: parsed.reviews,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Successful payloads are reused for six hours. A thrown refresh keeps the
 * previous successful payload instead of caching an empty result.
 */
const loadGooglePlaceDetailsCached = unstable_cache(
  loadGooglePlaceDetails,
  ["google-place-details", PLACE_ID],
  { revalidate: REVALIDATE_SECONDS, tags: ["google-place-rating"] },
);

/**
 * Fetch live Place rating, review count, and optional review excerpts.
 * Missing key and first-time failures return the non-numeric fallback.
 * A production refresh failure throws so the last good prerender stays up.
 */
export async function fetchGooglePlaceRating(): Promise<GooglePlaceRatingResult> {
  if (!process.env.GOOGLE_PLACES_API_KEY?.trim()) {
    return { status: "unavailable", reason: "missing_key" };
  }

  try {
    return await loadGooglePlaceDetailsCached();
  } catch (err) {
    console.error(
      "[google-places] Fetch failed",
      err instanceof Error ? err.name : "Error",
    );
    if (
      shouldUsePlacesFallback({
        NEXT_PHASE: process.env.NEXT_PHASE,
        NODE_ENV: process.env.NODE_ENV,
      })
    ) {
      return { status: "unavailable", reason: "request_failed" };
    }
    throw new PlacesRefreshError();
  }
}

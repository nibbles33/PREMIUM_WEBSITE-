/**
 * Server-side Google Places (New) rating fetch for homepage social proof.
 * Credentials stay on the server — never ship unrestricted keys to the browser.
 */

import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";

export type GooglePlaceRatingLive = {
  status: "live";
  rating: number;
  reviewCount: number;
  fetchedAt: string;
};

export type GooglePlaceRatingUnavailable = {
  status: "unavailable";
  reason: "missing_key" | "request_failed" | "invalid_payload";
};

export type GooglePlaceRatingResult =
  | GooglePlaceRatingLive
  | GooglePlaceRatingUnavailable;

const PLACE_ID = HOMEPAGE_AUTHORITY.google.placeId;
const FIELD_MASK = "rating,userRatingCount";

/**
 * Fetch live Place rating + review count.
 * Cached via Next.js fetch revalidation (6 hours).
 */
export async function fetchGooglePlaceRating(): Promise<GooglePlaceRatingResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) {
    return { status: "unavailable", reason: "missing_key" };
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: 60 * 60 * 6, tags: ["google-place-rating"] },
    });

    if (!response.ok) {
      console.error("[google-places] Place Details request failed", {
        status: response.status,
        placeId: PLACE_ID,
      });
      return { status: "unavailable", reason: "request_failed" };
    }

    const data = (await response.json()) as {
      rating?: number;
      userRatingCount?: number;
    };

    const rating = data.rating;
    const reviewCount = data.userRatingCount;

    if (
      typeof rating !== "number" ||
      !Number.isFinite(rating) ||
      rating <= 0 ||
      typeof reviewCount !== "number" ||
      !Number.isFinite(reviewCount) ||
      reviewCount <= 0
    ) {
      console.error("[google-places] Invalid rating payload", {
        rating,
        reviewCount,
      });
      return { status: "unavailable", reason: "invalid_payload" };
    }

    return {
      status: "live",
      rating,
      reviewCount,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[google-places] Fetch threw", err);
    return { status: "unavailable", reason: "request_failed" };
  }
}

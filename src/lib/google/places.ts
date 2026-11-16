/**
 * Server-side Google Places (New) fetch for homepage social proof.
 * The API key stays on the server and is never sent to the browser.
 *
 * Places terms do not permit a second stored copy of review content.
 * The homepage segment prerender (six hours) is the only stored copy.
 * This request uses Node's HTTP client so Next does not also write the
 * JSON body into the Data Cache. A failed production refresh throws so
 * that prerender stays in place.
 */

import https from "node:https";
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

class PlacesRefreshError extends Error {
  constructor() {
    super("Google Places refresh failed");
    this.name = "PlacesRefreshError";
  }
}

function requestPlaceDetails(
  url: string,
  apiKey: string,
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode ?? 0,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    req.setTimeout(15_000, () => {
      req.destroy(new Error("timeout"));
    });
    req.on("error", reject);
  });
}

async function loadGooglePlaceDetails(
  apiKey: string,
): Promise<GooglePlaceRatingLive> {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`;
  const response = await requestPlaceDetails(url, apiKey);

  if (response.status !== 200) {
    console.error("[google-places] Place Details request failed", {
      status: response.status,
      placeId: PLACE_ID,
    });
    throw new PlacesRefreshError();
  }

  let data: unknown;
  try {
    data = JSON.parse(response.body);
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
 * Missing key and a failed first build return the non-numeric fallback.
 * A production refresh failure throws so the last prerender stays up.
 */
export async function fetchGooglePlaceRating(): Promise<GooglePlaceRatingResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) {
    return { status: "unavailable", reason: "missing_key" };
  }

  try {
    return await loadGooglePlaceDetails(apiKey);
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

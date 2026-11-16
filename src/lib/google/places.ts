/**
 * Server-side Google Places (New) request for homepage social proof.
 * The API key stays on the server and is never sent to the browser.
 *
 * Places terms do not permit storing review content. This request is made
 * when a visitor loads the homepage and the result is not written to a
 * cache, database, or log. A failure returns the no-number fallback.
 */

import https from "node:https";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";
import {
  parseGooglePlaceDetails,
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
/** rating + count, plus reviews when the API returns them. */
const FIELD_MASK = "rating,userRatingCount,reviews";
const REQUEST_TIMEOUT_MS = 8_000;
const MAX_RESPONSE_CHARS = 200_000;

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
    let settled = false;
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };
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
        let size = 0;
        res.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > MAX_RESPONSE_CHARS) {
            req.destroy(new Error("response_too_large"));
            return;
          }
          chunks.push(chunk);
        });
        res.on("end", () => {
          if (settled) return;
          settled = true;
          resolve({
            status: res.statusCode ?? 0,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(new Error("timeout"));
    });
    req.on("error", fail);
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
  };
}

/**
 * Missing key and any failed request return the non-numeric fallback.
 * The payload is not retained after this function returns.
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
    return { status: "unavailable", reason: "request_failed" };
  }
}

import { NextResponse } from "next/server";
import {
  isSameOriginPlaceRatingRequest,
  takePlaceRatingSlot,
} from "@/lib/google/place-rating-guard";
import {
  fetchGooglePlaceRating,
  type GooglePlaceRatingResult,
} from "@/lib/google/places";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

/**
 * One in-flight Places call is shared only until it finishes.
 * The promise is cleared immediately after, so the review payload is not kept.
 */
let inflight: Promise<GooglePlaceRatingResult> | null = null;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function noStore(body: GooglePlaceRatingResult, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE_HEADERS });
}

function loadPlaceRating(): Promise<GooglePlaceRatingResult> {
  if (!inflight) {
    const pending = fetchGooglePlaceRating().finally(() => {
      if (inflight === pending) inflight = null;
    });
    inflight = pending;
  }
  return inflight;
}

export async function GET(request: Request) {
  if (!isSameOriginPlaceRatingRequest(request.headers)) {
    return noStore({ status: "unavailable", reason: "request_failed" }, 403);
  }

  if (!takePlaceRatingSlot(clientIp(request))) {
    console.error("[google-places] Request limit reached");
    return noStore({ status: "unavailable", reason: "request_failed" }, 429);
  }

  const rating = await loadPlaceRating();
  return noStore(rating);
}

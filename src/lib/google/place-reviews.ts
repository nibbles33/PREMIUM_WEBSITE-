/**
 * Pure parser for a Places API (New) Place Details payload.
 * Keeps review text as returned and drops attribution URLs that are not HTTPS Google hosts.
 */

export type GooglePlaceReview = {
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
  rating: number;
  text: string;
  relativeTime?: string;
  googleMapsUri?: string;
  flagContentUri?: string;
};

export type GooglePlaceRatingLive = {
  status: "live";
  rating: number;
  reviewCount: number;
  reviews: GooglePlaceReview[];
  fetchedAt: string;
};

export type GooglePlaceRatingUnavailable = {
  status: "unavailable";
  reason: "missing_key" | "request_failed" | "invalid_payload";
};

export type GooglePlaceRatingResult =
  | GooglePlaceRatingLive
  | GooglePlaceRatingUnavailable;

export type ParsedPlaceDetails =
  | {
      status: "live";
      rating: number;
      reviewCount: number;
      reviews: GooglePlaceReview[];
    }
  | { status: "unavailable"; reason: "invalid_payload" };

const REVIEW_LIMIT = 3;

function isGoogleHttpsHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return (
    host === "google.com" ||
    host.endsWith(".google.com") ||
    host === "googleusercontent.com" ||
    host.endsWith(".googleusercontent.com") ||
    host === "gstatic.com" ||
    host.endsWith(".gstatic.com")
  );
}

/** Accept only https URLs on Google-owned hosts. Rejects credentials and other origins. */
export function httpsGoogleUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length === 0 || value.length > 2048) {
    return undefined;
  }
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  if (url.protocol !== "https:") return undefined;
  if (url.username || url.password) return undefined;
  if (!isGoogleHttpsHost(url.hostname)) return undefined;
  return url.toString();
}

function optionalExactString(value: unknown): string | undefined {
  if (typeof value !== "string" || value.trim().length === 0) return undefined;
  return value;
}

function readReview(raw: unknown): GooglePlaceReview | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const review = raw as {
    rating?: unknown;
    text?: { text?: unknown };
    authorAttribution?: {
      displayName?: unknown;
      uri?: unknown;
      photoUri?: unknown;
    };
    relativePublishTimeDescription?: unknown;
    googleMapsUri?: unknown;
    flagContentUri?: unknown;
  };

  const text = review.text?.text;
  if (typeof text !== "string" || text.trim().length === 0) return undefined;

  const rating = review.rating;
  if (typeof rating !== "number" || !Number.isFinite(rating) || rating <= 0) {
    return undefined;
  }

  const author = review.authorAttribution;
  const authorName =
    typeof author?.displayName === "string" ? author.displayName.trim() : "";

  return {
    authorName,
    authorUri: httpsGoogleUrl(author?.uri),
    authorPhotoUri: httpsGoogleUrl(author?.photoUri),
    rating,
    text,
    relativeTime: optionalExactString(review.relativePublishTimeDescription),
    googleMapsUri: httpsGoogleUrl(review.googleMapsUri),
    flagContentUri: httpsGoogleUrl(review.flagContentUri),
  };
}

/**
 * Map a Place Details JSON body to rating, count, and at most three reviews.
 * Review text is copied unchanged. Order is the order Google returned.
 */
export function parseGooglePlaceDetails(data: unknown): ParsedPlaceDetails {
  if (!data || typeof data !== "object") {
    return { status: "unavailable", reason: "invalid_payload" };
  }

  const body = data as {
    rating?: unknown;
    userRatingCount?: unknown;
    reviews?: unknown;
  };
  const rating = body.rating;
  const reviewCount = body.userRatingCount;

  if (
    typeof rating !== "number" ||
    !Number.isFinite(rating) ||
    rating <= 0 ||
    typeof reviewCount !== "number" ||
    !Number.isFinite(reviewCount) ||
    reviewCount <= 0
  ) {
    return { status: "unavailable", reason: "invalid_payload" };
  }

  const reviews: GooglePlaceReview[] = [];
  if (Array.isArray(body.reviews)) {
    for (const raw of body.reviews) {
      const review = readReview(raw);
      if (!review) continue;
      reviews.push(review);
      if (reviews.length >= REVIEW_LIMIT) break;
    }
  }

  return { status: "live", rating, reviewCount, reviews };
}

/**
 * A production refresh must throw so ISR can keep the last good prerender.
 * The production build and local dev have no prior page to preserve, so they
 * use the no-number fallback and the build can finish while Places is down.
 */
export function shouldUsePlacesFallback(env: {
  NEXT_PHASE?: string;
  NODE_ENV?: string;
}): boolean {
  return (
    env.NEXT_PHASE === "phase-production-build" || env.NODE_ENV !== "production"
  );
}

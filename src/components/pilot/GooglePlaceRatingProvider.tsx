"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  httpsGoogleUrl,
  type GooglePlaceRatingResult,
  type GooglePlaceReview,
} from "@/lib/google/place-reviews";

const FALLBACK: GooglePlaceRatingResult = {
  status: "unavailable",
  reason: "request_failed",
};

const GooglePlaceRatingContext =
  createContext<GooglePlaceRatingResult>(FALLBACK);

function readReview(value: unknown): GooglePlaceReview | null {
  if (!value || typeof value !== "object") return null;
  const review = value as Record<string, unknown>;
  if (typeof review.text !== "string" || review.text.trim().length === 0) {
    return null;
  }
  if (typeof review.rating !== "number" || review.rating <= 0) return null;
  if (typeof review.authorName !== "string") return null;
  return {
    authorName: review.authorName,
    rating: review.rating,
    text: review.text,
    authorUri: httpsGoogleUrl(review.authorUri),
    authorPhotoUri: httpsGoogleUrl(review.authorPhotoUri),
    relativeTime:
      typeof review.relativeTime === "string" ? review.relativeTime : undefined,
    googleMapsUri: httpsGoogleUrl(review.googleMapsUri),
    flagContentUri: httpsGoogleUrl(review.flagContentUri),
  };
}

function readLiveRating(value: unknown): GooglePlaceRatingResult | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  if (body.status !== "live") return null;
  if (typeof body.rating !== "number" || !Number.isFinite(body.rating)) {
    return null;
  }
  if (
    typeof body.reviewCount !== "number" ||
    !Number.isFinite(body.reviewCount) ||
    body.reviewCount <= 0
  ) {
    return null;
  }
  if (!Array.isArray(body.reviews)) return null;
  const reviews = body.reviews
    .slice(0, 3)
    .map(readReview)
    .filter((review): review is GooglePlaceReview => review !== null);
  return {
    status: "live",
    rating: body.rating,
    reviewCount: body.reviewCount,
    reviews,
  };
}

export function GooglePlaceRatingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [result, setResult] = useState<GooglePlaceRatingResult>(FALLBACK);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 12_000);
    let active = true;

    fetch("/api/google-place-rating/", {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json() as Promise<unknown>;
      })
      .then((body) => {
        if (!active) return;
        const live = readLiveRating(body);
        if (live) setResult(live);
      })
      .catch(() => {
        // Keep the fallback already rendered in the static page.
      })
      .finally(() => {
        window.clearTimeout(timer);
      });

    return () => {
      active = false;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return (
    <GooglePlaceRatingContext.Provider value={result}>
      {children}
    </GooglePlaceRatingContext.Provider>
  );
}

export function useGooglePlaceRating(): GooglePlaceRatingResult {
  return useContext(GooglePlaceRatingContext);
}

import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";
import type { GooglePlaceRatingResult } from "@/lib/google/places";

function Stars({ rating, size = "md" }: { rating: number; size?: "md" | "lg" }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4 && rating - full < 0.9;
  const dim = size === "lg" ? "h-7 w-7" : "h-5 w-5";
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < full || (i === full && hasHalf);
        return (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`${dim} ${filled ? "text-[#E2A800]" : "text-white/25"}`}
            fill="currentColor"
          >
            <path d="M10 1.5l2.35 5.1 5.55.7-4.1 3.85 1.1 5.45L10 14.7l-4.9 2.9 1.1-5.45-4.1-3.85 5.55-.7L10 1.5z" />
          </svg>
        );
      })}
    </span>
  );
}

type Props = {
  ratingResult: GooglePlaceRatingResult;
};

/**
 * Concept F Revision 2 — major Google social-proof section.
 * Large editorial composition. Never fabricates review text or live ratings.
 */
export default function PilotGoogleReviews({ ratingResult }: Props) {
  const { google } = HOMEPAGE_AUTHORITY;
  const isLive = ratingResult.status === "live";
  const reviews = isLive ? ratingResult.reviews : [];

  return (
    <section
      className="border-t border-border bg-charcoal py-16 sm:py-20 lg:py-[5.5rem]"
      aria-labelledby="pilot-google-reviews-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="grid min-h-[450px] items-stretch gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:min-h-[500px]">
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                Google reviews
              </p>
              <h2
                id="pilot-google-reviews-heading"
                className="mt-4 max-w-lg text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                What our clients say about Premium.
              </h2>

              {isLive ? (
                <div className="mt-8">
                  <p className="text-[4rem] font-medium leading-none tracking-[-0.04em] text-white sm:text-[4.5rem]">
                    {ratingResult.rating.toFixed(1)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Stars rating={ratingResult.rating} size="lg" />
                    <p className="text-[15px] text-white/65">
                      {ratingResult.reviewCount.toLocaleString("en-CA")} Google
                      reviews
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-8 max-w-md rounded-[14px] border border-dashed border-white/20 bg-white/[0.04] px-5 py-4">
                  <p className="text-[14px] leading-relaxed text-white/70">
                    Live Google rating and review count appear here once Places
                    API credentials are configured server-side. Until then, open
                    our Google Business Profile — we never present fallback
                    figures as live data.
                  </p>
                </div>
              )}

              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/55">
                Reviews for {google.businessName}. Ratings provided by Google.
              </p>

              <div className="mt-8">
                <Link
                  href={google.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[14px] font-medium text-charcoal transition-colors hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Read all Google reviews
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <article
                    key={`${review.authorName}-${index}`}
                    className="rounded-[16px] border border-white/10 bg-white/[0.05] px-5 py-5 backdrop-blur-sm sm:px-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[14px] font-medium text-white">
                        {review.authorName}
                      </p>
                      <Stars rating={review.rating} />
                    </div>
                    {review.relativeTime ? (
                      <p className="mt-1 text-[12px] text-white/45">
                        {review.relativeTime}
                      </p>
                    ) : null}
                    <p className="mt-3 text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                      “{review.text}”
                    </p>
                  </article>
                ))
              ) : (
                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-6 py-8 sm:px-8 sm:py-10">
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gold">
                    Google Business Profile
                  </p>
                  <p className="mt-4 text-[1.35rem] font-medium tracking-[-0.02em] text-white sm:text-[1.55rem]">
                    {google.businessName}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/60">
                    {google.address}
                  </p>
                  <p className="mt-8 max-w-md text-[14px] leading-relaxed text-white/55">
                    Authentic Google review excerpts appear here when available
                    from Places API. Premium does not invent testimonials.
                  </p>
                  <Link
                    href={google.shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex text-[14px] font-medium text-gold underline-offset-4 hover:underline"
                  >
                    Open Google profile →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

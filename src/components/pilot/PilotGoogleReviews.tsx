import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";
import type { GooglePlaceRatingResult } from "@/lib/google/places";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4 && rating - full < 0.9;
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < full || (i === full && hasHalf);
        return (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-5 w-5 ${filled ? "text-[#F6BB00]" : "text-border"}`}
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
 * Live Google social proof. Numbers render only when Places API returns live data.
 * Failures never invent 0 reviews or break the homepage.
 */
export default function PilotGoogleReviews({ ratingResult }: Props) {
  const { google } = HOMEPAGE_AUTHORITY;
  const isLive = ratingResult.status === "live";

  return (
    <section
      className="border-t border-border bg-[#F7F1E4] py-12 sm:py-14 lg:py-16"
      aria-labelledby="pilot-google-reviews-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="grid items-center gap-8 rounded-[18px] border border-border/80 bg-white px-5 py-7 shadow-[0_10px_30px_rgba(32,39,40,0.05)] sm:px-8 sm:py-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold-dark">
                Google reviews
              </p>
              <h2
                id="pilot-google-reviews-heading"
                className="mt-2 text-[1.55rem] font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                What clients say about working with Premium.
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-secondary sm:text-[15px]">
                Real reviews from Google for Premium Insurance Brokers — a
                division of Oracle RMS — at our Windsor office.
              </p>

              {isLive ? (
                <div className="mt-6 flex min-h-[72px] flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-[2.35rem] font-medium leading-none tracking-[-0.03em] text-charcoal">
                    {ratingResult.rating.toFixed(1)}
                  </p>
                  <div>
                    <Stars rating={ratingResult.rating} />
                    <p className="mt-1 text-[13px] text-secondary">
                      Based on {ratingResult.reviewCount.toLocaleString("en-CA")}{" "}
                      Google reviews
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 min-h-[72px] rounded-lg border border-dashed border-border bg-offwhite/80 px-4 py-3">
                  <p className="text-[13px] leading-relaxed text-secondary">
                    Live Google rating and review count appear here once Places
                    API credentials are configured server-side. Until then, open
                    our Google Business Profile to read current reviews — we do
                    not display fallback star counts as live data.
                  </p>
                </div>
              )}

              <div className="mt-6">
                <Link
                  href={google.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-charcoal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Read Our Google Reviews
                </Link>
              </div>
            </div>

            <div className="rounded-[14px] border border-border bg-offwhite px-5 py-5 sm:px-6">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-secondary">
                Google Business Profile
              </p>
              <p className="mt-2 text-[15px] font-medium leading-snug text-charcoal">
                {google.businessName}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-secondary">
                {google.address}
              </p>
              <p className="mt-4 text-[11px] leading-relaxed text-secondary/90">
                Reviews and ratings are provided by Google. Premium does not
                edit or invent review content.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

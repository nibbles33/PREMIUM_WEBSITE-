import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";

/**
 * Homepage invitation to the verified Google Business Profile.
 * No rating, count, or review text is rendered here. Those live on Google.
 */
export default function PilotGoogleReviews() {
  const { google } = HOMEPAGE_AUTHORITY;

  return (
    <section
      className="border-t border-border bg-charcoal py-10 sm:py-12 lg:py-14"
      aria-labelledby="pilot-google-reviews-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                Google reviews
              </p>
              <h2
                id="pilot-google-reviews-heading"
                className="mt-3 max-w-xl text-[2rem] font-medium tracking-[-0.035em] text-white sm:text-[2.45rem] lg:text-[2.75rem]"
              >
                Read what clients say on Google.
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-base">
                Reviews for {google.businessName} are published on our Google
                Business Profile. Open it to read them in Google’s own words.
              </p>
              <div className="mt-6">
                <Link
                  href={google.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-6 py-3 text-[14px] font-medium text-charcoal transition-colors hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Read our Google reviews
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-6 py-6 sm:px-7 sm:py-7">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gold">
                Google Business Profile
              </p>
              <p className="mt-3 text-[1.25rem] font-medium tracking-[-0.02em] text-white sm:text-[1.4rem]">
                {google.businessName}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                {google.address}
              </p>
              <Link
                href={google.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center text-[14px] font-medium text-gold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Open Google profile →
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

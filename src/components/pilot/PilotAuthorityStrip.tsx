import Link from "next/link";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";
import type { GooglePlaceRatingResult } from "@/lib/google/places";

type Props = {
  googleRating: GooglePlaceRatingResult;
};

/**
 * Editorial authority band under the hero.
 * Continuous proof strip — Google live proof replaces the oversized Oracle cell.
 * Oracle RMS remains in hero / Windsor story / company identity.
 */
export default function PilotAuthorityStrip({ googleRating }: Props) {
  const { clients, combinedExperience, awards, google } = HOMEPAGE_AUTHORITY;
  const isLive = googleRating.status === "live";

  return (
    <section
      className="pilot-authority-strip border-b border-border bg-[#F7F1E4]"
      aria-label="Premium Insurance Brokers at a glance"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          <li className="flex min-h-[118px] flex-col justify-center px-3 py-5 sm:min-h-[136px] sm:px-5 sm:py-7 lg:min-h-[148px] lg:px-7">
            <p className="text-[1.95rem] font-medium leading-none tracking-[-0.03em] text-charcoal sm:text-[2.25rem] lg:text-[2.5rem]">
              {clients.value}
            </p>
            <p className="mt-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-secondary sm:text-[13px]">
              {clients.label}
            </p>
          </li>

          <li className="flex min-h-[118px] flex-col justify-center border-l border-border/70 px-3 py-5 sm:min-h-[136px] sm:px-5 sm:py-7 lg:min-h-[148px] lg:px-7">
            <p className="text-[1.95rem] font-medium leading-none tracking-[-0.03em] text-charcoal sm:text-[2.25rem] lg:text-[2.5rem]">
              {combinedExperience.value}
            </p>
            <p className="mt-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-secondary sm:text-[13px]">
              Years combined experience
            </p>
          </li>

          <li className="flex min-h-[118px] flex-col justify-center border-t border-border/70 px-3 py-5 sm:min-h-[136px] sm:px-5 sm:py-7 lg:min-h-[148px] lg:border-l lg:border-t-0 lg:px-7">
            <p className="text-[1.95rem] font-medium leading-none tracking-[-0.03em] text-charcoal sm:text-[2.25rem] lg:text-[2.5rem]">
              {awards.value}
            </p>
            <p className="mt-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-secondary sm:text-[13px]">
              Awards &amp; recognition
            </p>
          </li>

          <li className="flex min-h-[118px] flex-col justify-center border-l border-t border-border/70 px-3 py-5 sm:min-h-[136px] sm:px-5 sm:py-7 lg:min-h-[148px] lg:border-t-0 lg:px-7">
            {isLive ? (
              <>
                <p className="flex items-baseline gap-2 text-[1.95rem] font-medium leading-none tracking-[-0.03em] text-charcoal sm:text-[2.25rem] lg:text-[2.5rem]">
                  <span>{googleRating.rating.toFixed(1)}</span>
                  <span className="text-[1.1rem] text-[#E2A800] sm:text-[1.25rem]" aria-hidden>
                    ★
                  </span>
                </p>
                <p className="mt-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-secondary sm:text-[13px]">
                  {googleRating.reviewCount.toLocaleString("en-CA")} Google
                  reviews
                </p>
              </>
            ) : (
              <>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold-dark sm:text-[12px]">
                  Google
                </p>
                <p className="mt-1.5 text-[1.15rem] font-medium tracking-[-0.02em] text-charcoal sm:text-[1.3rem]">
                  Client reviews
                </p>
                <Link
                  href={google.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[12px] font-medium text-gold-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Read on Google →
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
}

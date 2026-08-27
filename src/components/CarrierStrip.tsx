import Link from "next/link";
import PartnerLogoCard from "@/components/PartnerLogoCard";
import { homepageCarriers } from "@/data/partners";

function CarrierMarqueeRow({
  focusable,
  ariaHidden,
}: {
  focusable: boolean;
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="carrier-marquee-segment flex shrink-0 list-none items-center gap-4 sm:gap-5"
      aria-hidden={ariaHidden || undefined}
    >
      {homepageCarriers.map((carrier) => (
        <li key={`${ariaHidden ? "dup" : "a"}-${carrier.name}`}>
          <PartnerLogoCard
            partner={carrier}
            size="marquee"
            href="/partners/"
            tabIndex={focusable ? 0 : -1}
          />
        </li>
      ))}
    </ul>
  );
}

export default function CarrierStrip() {
  return (
    <section
      className="border-t border-border bg-offwhite pb-8 pt-10 sm:pb-10 sm:pt-12 lg:pb-11 lg:pt-14"
      aria-labelledby="carriers-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id="carriers-heading"
            className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
          >
            One broker. Multiple markets.
          </h2>
          <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-secondary sm:text-base">
            Access multiple markets through one independent broker — from major
            personal lines to specialty commercial programs.
          </p>
          <Link
            href="/partners/"
            className="group mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-gold-dark underline-offset-4 transition-colors hover:text-charcoal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-[15px]"
          >
            See all partners
            <span
              aria-hidden
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <div
        className="carrier-marquee mt-8 sm:mt-9"
        aria-label="Insurance carrier partners"
      >
        <div className="carrier-marquee-track gap-4 sm:gap-5">
          <CarrierMarqueeRow focusable />
          <CarrierMarqueeRow focusable={false} ariaHidden />
        </div>
      </div>

      <ul className="carrier-static-grid mx-auto mt-8 grid max-w-6xl list-none grid-cols-2 gap-4 px-4 sm:mt-9 sm:grid-cols-3 sm:gap-5 sm:px-6 md:grid-cols-4 lg:grid-cols-6 lg:px-8 xl:max-w-7xl">
        {homepageCarriers.map((carrier) => (
          <li key={`static-${carrier.name}`}>
            <PartnerLogoCard
              partner={carrier}
              size="marquee"
              href="/partners/"
              className="w-full min-w-0"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

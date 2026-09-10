import Link from "next/link";
import PartnerLogoCard from "@/components/PartnerLogoCard";
import PilotInfiniteRail from "@/components/pilot/PilotInfiniteRail";
import { homepageCarriers } from "@/data/partners";
import { PILOT_RAIL_DURATIONS } from "@/data/pilot-rail-durations";

function MarqueeSegment({
  focusable,
  ariaHidden,
}: {
  focusable: boolean;
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 list-none items-center gap-5 sm:gap-6"
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

export default function PilotCarrierMarquee() {
  const { normal, reduced } = PILOT_RAIL_DURATIONS.carrier;

  return (
    <section
      className="border-y border-border bg-[#F0EBE0] py-6 sm:py-8"
      aria-labelledby="pilot-carriers-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="pilot-carriers-heading"
            className="text-xl font-medium tracking-[-0.02em] text-charcoal sm:text-2xl"
          >
            One broker. Multiple markets.
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-secondary sm:text-[15px]">
            Access major personal lines and specialty commercial programs through
            one independent Windsor-Essex broker.
          </p>
          <Link
            href="/partners/"
            className="group mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-gold-dark underline-offset-4 hover:text-charcoal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
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

      <div className="pilot-carrier-rail mt-7 sm:mt-8">
        <PilotInfiniteRail
          durationSeconds={normal}
          reducedDurationSeconds={reduced}
          ariaLabel="Insurance carrier partners"
          trackClassName="gap-5 sm:gap-6"
        >
          <MarqueeSegment focusable />
          <MarqueeSegment focusable={false} ariaHidden />
        </PilotInfiniteRail>
      </div>
    </section>
  );
}

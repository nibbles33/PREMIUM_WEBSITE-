import Link from "next/link";
import PartnerLogoCard from "@/components/PartnerLogoCard";
import { homepageCarriers } from "@/data/partners";

/** Static row of the homepage carrier marks. No count is stated. */
export default function QuoteCarrierStrip() {
  return (
    <section
      className="border-t border-border bg-[#F0EBE0] py-4 sm:py-5"
      aria-labelledby="quote-carriers-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="flex items-baseline justify-between gap-3">
          <h2
            id="quote-carriers-heading"
            className="text-[1.15rem] font-medium tracking-[-0.02em] text-charcoal sm:text-[1.3rem]"
          >
            More markets. More choice.
          </h2>
          <Link
            href="/partners/"
            className="shrink-0 text-[13px] font-medium text-gold-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            See all partners
          </Link>
        </div>
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {homepageCarriers.map((carrier) => (
            <li key={carrier.name} className="shrink-0">
              <PartnerLogoCard partner={carrier} size="marquee" href="/partners/" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

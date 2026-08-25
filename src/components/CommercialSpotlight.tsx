import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { commercialIndustryTiles } from "@/data/commercial-industries";

const COMMERCIAL_HREF = "/commercial-insurance/";

const spotlightTiles = commercialIndustryTiles.slice(0, 6);

const moreTile = {
  label: "+ 6 more industries",
  href: COMMERCIAL_HREF,
  icon: LayoutGrid,
  more: true as const,
};

function IndustryCard({
  tile,
}: {
  tile: (typeof spotlightTiles)[number] | typeof moreTile;
}) {
  const Icon = tile.icon;
  const more = "more" in tile && tile.more;

  return (
    <Link
      href={tile.href}
      className={`group flex h-full min-h-[132px] flex-col items-center justify-center gap-3 rounded-[14px] px-3 py-6 text-center transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out sm:min-h-[148px] sm:px-4 sm:py-7 ${
        more
          ? "border border-dashed border-white/25 bg-transparent hover:border-gold/60 hover:bg-white/[0.03]"
          : "border border-white/10 bg-[#2a3132] hover:-translate-y-1 hover:border-gold hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
      }`}
    >
      <span
        className={`inline-flex h-11 w-11 items-center justify-center rounded-md sm:h-12 sm:w-12 ${
          more
            ? "border border-dashed border-white/20 bg-white/[0.04]"
            : "hero-icon-tile-active border border-gold/35"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${more ? "text-white/45" : "text-gold"}`}
          strokeWidth={1.5}
          aria-hidden
        />
      </span>
      <span
        className={`text-[13px] font-medium leading-snug sm:text-sm ${
          more ? "text-white/50" : "text-white"
        }`}
      >
        {tile.label}
      </span>
    </Link>
  );
}

export default function CommercialSpotlight() {
  const topRow = spotlightTiles.slice(0, 4);
  const bottomRow = [...spotlightTiles.slice(4), moreTile];

  return (
    <section
      className="bg-charcoal py-16 sm:py-20 lg:py-24"
      aria-labelledby="commercial-spotlight-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="commercial-spotlight-heading"
              className="text-[1.75rem] font-medium tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl"
            >
              Commercial insurance, built for your industry
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65 sm:text-base">
              Windsor-Essex runs on manufacturing, trucking, and trades. We know
              the risks specific to your industry — not generic business
              insurance.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 sm:mt-12 lg:mt-14">
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {topRow.map((tile) => (
                <li key={tile.label}>
                  <IndustryCard tile={tile} />
                </li>
              ))}
            </ul>
            <ul className="mx-auto grid w-full grid-cols-2 gap-3 sm:gap-4 lg:w-3/4 lg:grid-cols-3 lg:gap-5">
              {bottomRow.map((tile) => (
                <li
                  key={tile.label}
                  className={"more" in tile && tile.more ? "col-span-2 sm:col-span-1" : undefined}
                >
                  <IndustryCard tile={tile} />
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={COMMERCIAL_HREF}
            className="btn-primary btn-primary-gradient group inline-flex h-[52px] min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:min-w-[260px] sm:px-10"
          >
            Explore Commercial Insurance
            <span
              aria-hidden
              className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
            >
              →
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { commercialIndustryTiles } from "@/data/commercial-industries";

export default function CommercialIndustryGrid() {
  return (
    <section
      className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="industries-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Industries we cover
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
              Dedicated pages for our most common commercial risks — plus a
              direct quote path for the rest.
            </p>
          </div>
        </RevealOnScroll>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {commercialIndustryTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <li key={tile.label}>
                <RevealOnScroll className="h-full">
                  <Link
                    href={tile.href}
                    className={`group flex h-full items-center gap-4 border px-4 py-4 transition-[border-color,background-color,box-shadow] duration-200 ease-out sm:px-5 sm:py-5 ${
                      tile.hasPage
                        ? "border-border bg-offwhite hover:border-gold hover:bg-white hover:shadow-[0_10px_28px_rgba(32,39,40,0.08)]"
                        : "border-dashed border-border bg-white hover:border-gold-dark/50"
                    }`}
                  >
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${
                        tile.hasPage
                          ? "bg-[color-mix(in_srgb,#5A8A73_14%,#FAFAF8)]"
                          : "border border-dashed border-border bg-offwhite"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          tile.hasPage ? "text-[#5A8A73]" : "text-secondary"
                        }`}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium text-charcoal">
                        {tile.label}
                      </span>
                      <span
                        className={`mt-0.5 block text-[12px] font-medium ${
                          tile.hasPage ? "text-gold-dark" : "text-secondary"
                        }`}
                      >
                        {tile.hasPage ? "Learn more →" : "Get a quote →"}
                      </span>
                    </span>
                  </Link>
                </RevealOnScroll>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

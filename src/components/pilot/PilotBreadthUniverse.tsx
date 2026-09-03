"use client";

import Image from "next/image";
import Link from "next/link";
import PilotInfiniteRail from "@/components/pilot/PilotInfiniteRail";
import RevealOnScroll from "@/components/RevealOnScroll";
import { PILOT_RAIL_DURATIONS } from "@/data/pilot-rail-durations";
import {
  getFilmstripPhoto,
  yepCarouselItems,
  type CoverageStreamItem,
} from "@/data/pilot-home";
import { PILOT_YEP_TILE_IMAGE } from "@/data/photography";

function YepMediaTile({ item }: { item: CoverageStreamItem }) {
  const photo = getFilmstripPhoto(item.photoSlug);
  return (
    <Link
      href={item.href}
      className="pilot-yep-tile group flex shrink-0 items-center gap-3.5 rounded-xl border border-white/15 bg-charcoal/85 py-2.5 pl-2.5 pr-5 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-200 hover:border-gold/50 hover:shadow-[0_10px_28px_rgba(208,173,38,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:gap-4 sm:py-3 sm:pl-3 sm:pr-6"
    >
      <span className="relative h-16 w-[5.5rem] shrink-0 overflow-hidden rounded-lg sm:h-[4.75rem] sm:w-24">
        {photo ? (
          <Image
            src={photo.src}
            alt=""
            fill
            sizes={PILOT_YEP_TILE_IMAGE.sizes}
            quality={PILOT_YEP_TILE_IMAGE.quality}
            loading="lazy"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        ) : null}
      </span>
      <span className="whitespace-nowrap text-[14px] font-medium tracking-tight text-white/92 group-hover:text-gold sm:text-[15px]">
        {item.label}
      </span>
    </Link>
  );
}

export default function PilotBreadthUniverse() {
  const doubled = [...yepCarouselItems, ...yepCarouselItems];
  const { normal, reduced } = PILOT_RAIL_DURATIONS.yep;

  return (
    <section
      className="pilot-section-yep relative overflow-hidden border-t border-charcoal bg-charcoal py-10 sm:py-12 lg:py-14"
      aria-labelledby="pilot-yep-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 25% 40%, rgba(208,173,38,0.1) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pilot-yep-heading"
              className="text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl"
            >
              Yep.
              <br />
              We insure that too.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65 sm:text-base">
              Your car. Your boat. Your business. Your daughter&apos;s wedding.
              Yep — there&apos;s a lot we can help protect.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="pilot-yep-rail mt-8">
        <PilotInfiniteRail
          durationSeconds={normal}
          reducedDurationSeconds={reduced}
          ariaLabel="Insurance products and industries we cover"
          trackClassName="gap-3 sm:gap-3.5"
        >
          {doubled.map((item, i) => (
            <YepMediaTile key={`${item.label}-${i}`} item={item} />
          ))}
        </PilotInfiniteRail>
      </RevealOnScroll>

      <RevealOnScroll className="relative mt-8 text-center">
        <Link
          href="/get-a-quote/"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-gold underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Not sure where to start? Get a quote
          <span aria-hidden>→</span>
        </Link>
      </RevealOnScroll>
    </section>
  );
}

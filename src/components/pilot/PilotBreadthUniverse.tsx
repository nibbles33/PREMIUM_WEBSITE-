"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  breadthLaneCommercial,
  breadthLanePersonal,
  breadthLaneSpecialty,
  getFilmstripPhoto,
  type CoverageStreamItem,
} from "@/data/pilot-home";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function StreamChip({ item }: { item: CoverageStreamItem }) {
  const photo = getFilmstripPhoto(item.photoSlug);
  return (
    <Link
      href={item.href}
      className="pilot-yep-chip group flex shrink-0 items-center gap-3 rounded-xl border border-white/15 bg-charcoal/80 py-2 pl-2 pr-4 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-200 hover:border-gold/45 hover:shadow-[0_8px_24px_rgba(208,173,38,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
        {photo ? (
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="44px"
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : null}
      </span>
      <span className="whitespace-nowrap text-[13px] font-medium text-white/90 group-hover:text-gold">
        {item.label}
      </span>
    </Link>
  );
}

function CoverageLane({
  items,
  direction,
  speed,
  ariaLabel,
}: {
  items: CoverageStreamItem[];
  direction: "left" | "right";
  speed: number;
  ariaLabel: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div
      className="pilot-yep-lane overflow-hidden"
      aria-label={ariaLabel}
      style={{ "--pilot-lane-speed": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={`pilot-yep-lane-track ${direction === "left" ? "is-left" : "is-right"} ${reduceMotion ? "is-static" : ""}`}
      >
        {doubled.map((item, i) => (
          <StreamChip key={`${item.label}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function PilotBreadthUniverse() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      className="pilot-section-yep relative overflow-hidden border-t border-charcoal bg-charcoal py-10 sm:py-12 lg:py-14"
      aria-labelledby="pilot-yep-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(208,173,38,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(208,173,38,0.08) 0%, transparent 40%)",
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

      {/* Desktop: three opposing lanes */}
      <RevealOnScroll className="mt-8 hidden space-y-3 md:block">
        <CoverageLane
          items={breadthLanePersonal}
          direction="right"
          speed={38}
          ariaLabel="Personal insurance coverage examples"
        />
        <CoverageLane
          items={breadthLaneCommercial}
          direction="left"
          speed={44}
          ariaLabel="Commercial insurance coverage examples"
        />
        <CoverageLane
          items={breadthLaneSpecialty}
          direction="right"
          speed={40}
          ariaLabel="Specialty insurance coverage examples"
        />
      </RevealOnScroll>

      {/* Mobile: two compact lanes */}
      <RevealOnScroll className="mt-7 space-y-3 md:hidden">
        <CoverageLane
          items={[...breadthLanePersonal.slice(0, 6), ...breadthLaneSpecialty.slice(0, 4)]}
          direction="right"
          speed={48}
          ariaLabel="Insurance coverage examples"
        />
        <CoverageLane
          items={[...breadthLaneCommercial.slice(0, 6), ...breadthLaneSpecialty.slice(4)]}
          direction="left"
          speed={52}
          ariaLabel="More insurance coverage examples"
        />
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

      {reduceMotion ? (
        <div className="sr-only">
          Static list of coverage categories available via lane links above.
        </div>
      ) : null}
    </section>
  );
}

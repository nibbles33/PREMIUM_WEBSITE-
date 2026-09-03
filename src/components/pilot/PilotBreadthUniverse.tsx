"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  getFilmstripPhoto,
  yepLaneCommercial,
  yepLanePersonal,
  type CoverageStreamItem,
} from "@/data/pilot-home";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function StreamChip({ item }: { item: CoverageStreamItem }) {
  const photo = getFilmstripPhoto(item.photoSlug);
  return (
    <Link
      href={item.href}
      className="pilot-yep-chip group flex shrink-0 items-center gap-3 rounded-xl border border-white/15 bg-charcoal/80 py-2 pl-2 pr-4 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-gold/45 hover:shadow-[0_8px_24px_rgba(208,173,38,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
        {photo ? (
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="44px"
            loading="lazy"
            className="object-cover"
          />
        ) : null}
      </span>
      <span className="whitespace-nowrap text-[13px] font-medium text-white/90 group-hover:text-gold">
        {item.label}
      </span>
    </Link>
  );
}

function AnimatedLane({
  items,
  direction,
  speedSeconds,
  ariaLabel,
}: {
  items: CoverageStreamItem[];
  direction: "left" | "right";
  speedSeconds: number;
  ariaLabel: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div
      className="pilot-yep-lane overflow-hidden"
      aria-label={ariaLabel}
      style={{ "--pilot-lane-speed": `${speedSeconds}s` } as React.CSSProperties}
    >
      <div
        className={`pilot-yep-lane-track pilot-yep-lane-moderate ${direction === "left" ? "is-left" : "is-right"} ${reduceMotion ? "is-static" : ""}`}
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

      {reduceMotion ? (
        <RevealOnScroll className="mt-8">
          <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 px-4">
            {[...yepLanePersonal, ...yepLaneCommercial].map((item) => (
              <li key={`static-${item.label}`}>
                <StreamChip item={item} />
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      ) : (
        <RevealOnScroll className="mt-8 space-y-3">
          {/* Lane 1 — personal/lifestyle: moderate continuous motion */}
          <AnimatedLane
            items={yepLanePersonal}
            direction="right"
            speedSeconds={88}
            ariaLabel="Personal and lifestyle insurance coverage"
          />

          {/* Lane 2 — business/commercial: static scroll (no continuous motion) */}
          <div
            className="pilot-yep-lane-static overflow-x-auto px-4 pb-1 scrollbar-none md:px-6"
            role="list"
            aria-label="Business and commercial insurance coverage"
          >
            <div className="flex w-max gap-3">
              {yepLaneCommercial.map((item) => (
                <div key={item.label} role="listitem">
                  <StreamChip item={item} />
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      )}

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

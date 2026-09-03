"use client";

import Image from "next/image";
import PilotInfiniteRail from "@/components/pilot/PilotInfiniteRail";
import RevealOnScroll from "@/components/RevealOnScroll";
import { PILOT_RAIL_DURATIONS } from "@/data/pilot-rail-durations";
import { pilotAwardBadges, type AwardBadge } from "@/data/pilot-home";

function AwardCard({ badge }: { badge: AwardBadge }) {
  return (
    <div className="pilot-award-card group flex shrink-0 items-center gap-4 rounded-2xl border border-border/80 bg-white px-5 py-4 shadow-[0_8px_24px_rgba(32,39,40,0.06)] transition-[border-color,box-shadow] duration-200 hover:border-gold/40 hover:shadow-[0_12px_32px_rgba(208,173,38,0.12)]">
      <span className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center sm:h-[100px] sm:w-[100px]">
        <Image
          src={badge.src}
          alt={badge.alt}
          width={100}
          height={100}
          className="h-full w-full object-contain opacity-95 transition-[filter,transform] duration-300 group-hover:scale-105 group-hover:grayscale-0 grayscale-[20%]"
        />
      </span>
      <div className="min-w-0 pr-2">
        <p className="text-[15px] font-medium leading-snug text-charcoal sm:text-base">
          {badge.label}
        </p>
        <p className="mt-0.5 text-[13px] font-medium text-gold-dark">
          {badge.year}
        </p>
        {badge.source ? (
          <p className="mt-1 text-[11px] leading-snug text-secondary">
            {badge.source}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function PilotLocalProof() {
  const doubled = [...pilotAwardBadges, ...pilotAwardBadges];
  const { normal, reduced } = PILOT_RAIL_DURATIONS.awards;

  return (
    <section
      className="pilot-section-awards relative overflow-hidden border-t border-border bg-[#FBF5E5] py-10 sm:py-12"
      aria-labelledby="pilot-local-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pilot-local-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Built here. Recognized here.
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-secondary sm:text-[15px]">
              Windsor-Essex since 2019 — community and industry recognition that
              speaks for itself.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="pilot-awards-rail mt-7 sm:mt-8">
        <PilotInfiniteRail
          durationSeconds={normal}
          reducedDurationSeconds={reduced}
          ariaLabel="Awards and recognition"
          trackClassName="gap-4 sm:gap-5"
        >
          {doubled.map((badge, i) => (
            <AwardCard key={`${badge.src}-${i}`} badge={badge} />
          ))}
        </PilotInfiniteRail>
      </div>

      <p className="mx-auto mt-6 max-w-xl px-4 text-center text-[13px] leading-relaxed text-secondary">
        Platinum Winner four years running (2021–2024) · Gold Winner 2026
      </p>
    </section>
  );
}

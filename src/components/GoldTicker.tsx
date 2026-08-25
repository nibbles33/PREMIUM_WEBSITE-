"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TICKER_COPY =
  "AUTO · HOME · COMMERCIAL · FARM · BUSINESS ★  AUTO · HOME · COMMERCIAL · FARM · BUSINESS ★  ";

export default function GoldTicker() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div
      className="gold-ticker overflow-hidden border-y border-charcoal/10"
      style={{
        background:
          "linear-gradient(90deg, #E4C558 0%, #D0AD26 45%, #B8940F 100%)",
      }}
      aria-hidden
    >
      <div
        className={`gold-ticker-track flex w-max whitespace-nowrap py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal sm:text-xs ${
          reduceMotion ? "" : "gold-ticker-animate"
        }`}
      >
        <span className="inline-block pr-2">{TICKER_COPY}</span>
        <span className="inline-block pr-2">{TICKER_COPY}</span>
      </div>
    </div>
  );
}

"use client";

const TICKER_SEGMENT = "AUTO · HOME · COMMERCIAL · FARM · BUSINESS ★\u00A0\u00A0";

export default function GoldTicker() {
  return (
    <div
      className="gold-ticker border-y border-charcoal/10"
      style={{
        background:
          "linear-gradient(90deg, #E4C558 0%, #D0AD26 45%, #B8940F 100%)",
      }}
      aria-hidden
    >
      <div className="gold-ticker-track py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal sm:text-xs">
        <span className="gold-ticker-segment">{TICKER_SEGMENT}</span>
        <span className="gold-ticker-segment">{TICKER_SEGMENT}</span>
      </div>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import PremiumGoldCTA from "@/components/pilot/PremiumGoldCTA";
import ProtectionArc from "@/components/pilot/ProtectionArc";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  AUTO_ACCENT,
  AUTO_QUOTE_HREF,
  autoCoverageItems,
  type AutoCoverageItem,
} from "@/data/pilot-auto";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function VehicleSchematic({
  activeZone,
  activeId,
}: {
  activeZone: AutoCoverageItem["zone"];
  activeId: string;
}) {
  const zoneClass = (zone: AutoCoverageItem["zone"]) =>
    activeZone === zone ? "is-active" : "";

  return (
    <div className="pilot-auto-schematic" aria-hidden>
      <svg viewBox="0 0 320 140" className="h-auto w-full max-w-[320px]">
        <defs>
          <linearGradient id="autoSchematicGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b8940f" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#d0ad26" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#e4c558" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <ellipse
          cx="160"
          cy="118"
          rx="118"
          ry="10"
          fill="rgba(32,39,40,0.06)"
        />
        <path
          className={`pilot-auto-zone pilot-auto-zone-full ${zoneClass("full")}`}
          d="M48 88 L72 52 L118 44 L208 44 L252 56 L276 88 L276 98 L48 98 Z"
        />
        <path
          className={`pilot-auto-zone pilot-auto-zone-body ${zoneClass("body")}`}
          d="M72 52 L118 44 L208 44 L252 56 L252 88 L72 88 Z"
        />
        <path
          className={`pilot-auto-zone pilot-auto-zone-front ${zoneClass("front")}`}
          d="M208 44 L252 56 L252 88 L208 88 L190 72 L190 58 Z"
        />
        <rect
          className={`pilot-auto-zone pilot-auto-zone-cabin ${zoneClass("cabin")}`}
          x="118"
          y="52"
          width="72"
          height="36"
          rx="6"
        />
        <path
          className={`pilot-auto-zone pilot-auto-zone-sides ${zoneClass("sides")}`}
          d="M48 88 L72 88 L72 98 L48 98 Z M252 88 L276 88 L276 98 L252 98 Z"
        />
        <circle
          className={`pilot-auto-zone pilot-auto-zone-wheels ${zoneClass("wheels")}`}
          cx="98"
          cy="98"
          r="16"
        />
        <circle
          className={`pilot-auto-zone pilot-auto-zone-wheels ${zoneClass("wheels")}`}
          cx="228"
          cy="98"
          r="16"
        />
        <path
          className="pilot-auto-zone-outline"
          d="M48 88 L72 52 L118 44 L208 44 L252 56 L276 88 L276 98 L48 98 Z"
          fill="none"
          stroke="rgba(32,39,40,0.18)"
          strokeWidth="2"
        />
      </svg>
      <p className="sr-only">Coverage highlight: {activeId}</p>
    </div>
  );
}

export default function AutoCoverageExplorer() {
  const baseId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(autoCoverageItems[0].id);
  const active =
    autoCoverageItems.find((item) => item.id === activeId) ?? autoCoverageItems[0];
  const ActiveIcon = active.icon;

  return (
    <section
      className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id={`${baseId}-heading`}
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              What does auto insurance actually protect?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              Ontario coverage building blocks — explore each one visually.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:items-start">
          <RevealOnScroll>
            <div className="pilot-auto-explorer-stage relative mx-auto max-w-md rounded-2xl border border-border/80 bg-white p-6 shadow-[0_16px_40px_rgba(32,39,40,0.07)] sm:p-8">
              <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2">
                <ProtectionArc
                  active
                  breathe={!reduceMotion}
                  className="pilot-auto-explorer-arc"
                />
              </div>
              <VehicleSchematic activeZone={active.zone} activeId={active.id} />
              <div className="mt-6 rounded-xl border border-gold/25 bg-[#FBF5E5]/70 px-4 py-4">
                <div className="flex items-start gap-3">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${AUTO_ACCENT} 14%, #FAFAF8)`,
                    }}
                  >
                    <ActiveIcon
                      className="h-5 w-5"
                      style={{ color: AUTO_ACCENT }}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-charcoal">
                      {active.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-secondary">
                      {active.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <div
            className="pilot-auto-coverage-list"
            role="tablist"
            aria-label="Auto coverage types"
          >
            {autoCoverageItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;
              return (
                <RevealOnScroll key={item.id}>
                  <button
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel`}
                    className={`pilot-auto-coverage-card ${isActive ? "is-active" : ""}`}
                    style={{
                      transitionDelay: reduceMotion ? undefined : `${index * 40}ms`,
                    }}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span
                      className="pilot-auto-coverage-card-icon"
                      style={{
                        backgroundColor: isActive
                          ? "color-mix(in srgb, var(--pilot-gold) 18%, #fff)"
                          : `color-mix(in srgb, ${AUTO_ACCENT} 12%, #FAFAF8)`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: isActive ? "#b8940f" : AUTO_ACCENT }}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block text-[15px] font-medium text-charcoal">
                        {item.shortLabel}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-secondary">
                        {item.description}
                      </span>
                    </span>
                    <span
                      className="pilot-auto-coverage-card-ring"
                      aria-hidden
                    />
                  </button>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        <RevealOnScroll className="mt-10 text-center">
          <PremiumGoldCTA href={AUTO_QUOTE_HREF}>
            Get an Auto Quote
          </PremiumGoldCTA>
        </RevealOnScroll>
      </div>
    </section>
  );
}

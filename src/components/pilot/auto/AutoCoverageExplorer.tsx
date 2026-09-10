"use client";

import { useId, useState } from "react";
import AutoCoverageVisualStage from "@/components/pilot/auto/AutoCoverageVisualStage";
import PremiumGoldCTA from "@/components/pilot/PremiumGoldCTA";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  AUTO_ACCENT,
  AUTO_QUOTE_HREF,
  autoCoverageItems,
} from "@/data/pilot-auto";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function AutoCoverageExplorer() {
  const baseId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(autoCoverageItems[0].id);
  const active =
    autoCoverageItems.find((item) => item.id === activeId) ?? autoCoverageItems[0];
  const ActiveIcon = active.icon;

  return (
    <section
      className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-24"
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

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:items-start">
          <RevealOnScroll>
            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${activeId}`}
              className="pilot-auto-explorer-stage relative mx-auto w-full max-w-lg rounded-2xl border border-border/80 bg-white p-6 shadow-[0_16px_40px_rgba(32,39,40,0.07)] sm:p-8 lg:max-w-xl lg:p-9 lg:shadow-[0_20px_48px_rgba(32,39,40,0.09)]"
            >
              <AutoCoverageVisualStage active={active} />
              <div className="mt-6 rounded-xl border border-gold/25 bg-[#FBF5E5]/70 px-4 py-4 lg:mt-7 lg:px-5 lg:py-4.5">
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

        <RevealOnScroll className="pilot-auto-explorer-cta mt-10 text-center lg:mt-6">
          <PremiumGoldCTA href={AUTO_QUOTE_HREF}>
            Get an Auto Quote
          </PremiumGoldCTA>
        </RevealOnScroll>
      </div>
    </section>
  );
}

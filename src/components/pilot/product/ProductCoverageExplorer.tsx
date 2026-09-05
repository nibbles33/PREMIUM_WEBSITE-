"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import ProductCoverageVisualStage from "@/components/pilot/product/ProductCoverageVisualStage";
import PremiumGoldCTA from "@/components/pilot/PremiumGoldCTA";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getContractorsStateImagePreloadUrls } from "@/data/coverage-explorer/contractors-coverage-state-images";
import { getRestaurantStateImagePreloadUrls } from "@/data/coverage-explorer/restaurant-coverage-state-images";
import { usePreloadCoverageStateImages } from "@/hooks/usePreloadCoverageStateImages";
import { useCoverageTabKeyboard } from "@/hooks/useCoverageTabKeyboard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { PilotProductPageConfig } from "@/types/pilot-product";

type ProductCoverageExplorerProps = {
  config: Pick<
    PilotProductPageConfig,
    | "slug"
    | "coverageHeading"
    | "coverageIntro"
    | "coverageItems"
    | "coverageExplorerLabel"
    | "accentColor"
    | "quoteHref"
    | "quoteLabel"
    | "miniature"
    | "coverageExplorer"
  >;
};

export default function ProductCoverageExplorer({ config }: ProductCoverageExplorerProps) {
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(config.coverageItems[0]?.id ?? "");
  const [hasImageInteracted, setHasImageInteracted] = useState(false);
  const isStateImageExplorer =
    config.coverageExplorer?.sceneMode === "coverage-state-images";
  const usesInteractionGate =
    config.slug === "restaurant-insurance" || config.slug === "contractors-insurance";
  const [preloadEnabled, setPreloadEnabled] = useState(false);

  const stateImagePreloadUrls =
    config.slug === "restaurant-insurance"
      ? getRestaurantStateImagePreloadUrls()
      : config.slug === "contractors-insurance"
        ? getContractorsStateImagePreloadUrls()
        : [];

  usePreloadCoverageStateImages(stateImagePreloadUrls, preloadEnabled);

  useEffect(() => {
    if (!isStateImageExplorer || !sectionRef.current) return;
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setPreloadEnabled(true);
      },
      { rootMargin: "240px 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isStateImageExplorer]);

  const selectCoverage = useCallback(
    (id: string) => {
      setActiveId(id);
      if (usesInteractionGate) setHasImageInteracted(true);
    },
    [usesInteractionGate],
  );

  const active =
    config.coverageItems.find((item) => item.id === activeId) ??
    config.coverageItems[0];
  const ActiveIcon = active.icon;
  const handleTabKeyDown = useCoverageTabKeyboard(
    config.coverageItems,
    activeId,
    selectCoverage,
    baseId,
  );

  return (
    <section
      ref={sectionRef}
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
              {config.coverageHeading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              {config.coverageIntro}
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:items-start">
          <RevealOnScroll className="min-w-0 w-full">
            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${activeId}`}
              className="pilot-product-explorer-stage relative mx-auto w-full max-w-full overflow-hidden rounded-2xl border border-border/80 bg-white p-6 shadow-[0_16px_40px_rgba(32,39,40,0.07)] sm:max-w-lg sm:p-8 lg:max-w-xl lg:p-9 lg:shadow-[0_20px_48px_rgba(32,39,40,0.09)]"
            >
              <ProductCoverageVisualStage
                active={active}
                accentColor={config.accentColor}
                explorer={config.coverageExplorer}
                hasImageInteracted={hasImageInteracted}
              />
              <div className="mt-6 rounded-xl border border-gold/25 bg-[#FBF5E5]/70 px-4 py-4 lg:mt-7 lg:px-5 lg:py-[1.125rem]">
                <div className="flex items-start gap-3">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${config.accentColor} 14%, #FAFAF8)`,
                    }}
                  >
                    <ActiveIcon
                      className="h-5 w-5"
                      style={{ color: config.accentColor }}
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
            className="pilot-product-coverage-list"
            role="tablist"
            aria-label={config.coverageExplorerLabel}
          >
            {config.coverageItems.map((item, index) => {
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
                    className={`pilot-product-coverage-card ${isActive ? "is-active" : ""}`}
                    style={{
                      transitionDelay: reduceMotion ? undefined : `${index * 40}ms`,
                    }}
                    onClick={() => selectCoverage(item.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    <span
                      className="pilot-product-coverage-card-icon"
                      style={{
                        backgroundColor: isActive
                          ? "color-mix(in srgb, var(--pilot-gold) 18%, #fff)"
                          : `color-mix(in srgb, ${config.accentColor} 12%, #FAFAF8)`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: isActive ? "#b8940f" : config.accentColor }}
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
                    <span className="pilot-product-coverage-card-ring" aria-hidden />
                  </button>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        <RevealOnScroll className="pilot-product-explorer-cta mt-10 text-center lg:mt-6">
          <PremiumGoldCTA href={config.quoteHref}>{config.quoteLabel}</PremiumGoldCTA>
        </RevealOnScroll>
      </div>
    </section>
  );
}

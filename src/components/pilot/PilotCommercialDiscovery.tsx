"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  commercialIndustryCategories,
  commercialSpecialtyCategory,
} from "@/data/pilot-home";
import {
  getPageHeroPhotography,
  PILOT_COMMERCIAL_PANEL_IMAGE,
} from "@/data/photography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { track } from "@/lib/analytics";
import { contextualQuoteCtaForDiscoveryCategory } from "@/lib/quote/contextualQuoteHref";

function productSlugFromHref(href: string): string {
  return href.replace(/^\/|\/$/g, "") || "unknown";
}

export default function PilotCommercialDiscovery() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const catRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const specialtyRef = useRef<HTMLButtonElement | null>(null);
  const [activeId, setActiveId] = useState(commercialIndustryCategories[0].id);
  const [panelVisible, setPanelVisible] = useState(true);

  const specialtyActive = activeId === commercialSpecialtyCategory.id;
  const active = specialtyActive
    ? commercialSpecialtyCategory
    : (commercialIndustryCategories.find((c) => c.id === activeId) ??
      commercialIndustryCategories[0]);
  const photo = getPageHeroPhotography(active.photoSlug);

  const selectCategory = useCallback(
    (id: string) => {
      if (id === activeId) return;
      track("commercial_category_select", {
        category_id: id,
        surface: "homepage",
      });
      if (reduceMotion) {
        setActiveId(id);
        setPanelVisible(true);
        return;
      }
      setPanelVisible(false);
      window.setTimeout(() => {
        setActiveId(id);
        setPanelVisible(true);
      }, 200);
    },
    [activeId, reduceMotion],
  );

  const onIndustryKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const count = commercialIndustryCategories.length;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = (index + 1) % count;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = count - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCategory(commercialIndustryCategories[index].id);
      return;
    } else {
      return;
    }
    catRefs.current[next]?.focus();
    // Roving tabindex: move selection focus; activate on Enter/Space or click.
    // Arrow keys also select to match prior homepage behaviour.
    selectCategory(commercialIndustryCategories[next].id);
  };

  const panelStyle: CSSProperties = reduceMotion
    ? {}
    : {
        transition:
          "opacity 280ms ease-out, transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      };

  const productGridClass =
    active.products.length > 4
      ? "grid grid-cols-1 gap-3 lg:grid-cols-2"
      : "grid grid-cols-1 gap-3";

  const exploreLabel =
    active.id === "specialty-community"
      ? "Explore Specialty & Community"
      : `Explore ${active.label}`;

  const discoveryQuote = contextualQuoteCtaForDiscoveryCategory(active.id);

  return (
    <section
      className="bg-charcoal py-14 sm:py-[4.5rem] lg:py-[5.25rem]"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
              Commercial capability
            </p>
            <h2
              id={`${baseId}-heading`}
              className="mt-4 text-[2.2rem] font-medium tracking-[-0.035em] text-white sm:text-[2.75rem] lg:text-[3.35rem]"
            >
              Serious insurance for serious businesses.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/75 sm:text-[18px]">
              From contractors and manufacturers to transportation, hospitality,
              real estate, healthcare and community organizations, Premium helps
              businesses understand their exposures and build coverage around how
              they actually operate.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10">
          <div
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center sm:overflow-visible"
            role="tablist"
            aria-label="Commercial insurance industries"
          >
            {commercialIndustryCategories.map((cat, index) => {
              const isActive = !specialtyActive && cat.id === activeId;
              // When Specialty is selected, keep the first industry tab in the
              // tab order so the tablist remains keyboard-reachable.
              const tabStop =
                isActive || (specialtyActive && index === 0) ? 0 : -1;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    catRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-cat-${cat.id}`}
                  aria-label={cat.label}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={tabStop}
                  onClick={() => selectCategory(cat.id)}
                  onKeyDown={(e) => onIndustryKeyDown(e, index)}
                  className={`pilot-commercial-cat inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 py-2.5 text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-sm ${
                    isActive
                      ? "is-active border-gold bg-[#2a3132] text-white shadow-[0_0_0_1px_rgba(208,173,38,0.35)]"
                      : "border-white/15 bg-[#252b2c] text-white/70 hover:border-white/35 hover:text-white/90"
                  }`}
                >
                  {cat.shortLabel ? (
                    <>
                      <span className="sm:hidden">
                        {cat.shortLabel}
                      </span>
                      <span className="hidden sm:inline">
                        {cat.label}
                      </span>
                    </>
                  ) : (
                    cat.label
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex justify-center">
            <button
              ref={specialtyRef}
              type="button"
              id={`${baseId}-cat-${commercialSpecialtyCategory.id}`}
              aria-label="Also available: Specialty and Community"
              aria-pressed={specialtyActive}
              aria-controls={`${baseId}-panel`}
              onClick={() => selectCategory(commercialSpecialtyCategory.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectCategory(commercialSpecialtyCategory.id);
                }
              }}
              className={`min-h-11 rounded-full border px-4 py-2 text-[12px] font-medium tracking-[0.02em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-[13px] ${
                specialtyActive
                  ? "border-gold/70 bg-[#2a3132] text-gold shadow-[0_0_0_1px_rgba(208,173,38,0.28)]"
                  : "border-white/10 bg-transparent text-white/65 hover:border-white/25 hover:text-white/80"
              }`}
            >
              Also Available: Specialty & Community
            </button>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-6 sm:mt-8">
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-cat-${active.id}`}
            className="pilot-commercial-panel overflow-hidden rounded-2xl border border-white/10 bg-[#2a3132]"
          >
            <div
              className={`grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-stretch ${
                panelVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              style={panelStyle}
            >
              <div className="relative aspect-[16/10] min-h-[220px] overflow-hidden lg:aspect-auto lg:min-h-full lg:self-stretch">
                {photo ? (
                  <Image
                    src={photo.src}
                    alt={`${active.label} insurance industry coverage`}
                    fill
                    sizes={PILOT_COMMERCIAL_PANEL_IMAGE.sizes}
                    quality={PILOT_COMMERCIAL_PANEL_IMAGE.quality}
                    className="object-cover object-center"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/20 to-transparent lg:from-charcoal/40" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                    {active.label}
                  </h3>
                  <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                    {active.description}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 flex-col p-6 sm:p-8">
                <ul className={productGridClass}>
                  {active.products.map((product) => (
                    <li key={product.href} className="min-w-0">
                      <Link
                        href={product.href}
                        data-track="commercial_product_select"
                        data-track-product-slug={productSlugFromHref(
                          product.href,
                        )}
                        data-track-category-id={active.id}
                        data-track-surface="homepage"
                        className="group flex h-full min-h-[44px] items-center justify-between rounded-lg border border-white/10 bg-charcoal/60 px-4 py-3 text-[14px] font-medium text-white transition-colors hover:border-gold/45 hover:bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-[15px]"
                      >
                        <span className="min-w-0 pr-3">{product.label}</span>
                        <span
                          aria-hidden
                          className="shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <PremiumPilotButton
                    href={active.href}
                    className="w-full sm:w-auto"
                  >
                    {exploreLabel}
                  </PremiumPilotButton>
                  <PremiumPilotButton
                    href="/commercial-insurance/"
                    variant="secondary"
                    showArrow={false}
                    className="pilot-charcoal-secondary-btn w-full sm:w-auto"
                  >
                    All Commercial
                  </PremiumPilotButton>
                  {discoveryQuote ? (
                    <PremiumPilotButton
                      href={discoveryQuote.href}
                      variant="secondary"
                      showArrow={false}
                      data-track-location="discovery"
                      className="pilot-charcoal-secondary-btn w-full sm:w-auto"
                    >
                      {discoveryQuote.label}
                    </PremiumPilotButton>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

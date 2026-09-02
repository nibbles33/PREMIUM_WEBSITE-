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
import { commercialCategories } from "@/data/pilot-home";
import { getPageHeroPhotography } from "@/data/photography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function PilotCommercialDiscovery() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const catRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeId, setActiveId] = useState(commercialCategories[0].id);
  const [panelVisible, setPanelVisible] = useState(true);

  const active =
    commercialCategories.find((c) => c.id === activeId) ??
    commercialCategories[0];
  const photo = getPageHeroPhotography(active.photoSlug);

  const selectCategory = useCallback(
    (id: string) => {
      if (id === activeId) return;
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

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = (index + 1) % commercialCategories.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next =
        (index - 1 + commercialCategories.length) %
        commercialCategories.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = commercialCategories.length - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCategory(commercialCategories[index].id);
      return;
    } else {
      return;
    }
    catRefs.current[next]?.focus();
  };

  const panelStyle: CSSProperties = reduceMotion
    ? {}
    : {
        transition: "opacity 280ms ease-out, transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      };

  return (
    <section
      className="bg-charcoal py-16 sm:py-20 lg:py-24"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id={`${baseId}-heading`}
              className="text-[1.75rem] font-medium tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl"
            >
              Whatever kind of business you run
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65 sm:text-base">
              Business gets complicated. Insurance doesn&apos;t have to.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10">
          <div
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center sm:overflow-visible"
            role="tablist"
            aria-label="Commercial insurance categories"
          >
            {commercialCategories.map((cat, index) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    catRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-cat-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectCategory(cat.id)}
                  onKeyDown={(e) => onKeyDown(e, index)}
                  className={`pilot-commercial-cat shrink-0 rounded-full border px-4 py-2.5 text-[13px] font-medium sm:text-sm ${
                    isActive
                      ? "is-active border-gold bg-[#2a3132] text-white"
                      : "border-white/15 bg-[#252b2c] text-white/70 hover:border-white/30"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-6 sm:mt-8">
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-cat-${activeId}`}
            className="pilot-commercial-panel overflow-hidden rounded-2xl border border-white/10 bg-[#2a3132]"
          >
            <div
              className={`grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] ${
                panelVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              style={panelStyle}
            >
              <div className="relative aspect-[16/10] min-h-[220px] lg:aspect-auto lg:min-h-[320px]">
                {photo ? (
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover"
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

              <div className="flex flex-col justify-between p-6 sm:p-8">
                <ul className="space-y-3">
                  {active.products.map((product) => (
                    <li key={product.href}>
                      <Link
                        href={product.href}
                        className="group flex items-center justify-between rounded-lg border border-white/10 bg-charcoal/60 px-4 py-3 text-[14px] font-medium text-white transition-colors hover:border-gold/45 hover:bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-[15px]"
                      >
                        {product.label}
                        <span
                          aria-hidden
                          className="text-gold transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <PremiumPilotButton
                    href={active.href}
                    className="w-full sm:w-auto"
                  >
                    Explore {active.label}
                  </PremiumPilotButton>
                  <PremiumPilotButton
                    href="/commercial-insurance/"
                    variant="secondary"
                    showArrow={false}
                    className="w-full border-white/30 text-white hover:border-gold hover:text-gold sm:w-auto"
                  >
                    All Commercial
                  </PremiumPilotButton>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

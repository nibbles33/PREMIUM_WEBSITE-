"use client";

import Link from "next/link";
import {
  Building2,
  Car,
  Home,
  Truck,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type HeroCategoryId = "auto" | "home" | "business" | "commercial";

type CoverageOption = {
  id: HeroCategoryId;
  label: string;
  headline: string;
  tagline: string;
  chips: string[];
  href: string;
  cta: string;
  quoteLabel: string;
  quoteHref: string;
  icon: LucideIcon;
  accent: string;
  badgeBg: string;
  panelWash: string;
  invert: boolean;
};

export const heroCoverageOptions: CoverageOption[] = [
  {
    id: "auto",
    label: "Auto",
    headline: "Auto",
    tagline: "Coverage that keeps you moving.",
    chips: ["Liability", "Collision", "Comprehensive"],
    href: "/auto-insurance/",
    cta: "Explore Auto Insurance",
    quoteLabel: "Get an Auto Quote",
    quoteHref: "/get-a-quote?type=vehicle",
    icon: Car,
    accent: "#5B7A99",
    badgeBg: "#E8EEF3",
    panelWash: "rgba(91,122,153,0.06)",
    invert: false,
  },
  {
    id: "home",
    label: "Home",
    headline: "Home",
    tagline: "Protect the place you call home.",
    chips: ["Building", "Contents", "Liability"],
    href: "/home-insurance/",
    cta: "Explore Home Insurance",
    quoteLabel: "Get a Home Quote",
    quoteHref: "/get-a-quote?type=home",
    icon: Home,
    accent: "#B37A5A",
    badgeBg: "#F3EAE3",
    panelWash: "rgba(179,122,90,0.06)",
    invert: false,
  },
  {
    id: "business",
    label: "Business",
    headline: "Business",
    tagline: "Coverage built around how you operate.",
    chips: ["Property", "Liability", "Cyber", "Equipment"],
    href: "/commercial-insurance/",
    cta: "Explore Business Insurance",
    quoteLabel: "Get a Business Quote",
    quoteHref: "/get-a-quote?type=business",
    icon: Building2,
    accent: "#5A8A73",
    badgeBg: "#E8F0EC",
    panelWash: "rgba(90,138,115,0.06)",
    invert: false,
  },
  {
    id: "commercial",
    label: "Commercial",
    headline: "Commercial",
    tagline: "Coverage that keeps business moving.",
    chips: ["Fleet", "Cargo", "Liability", "Physical Damage"],
    href: "/commercial-insurance/",
    cta: "Explore Commercial Insurance",
    quoteLabel: "Get a Commercial Quote",
    quoteHref: "/get-a-quote?type=commercial-vehicles",
    icon: Truck,
    accent: "#D0AD26",
    badgeBg: "#202728",
    panelWash: "#202728",
    invert: true,
  },
];

type HeroCoverageCardProps = {
  activeId: HeroCategoryId;
  onSelect: (id: HeroCategoryId) => void;
};

export default function HeroCoverageCard({
  activeId,
  onSelect,
}: HeroCoverageCardProps) {
  const [panelVisible, setPanelVisible] = useState(true);
  const reduceMotion = usePrefersReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const active =
    heroCoverageOptions.find((o) => o.id === activeId) ??
    heroCoverageOptions[0];

  const select = useCallback(
    (id: HeroCategoryId) => {
      if (id === activeId) return;
      if (reduceMotion) {
        onSelect(id);
        setPanelVisible(true);
        return;
      }
      setPanelVisible(false);
      window.setTimeout(() => {
        onSelect(id);
        setPanelVisible(true);
      }, 120);
    },
    [activeId, onSelect, reduceMotion],
  );

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = (index + 1) % heroCoverageOptions.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next = (index - 1 + heroCoverageOptions.length) % heroCoverageOptions.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = heroCoverageOptions.length - 1;
    } else {
      return;
    }
    select(heroCoverageOptions[next].id);
    tabRefs.current[next]?.focus();
  };

  const Icon = active.icon;
  const spring = "cubic-bezier(0.34, 1.56, 0.64, 1)";
  const duration = reduceMotion ? "0ms" : "280ms";

  return (
    <div
      className="hero-coverage-panel w-full overflow-hidden rounded-xl border p-5 shadow-[0_8px_28px_rgba(32,39,40,0.07)] sm:p-6 lg:p-7"
      style={{
        backgroundColor: active.invert ? "#202728" : "#FFFFFF",
        borderColor: active.invert ? "#202728" : "#E5E3DC",
        transition: reduceMotion
          ? "none"
          : `background-color 280ms ${spring}, border-color 280ms ease-out`,
      }}
    >
      <p
        className={`text-sm font-medium transition-colors duration-200 ${
          active.invert ? "text-white" : "text-charcoal"
        }`}
      >
        What are you protecting?
      </p>

      <div
        className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
        role="tablist"
        aria-label="Coverage type"
      >
        {heroCoverageOptions.map((option, index) => {
          const TabIcon = option.icon;
          const selected = option.id === activeId;
          return (
            <button
              key={option.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${option.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`hero-cat-tab group flex min-h-[44px] flex-col items-center gap-1.5 rounded-lg border text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark ${
                selected ? "hero-cat-tab-active" : "hero-cat-tab-idle"
              } ${active.invert && !selected ? "hero-cat-tab-on-dark" : ""} ${
                selected && active.invert ? "hero-cat-tab-active-invert" : ""
              }`}
              style={
                {
                  "--tab-accent": option.accent,
                  "--tab-badge-bg": option.badgeBg,
                  transition: reduceMotion
                    ? "none"
                    : `padding 200ms ease-out, transform 100ms ease-out, border-color 200ms ease-out, background-color 200ms ease-out, box-shadow 200ms ease-out`,
                } as CSSProperties
              }
              onClick={() => select(option.id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 group-hover:-translate-y-0.5"
                style={{ backgroundColor: option.badgeBg }}
              >
                <TabIcon
                  className="h-4 w-4"
                  style={{ color: option.accent }}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
              <span
                className={`text-xs font-medium ${
                  selected
                    ? active.invert
                      ? "text-white"
                      : "text-charcoal"
                    : active.invert
                      ? "text-white/55"
                      : "text-secondary"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        aria-live="polite"
        className="mt-5 min-h-[168px] rounded-lg border-t pt-5"
        style={{
          borderColor: active.invert ? "rgba(255,255,255,0.12)" : "#E5E3DC",
          backgroundColor: active.invert ? "transparent" : active.panelWash,
          marginLeft: active.invert ? 0 : "-0.25rem",
          marginRight: active.invert ? 0 : "-0.25rem",
          paddingLeft: active.invert ? 0 : "0.75rem",
          paddingRight: active.invert ? 0 : "0.75rem",
          paddingBottom: active.invert ? 0 : "0.75rem",
          transition: reduceMotion
            ? "none"
            : `background-color 280ms ${spring}, border-color 280ms ease-out`,
        }}
      >
        <div
          className={`${
            panelVisible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
          }`}
          style={{
            transition: reduceMotion
              ? "none"
              : `opacity 240ms ease-out, transform 240ms ${spring}`,
          }}
        >
          <span
            key={`icon-${active.id}`}
            className={`hero-icon-enter inline-flex h-11 w-11 items-center justify-center rounded-full ${
              reduceMotion ? "" : "hero-icon-enter-animate"
            }`}
            style={{
              backgroundColor: active.invert
                ? "rgba(208,173,38,0.22)"
                : active.badgeBg,
            }}
          >
            <Icon
              className="h-5 w-5"
              style={{ color: active.accent }}
              strokeWidth={1.5}
              aria-hidden
            />
          </span>

          <h2
            className={`mt-3 text-xl font-medium tracking-tight ${
              active.invert ? "text-white" : "text-charcoal"
            }`}
          >
            {active.headline}
          </h2>
          <p
            className={`mt-1.5 text-[15px] ${
              active.invert ? "text-white/70" : "text-secondary"
            }`}
          >
            {active.tagline}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {active.chips.map((chip, i) => (
              <li
                key={`${active.id}-${chip}`}
                className={`hero-chip rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                  reduceMotion ? "" : "hero-chip-animate"
                }`}
                style={
                  {
                    borderColor: active.invert
                      ? "rgba(208,173,38,0.45)"
                      : active.accent,
                    color: active.invert ? "#D0AD26" : active.accent,
                    backgroundColor: active.invert
                      ? "rgba(208,173,38,0.1)"
                      : "transparent",
                    animationDelay: reduceMotion ? "0ms" : `${i * 50}ms`,
                    transitionDuration: duration,
                  } as CSSProperties
                }
              >
                {chip}
              </li>
            ))}
          </ul>

          <Link
            href={active.href}
            className={`group mt-5 inline-flex items-center text-sm font-medium transition-colors ${
              active.invert
                ? "text-gold hover:text-white"
                : "text-gold-dark hover:text-charcoal"
            }`}
          >
            {active.cta}
            <span
              aria-hidden
              className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

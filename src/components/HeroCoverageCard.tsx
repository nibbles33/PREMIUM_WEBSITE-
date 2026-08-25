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
  type KeyboardEvent,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CoverageOption = {
  id: string;
  label: string;
  headline: string;
  tagline: string;
  coverage: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  badgeBg: string;
  iconColor: string;
  priority?: boolean;
};

const options: CoverageOption[] = [
  {
    id: "auto",
    label: "Auto",
    headline: "Auto",
    tagline: "Coverage that keeps you moving.",
    coverage: "Liability · Collision · Comprehensive",
    href: "/auto-insurance/",
    cta: "Explore Auto Insurance",
    icon: Car,
    badgeBg: "#E8EEF3",
    iconColor: "#5B7A99",
  },
  {
    id: "home",
    label: "Home",
    headline: "Home",
    tagline: "Protect the place you call home.",
    coverage: "Building · Contents · Liability",
    href: "/home-insurance/",
    cta: "Explore Home Insurance",
    icon: Home,
    badgeBg: "#F3EAE3",
    iconColor: "#B37A5A",
  },
  {
    id: "business",
    label: "Business",
    headline: "Business",
    tagline: "Coverage built around how you operate.",
    coverage: "General Liability · Property · Interruption",
    href: "/commercial-insurance/",
    cta: "Explore Business Insurance",
    icon: Building2,
    badgeBg: "#E8F0EC",
    iconColor: "#5A8A73",
  },
  {
    id: "commercial",
    label: "Commercial",
    headline: "Commercial",
    tagline: "Coverage that keeps business moving.",
    coverage: "Fleet · Liability · Cargo",
    href: "/commercial-insurance/",
    cta: "Explore Commercial Insurance",
    icon: Truck,
    badgeBg: "#202728",
    iconColor: "#D0AD26",
    priority: true,
  },
];

export default function HeroCoverageCard() {
  // Default Auto — Commercial remains visually anchored via charcoal/gold badge
  const [activeId, setActiveId] = useState("auto");
  const [panelVisible, setPanelVisible] = useState(true);
  const reduceMotion = usePrefersReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const active = options.find((o) => o.id === activeId) ?? options[0];
  const activeIndex = options.findIndex((o) => o.id === activeId);

  const select = useCallback(
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
      }, 140);
    },
    [activeId, reduceMotion],
  );

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = (index + 1) % options.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next = (index - 1 + options.length) % options.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = options.length - 1;
    } else {
      return;
    }
    select(options[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="w-full rounded-xl border border-border bg-white p-5 shadow-[0_8px_28px_rgba(32,39,40,0.07)] sm:p-6 lg:p-7">
      <p className="text-sm font-medium text-charcoal">What are you protecting?</p>

      <div
        className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
        role="tablist"
        aria-label="Coverage type"
      >
        {options.map((option, index) => {
          const Icon = option.icon;
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
              className={`interactive-press flex min-h-[44px] flex-col items-center gap-2 rounded-lg border px-2 py-2.5 text-center transition-[border-color,background-color,box-shadow] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark ${
                selected
                  ? "border-charcoal bg-offwhite shadow-[0_2px_8px_rgba(32,39,40,0.06)]"
                  : "border-border bg-white hover:border-charcoal/30"
              }`}
              onClick={() => select(option.id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: option.badgeBg }}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: option.iconColor }}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
              <span
                className={`text-xs font-medium ${
                  selected ? "text-charcoal" : "text-secondary"
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
        className="mt-5 min-h-[148px] border-t border-border pt-5"
      >
        <div
          key={active.id}
          className={`transition-[opacity,transform] ease-out ${
            panelVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
          }`}
          style={{
            transitionDuration: reduceMotion ? "0ms" : "240ms",
          }}
        >
          <h2 className="text-xl font-medium tracking-tight text-charcoal">
            {active.headline}
          </h2>
          <p className="mt-1.5 text-[15px] text-secondary">{active.tagline}</p>
          <p className="mt-3 text-xs font-medium tracking-wide text-charcoal/70">
            {active.coverage}
          </p>
          <Link
            href={active.href}
            className="group mt-5 inline-flex items-center text-sm font-medium text-gold-dark transition-colors hover:text-charcoal"
          >
            {active.cta}
            <span
              aria-hidden
              className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-active:translate-x-[3px]"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Keep activeIndex referenced for a11y tooling / future indicators */}
      <span className="sr-only">
        Showing option {activeIndex + 1} of {options.length}
      </span>
    </div>
  );
}

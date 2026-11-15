"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  ArrowRight,
  Briefcase,
  Building,
  Building2,
  Calendar,
  Car,
  Church,
  ClipboardList,
  Container,
  Droplets,
  Dumbbell,
  Factory,
  Fuel,
  HardHat,
  HeartHandshake,
  Home,
  Hotel,
  KeyRound,
  Landmark,
  Laptop,
  Layers,
  Leaf,
  Lock,
  Mountain,
  Package,
  Pill,
  Scale,
  School,
  Scissors,
  Shield,
  ShoppingBasket,
  Sprout,
  Stethoscope,
  Store,
  Timer,
  Truck,
  Umbrella,
  Users,
  UtensilsCrossed,
  Warehouse,
  Wine,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import { businessNavCategories } from "@/data/nav-business";
import { getPageHeroPhotography } from "@/data/photography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { track } from "@/lib/analytics";
import {
  GENERIC_QUOTE_HREF,
  contextualQuoteCtaForDiscoveryCategory,
} from "@/lib/quote/contextualQuoteHref";

type ExplorerIndustry = {
  id: string;
  label: string;
  lines: readonly [string, string?];
  description: string;
  href: string;
  imageSrc: string | null;
  imageAlt: string;
  imagePosition?: string;
  products: readonly { label: string; href: string }[];
  quoteHref: string;
  quoteLabel: string;
};

const PRESENTATION: Record<
  string,
  {
    lines: readonly [string, string?];
    description: string;
    href: string;
    photoSlug: string;
  }
> = {
  "construction-contractors": {
    lines: ["Construction", "& Contractors"],
    description:
      "General liability, tools, bonds, and project coverage for contractors and trades.",
    href: "/contractors-insurance/",
    photoSlug: "contractors-insurance",
  },
  manufacturing: {
    lines: ["Manufacturing"],
    description:
      "Production facilities, warehousing, licensed cannabis production, and industrial coverage.",
    href: "/manufacturing-insurance/",
    photoSlug: "manufacturing-insurance",
  },
  "hospitality-restaurants": {
    lines: ["Hospitality", "& Restaurants"],
    description:
      "Restaurants, hotels, food trucks, liquor liability, and hospitality events.",
    href: "/restaurant-insurance/",
    photoSlug: "restaurant-insurance",
  },
  "retail-grocery": {
    lines: ["Retail", "& Grocery"],
    description:
      "Storefronts, grocery, convenience, and licensed cannabis retail operations.",
    href: "/retail-insurance/",
    photoSlug: "retail-insurance",
  },
  "transportation-trucking": {
    lines: ["Transportation", "& Trucking"],
    description:
      "Trucking, commercial auto, tow operators, cargo, and garage coverage for Windsor-Essex operators.",
    href: "/commercial-auto-insurance/",
    photoSlug: "commercial-auto-insurance",
  },
  "professional-services": {
    lines: ["Professional", "Services"],
    description:
      "Offices, professional liability, cyber, crime, and employment practices coverage.",
    href: "/professional-offices-insurance/",
    photoSlug: "professional-offices-insurance",
  },
  "real-estate": {
    lines: ["Real Estate"],
    description:
      "Real estate operations, commercial property, landlords, apartments, and condo corporations.",
    href: "/real-estate-insurance/",
    photoSlug: "real-estate-insurance",
  },
  "healthcare-wellness": {
    lines: ["Healthcare", "& Wellness"],
    description: "Medical, dental, pharmacy, fitness, and salon operations.",
    href: "/medical-dental-insurance/",
    photoSlug: "medical-dental-insurance",
  },
  "specialty-community": {
    lines: ["Specialty", "& Community"],
    description:
      "Non-profits, religious organizations, daycares, schools, events, and commercial umbrella.",
    href: "/non-profit-insurance/",
    photoSlug: "non-profit-insurance",
  },
};

const TAB_ICONS: Record<string, LucideIcon> = {
  "construction-contractors": HardHat,
  manufacturing: Factory,
  "hospitality-restaurants": UtensilsCrossed,
  "retail-grocery": Store,
  "transportation-trucking": Truck,
  "professional-services": Briefcase,
  "real-estate": Building2,
  "healthcare-wellness": Stethoscope,
  "specialty-community": Users,
};

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  "/contractors-insurance/": HardHat,
  "/roofing-contractors-insurance/": Home,
  "/electrical-contractors-insurance/": Zap,
  "/plumbing-hvac-insurance/": Droplets,
  "/excavation-contractors-insurance/": Mountain,
  "/builders-developers-insurance/": Building2,
  "/builders-risk-insurance/": Building,
  "/landscaping-snow-removal-insurance/": Leaf,
  "/bonding-insurance/": Shield,
  "/pollution-liability-insurance/": Droplets,
  "/manufacturing-insurance/": Factory,
  "/cannabis-producer-insurance/": Sprout,
  "/product-recall-insurance/": Package,
  "/warehousing-insurance/": Warehouse,
  "/business-interruption-insurance/": Timer,
  "/restaurant-insurance/": UtensilsCrossed,
  "/food-truck-insurance/": Truck,
  "/hotel-motel-insurance/": Hotel,
  "/liquor-liability-insurance/": Wine,
  "/retail-insurance/": Store,
  "/convenience-store-insurance/": Fuel,
  "/grocery-specialty-food-insurance/": ShoppingBasket,
  "/cannabis-retail-insurance/": Sprout,
  "/small-business-insurance/": Briefcase,
  "/commercial-auto-insurance/": Car,
  "/trucking-insurance/": Truck,
  "/dump-truck-insurance/": Container,
  "/tow-truck-insurance/": Truck,
  "/cargo-freight-insurance/": Package,
  "/garage-dealership-insurance/": Wrench,
  "/professional-offices-insurance/": Laptop,
  "/professional-liability-insurance/": Scale,
  "/directors-officers-insurance/": Landmark,
  "/cyber-insurance/": Lock,
  "/crime-fidelity-insurance/": Shield,
  "/employment-practices-liability-insurance/": Users,
  "/real-estate-insurance/": KeyRound,
  "/commercial-property-insurance/": Building2,
  "/commercial-landlord-insurance/": KeyRound,
  "/apartment-building-insurance/": Building,
  "/mixed-use-property-insurance/": Layers,
  "/property-management-insurance/": ClipboardList,
  "/condominium-corporation-insurance/": Building2,
  "/equipment-breakdown-insurance/": Wrench,
  "/medical-dental-insurance/": Stethoscope,
  "/pharmacy-insurance/": Pill,
  "/fitness-gym-insurance/": Dumbbell,
  "/salon-barber-insurance/": Scissors,
  "/non-profit-insurance/": HeartHandshake,
  "/religious-organizations-insurance/": Church,
  "/daycare-private-school-insurance/": School,
  "/event-liability-insurance/": Calendar,
  "/commercial-umbrella-insurance/": Umbrella,
};

const INDUSTRY_IDS = [
  "construction-contractors",
  "manufacturing",
  "hospitality-restaurants",
  "retail-grocery",
  "transportation-trucking",
  "professional-services",
  "real-estate",
  "healthcare-wellness",
  "specialty-community",
] as const;

function buildIndustries(): ExplorerIndustry[] {
  return INDUSTRY_IDS.map((id) => {
    const category = businessNavCategories.find((entry) => entry.id === id);
    const presentation = PRESENTATION[id];
    if (!category || !presentation) {
      throw new Error(`Missing commercial explorer industry: ${id}`);
    }
    const photo = getPageHeroPhotography(presentation.photoSlug);
    const quote = contextualQuoteCtaForDiscoveryCategory(id);
    return {
      id,
      label: category.title,
      lines: presentation.lines,
      description: presentation.description,
      href: presentation.href,
      imageSrc: photo?.src ?? null,
      imageAlt: photo?.alt ?? `${category.title} insurance`,
      imagePosition: photo?.objectPosition,
      products: category.links,
      quoteHref: quote?.href ?? GENERIC_QUOTE_HREF,
      quoteLabel: quote?.label ?? "Get a Quote",
    };
  });
}

const INDUSTRIES = buildIndustries();

function productSlugFromHref(href: string): string {
  return href.replace(/^\/|\/$/g, "") || "unknown";
}

type CommercialIndustryExplorerProps = {
  /** Where category and product selections are recorded. Hub stays the default. */
  surface?: "homepage" | "hub";
};

export default function CommercialIndustryExplorer({
  surface = "hub",
}: CommercialIndustryExplorerProps) {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timerRef = useRef<number | null>(null);
  const activeIdRef = useRef(INDUSTRIES[0].id);
  const [activeId, setActiveId] = useState(INDUSTRIES[0].id);
  const [panelVisible, setPanelVisible] = useState(true);

  const active =
    INDUSTRIES.find((industry) => industry.id === activeId) ?? INDUSTRIES[0];

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const selectIndustry = useCallback(
    (id: string) => {
      if (id === activeIdRef.current) return;
      activeIdRef.current = id;
      track("commercial_category_select", {
        category_id: id,
        surface,
      });
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (reduceMotion) {
        setActiveId(id);
        setPanelVisible(true);
        return;
      }
      setPanelVisible(false);
      timerRef.current = window.setTimeout(() => {
        setActiveId(id);
        setPanelVisible(true);
        timerRef.current = null;
      }, 160);
    },
    [reduceMotion, surface],
  );

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const count = INDUSTRIES.length;
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
      selectIndustry(INDUSTRIES[index].id);
      return;
    } else {
      return;
    }
    const tab = tabRefs.current[next];
    tab?.focus();
    tab?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    });
    selectIndustry(INDUSTRIES[next].id);
  };

  const panelStyle: CSSProperties = reduceMotion
    ? {}
    : { transition: "opacity 200ms ease-out" };

  const cardColumns =
    active.products.length > 4
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <section
      className="bg-[#0E1C2E] py-12 sm:py-14 lg:py-16"
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              Commercial industries
            </p>
            <h2
              id="industries-heading"
              className="mt-3 text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[2.85rem]"
            >
              Industries we cover
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base">
              Dedicated coverage pages for the industries that power
              Windsor-Essex — from construction and manufacturing to
              hospitality, transportation, healthcare, and community
              organizations.
            </p>
          </div>
        </RevealOnScroll>

        <div
          className="pilot-scroll-hide mt-8 flex gap-2 overflow-x-auto pb-1 max-md:snap-x max-md:snap-mandatory md:flex-wrap md:justify-center md:overflow-visible xl:grid xl:w-full xl:grid-cols-9"
          role="tablist"
          aria-label="Commercial insurance industries"
        >
          {INDUSTRIES.map((industry, index) => {
            const isActive = industry.id === active.id;
            const Icon = TAB_ICONS[industry.id] ?? Shield;
            const [line1, line2] = industry.lines;
            return (
              <button
                key={industry.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${industry.id}`}
                aria-label={industry.label}
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectIndustry(industry.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`flex min-h-[4.75rem] snap-start shrink-0 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 text-center transition-colors max-md:min-w-[7.5rem] md:w-[calc(20%-0.45rem)] md:max-w-[11.5rem] xl:w-auto xl:max-w-none xl:min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isActive
                    ? "border-gold bg-gold text-charcoal shadow-[0_8px_22px_rgba(208,173,38,0.32)]"
                    : "border-white/15 bg-white/5 text-white/85 hover:border-gold/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-charcoal" : "text-gold"}`}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="block min-h-[2.15rem] text-[13px] font-medium leading-tight">
                  <span className="block">{line1}</span>
                  <span
                    className={`block text-[12px] font-medium ${
                      line2
                        ? isActive
                          ? "text-charcoal/80"
                          : "text-white/70"
                        : "invisible"
                    }`}
                  >
                    {line2 ?? "Industry"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          className={`mt-4 overflow-hidden rounded-2xl border-t-[3px] border-gold bg-[#405164] shadow-[0_18px_48px_rgba(0,0,0,0.28)] ${
            panelVisible ? "opacity-100" : "opacity-0"
          }`}
          style={panelStyle}
        >
          <div className="lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
            <div className="relative h-[200px] overflow-hidden sm:h-[240px] lg:h-auto lg:min-h-[28rem]">
              {active.imageSrc ? (
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 560px"
                  quality={92}
                  className="object-cover"
                  style={
                    active.imagePosition
                      ? { objectPosition: active.imagePosition }
                      : undefined
                  }
                />
              ) : (
                <div className="absolute inset-0 bg-[#15283A]" />
              )}
            </div>

            <div className="flex min-w-0 flex-col bg-[linear-gradient(165deg,#425468_0%,#3a4b5d_100%)] p-5 sm:p-7 lg:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#e4c558]">
                Industry
              </p>
              <h3 className="mt-2 text-[1.7rem] font-medium tracking-[-0.03em] text-white sm:text-[2rem]">
                {active.label}
              </h3>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/85">
                {active.description}
              </p>

              <ul className={`mt-5 grid gap-2 ${cardColumns}`}>
                {active.products.map((product) => {
                  const Icon = PRODUCT_ICONS[product.href] ?? Shield;
                  return (
                    <li key={product.href} className="min-w-0">
                      <Link
                        href={product.href}
                        data-track="commercial_product_select"
                        data-track-product-slug={productSlugFromHref(
                          product.href,
                        )}
                        data-track-category-id={active.id}
                        data-track-surface={surface}
                        className="group flex h-full min-h-11 items-center gap-2.5 rounded-xl border border-white/18 bg-[#536377] px-3 py-2.5 text-left transition-[border-color,background-color,box-shadow] duration-200 hover:border-[#e4c558]/80 hover:bg-[#5d6f84] hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e4c558] motion-reduce:transition-none"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#45566a] text-[#e4c558]">
                          <Icon
                            className="h-4 w-4"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </span>
                        <span className="min-w-0 flex-1 text-[14px] font-medium leading-snug text-white">
                          {product.label}
                        </span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-[#e4c558] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PremiumPilotButton href={active.href} className="w-full sm:w-auto">
                  {`Explore ${active.label}`}
                </PremiumPilotButton>
                <PremiumPilotButton
                  href={active.quoteHref}
                  variant="secondary"
                  showArrow={false}
                  data-track-location="discovery"
                  className="pilot-slate-quote-btn w-full sm:w-auto"
                >
                  {active.quoteLabel}
                </PremiumPilotButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

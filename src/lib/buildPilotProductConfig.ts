import type {
  ConsiderationItem,
  CoverageCard,
  RelatedLink,
} from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";
import { insuranceAgencyProvider } from "@/components/LineInsurancePage";
import type { ProductPageContent } from "@/data/product-pages/types";
import type { IndustryPageContent } from "@/data/commercial-industries";
import { COMMERCIAL_ACCENT } from "@/data/commercial-industries";
import {
  getPageHeroPhotography,
  getPhotographySlugFromHref,
} from "@/data/photography";
import {
  DEFAULT_COMMERCIAL_RELATED_INTRO,
  DEFAULT_COMMERCIAL_TRUST,
  DEFAULT_RELATED_HEADING,
  DEFAULT_RELATED_INTRO,
  PILOT_BROKER_HREF,
  commercialBrokerSteps,
  personalBrokerSteps,
} from "@/data/pilot-product-shared";
import { getCoverageExplorerConfig } from "@/data/coverage-explorer/registry";
import type {
  PilotProductPageConfig,
  ProductCoverageItem,
  ProductRelatedItem,
  ConsiderationsPresentation,
} from "@/types/pilot-product";

type CoverageInput = CoverageCard & {
  detail?: string;
  shortLabel?: string;
  detailTitle?: string;
  detailDescription?: string;
  id?: string;
  href?: string;
};

type BuildPilotProductConfigInput = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow?: string;
  headline: string;
  heroLead: string;
  heroSupporting?: string;
  photographySlug?: string;
  accentColor: string;
  quoteHref: string;
  quoteLabel: string;
  brokerHref?: string;
  secondaryCta?: { label: string; href: string };
  trustStatement?: string;
  /** When false, hides the trust band below the hero. */
  showTrustBand?: boolean;
  considerations?: ConsiderationItem[];
  considerationsPresentation?: ConsiderationsPresentation;
  coverageHeading?: string;
  coverageIntro: string;
  coverageItems: CoverageInput[];
  coverageExplorerLabel?: string;
  miniature?: PilotProductPageConfig["miniature"];
  coverageExplorer?: PilotProductPageConfig["coverageExplorer"];
  brokerSteps?: PilotProductPageConfig["brokerSteps"];
  relatedProducts: ProductRelatedItem[];
  relatedHeading?: string;
  relatedIntro?: string;
  faqTitle: string;
  faqIntro: string;
  faqItems: FaqItem[];
  ctaEyebrow?: string;
  ctaHeading: string;
  ctaSubhead: string;
  ctaQuoteLabel?: string;
  serviceName: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toCoverageItems(items: CoverageInput[]): ProductCoverageItem[] {
  return items.map((item) => {
    const id = item.id ?? slugify(item.title);
    const shortLabel = item.shortLabel ?? item.title.split(" ")[0] ?? item.title;
    const detail = item.detail ?? item.description;
    return {
      id,
      title: item.title,
      shortLabel,
      description: item.description,
      detail,
      detailTitle: item.detailTitle,
      detailDescription: item.detailDescription,
      href: item.href,
      icon: item.icon,
      visualEyebrow: shortLabel,
      visualCaption: item.title,
      visualSubcaption: item.description,
    };
  });
}

/** Resolve card/related photography slug from destination href via placements registry. */
export function photoSlugFromHref(href: string): string {
  return getPhotographySlugFromHref(href);
}

/** Resolve wired hero photography for commercial routes. */
export function resolveCommercialPhotographySlug(slug: string): string {
  if (getPageHeroPhotography(slug)) return slug;
  return "commercial-insurance";
}

export function relatedLinksToProducts(links: RelatedLink[]): ProductRelatedItem[] {
  return links.map((link) => ({
    label: link.label.replace(/ Insurance$/i, ""),
    href: link.href,
    photoSlug: photoSlugFromHref(link.href),
  }));
}

export function buildPilotProductConfig(
  input: BuildPilotProductConfigInput & {
    layout?: PilotProductPageConfig["layout"];
    relatedIntro?: string;
  },
): PilotProductPageConfig {
  const coverageItems = toCoverageItems(input.coverageItems);

  return {
    slug: input.slug,
    layout: input.layout,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    eyebrow: input.eyebrow ?? "Personal Insurance",
    headline: input.headline,
    heroLead: input.heroLead,
    heroSupporting: input.heroSupporting,
    photographySlug: input.photographySlug,
    accentColor: input.accentColor,
    quoteHref: input.quoteHref,
    quoteLabel: input.quoteLabel,
    brokerHref: input.brokerHref ?? PILOT_BROKER_HREF,
    secondaryCta: input.secondaryCta,
    trustStatement:
      input.trustStatement ??
      "Ontario personal insurance through an independent Windsor-Essex broker — explained in plain language, compared across multiple markets.",
    showTrustBand: input.showTrustBand ?? true,
    considerations: input.considerations,
    considerationsPresentation: input.considerationsPresentation ?? "grid",
    coverageHeading: input.coverageHeading ?? "What's covered",
    coverageIntro: input.coverageIntro,
    coverageItems,
    coverageExplorerLabel: input.coverageExplorerLabel ?? "Coverage types",
    miniature: input.miniature ?? null,
    coverageExplorer:
      input.coverageExplorer ??
      getCoverageExplorerConfig(
        input.slug,
        coverageItems.map((item) => item.id),
      ),
    brokerSteps: input.brokerSteps ?? personalBrokerSteps,
    relatedHeading: input.relatedHeading ?? DEFAULT_RELATED_HEADING,
    relatedIntro: input.relatedIntro ?? DEFAULT_RELATED_INTRO,
    relatedProducts: input.relatedProducts,
    faqTitle: input.faqTitle,
    faqIntro: input.faqIntro,
    faqItems: input.faqItems,
    ctaEyebrow: input.ctaEyebrow ?? "Ready when you are",
    ctaHeading: input.ctaHeading,
    ctaSubhead: input.ctaSubhead,
    ctaQuoteLabel: input.ctaQuoteLabel ?? input.quoteLabel,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: input.serviceName,
      description: input.metaDescription,
      provider: insuranceAgencyProvider(),
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Windsor-Essex",
      },
      serviceType: input.serviceName,
    },
  };
}

export function adaptCommercialProductContent(
  content: ProductPageContent,
): PilotProductPageConfig {
  const related = content.relatedLinks
    ? relatedLinksToProducts(content.relatedLinks)
    : [];

  return buildPilotProductConfig({
    slug: content.slug,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    eyebrow: content.eyebrow ?? "Commercial Insurance",
    headline: content.headline,
    heroLead: content.subhead,
    photographySlug: resolveCommercialPhotographySlug(
      content.photographySlug ?? content.slug,
    ),
    accentColor: content.coverageAccent ?? COMMERCIAL_ACCENT,
    quoteHref: content.quoteHref,
    quoteLabel: content.quoteLabel,
    secondaryCta: content.secondaryCta,
    trustStatement: content.whoItIsFor ?? DEFAULT_COMMERCIAL_TRUST,
    coverageHeading: "What's covered",
    coverageIntro: content.coverageIntro,
    coverageItems: content.coverageTypes,
    considerations: content.considerations,
    brokerSteps: commercialBrokerSteps,
    relatedProducts: related,
    relatedIntro: DEFAULT_COMMERCIAL_RELATED_INTRO,
    faqTitle: content.faqTitle,
    faqIntro: content.faqIntro ?? "Straight answers to common questions.",
    faqItems: content.faqItems,
    ctaHeading: content.ctaHeading,
    ctaSubhead: content.ctaSubhead,
    ctaQuoteLabel: content.ctaButtonLabel ?? content.quoteLabel,
    serviceName: content.serviceName,
    considerationsPresentation:
      content.slug === "liquor-liability-insurance" ||
      content.slug === "hotel-motel-insurance" ||
      content.slug === "event-liability-insurance" ||
      content.slug === "convenience-store-insurance" ||
      content.slug === "salon-barber-insurance" ||
      content.slug === "non-profit-insurance" ||
      content.slug === "warehousing-insurance" ||
      content.slug === "property-management-insurance" ||
      content.slug === "pharmacy-insurance" ||
      content.slug === "cargo-freight-insurance" ||
      content.slug === "builders-risk-insurance" ||
      content.slug === "crime-fidelity-insurance" ||
      content.slug === "directors-officers-insurance" ||
      content.slug === "employment-practices-liability-insurance" ||
      content.slug === "product-recall-insurance" ||
      content.slug === "professional-liability-insurance" ||
      content.slug === "medical-dental-insurance" ||
      content.slug === "small-business-insurance" ||
      content.slug === "business-interruption-insurance" ||
      content.slug === "condominium-corporation-insurance" ||
      content.slug === "garage-dealership-insurance" ||
      content.slug === "pollution-liability-insurance" ||
      content.slug === "grocery-specialty-food-insurance" ||
      content.slug === "fitness-gym-insurance" ||
      content.slug === "religious-organizations-insurance"
        ? "expandable"
        : "grid",
  });
}

const industryRelatedLinks: Record<string, RelatedLink[]> = {
  "contractors-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Surety Bonds", href: "/bonding-insurance/" },
    { label: "Builder's Risk", href: "/builders-risk-insurance/" },
  ],
  "manufacturing-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Commercial Property", href: "/commercial-property-insurance/" },
    { label: "Business Interruption", href: "/business-interruption-insurance/" },
    { label: "Product Recall", href: "/product-recall-insurance/" },
    { label: "Cannabis Producer", href: "/cannabis-producer-insurance/" },
  ],
  "commercial-property-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Business Interruption", href: "/business-interruption-insurance/" },
    { label: "Small Business", href: "/small-business-insurance/" },
  ],
  "restaurant-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
    { label: "Business Interruption", href: "/business-interruption-insurance/" },
  ],
  "professional-offices-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Professional Liability", href: "/professional-liability-insurance/" },
    { label: "Cyber Insurance", href: "/cyber-insurance/" },
  ],
  "real-estate-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Property Management", href: "/property-management-insurance/" },
    { label: "Landlord Insurance", href: "/landlord-insurance/" },
  ],
  "builders-developers-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Contractors Insurance", href: "/contractors-insurance/" },
    { label: "Builder's Risk", href: "/builders-risk-insurance/" },
  ],
  "retail-insurance": [
    { label: "Small Business", href: "/small-business-insurance/" },
    { label: "Commercial Property", href: "/commercial-property-insurance/" },
    { label: "Grocery & Specialty Food", href: "/grocery-specialty-food-insurance/" },
    { label: "Convenience Store", href: "/convenience-store-insurance/" },
    { label: "Pharmacy", href: "/pharmacy-insurance/" },
    { label: "Cannabis Retail", href: "/cannabis-retail-insurance/" },
  ],
  "food-truck-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
    { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
  ],
  "trucking-insurance": [
    { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
    { label: "Dump Trucks", href: "/dump-truck-insurance/" },
    { label: "Cargo & Freight", href: "/cargo-freight-insurance/" },
  ],
  "commercial-auto-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Trucking", href: "/trucking-insurance/" },
    { label: "Dump Truck", href: "/dump-truck-insurance/" },
    { label: "Cargo & Freight", href: "/cargo-freight-insurance/" },
  ],
  "dump-truck-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Trucking", href: "/trucking-insurance/" },
    { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
  ],
  "cannabis-retail-insurance": [
    { label: "Retail Insurance", href: "/retail-insurance/" },
    { label: "Commercial Property", href: "/commercial-property-insurance/" },
    { label: "Crime / Fidelity", href: "/crime-fidelity-insurance/" },
    { label: "Product Recall", href: "/product-recall-insurance/" },
    { label: "Business Interruption", href: "/business-interruption-insurance/" },
  ],
  "cannabis-producer-insurance": [
    { label: "Manufacturing", href: "/manufacturing-insurance/" },
    { label: "Greenhouse & Agribusiness", href: "/greenhouse-agribusiness-insurance/" },
    { label: "Product Recall", href: "/product-recall-insurance/" },
    { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
    { label: "Business Interruption", href: "/business-interruption-insurance/" },
  ],
};

export function adaptCommercialIndustryContent(
  content: IndustryPageContent,
): PilotProductPageConfig {
  const related = relatedLinksToProducts(
    industryRelatedLinks[content.slug] ?? [
      { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
      { label: "Small Business", href: "/small-business-insurance/" },
    ],
  );

  return buildPilotProductConfig({
    slug: content.slug,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    eyebrow: "Commercial Insurance",
    headline: content.headline,
    heroLead: content.subhead,
    photographySlug: resolveCommercialPhotographySlug(content.slug),
    accentColor: COMMERCIAL_ACCENT,
    quoteHref: content.quoteHref,
    quoteLabel: content.quoteLabel,
    trustStatement:
      content.slug === "food-truck-insurance"
        ? "For Windsor–Essex food trucks, mobile trailers, and event vendors — reviewed through an independent broker who can coordinate commercial auto, liability, and equipment coverage for how you actually operate."
        : content.slug === "trucking-insurance"
          ? "For Windsor–Essex motor carriers, owner-operators, and fleet operators — reviewed through an independent broker who can coordinate commercial automobile, cargo, and contract requirements for how you actually haul."
          : content.slug === "dump-truck-insurance"
            ? "For Windsor–Essex dump truck operators and small fleets — reviewed through an independent broker who can coordinate commercial automobile, load exposure, and jobsite hauling for how you actually work."
            : content.slug === "contractors-insurance"
              ? "For Windsor–Essex general contractors and trade contractors — reviewed through an independent broker who can align liability, tools, certificates, and project participation with how you actually build."
              : content.slug === "builders-developers-insurance"
                ? "For Windsor–Essex builders and developers coordinating projects and ownership entities — reviewed through an independent broker who can structure project property, liability, and wrap-up strategy across your pipeline."
                : content.slug === "professional-offices-insurance"
                  ? "For Windsor–Essex professional service firms operating from commercial offices — reviewed through an independent broker who can coordinate general liability, property, professional liability, and cyber coverage for how your office actually runs."
                  : content.slug === "real-estate-insurance"
                    ? "For Windsor–Essex real estate brokerages and office operations — reviewed through an independent broker who can coordinate commercial general liability, property, and cyber alongside RECO's registrant program."
                    : content.slug === "commercial-property-insurance"
                      ? "For Windsor–Essex businesses and commercial property owners insuring buildings, contents, inventory, and leasehold interests — reviewed through an independent broker who can coordinate property limits, optional endorsements, and business interruption where a covered loss would interrupt operations."
                      : content.slug === "commercial-auto-insurance"
                        ? "For Windsor–Essex service businesses, contractors, trades, local delivery operations, and companies with vans, pickups, or business-owned passenger vehicles — reviewed through an independent broker who can coordinate Ontario automobile coverage, optional physical damage, and hired/non-owned auto without treating every risk like a for-hire motor carrier."
                        : content.slug === "retail-insurance"
                          ? "For Windsor–Essex clothing stores, gift shops, electronics retailers, furniture and home-goods shops, and other ordinary storefront retailers — reviewed through an independent broker who can coordinate liability, property, inventory, and optional crime or cyber coverage for how you actually sell."
                          : content.slug === "manufacturing-insurance"
                            ? "For Windsor–Essex fabrication shops, machining and metalworking plants, plastics and assembly operations, and job-shop or tool-and-die producers — reviewed through an independent broker who can coordinate property, products liability, business interruption, equipment breakdown, and specialty coverages for how you actually manufacture."
                            : content.slug === "cannabis-retail-insurance"
                              ? "For Windsor–Essex and Ontario operators of AGCO-authorized cannabis retail stores — reviewed through an independent broker who can coordinate liability, property and stock, product liability, crime, and business interruption against lease and OCS contract expectations."
                              : content.slug === "cannabis-producer-insurance"
                                ? "For Health Canada–licensed cultivators, nursery operators, and processors — including micro classes where applicable — reviewed through an independent broker who can coordinate infrastructure property, living plant and stock treatment, equipment breakdown, products liability, recall expense, and business interruption."
                            : content.whoItIsFor ?? content.subhead,
    showTrustBand: content.slug !== "restaurant-insurance",
    considerationsPresentation:
      content.slug === "restaurant-insurance" ||
      content.slug === "food-truck-insurance" ||
      content.slug === "trucking-insurance" ||
      content.slug === "dump-truck-insurance" ||
      content.slug === "contractors-insurance" ||
      content.slug === "builders-developers-insurance" ||
      content.slug === "professional-offices-insurance" ||
      content.slug === "real-estate-insurance" ||
      content.slug === "commercial-property-insurance" ||
      content.slug === "commercial-auto-insurance" ||
      content.slug === "retail-insurance" ||
      content.slug === "manufacturing-insurance" ||
      content.slug === "cannabis-retail-insurance" ||
      content.slug === "cannabis-producer-insurance"
        ? "expandable"
        : "grid",
    coverageHeading: "What's covered",
    coverageIntro: content.coverageIntro,
    coverageItems: content.coverageTypes,
    considerations: content.considerations,
    brokerSteps: commercialBrokerSteps,
    relatedProducts: related,
    relatedIntro: DEFAULT_COMMERCIAL_RELATED_INTRO,
    faqTitle: content.faqTitle,
    faqIntro: "Straight answers to common questions for this industry.",
    faqItems: content.faqItems,
    ctaHeading: content.ctaHeading,
    ctaSubhead: content.ctaSubhead,
    serviceName: content.serviceName,
  });
}

export function adaptProductPageContent(content: ProductPageContent): PilotProductPageConfig {
  const accent = content.coverageAccent ?? "#6A7A8A";
  const related = content.relatedLinks
    ? relatedLinksToProducts(content.relatedLinks)
    : [];

  return buildPilotProductConfig({
    slug: content.slug,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    eyebrow: content.eyebrow,
    headline: content.headline,
    heroLead: content.subhead,
    photographySlug: content.photographySlug,
    accentColor: accent,
    quoteHref: content.quoteHref,
    quoteLabel: content.quoteLabel,
    secondaryCta: content.secondaryCta,
    trustStatement: content.whoItIsFor,
    coverageHeading: "What's covered",
    coverageIntro: content.coverageIntro,
    coverageItems: content.coverageTypes,
    considerations: content.considerations,
    relatedProducts: related,
    faqTitle: content.faqTitle,
    faqIntro: content.faqIntro ?? "Straight answers to common questions.",
    faqItems: content.faqItems,
    ctaHeading: content.ctaHeading,
    ctaSubhead: content.ctaSubhead,
    ctaQuoteLabel: content.ctaButtonLabel ?? content.quoteLabel,
    serviceName: content.serviceName,
  });
}

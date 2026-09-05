import type {
  ConsiderationItem,
  CoverageCard,
  RelatedLink,
} from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";
import {
  buildPilotProductConfig,
  relatedLinksToProducts,
} from "@/lib/buildPilotProductConfig";
import { createPilotProductPageExports } from "@/lib/createPilotProductPage";

export type PersonalPilotPageInput = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow?: string;
  headline: string;
  subhead: string;
  photographySlug?: string;
  quoteHref: string;
  quoteLabel: string;
  brokerHref?: string;
  secondaryCta?: { label: string; href: string };
  coverageIntro: string;
  coverageAccent: string;
  coverageHeading?: string;
  coverageTypes: CoverageCard[];
  whoItIsFor?: string;
  considerations?: ConsiderationItem[];
  relatedLinks?: RelatedLink[];
  faqTitle: string;
  faqIntro: string;
  faqItems: FaqItem[];
  ctaHeading: string;
  ctaSubhead: string;
  ctaButtonLabel?: string;
  serviceName: string;
};

export function createPersonalPilotPageExports(input: PersonalPilotPageInput) {
  const config = buildPilotProductConfig({
    slug: input.slug,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    eyebrow: input.eyebrow,
    headline: input.headline,
    heroLead: input.subhead,
    photographySlug: input.photographySlug,
    accentColor: input.coverageAccent,
    quoteHref: input.quoteHref,
    quoteLabel: input.quoteLabel,
    brokerHref: input.brokerHref,
    secondaryCta: input.secondaryCta,
    trustStatement: input.whoItIsFor,
    considerations: input.considerations,
    coverageHeading: input.coverageHeading,
    coverageIntro: input.coverageIntro,
    coverageItems: input.coverageTypes,
    relatedProducts: input.relatedLinks
      ? relatedLinksToProducts(input.relatedLinks)
      : [],
    faqTitle: input.faqTitle,
    faqIntro: input.faqIntro,
    faqItems: input.faqItems,
    ctaHeading: input.ctaHeading,
    ctaSubhead: input.ctaSubhead,
    ctaQuoteLabel: input.ctaButtonLabel,
    serviceName: input.serviceName,
  });

  return createPilotProductPageExports(config);
}

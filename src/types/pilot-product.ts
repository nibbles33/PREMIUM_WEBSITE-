import type { LucideIcon } from "lucide-react";
import type { ConsiderationItem } from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";
import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";

export type ProductCoverageItem = {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  visualEyebrow: string;
  visualCaption: string;
  visualSubcaption: string;
};

export type ProductBrokerStep = {
  id: string;
  label: string;
  detail: string;
};

export type ProductRelatedItem = {
  label: string;
  href: string;
  photoSlug: string;
};

export type ProductMiniatureAsset = {
  src: string;
  width: number;
  height: number;
  quality?: number;
  sizes?: string;
};

export type PilotProductPageLayout = "standard" | "commercial-hub";

export type PilotProductPageConfig = {
  slug: string;
  layout?: PilotProductPageLayout;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  heroLead: string;
  heroSupporting?: string;
  photographySlug?: string;
  accentColor: string;
  quoteHref: string;
  quoteLabel: string;
  brokerHref?: string;
  secondaryCta?: { label: string; href: string };
  trustStatement: string;
  considerations?: ConsiderationItem[];
  coverageHeading: string;
  coverageIntro: string;
  coverageItems: ProductCoverageItem[];
  coverageExplorerLabel: string;
  miniature?: ProductMiniatureAsset | null;
  coverageExplorer?: CoverageExplorerVisualConfig | null;
  brokerSteps: ProductBrokerStep[];
  relatedHeading: string;
  relatedIntro: string;
  relatedProducts: ProductRelatedItem[];
  faqTitle: string;
  faqIntro: string;
  faqItems: FaqItem[];
  ctaEyebrow: string;
  ctaHeading: string;
  ctaSubhead: string;
  ctaQuoteLabel?: string;
  jsonLd: Record<string, unknown>;
};

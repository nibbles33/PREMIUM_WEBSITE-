import type { Metadata } from "next";
import PilotCommercialPage from "@/components/pilot/product/PilotCommercialPage";
import { industryPages } from "@/data/commercial-industries";
import { getProductPage } from "@/data/product-pages";

const hubMetadata: Metadata = {
  title: "Commercial Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Commercial insurance for Windsor-Essex manufacturers, trucking fleets, contractors, restaurants, and more — industry-specific coverage through an independent broker.",
  alternates: { canonical: "/commercial-insurance/" },
};

const bondingMetadata: Metadata = {
  title: "Bond Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Surety bonds through an independent Windsor-Essex broker — contract & performance bonds, bid bonds, license & permit bonds, and fidelity bonds.",
  alternates: { canonical: "/bonding-insurance/" },
};

const farmMetadata: Metadata = {
  title: "Farm Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Farm insurance through an independent Windsor-Essex broker — farm property, equipment & machinery, farm liability, and livestock coverage for Essex County farms.",
  alternates: { canonical: "/farm-insurance/" },
};

function metadataForSlug(slug: string): Metadata {
  if (slug === "commercial-insurance") return hubMetadata;
  if (slug === "bonding-insurance") return bondingMetadata;
  if (slug === "farm-insurance") return farmMetadata;

  const industry = industryPages.find((page) => page.slug === slug);
  if (industry) {
    return {
      title: industry.metaTitle,
      description: industry.metaDescription,
      alternates: { canonical: `/${slug}/` },
    };
  }

  const product = getProductPage(slug);
  if (product) {
    return {
      title: product.metaTitle,
      description: product.metaDescription,
      alternates: { canonical: `/${slug}/` },
    };
  }

  throw new Error(`Unknown pilot commercial page slug: ${slug}`);
}

export function createPilotCommercialPageExports(slug: string) {
  const metadata = metadataForSlug(slug);

  function Page() {
    return <PilotCommercialPage slug={slug} />;
  }

  return { metadata, default: Page };
}

import type { Metadata } from "next";
import PilotCommercialPage from "@/components/pilot/product/PilotCommercialPage";
import { industryPages } from "@/data/commercial-industries";
import { getProductPage } from "@/data/product-pages";
import { buildPageMetadata } from "@/lib/seo";

const hubMetadata: Metadata = buildPageMetadata({
  title: "Commercial Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Commercial insurance for Windsor-Essex manufacturers, trucking fleets, contractors, restaurants, and more — industry-specific coverage through an independent broker.",
  path: "/commercial-insurance/",
});

const bondingMetadata: Metadata = buildPageMetadata({
  title: "Surety Bonds in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Surety bonds through an independent Windsor-Essex broker — bid bonds, performance bonds, labour and material payment bonds, and licence and permit bonds.",
  path: "/bonding-insurance/",
});

const farmMetadata: Metadata = buildPageMetadata({
  title: "Farm Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Farm insurance through an independent Windsor-Essex broker — farm property, machinery, farm liability, and livestock coverage for working Essex County farms, distinct from greenhouse agribusiness and government crop programs.",
  path: "/farm-insurance/",
});

const greenhouseMetadata: Metadata = buildPageMetadata({
  title:
    "Greenhouse & Agribusiness Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Greenhouse and agribusiness operations in Leamington, Essex County, and Windsor-Essex — reviewed through an independent broker.",
  path: "/greenhouse-agribusiness-insurance/",
});

function metadataForSlug(slug: string): Metadata {
  if (slug === "commercial-insurance") return hubMetadata;
  if (slug === "bonding-insurance") return bondingMetadata;
  if (slug === "farm-insurance") return farmMetadata;
  if (slug === "greenhouse-agribusiness-insurance") return greenhouseMetadata;

  const industry = industryPages.find((page) => page.slug === slug);
  if (industry) {
    return buildPageMetadata({
      title: industry.metaTitle,
      description: industry.metaDescription,
      path: `/${slug}/`,
    });
  }

  const product = getProductPage(slug);
  if (product) {
    return buildPageMetadata({
      title: product.metaTitle,
      description: product.metaDescription,
      path: `/${slug}/`,
    });
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

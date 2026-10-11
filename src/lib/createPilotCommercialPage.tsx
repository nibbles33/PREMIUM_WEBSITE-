import type { Metadata } from "next";
import PilotCommercialPage from "@/components/pilot/product/PilotCommercialPage";
import { industryPages } from "@/data/commercial-industries";
import { getProductPage } from "@/data/product-pages";
import { buildPageMetadata } from "@/lib/seo";

const hubMetadata: Metadata = buildPageMetadata({
  title: "Commercial Insurance in Windsor | Premium Insurance Brokers",
  description:
    "Commercial and business insurance for Windsor-Essex and Ontario operators. Explore industry coverage with an independent brokerage — then talk to a licensed broker.",
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
    "Farm insurance for Windsor-Essex and Essex County operations — farm property, machinery, liability, and livestock through an independent broker.",
  path: "/farm-insurance/",
});

const greenhouseMetadata: Metadata = buildPageMetadata({
  title:
    "Greenhouse & Nursery Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Greenhouse and nursery insurance for Leamington, Essex County, and Windsor-Essex operations — structures, equipment, stock treatment, and liability through an independent broker.",
  path: "/greenhouse-agribusiness-insurance/",
});

const cropMetadata: Metadata = buildPageMetadata({
  title: "Crop Insurance & Agricorp Referral | Premium Insurance Brokers",
  description:
    "Ontario crop Production Insurance is delivered by Agricorp. Premium Insurance Brokers explains the distinction and helps with private farm package coverages we can place.",
  path: "/crop-insurance/",
});

const livestockMetadata: Metadata = buildPageMetadata({
  title:
    "Livestock & Animal Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Livestock and animal insurance questions for Windsor-Essex farms — named perils, scheduling, mortality limitations, and how animals fit a farm package review.",
  path: "/livestock-insurance/",
});

const farmEquipmentMetadata: Metadata = buildPageMetadata({
  title:
    "Farm Equipment Coverage in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Farm equipment and machinery coverage for Windsor-Essex operations — scheduled implements, transit considerations, and the line between field equipment and licensed road vehicles.",
  path: "/farm-equipment-insurance/",
});

function metadataForSlug(slug: string): Metadata {
  if (slug === "commercial-insurance") return hubMetadata;
  if (slug === "bonding-insurance") return bondingMetadata;
  if (slug === "farm-insurance") return farmMetadata;
  if (slug === "greenhouse-agribusiness-insurance") return greenhouseMetadata;
  if (slug === "crop-insurance") return cropMetadata;
  if (slug === "livestock-insurance") return livestockMetadata;
  if (slug === "farm-equipment-insurance") return farmEquipmentMetadata;

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

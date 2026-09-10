import type { Metadata } from "next";
import PilotProductPage from "@/components/pilot/product/PilotProductPage";
import { buildPageMetadata } from "@/lib/seo";
import type { PilotProductPageConfig } from "@/types/pilot-product";

export function createPilotProductPageExports(config: PilotProductPageConfig) {
  const metadata: Metadata = buildPageMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    path: `/${config.slug}/`,
  });

  function Page() {
    return <PilotProductPage config={config} />;
  }

  return { metadata, default: Page };
}

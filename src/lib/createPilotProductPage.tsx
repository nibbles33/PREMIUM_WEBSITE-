import type { Metadata } from "next";
import PilotProductPage from "@/components/pilot/product/PilotProductPage";
import type { PilotProductPageConfig } from "@/types/pilot-product";

export function createPilotProductPageExports(config: PilotProductPageConfig) {
  const metadata: Metadata = {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `/${config.slug}/` },
  };

  function Page() {
    return <PilotProductPage config={config} />;
  }

  return { metadata, default: Page };
}

"use client";

import PilotProductPage from "@/components/pilot/product/PilotProductPage";
import { getPilotLifeConfig } from "@/data/pilot-life-inline";

export default function PilotLifePage({ slug }: { slug: string }) {
  const config = getPilotLifeConfig(slug);
  if (!config) {
    throw new Error(`Unknown life insurance page slug: ${slug}`);
  }
  return <PilotProductPage config={config} />;
}

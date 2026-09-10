"use client";

import PilotProductPage from "@/components/pilot/product/PilotProductPage";
import { getPilotCommercialConfig } from "@/data/pilot-commercial-registry";

type PilotCommercialPageProps = {
  slug: string;
};

export default function PilotCommercialPage({ slug }: PilotCommercialPageProps) {
  const config = getPilotCommercialConfig(slug);
  return <PilotProductPage config={config} />;
}

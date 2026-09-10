"use client";

import PilotProductPage from "@/components/pilot/product/PilotProductPage";
import { getPilotPersonalConfig } from "@/data/pilot-personal-registry";

type PilotPersonalPageProps = {
  slug: string;
};

export default function PilotPersonalPage({ slug }: PilotPersonalPageProps) {
  const config = getPilotPersonalConfig(slug);
  return <PilotProductPage config={config} />;
}

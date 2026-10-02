import type { Metadata } from "next";
import PilotHomePage from "@/components/pilot/PilotHomePage";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { homepageStructuredData } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Premium Insurance Brokers | Personal & Business Insurance in Windsor-Essex",
  description:
    "Independent insurance brokerage in Windsor-Essex. Personal auto, home, and commercial coverage through a licensed local broker — not a call centre.",
  path: "/",
  ogTitle: "Premium Insurance Brokers | Windsor-Essex",
  ogDescription:
    "Personal and business insurance advice from an independent Windsor-Essex brokerage.",
});

export default function Home() {
  return (
    <>
      <JsonLd data={homepageStructuredData()} />
      <PilotHomePage />
    </>
  );
}

import type { Metadata } from "next";
import PilotHomePage from "@/components/pilot/PilotHomePage";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { homepageStructuredData } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Insurance Brokers in Windsor, Ontario | Premium Insurance Brokers",
  description:
    "Independent insurance brokers in Windsor-Essex for personal and business coverage across Ontario. Compare options with a licensed local brokerage — not a call centre.",
  path: "/",
  ogTitle: "Insurance Brokers in Windsor, Ontario | Premium Insurance Brokers",
  ogDescription:
    "Independent Windsor-Essex brokerage for personal and business insurance — serving clients throughout Ontario.",
});

export default function Home() {
  return (
    <>
      <JsonLd data={homepageStructuredData()} />
      <PilotHomePage />
    </>
  );
}

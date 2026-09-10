import type { Metadata } from "next";
import PilotHomePage from "@/components/pilot/PilotHomePage";
import { buildPageMetadata } from "@/lib/seo";

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
  return <PilotHomePage />;
}

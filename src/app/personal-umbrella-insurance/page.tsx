import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Personal Umbrella Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Personal umbrella liability insurance for Windsor-Essex — extra limits above your home and auto policies, explained by an independent broker.",
  path: "/personal-umbrella-insurance/",
});

export default function PersonalUmbrellaInsurancePage() {
  return <PilotPersonalPage slug="personal-umbrella-insurance" />;
}

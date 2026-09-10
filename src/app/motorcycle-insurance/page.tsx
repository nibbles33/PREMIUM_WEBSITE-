import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Motorcycle Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Motorcycle insurance for Windsor-Essex riders — liability, physical damage, seasonal use, and gear considerations explained by an independent broker.",
  path: "/motorcycle-insurance/",
});

export default function MotorcycleInsurancePage() {
  return <PilotPersonalPage slug="motorcycle-insurance" />;
}

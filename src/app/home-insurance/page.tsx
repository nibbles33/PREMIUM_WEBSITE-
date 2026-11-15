import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Insurance in Windsor | Premium Insurance Brokers",
  description:
    "Home and house insurance in Windsor-Essex. Dwelling, contents, liability, and living expenses for Ontario homeowners, through an independent broker.",
  path: "/home-insurance/",
});

export default function HomeInsurancePage() {
  return <PilotPersonalPage slug="home-insurance" />;
}

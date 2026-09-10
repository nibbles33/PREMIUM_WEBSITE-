import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Home insurance through an independent Windsor-Essex broker — dwelling, contents, liability, and additional living expenses explained in plain language.",
  path: "/home-insurance/",
});

export default function HomeInsurancePage() {
  return <PilotPersonalPage slug="home-insurance" />;
}

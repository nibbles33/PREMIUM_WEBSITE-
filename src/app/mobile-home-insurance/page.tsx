import type { Metadata } from "next";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = {
  title:
    "Mobile & Manufactured Home Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Mobile and manufactured home insurance for Windsor-Essex — dwelling, contents, liability, and tie-down considerations explained by an independent broker.",
  alternates: { canonical: "/mobile-home-insurance/" },
};

export default function MobileHomeInsurancePage() {
  return <PilotPersonalPage slug="mobile-home-insurance" />;
}

import type { Metadata } from "next";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = {
  title: "Home Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Home insurance through an independent Windsor-Essex broker — dwelling, contents, liability, and additional living expenses explained in plain language.",
  alternates: { canonical: "/home-insurance/" },
};

export default function HomeInsurancePage() {
  return <PilotPersonalPage slug="home-insurance" />;
}

import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Talk to a Broker | Premium Insurance Brokers",
  description:
    "Speak with a licensed Premium Insurance Brokers advisor in Windsor-Essex.",
};

export default function TalkToABrokerPage() {
  permanentRedirect("/contact?intent=broker");
}

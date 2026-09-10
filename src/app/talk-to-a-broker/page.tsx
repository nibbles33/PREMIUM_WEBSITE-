import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Talk to a Broker | Premium Insurance Brokers",
  description:
    "Speak with a licensed Premium Insurance Brokers advisor in Windsor-Essex.",
  path: "/talk-to-a-broker/",
  noIndex: true,
});

export default function TalkToABrokerPage() {
  permanentRedirect("/contact/?intent=broker");
}

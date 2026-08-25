import PlaceholderPage from "@/components/PlaceholderPage";

type LinePlaceholderPageProps = {
  title: string;
  quoteHref: string;
};

/** @deprecated Prefer PlaceholderPage — kept for existing insurance line imports. */
export default function LinePlaceholderPage({
  title,
  quoteHref,
}: LinePlaceholderPageProps) {
  return (
    <PlaceholderPage
      title={title}
      description="Full page coming soon — in the meantime, get a quote below."
      primaryCta={{ label: "Get a Quote", href: quoteHref }}
      secondaryCta={{
        label: "Talk to a Broker",
        href: "/talk-to-a-broker/",
      }}
    />
  );
}

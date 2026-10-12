import type { Metadata } from "next";
import PilotLifePage from "@/components/pilot/product/PilotLifePage";
import { LIFE_PAGE_META } from "@/data/life-page-meta";
import { buildPageMetadata } from "@/lib/seo";

export function createPilotLifePageExports(slug: string) {
  const meta = LIFE_PAGE_META[slug];
  if (!meta) {
    throw new Error(`Unknown life insurance page slug: ${slug}`);
  }

  const metadata: Metadata = buildPageMetadata({
    title: meta.metaTitle,
    description: meta.metaDescription,
    path: `/${slug}/`,
  });

  function Page() {
    return <PilotLifePage slug={slug} />;
  }

  return { metadata, default: Page };
}

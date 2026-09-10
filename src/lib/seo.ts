import type { Metadata } from "next";

/** Intended production origin for rebuild metadata (cutover not yet live). */
export const SITE_ORIGIN = "https://premiumib.com";

/** Default social share image — existing homepage hero photography. */
export const DEFAULT_OG_IMAGE_PATH =
  "/images/photography/special/homepage-hero.webp";

export const SITE_NAME = "Premium Insurance Brokers";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  /** Canonical path with trailing slash, or `/` for homepage. */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
};

/**
 * Shared page metadata for production-facing SEO.
 * Relies on root `metadataBase` to resolve absolute canonical/OG URLs.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  const ogImage = DEFAULT_OG_IMAGE_PATH;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: canonicalPath,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_CA",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [ogImage],
    },
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : { robots: { index: true, follow: true } }),
  };
}

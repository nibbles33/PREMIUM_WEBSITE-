"use client";

import { getProductPage } from "@/data/product-pages";
import {
  adaptProductPageContent,
  buildPilotProductConfig,
} from "@/lib/buildPilotProductConfig";
import type { PilotProductPageConfig } from "@/types/pilot-product";
import { pilotPersonalInlineConfigs } from "@/data/pilot-personal-inline";

const SPECIALTY_SLUGS = [
  "mobile-home-insurance",
  "personal-umbrella-insurance",
  "home-sharing-insurance",
  "life-insurance",
  "group-home-auto-insurance",
] as const;

function buildRegistry(): Map<string, PilotProductPageConfig> {
  const map = new Map<string, PilotProductPageConfig>(
    Object.entries(pilotPersonalInlineConfigs),
  );

  for (const slug of SPECIALTY_SLUGS) {
    const content = getProductPage(slug);
    if (content) {
      map.set(slug, adaptProductPageContent(content));
    }
  }

  return map;
}

const registry = buildRegistry();

export function getPilotPersonalConfig(slug: string): PilotProductPageConfig {
  const config = registry.get(slug);
  if (!config) {
    throw new Error(`Unknown pilot personal page slug: ${slug}`);
  }
  return config;
}

export function getPilotPersonalSlugs(): string[] {
  return Array.from(registry.keys());
}

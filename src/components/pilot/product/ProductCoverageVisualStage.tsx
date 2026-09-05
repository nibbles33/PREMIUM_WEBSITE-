"use client";

import type { LucideIcon } from "lucide-react";
import CoverageVisualStage from "@/components/pilot/coverage-explorer/CoverageVisualStage";
import type { ProductCoverageItem } from "@/types/pilot-product";
import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";

type ProductCoverageVisualStageProps = {
  active: ProductCoverageItem;
  accentColor: string;
  explorer?: CoverageExplorerVisualConfig | null;
  hasImageInteracted?: boolean;
};

export default function ProductCoverageVisualStage({
  active,
  accentColor,
  explorer,
  hasImageInteracted = true,
}: ProductCoverageVisualStageProps) {
  if (explorer) {
    return (
      <CoverageVisualStage
        activeCoverageId={active.id}
        accentColor={accentColor}
        visualEyebrow={active.visualEyebrow}
        visualCaption={active.visualCaption}
        visualSubcaption={active.visualSubcaption}
        explorer={explorer}
        srDetail={`${active.title}: ${active.detail}`}
        showCaption={false}
        hasInteracted={hasImageInteracted}
      />
    );
  }

  const ActiveIcon = active.icon as LucideIcon;

  return (
    <div
      className="pilot-product-coverage-stage pilot-product-coverage-stage--icon-only"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="pilot-product-coverage-stage-eyebrow">{active.visualEyebrow}</p>

      <div className="pilot-product-coverage-stage-frame pilot-product-coverage-stage-frame--icon-only">
        <div className="pilot-product-icon-stage" aria-hidden>
          <span
            className="pilot-product-icon-stage-ring"
            style={{ borderColor: `${accentColor}55` }}
          />
          <span
            className="pilot-product-icon-stage-icon"
            style={{
              color: accentColor,
              backgroundColor: `color-mix(in srgb, ${accentColor} 12%, #FAFAF8)`,
            }}
          >
            <ActiveIcon className="h-12 w-12" strokeWidth={1.25} />
          </span>
        </div>

        <div className="pilot-product-coverage-scene" aria-hidden>
          <span
            className="pilot-product-scene-ambient"
            style={{
              background: `radial-gradient(ellipse 72% 58% at 50% 54%, color-mix(in srgb, ${accentColor} 18%, transparent) 0%, transparent 72%)`,
            }}
          />
        </div>
      </div>

      <p className="sr-only">
        {active.title}: {active.detail}
      </p>
    </div>
  );
}

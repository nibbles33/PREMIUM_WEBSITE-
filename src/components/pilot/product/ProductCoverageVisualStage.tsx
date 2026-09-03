"use client";

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ProductCoverageItem, ProductMiniatureAsset } from "@/types/pilot-product";

type ProductCoverageVisualStageProps = {
  active: ProductCoverageItem;
  accentColor: string;
  miniature?: ProductMiniatureAsset | null;
};

export default function ProductCoverageVisualStage({
  active,
  accentColor,
  miniature,
}: ProductCoverageVisualStageProps) {
  const ActiveIcon = active.icon as LucideIcon;

  return (
    <div className="pilot-product-coverage-stage" aria-live="polite" aria-atomic="true">
      <p className="pilot-product-coverage-stage-eyebrow">{active.visualEyebrow}</p>

      <div className="pilot-product-coverage-stage-frame">
        {miniature ? (
          <div className="pilot-product-miniature-hero" aria-hidden>
            <div className="pilot-product-miniature-platform" />
            <Image
              src={miniature.src}
              alt=""
              width={miniature.width}
              height={miniature.height}
              quality={miniature.quality ?? 92}
              sizes={miniature.sizes ?? "(max-width: 767px) min(100vw, 360px), 560px"}
              className="pilot-product-miniature-image"
            />
          </div>
        ) : (
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
        )}

        <div className="pilot-product-coverage-scene" aria-hidden>
          <span
            className="pilot-product-scene-ambient"
            style={{
              background: `radial-gradient(ellipse 72% 58% at 50% 54%, color-mix(in srgb, ${accentColor} 18%, transparent) 0%, transparent 72%)`,
            }}
          />
        </div>
      </div>

      <div className="pilot-product-coverage-stage-caption">
        <span
          className="pilot-product-coverage-stage-icon"
          style={{
            color: accentColor,
            backgroundColor: `color-mix(in srgb, ${accentColor} 12%, #fff)`,
          }}
          aria-hidden
        >
          <ActiveIcon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div>
          <p className="pilot-product-coverage-stage-title">{active.visualCaption}</p>
          <p className="pilot-product-coverage-stage-sub">{active.visualSubcaption}</p>
        </div>
      </div>

      <p className="sr-only">
        {active.title}: {active.visualCaption}
      </p>
    </div>
  );
}

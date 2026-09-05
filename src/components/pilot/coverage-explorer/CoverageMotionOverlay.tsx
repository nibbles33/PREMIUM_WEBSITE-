"use client";

import Image from "next/image";
import type { ContainedImageInsets } from "@/hooks/useContainedImageInsets";
import type { CoverageMotionRecipe } from "@/types/coverage-motion";

type CoverageMotionOverlayProps = {
  recipe: CoverageMotionRecipe;
  motionKey: number;
  active: boolean;
  imageInsets?: ContainedImageInsets | null;
};

/**
 * Plays coverage-specific motion overlays after the state image crossfade completes.
 * Object layers render only when transparent `src` assets are provided.
 * Positions are relative to the rendered contained-image rectangle when insets are supplied.
 */
export default function CoverageMotionOverlay({
  recipe,
  motionKey,
  active,
  imageInsets,
}: CoverageMotionOverlayProps) {
  if (!active || recipe.type === "none") return null;

  const layersWithAssets =
    recipe.objectLayers?.filter((layer) => Boolean(layer.src)) ?? [];

  const overlayStyle = imageInsets
    ? {
        left: `${imageInsets.offsetX}px`,
        top: `${imageInsets.offsetY}px`,
        width: `${imageInsets.renderedWidth}px`,
        height: `${imageInsets.renderedHeight}px`,
        right: "auto",
        bottom: "auto",
      }
    : undefined;

  return (
    <div
      className={`pilot-ce-motion-overlay pilot-ce-motion-overlay--${recipe.type}`}
      data-motion-key={motionKey}
      style={overlayStyle}
      aria-hidden
    >
      {recipe.type === "vertical-reveal-settle" ? (
        <div className="pilot-ce-motion-property-reveal-shimmer" aria-hidden />
      ) : null}

      {layersWithAssets.map((layer) => (
        <div
          key={layer.id}
          className="pilot-ce-motion-object-layer"
          style={{
            left: layer.left,
            top: layer.top,
            width: layer.width,
            height: layer.height ?? "auto",
            animationDelay: `${layer.delayMs}ms`,
            animationDuration: `${layer.durationMs}ms`,
          }}
        >
          {layer.src ? (
            <Image
              src={layer.src}
              alt=""
              width={120}
              height={120}
              className="pilot-ce-motion-object-image"
            />
          ) : null}
        </div>
      ))}

      {recipe.type === "equipment-activate" && recipe.emphasisCenter ? (
        <div
          className="pilot-ce-motion-equipment-glow"
          style={{
            ["--ce-emphasis-x" as string]: recipe.emphasisCenter.x,
            ["--ce-emphasis-y" as string]: recipe.emphasisCenter.y,
          }}
        />
      ) : null}
    </div>
  );
}

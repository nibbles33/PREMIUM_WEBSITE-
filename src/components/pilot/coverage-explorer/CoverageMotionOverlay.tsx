"use client";

import Image from "next/image";
import type { CoverageMotionRecipe } from "@/types/coverage-motion";

type CoverageMotionOverlayProps = {
  recipe: CoverageMotionRecipe;
  motionKey: number;
  active: boolean;
};

/**
 * Plays coverage-specific motion overlays after the state image crossfade completes.
 * Object layers render only when transparent `src` assets are provided.
 */
export default function CoverageMotionOverlay({
  recipe,
  motionKey,
  active,
}: CoverageMotionOverlayProps) {
  if (!active || recipe.type === "none") return null;

  const layersWithAssets =
    recipe.objectLayers?.filter((layer) => Boolean(layer.src)) ?? [];

  return (
    <div
      className={`pilot-ce-motion-overlay pilot-ce-motion-overlay--${recipe.type}`}
      data-motion-key={motionKey}
      aria-hidden
    >
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

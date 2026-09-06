"use client";

import Image from "next/image";
import type { ContainedImageInsets } from "@/hooks/useContainedImageInsets";
import type { CoverageHandoffPhase, CoverageMotionRecipe } from "@/types/coverage-motion";
import { CONTRACTORS_STATE_IMAGE_DIMENSIONS } from "@/data/coverage-explorer/contractors-coverage-state-images";

type CoverageMotionOverlayProps = {
  recipe: CoverageMotionRecipe;
  motionKey: number;
  active: boolean;
  handoffPhase: CoverageHandoffPhase;
  imageInsets?: ContainedImageInsets | null;
};

const SCENE_WIDTH = CONTRACTORS_STATE_IMAGE_DIMENSIONS.width;
const SCENE_HEIGHT = CONTRACTORS_STATE_IMAGE_DIMENSIONS.height;

function renderObjectLayer(
  layer: NonNullable<CoverageMotionRecipe["objectLayers"]>[number],
  handoffPhase: CoverageHandoffPhase,
) {
  const isHandoff = handoffPhase === "handoff";
  const isFullCanvas = Boolean(layer.fullCanvas && layer.src);
  const layerClass = [
    "pilot-ce-motion-object-layer",
    isFullCanvas ? "pilot-ce-motion-object-layer--full-canvas" : "",
    layer.placeholder ? "pilot-ce-motion-object-layer--placeholder" : "",
    isHandoff ? "is-handoff-dissolve" : "pilot-ce-motion-object-layer--hold",
  ]
    .filter(Boolean)
    .join(" ");

  const layerStyle = isFullCanvas
    ? {
        animationDelay: `${layer.delayMs}ms`,
        animationDuration: `${layer.durationMs}ms`,
      }
    : {
        left: layer.left,
        top: layer.top,
        width: layer.width,
        height: layer.height ?? "auto",
        animationDelay: `${layer.delayMs}ms`,
        animationDuration: `${layer.durationMs}ms`,
      };

  return (
    <div
      key={layer.id}
      className={layerClass}
      data-object-id={layer.id}
      data-full-canvas={isFullCanvas ? "true" : "false"}
      data-placeholder={layer.placeholder ? "true" : "false"}
      style={layerStyle}
    >
      {layer.src ? (
        <Image
          src={layer.src}
          alt=""
          width={isFullCanvas ? SCENE_WIDTH : 120}
          height={isFullCanvas ? SCENE_HEIGHT : 120}
          className={`pilot-ce-motion-object-image${isFullCanvas ? " pilot-ce-motion-object-image--full-canvas" : ""}`}
        />
      ) : layer.placeholder ? (
        <div className="pilot-ce-motion-object-placeholder" aria-hidden>
          <span className="pilot-ce-motion-object-placeholder-label">
            {layer.placeholderLabel ?? layer.id}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Motion overlay for clean-bg choreography and handoff to final state image.
 * Full-canvas transparent PNGs composite at (0,0) over the clean background.
 */
export default function CoverageMotionOverlay({
  recipe,
  motionKey,
  active,
  handoffPhase,
  imageInsets,
}: CoverageMotionOverlayProps) {
  if (!active || recipe.type === "none") return null;

  const renderableLayers =
    recipe.objectLayers?.filter((layer) => layer.placeholder || layer.src) ?? [];

  const hasPlaceholderLayers = renderableLayers.some((layer) => layer.placeholder);

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

  const showChoreographyFx =
    handoffPhase === "choreography" || handoffPhase === "handoff";

  return (
    <div
      className={`pilot-ce-motion-overlay pilot-ce-motion-overlay--${recipe.type}${handoffPhase === "handoff" ? " is-handoff-active" : ""}`}
      data-motion-key={motionKey}
      data-handoff-phase={handoffPhase}
      data-asset-mode={hasPlaceholderLayers ? "placeholder" : "final"}
      style={overlayStyle}
      aria-hidden
    >
      {recipe.type === "vertical-reveal-settle" && showChoreographyFx ? (
        <div className="pilot-ce-motion-property-reveal-shimmer" aria-hidden />
      ) : null}

      {renderableLayers.map((layer) => renderObjectLayer(layer, handoffPhase))}

      {recipe.type === "equipment-activate" &&
      recipe.emphasisCenter &&
      showChoreographyFx ? (
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

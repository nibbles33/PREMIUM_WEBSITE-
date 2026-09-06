"use client";

import Image from "next/image";
import type { ContainedImageInsets } from "@/hooks/useContainedImageInsets";
import type { CoverageHandoffPhase, CoverageMotionRecipe } from "@/types/coverage-motion";

type CoverageMotionOverlayProps = {
  recipe: CoverageMotionRecipe;
  motionKey: number;
  active: boolean;
  handoffPhase: CoverageHandoffPhase;
  imageInsets?: ContainedImageInsets | null;
};

function renderObjectLayer(
  layer: NonNullable<CoverageMotionRecipe["objectLayers"]>[number],
  handoffPhase: CoverageHandoffPhase,
) {
  const isHandoff = handoffPhase === "handoff";
  const layerClass = [
    "pilot-ce-motion-object-layer",
    layer.placeholder ? "pilot-ce-motion-object-layer--placeholder" : "",
    isHandoff ? "is-handoff-dissolve" : "pilot-ce-motion-object-layer--hold",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      key={layer.id}
      className={layerClass}
      data-object-id={layer.id}
      data-placeholder={layer.placeholder ? "true" : "false"}
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
      ) : layer.placeholder ? (
        /* PLACEHOLDER: labeled stand-in — swap for transparent PNG via layer.src when art is ready */
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
 * PLACEHOLDER layers render until real transparent assets are supplied on objectLayers[].src.
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
      data-asset-mode={renderableLayers.some((l) => l.placeholder) ? "placeholder" : "final"}
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

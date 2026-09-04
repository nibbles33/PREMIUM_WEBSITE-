"use client";

import Image from "next/image";
import { MINIATURE_IMAGE_SIZES } from "@/data/coverage-explorer/miniature-assets";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type {
  CoverageExplorerVisualConfig,
  CoverageStateConfig,
  CoverageZoneConfig,
} from "@/types/coverage-explorer";

type CoverageVisualStageProps = {
  activeCoverageId: string;
  accentColor: string;
  visualEyebrow: string;
  visualCaption: string;
  visualSubcaption: string;
  explorer: CoverageExplorerVisualConfig;
  /** Screen-reader detail text */
  srDetail: string;
  /** Show caption row below stage */
  showCaption?: boolean;
};

function getActiveState(
  explorer: CoverageExplorerVisualConfig,
  coverageId: string,
): CoverageStateConfig | undefined {
  return (
    explorer.coverageStates.find((s) => s.coverageId === coverageId) ??
    explorer.coverageStates[0]
  );
}

function zoneStyle(
  zone: CoverageZoneConfig,
  isActive: boolean,
  reduceMotion: boolean,
): React.CSSProperties {
  const { position } = zone;
  return {
    top: position.top,
    left: position.left,
    right: position.right,
    bottom: position.bottom,
    width: position.width,
    height: position.height,
    transform: position.transform,
    transition: reduceMotion ? "none" : "opacity 320ms ease-out, box-shadow 380ms ease-out",
    opacity: isActive ? 1 : 0,
  };
}

export default function CoverageVisualStage({
  activeCoverageId,
  accentColor,
  visualEyebrow,
  visualCaption,
  visualSubcaption,
  explorer,
  srDetail,
  showCaption = true,
}: CoverageVisualStageProps) {
  const reduceMotion = usePrefersReducedMotion();
  const activeState = getActiveState(explorer, activeCoverageId);
  const activeZoneIds = new Set(activeState?.activeZoneIds ?? []);
  const sceneClass = explorer.cssSceneClass ?? explorer.visualFamily;
  const sceneModifier = activeState?.sceneModifier ?? activeCoverageId;
  const dimOpacity = activeState?.ambient?.dimOpacity ?? 0;

  return (
    <div className="pilot-ce-stage" aria-live="polite" aria-atomic="true">
      <p className="pilot-ce-stage-eyebrow">{visualEyebrow}</p>

      <div
        className={`pilot-ce-stage-frame pilot-ce-stage-frame--${sceneClass}`}
        data-scene={sceneModifier}
      >
        {explorer.sceneSrc && explorer.sceneMode === "cutaway-miniature" ? (
          <div className="pilot-ce-scene-cutaway" aria-hidden>
            <Image
              src={explorer.sceneSrc}
              alt=""
              width={explorer.sceneDimensions?.width ?? 1400}
              height={explorer.sceneDimensions?.height ?? 1200}
              sizes={MINIATURE_IMAGE_SIZES}
              quality={92}
              className="pilot-ce-scene-cutaway-image"
            />
          </div>
        ) : null}

        {explorer.sceneSrc && explorer.sceneMode === "photo-scene" ? (
          <div className="pilot-ce-scene-photo" aria-hidden>
            <Image
              src={explorer.sceneSrc}
              alt=""
              fill
              sizes="(max-width: 767px) min(100vw, 360px), 560px"
              quality={85}
              className="pilot-ce-scene-photo-image"
            />
            <span className="pilot-ce-scene-photo-scrim" />
          </div>
        ) : null}

        {explorer.sceneMode === "css-cutaway" && !explorer.sceneSrc ? (
          <div
            className={`pilot-ce-css-scene pilot-ce-css-scene--${sceneClass}`}
            aria-hidden
          />
        ) : null}

        {explorer.object ? (
          <div className="pilot-ce-object-hero" aria-hidden>
            <div className="pilot-ce-object-platform" />
            <div
              className={`pilot-ce-object-wrap${explorer.object.blendBackground ? " pilot-ce-object-wrap--blend" : ""}`}
            >
              <Image
                src={explorer.object.src}
                alt=""
                width={explorer.object.width}
                height={explorer.object.height}
                quality={explorer.object.quality ?? 92}
                sizes={
                  explorer.object.sizes ??
                  "(max-width: 767px) min(100vw, 360px), 560px"
                }
                className="pilot-ce-object-image"
                style={{
                  width: explorer.objectLayout?.width,
                  maxWidth: explorer.objectLayout?.maxWidth,
                  transform: explorer.objectLayout?.transform,
                }}
              />
            </div>
          </div>
        ) : null}

        <div
          className={`pilot-ce-scene-layers pilot-ce-scene-layers--${sceneClass} pilot-ce-scene-layers--${sceneModifier}`}
          aria-hidden
        >
          {dimOpacity > 0 ? (
            <span
              className="pilot-ce-scene-dim"
              style={{ opacity: dimOpacity }}
            />
          ) : null}

          <span
            className="pilot-ce-scene-ambient"
            style={{
              background:
                activeState?.ambient?.background ??
                `radial-gradient(ellipse 72% 58% at 50% 54%, color-mix(in srgb, ${accentColor} 14%, transparent) 0%, transparent 72%)`,
              transition: reduceMotion ? "none" : "background 380ms ease-out, opacity 320ms ease-out",
            }}
          />

          {explorer.zones.map((zone) => {
            const isActive = activeZoneIds.has(zone.id);
            const styleClass = zone.style ?? "glow";
            const shapeClass = zone.shape ?? zone.id;
            return (
              <span
                key={zone.id}
                className={`pilot-ce-zone pilot-ce-zone--${styleClass} pilot-ce-zone--${shapeClass}${isActive ? " is-active" : ""}`}
                style={zoneStyle(zone, isActive, reduceMotion)}
                data-label={zone.label}
              />
            );
          })}

          {activeState?.callouts?.map((callout) => (
            <span
              key={callout.id}
              className="pilot-ce-callout is-active"
              style={{
                top: callout.position.top,
                left: callout.position.left,
                right: callout.position.right,
                bottom: callout.position.bottom,
                transform: callout.position.transform,
              }}
            >
              {callout.text}
            </span>
          ))}
        </div>
      </div>

      {showCaption ? (
        <div className="pilot-ce-stage-caption">
          <div>
            <p className="pilot-ce-stage-title">{visualCaption}</p>
            <p className="pilot-ce-stage-sub">{visualSubcaption}</p>
          </div>
        </div>
      ) : null}

      <p className="sr-only">{srDetail}</p>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useId, useMemo } from "react";
import {
  getRestaurantHighlightEffect,
} from "@/data/coverage-explorer/restaurant-highlight-effects";
import type { CoverageSvgZoneConfig } from "@/types/coverage-explorer";

type MaskedIlluminationStageProps = {
  sceneSrc: string;
  sceneWidth: number;
  sceneHeight: number;
  sizes: string;
  activeCoverageId: string;
  svgZones: CoverageSvgZoneConfig[];
  reduceMotion: boolean;
};

function zonePathMap(zones: CoverageSvgZoneConfig[]): Map<string, string> {
  return new Map(zones.map((zone) => [zone.id, zone.path]));
}

function pathsForZones(
  zoneIds: string[],
  paths: Map<string, string>,
): string[] {
  return zoneIds.map((id) => paths.get(id)).filter(Boolean) as string[];
}

export default function MaskedIlluminationStage({
  sceneSrc,
  sceneWidth,
  sceneHeight,
  sizes,
  activeCoverageId,
  svgZones,
  reduceMotion,
}: MaskedIlluminationStageProps) {
  const uid = useId().replace(/:/g, "");
  const paths = useMemo(() => zonePathMap(svgZones), [svgZones]);
  const effect = getRestaurantHighlightEffect(activeCoverageId);

  const maskPaths = effect ? pathsForZones(effect.maskZoneIds, paths) : [];
  const pulsePaths = effect?.pulse
    ? pathsForZones(effect.pulse.zoneIds, paths)
    : [];
  const tracePaths = effect?.pathTrace
    ? pathsForZones(effect.pathTrace.zoneIds, paths)
    : [];

  const litMaskId = `ce-lit-${uid}`;
  const dimMaskId = `ce-dim-${uid}`;
  const glowFilterId = `ce-glow-${uid}`;
  const illumFilterId = `ce-illum-${uid}`;

  const transition = reduceMotion ? "none" : "opacity 380ms ease-out";
  const { brightness, contrast, saturate, sepia = 0 } =
    effect?.illumination ?? { brightness: 1, contrast: 1, saturate: 1 };

  return (
    <div
      className="pilot-ce-masked-scene"
      data-coverage={activeCoverageId}
      aria-hidden
    >
      {/* Base master — full scene, untouched */}
      <Image
        src={sceneSrc}
        alt=""
        width={sceneWidth}
        height={sceneHeight}
        sizes={sizes}
        quality={90}
        className="pilot-ce-masked-base-image"
        priority
      />

      {/* SVG compositing layer — dim, illuminated duplicate, edge effects */}
      <svg
        className="pilot-ce-masked-composite"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id={illumFilterId} x="-4%" y="-4%" width="108%" height="108%">
            <feComponentTransfer result="bright">
              <feFuncR type="linear" slope={brightness} intercept={(brightness - 1) * 0.08} />
              <feFuncG type="linear" slope={brightness} intercept={(brightness - 1) * 0.08} />
              <feFuncB type="linear" slope={brightness} intercept={(brightness - 1) * 0.08} />
            </feComponentTransfer>
            <feColorMatrix
              in="bright"
              type="matrix"
              values={`
                ${contrast} 0 0 0 0
                0 ${contrast} 0 0 0
                0 0 ${contrast} 0 0
                0 0 0 1 0`}
              result="contrasted"
            />
            <feColorMatrix
              in="contrasted"
              type="saturate"
              values={String(saturate)}
              result="saturated"
            />
            {sepia > 0 ? (
              <feColorMatrix
                in="saturated"
                type="matrix"
                values={`
                  ${1 - sepia * 0.2} ${sepia * 0.1} ${sepia * 0.05} 0 ${sepia * 0.04}
                  ${sepia * 0.05} ${1 - sepia * 0.15} ${sepia * 0.02} 0 ${sepia * 0.02}
                  ${sepia * 0.02} ${sepia * 0.05} ${1 - sepia * 0.25} 0 0
                  0 0 0 1 0`}
              />
            ) : null}
          </filter>

          <filter id={glowFilterId} x="-6%" y="-6%" width="112%" height="112%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={effect?.edgeGlow.blurStdDeviation ?? 0.5}
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <mask id={litMaskId} maskUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="black" />
            {maskPaths.map((path, index) => (
              <path key={`lit-${index}`} d={path} fill="white" />
            ))}
          </mask>

          <mask id={dimMaskId} maskUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="white" />
            {maskPaths.map((path, index) => (
              <path key={`dim-${index}`} d={path} fill="black" />
            ))}
          </mask>
        </defs>

        {/* Non-target dim — subtle, not blackout */}
        {effect && effect.dimOpacity > 0 ? (
          <rect
            width="100"
            height="100"
            fill={`rgba(32, 39, 40, ${Math.min(effect.dimOpacity, 0.16)})`}
            mask={`url(#${dimMaskId})`}
            className="pilot-ce-masked-dim-rect"
            style={{ transition }}
          />
        ) : null}

        {/* Masked duplicate — additive illumination via screen blend */}
        {effect && maskPaths.length > 0 ? (
          <g mask={`url(#${litMaskId})`} style={{ mixBlendMode: "screen" }}>
            <image
              href={sceneSrc}
              x="0"
              y="0"
              width="100"
              height="100"
              preserveAspectRatio="xMidYMid meet"
              filter={`url(#${illumFilterId})`}
              opacity="0.72"
              className="pilot-ce-masked-lit-svg-image"
              style={{ transition }}
            />
          </g>
        ) : null}

        {/* Warm edge bloom inside target — very subtle, stroke-only */}
        {effect &&
          maskPaths.map((path, index) => (
            <path
              key={`edge-${index}`}
              d={path}
              fill="none"
              stroke={`rgba(208, 173, 38, ${effect.edgeGlow.strokeOpacity})`}
              strokeWidth={effect.edgeGlow.strokeWidth}
              vectorEffect="non-scaling-stroke"
              filter={`url(#${glowFilterId})`}
              className="pilot-ce-masked-edge"
              style={{ transition }}
            />
          ))}

        {/* Equipment pulse — edge stroke only */}
        {effect?.pulse && !reduceMotion
          ? pulsePaths.map((path, index) => {
              const pulse = effect.pulse!;
              return (
              <path
                key={`pulse-${index}`}
                d={path}
                fill="none"
                stroke={`rgba(208, 173, 38, ${effect.edgeGlow.strokeOpacity * 1.15})`}
                strokeWidth={effect.edgeGlow.strokeWidth * 1.05}
                vectorEffect="non-scaling-stroke"
                className="pilot-ce-masked-pulse-edge"
                style={{
                  animationDuration: `${pulse.durationMs}ms`,
                }}
              />
              );
            })
          : null}

        {/* General liability perimeter trace */}
        {effect?.pathTrace
          ? tracePaths.map((path, index) => (
              <path
                key={`trace-${index}`}
                d={path}
                fill="none"
                stroke={`rgba(208, 173, 38, ${effect.pathTrace!.strokeOpacity})`}
                strokeWidth={effect.pathTrace!.strokeWidth}
                vectorEffect="non-scaling-stroke"
                strokeDasharray="1.8 1.4"
                className={`pilot-ce-masked-path-trace${reduceMotion ? " pilot-ce-masked-path-trace--static" : ""}`}
                style={
                  reduceMotion
                    ? undefined
                    : {
                        animationDuration: `${effect.pathTrace!.durationMs}ms`,
                      }
                }
              />
            ))
          : null}
      </svg>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CoverageMotionOverlay from "@/components/pilot/coverage-explorer/CoverageMotionOverlay";
import ImageMagnifierLens from "@/components/pilot/coverage-explorer/ImageMagnifierLens";
import { useContainedImageInsets } from "@/hooks/useContainedImageInsets";
import { useCoverageHandoffSequence } from "@/hooks/useCoverageHandoffSequence";
import { useFinePointerDevice } from "@/hooks/useFinePointerDevice";
import {
  preloadCoverageStateImage,
  usePreloadCoverageStateImages,
} from "@/hooks/usePreloadCoverageStateImages";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CoverageMotionRecipesByCoverageId } from "@/types/coverage-motion";

type CoverageStateImageStageProps = {
  baseSrc: string;
  activeCoverageId: string;
  stateImagesByCoverageId: Record<string, string>;
  sceneWidth: number;
  sceneHeight: number;
  sizes: string;
  hasInteracted: boolean;
  fallbackSrc: string;
  sceneClass?: string;
  enableMagnifier?: boolean;
  motionRecipes?: CoverageMotionRecipesByCoverageId;
  alwaysUseStateImages?: boolean;
};

function resolveTargetSrc(
  baseSrc: string,
  activeCoverageId: string,
  stateImagesByCoverageId: Record<string, string>,
  hasInteracted: boolean,
  fallbackSrc: string,
  alwaysUseStateImages: boolean,
): string {
  if (alwaysUseStateImages || hasInteracted) {
    return stateImagesByCoverageId[activeCoverageId] ?? fallbackSrc;
  }
  return baseSrc;
}

export default function CoverageStateImageStage({
  baseSrc,
  activeCoverageId,
  stateImagesByCoverageId,
  sceneWidth,
  sceneHeight,
  sizes,
  hasInteracted,
  fallbackSrc,
  sceneClass,
  enableMagnifier = false,
  motionRecipes,
  alwaysUseStateImages = false,
}: CoverageStateImageStageProps) {
  const reduceMotion = usePrefersReducedMotion();
  const finePointer = useFinePointerDevice();
  const showMagnifier = enableMagnifier && finePointer;
  const transitionMs = reduceMotion ? 80 : 400;
  const aspectRatio = sceneWidth / sceneHeight;
  const stackRef = useRef<HTMLDivElement>(null);

  usePreloadCoverageStateImages(Object.values(stateImagesByCoverageId), true);

  const motionPreloadUrls = useMemo(() => {
    if (!motionRecipes) return [];
    const urls = new Set<string>();
    for (const recipe of Object.values(motionRecipes)) {
      if (recipe.cleanBgSrc) urls.add(recipe.cleanBgSrc);
      for (const layer of recipe.objectLayers ?? []) {
        if (layer.src) urls.add(layer.src);
      }
    }
    return [...urls];
  }, [motionRecipes]);
  usePreloadCoverageStateImages(motionPreloadUrls, motionPreloadUrls.length > 0);

  const initialSrc = resolveTargetSrc(
    baseSrc,
    activeCoverageId,
    stateImagesByCoverageId,
    hasInteracted,
    fallbackSrc,
    alwaysUseStateImages,
  );

  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [nextSrc, setNextSrc] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const transitionGen = useRef(0);
  const visibleSrcRef = useRef(initialSrc);

  const recipe = motionRecipes?.[activeCoverageId];
  const finalSrc = resolveTargetSrc(
    baseSrc,
    activeCoverageId,
    stateImagesByCoverageId,
    hasInteracted,
    fallbackSrc,
    alwaysUseStateImages,
  );

  const imageInsets = useContainedImageInsets(
    stackRef,
    sceneWidth,
    sceneHeight,
    [activeCoverageId, currentSrc, hasInteracted],
  );

  const isCrossfading = Boolean(nextSrc);
  const magnifierSrc = showNext && nextSrc ? nextSrc : currentSrc;
  const isMagnifierTransitioning = isCrossfading;

  const crossfadeTo = useCallback(
    (targetSrc: string, durationMs: number): Promise<void> =>
      new Promise((resolve) => {
        const gen = ++transitionGen.current;

        void preloadCoverageStateImage(targetSrc).then(() => {
          if (gen !== transitionGen.current) {
            resolve();
            return;
          }

          setNextSrc(targetSrc);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (gen !== transitionGen.current) {
                resolve();
                return;
              }
              setShowNext(true);
            });
          });

          window.setTimeout(() => {
            if (gen !== transitionGen.current) {
              resolve();
              return;
            }
            visibleSrcRef.current = targetSrc;
            setCurrentSrc(targetSrc);
            setNextSrc(null);
            setShowNext(false);
            resolve();
          }, durationMs + 30);
        });
      }),
    [],
  );

  const handoff = useCoverageHandoffSequence({
    activeCoverageId,
    finalSrc,
    recipe,
    reduceMotion,
    transitionMs,
    enabled: Boolean(motionRecipes),
    onPreload: preloadCoverageStateImage,
    crossfadeTo,
  });

  const dismissHint = useCallback(() => {
    setHintDismissed(true);
  }, []);

  useEffect(() => {
    if (handoff.usesHandoff) return;

    const targetSrc = finalSrc;
    if (targetSrc === visibleSrcRef.current) return;

    const gen = ++transitionGen.current;

    async function loadAndTransition() {
      let resolved = targetSrc;
      try {
        await preloadCoverageStateImage(targetSrc);
      } catch {
        try {
          await preloadCoverageStateImage(fallbackSrc);
        } catch {
          /* use fallback path anyway */
        }
        resolved = fallbackSrc;
      }

      if (gen !== transitionGen.current) return;
      if (resolved === visibleSrcRef.current) return;

      setNextSrc(resolved);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (gen !== transitionGen.current) return;
          setShowNext(true);
        });
      });

      window.setTimeout(() => {
        if (gen !== transitionGen.current) return;
        visibleSrcRef.current = resolved;
        setCurrentSrc(resolved);
        setNextSrc(null);
        setShowNext(false);
      }, transitionMs + 30);
    }

    void loadAndTransition();
  }, [activeCoverageId, fallbackSrc, finalSrc, handoff.usesHandoff, transitionMs]);

  const handleError = (failedSrc: string) => {
    if (failedSrc === fallbackSrc) return;
    const gen = ++transitionGen.current;
    void preloadCoverageStateImage(fallbackSrc).then(() => {
      if (gen !== transitionGen.current) return;
      visibleSrcRef.current = fallbackSrc;
      setCurrentSrc(fallbackSrc);
      setNextSrc(null);
      setShowNext(false);
    });
  };

  const transition = `opacity ${transitionMs}ms ease-in-out`;
  const containImageStyle = {
    objectFit: "contain" as const,
    objectPosition: "center center",
  };

  const motionPlaying =
    handoff.choreographyActive ||
    handoff.phase === "handoff" ||
    handoff.phase === "choreography" ||
    handoff.phase === "clean-transition";

  return (
    <div
      className={`pilot-ce-state-image-stage${sceneClass ? ` pilot-ce-state-image-stage--${sceneClass}` : ""}`}
      data-coverage={activeCoverageId}
      data-interacted={hasInteracted ? "true" : "false"}
      data-magnifier={showMagnifier ? "enabled" : "disabled"}
      data-motion={motionPlaying ? "playing" : "idle"}
      data-handoff-phase={handoff.phase}
      data-asset-mode={handoff.assetMode}
      data-handoff-confidence={handoff.alignmentConfidence}
      style={{ ["--ce-aspect" as string]: String(aspectRatio) }}
      aria-hidden
    >
      <div ref={stackRef} className="pilot-ce-state-image-stack">
        <Image
          src={currentSrc}
          alt=""
          width={sceneWidth}
          height={sceneHeight}
          sizes={sizes}
          quality={90}
          priority
          className="pilot-ce-state-image pilot-ce-state-image--current"
          style={{
            ...containImageStyle,
            opacity: showNext ? 0 : 1,
            transition,
          }}
          onError={() => handleError(currentSrc)}
        />
        {nextSrc ? (
          <Image
            src={nextSrc}
            alt=""
            width={sceneWidth}
            height={sceneHeight}
            sizes={sizes}
            quality={90}
            className="pilot-ce-state-image pilot-ce-state-image--next"
            style={{
              ...containImageStyle,
              opacity: showNext ? 1 : 0,
              transition,
            }}
            onError={() => handleError(nextSrc)}
          />
        ) : null}
        {recipe && motionRecipes ? (
          <CoverageMotionOverlay
            recipe={recipe}
            motionKey={handoff.motionKey}
            active={motionPlaying}
            handoffPhase={handoff.phase}
            imageInsets={imageInsets}
          />
        ) : null}
        {showMagnifier ? (
          <ImageMagnifierLens
            containerRef={stackRef}
            imageSrc={magnifierSrc}
            sourceWidth={sceneWidth}
            sourceHeight={sceneHeight}
            isTransitioning={isMagnifierTransitioning}
            onFirstActivate={dismissHint}
          />
        ) : null}
      </div>
      {showMagnifier ? (
        <p
          className={`pilot-ce-magnifier-hint${hintDismissed ? " is-dismissed" : ""}`}
          aria-hidden
        >
          Hover to explore details
        </p>
      ) : null}
    </div>
  );
}

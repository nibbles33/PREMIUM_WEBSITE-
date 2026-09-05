"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ImageMagnifierLens from "@/components/pilot/coverage-explorer/ImageMagnifierLens";
import { useFinePointerDevice } from "@/hooks/useFinePointerDevice";
import {
  preloadCoverageStateImage,
  usePreloadCoverageStateImages,
} from "@/hooks/usePreloadCoverageStateImages";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CoverageStateImageStageProps = {
  baseSrc: string;
  activeCoverageId: string;
  stateImagesByCoverageId: Record<string, string>;
  sceneWidth: number;
  sceneHeight: number;
  sizes: string;
  hasInteracted: boolean;
  fallbackSrc: string;
  /** Restaurant prototype: desktop hover magnifier */
  enableMagnifier?: boolean;
};

function resolveTargetSrc(
  baseSrc: string,
  activeCoverageId: string,
  stateImagesByCoverageId: Record<string, string>,
  hasInteracted: boolean,
  fallbackSrc: string,
): string {
  if (!hasInteracted) return baseSrc;
  return stateImagesByCoverageId[activeCoverageId] ?? fallbackSrc;
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
  enableMagnifier = false,
}: CoverageStateImageStageProps) {
  const reduceMotion = usePrefersReducedMotion();
  const finePointer = useFinePointerDevice();
  const showMagnifier = enableMagnifier && finePointer;
  const transitionMs = reduceMotion ? 80 : 400;
  const aspectRatio = sceneWidth / sceneHeight;
  const stackRef = useRef<HTMLDivElement>(null);

  usePreloadCoverageStateImages(Object.values(stateImagesByCoverageId), true);

  const [currentSrc, setCurrentSrc] = useState(baseSrc);
  const [nextSrc, setNextSrc] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const transitionGen = useRef(0);
  const visibleSrcRef = useRef(baseSrc);

  const magnifierSrc = showNext && nextSrc ? nextSrc : currentSrc;
  const isMagnifierTransitioning = Boolean(nextSrc);

  const dismissHint = useCallback(() => {
    setHintDismissed(true);
  }, []);

  useEffect(() => {
    const targetSrc = resolveTargetSrc(
      baseSrc,
      activeCoverageId,
      stateImagesByCoverageId,
      hasInteracted,
      fallbackSrc,
    );

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
  }, [
    activeCoverageId,
    baseSrc,
    fallbackSrc,
    hasInteracted,
    stateImagesByCoverageId,
    transitionMs,
  ]);

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

  return (
    <div
      className="pilot-ce-state-image-stage"
      data-coverage={activeCoverageId}
      data-interacted={hasInteracted ? "true" : "false"}
      data-magnifier={showMagnifier ? "enabled" : "disabled"}
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
              opacity: showNext ? 1 : 0,
              transition,
            }}
            onError={() => handleError(nextSrc)}
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

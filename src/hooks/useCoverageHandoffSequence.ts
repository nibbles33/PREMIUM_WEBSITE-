"use client";

import { useEffect, useRef, useState } from "react";
import type {
  CoverageHandoffPhase,
  CoverageMotionRecipe,
} from "@/types/coverage-motion";

type CrossfadeFn = (targetSrc: string, durationMs: number) => Promise<void>;

type UseCoverageHandoffSequenceArgs = {
  activeCoverageId: string;
  finalSrc: string;
  recipe?: CoverageMotionRecipe;
  reduceMotion: boolean;
  transitionMs: number;
  enabled: boolean;
  onPreload: (src: string) => Promise<void>;
  crossfadeTo: CrossfadeFn;
};

/**
 * Orchestrates clean-background → staggered object choreography → crossfade to final state.
 * Cancels safely on rapid tab switching via generation counter.
 */
export function useCoverageHandoffSequence({
  activeCoverageId,
  finalSrc,
  recipe,
  reduceMotion,
  transitionMs,
  enabled,
  onPreload,
  crossfadeTo,
}: UseCoverageHandoffSequenceArgs) {
  const [phase, setPhase] = useState<CoverageHandoffPhase>("idle");
  const [choreographyActive, setChoreographyActive] = useState(false);
  const [motionKey, setMotionKey] = useState(0);
  const sequenceGenRef = useRef(0);

  const usesHandoff =
    enabled &&
    Boolean(recipe?.cleanBgSrc) &&
    recipe?.handoffAtMs != null &&
    recipe.handoffAtMs >= 0;

  useEffect(() => {
    sequenceGenRef.current += 1;
    setPhase("idle");
    setChoreographyActive(false);
  }, [activeCoverageId]);

  useEffect(() => {
    if (!usesHandoff || !recipe?.cleanBgSrc) {
      setPhase("idle");
      setChoreographyActive(false);
      return;
    }

    const gen = ++sequenceGenRef.current;
    const activeRecipe = recipe;
    const cleanBgSrc = activeRecipe.cleanBgSrc as string;
    const handoffAtMs = activeRecipe.handoffAtMs ?? 0;
    const handoffDurationMs = activeRecipe.handoffDurationMs ?? transitionMs;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    async function runSequence() {
      const objectSrcs =
        activeRecipe.objectLayers
          ?.map((layer) => layer.src)
          .filter((src): src is string => Boolean(src)) ?? [];

      try {
        await onPreload(cleanBgSrc);
        await Promise.all([...objectSrcs.map(onPreload), onPreload(finalSrc)]);
      } catch {
        /* proceed with crossfade attempt */
      }

      if (gen !== sequenceGenRef.current) return;

      if (reduceMotion) {
        await crossfadeTo(finalSrc, transitionMs);
        if (gen !== sequenceGenRef.current) return;
        setPhase("settled");
        setChoreographyActive(false);
        return;
      }

      setPhase("clean-transition");
      setChoreographyActive(false);
      await crossfadeTo(cleanBgSrc, transitionMs);
      if (gen !== sequenceGenRef.current) return;

      setPhase("choreography");
      setMotionKey((k) => k + 1);
      setChoreographyActive(true);
      await wait(handoffAtMs);
      if (gen !== sequenceGenRef.current) return;

      setPhase("handoff");
      await crossfadeTo(finalSrc, handoffDurationMs);
      if (gen !== sequenceGenRef.current) return;

      setChoreographyActive(false);
      setPhase("settled");
    }

    void runSequence();

    return () => {
      sequenceGenRef.current += 1;
    };
  }, [
    activeCoverageId,
    crossfadeTo,
    finalSrc,
    onPreload,
    recipe,
    reduceMotion,
    transitionMs,
    usesHandoff,
  ]);

  const hasPlaceholderLayers = Boolean(
    recipe?.objectLayers?.some((layer) => layer.placeholder),
  );

  return {
    phase,
    choreographyActive,
    motionKey,
    usesHandoff,
    alignmentConfidence: recipe?.handoffAlignmentConfidence ?? "low",
    assetMode: usesHandoff && hasPlaceholderLayers ? ("placeholder" as const) : ("final" as const),
  };
}

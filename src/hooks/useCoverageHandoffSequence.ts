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
  const reduceMotionRef = useRef(reduceMotion);
  const transitionMsRef = useRef(transitionMs);

  reduceMotionRef.current = reduceMotion;
  transitionMsRef.current = transitionMs;

  const usesHandoff =
    enabled &&
    Boolean(recipe?.cleanBgSrc) &&
    recipe?.handoffAtMs != null &&
    recipe.handoffAtMs >= 0;

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
    const handoffDurationMs = activeRecipe.handoffDurationMs ?? transitionMsRef.current;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    async function runSequence() {
      const objectSrcs =
        activeRecipe.objectLayers
          ?.map((layer) => layer.src)
          .filter((src): src is string => Boolean(src)) ?? [];

      setPhase("idle");
      setChoreographyActive(false);

      try {
        await onPreload(cleanBgSrc);
        await Promise.all([...objectSrcs.map(onPreload), onPreload(finalSrc)]);
      } catch {
        /* proceed with crossfade attempt */
      }

      if (gen !== sequenceGenRef.current) return;

      const prefersReducedMotion = reduceMotionRef.current;
      const crossfadeMs = transitionMsRef.current;

      if (prefersReducedMotion) {
        await crossfadeTo(finalSrc, crossfadeMs);
        if (gen !== sequenceGenRef.current) return;
        setPhase("settled");
        setChoreographyActive(false);
        return;
      }

      setPhase("clean-transition");
      setChoreographyActive(false);
      await crossfadeTo(cleanBgSrc, crossfadeMs);
      if (gen !== sequenceGenRef.current) return;

      // Brief hold on clean background so the scene change reads before objects enter.
      await wait(180);
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
  }, [activeCoverageId, crossfadeTo, finalSrc, onPreload, recipe, usesHandoff]);

  const hasPlaceholderLayers = Boolean(
    recipe?.objectLayers?.some((layer) => layer.placeholder),
  );

  const isHandoffBusy =
    usesHandoff &&
    phase !== "idle" &&
    phase !== "settled";

  return {
    phase,
    choreographyActive,
    motionKey,
    usesHandoff,
    isHandoffBusy,
    alignmentConfidence: recipe?.handoffAlignmentConfidence ?? "low",
    assetMode: usesHandoff && hasPlaceholderLayers ? ("placeholder" as const) : ("final" as const),
  };
}

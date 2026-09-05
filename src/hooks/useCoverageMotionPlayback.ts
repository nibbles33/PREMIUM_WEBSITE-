"use client";

import { useEffect, useRef, useState } from "react";
import type { CoverageMotionRecipe, CoverageMotionRecipesByCoverageId } from "@/types/coverage-motion";

type UseCoverageMotionPlaybackArgs = {
  activeCoverageId: string;
  motionRecipes?: CoverageMotionRecipesByCoverageId;
  isCrossfading: boolean;
  hasInteracted: boolean;
  reduceMotion: boolean;
};

export function useCoverageMotionPlayback({
  activeCoverageId,
  motionRecipes,
  isCrossfading,
  hasInteracted,
  reduceMotion,
}: UseCoverageMotionPlaybackArgs) {
  const [motionActive, setMotionActive] = useState(false);
  const [motionKey, setMotionKey] = useState(0);
  const motionGenRef = useRef(0);
  const settleGenRef = useRef(0);

  const recipe: CoverageMotionRecipe | undefined =
    motionRecipes?.[activeCoverageId];

  useEffect(() => {
    motionGenRef.current += 1;
    setMotionActive(false);
  }, [activeCoverageId]);

  useEffect(() => {
    if (!hasInteracted || isCrossfading || reduceMotion) {
      setMotionActive(false);
      return;
    }
    if (!recipe || recipe.type === "none") {
      setMotionActive(false);
      return;
    }

    const settleGen = ++settleGenRef.current;
    const motionGen = ++motionGenRef.current;

    const startTimer = window.setTimeout(() => {
      if (settleGen !== settleGenRef.current || motionGen !== motionGenRef.current) {
        return;
      }
      setMotionKey((k) => k + 1);
      setMotionActive(true);

      window.setTimeout(() => {
        if (motionGen !== motionGenRef.current) return;
        setMotionActive(false);
      }, recipe.durationMs);
    }, 40);

    return () => window.clearTimeout(startTimer);
  }, [
    activeCoverageId,
    hasInteracted,
    isCrossfading,
    recipe,
    reduceMotion,
  ]);

  const imageMotionClass =
    motionActive && recipe?.type === "vertical-reveal-settle"
      ? "pilot-ce-state-image--motion-vertical-reveal"
      : motionActive && recipe?.type === "equipment-activate"
        ? "pilot-ce-state-image--motion-equipment-settle"
        : "";

  return {
    motionActive,
    motionKey,
    recipe,
    imageMotionClass,
  };
}

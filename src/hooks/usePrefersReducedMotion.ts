"use client";

import { useEffect, useState } from "react";

/**
 * Defaults to false so SSR/hydration don't permanently disable motion
 * when the effect hasn't run yet. CSS media queries still hard-stop
 * animations under prefers-reduced-motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

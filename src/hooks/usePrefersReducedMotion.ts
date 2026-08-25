"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  // Default true until we can read matchMedia — avoids a motion flash
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

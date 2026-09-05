"use client";

import { useEffect, useRef } from "react";

/** Preload coverage state images via off-DOM Image objects. */
export function usePreloadCoverageStateImages(urls: string[], enabled: boolean) {
  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled || urls.length === 0) return;

    for (const url of urls) {
      if (preloadedRef.current.has(url)) continue;
      const img = new window.Image();
      img.decoding = "async";
      img.src = url;
      preloadedRef.current.add(url);
    }
  }, [urls, enabled]);
}

export function preloadCoverageStateImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload ${url}`));
    img.src = url;
  });
}

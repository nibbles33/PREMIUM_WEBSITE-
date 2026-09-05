"use client";

import { useEffect, useState, type RefObject } from "react";
import { getContainedImageRect } from "@/lib/image-magnifier/getContainedImageRect";

export type ContainedImageInsets = {
  offsetX: number;
  offsetY: number;
  renderedWidth: number;
  renderedHeight: number;
};

/**
 * Track the rendered letterboxed image rectangle inside a container.
 * Used to align motion overlays with object-fit: contain geometry.
 */
export function useContainedImageInsets(
  containerRef: RefObject<HTMLElement | null>,
  sourceWidth: number,
  sourceHeight: number,
  deps: unknown[] = [],
): ContainedImageInsets | null {
  const [insets, setInsets] = useState<ContainedImageInsets | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const imageRect = getContainedImageRect(
        rect.width,
        rect.height,
        sourceWidth,
        sourceHeight,
      );
      setInsets({
        offsetX: imageRect.offsetX,
        offsetY: imageRect.offsetY,
        renderedWidth: imageRect.renderedWidth,
        renderedHeight: imageRect.renderedHeight,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [containerRef, sourceWidth, sourceHeight, ...deps]);

  return insets;
}

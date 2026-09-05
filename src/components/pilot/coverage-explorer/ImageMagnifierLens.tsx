"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  clampLensCenter,
  getContainedImageRect,
  magnifierBackgroundStyle,
  pointerToImageCoords,
} from "@/lib/image-magnifier/getContainedImageRect";

const DEFAULT_DIAMETER = 200;
const DEFAULT_ZOOM = 1.9;

type ImageMagnifierLensProps = {
  containerRef: React.RefObject<HTMLElement | null>;
  imageSrc: string;
  sourceWidth: number;
  sourceHeight: number;
  /** Hide lens while the base image crossfades to a new coverage state. */
  isTransitioning: boolean;
  diameter?: number;
  zoom?: number;
  onFirstActivate?: () => void;
};

export default function ImageMagnifierLens({
  containerRef,
  imageSrc,
  sourceWidth,
  sourceHeight,
  isTransitioning,
  diameter = DEFAULT_DIAMETER,
  zoom = DEFAULT_ZOOM,
  onFirstActivate,
}: ImageMagnifierLensProps) {
  const reduceMotion = usePrefersReducedMotion();
  const lensRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pointerInsideRef = useRef(false);
  const pointerRef = useRef({ clientX: 0, clientY: 0 });
  const activatedRef = useRef(false);
  const radius = diameter / 2;

  const paintLens = useCallback(() => {
    const container = containerRef.current;
    const lens = lensRef.current;
    if (!container || !lens) return;

    const containerRect = container.getBoundingClientRect();
    const imageRect = getContainedImageRect(
      containerRect.width,
      containerRect.height,
      sourceWidth,
      sourceHeight,
    );

    const { relX, relY, inside, localX, localY } = pointerToImageCoords(
      pointerRef.current.clientX,
      pointerRef.current.clientY,
      containerRect,
      imageRect,
    );

    const shouldShow =
      pointerInsideRef.current && inside && !isTransitioning && Boolean(imageSrc);

    if (!shouldShow) {
      lens.style.opacity = "0";
      lens.style.visibility = "hidden";
      return;
    }

    if (!activatedRef.current) {
      activatedRef.current = true;
      onFirstActivate?.();
    }

    const { x, y } = clampLensCenter(
      localX,
      localY,
      containerRect.width,
      containerRect.height,
      radius,
    );

    const bg = magnifierBackgroundStyle(
      relX,
      relY,
      imageRect.renderedWidth,
      imageRect.renderedHeight,
      radius,
      zoom,
    );

    lens.style.visibility = "visible";
    lens.style.opacity = "1";
    lens.style.width = `${diameter}px`;
    lens.style.height = `${diameter}px`;
    lens.style.transform = `translate3d(${x - radius}px, ${y - radius}px, 0)`;
    lens.style.backgroundImage = `url("${imageSrc}")`;
    lens.style.backgroundSize = bg.backgroundSize;
    lens.style.backgroundPosition = bg.backgroundPosition;
  }, [
    containerRef,
    diameter,
    imageSrc,
    isTransitioning,
    onFirstActivate,
    radius,
    sourceHeight,
    sourceWidth,
    zoom,
  ]);

  const schedulePaint = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(paintLens);
  }, [paintLens]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerEnter = (event: PointerEvent) => {
      pointerInsideRef.current = true;
      pointerRef.current = { clientX: event.clientX, clientY: event.clientY };
      schedulePaint();
    };

    const handlePointerLeave = () => {
      pointerInsideRef.current = false;
      schedulePaint();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { clientX: event.clientX, clientY: event.clientY };
      schedulePaint();
    };

    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("pointermove", handlePointerMove);

    const resizeObserver = new ResizeObserver(() => schedulePaint());
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, schedulePaint]);

  useEffect(() => {
    schedulePaint();
  }, [imageSrc, isTransitioning, schedulePaint]);

  return (
    <div
      ref={lensRef}
      className="pilot-ce-magnifier-lens"
      aria-hidden
      data-reduced-motion={reduceMotion ? "true" : "false"}
    />
  );
}

export { DEFAULT_DIAMETER, DEFAULT_ZOOM };

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
  type WheelEvent,
} from "react";

type RelatedProductsScrollRailProps = {
  variant: "auto" | "product";
  children: ReactNode;
  className?: string;
};

function railClass(variant: RelatedProductsScrollRailProps["variant"], part: string) {
  return variant === "auto" ? `pilot-auto-related-${part}` : `pilot-product-related-${part}`;
}

export default function RelatedProductsScrollRail({
  variant,
  children,
  className,
}: RelatedProductsScrollRailProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const dragState = useRef<{ active: boolean; startX: number; scrollLeft: number }>({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);

    return () => observer.disconnect();
  }, [updateScrollState, children]);

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector("li");
    const cardWidth = card?.getBoundingClientRect().width ?? 340;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "26") || 26;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  }, []);

  const onWheel = useCallback((event: WheelEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    track.scrollBy({ left: event.deltaY });
  }, []);

  const onPointerDown = useCallback((event: PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || event.button !== 0) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;

    const delta = event.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.scrollLeft - delta;
  }, []);

  const endDrag = useCallback((event: PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;

    dragState.current.active = false;
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }, []);

  const showControls = canScrollPrev || canScrollNext;

  return (
    <div className={`pilot-related-rail-shell ${className ?? ""}`.trim()}>
      {showControls ? (
        <button
          type="button"
          className="pilot-related-rail-nav pilot-related-rail-nav-prev"
          aria-label="Show previous related products"
          disabled={!canScrollPrev}
          onClick={() => scrollByPage(-1)}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
      ) : null}

      <div className={railClass(variant, "rail")}>
        <ul
          ref={trackRef}
          className={`${railClass(variant, "track")} pilot-scroll-hide pilot-related-rail-track`}
          onScroll={updateScrollState}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {children}
        </ul>
      </div>

      {showControls ? (
        <button
          type="button"
          className="pilot-related-rail-nav pilot-related-rail-nav-next"
          aria-label="Show next related products"
          disabled={!canScrollNext}
          onClick={() => scrollByPage(1)}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  activatePointerDragIfNeeded,
  createPointerDragSession,
  idlePointerDragSession,
  suppressClickAfterDrag,
  type PointerDragSession,
} from "@/lib/pointerDragGuard";

export type TransformRailSpeed = {
  normal: number;
  reduced: number;
  mobile?: number;
  mobileReduced?: number;
};

type UseTransformInfiniteRailOptions = {
  itemCount: number;
  loopCopies?: number;
  speed: TransformRailSpeed;
  inactivityResumeMs?: number;
  /** When true, release velocity continues the rail briefly (premium momentum). */
  enableMomentum?: boolean;
  /** Disable autoplay entirely (e.g. reduced-motion manual-only mode). */
  disableAutoplay?: boolean;
};

function normalizeOffsetLtr(offset: number, setWidth: number) {
  if (setWidth <= 0) return 0;
  let next = offset;
  while (next >= 0) next -= setWidth;
  while (next < -setWidth) next += setWidth;
  if (next === 0) next = -setWidth;
  return next;
}

function prefersReducedMotionNow() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileViewportNow() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function useTransformInfiniteRail({
  itemCount,
  loopCopies = 2,
  speed,
  inactivityResumeMs = 3500,
  enableMomentum = true,
  disableAutoplay = false,
}: UseTransformInfiniteRailOptions) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const frameStepRef = useRef(0);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const userControlRef = useRef(false);
  const momentumVelocityRef = useRef(0);
  const lastMoveRef = useRef({ x: 0, t: 0 });
  const dragSession = useRef<PointerDragSession & { offset: number }>({
    ...idlePointerDragSession(),
    offset: 0,
  });
  const resumeTimerRef = useRef<number | null>(null);
  const offsetInitializedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentScrollSpeed = useCallback(() => {
    const reduced = prefersReducedMotionNow();
    const mobile = isMobileViewportNow();
    if (reduced) {
      return mobile
        ? (speed.mobileReduced ?? speed.reduced)
        : speed.reduced;
    }
    return mobile ? (speed.mobile ?? speed.normal) : speed.normal;
  }, [speed]);

  const applyTransform = useCallback((offset: number) => {
    const inner = innerRef.current;
    if (!inner) return;
    const aligned = Math.round(offset * 2) / 2;
    inner.style.transform = `translate3d(${aligned}px, 0, 0)`;
  }, []);

  const updateActiveIndex = useCallback(() => {
    const step = frameStepRef.current;
    const setWidth = setWidthRef.current;
    if (step <= 0 || setWidth <= 0 || itemCount <= 0) return;
    const progress = offsetRef.current + setWidth;
    const index = Math.round(progress / step) % itemCount;
    setActiveIndex((index + itemCount) % itemCount);
  }, [itemCount]);

  const measure = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return false;
    const total = inner.scrollWidth;
    if (total <= 0) return false;
    const setWidth = total / loopCopies;
    setWidthRef.current = setWidth;
    frameStepRef.current = itemCount > 0 ? setWidth / itemCount : 0;
    if (!offsetInitializedRef.current) {
      offsetRef.current = -setWidth;
      offsetInitializedRef.current = true;
    }
    offsetRef.current = normalizeOffsetLtr(offsetRef.current, setWidth);
    applyTransform(offsetRef.current);
    updateActiveIndex();
    return true;
  }, [applyTransform, itemCount, loopCopies, updateActiveIndex]);

  const ensureMeasured = useCallback(() => {
    if (frameStepRef.current > 0) return true;
    if (measure()) return true;
    void innerRef.current?.offsetHeight;
    return measure();
  }, [measure]);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    measure();

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(inner);

    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  const pauseAuto = useCallback(() => {
    userControlRef.current = true;
    isPausedRef.current = true;
    momentumVelocityRef.current = 0;
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      userControlRef.current = false;
      isPausedRef.current = false;
    }, inactivityResumeMs);
  }, [inactivityResumeMs]);

  useEffect(() => {
    if (disableAutoplay) return undefined;

    let raf = 0;

    const tick = () => {
      const setWidth = setWidthRef.current;
      const canAuto =
        setWidth > 0 &&
        !isPausedRef.current &&
        !isDraggingRef.current &&
        !userControlRef.current;

      if (canAuto && Math.abs(momentumVelocityRef.current) < 0.05) {
        offsetRef.current += currentScrollSpeed();
        offsetRef.current = normalizeOffsetLtr(offsetRef.current, setWidth);
        applyTransform(offsetRef.current);
        updateActiveIndex();
      } else if (
        setWidth > 0 &&
        !isDraggingRef.current &&
        Math.abs(momentumVelocityRef.current) >= 0.05
      ) {
        offsetRef.current += momentumVelocityRef.current;
        momentumVelocityRef.current *= 0.94;
        offsetRef.current = normalizeOffsetLtr(offsetRef.current, setWidth);
        applyTransform(offsetRef.current);
        updateActiveIndex();
        if (Math.abs(momentumVelocityRef.current) < 0.05) {
          momentumVelocityRef.current = 0;
          pauseAuto();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    applyTransform,
    currentScrollSpeed,
    disableAutoplay,
    pauseAuto,
    updateActiveIndex,
  ]);

  const nudge = useCallback(
    (direction: -1 | 1) => {
      if (!ensureMeasured()) return;
      pauseAuto();
      const step = frameStepRef.current;
      offsetRef.current = normalizeOffsetLtr(
        offsetRef.current + direction * step,
        setWidthRef.current,
      );
      applyTransform(offsetRef.current);
      updateActiveIndex();
    },
    [applyTransform, ensureMeasured, pauseAuto, updateActiveIndex],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent) => {
    if (!ensureMeasured() || event.button !== 0) return;
    pauseAuto();
    momentumVelocityRef.current = 0;
    lastMoveRef.current = { x: event.clientX, t: performance.now() };
    dragSession.current = {
      ...createPointerDragSession(event.pointerId, event.clientX, event.clientY),
      offset: offsetRef.current,
    };
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    const session = dragSession.current;
    if (!session.pending && !session.active) return;

    const viewport = viewportRef.current;
    if (
      activatePointerDragIfNeeded(session, event.clientX, event.clientY) &&
      viewport &&
      !viewport.hasPointerCapture(event.pointerId)
    ) {
      isDraggingRef.current = true;
      setIsDragging(true);
      viewport.setPointerCapture(event.pointerId);
    }

    if (!session.active) return;

    const now = performance.now();
    const dt = Math.max(now - lastMoveRef.current.t, 1);
    const dx = event.clientX - lastMoveRef.current.x;
    momentumVelocityRef.current = dx / dt;
    lastMoveRef.current = { x: event.clientX, t: now };

    const delta = event.clientX - session.startX;
    offsetRef.current = normalizeOffsetLtr(
      session.offset + delta,
      setWidthRef.current,
    );
    applyTransform(offsetRef.current);
    updateActiveIndex();
  };

  const endDrag = (event: ReactPointerEvent) => {
    const session = dragSession.current;
    const viewport = viewportRef.current;
    if (!session.pending && !session.active) return;

    if (session.active && viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    if (session.suppressClick) {
      suppressClickAfterDrag(viewport);
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    dragSession.current = { ...idlePointerDragSession(), offset: 0 };

    if (enableMomentum && session.active) {
      momentumVelocityRef.current = Math.max(
        -2.5,
        Math.min(2.5, momentumVelocityRef.current),
      );
    } else {
      momentumVelocityRef.current = 0;
    }

    pauseAuto();
  };

  const viewportHandlers = {
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onMouseEnter: () => {
      isPausedRef.current = true;
    },
    onMouseLeave: () => {
      if (!userControlRef.current) {
        isPausedRef.current = false;
      }
    },
  };

  const progress =
    itemCount > 0 ? ((activeIndex + 1) / itemCount) * 100 : 0;

  return {
    viewportRef,
    innerRef,
    isDragging,
    activeIndex,
    progress,
    loopCopies,
    nudge,
    pauseAuto,
    viewportHandlers,
    prefersReducedMotion: prefersReducedMotionNow(),
  };
}

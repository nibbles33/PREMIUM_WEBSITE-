"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  activatePointerDragIfNeeded,
  createPointerDragSession,
  idlePointerDragSession,
  suppressClickAfterDrag,
  type PointerDragSession,
} from "@/lib/pointerDragGuard";
import {
  getFilmstripPhoto,
  personalFilmstripItems,
} from "@/data/pilot-home";
import { PILOT_PERSONAL_RAIL_SPEED } from "@/data/pilot-rail-durations";
import { PILOT_FILMSTRIP_IMAGE } from "@/data/photography";

const INACTIVITY_RESUME_MS = 3500;
const LOOP_COPIES = 2;
const ITEM_COUNT = personalFilmstripItems.length;

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

function currentScrollSpeed() {
  const reduced = prefersReducedMotionNow();
  const mobile = isMobileViewportNow();
  if (reduced) {
    return mobile
      ? PILOT_PERSONAL_RAIL_SPEED.mobileReduced
      : PILOT_PERSONAL_RAIL_SPEED.reduced;
  }
  return mobile ? PILOT_PERSONAL_RAIL_SPEED.mobile : PILOT_PERSONAL_RAIL_SPEED.normal;
}

export default function PilotPersonalFilmstrip() {
  const baseId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const frameStepRef = useRef(0);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const userControlRef = useRef(false);
  const dragSession = useRef<PointerDragSession & { offset: number }>({
    ...idlePointerDragSession(),
    offset: 0,
  });
  const resumeTimerRef = useRef<number | null>(null);
  const offsetInitializedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const loopItems = Array.from({ length: LOOP_COPIES }, () =>
    personalFilmstripItems,
  ).flat();

  const applyTransform = useCallback((offset: number) => {
    const inner = innerRef.current;
    if (!inner) return;
    const aligned = Math.round(offset * 2) / 2;
    inner.style.transform = `translate3d(${aligned}px, 0, 0)`;
  }, []);

  const updateActiveIndex = useCallback(() => {
    const step = frameStepRef.current;
    const setWidth = setWidthRef.current;
    if (step <= 0 || setWidth <= 0) return;
    const progress = offsetRef.current + setWidth;
    const index = Math.round(progress / step) % ITEM_COUNT;
    setActiveIndex((index + ITEM_COUNT) % ITEM_COUNT);
  }, []);

  const measure = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return false;
    const total = inner.scrollWidth;
    if (total <= 0) return false;
    const setWidth = total / LOOP_COPIES;
    setWidthRef.current = setWidth;
    frameStepRef.current = setWidth / ITEM_COUNT;
    if (!offsetInitializedRef.current) {
      offsetRef.current = -setWidth;
      offsetInitializedRef.current = true;
    }
    offsetRef.current = normalizeOffsetLtr(offsetRef.current, setWidth);
    applyTransform(offsetRef.current);
    updateActiveIndex();
    return true;
  }, [applyTransform, updateActiveIndex]);

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
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      userControlRef.current = false;
      isPausedRef.current = false;
    }, INACTIVITY_RESUME_MS);
  }, []);

  /* LTR autoplay — same transform offset for all breakpoints */
  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const setWidth = setWidthRef.current;
      if (
        setWidth > 0 &&
        !isPausedRef.current &&
        !isDraggingRef.current &&
        !userControlRef.current
      ) {
        offsetRef.current += currentScrollSpeed();
        offsetRef.current = normalizeOffsetLtr(offsetRef.current, setWidth);
        applyTransform(offsetRef.current);
        updateActiveIndex();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [applyTransform, updateActiveIndex]);

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

  const onPointerDown = (event: React.PointerEvent) => {
    if (!ensureMeasured() || event.button !== 0) return;
    pauseAuto();
    dragSession.current = {
      ...createPointerDragSession(event.pointerId, event.clientX, event.clientY),
      offset: offsetRef.current,
    };
  };

  const onPointerMove = (event: React.PointerEvent) => {
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

    const delta = event.clientX - session.startX;
    offsetRef.current = normalizeOffsetLtr(
      session.offset + delta,
      setWidthRef.current,
    );
    applyTransform(offsetRef.current);
    updateActiveIndex();
  };

  const endDrag = (event: React.PointerEvent) => {
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
    pauseAuto();
  };

  const progress = ((activeIndex + 1) / ITEM_COUNT) * 100;

  const renderFrame = (
    item: (typeof personalFilmstripItems)[number],
    index: number,
    interactive: boolean,
  ) => {
    const photo = getFilmstripPhoto(item.slug);
    const logicalIndex = index % ITEM_COUNT;
    const isActive = logicalIndex === activeIndex;
    const isClone = index >= ITEM_COUNT;

    return (
      <Link
        key={`${item.slug}-${index}`}
        href={item.href}
        data-frame
        tabIndex={interactive && !isClone ? 0 : -1}
        aria-hidden={isClone || undefined}
        className={`pilot-filmstrip-frame pilot-filmstrip-frame-dense group block overflow-hidden rounded-xl border border-border/80 bg-white shadow-[0_6px_20px_rgba(32,39,40,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
          isActive ? "is-active" : ""
        }`}
        aria-label={isClone ? undefined : `${item.label} insurance`}
        onFocus={interactive ? pauseAuto : undefined}
      >
        <div className="relative aspect-[5/4] w-full overflow-hidden">
          {photo ? (
            <Image
              src={photo.src}
              alt=""
              fill
              sizes={PILOT_FILMSTRIP_IMAGE.sizes}
              quality={PILOT_FILMSTRIP_IMAGE.quality}
              loading={logicalIndex < 4 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/5 to-transparent" />
          <p className="absolute bottom-2.5 left-3 text-lg font-medium tracking-tight text-white">
            {item.label}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <section
      className="pilot-section-personal relative overflow-hidden border-t border-border bg-[#F3EBD4] py-10 sm:py-12 lg:py-14"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2
                id={`${baseId}-heading`}
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-[1.65rem]"
              >
                Personal insurance
              </h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-secondary">
                A lot to protect? Good thing we have options.
              </p>
            </div>
            <PremiumPilotButton
              href="/home-insurance/"
              variant="secondary"
              showArrow={false}
              className="shrink-0 self-start text-[13px] sm:self-auto"
            >
              Explore all Personal →
            </PremiumPilotButton>
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="mt-6 sm:mt-7">
        <div className="pilot-filmstrip pilot-filmstrip-dense">
          <div className="mx-auto mb-2 flex max-w-6xl justify-end gap-2 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => nudge(-1)}
              className="pilot-btn-discover"
              aria-label="Previous personal insurance product"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              className="pilot-btn-discover"
              aria-label="Next personal insurance product"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div
            ref={viewportRef}
            className={`pilot-filmstrip-viewport ${isDragging ? "is-dragging" : ""}`}
            role="region"
            aria-roledescription="carousel"
            aria-label="Personal insurance products"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onMouseEnter={() => {
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              if (!userControlRef.current) {
                isPausedRef.current = false;
              }
            }}
          >
            <div
              ref={innerRef}
              className="pilot-filmstrip-inner pilot-filmstrip-track-dense"
            >
              {loopItems.map((item, index) =>
                renderFrame(item, index, true),
              )}
            </div>
          </div>

          <div
            className="pilot-filmstrip-progress mx-auto mt-3 max-w-xs"
            role="progressbar"
            aria-valuenow={activeIndex + 1}
            aria-valuemin={1}
            aria-valuemax={ITEM_COUNT}
            aria-label="Filmstrip progress"
          >
            <div
              className="pilot-filmstrip-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

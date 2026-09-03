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
  getFilmstripPhoto,
  personalFilmstripItems,
} from "@/data/pilot-home";
import { PILOT_FILMSTRIP_IMAGE } from "@/data/photography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** ~39px/s at 60fps — primary continuous motion zone */
const AUTO_SCROLL_SPEED = 0.65;
const INACTIVITY_RESUME_MS = 3500;
const LOOP_COPIES = 2;
const ITEM_COUNT = personalFilmstripItems.length;

function normalizeOffset(offset: number, setWidth: number) {
  if (setWidth <= 0) return 0;
  let next = offset % setWidth;
  if (next < 0) next += setWidth;
  return next;
}

export default function PilotPersonalFilmstrip() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const frameStepRef = useRef(0);
  const offsetRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragStart = useRef({ x: 0, offset: 0 });
  const resumeTimerRef = useRef<number | null>(null);
  const userControlRef = useRef(false);

  const loopItems = Array.from({ length: LOOP_COPIES }, () =>
    personalFilmstripItems,
  ).flat();

  const applyTransform = useCallback((offset: number) => {
    const inner = innerRef.current;
    if (!inner) return;
    const aligned = Math.round(offset * 2) / 2;
    inner.style.transform = `translate3d(-${aligned}px, 0, 0)`;
  }, []);

  const measure = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const total = inner.scrollWidth;
    setWidthRef.current = total / LOOP_COPIES;
    frameStepRef.current = setWidthRef.current / ITEM_COUNT;
    offsetRef.current = normalizeOffset(offsetRef.current, setWidthRef.current);
    applyTransform(offsetRef.current);
  }, [applyTransform]);

  const updateActiveIndex = useCallback(() => {
    const step = frameStepRef.current;
    if (step <= 0) return;
    const index =
      Math.round(offsetRef.current / step) % ITEM_COUNT;
    setActiveIndex((index + ITEM_COUNT) % ITEM_COUNT);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const pauseAuto = useCallback(() => {
    userControlRef.current = true;
    setIsPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      userControlRef.current = false;
      setIsPaused(false);
    }, INACTIVITY_RESUME_MS);
  }, []);

  /* Desktop: transform-based seamless loop */
  useEffect(() => {
    if (reduceMotion || isMobile) return;
    let raf = 0;

    const tick = () => {
      const setWidth = setWidthRef.current;
      if (
        setWidth > 0 &&
        !isPaused &&
        !isDragging &&
        !userControlRef.current
      ) {
        offsetRef.current += AUTO_SCROLL_SPEED;
        if (offsetRef.current >= setWidth) {
          offsetRef.current -= setWidth;
        }
        applyTransform(offsetRef.current);
        updateActiveIndex();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    reduceMotion,
    isMobile,
    isPaused,
    isDragging,
    applyTransform,
    updateActiveIndex,
  ]);

  const nudge = (direction: -1 | 1) => {
    pauseAuto();
    const step = frameStepRef.current;
    if (step <= 0) return;
    offsetRef.current = normalizeOffset(
      offsetRef.current + direction * step,
      setWidthRef.current,
    );
    applyTransform(offsetRef.current);
    updateActiveIndex();
  };

  const scrollToIndex = (index: number) => {
    pauseAuto();
    const step = frameStepRef.current;
    if (step <= 0) return;
    const current = Math.round(offsetRef.current / step) % ITEM_COUNT;
    let delta = index - current;
    if (delta > ITEM_COUNT / 2) delta -= ITEM_COUNT;
    if (delta < -ITEM_COUNT / 2) delta += ITEM_COUNT;
    offsetRef.current = normalizeOffset(
      offsetRef.current + delta * step,
      setWidthRef.current,
    );
    applyTransform(offsetRef.current);
    setActiveIndex(index);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isMobile) return;
    pauseAuto();
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(1);
    }
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (isMobile) return;
    pauseAuto();
    setIsDragging(true);
    dragStart.current = { x: event.clientX, offset: offsetRef.current };
    viewportRef.current?.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isDragging || isMobile) return;
    const delta = event.clientX - dragStart.current.x;
    offsetRef.current = normalizeOffset(
      dragStart.current.offset - delta,
      setWidthRef.current,
    );
    applyTransform(offsetRef.current);
    updateActiveIndex();
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (isMobile) return;
    setIsDragging(false);
    viewportRef.current?.releasePointerCapture(event.pointerId);
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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!userControlRef.current) setIsPaused(false);
      }}
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
              onClick={() =>
                scrollToIndex(
                  (activeIndex - 1 + ITEM_COUNT) % ITEM_COUNT,
                )
              }
              className="pilot-btn-discover"
              aria-label="Previous personal insurance product"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex((activeIndex + 1) % ITEM_COUNT)}
              className="pilot-btn-discover"
              aria-label="Next personal insurance product"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          {/* Desktop: transform loop */}
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
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
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

          {/* Mobile: native swipe, single set, no autoplay */}
          <div
            className="pilot-filmstrip-track pilot-filmstrip-track-dense pilot-filmstrip-track-mobile"
            role="region"
            aria-roledescription="carousel"
            aria-label="Personal insurance products"
          >
            {personalFilmstripItems.map((item, index) =>
              renderFrame(item, index, true),
            )}
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

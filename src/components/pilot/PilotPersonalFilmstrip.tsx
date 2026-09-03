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
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const AUTO_SCROLL_SPEED = 0.55;
const INACTIVITY_RESUME_MS = 3500;

export default function PilotPersonalFilmstrip() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const resumeTimerRef = useRef<number | null>(null);
  const userControlRef = useRef(false);

  const items = [...personalFilmstripItems, ...personalFilmstripItems];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pauseAuto = useCallback(() => {
    userControlRef.current = true;
    setIsPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      userControlRef.current = false;
      setIsPaused(false);
    }, INACTIVITY_RESUME_MS);
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const frames = track.querySelectorAll<HTMLElement>("[data-frame]");
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    frames.forEach((frame, i) => {
      const center = frame.offsetLeft + frame.offsetWidth / 2;
      const dist = Math.abs(center - trackCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i % personalFilmstripItems.length;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    track.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      track.removeEventListener("scroll", updateActiveFromScroll);
    };
  }, [updateActiveFromScroll]);

  /* Desktop auto-drift */
  useEffect(() => {
    if (reduceMotion || isMobile) return;
    let raf = 0;

    const tick = () => {
      const track = trackRef.current;
      if (
        track &&
        !isPaused &&
        !isDragging &&
        !userControlRef.current &&
        loopWidthRef.current > 0
      ) {
        track.scrollLeft += AUTO_SCROLL_SPEED;
        if (track.scrollLeft >= loopWidthRef.current) {
          track.scrollLeft -= loopWidthRef.current;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, isMobile, isPaused, isDragging]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    pauseAuto();
    const frames = track.querySelectorAll<HTMLElement>("[data-frame]");
    const frame = frames[index];
    if (!frame) return;
    const target =
      frame.offsetLeft - (track.clientWidth - frame.offsetWidth) / 2;
    track.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
    setActiveIndex(index % personalFilmstripItems.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    pauseAuto();
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(
        (activeIndex - 1 + personalFilmstripItems.length) %
          personalFilmstripItems.length,
      );
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex((activeIndex + 1) % personalFilmstripItems.length);
    }
  };

  const onPointerDown = (event: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    pauseAuto();
    setIsDragging(true);
    dragStart.current = { x: event.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft =
      dragStart.current.scrollLeft - (event.clientX - dragStart.current.x);
  };

  const onPointerUp = (event: React.PointerEvent) => {
    setIsDragging(false);
    trackRef.current?.releasePointerCapture(event.pointerId);
    updateActiveFromScroll();
    pauseAuto();
  };

  const progress =
    ((activeIndex + 1) / personalFilmstripItems.length) * 100;

  return (
    <section
      className="pilot-section-personal relative overflow-hidden border-t border-border bg-[#F3EBD4] py-10 sm:py-12 lg:py-14"
      aria-labelledby={`${baseId}-heading`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!userControlRef.current) setIsPaused(false);
      }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => {
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
                  (activeIndex - 1 + personalFilmstripItems.length) %
                    personalFilmstripItems.length,
                )
              }
              className="pilot-btn-discover"
              aria-label="Previous personal insurance product"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() =>
                scrollToIndex((activeIndex + 1) % personalFilmstripItems.length)
              }
              className="pilot-btn-discover"
              aria-label="Next personal insurance product"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div
            ref={trackRef}
            className={`pilot-filmstrip-track pilot-filmstrip-track-dense ${isDragging ? "is-dragging" : ""}`}
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
            {items.map((item, index) => {
              const photo = getFilmstripPhoto(item.slug);
              const logicalIndex = index % personalFilmstripItems.length;
              const isActive = logicalIndex === activeIndex;
              return (
                <Link
                  key={`${item.slug}-${index}`}
                  href={item.href}
                  data-frame
                  className={`pilot-filmstrip-frame pilot-filmstrip-frame-dense group block overflow-hidden rounded-xl border border-border/80 bg-white shadow-[0_6px_20px_rgba(32,39,40,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    isActive ? "is-active" : ""
                  }`}
                  aria-label={`${item.label} insurance`}
                  onFocus={pauseAuto}
                >
                  <div className="relative aspect-[5/4] w-full overflow-hidden">
                    {photo ? (
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="220px"
                        loading={index < 6 ? "eager" : "lazy"}
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
            })}
          </div>

          <div
            className="pilot-filmstrip-progress mx-auto mt-3 max-w-xs"
            role="progressbar"
            aria-valuenow={activeIndex + 1}
            aria-valuemin={1}
            aria-valuemax={personalFilmstripItems.length}
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

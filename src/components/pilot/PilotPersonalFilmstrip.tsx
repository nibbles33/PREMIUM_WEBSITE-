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

export default function PilotPersonalFilmstrip() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

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
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => track.removeEventListener("scroll", updateActiveFromScroll);
  }, [updateActiveFromScroll]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const frames = track.querySelectorAll<HTMLElement>("[data-frame]");
    const frame = frames[index];
    if (!frame) return;
    const target =
      frame.offsetLeft - (track.clientWidth - frame.offsetWidth) / 2;
    track.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
    setActiveIndex(index);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(Math.max(0, activeIndex - 1));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(
        Math.min(personalFilmstripItems.length - 1, activeIndex + 1),
      );
    }
  };

  const onPointerDown = (event: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    dragStart.current = { x: event.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = event.clientX - dragStart.current.x;
    track.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    setIsDragging(false);
    trackRef.current?.releasePointerCapture(event.pointerId);
    updateActiveFromScroll();
  };

  const progress =
    personalFilmstripItems.length > 1
      ? ((activeIndex + 1) / personalFilmstripItems.length) * 100
      : 100;

  return (
    <section
      className="border-t border-border bg-[#FBF5E5] py-14 sm:py-16 lg:py-20"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2
                id={`${baseId}-heading`}
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                Personal insurance
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                From your daily driver to your weekend toys — swipe through what
                matters most.
              </p>
            </div>
            <PremiumPilotButton
              href="/home-insurance/"
              variant="secondary"
              showArrow={false}
              className="shrink-0 self-start sm:self-auto"
            >
              Explore all Personal →
            </PremiumPilotButton>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-8 sm:mt-10">
          <div className="pilot-filmstrip">
            <div className="mb-3 flex items-center justify-end gap-2 px-2">
              <button
                type="button"
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="pilot-btn-discover disabled:opacity-40"
                aria-label="Previous personal insurance product"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() =>
                  scrollToIndex(
                    Math.min(personalFilmstripItems.length - 1, activeIndex + 1),
                  )
                }
                disabled={activeIndex === personalFilmstripItems.length - 1}
                className="pilot-btn-discover disabled:opacity-40"
                aria-label="Next personal insurance product"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div
              ref={trackRef}
              className={`pilot-filmstrip-track ${isDragging ? "is-dragging" : ""}`}
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
              {personalFilmstripItems.map((item, index) => {
                const photo = getFilmstripPhoto(item.slug);
                const isActive = index === activeIndex;
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    data-frame
                    className={`pilot-filmstrip-frame group block overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_32px_rgba(32,39,40,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      isActive ? "is-active" : ""
                    }`}
                    aria-label={`${item.label} insurance`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes="340px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                      <p className="absolute bottom-4 left-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                        {item.label}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div
              className="pilot-filmstrip-progress mx-auto mt-4 max-w-xs"
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
      </div>
    </section>
  );
}

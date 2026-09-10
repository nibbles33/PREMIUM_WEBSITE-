"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import { useTransformInfiniteRail } from "@/hooks/useTransformInfiniteRail";
import {
  getFilmstripPhoto,
  personalFilmstripItems,
} from "@/data/pilot-home";
import { PILOT_PERSONAL_RAIL_SPEED } from "@/data/pilot-rail-durations";
import { PILOT_FILMSTRIP_IMAGE } from "@/data/photography";

const ITEM_COUNT = personalFilmstripItems.length;

export default function PilotPersonalFilmstrip() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const {
    viewportRef,
    innerRef,
    isDragging,
    activeIndex,
    progress,
    loopCopies,
    nudge,
    pauseAuto,
    viewportHandlers,
  } = useTransformInfiniteRail({
    itemCount: ITEM_COUNT,
    speed: PILOT_PERSONAL_RAIL_SPEED,
    enableMomentum: !reduceMotion,
    disableAutoplay: reduceMotion,
  });

  const loopItems = Array.from({ length: loopCopies }, () =>
    personalFilmstripItems,
  ).flat();

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
              draggable={false}
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
      aria-labelledby="pilot-personal-filmstrip-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2
                id="pilot-personal-filmstrip-heading"
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
            aria-label="Personal insurance products — swipe or drag to browse"
            tabIndex={0}
            {...viewportHandlers}
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

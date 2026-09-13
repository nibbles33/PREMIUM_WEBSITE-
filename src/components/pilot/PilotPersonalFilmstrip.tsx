"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
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
import {
  activatePointerDragIfNeeded,
  createPointerDragSession,
  idlePointerDragSession,
  suppressClickAfterDrag,
  type PointerDragSession,
} from "@/lib/pointerDragGuard";

const ITEMS = personalFilmstripItems;
const ITEM_COUNT = ITEMS.length;

/**
 * Concept F Revision 2 — editorial Personal discovery.
 * Intentional navigation only (arrows / drag / swipe / keyboard).
 * NO autoplay conveyor. All 14 products remain discoverable.
 */
export default function PilotPersonalFilmstrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragSession = useRef<PointerDragSession & { scrollLeft: number }>({
    ...idlePointerDragSession(),
    scrollLeft: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-personal-card]");
    if (!cards.length) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    setActiveIndex(best);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateActiveFromScroll();
    el.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    return () => {
      el.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, [updateActiveFromScroll]);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-personal-card]");
    const target = cards[Math.max(0, Math.min(ITEM_COUNT - 1, index))];
    if (!target) return;
    target.scrollIntoView({
      behavior,
      inline: "center",
      block: "nearest",
    });
  }, []);

  const nudge = useCallback(
    (dir: -1 | 1) => {
      scrollToIndex(activeIndex + dir);
    },
    [activeIndex, scrollToIndex],
  );

  // Capture-phase listeners so drag works over nested <a>/images.
  // HTML5 dragstart otherwise steals mouse moves after a few pixels.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragSession.current = {
        ...createPointerDragSession(event.pointerId, event.clientX, event.clientY),
        scrollLeft: el.scrollLeft,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      const session = dragSession.current;
      if (!session.pending && !session.active) return;
      if (session.pointerId !== event.pointerId) return;

      if (
        activatePointerDragIfNeeded(session, event.clientX, event.clientY) &&
        !el.hasPointerCapture(event.pointerId)
      ) {
        setIsDragging(true);
        try {
          el.setPointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }

      if (!session.active) return;
      event.preventDefault();
      const dx = event.clientX - session.startX;
      el.scrollLeft = session.scrollLeft - dx;
    };

    const endDrag = (event: PointerEvent) => {
      const session = dragSession.current;
      if (!session.pending && !session.active) return;
      if (session.pointerId !== -1 && session.pointerId !== event.pointerId) return;

      const wasDragging = session.active;
      const dragDistance = wasDragging ? event.clientX - session.startX : 0;

      if (wasDragging && el.hasPointerCapture(event.pointerId)) {
        try {
          el.releasePointerCapture(event.pointerId);
        } catch {
          /* already released */
        }
      }

      if (session.suppressClick) {
        suppressClickAfterDrag(el);
      }

      dragSession.current = { ...idlePointerDragSession(), scrollLeft: 0 };
      setIsDragging(false);

      if (wasDragging) {
        // Commit past CSS scroll-snap reset so desktop drag lands on a new card.
        const cards = el.querySelectorAll<HTMLElement>("[data-personal-card]");
        const cardWidth = cards[0]?.offsetWidth ?? 280;
        const commitPx = Math.max(48, cardWidth * 0.18);
        const current = activeIndexRef.current;
        let next = current;
        if (dragDistance <= -commitPx) next = current + 1;
        else if (dragDistance >= commitPx) next = current - 1;
        next = Math.max(0, Math.min(ITEM_COUNT - 1, next));
        scrollToIndex(next, "auto");
        setActiveIndex(next);
      }
    };

    const onDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    el.addEventListener("pointerdown", onPointerDown, { capture: true });
    el.addEventListener("pointermove", onPointerMove, {
      capture: true,
      passive: false,
    });
    el.addEventListener("pointerup", endDrag, { capture: true });
    el.addEventListener("pointercancel", endDrag, { capture: true });
    el.addEventListener("dragstart", onDragStart, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown, true);
      el.removeEventListener("pointermove", onPointerMove, true);
      el.removeEventListener("pointerup", endDrag, true);
      el.removeEventListener("pointercancel", endDrag, true);
      el.removeEventListener("dragstart", onDragStart, true);
    };
  }, [scrollToIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(ITEM_COUNT - 1);
    }
  };

  return (
    <section
      className="pilot-section-personal relative overflow-hidden border-t border-border bg-[#F3EBD4] py-14 sm:py-16 lg:py-20"
      aria-labelledby="pilot-personal-filmstrip-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                Personal coverage
              </p>
              <h2
                id="pilot-personal-filmstrip-heading"
                className="mt-3 text-[2rem] font-medium tracking-[-0.03em] text-charcoal sm:text-[2.35rem] lg:text-[2.75rem]"
              >
                Coverage for the life you actually live.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-secondary sm:text-base">
                Home, auto, condo, tenant, travel and specialty personal lines —
                presented clearly, with a broker who can explain what matters.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[13px] font-medium tabular-nums text-secondary">
                {activeIndex + 1} / {ITEM_COUNT}
              </p>
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
              <PremiumPilotButton
                href="/personal/"
                variant="secondary"
                showArrow={false}
                className="hidden text-[13px] sm:inline-flex"
              >
                Explore all Personal →
              </PremiumPilotButton>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="mt-8 sm:mt-10">
        <div
          ref={scrollerRef}
          className={`pilot-filmstrip-viewport pilot-personal-editorial-scroller ${isDragging ? "is-dragging" : ""}`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Personal insurance products — swipe, drag, or use arrows"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <ul className="pilot-personal-editorial-track">
            {ITEMS.map((item, index) => {
              const photo = getFilmstripPhoto(item.slug);
              const isActive = index === activeIndex;
              return (
                <li
                  key={item.slug}
                  data-personal-card
                  className={`pilot-personal-editorial-card ${isActive ? "is-active" : ""}`}
                >
                  <Link
                    href={item.href}
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    className="pilot-filmstrip-frame group relative block h-full overflow-hidden rounded-[18px] border border-border/70 bg-charcoal shadow-[0_12px_36px_rgba(32,39,40,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    aria-label={`${item.label} insurance`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[4/5]">
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes={PILOT_FILMSTRIP_IMAGE.sizes}
                          quality={PILOT_FILMSTRIP_IMAGE.quality}
                          loading={index < 4 ? "eager" : "lazy"}
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          draggable={false}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                          Personal
                        </p>
                        <p className="mt-2 text-[1.35rem] font-medium tracking-[-0.02em] text-white sm:text-[1.55rem]">
                          {item.label}
                        </p>
                        <p className="mt-2 text-[13px] text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          View coverage →
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="Personal product positions"
          >
            {ITEMS.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${item.label}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-7 bg-charcoal"
                    : "w-1.5 bg-charcoal/25 hover:bg-charcoal/45"
                }`}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
          <PremiumPilotButton
            href="/personal/"
            variant="secondary"
            showArrow={false}
            className="text-[13px] sm:hidden"
          >
            Explore all →
          </PremiumPilotButton>
        </div>
      </RevealOnScroll>
    </section>
  );
}

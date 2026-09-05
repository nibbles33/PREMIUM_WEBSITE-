"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import ProtectionArc from "@/components/pilot/ProtectionArc";
import {
  getHomepageHeroPhotography,
  PILOT_HERO_IMAGE,
} from "@/data/photography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

type CarPhase = "idle" | "entering" | "settling" | "parked";

function CarAssetSlot({ parked }: { parked: boolean }) {
  return (
    <div
      className={`pilot-car-asset-slot ${parked ? "is-parked" : ""}`}
      aria-hidden
    >
      <div className="pilot-car-asset-glow" />
      <svg
        viewBox="0 0 80 32"
        className="pilot-car-asset-silhouette"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 22 L16 10 L36 8 L62 10 L72 18 L72 24 L8 24 Z"
          fill="currentColor"
          opacity="0.35"
        />
        <circle cx="22" cy="24" r="5" fill="currentColor" opacity="0.5" />
        <circle cx="58" cy="24" r="5" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}

export default function PilotHomeHero() {
  const heroPhoto = getHomepageHeroPhotography();
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [carPhase, setCarPhase] = useState<CarPhase>(
    reduceMotion ? "parked" : "idle",
  );
  const [protectionActive, setProtectionActive] = useState(reduceMotion);
  const [isMobile, setIsMobile] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const timer = window.setTimeout(() => {
        setCarPhase("parked");
        setProtectionActive(true);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const enterTimer = window.setTimeout(() => setCarPhase("entering"), 300);
    const settleTimer = window.setTimeout(() => setCarPhase("settling"), 2300);
    const parkedTimer = window.setTimeout(() => setCarPhase("parked"), 2750);
    const protectTimer = window.setTimeout(() => setProtectionActive(true), 2500);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(settleTimer);
      window.clearTimeout(parkedTimer);
      window.clearTimeout(protectTimer);
    };
  }, [reduceMotion]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion || isMobile || !sectionRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = sectionRef.current!.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      });
    },
    [reduceMotion, isMobile],
  );

  const bgShift = reduceMotion || isMobile ? 0 : pointer.x * 8;

  const carClass =
    carPhase === "entering"
      ? isMobile
        ? "pilot-hero-car-wrap is-entering-mobile"
        : "pilot-hero-car-wrap is-entering"
      : carPhase === "settling"
        ? "pilot-hero-car-wrap is-settling"
        : "pilot-hero-car-wrap is-parked";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="pilot-page-hero pilot-hero-immersive relative min-h-[min(82vh,720px)] overflow-x-clip bg-charcoal"
      aria-labelledby="pilot-hero-heading"
      onPointerMove={onPointerMove}
    >
      {/* Single primary photograph — LCP */}
      <div
        className="pilot-hero-bg-layer pointer-events-none absolute inset-0"
        aria-hidden
        style={{ transform: `translate3d(${bgShift}px, 0, 0)` }}
      >
        <Image
          src={heroPhoto.src}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes={PILOT_HERO_IMAGE.sizes}
          quality={PILOT_HERO_IMAGE.quality}
          unoptimized={PILOT_HERO_IMAGE.unoptimized}
          className="object-cover object-[center_35%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(32,39,40,0.90) 0%, rgba(32,39,40,0.78) 34%, rgba(32,39,40,0.35) 62%, rgba(32,39,40,0.12) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(32,39,40,0.2) 0%, transparent 45%, rgba(32,39,40,0.4) 100%)",
          }}
        />
      </div>

      {/* Abstract texture only — no second photograph */}
      <div className="pilot-hero-texture pointer-events-none absolute inset-0" aria-hidden />

      <div className="pilot-hero-road-immersive" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[min(82vh,720px)] max-w-6xl flex-col justify-center px-4 pb-12 pt-20 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold sm:text-xs">
            Windsor-Essex · Personal & Commercial
          </p>
          <h1
            id="pilot-hero-heading"
            className="mt-3 text-[2.35rem] font-medium leading-[1.06] tracking-[-0.025em] text-white sm:mt-4 sm:text-5xl lg:text-[3.5rem]"
          >
            One place.
            <br />
            A lot of insurance.
            <br />
            <span className="text-gold">Surprisingly easy.</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Personal, commercial, and specialty coverage through real Windsor-Essex
            brokers — not a call centre.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <PremiumPilotButton href={QUOTE_HREF}>Get a Quote</PremiumPilotButton>
            <PremiumPilotButton
              href={BROKER_HREF}
              variant="secondary"
              showArrow={false}
              className="border-white/50 text-white hover:border-gold hover:text-gold"
            >
              Talk to a Broker
            </PremiumPilotButton>
          </div>
        </div>
      </div>

      <div className={`${carClass} pointer-events-none`} aria-hidden>
        <ProtectionArc
          active={protectionActive}
          className="pilot-hero-protection"
          breathe={false}
        />
        <CarAssetSlot parked={carPhase === "parked" || carPhase === "settling"} />
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
          Explore coverage
        </p>
        <span className="mt-1 block text-gold" aria-hidden>
          ↓
        </span>
      </div>
    </section>
  );
}

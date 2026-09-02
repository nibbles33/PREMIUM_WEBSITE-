"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import ProtectionArc from "@/components/pilot/ProtectionArc";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

type CarPhase = "idle" | "entering" | "settling" | "parked";

export default function PilotHomeHero() {
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

    const enterTimer = window.setTimeout(() => setCarPhase("entering"), 400);
    const settleTimer = window.setTimeout(() => setCarPhase("settling"), 1900);
    const parkedTimer = window.setTimeout(() => setCarPhase("parked"), 2350);
    const protectTimer = window.setTimeout(() => setProtectionActive(true), 2100);

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
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setPointer({ x, y });
      });
    },
    [reduceMotion, isMobile],
  );

  const bgShift = reduceMotion || isMobile ? 0 : pointer.x * 8;
  const midShift = reduceMotion || isMobile ? 0 : pointer.x * 14;
  const fgShift = reduceMotion || isMobile ? 0 : pointer.x * 6;

  const carClass =
    carPhase === "entering"
      ? isMobile
        ? "pilot-hero-mobile-car is-entering"
        : "pilot-hero-car is-entering"
      : carPhase === "settling"
        ? "pilot-hero-car is-settling"
        : "pilot-hero-car is-parked";

  const carStyle = {
    "--car-x": isMobile ? "58%" : "68%",
    "--car-y": isMobile ? "72%" : "62%",
    "--car-scale": isMobile ? "0.85" : "1",
    left: 0,
    top: 0,
    transform:
      reduceMotion || carPhase === "parked"
        ? `translate3d(${isMobile ? "58%" : "68%"}, ${isMobile ? "72%" : "62%"}, 0) scale(${isMobile ? 0.85 : 1})`
        : undefined,
  } as React.CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="pilot-page-hero relative min-h-[min(92vh,820px)] overflow-x-clip bg-offwhite"
      aria-labelledby="pilot-hero-heading"
      onPointerMove={onPointerMove}
    >
      {/* Background photography layer */}
      <div
        className="pilot-hero-bg-layer pointer-events-none absolute inset-0"
        aria-hidden
        style={{ transform: `translate3d(${bgShift}px, 0, 0)` }}
      >
        <Image
          src="/images/photography/commercial/commercial-insurance.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.22]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,250,248,0.92) 0%, rgba(250,250,248,0.75) 45%, rgba(250,250,248,0.88) 100%)",
          }}
        />
      </div>

      {/* Mid layer — Windsor texture */}
      <div
        className="pilot-hero-mid-layer pointer-events-none absolute inset-0"
        aria-hidden
        style={{ transform: `translate3d(${midShift}px, 0, 0)` }}
      >
        <Image
          src="/images/team-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right opacity-[0.12]"
        />
      </div>

      <div className="pilot-hero-road" aria-hidden />

      <div
        className="pilot-hero-fg-layer relative mx-auto flex min-h-[min(92vh,820px)] max-w-6xl flex-col justify-center px-4 pb-16 pt-24 sm:px-6 lg:px-8 xl:max-w-7xl"
        style={{ transform: `translate3d(${fgShift}px, 0, 0)` }}
      >
        <div className="relative z-10 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:text-xs">
            Windsor-Essex · Personal & Commercial
          </p>
          <h1
            id="pilot-hero-heading"
            className="mt-3 text-[2.35rem] font-medium leading-[1.06] tracking-[-0.025em] text-charcoal sm:mt-4 sm:text-5xl lg:text-[3.75rem]"
          >
            One place.
            <br />
            A lot of insurance.
            <br />
            <span className="text-gold">Surprisingly easy.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-secondary sm:text-lg">
            Personal, commercial, and specialty coverage through real Windsor-Essex
            brokers — not a call centre.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <PremiumPilotButton href={QUOTE_HREF}>
              Get a Quote
            </PremiumPilotButton>
            <PremiumPilotButton href={BROKER_HREF} variant="secondary">
              Talk to a Broker
            </PremiumPilotButton>
          </div>
        </div>

        {/* Brand mark + car parking zone */}
        <div
          className="pointer-events-none absolute right-4 top-[18%] hidden sm:block lg:right-12 lg:top-[22%]"
          aria-hidden
        >
          <div className="relative">
            <p className="text-right text-[13px] font-medium uppercase tracking-[0.2em] text-gold-dark/80">
              Premium
            </p>
            <p className="text-right text-2xl font-medium tracking-tight text-charcoal/90 lg:text-3xl">
              Insurance Brokers
            </p>
            <ProtectionArc
              active={protectionActive}
              className="absolute -left-8 -top-6 lg:-left-12"
            />
          </div>
        </div>
      </div>

      {/* Toy car */}
      <div
        className={`${carClass} pointer-events-none`}
        style={carStyle}
        aria-hidden
      >
        <Image
          src="/images/miniatures/car-placeholder.svg"
          alt=""
          width={120}
          height={48}
          className="h-auto w-full drop-shadow-lg"
          priority
        />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-secondary/70">
          Explore coverage
        </p>
        <span className="mt-1 block text-gold" aria-hidden>
          ↓
        </span>
      </div>
    </section>
  );
}

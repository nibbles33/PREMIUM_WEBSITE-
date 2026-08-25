"use client";

import Image from "next/image";
import {
  Building2,
  Car,
  Check,
  Home,
  UserRound,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const JOURNEY_NODES = [
  { id: "you", label: "YOU" },
  { id: "premium", label: "PREMIUM" },
  { id: "markets", label: "MARKETS" },
  { id: "coverage", label: "COVERAGE" },
] as const;

const JOURNEY_CARRIERS = [
  {
    name: "Intact Insurance",
    src: "/images/carriers/carrier-intact.jpg",
    alt: "Intact Insurance logo",
  },
  {
    name: "Aviva",
    src: "/images/carriers/carrier-aviva.jpg",
    alt: "Aviva logo",
  },
  {
    name: "Wawanesa Insurance",
    src: "/images/carriers/carrier-wawanesa.jpg",
    alt: "Wawanesa Insurance logo",
  },
  {
    name: "Northbridge Insurance",
    src: "/images/carriers/carrier-northbridge.jpg",
    alt: "Northbridge Insurance logo",
  },
  {
    name: "CAA Insurance",
    src: "/images/carriers/carrier-caa.png",
    alt: "CAA Insurance Company logo",
  },
  {
    name: "SGI Canada",
    src: "/images/carriers/carrier-sgi.jpg",
    alt: "SGI Canada logo",
  },
] as const;

const COMPARISON_OPTIONS = [
  {
    name: "Option A",
    items: ["$2M Liability", "Sewer Backup Included", "Claim Forgiveness"],
  },
  {
    name: "Option B",
    items: ["$2M Liability", "Higher Water Damage Limit", "Lower Deductible"],
  },
] as const;

const INTAKE_OPTIONS = [
  { label: "Auto", icon: Car, accent: "#5B7A99" },
  { label: "Home", icon: Home, accent: "#B37A5A", selected: true },
  { label: "Business", icon: Building2, accent: "#5A8A73" },
] as const;

const STAGE_CONTENT = [
  {
    nodeLabel: "YOU",
    title: "Tell us what you need",
    render: (props: StageRenderProps) => <StageYouContent {...props} />,
  },
  {
    nodeLabel: "PREMIUM",
    title: "We shop the market",
    render: (props: StageRenderProps) => <StagePremiumContent {...props} />,
  },
  {
    nodeLabel: "MARKETS",
    title: "Your broker reviews the options",
    render: (props: StageRenderProps) => <StageBrokerContent {...props} />,
  },
  {
    nodeLabel: "COVERAGE",
    title: "You're covered",
    render: (props: StageRenderProps) => <StageCoverageContent {...props} />,
  },
] as const;

type StageRenderProps = {
  visible: boolean;
  reduceMotion: boolean;
  stagger: (index: number) => CSSProperties | undefined;
};

function useJourneyStages(stageCount: number, reduceMotion: boolean) {
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleStages, setVisibleStages] = useState<boolean[]>(() =>
    Array.from({ length: stageCount }, () => reduceMotion),
  );
  const [progressIndex, setProgressIndex] = useState(
    reduceMotion ? stageCount - 1 : 0,
  );

  useEffect(() => {
    if (reduceMotion) {
      setVisibleStages(Array.from({ length: stageCount }, () => true));
      setProgressIndex(stageCount - 1);
      return;
    }

    const observers: IntersectionObserver[] = [];

    stageRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setVisibleStages((previous) => {
            if (previous[index]) return previous;
            const next = [...previous];
            next[index] = true;
            return next;
          });
          setProgressIndex((previous) => Math.max(previous, index));
        },
        { threshold: 0.28, rootMargin: "0px 0px -6% 0px" },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [reduceMotion, stageCount]);

  const setStageRef = (index: number) => (element: HTMLElement | null) => {
    stageRefs.current[index] = element;
  };

  const progressPercent =
    stageCount <= 1 ? 0 : (progressIndex / (stageCount - 1)) * 100;

  return {
    setStageRef,
    visibleStages,
    progressIndex,
    progressPercent,
  };
}

function JourneyPathDesktop({
  progressPercent,
  progressIndex,
  travelerActive,
  reduceMotion,
}: {
  progressPercent: number;
  progressIndex: number;
  travelerActive: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative mb-14 hidden lg:block" aria-hidden>
      <div className="relative mx-8 h-1.5 rounded-full bg-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-500 ease-out"
          style={{
            width: `${progressPercent}%`,
            transitionTimingFunction: reduceMotion ? "linear" : SPRING,
          }}
        />
        {travelerActive && !reduceMotion ? (
          <span className="journey-traveler journey-traveler-horizontal journey-traveler-run-horizontal absolute top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-white shadow-[0_6px_16px_rgba(32,39,40,0.12)]">
            <Home
              className="h-4 w-4 text-[#B37A5A]"
              strokeWidth={1.5}
              aria-hidden
            />
          </span>
        ) : null}
      </div>
      <ol className="mt-5 grid grid-cols-4 gap-4">
        {JOURNEY_NODES.map((node, index) => {
          const active = progressIndex >= index;
          return (
            <li key={node.id} className="text-center">
              <span
                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border text-[11px] font-semibold tracking-[0.08em] transition-colors duration-300 ${
                  active
                    ? "border-charcoal bg-charcoal text-gold"
                    : "border-border bg-white text-secondary"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`mt-2 block text-[11px] font-semibold tracking-[0.12em] ${
                  active ? "text-charcoal" : "text-secondary"
                }`}
              >
                {node.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function JourneyStage({
  index,
  nodeLabel,
  title,
  visible,
  reduceMotion,
  setRef,
  children,
  showMobileRail = false,
  isLast = false,
  progressIndex = 0,
}: {
  index: number;
  nodeLabel: string;
  title: string;
  visible: boolean;
  reduceMotion: boolean;
  setRef: (element: HTMLElement | null) => void;
  children: ReactNode;
  showMobileRail?: boolean;
  isLast?: boolean;
  progressIndex?: number;
}) {
  const nodeActive = progressIndex >= index;

  const content = (
    <div
      className={`journey-stage-inner min-w-0 flex-1 ${
        visible || reduceMotion
          ? "journey-stage-visible"
          : "journey-stage-hidden"
      } ${reduceMotion ? "journey-stage-instant" : ""}`}
    >
      <p className="sr-only">{`Stage ${index + 1}: ${nodeLabel}`}</p>
      {showMobileRail ? (
        <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-gold-dark lg:hidden">
          {nodeLabel}
        </p>
      ) : null}
      <h3
        id={`journey-stage-${index}-heading`}
        className="text-lg font-medium tracking-tight text-charcoal sm:text-xl"
      >
        {title}
      </h3>
      <div className="mt-5 sm:mt-6">{children}</div>
    </div>
  );

  return (
    <article
      ref={setRef}
      className={`journey-stage ${showMobileRail ? "flex gap-4 sm:gap-5 lg:block" : ""}`}
      aria-labelledby={`journey-stage-${index}-heading`}
    >
      {showMobileRail ? (
        <div className="flex w-9 shrink-0 flex-col items-center lg:hidden">
          <span
            className={`relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-semibold tracking-[0.06em] transition-colors duration-300 ${
              nodeActive
                ? "border-charcoal bg-charcoal text-gold"
                : "border-border bg-white text-secondary"
            }`}
            aria-hidden
          >
            {index + 1}
          </span>
          {!isLast ? (
            <span
              className="mt-1 w-0.5 flex-1 min-h-[3rem] rounded-full bg-border"
              aria-hidden
            />
          ) : null}
        </div>
      ) : null}
      {content}
    </article>
  );
}

export default function HowItWorks() {
  const reduceMotion = usePrefersReducedMotion();
  const { setStageRef, visibleStages, progressIndex, progressPercent } =
    useJourneyStages(STAGE_CONTENT.length, reduceMotion);
  const [travelerActive, setTravelerActive] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setTravelerActive(false);
      return;
    }
    if (visibleStages[0] && progressIndex < 1) {
      const timer = window.setTimeout(() => setTravelerActive(true), 600);
      return () => window.clearTimeout(timer);
    }
    setTravelerActive(false);
  }, [visibleStages, progressIndex, reduceMotion]);

  const stagger = (index: number): CSSProperties | undefined =>
    reduceMotion
      ? undefined
      : ({ animationDelay: `${index * 70}ms` } as CSSProperties);

  const stageProps = (index: number): StageRenderProps => ({
    visible: visibleStages[index],
    reduceMotion,
    stagger,
  });

  return (
    <section
      className="border-t border-border bg-offwhite py-16 sm:py-20 lg:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-it-works-heading"
            className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
          >
            How it works
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
            One connected path from what you need to coverage in place — with a
            licensed broker guiding every step.
          </p>
        </div>

        <div className="mt-12 lg:mt-16" aria-live="polite">
          <JourneyPathDesktop
            progressPercent={progressPercent}
            progressIndex={progressIndex}
            travelerActive={travelerActive}
            reduceMotion={reduceMotion}
          />

          <div className="relative lg:hidden" aria-hidden>
            <div className="absolute bottom-6 left-[1.125rem] top-3 w-0.5 rounded-full bg-border">
              <div
                className="absolute left-0 top-0 w-full rounded-full bg-gold transition-[height] duration-500 ease-out"
                style={{
                  height: `${progressPercent}%`,
                  transitionTimingFunction: reduceMotion ? "linear" : SPRING,
                }}
              />
            </div>
            {travelerActive && !reduceMotion ? (
              <span className="journey-traveler journey-traveler-vertical journey-traveler-run-vertical absolute left-[0.6875rem] z-[2] inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/50 bg-white shadow-[0_4px_12px_rgba(32,39,40,0.12)]">
                <Home
                  className="h-3.5 w-3.5 text-[#B37A5A]"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            ) : null}
          </div>

          <ol className="relative space-y-14 sm:space-y-16 lg:space-y-24">
            {STAGE_CONTENT.map((stage, index) => (
              <li key={stage.nodeLabel} className="list-none">
                <JourneyStage
                  index={index}
                  nodeLabel={stage.nodeLabel}
                  title={stage.title}
                  visible={visibleStages[index]}
                  reduceMotion={reduceMotion}
                  setRef={setStageRef(index)}
                  showMobileRail
                  isLast={index === STAGE_CONTENT.length - 1}
                  progressIndex={progressIndex}
                >
                  {stage.render(stageProps(index))}
                </JourneyStage>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StageYouContent(_props: StageRenderProps) {
  return (
    <div className="max-w-md rounded-xl border border-border bg-white p-4 shadow-[0_10px_28px_rgba(32,39,40,0.08)] sm:p-5">
      <p className="text-[13px] font-medium text-charcoal sm:text-sm">
        What are you looking to insure?
      </p>
      <ul className="mt-3 grid grid-cols-3 gap-2">
        {INTAKE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const selected = "selected" in option && option.selected;
          return (
            <li key={option.label}>
              <div
                className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center ${
                  selected
                    ? "border-charcoal bg-offwhite shadow-[0_2px_8px_rgba(32,39,40,0.08)]"
                    : "border-border bg-white"
                }`}
              >
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md"
                  style={{
                    backgroundColor: selected
                      ? `color-mix(in srgb, ${option.accent} 18%, white)`
                      : "#f3f2ee",
                  }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: option.accent }}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <span className="text-[11px] font-medium text-charcoal sm:text-xs">
                  {option.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StagePremiumContent({
  visible,
  reduceMotion,
  stagger,
}: StageRenderProps) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:max-w-2xl lg:grid-cols-3 lg:gap-4">
        {JOURNEY_CARRIERS.map((carrier, index) => (
          <li
            key={carrier.name}
            className={`flex items-center justify-center rounded-lg border border-border bg-white px-3 py-3 shadow-[0_4px_14px_rgba(32,39,40,0.06)] sm:px-4 sm:py-4 ${
              visible && !reduceMotion ? "journey-carrier-enter" : ""
            } ${visible || reduceMotion ? "opacity-100" : "opacity-0"}`}
            style={visible && !reduceMotion ? stagger(index) : undefined}
          >
            <Image
              src={carrier.src}
              alt={carrier.alt}
              width={120}
              height={48}
              className="h-8 w-auto max-w-full object-contain grayscale sm:h-9"
            />
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-secondary sm:text-[15px]">
        Your broker shops available markets for you — comparing options across
        independent carriers, not an automated quote engine.
      </p>
    </div>
  );
}

function StageBrokerContent({ visible, reduceMotion }: StageRenderProps) {
  return (
    <div>
      <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-gold-dark">
        Illustrative example — not an actual quote
      </p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:max-w-3xl">
        {COMPARISON_OPTIONS.map((option, index) => (
          <li
            key={option.name}
            className={`rounded-xl border border-border bg-white p-4 shadow-[0_8px_22px_rgba(32,39,40,0.07)] sm:p-5 ${
              visible && !reduceMotion ? "journey-card-enter" : ""
            }`}
            style={
              visible && !reduceMotion
                ? ({ animationDelay: `${index * 80}ms` } as CSSProperties)
                : undefined
            }
          >
            <p className="text-[13px] font-semibold text-charcoal">
              {option.name}
            </p>
            <ul className="mt-3 space-y-2">
              {option.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] leading-snug text-secondary sm:text-[14px]"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div
        className={`mt-5 flex max-w-lg items-start gap-3 rounded-lg border border-border bg-white/80 px-4 py-4 sm:mt-6 sm:px-5 ${
          visible && !reduceMotion ? "journey-broker-enter" : ""
        }`}
        style={
          visible && !reduceMotion
            ? ({ animationDelay: "200ms" } as CSSProperties)
            : undefined
        }
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-gold">
          <UserRound className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        </span>
        <p className="text-[14px] leading-relaxed text-secondary sm:text-[15px]">
          We explain the differences — not just the price.
        </p>
      </div>
    </div>
  );
}

function StageCoverageContent({ visible, reduceMotion }: StageRenderProps) {
  return (
    <div className="max-w-md rounded-xl border border-border bg-white p-5 shadow-[0_12px_32px_rgba(32,39,40,0.1)] sm:p-6">
      <div className="flex items-start gap-4">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-charcoal ${
            visible && !reduceMotion ? "journey-check-enter" : ""
          }`}
        >
          <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden />
        </span>
        <div>
          <p className="text-lg font-medium text-charcoal">Policy confirmed</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-secondary sm:text-[15px]">
            Broker support continues — from binding through renewals and claims,
            you&apos;re not on your own after the sale.
          </p>
        </div>
      </div>
    </div>
  );
}

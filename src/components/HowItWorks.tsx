"use client";

import Image from "next/image";
import {
  Building2,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const STAGE_TRANSITION_MS = 280;
const SELECTION_ADVANCE_MS = 900;
const STAGE_AUTO_ADVANCE_MS = 2800;

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
  { label: "Home", icon: Home, accent: "#B37A5A" },
  { label: "Business", icon: Building2, accent: "#5A8A73" },
] as const;

type IntakeLabel = (typeof INTAKE_OPTIONS)[number]["label"];

const STAGE_TITLES = [
  "Tell us what you need",
  "We shop the market",
  "Your broker reviews the options",
  "You're covered",
] as const;

type StageIndex = 0 | 1 | 2 | 3;

const STAGE_COUNT = JOURNEY_NODES.length;

function isStageIndex(value: number): value is StageIndex {
  return Number.isInteger(value) && value >= 0 && value < STAGE_COUNT;
}

type GoToStageOptions = {
  /** When true, Stages 2–3 may auto-advance after their reveal. Timeline/Back must leave this false. */
  allowAutoAdvance?: boolean;
};

export default function HowItWorks() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const advanceTimerRef = useRef<number | null>(null);
  const autoAdvanceTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  /** Only forward flow (intake / Next / chained auto) may auto-advance mid-stages. */
  const allowAutoAdvanceRef = useRef(false);

  const [activeStage, setActiveStage] = useState<StageIndex>(0);
  const [stageVisible, setStageVisible] = useState(true);
  const [selectedIntake, setSelectedIntake] = useState<IntakeLabel | null>(
    null,
  );
  const [travelerActive, setTravelerActive] = useState(false);
  const [travelerIcon, setTravelerIcon] = useState<LucideIcon>(Home);
  const [travelerAccent, setTravelerAccent] = useState("#B37A5A");
  const [revealKey, setRevealKey] = useState(0);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const clearAutoAdvanceTimer = useCallback(() => {
    if (autoAdvanceTimerRef.current !== null) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, []);

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      clearAdvanceTimer();
      clearAutoAdvanceTimer();
      clearTransitionTimer();
    },
    [clearAdvanceTimer, clearAutoAdvanceTimer, clearTransitionTimer],
  );

  const goToStage = useCallback(
    (next: number, options: GoToStageOptions = {}) => {
      if (!isStageIndex(next)) return;
      if (next === activeStage) return;

      allowAutoAdvanceRef.current = options.allowAutoAdvance === true;

      clearAdvanceTimer();
      clearAutoAdvanceTimer();
      clearTransitionTimer();
      setTravelerActive(false);

      if (reduceMotion) {
        setActiveStage(next);
        setStageVisible(true);
        setRevealKey((key) => key + 1);
        return;
      }

      setStageVisible(false);
      transitionTimerRef.current = window.setTimeout(() => {
        setActiveStage(next);
        setStageVisible(true);
        setRevealKey((key) => key + 1);
        transitionTimerRef.current = null;
      }, STAGE_TRANSITION_MS * 0.45);
    },
    [
      activeStage,
      clearAdvanceTimer,
      clearAutoAdvanceTimer,
      clearTransitionTimer,
      reduceMotion,
    ],
  );

  // Optional auto-advance after Stage 2 / 3 reveals — only for forward flow,
  // never after an explicit timeline jump or Back (that was the off-by-one).
  useEffect(() => {
    clearAutoAdvanceTimer();
    if (reduceMotion) return;
    if (!allowAutoAdvanceRef.current) return;
    if (activeStage !== 1 && activeStage !== 2) return;
    if (!stageVisible) return;

    const fromStage = activeStage;
    autoAdvanceTimerRef.current = window.setTimeout(() => {
      goToStage(fromStage + 1, { allowAutoAdvance: true });
      autoAdvanceTimerRef.current = null;
    }, STAGE_AUTO_ADVANCE_MS);

    return () => clearAutoAdvanceTimer();
  }, [
    activeStage,
    stageVisible,
    reduceMotion,
    goToStage,
    clearAutoAdvanceTimer,
    revealKey,
  ]);

  const handleIntakeSelect = (label: IntakeLabel) => {
    const option = INTAKE_OPTIONS.find((item) => item.label === label);
    if (!option) return;

    setSelectedIntake(label);
    setTravelerIcon(option.icon);
    setTravelerAccent(option.accent);
    clearAdvanceTimer();
    clearAutoAdvanceTimer();

    if (reduceMotion) {
      setTravelerActive(false);
      goToStage(1, { allowAutoAdvance: true });
      return;
    }

    setTravelerActive(true);
    advanceTimerRef.current = window.setTimeout(() => {
      setTravelerActive(false);
      goToStage(1, { allowAutoAdvance: true });
      advanceTimerRef.current = null;
    }, SELECTION_ADVANCE_MS);
  };

  const selectTimelineStage = (index: number) => {
    goToStage(index, { allowAutoAdvance: false });
  };

  const onNodeKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = (index + 1) % STAGE_COUNT;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next = (index - 1 + STAGE_COUNT) % STAGE_COUNT;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = STAGE_COUNT - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectTimelineStage(index);
      return;
    } else {
      return;
    }
    nodeRefs.current[next]?.focus();
  };

  const progressPercent =
    JOURNEY_NODES.length <= 1
      ? 0
      : (activeStage / (JOURNEY_NODES.length - 1)) * 100;

  const stageTransition: CSSProperties = reduceMotion
    ? { transition: "none" }
    : {
        transition: `opacity ${STAGE_TRANSITION_MS}ms ease-out, transform ${STAGE_TRANSITION_MS}ms ${SPRING}`,
      };

  const stagger = (index: number): CSSProperties | undefined =>
    reduceMotion
      ? undefined
      : ({ animationDelay: `${index * 70}ms` } as CSSProperties);

  const TravelerIcon = travelerIcon;
  const canGoBack = activeStage > 0;
  const canGoNext = activeStage === 1 || activeStage === 2;

  return (
    <section
      className="border-t border-border bg-offwhite py-12 sm:py-14 lg:py-16"
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

        <div className="mt-8 sm:mt-10 lg:mt-12">
          {/* Timeline navigation — fixed at top */}
          <div className="relative mb-6 sm:mb-8" aria-hidden={false}>
            <div className="relative mx-2 h-1.5 rounded-full bg-border sm:mx-6 lg:mx-10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-500 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  transitionTimingFunction: reduceMotion ? "linear" : SPRING,
                }}
                aria-hidden
              />
              {travelerActive && !reduceMotion ? (
                <span
                  className="journey-traveler journey-traveler-horizontal journey-traveler-run-horizontal absolute top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-white shadow-[0_6px_16px_rgba(32,39,40,0.12)]"
                  aria-hidden
                >
                  <TravelerIcon
                    className="h-4 w-4"
                    style={{ color: travelerAccent }}
                    strokeWidth={1.5}
                  />
                </span>
              ) : null}
            </div>

            <div
              className="mt-4 grid grid-cols-4 gap-2 sm:gap-4"
              role="tablist"
              aria-label="How it works stages"
            >
              {JOURNEY_NODES.map((node, index) => {
                const isCurrent = activeStage === index;
                const isComplete = activeStage > index;

                return (
                  <button
                    key={node.id}
                    ref={(el) => {
                      nodeRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-node-${node.id}`}
                    aria-selected={isCurrent}
                    aria-controls={`${baseId}-canvas`}
                    tabIndex={isCurrent ? 0 : -1}
                    onClick={() => selectTimelineStage(index)}
                    onKeyDown={(event) => onNodeKeyDown(event, index)}
                    className="group flex flex-col items-center gap-1.5 rounded-md px-1 py-1 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-semibold tracking-[0.08em] transition-colors duration-300 sm:h-10 sm:w-10 ${
                        isCurrent
                          ? "border-gold bg-charcoal text-gold shadow-[0_6px_16px_rgba(32,39,40,0.14)]"
                          : isComplete
                            ? "border-charcoal bg-charcoal text-gold"
                            : "border-border bg-white text-secondary group-hover:border-charcoal/40"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`block text-[10px] font-semibold tracking-[0.12em] sm:text-[11px] ${
                        isCurrent || isComplete
                          ? "text-charcoal"
                          : "text-secondary"
                      }`}
                    >
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Single canvas */}
          <div
            id={`${baseId}-canvas`}
            role="tabpanel"
            aria-labelledby={`${baseId}-node-${JOURNEY_NODES[activeStage].id}`}
            aria-live="polite"
            className="flex min-h-[340px] flex-col rounded-[18px] border border-border bg-white/90 p-5 shadow-[0_12px_28px_rgba(32,39,40,0.06)] sm:min-h-[380px] sm:p-6 lg:min-h-[400px] lg:p-8"
          >
            <div
              className={`flex flex-1 flex-col ${
                stageVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-2 scale-[0.985] opacity-0"
              }`}
              style={stageTransition}
              key={revealKey}
            >
              <p className="sr-only">
                {`Stage ${activeStage + 1}: ${JOURNEY_NODES[activeStage].label}`}
              </p>
              <h3
                id={`${baseId}-stage-heading`}
                className="text-lg font-medium tracking-tight text-charcoal sm:text-xl"
              >
                {STAGE_TITLES[activeStage]}
              </h3>

              <div className="mt-5 flex flex-1 flex-col sm:mt-6">
                {activeStage === 0 ? (
                  <StageYouContent
                    selectedIntake={selectedIntake}
                    onSelect={handleIntakeSelect}
                  />
                ) : null}
                {activeStage === 1 ? (
                  <StagePremiumContent
                    visible={stageVisible}
                    reduceMotion={reduceMotion}
                    stagger={stagger}
                  />
                ) : null}
                {activeStage === 2 ? (
                  <StageBrokerContent
                    visible={stageVisible}
                    reduceMotion={reduceMotion}
                  />
                ) : null}
                {activeStage === 3 ? (
                  <StageCoverageContent
                    visible={stageVisible}
                    reduceMotion={reduceMotion}
                  />
                ) : null}
              </div>
            </div>

            {/* Back / Next controls */}
            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/80 pt-4 sm:mt-7 sm:pt-5">
              <button
                type="button"
                onClick={() =>
                  goToStage(activeStage - 1, { allowAutoAdvance: false })
                }
                disabled={!canGoBack}
                className="inline-flex h-11 min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-border bg-white px-4 text-[14px] font-medium text-charcoal transition-colors hover:border-charcoal/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
                Back
              </button>

              {canGoNext ? (
                <button
                  type="button"
                  onClick={() => {
                    clearAutoAdvanceTimer();
                    goToStage(activeStage + 1, { allowAutoAdvance: true });
                  }}
                  className="inline-flex h-11 min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-charcoal bg-charcoal px-4 text-[14px] font-medium text-gold transition-colors hover:bg-[#2a3132] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Next
                  <ChevronRight
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
              ) : (
                <span className="text-[13px] text-secondary sm:text-[14px]">
                  {activeStage === 0
                    ? "Pick a coverage type to continue"
                    : "Journey complete"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageYouContent({
  selectedIntake,
  onSelect,
}: {
  selectedIntake: IntakeLabel | null;
  onSelect: (label: IntakeLabel) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border border-border bg-white p-4 shadow-[0_10px_28px_rgba(32,39,40,0.08)] sm:p-5">
      <p className="text-[13px] font-medium text-charcoal sm:text-sm">
        What are you looking to insure?
      </p>
      <ul className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
        {INTAKE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const selected = selectedIntake === option.label;
          return (
            <li key={option.label}>
              <button
                type="button"
                onClick={() => onSelect(option.label)}
                className={`flex w-full flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-[border-color,box-shadow,background-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:py-4 ${
                  selected
                    ? "border-charcoal bg-offwhite shadow-[0_2px_8px_rgba(32,39,40,0.08)]"
                    : "border-border bg-white hover:border-charcoal/25"
                }`}
              >
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md sm:h-9 sm:w-9"
                  style={{
                    backgroundColor: selected
                      ? `color-mix(in srgb, ${option.accent} 18%, white)`
                      : "#f3f2ee",
                  }}
                >
                  <Icon
                    className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]"
                    style={{ color: option.accent }}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <span className="text-[11px] font-medium text-charcoal sm:text-xs">
                  {option.label}
                </span>
              </button>
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
}: {
  visible: boolean;
  reduceMotion: boolean;
  stagger: (index: number) => CSSProperties | undefined;
}) {
  return (
    <div className="w-full">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-4">
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
      <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-secondary sm:mt-6 sm:text-[15px]">
        Your broker shops available markets for you — comparing options across
        independent carriers, not an automated quote engine.
      </p>
    </div>
  );
}

function StageBrokerContent({
  visible,
  reduceMotion,
}: {
  visible: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="w-full">
      <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-gold-dark">
        Illustrative example — not an actual quote
      </p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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
        className={`mt-5 flex max-w-2xl items-start gap-3 rounded-lg border border-border bg-white/80 px-4 py-4 sm:mt-6 sm:px-5 ${
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

function StageCoverageContent({
  visible,
  reduceMotion,
}: {
  visible: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border border-border bg-white p-5 shadow-[0_12px_32px_rgba(32,39,40,0.1)] sm:p-6">
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

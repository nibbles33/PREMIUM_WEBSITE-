"use client";

import type { LucideIcon } from "lucide-react";
import {
  Car,
  CloudLightning,
  CloudRain,
  HeartPulse,
  KeyRound,
  Shield,
  ShieldAlert,
  Snowflake,
  Timer,
  UserRound,
} from "lucide-react";
import type { AutoCoverageItem } from "@/data/pilot-auto";

type AutoCoverageVisualStageProps = {
  active: AutoCoverageItem;
};

const sceneIcons: Record<AutoCoverageItem["visualScene"], LucideIcon> = {
  liability: Shield,
  collision: Car,
  comprehensive: CloudLightning,
  "accident-benefits": HeartPulse,
  uninsured: ShieldAlert,
  "loss-of-use": Timer,
};

export default function AutoCoverageVisualStage({
  active,
}: AutoCoverageVisualStageProps) {
  const SceneIcon = sceneIcons[active.visualScene];

  return (
    <div
      className="pilot-auto-coverage-stage"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="pilot-auto-coverage-stage-eyebrow">
        {active.visualEyebrow}
      </p>

      <div className="pilot-auto-coverage-stage-frame">
        {/* Asset slot — awaiting commissioned miniature car illustration */}
        <div className="pilot-auto-car-asset-slot" aria-hidden>
          <div className="pilot-auto-car-asset-platform" />
          <div className="pilot-auto-car-asset-placeholder">
            <Car className="h-8 w-8 text-charcoal/20" strokeWidth={1.25} />
            <span className="pilot-auto-car-asset-label">
              Premium miniature car
              <span className="block text-[11px] font-normal text-secondary/80">
                Illustration pending
              </span>
            </span>
          </div>
        </div>

        {/* Coverage-specific protection layers */}
        <div
          className={`pilot-auto-coverage-scene pilot-auto-coverage-scene--${active.visualScene}`}
          aria-hidden
        >
          {active.visualScene === "liability" ? (
            <>
              <span className="pilot-auto-scene-ring pilot-auto-scene-ring--outer" />
              <span className="pilot-auto-scene-ring pilot-auto-scene-ring--inner" />
              <span className="pilot-auto-scene-badge pilot-auto-scene-badge--left">
                <Shield className="h-5 w-5" strokeWidth={1.5} />
                <span>Others protected</span>
              </span>
            </>
          ) : null}

          {active.visualScene === "collision" ? (
            <>
              <span className="pilot-auto-scene-impact" />
              <span className="pilot-auto-scene-badge pilot-auto-scene-badge--front">
                <Car className="h-5 w-5" strokeWidth={1.5} />
                <span>Your vehicle</span>
              </span>
            </>
          ) : null}

          {active.visualScene === "comprehensive" ? (
            <>
              <span className="pilot-auto-scene-weather pilot-auto-scene-weather--cloud">
                <CloudRain className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="pilot-auto-scene-weather pilot-auto-scene-weather--bolt">
                <CloudLightning className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="pilot-auto-scene-weather pilot-auto-scene-weather--snow">
                <Snowflake className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <span className="pilot-auto-scene-badge pilot-auto-scene-badge--top">
                <span>Weather &amp; theft</span>
              </span>
            </>
          ) : null}

          {active.visualScene === "accident-benefits" ? (
            <>
              <span className="pilot-auto-scene-occupant pilot-auto-scene-occupant--driver">
                <UserRound className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <span className="pilot-auto-scene-occupant pilot-auto-scene-occupant--passenger">
                <UserRound className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <span className="pilot-auto-scene-badge pilot-auto-scene-badge--cabin">
                <HeartPulse className="h-5 w-5" strokeWidth={1.5} />
                <span>Medical &amp; rehab</span>
              </span>
            </>
          ) : null}

          {active.visualScene === "uninsured" ? (
            <>
              <span className="pilot-auto-scene-other-car" />
              <span className="pilot-auto-scene-shield-between">
                <ShieldAlert className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <span className="pilot-auto-scene-badge pilot-auto-scene-badge--side">
                <span>Uninsured driver</span>
              </span>
            </>
          ) : null}

          {active.visualScene === "loss-of-use" ? (
            <>
              <span className="pilot-auto-scene-replacement-car">
                <Car className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="pilot-auto-scene-keys">
                <KeyRound className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="pilot-auto-scene-arrow" aria-hidden>
                →
              </span>
              <span className="pilot-auto-scene-badge pilot-auto-scene-badge--bottom">
                <Timer className="h-5 w-5" strokeWidth={1.5} />
                <span>Replacement transport</span>
              </span>
            </>
          ) : null}
        </div>
      </div>

      <div className="pilot-auto-coverage-stage-caption">
        <span className="pilot-auto-coverage-stage-icon" aria-hidden>
          <SceneIcon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div>
          <p className="pilot-auto-coverage-stage-title">{active.visualCaption}</p>
          <p className="pilot-auto-coverage-stage-sub">{active.visualSubcaption}</p>
        </div>
      </div>

      <p className="sr-only">{active.title}: {active.visualCaption}</p>
    </div>
  );
}

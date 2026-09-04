import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import {
  MINIATURE_IMAGE_SIZES,
  PREMIUM_MINIATURES,
} from "@/data/coverage-explorer/miniature-assets";

/**
 * Fleet / commercial auto — object-on-plinth treatment (like Auto explorer),
 * not zone-targeting within the artwork.
 */
export const fleetCommercialVehicleExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "fleet-commercial-vehicle",
  sceneMode: "object-only",
  cssSceneClass: "fleet",
  object: {
    src: PREMIUM_MINIATURES.workTruckFleet.src,
    width: PREMIUM_MINIATURES.workTruckFleet.width,
    height: PREMIUM_MINIATURES.workTruckFleet.height,
    quality: 92,
    sizes: MINIATURE_IMAGE_SIZES,
    blendBackground: true,
  },
  objectLayout: {
    width: "94%",
    maxWidth: "26rem",
  },
  zones: [
    {
      id: "service-truck",
      style: "glow",
      position: { left: "6%", bottom: "16%", width: "42%", height: "44%" },
      label: "Service truck",
    },
    {
      id: "cargo-van",
      style: "glow",
      position: { right: "8%", bottom: "18%", width: "38%", height: "40%" },
      label: "Cargo van",
    },
    {
      id: "liability-perimeter",
      style: "pulse",
      position: { left: "4%", bottom: "10%", width: "92%", height: "52%" },
      label: "Road & third-party exposure",
    },
    {
      id: "physical-damage-zone",
      style: "outline",
      position: { left: "8%", bottom: "14%", width: "84%", height: "48%" },
      label: "Vehicle bodies",
    },
    {
      id: "fleet-ring-outer",
      style: "outline",
      position: { left: "50%", bottom: "32%", width: "78%", height: "48%", transform: "translateX(-50%)" },
      label: "Fleet coverage",
    },
  ],
  coverageStates: [
    {
      coverageId: "liability-coverage",
      activeZoneIds: ["liability-perimeter"],
      sceneModifier: "liability-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 80% 52% at 50% 62%, rgba(208, 173, 38, 0.12) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "physical-damage-coverage",
      activeZoneIds: ["service-truck", "cargo-van", "physical-damage-zone"],
      sceneModifier: "physical-damage-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 70% 48% at 50% 58%, rgba(91, 122, 153, 0.12) 0%, transparent 68%)",
      },
    },
    {
      coverageId: "hired-non-owned-auto",
      activeZoneIds: ["liability-perimeter", "fleet-ring-outer"],
      sceneModifier: "hired-non-owned-auto",
      ambient: {
        background:
          "radial-gradient(circle at 50% 55%, rgba(208, 173, 38, 0.08) 0%, transparent 60%)",
      },
    },
    {
      coverageId: "fleet-discounts-multi-vehicle-management",
      activeZoneIds: ["service-truck", "cargo-van", "fleet-ring-outer"],
      sceneModifier: "fleet-discounts-multi-vehicle-management",
      ambient: {
        background:
          "radial-gradient(ellipse 85% 55% at 50% 54%, rgba(208, 173, 38, 0.14) 0%, transparent 70%)",
      },
    },
  ],
};

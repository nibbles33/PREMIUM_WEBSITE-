import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import { PREMIUM_MINIATURES } from "@/data/coverage-explorer/miniature-assets";

/** Zones aligned to premium-commercial-building.png. */
export const commercialBuildingExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "commercial-building",
  sceneMode: "cutaway-miniature",
  sceneSrc: PREMIUM_MINIATURES.commercialBuilding.src,
  sceneDimensions: {
    width: PREMIUM_MINIATURES.commercialBuilding.width,
    height: PREMIUM_MINIATURES.commercialBuilding.height,
  },
  cssSceneClass: "commercial-building",
  zones: [
    {
      id: "ground-floor-retail",
      style: "glow",
      position: { left: "20%", bottom: "6%", width: "60%", height: "34%" },
      label: "Ground floor & entrance",
    },
    {
      id: "tenant-floors",
      style: "outline",
      position: { left: "16%", top: "24%", width: "68%", height: "50%" },
      label: "Tenant floors",
    },
    {
      id: "rooftop-terrace",
      style: "pulse",
      position: { left: "22%", top: "2%", width: "56%", height: "20%" },
      label: "Rooftop terrace",
    },
    {
      id: "exterior-shell",
      style: "fill",
      position: { left: "10%", top: "4%", width: "80%", height: "90%" },
      label: "Building shell",
    },
    {
      id: "contents-equipment",
      style: "glow",
      position: { left: "24%", top: "32%", width: "52%", height: "38%" },
      label: "Contents & equipment",
    },
    {
      id: "mechanical-penthouse",
      style: "pulse",
      position: { left: "38%", top: "6%", width: "24%", height: "12%" },
      label: "Mechanical systems",
    },
  ],
  coverageStates: [
    {
      coverageId: "building-coverage",
      activeZoneIds: ["exterior-shell", "ground-floor-retail"],
      sceneModifier: "building-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 72% 65% at 50% 48%, rgba(179, 122, 90, 0.12) 0%, transparent 75%)",
      },
    },
    {
      coverageId: "contents-equipment",
      activeZoneIds: ["contents-equipment", "tenant-floors"],
      sceneModifier: "contents-equipment",
      ambient: {
        background:
          "radial-gradient(ellipse 58% 48% at 50% 52%, rgba(208, 173, 38, 0.12) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "equipment-breakdown",
      activeZoneIds: ["mechanical-penthouse", "ground-floor-retail"],
      sceneModifier: "equipment-breakdown",
      ambient: {
        background:
          "radial-gradient(circle at 50% 28%, rgba(91, 122, 153, 0.14) 0%, transparent 55%)",
      },
    },
    {
      coverageId: "commercial-landlord-property-owner",
      activeZoneIds: ["exterior-shell", "tenant-floors", "rooftop-terrace"],
      sceneModifier: "commercial-landlord-property-owner",
      ambient: {
        background:
          "radial-gradient(ellipse 80% 70% at 50% 42%, rgba(208, 173, 38, 0.1) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "business-interruption",
      activeZoneIds: ["tenant-floors", "ground-floor-retail"],
      sceneModifier: "business-interruption",
      ambient: {
        background:
          "linear-gradient(180deg, rgba(32, 39, 40, 0.06) 0%, rgba(32, 39, 40, 0.16) 100%)",
        dimOpacity: 0.22,
      },
    },
    {
      coverageId: "lost-income",
      activeZoneIds: ["tenant-floors", "ground-floor-retail"],
      sceneModifier: "lost-income",
      ambient: {
        background:
          "linear-gradient(180deg, rgba(32, 39, 40, 0.08) 0%, rgba(32, 39, 40, 0.2) 100%)",
        dimOpacity: 0.28,
      },
    },
    {
      coverageId: "continuing-expenses",
      activeZoneIds: ["exterior-shell", "tenant-floors"],
      sceneModifier: "continuing-expenses",
      ambient: {
        background:
          "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(91, 122, 153, 0.12) 0%, transparent 72%)",
        dimOpacity: 0.15,
      },
    },
    {
      coverageId: "extra-expense",
      activeZoneIds: ["ground-floor-retail", "mechanical-penthouse"],
      sceneModifier: "extra-expense",
      ambient: {
        background:
          "radial-gradient(circle at 50% 62%, rgba(208, 173, 38, 0.12) 0%, transparent 55%)",
      },
    },
    {
      coverageId: "contingent-business-interruption",
      activeZoneIds: ["exterior-shell"],
      sceneModifier: "contingent-business-interruption",
      ambient: {
        background:
          "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(208, 173, 38, 0.08) 0%, transparent 75%)",
        dimOpacity: 0.18,
      },
    },
  ],
};

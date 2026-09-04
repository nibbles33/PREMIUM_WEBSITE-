import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";

/**
 * Restaurant / hospitality cutaway scene — CSS isometric placeholder.
 * RESTAURANT INTERACTIVE SCENE ASSET REQUIRED for layered photo artwork.
 */
export const restaurantHospitalityExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "restaurant-hospitality",
  sceneMode: "css-cutaway",
  cssSceneClass: "restaurant",
  zones: [
    {
      id: "dining-floor",
      shape: "dining-floor",
      style: "glow",
      position: { left: "8%", bottom: "18%", width: "52%", height: "38%" },
      label: "Dining & guest area",
    },
    {
      id: "entrance-path",
      shape: "entrance-path",
      style: "pulse",
      position: { left: "4%", bottom: "12%", width: "22%", height: "18%" },
      label: "Entrance",
    },
    {
      id: "building-shell",
      shape: "building-shell",
      style: "outline",
      position: { left: "4%", top: "6%", width: "92%", height: "88%" },
      label: "Premises",
    },
    {
      id: "interior-fixtures",
      shape: "interior-fixtures",
      style: "fill",
      position: { left: "14%", top: "22%", width: "72%", height: "58%" },
      label: "Fixtures & improvements",
    },
    {
      id: "bar-area",
      shape: "bar-area",
      style: "glow",
      position: { right: "8%", top: "28%", width: "28%", height: "32%" },
      label: "Bar & liquor service",
    },
    {
      id: "bottle-display",
      shape: "bottle-display",
      style: "pulse",
      position: { right: "12%", top: "22%", width: "18%", height: "14%" },
      label: "Bottle display",
    },
    {
      id: "kitchen-zone",
      shape: "kitchen-zone",
      style: "outline",
      position: { left: "8%", top: "18%", width: "38%", height: "42%" },
      label: "Kitchen",
    },
    {
      id: "cooking-equipment",
      shape: "cooking-equipment",
      style: "pulse",
      position: { left: "14%", top: "24%", width: "22%", height: "20%" },
      label: "Range & oven",
    },
    {
      id: "refrigeration",
      shape: "refrigeration",
      style: "glow",
      position: { left: "38%", top: "26%", width: "14%", height: "24%" },
      label: "Refrigeration",
    },
  ],
  coverageStates: [
    {
      coverageId: "general-liability",
      activeZoneIds: ["dining-floor", "entrance-path"],
      sceneModifier: "general-liability",
      ambient: {
        background:
          "radial-gradient(ellipse 68% 52% at 42% 62%, rgba(208, 173, 38, 0.14) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "property-coverage",
      activeZoneIds: ["building-shell", "interior-fixtures"],
      sceneModifier: "property-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(179, 122, 90, 0.12) 0%, transparent 75%)",
      },
    },
    {
      coverageId: "liquor-liability",
      activeZoneIds: ["bar-area", "bottle-display"],
      sceneModifier: "liquor-liability",
      ambient: {
        background:
          "radial-gradient(circle at 78% 38%, rgba(208, 173, 38, 0.18) 0%, transparent 52%)",
        dimOpacity: 0.15,
      },
    },
    {
      coverageId: "equipment-breakdown-spoilage",
      activeZoneIds: ["kitchen-zone", "cooking-equipment", "refrigeration"],
      sceneModifier: "equipment-breakdown-spoilage",
      ambient: {
        background:
          "radial-gradient(circle at 28% 38%, rgba(91, 122, 153, 0.14) 0%, transparent 55%)",
      },
    },
  ],
};

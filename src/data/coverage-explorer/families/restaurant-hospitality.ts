import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import {
  MINIATURE_IMAGE_SIZES,
  PREMIUM_MINIATURES,
} from "@/data/coverage-explorer/miniature-assets";

/** Zones aligned to premium-restaurant.png isometric cutaway. */
export const restaurantHospitalityExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "restaurant-hospitality",
  sceneMode: "cutaway-miniature",
  sceneSrc: PREMIUM_MINIATURES.restaurant.src,
  sceneDimensions: {
    width: PREMIUM_MINIATURES.restaurant.width,
    height: PREMIUM_MINIATURES.restaurant.height,
  },
  cssSceneClass: "restaurant",
  zones: [
    {
      id: "kitchen-zone",
      style: "outline",
      position: { left: "5%", top: "16%", width: "40%", height: "44%" },
      label: "Kitchen",
    },
    {
      id: "cooking-equipment",
      style: "pulse",
      position: { left: "10%", top: "20%", width: "26%", height: "24%" },
      label: "Range, hood & ovens",
    },
    {
      id: "refrigeration",
      style: "glow",
      position: { left: "30%", top: "22%", width: "14%", height: "22%" },
      label: "Refrigeration",
    },
    {
      id: "bar-area",
      style: "glow",
      position: { right: "4%", top: "26%", width: "34%", height: "40%" },
      label: "Bar & prep counter",
    },
    {
      id: "bar-stools",
      style: "pulse",
      position: { right: "8%", top: "48%", width: "26%", height: "14%" },
      label: "Bar seating",
    },
    {
      id: "dining-floor",
      style: "glow",
      position: { left: "20%", bottom: "12%", width: "44%", height: "38%" },
      label: "Dining area",
    },
    {
      id: "entrance-shell",
      style: "outline",
      position: { left: "1%", top: "28%", width: "20%", height: "52%" },
      label: "Entrance & facade",
    },
    {
      id: "building-shell",
      style: "fill",
      position: { left: "2%", top: "8%", width: "96%", height: "84%" },
      label: "Premises & shell",
    },
  ],
  coverageStates: [
    {
      coverageId: "general-liability",
      activeZoneIds: ["dining-floor", "entrance-shell", "bar-stools"],
      sceneModifier: "general-liability",
      ambient: {
        background:
          "radial-gradient(ellipse 62% 48% at 38% 68%, rgba(208, 173, 38, 0.16) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "property-coverage",
      activeZoneIds: ["building-shell", "kitchen-zone", "bar-area"],
      sceneModifier: "property-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 78% 68% at 50% 42%, rgba(179, 122, 90, 0.12) 0%, transparent 75%)",
      },
    },
    {
      coverageId: "liquor-liability",
      activeZoneIds: ["bar-area", "bar-stools"],
      sceneModifier: "liquor-liability",
      ambient: {
        background:
          "radial-gradient(circle at 76% 42%, rgba(208, 173, 38, 0.2) 0%, transparent 52%)",
        dimOpacity: 0.12,
      },
    },
    {
      coverageId: "equipment-breakdown-spoilage",
      activeZoneIds: ["kitchen-zone", "cooking-equipment", "refrigeration"],
      sceneModifier: "equipment-breakdown-spoilage",
      ambient: {
        background:
          "radial-gradient(circle at 24% 36%, rgba(91, 122, 153, 0.16) 0%, transparent 55%)",
      },
    },
  ],
};

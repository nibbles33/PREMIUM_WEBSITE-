import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import { PREMIUM_MINIATURES } from "@/data/coverage-explorer/miniature-assets";

/** Zones aligned to premium-factory.png. */
export const factoryIndustrialExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "factory-industrial",
  sceneMode: "cutaway-miniature",
  sceneSrc: PREMIUM_MINIATURES.factory.src,
  sceneDimensions: {
    width: PREMIUM_MINIATURES.factory.width,
    height: PREMIUM_MINIATURES.factory.height,
  },
  cssSceneClass: "factory",
  zones: [
    {
      id: "cnc-machine",
      style: "glow",
      position: { left: "4%", top: "14%", width: "42%", height: "48%" },
      label: "CNC machine",
    },
    {
      id: "robotic-arm",
      style: "pulse",
      position: { right: "8%", top: "16%", width: "36%", height: "42%" },
      label: "Robotic arm station",
    },
    {
      id: "parts-tooling",
      style: "fill",
      position: { left: "28%", bottom: "16%", width: "44%", height: "32%" },
      label: "Parts & tooling storage",
    },
    {
      id: "safety-fencing",
      style: "outline",
      position: { left: "6%", top: "10%", width: "88%", height: "78%" },
      label: "Safety perimeter",
    },
    {
      id: "storage-lockers",
      style: "glow",
      position: { right: "4%", top: "12%", width: "18%", height: "28%" },
      label: "Storage cabinets",
    },
    {
      id: "production-floor",
      style: "fill",
      position: { left: "8%", top: "12%", width: "84%", height: "76%" },
      label: "Production floor",
    },
  ],
  coverageStates: [
    {
      coverageId: "product-liability",
      activeZoneIds: ["parts-tooling", "robotic-arm"],
      sceneModifier: "product-liability",
      ambient: {
        background:
          "radial-gradient(circle at 72% 38%, rgba(208, 173, 38, 0.12) 0%, transparent 55%)",
      },
    },
    {
      coverageId: "commercial-property",
      activeZoneIds: ["production-floor", "storage-lockers"],
      sceneModifier: "commercial-property",
      ambient: {
        background:
          "radial-gradient(ellipse 75% 62% at 50% 48%, rgba(179, 122, 90, 0.12) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "business-interruption",
      activeZoneIds: ["production-floor"],
      sceneModifier: "business-interruption",
      ambient: {
        background:
          "linear-gradient(180deg, rgba(32, 39, 40, 0.08) 0%, rgba(32, 39, 40, 0.2) 100%)",
        dimOpacity: 0.25,
      },
    },
    {
      coverageId: "equipment-breakdown",
      activeZoneIds: ["cnc-machine", "robotic-arm"],
      sceneModifier: "equipment-breakdown",
      ambient: {
        background:
          "radial-gradient(circle at 28% 36%, rgba(91, 122, 153, 0.16) 0%, transparent 58%)",
      },
    },
    {
      coverageId: "machine-shop-tool-die",
      activeZoneIds: ["cnc-machine", "parts-tooling"],
      sceneModifier: "machine-shop-tool-die",
      ambient: {
        background:
          "radial-gradient(ellipse 60% 50% at 38% 52%, rgba(208, 173, 38, 0.14) 0%, transparent 68%)",
      },
    },
  ],
};

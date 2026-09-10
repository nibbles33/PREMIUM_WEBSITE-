import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import { PREMIUM_MINIATURES } from "@/data/coverage-explorer/miniature-assets";

/** Zones aligned to premium-farm.png. */
export const farmExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "farm",
  sceneMode: "cutaway-miniature",
  sceneSrc: PREMIUM_MINIATURES.farm.src,
  sceneDimensions: {
    width: PREMIUM_MINIATURES.farm.width,
    height: PREMIUM_MINIATURES.farm.height,
  },
  cssSceneClass: "farm",
  zones: [
    {
      id: "barn-structure",
      style: "outline",
      position: { right: "8%", top: "14%", width: "52%", height: "52%" },
      label: "Barn & outbuildings",
    },
    {
      id: "silo",
      style: "glow",
      position: { left: "38%", top: "4%", width: "16%", height: "32%" },
      label: "Silo",
    },
    {
      id: "tractor-equipment",
      style: "pulse",
      position: { left: "34%", bottom: "28%", width: "28%", height: "28%" },
      label: "Tractor & equipment",
    },
    {
      id: "crop-rows",
      style: "fill",
      position: { left: "4%", bottom: "8%", width: "38%", height: "42%" },
      label: "Crop rows",
    },
    {
      id: "perimeter-fencing",
      style: "outline",
      position: { left: "0%", top: "18%", width: "14%", height: "68%" },
      label: "Perimeter fencing",
    },
    {
      id: "farm-yard",
      style: "glow",
      position: { left: "28%", bottom: "10%", width: "66%", height: "38%" },
      label: "Farm yard & access",
    },
  ],
  coverageStates: [
    {
      coverageId: "farm-property-coverage",
      activeZoneIds: ["barn-structure", "silo"],
      sceneModifier: "farm-property-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 62% 55% at 68% 36%, rgba(179, 122, 90, 0.14) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "equipment-machinery",
      activeZoneIds: ["tractor-equipment"],
      sceneModifier: "equipment-machinery",
      ambient: {
        background:
          "radial-gradient(circle at 48% 58%, rgba(91, 122, 153, 0.14) 0%, transparent 55%)",
      },
    },
    {
      coverageId: "farm-liability",
      activeZoneIds: ["perimeter-fencing", "farm-yard"],
      sceneModifier: "farm-liability",
      ambient: {
        background:
          "radial-gradient(ellipse 78% 40% at 42% 72%, rgba(208, 173, 38, 0.1) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "livestock-coverage",
      activeZoneIds: ["barn-structure", "crop-rows"],
      sceneModifier: "livestock-coverage",
      ambient: {
        background:
          "radial-gradient(circle at 58% 48%, rgba(122, 139, 92, 0.14) 0%, transparent 58%)",
      },
    },
  ],
};

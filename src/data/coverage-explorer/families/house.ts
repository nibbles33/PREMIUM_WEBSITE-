import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import { PREMIUM_MINIATURES } from "@/data/coverage-explorer/miniature-assets";

/** Zones aligned to premium-house.png isometric cutaway. */
export const houseExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "house",
  sceneMode: "cutaway-miniature",
  sceneSrc: PREMIUM_MINIATURES.house.src,
  sceneDimensions: {
    width: PREMIUM_MINIATURES.house.width,
    height: PREMIUM_MINIATURES.house.height,
  },
  cssSceneClass: "house",
  zones: [
    {
      id: "roof-walls",
      style: "outline",
      position: { left: "14%", top: "8%", width: "72%", height: "30%" },
      label: "Roof & structure",
    },
    {
      id: "dwelling-structure",
      style: "glow",
      position: { left: "16%", top: "18%", width: "68%", height: "58%" },
      label: "Dwelling",
    },
    {
      id: "interior-contents",
      style: "fill",
      position: { left: "26%", top: "34%", width: "48%", height: "32%" },
      label: "Interior & contents",
    },
    {
      id: "garage-zone",
      style: "glow",
      position: { left: "8%", top: "38%", width: "22%", height: "28%" },
      label: "Garage",
    },
    {
      id: "driveway-zone",
      style: "pulse",
      position: { left: "6%", bottom: "10%", width: "32%", height: "16%" },
      label: "Driveway",
    },
    {
      id: "walkway-porch",
      style: "pulse",
      position: { left: "38%", bottom: "8%", width: "24%", height: "18%" },
      label: "Walkway & porch",
    },
    {
      id: "exterior-liability",
      style: "outline",
      position: { left: "4%", bottom: "6%", width: "92%", height: "24%" },
      label: "Exterior & visitors",
    },
    {
      id: "high-value-callout",
      style: "glow",
      position: { left: "34%", top: "40%", width: "32%", height: "20%" },
      label: "High-value finishes",
    },
    {
      id: "ale-indicator",
      style: "pulse",
      position: { right: "6%", bottom: "12%", width: "30%", height: "28%" },
      label: "Temporary accommodation",
    },
  ],
  coverageStates: [
    {
      coverageId: "dwelling-coverage",
      activeZoneIds: ["dwelling-structure", "roof-walls", "garage-zone"],
      sceneModifier: "dwelling-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 70% 55% at 50% 36%, rgba(179, 122, 90, 0.14) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "contents-coverage",
      activeZoneIds: ["interior-contents"],
      sceneModifier: "contents-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 48% 38% at 50% 48%, rgba(208, 173, 38, 0.14) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "liability-protection",
      activeZoneIds: ["exterior-liability", "driveway-zone", "walkway-porch"],
      sceneModifier: "liability-protection",
      ambient: {
        background:
          "radial-gradient(ellipse 85% 32% at 50% 88%, rgba(208, 173, 38, 0.1) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "additional-living-expenses",
      activeZoneIds: ["ale-indicator"],
      sceneModifier: "additional-living-expenses",
      ambient: {
        background:
          "radial-gradient(circle at 78% 72%, rgba(91, 122, 153, 0.14) 0%, transparent 55%)",
        dimOpacity: 0.18,
      },
    },
    {
      coverageId: "high-value-home-considerations",
      activeZoneIds: ["high-value-callout", "interior-contents"],
      sceneModifier: "high-value-home-considerations",
      ambient: {
        background:
          "radial-gradient(circle at 50% 46%, rgba(208, 173, 38, 0.16) 0%, transparent 58%)",
      },
    },
  ],
};

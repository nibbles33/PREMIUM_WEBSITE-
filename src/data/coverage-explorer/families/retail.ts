import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import { PREMIUM_MINIATURES } from "@/data/coverage-explorer/miniature-assets";

/** Zones aligned to premium-retail-store.png. */
export const retailExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "retail",
  sceneMode: "cutaway-miniature",
  sceneSrc: PREMIUM_MINIATURES.retailStore.src,
  sceneDimensions: {
    width: PREMIUM_MINIATURES.retailStore.width,
    height: PREMIUM_MINIATURES.retailStore.height,
  },
  cssSceneClass: "retail",
  zones: [
    {
      id: "storefront-entrance",
      style: "pulse",
      position: { left: "32%", bottom: "8%", width: "36%", height: "28%" },
      label: "Entrance & steps",
    },
    {
      id: "left-display-window",
      style: "glow",
      position: { left: "6%", top: "28%", width: "28%", height: "42%" },
      label: "Left display window",
    },
    {
      id: "right-display-window",
      style: "glow",
      position: { right: "6%", top: "26%", width: "30%", height: "44%" },
      label: "Right display window",
    },
    {
      id: "interior-inventory",
      style: "fill",
      position: { left: "28%", top: "32%", width: "44%", height: "38%" },
      label: "Interior inventory",
    },
    {
      id: "building-shell",
      style: "outline",
      position: { left: "4%", top: "6%", width: "92%", height: "86%" },
      label: "Storefront shell",
    },
    {
      id: "premises-landscaping",
      style: "outline",
      position: { left: "2%", bottom: "4%", width: "96%", height: "22%" },
      label: "Premises & walkway",
    },
  ],
  coverageStates: [
    {
      coverageId: "general-liability",
      activeZoneIds: ["storefront-entrance", "premises-landscaping"],
      sceneModifier: "general-liability",
      ambient: {
        background:
          "radial-gradient(ellipse 75% 38% at 50% 82%, rgba(208, 173, 38, 0.12) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "property-inventory-coverage",
      activeZoneIds: ["left-display-window", "right-display-window", "interior-inventory"],
      sceneModifier: "property-inventory-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 68% 55% at 50% 48%, rgba(179, 122, 90, 0.12) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "business-interruption",
      activeZoneIds: ["building-shell", "interior-inventory"],
      sceneModifier: "business-interruption",
      ambient: {
        background:
          "linear-gradient(180deg, rgba(32, 39, 40, 0.06) 0%, rgba(32, 39, 40, 0.18) 100%)",
        dimOpacity: 0.2,
      },
    },
    {
      coverageId: "product-liability",
      activeZoneIds: ["left-display-window", "interior-inventory"],
      sceneModifier: "product-liability",
      ambient: {
        background:
          "radial-gradient(circle at 32% 48%, rgba(208, 173, 38, 0.14) 0%, transparent 55%)",
      },
    },
  ],
};

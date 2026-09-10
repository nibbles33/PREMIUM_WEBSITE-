import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";

export const boatExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "boat",
  sceneMode: "photo-scene",
  sceneSrc: "/images/photography/personal/boat.webp",
  cssSceneClass: "boat",
  zones: [
    {
      id: "hull",
      shape: "hull",
      style: "outline",
      position: { left: "22%", bottom: "28%", width: "56%", height: "28%" },
      label: "Hull",
    },
    {
      id: "motor-equipment",
      shape: "motor-equipment",
      style: "glow",
      position: { right: "18%", bottom: "32%", width: "22%", height: "18%" },
      label: "Motor & equipment",
    },
    {
      id: "liability-perimeter",
      shape: "liability-perimeter",
      style: "pulse",
      position: { left: "8%", bottom: "12%", width: "84%", height: "52%" },
      label: "Liability perimeter",
    },
    {
      id: "navigation-radius",
      shape: "navigation-radius",
      style: "glow",
      position: { left: "50%", top: "18%", width: "72%", height: "48%", transform: "translateX(-50%)" },
      label: "Navigation territory",
    },
    {
      id: "trailer-equipment",
      shape: "trailer-equipment",
      style: "fill",
      position: { left: "12%", bottom: "8%", width: "28%", height: "16%" },
      label: "Trailer & gear",
    },
  ],
  coverageStates: [
    {
      coverageId: "hull-machinery",
      activeZoneIds: ["hull"],
      sceneModifier: "hull-machinery",
      ambient: {
        background:
          "radial-gradient(ellipse 60% 40% at 50% 68%, rgba(74, 138, 138, 0.16) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "liability-coverage",
      activeZoneIds: ["liability-perimeter"],
      sceneModifier: "liability-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 80% 55% at 50% 60%, rgba(208, 173, 38, 0.1) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "equipment-trailers",
      activeZoneIds: ["motor-equipment", "trailer-equipment"],
      sceneModifier: "equipment-trailers",
      ambient: {
        background:
          "radial-gradient(circle at 72% 62%, rgba(91, 122, 153, 0.12) 0%, transparent 52%)",
      },
    },
    {
      coverageId: "navigation-use-territory",
      activeZoneIds: ["navigation-radius"],
      sceneModifier: "navigation-use-territory",
      ambient: {
        background:
          "radial-gradient(ellipse 75% 50% at 50% 35%, rgba(74, 138, 138, 0.14) 0%, transparent 68%)",
      },
    },
  ],
};

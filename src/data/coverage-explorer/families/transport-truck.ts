import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";

export const transportTruckExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "transport-truck",
  sceneMode: "photo-scene",
  sceneSrc: "/images/photography/commercial/trucking-insurance.webp",
  cssSceneClass: "transport-truck",
  zones: [
    {
      id: "tractor-unit",
      shape: "tractor-unit",
      style: "outline",
      position: { left: "14%", bottom: "24%", width: "32%", height: "32%" },
      label: "Tractor",
    },
    {
      id: "liability-perimeter",
      shape: "liability-perimeter",
      style: "pulse",
      position: { left: "8%", bottom: "12%", width: "84%", height: "48%" },
      label: "Road interaction",
    },
    {
      id: "trailer-cargo",
      shape: "trailer-cargo",
      style: "glow",
      position: { right: "10%", bottom: "26%", width: "42%", height: "28%" },
      label: "Trailer & cargo",
    },
    {
      id: "body-damage",
      shape: "body-damage",
      style: "fill",
      position: { left: "12%", bottom: "22%", width: "76%", height: "34%" },
      label: "Physical damage",
    },
    {
      id: "attached-equipment",
      shape: "attached-equipment",
      style: "glow",
      position: { left: "38%", bottom: "30%", width: "24%", height: "18%" },
      label: "Attached equipment",
    },
    {
      id: "cross-border-route",
      shape: "cross-border-route",
      style: "pulse",
      position: { left: "6%", top: "20%", width: "88%", height: "22%" },
      label: "Cross-border route",
    },
  ],
  coverageStates: [
    {
      coverageId: "cargo-insurance",
      activeZoneIds: ["trailer-cargo"],
      sceneModifier: "cargo-insurance",
      ambient: {
        background:
          "radial-gradient(circle at 72% 58%, rgba(208, 173, 38, 0.14) 0%, transparent 55%)",
      },
    },
    {
      coverageId: "liability-coverage",
      activeZoneIds: ["liability-perimeter", "tractor-unit"],
      sceneModifier: "liability-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 80% 50% at 50% 62%, rgba(208, 173, 38, 0.1) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "physical-damage",
      activeZoneIds: ["body-damage", "tractor-unit"],
      sceneModifier: "physical-damage",
      ambient: {
        background:
          "radial-gradient(ellipse 70% 45% at 48% 58%, rgba(91, 122, 153, 0.12) 0%, transparent 68%)",
      },
    },
    {
      coverageId: "cross-border-coverage",
      activeZoneIds: ["cross-border-route"],
      sceneModifier: "cross-border-coverage",
      ambient: {
        background:
          "linear-gradient(90deg, rgba(208, 173, 38, 0.06) 0%, rgba(91, 122, 153, 0.1) 50%, rgba(208, 173, 38, 0.06) 100%)",
      },
    },
  ],
};

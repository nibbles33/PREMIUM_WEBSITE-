import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";

export const greenhouseExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "greenhouse",
  sceneMode: "photo-scene",
  sceneSrc: "/images/photography/commercial/greenhouse.webp",
  cssSceneClass: "greenhouse",
  zones: [
    {
      id: "greenhouse-shell",
      shape: "greenhouse-shell",
      style: "outline",
      position: { left: "10%", top: "14%", width: "80%", height: "58%" },
      label: "Greenhouse structures",
    },
    {
      id: "mechanical-systems",
      shape: "mechanical-systems",
      style: "pulse",
      position: { right: "12%", top: "22%", width: "24%", height: "28%" },
      label: "Heating & irrigation",
    },
    {
      id: "crop-stock-zones",
      shape: "crop-stock-zones",
      style: "glow",
      position: { left: "16%", bottom: "18%", width: "68%", height: "32%" },
      label: "Stock & crops",
    },
    {
      id: "downtime-overlay",
      shape: "downtime-overlay",
      style: "fill",
      position: { left: "0", top: "0", width: "100%", height: "100%" },
      label: "Downtime",
    },
    {
      id: "equipment-alert",
      shape: "equipment-alert",
      style: "pulse",
      position: { left: "38%", top: "28%", width: "28%", height: "24%" },
      label: "Critical equipment",
    },
  ],
  coverageStates: [
    {
      coverageId: "greenhouse-buildings-structures",
      activeZoneIds: ["greenhouse-shell"],
      sceneModifier: "greenhouse-buildings-structures",
      ambient: {
        background:
          "radial-gradient(ellipse 75% 60% at 50% 40%, rgba(107, 143, 113, 0.16) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "equipment-machinery",
      activeZoneIds: ["mechanical-systems", "equipment-alert"],
      sceneModifier: "equipment-machinery",
      ambient: {
        background:
          "radial-gradient(circle at 72% 38%, rgba(208, 173, 38, 0.12) 0%, transparent 55%)",
      },
    },
    {
      coverageId: "business-property-stock",
      activeZoneIds: ["crop-stock-zones"],
      sceneModifier: "business-property-stock",
      ambient: {
        background:
          "radial-gradient(ellipse 70% 45% at 50% 72%, rgba(107, 143, 113, 0.14) 0%, transparent 68%)",
      },
    },
    {
      coverageId: "business-interruption",
      activeZoneIds: ["downtime-overlay"],
      sceneModifier: "business-interruption",
      ambient: {
        background:
          "linear-gradient(180deg, rgba(32, 39, 40, 0.08) 0%, rgba(32, 39, 40, 0.18) 100%)",
        dimOpacity: 0.35,
      },
    },
    {
      coverageId: "commercial-liability",
      activeZoneIds: ["greenhouse-shell"],
      sceneModifier: "commercial-liability",
      ambient: {
        background:
          "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(208, 173, 38, 0.08) 0%, transparent 75%)",
      },
    },
    {
      coverageId: "equipment-breakdown",
      activeZoneIds: ["mechanical-systems", "equipment-alert"],
      sceneModifier: "equipment-breakdown",
      ambient: {
        background:
          "radial-gradient(circle at 52% 42%, rgba(208, 173, 38, 0.14) 0%, transparent 58%)",
      },
    },
  ],
};

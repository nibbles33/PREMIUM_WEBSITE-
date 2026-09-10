import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import { PREMIUM_MINIATURES } from "@/data/coverage-explorer/miniature-assets";

/** Zones aligned to premium-construction-site.png. */
export const constructionExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "construction",
  sceneMode: "cutaway-miniature",
  sceneSrc: PREMIUM_MINIATURES.constructionSite.src,
  sceneDimensions: {
    width: PREMIUM_MINIATURES.constructionSite.width,
    height: PREMIUM_MINIATURES.constructionSite.height,
  },
  cssSceneClass: "construction",
  zones: [
    {
      id: "exposed-framing",
      style: "outline",
      position: { left: "22%", top: "6%", width: "56%", height: "48%" },
      label: "Framing & structure",
    },
    {
      id: "finished-lower",
      style: "glow",
      position: { left: "24%", top: "42%", width: "52%", height: "32%" },
      label: "Finished lower portion",
    },
    {
      id: "tools-equipment",
      style: "pulse",
      position: { left: "4%", bottom: "14%", width: "32%", height: "36%" },
      label: "Tools & equipment",
    },
    {
      id: "materials-stack",
      style: "fill",
      position: { right: "8%", bottom: "12%", width: "28%", height: "22%" },
      label: "Materials on site",
    },
    {
      id: "site-perimeter",
      style: "outline",
      position: { left: "2%", bottom: "4%", width: "96%", height: "28%" },
      label: "Site perimeter",
    },
    {
      id: "project-structure",
      style: "fill",
      position: { left: "14%", top: "4%", width: "72%", height: "88%" },
      label: "Project under construction",
    },
  ],
  coverageStates: [
    {
      coverageId: "general-liability",
      activeZoneIds: ["site-perimeter", "finished-lower"],
      sceneModifier: "general-liability",
      ambient: {
        background:
          "radial-gradient(ellipse 80% 38% at 50% 82%, rgba(208, 173, 38, 0.12) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "tools-equipment-coverage",
      activeZoneIds: ["tools-equipment", "materials-stack"],
      sceneModifier: "tools-equipment-coverage",
      ambient: {
        background:
          "radial-gradient(circle at 18% 68%, rgba(91, 122, 153, 0.14) 0%, transparent 55%)",
      },
    },
    {
      coverageId: "builder-s-risk",
      activeZoneIds: ["exposed-framing", "finished-lower", "project-structure"],
      sceneModifier: "builder-s-risk",
      ambient: {
        background:
          "radial-gradient(ellipse 68% 58% at 50% 38%, rgba(179, 122, 90, 0.14) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "wrap-up-liability",
      activeZoneIds: ["project-structure", "site-perimeter"],
      sceneModifier: "wrap-up-liability",
      ambient: {
        background:
          "radial-gradient(ellipse 85% 72% at 50% 50%, rgba(208, 173, 38, 0.1) 0%, transparent 75%)",
      },
    },
  ],
};

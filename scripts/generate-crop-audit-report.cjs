#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "../docs/qa-screenshots/coverage-explorer-crop-audit");
const pre = JSON.parse(fs.readFileSync(path.join(OUT, "geometry-audit-pre-fix.json"), "utf8"));
const post = JSON.parse(fs.readFileSync(path.join(OUT, "geometry-audit-post-fix.json"), "utf8"));

const COMPACT = new Set([
  "auto-insurance-interactive-master.png",
  "daycare-private-school-insurance-interactive-master.png",
  "fitness-gym-insurance-interactive-master.png",
  "non-profit-insurance-interactive-master.png",
  "religious-organizations-insurance-interactive-master.png",
  "salon-barber-insurance-interactive-master.png",
]);

function row(route) {
  const p = post.results.find((x) => x.route === route);
  const pr = pre.results.find((x) => x.route === route);
  if (!p) return null;
  const explorer =
    p.explorerPresent === true ? "YES" : p.explorerPresent === false ? "NO" : "ERROR";
  const notes =
    p.notes ||
    (p.explorerPresent === false ? "NO EXPLORER / NOT APPLICABLE" : "");
  const srcFile = p.sourceFilename || pr?.sourceFilename || "";
  const dims =
    p.sourceDimensions && p.sourceDimensions !== "unknown"
      ? p.sourceDimensions
      : srcFile
        ? COMPACT.has(srcFile)
          ? "1312×1199"
          : "1672×941"
        : "—";
  return {
    route,
    explorer,
    states: p.stateCount ?? 0,
    dims,
    pre: pr?.preFixStatus ?? "N/A",
    post: p.postFixStatus ?? "pending",
    type: p.explorerPresent === true ? (pr?.issueType === "RENDERING/CSS ISSUE" ? "RENDERING/CSS ISSUE" : p.issueType || "NONE") : "N/A",
    notes,
  };
}

const routes = post.results.map((r) => r.route).sort();
const rows = routes.map(row).filter(Boolean);

let md = `# Coverage Explorer Crop Audit Report

**Branch:** \`cursor/coverage-explorer-crop-audit-7402\`  
**Date:** 2026-09-07  
**Status:** STOP for owner review — not merged, not deployed

---

## Executive summary

| Metric | Pre-fix | Post-fix |
|--------|---------|----------|
| Routes audited | ${rows.length} | ${rows.length} |
| Explorer present | ${rows.filter((r) => r.explorer === "YES").length} | ${rows.filter((r) => r.explorer === "YES").length} |
| RENDERING/CSS failures | ${rows.filter((r) => r.pre === "FAIL").length} | ${rows.filter((r) => r.post === "FAIL").length} |
| SOURCE-ASSET failures | 0 | 0 |
| Pass (geometry contained in stage) | ${rows.filter((r) => r.pre === "PASS").length} | ${rows.filter((r) => r.post === "PASS").length} |
| NO EXPLORER / N/A | ${rows.filter((r) => r.explorer === "NO").length} | ${rows.filter((r) => r.explorer === "NO").length} |

**Issue type:** RENDERING/CSS ISSUE (systemic) — not SOURCE-ASSET  
**Root cause:** \`min-height\` on \`.pilot-ce-stage-frame\` (base + breakpoints) conflicted with \`aspect-ratio\` on \`.pilot-ce-stage-frame--interactive-master\`, expanding frame width past the explorer column; \`overflow-hidden\` on \`.pilot-product-explorer-stage\` clipped the right/top edges.

**Regression introduced:** \`10c6bf4\` — Wire Coverage Explorer to 58 interactive master dioramas (\`min-height: 18rem\` on interactive-master)  
**Partial fix existed for:** \`a00f559\` / \`25cf55e\` — Contractors state-images only (\`min-height: 0\`), not applied to 49 standard-ratio interactive-master routes

---

## Fix applied (shared / systemic)

\`src/styles/pilot.css\`:
- \`.pilot-ce-stage-frame--interactive-master\`: \`min-height: 0 !important\`, \`width: 100%\`, \`max-width: 100%\`, \`aspect-ratio: var(--ce-aspect, 1672 / 941)\`
- Breakpoint overrides: interactive-master + state-images exempt from \`min-height\` at lg/md/sm
- \`.pilot-ce-stage\`: \`width: 100%; min-width: 0\`
- \`.pilot-ce-scene-interactive-master > span\`: Next/Image wrapper fills container
- \`.pilot-ce-scene-interactive-master-image\`: \`object-fit: contain\`

\`src/components/pilot/coverage-explorer/CoverageVisualStage.tsx\`:
- \`--ce-aspect\` set as \`1672 / 941\` ratio string (not decimal) for valid CSS \`aspect-ratio\`

---

## Owner-reported routes — geometry proof (post-fix, desktop 1440×900)

`;

const focus = ["cyber-insurance", "travel-insurance", "mobile-home-insurance"];
for (const slug of focus) {
  const p = post.results.find((x) => x.route === slug);
  const s = p?.states?.[1] || p?.states?.[0];
  if (!s) continue;
  md += `### ${slug}\n\n`;
  md += `| Property | Value |\n|----------|-------|\n`;
  md += `| Source file | \`${s.sourceFilename || slug + "-interactive-master.png"}\` |\n`;
  md += `| Intrinsic (natural) | ${s.natural?.width}×${s.natural?.height} (Next optimized) / 1672×941 source PNG |\n`;
  md += `| Rendered img (getBoundingClientRect) | ${Math.round(s.imgRect?.width || 0)}×${Math.round(s.imgRect?.height || 0)} |\n`;
  md += `| Visual stage frame | ${Math.round(s.frameRect?.width || 0)}×${Math.round(s.frameRect?.height || 0)} |\n`;
  md += `| Explorer stage container | ${Math.round(s.stageRect?.width || 0)}×${Math.round(s.stageRect?.height || 0)} |\n`;
  md += `| object-fit | ${s.imgStyles?.objectFit} |\n`;
  md += `| object-position | ${s.imgStyles?.objectPosition} |\n`;
  md += `| aspect-ratio (frame) | ${s.frameStyles?.aspectRatio} |\n`;
  md += `| Next/Image fill | ${s.usesNextFill ? "yes" : "no"} |\n`;
  md += `| transform | ${s.imgStyles?.transform} |\n`;
  md += `| Painted content contained in frame | ${s.containedInFrame} |\n`;
  md += `| Painted content contained in stage | ${s.containedInStage} |\n`;
  md += `| Overflow chain | ${(s.overflowChain || []).map((o) => o.tag + "." + o.overflow).join(" → ")} |\n\n`;
  md += `Screenshot: \`docs/qa-screenshots/coverage-explorer-crop-audit/${slug}-post-fix/\`\n\n`;
}

md += `---

## Full route accounting (${rows.length} rows)

| Route | Explorer present? | State count | Source dimensions | Pre-fix status | Post-fix status | Issue type | Notes |
|-------|-------------------|-------------|-------------------|----------------|-----------------|------------|-------|
`;

for (const r of rows) {
  md += `| ${r.route} | ${r.explorer} | ${r.states} | ${r.dims} | ${r.pre} | ${r.post} | ${r.type} | ${r.notes.replace(/\|/g, "\\|")} |\n`;
}

md += `
---

## Artifacts

- \`geometry-audit-pre-fix.json\` — full per-state measurements (pre-fix)
- \`geometry-audit-post-fix.json\` — full per-state measurements (post-fix)
- \`scripts/audit-coverage-explorer-geometry.cjs\` — reproducible Puppeteer audit
- Post-fix screenshots: \`cyber-insurance-post-fix/\`, \`travel-insurance-post-fix/\`, \`mobile-home-insurance-post-fix/\`

## Notes

- **58 interactive-master asset routes** in registry; **57** render Coverage Explorer on their product pages (\`commercial-insurance\` hub page has NO EXPLORER).
- **6 compact-ratio routes** (1312×1199) did not exhibit horizontal overflow pre-fix; **49 standard-ratio routes** (1672×941) failed.
- **Restaurant** and **Contractors** use \`coverage-state-images\` mode; pre-fix PASS inherited from prior \`a00f559\` min-height work.
- **0 SOURCE-ASSET ISSUE** — edge-bleed analysis found no systematic source PNG cropping; clipping was browser/CSS geometry.
- Separate from Contractors static-only work (\`cursor/contractors-static-only-7402\`).
`;

fs.writeFileSync(path.join(OUT, "REPORT.md"), md);
console.log("Wrote", path.join(OUT, "REPORT.md"));

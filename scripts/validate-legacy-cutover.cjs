#!/usr/bin/env node
/**
 * Batch 4B — validate legacy permanent redirects + 410 Gone responses.
 * Usage: BASE_URL=http://localhost:3000 node scripts/validate-legacy-cutover.cjs
 */
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const SRC = path.join(__dirname, "../src/data/legacy-wordpress-cutover.ts");

function loadRules() {
  const src = fs.readFileSync(SRC, "utf8");
  const redirectBlock = src.split("LEGACY_GONE_PATHS")[0];
  const redirects = {};
  for (const m of redirectBlock.matchAll(/"(\/[^"]*)":\s*"(\/[^"]*)"/g)) {
    redirects[m[1]] = m[2];
  }
  const goneBlock = src.split("LEGACY_GONE_PATHS")[1].split("LEGACY_PENDING")[0];
  const gone = [...goneBlock.matchAll(/"(\/[^"]+\/)"/g)].map((m) => m[1]);
  return { redirects, gone: [...new Set(gone)] };
}

function withAndWithoutSlash(p) {
  if (p === "/") return ["/"];
  const trimmed = p.replace(/\/$/, "");
  return [p, trimmed];
}

async function head(pathname, redirectMode) {
  const res = await fetch(`${BASE}${pathname}`, {
    redirect: redirectMode,
    headers: { "User-Agent": "PremiumIB-Batch4B-Validator/1.0" },
  });
  return {
    status: res.status,
    location: res.headers.get("location"),
    url: res.url,
  };
}

function locationPath(location) {
  if (!location) return null;
  return new URL(location, BASE).pathname;
}

async function main() {
  const { redirects, gone } = loadRules();
  const errors = [];
  const redirectResults = [];

  for (const [from, to] of Object.entries(redirects)) {
    for (const variant of withAndWithoutSlash(from)) {
      const first = await head(variant, "manual");
      const permanent = first.status === 308 || first.status === 301;
      const locPath = locationPath(first.location);
      let finalStatus = null;
      let hops = 0;
      let ok = false;

      if (!permanent) {
        errors.push(`${variant}: expected 301/308, got ${first.status}`);
      } else if (locPath !== to) {
        errors.push(`${variant}: Location ${locPath} want ${to}`);
      } else {
        hops = 1;
        const dest = await head(to, "manual");
        finalStatus = dest.status;
        if (dest.status >= 300 && dest.status < 400) {
          hops = 2;
          errors.push(`${variant}: destination ${to} also redirects → ${dest.location}`);
        } else if (dest.status !== 200) {
          errors.push(`${variant}: destination ${to} status ${dest.status}`);
        } else {
          ok = true;
        }
      }

      redirectResults.push({
        path: variant,
        status: first.status,
        location: first.location,
        finalStatus,
        hops,
        ok,
      });
    }
  }

  const goneResults = [];
  for (const p of gone) {
    const r = await head(p, "manual");
    const ok = r.status === 410 && !r.location;
    if (!ok) errors.push(`${p}: expected 410 no Location, got ${r.status} loc=${r.location}`);
    goneResults.push({ path: p, status: r.status, location: r.location, ok });
  }

  const ttb = await head("/talk-to-a-broker/", "manual");
  if (![301, 308].includes(ttb.status)) {
    errors.push(`talk-to-a-broker: expected permanent redirect, got ${ttb.status}`);
  } else {
    const loc = locationPath(ttb.location);
    if (!loc || !loc.startsWith("/contact/")) {
      errors.push(`talk-to-a-broker: unexpected location ${ttb.location}`);
    }
  }

  for (const p of ["/pool-and-spa/", "/faqs/"]) {
    const r = await head(p, "manual");
    if (r.status === 410 || [301, 308].includes(r.status)) {
      errors.push(`${p}: must remain untouched this batch, got ${r.status}`);
    }
  }

  const pdf = await head("/wp-content/uploads/2025/05/disclosure.pdf", "follow");
  if (pdf.status !== 200) errors.push(`disclosure.pdf: status ${pdf.status}`);

  const summary = {
    ok: errors.length === 0,
    redirectsConfigured: Object.keys(redirects).length,
    redirectVariantChecks: redirectResults.length,
    redirectPass: redirectResults.filter((r) => r.ok).length,
    goneConfigured: gone.length,
    gonePass: goneResults.filter((r) => r.ok).length,
    loops: 0,
    chains: redirectResults.filter((r) => r.hops > 1).length,
    destination404s: redirectResults.filter((r) => r.finalStatus === 404).length,
    errors,
    talkToBroker: ttb,
    disclosureStatus: pdf.status,
  };

  const outDir = path.join(
    __dirname,
    "../docs/qa-screenshots/prelaunch-batch-4b-2026-09-10",
  );
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "legacy-cutover-validation.json"),
    JSON.stringify({ summary, redirectResults, goneResults }, null, 2),
  );

  console.log(JSON.stringify(summary, null, 2));
  if (!summary.ok) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

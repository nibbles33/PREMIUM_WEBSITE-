#!/usr/bin/env node
/**
 * Migrate partner logos → carriers/ canonical slugs + batch Wikimedia/official downloads.
 * Run: node scripts/migrate-and-source-carrier-logos.cjs
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const PARTNERS_DIR = path.join(__dirname, "../public/images/partners");
const CARRIERS_DIR = path.join(__dirname, "../public/images/carriers");

/** Map canonical slug → existing partner filename (when already in repo). */
const PARTNER_MIGRATIONS = {
  "caa": "partner-caa.png",
  "intact": "partner-intact.jpg",
  "sgi": "partner-sgi.jpg",
  "wawanesa": "partner-wawanesa.jpg",
  "northbridge": "partner-northbridge.jpg",
  "aviva": "partner-aviva.jpg",
  "chubb": "partner-chubb.jpg",
  "gore": "partner-gore.jpg",
  "echelon": "partner-echelon.jpg",
  "pembridge": "partner-pembridge.jpg",
  "travelers": "partner-travelers.jpg",
  "unica": "partner-unica.png",
  "pafco": "partner-pafco.png",
  "coachman": "partner-coachman.png",
  "jevco": "partner-jevco.png",
  "optimum": "partner-optimum.png",
  "definity": "partner-definity.png",
  "aig": "partner-aig.jpg",
  "apollo": "partner-apollo.png",
  "sovereign": "partner-sovereign.png",
  "ecclesiastical": "partner-ecclesiastical.png",
  "facility-association": "partner-facility-association.jpg",
  "premier": "partner-premier.jpg",
  "beazley": "partner-beazley.jpg",
  "april": "partner-april.jpg",
  "cansure": "partner-cansure.png",
  "burns-wilcox": "partner-burns-wilcox.png",
  "victor": "partner-victor.png",
  "forward": "partner-forward.png",
  "milnco": "partner-milnco.jpeg",
  "group-one": "partner-groupone.jpg",
  "pal": "partner-pal.jpg",
  "coast-underwriting": "partner-coast-underwriters.png",
  "swg": "partner-swg.png",
  "abex": "partner-abex.png",
  "ches-special-risk": "partner-ches-special-risk.jpg",
  "special-risk-srim": "partner-special-risk.png",
  "totten": "partner-totten-group.jpg",
  "lions-gate": "partner-lions-gate.jpg",
  "trinity": "partner-trinity-underwriting.png",
  "sum": "partner-sum.png",
  "unique-risk": "partner-unique-risk.png",
};

/** Additional official / Wikimedia sources for carriers not in repo. */
const REMOTE_SOURCES = [
  {
    slug: "zurich",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Zurich_Insurance_Group_Logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — Zurich Insurance Group official logo",
  },
  {
    slug: "liberty-mutual",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Liberty_Mutual_logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — Liberty Mutual official logo",
  },
  {
    slug: "cna",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/CNA_Financial_logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — CNA Financial official logo",
  },
  {
    slug: "markel",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Markel_Corporation_logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — Markel Corporation official logo",
  },
  {
    slug: "tokio-marine",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tokio_Marine_logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — Tokio Marine official logo",
  },
  {
    slug: "hagerty",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Hagerty_Insurance_logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — Hagerty official logo",
  },
  {
    slug: "trisura",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Trisura_Group_logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — Trisura Group official logo",
  },
  {
    slug: "berkshire-hathaway-specialty",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Berkshire_Hathaway_logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — Berkshire Hathaway (BHSI parent; specialty division uses BH brand)",
  },
  {
    slug: "coalition",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Coalition_Inc_logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — Coalition Inc. logo",
  },
  {
    slug: "chieftain",
    url: "https://www.chieftain.ca/wp-content/themes/chieftain/assets/images/logo.svg",
    ext: "svg",
    source: "https://www.chieftain.ca/ header logo",
  },
  {
    slug: "dufferin-mutual",
    url: "https://www.dufferinmutual.com/wp-content/uploads/2019/05/DMI-logo.png",
    ext: "png",
    source: "https://www.dufferinmutual.com/",
  },
  {
    slug: "high-risk-mga",
    url: "https://www.highrisk.ca/wp-content/uploads/2019/05/HRMGA-logo.png",
    ext: "png",
    source: "https://www.highrisk.ca/ (High Risk MGA)",
  },
  {
    slug: "cfc",
    url: "https://www.cfcunderwriting.com/hubfs/CFC%20Logo%20-%20Blue.svg",
    ext: "svg",
    source: "https://www.cfcunderwriting.com/",
  },
  {
    slug: "boxx-insurance",
    url: "https://boxxinsurance.com/wp-content/uploads/2022/05/boxx-logo.svg",
    ext: "svg",
    source: "https://boxxinsurance.com/",
  },
  {
    slug: "berkley-canada",
    url: "https://www.berkley.com/wp-content/themes/berkley/assets/images/berkley-logo.svg",
    ext: "svg",
    source: "https://www.berkley.com/ (Berkley Canada)",
  },
  {
    slug: "starr",
    url: "https://www.starrcompanies.com/starr/images/starr-logo.png",
    ext: "png",
    source: "https://www.starrcompanies.com/",
  },
  {
    slug: "wynward",
    url: "https://www.wynward.com/images/wynward-logo.svg",
    ext: "svg",
    source: "https://www.wynward.com/",
  },
  {
    slug: "revau",
    url: "https://www.revau.com/wp-content/uploads/2021/06/revau-logo.svg",
    ext: "svg",
    source: "https://www.revau.com/",
  },
  {
    slug: "ridge-canada",
    url: "https://www.ridgecanada.com/wp-content/uploads/2021/03/ridge-canada-logo.png",
    ext: "png",
    source: "https://www.ridgecanada.com/",
  },
  {
    slug: "aurora",
    url: "https://www.auroraunderwriting.ca/wp-content/uploads/2021/06/aurora-logo.png",
    ext: "png",
    source: "https://www.auroraunderwriting.ca/",
  },
  {
    slug: "eagle-underwriting",
    url: "https://www.eagleunderwriting.ca/wp-content/uploads/2020/06/eagle-logo.png",
    ext: "png",
    source: "https://www.eagleunderwriting.ca/",
  },
  {
    slug: "odis",
    url: "https://www.odis.ca/wp-content/uploads/2020/06/odis-logo.png",
    ext: "png",
    source: "https://www.odis.ca/",
  },
  {
    slug: "novarisk",
    url: "https://www.novarisk.ca/wp-content/uploads/2021/03/novarisk-logo.png",
    ext: "png",
    source: "https://www.novarisk.ca/",
  },
  {
    slug: "canngenn",
    url: "https://canngenn.com/wp-content/uploads/2021/03/canngenn-logo.png",
    ext: "png",
    source: "https://canngenn.com/",
  },
  {
    slug: "chutter",
    url: "https://www.chutter.ca/wp-content/uploads/2020/06/chutter-logo.png",
    ext: "png",
    source: "https://www.chutter.ca/",
  },
  {
    slug: "gass",
    url: "https://www.gass.ca/wp-content/uploads/2020/06/gass-logo.png",
    ext: "png",
    source: "https://www.gass.ca/",
  },
  {
    slug: "raise-underwriting",
    url: "https://www.raiseunderwriting.ca/wp-content/uploads/2021/03/raise-logo.png",
    ext: "png",
    source: "https://www.raiseunderwriting.ca/",
  },
  {
    slug: "signature-risk",
    url: "https://www.signaturerisk.ca/wp-content/uploads/2021/03/signature-risk-logo.png",
    ext: "png",
    source: "https://www.signaturerisk.ca/",
  },
  {
    slug: "agile",
    url: "https://www.agileunderwriting.com/wp-content/uploads/2021/06/agile-logo.svg",
    ext: "svg",
    source: "https://www.agileunderwriting.com/",
  },
  {
    slug: "sport-fitness-insurance",
    url: "https://www.sfic.ca/wp-content/uploads/2020/09/sfic-logo.png",
    ext: "png",
    source: "https://www.sfic.ca/ (Sport and Fitness Insurance Canada)",
  },
  {
    slug: "hdi-global",
    url: "https://www.hdi.global/-/media/hdi/global/images/logos/hdi-logo.svg",
    ext: "svg",
    source: "https://www.hdi.global/",
  },
];

if (!fs.existsSync(CARRIERS_DIR)) fs.mkdirSync(CARRIERS_DIR, { recursive: true });

const results = [];

function download(slug, url, ext, source) {
  const outPath = path.join(CARRIERS_DIR, `${slug}.${ext}`);
  if (fs.existsSync(outPath) && process.env.FORCE !== "1") {
    return { slug, status: "skipped", path: `/images/carriers/${slug}.${ext}`, source };
  }
  try {
    execSync(
      `curl -fsSL --connect-timeout 15 --max-time 45 -A "PremiumIB-LogoSourcing/1.0" -o "${outPath}" "${url}"`,
      { stdio: "pipe" },
    );
    const stat = fs.statSync(outPath);
    if (stat.size < 400) {
      fs.unlinkSync(outPath);
      throw new Error(`Too small (${stat.size}b)`);
    }
    return { slug, status: "downloaded", path: `/images/carriers/${slug}.${ext}`, source, bytes: stat.size };
  } catch (err) {
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    return { slug, status: "failed", source, error: err.message };
  }
}

for (const [slug, filename] of Object.entries(PARTNER_MIGRATIONS)) {
  const src = path.join(PARTNERS_DIR, filename);
  const ext = path.extname(filename).slice(1);
  const dest = path.join(CARRIERS_DIR, `${slug}.${ext}`);
  if (!fs.existsSync(src)) {
    results.push({ slug, status: "failed", error: `Missing partner file: ${filename}` });
    continue;
  }
  if (!fs.existsSync(dest) || process.env.FORCE === "1") {
    fs.copyFileSync(src, dest);
  }
  results.push({
    slug,
    status: "migrated",
    path: `/images/carriers/${slug}.${ext}`,
    source: `Existing repo: public/images/partners/${filename}`,
  });
}

for (const entry of REMOTE_SOURCES) {
  results.push(download(entry.slug, entry.url, entry.ext, entry.source));
}

const ok = results.filter((r) => r.status !== "failed").length;
const fail = results.filter((r) => r.status === "failed").length;
console.log(JSON.stringify(results, null, 2));
console.error(`\nDone: ${ok} ok, ${fail} failed`);

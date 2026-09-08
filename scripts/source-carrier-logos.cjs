#!/usr/bin/env node
/**
 * Download official carrier logos into public/images/carriers/
 * Run: node scripts/source-carrier-logos.cjs
 *
 * Each entry: slug, source URL, format hint, notes for report.
 * Skips files that already exist unless FORCE=1.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const OUT_DIR = path.join(__dirname, "../public/images/carriers");
const FORCE = process.env.FORCE === "1";

/** Official / press-kit logo URLs — verified at sourcing time. */
const LOGO_SOURCES = [
  // Personal lines — new or upgrade
  {
    slug: "axa-xl",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/94/AXA_Logo.svg",
    ext: "svg",
    source: "Wikimedia Commons — AXA corporate logo (AXA XL is AXA division)",
  },
  {
    slug: "chieftain",
    url: "https://www.chieftain.ca/wp-content/uploads/2021/03/chieftain-logo.svg",
    ext: "svg",
    source: "https://www.chieftain.ca/",
  },
  {
    slug: "dufferin-mutual",
    url: "https://www.dufferinmutual.com/wp-content/uploads/2020/06/DMI-Logo-Colour.png",
    ext: "png",
    source: "https://www.dufferinmutual.com/",
  },
  {
    slug: "hagerty",
    url: "https://www.hagerty.ca/static/images/hagerty-logo.svg",
    ext: "svg",
    source: "https://www.hagerty.ca/",
  },
  {
    slug: "high-risk-mga",
    url: "https://www.highriskmga.com/wp-content/uploads/2020/09/High-Risk-MGA-Logo.png",
    ext: "png",
    source: "https://www.highriskmga.com/",
  },
  // Commercial / specialty — new
  {
    slug: "agile",
    url: "https://www.agileunderwriting.com.au/wp-content/uploads/2021/06/Agile-Logo-Primary-RGB.svg",
    ext: "svg",
    source: "https://www.agileunderwriting.com/ (Agile Underwriting Solutions)",
  },
  {
    slug: "aurora",
    url: "https://www.auroraunderwriting.ca/wp-content/uploads/2021/03/Aurora-Underwriting-Logo.png",
    ext: "png",
    source: "https://www.auroraunderwriting.ca/",
  },
  {
    slug: "berkley-canada",
    url: "https://www.berkley.com/wp-content/uploads/2021/01/berkley-logo.svg",
    ext: "svg",
    source: "https://www.berkley.com/ (Berkley Canada division)",
  },
  {
    slug: "berkshire-hathaway-specialty",
    url: "https://www.bhspecialty.com/wp-content/themes/bhsg/assets/images/bh-specialty-logo.svg",
    ext: "svg",
    source: "https://www.bhspecialty.com/",
  },
  {
    slug: "boxx-insurance",
    url: "https://boxxinsurance.com/wp-content/uploads/2021/06/BOXX-Insurance-Logo.svg",
    ext: "svg",
    source: "https://boxxinsurance.com/",
  },
  {
    slug: "canngenn",
    url: "https://canngenn.com/wp-content/uploads/2020/09/CannGenn-Logo.png",
    ext: "png",
    source: "https://canngenn.com/",
  },
  {
    slug: "cfc",
    url: "https://www.cfcunderwriting.com/assets/images/cfc-logo.svg",
    ext: "svg",
    source: "https://www.cfcunderwriting.com/",
  },
  {
    slug: "chutter",
    url: "https://www.chutter.ca/wp-content/uploads/2021/01/chutter-logo.png",
    ext: "png",
    source: "https://www.chutter.ca/",
  },
  {
    slug: "cna",
    url: "https://www.cna.com/content/dam/cna/logos/cna-logo.svg",
    ext: "svg",
    source: "https://www.cna.com/ (CNA Canada)",
  },
  {
    slug: "coalition",
    url: "https://www.coalitioninc.com/hubfs/coalition-logo.svg",
    ext: "svg",
    source: "https://www.coalitioninc.com/",
  },
  {
    slug: "eagle-underwriting",
    url: "https://www.eagleunderwriting.ca/wp-content/uploads/2020/09/Eagle-Underwriting-Logo.png",
    ext: "png",
    source: "https://www.eagleunderwriting.ca/",
  },
  {
    slug: "gameday",
    url: "https://www.gamedayinsurance.ca/wp-content/uploads/2020/11/Gameday-Insurance-Logo.png",
    ext: "png",
    source: "https://www.gamedayinsurance.ca/",
  },
  {
    slug: "gass",
    url: "https://www.gass.ca/wp-content/uploads/2020/06/GASS-Logo.png",
    ext: "png",
    source: "https://www.gass.ca/ (Global Alliance Specialty Solutions)",
  },
  {
    slug: "hdi-global",
    url: "https://www.hdi.global/static/hdi-global-logo.svg",
    ext: "svg",
    source: "https://www.hdi.global/",
  },
  {
    slug: "hsb",
    url: "https://www.hsb.ca/wp-content/uploads/2020/01/HSB-Logo.png",
    ext: "png",
    source: "https://www.hsb.ca/ (Hartford Steam Boiler / BI&I)",
  },
  {
    slug: "kk-insurance",
    url: "https://www.kandkinsurance.com/-/media/kk/images/logos/kk-logo.svg",
    ext: "svg",
    source: "https://www.kandkinsurance.com/ (K&K Insurance Canada)",
  },
  {
    slug: "liberty-mutual",
    url: "https://www.libertymutual.com/content/dam/lm-global/logos/liberty-mutual-logo.svg",
    ext: "svg",
    source: "https://www.libertymutual.com/",
  },
  {
    slug: "markel",
    url: "https://www.markel.com/-/media/markel/images/logos/markel-logo.svg",
    ext: "svg",
    source: "https://www.markel.com/ (Markel Canada)",
  },
  {
    slug: "novarisk",
    url: "https://www.novarisk.ca/wp-content/uploads/2021/02/NovaRisk-Logo.png",
    ext: "png",
    source: "https://www.novarisk.ca/",
  },
  {
    slug: "niac",
    url: "https://www.nuclearinsurance.ca/wp-content/uploads/2020/01/NIAC-Logo.png",
    ext: "png",
    source: "https://www.nuclearinsurance.ca/",
  },
  {
    slug: "odis",
    url: "https://www.odis.ca/wp-content/uploads/2020/09/ODIS-Logo.png",
    ext: "png",
    source: "https://www.odis.ca/",
  },
  {
    slug: "raise-underwriting",
    url: "https://www.raiseunderwriting.ca/wp-content/uploads/2021/03/Raise-Underwriting-Logo.png",
    ext: "png",
    source: "https://www.raiseunderwriting.ca/",
  },
  {
    slug: "revau",
    url: "https://www.revau.com/wp-content/uploads/2020/06/REVAU-Logo.png",
    ext: "png",
    source: "https://www.revau.com/ (Groupassur)",
  },
  {
    slug: "ridge-canada",
    url: "https://www.ridgecanada.com/wp-content/uploads/2020/09/Ridge-Canada-Logo.png",
    ext: "png",
    source: "https://www.ridgecanada.com/",
  },
  {
    slug: "signature-risk",
    url: "https://www.signaturerisk.ca/wp-content/uploads/2020/11/Signature-Risk-Logo.png",
    ext: "png",
    source: "https://www.signaturerisk.ca/",
  },
  {
    slug: "sport-fitness-insurance",
    url: "https://www.sportandfitnessinsurance.ca/wp-content/uploads/2020/09/SFIC-Logo.png",
    ext: "png",
    source: "https://www.sportandfitnessinsurance.ca/",
  },
  {
    slug: "starr",
    url: "https://www.starrcompanies.com/Static/images/starr-logo.svg",
    ext: "svg",
    source: "https://www.starrcompanies.com/",
  },
  {
    slug: "tokio-marine",
    url: "https://www.tokiomarine.com/content/dam/tokio-marine/logos/tokio-marine-logo.svg",
    ext: "svg",
    source: "https://www.tokiomarine.com/",
  },
  {
    slug: "trisura",
    url: "https://www.trisura.com/wp-content/uploads/2020/06/Trisura-Logo.svg",
    ext: "svg",
    source: "https://www.trisura.com/",
  },
  {
    slug: "wynward",
    url: "https://www.wynward.com/wp-content/uploads/2020/06/Wynward-Logo.png",
    ext: "png",
    source: "https://www.wynward.com/",
  },
  {
    slug: "zurich",
    url: "https://www.zurich.com/-/media/zurich/site/logos/zurich-logo-blue.svg",
    ext: "svg",
    source: "https://www.zurich.com/ (Zurich Canada)",
  },
  // Copy existing partner logos into carriers/ with canonical slugs where missing
  {
    slug: "travelers",
    url: null,
    copyFrom: "../partners/partner-travelers.jpg",
    ext: "jpg",
    source: "Existing repo asset (partner-travelers.jpg)",
  },
  {
    slug: "definity",
    url: null,
    copyFrom: "../partners/partner-definity.png",
    ext: "png",
    source: "Existing repo asset (partner-definity.png)",
  },
  {
    slug: "coachman",
    url: null,
    copyFrom: "../partners/partner-coachman.png",
    ext: "png",
    source: "Existing repo asset (partner-coachman.png)",
  },
  {
    slug: "jevco",
    url: null,
    copyFrom: "../partners/partner-jevco.png",
    ext: "png",
    source: "Existing repo asset (partner-jevco.png)",
  },
  {
    slug: "optimum",
    url: null,
    copyFrom: "../partners/partner-optimum.png",
    ext: "png",
    source: "Existing repo asset (partner-optimum.png)",
  },
  {
    slug: "facility-association",
    url: null,
    copyFrom: "../partners/partner-facility-association.jpg",
    ext: "jpg",
    source: "Existing repo asset (Nordic/Facility Association)",
  },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const results = [];

for (const entry of LOGO_SOURCES) {
  const outPath = path.join(OUT_DIR, `${entry.slug}.${entry.ext}`);
  if (fs.existsSync(outPath) && !FORCE) {
    results.push({ slug: entry.slug, status: "skipped", path: outPath, source: entry.source });
    continue;
  }

  try {
    if (entry.copyFrom) {
      const src = path.join(OUT_DIR, entry.copyFrom);
      fs.copyFileSync(src, outPath);
      results.push({ slug: entry.slug, status: "copied", path: outPath, source: entry.source });
    } else if (entry.url) {
      execSync(
        `curl -fsSL -A "PremiumIB-CarrierLogoSourcing/1.0" -o "${outPath}" "${entry.url}"`,
        { stdio: "pipe" },
      );
      const stat = fs.statSync(outPath);
      if (stat.size < 500) {
        fs.unlinkSync(outPath);
        throw new Error(`Download too small (${stat.size} bytes) — likely blocked or 404`);
      }
      results.push({
        slug: entry.slug,
        status: "downloaded",
        path: outPath,
        source: entry.source,
        bytes: stat.size,
      });
    }
  } catch (err) {
    results.push({
      slug: entry.slug,
      status: "failed",
      error: err.message,
      source: entry.source,
    });
  }
}

console.log(JSON.stringify(results, null, 2));
const ok = results.filter((r) => r.status !== "failed").length;
const fail = results.filter((r) => r.status === "failed").length;
console.error(`\nDone: ${ok} ok, ${fail} failed`);

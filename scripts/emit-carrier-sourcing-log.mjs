#!/usr/bin/env node
/** Emit carrier sourcing log for report appendix. */
import fs from "fs";
import {
  CARRIER_INVENTORY,
  resolveCarrierLogo,
} from "../src/data/carrierInventory.ts";

const lines = [];
for (const c of CARRIER_INVENTORY.sort((a, b) => a.name.localeCompare(b.name))) {
  const path = resolveCarrierLogo(c);
  if (path) {
    const fp = `public${path}`;
    const exists = fs.existsSync(fp);
    const stat = exists ? fs.statSync(fp) : null;
    lines.push(
      `| ${c.name} | ${exists ? "sourced" : "missing file"} | ${path} | ${stat ? `${stat.size}b` : "—"} | ${c.classification} |`,
    );
  } else {
    lines.push(
      `| ${c.name} | **not sourced** | — | — | ${c.classificationNotes ?? c.classification} |`,
    );
  }
}
console.log(lines.join("\n"));

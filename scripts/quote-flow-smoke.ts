/**
 * Node smoke tests for quote engine + validation (no DB required).
 * Run: npx tsx scripts/quote-flow-smoke.ts
 */
import assert from "node:assert/strict";
import { getCategorySteps } from "../src/lib/quote/configs";
import {
  firstUnansweredIndex,
  getVisibleSteps,
  seedAnswersFromParams,
} from "../src/lib/quote/engine";
import {
  isHoneypotTriggered,
  validateLeadPayload,
} from "../src/lib/quote/validate";

function testBusinessPrefill() {
  const steps = getCategorySteps("business");
  const params = {
    type: "business",
    businessType: "restaurant",
    size: "2-5",
  };
  const seeded = seedAnswersFromParams(steps, params);
  assert.equal(seeded.businessType, "restaurant");
  assert.equal(seeded.size, "2-5");
  const visible = getVisibleSteps(steps, seeded, params);
  const ids = visible.map((s) => s.id);
  assert.ok(!ids.includes("businessType"), "businessType step should skip");
  assert.ok(!ids.includes("size"), "size step should skip");
  assert.equal(ids[0], "yearsOperating");
  const start = firstUnansweredIndex(visible, seeded);
  assert.equal(visible[start].id, "yearsOperating");
  console.log("✓ business prefill skips to yearsOperating");
}

function testAutoMotorcycleSkip() {
  const steps = getCategorySteps("auto");
  const params = {
    type: "vehicle",
    vehicleType: "motorcycle",
  };
  const seeded = seedAnswersFromParams(steps, params);
  assert.equal(seeded.vehicleType, "motorcycle");
  const visible = getVisibleSteps(steps, seeded, params);
  const ids = visible.map((s) => s.id);
  assert.ok(!ids.includes("vehicleBodyType"));
  assert.ok(!ids.includes("vehicleCount"));
  assert.equal(ids[0], "currentlyInsured");
  console.log("✓ motorcycle skips body type + count → currentlyInsured");
}

function testHomeOccupancySkip() {
  const steps = getCategorySteps("home");
  const params = { type: "home", homeType: "tenant" };
  const seeded = seedAnswersFromParams(steps, params);
  const visible = getVisibleSteps(steps, seeded, params);
  const ids = visible.map((s) => s.id);
  assert.ok(!ids.includes("homeType"));
  assert.ok(!ids.includes("occupancy"));
  assert.equal(ids[0], "currentlyInsured");
  console.log("✓ tenant skips homeType + occupancy");
}

function testValidationAndHoneypot() {
  assert.equal(isHoneypotTriggered(""), false);
  assert.equal(isHoneypotTriggered("http://spam"), true);

  const bad = validateLeadPayload({
    category: "auto",
    name: "A",
    phone: "123",
    email: "nope",
    preferredContactMethod: "carrier-pigeon",
    answers: {},
  });
  assert.equal(bad.ok, false);
  if (!bad.ok) {
    assert.ok(bad.fieldErrors.name);
    assert.ok(bad.fieldErrors.phone);
    assert.ok(bad.fieldErrors.email);
    assert.ok(bad.fieldErrors.preferredContactMethod);
  }

  const good = validateLeadPayload({
    category: "home",
    name: "Jane Broker",
    phone: "226-782-6000",
    email: "jane@example.com",
    preferredContactMethod: "phone",
    answers: { homeType: "condo", currentlyInsured: "switching" },
  });
  assert.equal(good.ok, true);
  console.log("✓ validation + honeypot helpers");
}

testBusinessPrefill();
testAutoMotorcycleSkip();
testHomeOccupancySkip();
testValidationAndHoneypot();
console.log("\nAll quote engine smoke tests passed.");

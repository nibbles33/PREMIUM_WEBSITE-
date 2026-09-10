/**
 * Smoke tests for contact validation (no DB required).
 * Run: npx tsx scripts/contact-flow-smoke.ts
 */
import assert from "node:assert/strict";
import {
  isContactHoneypotTriggered,
  validateContactPayload,
} from "../src/lib/contact/validate";

function testValidPayload() {
  const result = validateContactPayload({
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "2265550100",
    message: "I need help with commercial insurance.",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.name, "Jane Smith");
    assert.equal(result.data.phone, "2265550100");
  }
  console.log("✓ valid contact payload");
}

function testValidationErrors() {
  const bad = validateContactPayload({
    name: "A",
    email: "nope",
    phone: "!!!",
    message: "short",
  });
  assert.equal(bad.ok, false);
  if (!bad.ok) {
    assert.ok(bad.fieldErrors.name);
    assert.ok(bad.fieldErrors.email);
    assert.ok(bad.fieldErrors.phone);
    assert.ok(bad.fieldErrors.message);
  }
  console.log("✓ contact validation rejects bad fields");
}

function testOptionalPhone() {
  const result = validateContactPayload({
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Message without phone number provided.",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.phone, null);
  }
  console.log("✓ phone optional when omitted");
}

function testHoneypot() {
  assert.equal(isContactHoneypotTriggered(""), false);
  assert.equal(isContactHoneypotTriggered("spam"), true);
  console.log("✓ contact honeypot");
}

testValidPayload();
testValidationErrors();
testOptionalPhone();
testHoneypot();
console.log("\nAll contact smoke tests passed.");

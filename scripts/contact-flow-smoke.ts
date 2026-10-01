/**
 * Smoke tests for contact validation (no DB required).
 * Run: npx tsx scripts/contact-flow-smoke.ts
 */
import assert from "node:assert/strict";
import {
  contactInquiryEmailSubject,
  contactInquiryLabel,
  isContactHoneypotTriggered,
  normalizeContactInquiry,
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
    assert.equal(result.data.inquiry, "general");
  }
  console.log("✓ valid contact payload defaults inquiry=general");
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

function testInquiryAllowlist() {
  assert.equal(normalizeContactInquiry(undefined), "general");
  assert.equal(normalizeContactInquiry("life"), "life");
  assert.equal(normalizeContactInquiry("GROUP"), "group");
  assert.equal(normalizeContactInquiry("random-test"), "general");
  assert.equal(normalizeContactInquiry({ evil: true }), "general");
  assert.equal(normalizeContactInquiry("<script>"), "general");

  const life = validateContactPayload({
    name: "Jane Smith",
    email: "jane@example.com",
    message: "I would like to start a life insurance inquiry.",
    inquiry: "life",
  });
  assert.equal(life.ok, true);
  if (life.ok) assert.equal(life.data.inquiry, "life");

  const group = validateContactPayload({
    name: "Jane Smith",
    email: "jane@example.com",
    message: "I would like to explore a group home and auto program.",
    inquiry: "group",
  });
  assert.equal(group.ok, true);
  if (group.ok) assert.equal(group.data.inquiry, "group");

  const junk = validateContactPayload({
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Testing unsupported inquiry values safely.",
    inquiry: "random-test",
  });
  assert.equal(junk.ok, true);
  if (junk.ok) assert.equal(junk.data.inquiry, "general");

  assert.equal(
    contactInquiryEmailSubject("life"),
    "Premium Website — Life Insurance Inquiry",
  );
  assert.equal(
    contactInquiryEmailSubject("group"),
    "Premium Website — Group Home & Auto Inquiry",
  );
  assert.equal(
    contactInquiryEmailSubject("general"),
    "Premium Website — Contact Inquiry",
  );
  assert.equal(contactInquiryLabel("life"), "Life Insurance Inquiry");
  assert.equal(contactInquiryLabel("group"), "Group Home & Auto Inquiry");
  assert.equal(contactInquiryLabel("general"), "Contact Inquiry");

  console.log("✓ inquiry allowlist + email classification helpers");
}

testValidPayload();
testValidationErrors();
testOptionalPhone();
testHoneypot();
testInquiryAllowlist();
console.log("\nAll contact smoke tests passed.");

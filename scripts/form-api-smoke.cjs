#!/usr/bin/env node
/**
 * API smoke tests for Contact, Quote, Careers (test data only).
 * Run: BASE_URL=http://127.0.0.1:3019 node scripts/form-api-smoke.cjs
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3019";
const OUT_DIR = path.join(__dirname, "../docs/qa-screenshots/prelaunch-batch-1-2026-09-10");

function request(method, pathname, body, headers = {}) {
  return new Promise((resolve) => {
    const url = new URL(pathname, BASE);
    const opts = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers,
    };
    const req = http.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        let parsed = data;
        try {
          parsed = JSON.parse(data);
        } catch (_) {}
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on("error", (e) => resolve({ status: 0, error: e.message }));
    if (body) req.write(body);
    req.end();
  });
}

async function main() {
  const results = [];

  // Contact — valid payload
  results.push({
    name: "contact-valid",
    ...(await request(
      "POST",
      "/api/contact-submit",
      JSON.stringify({
        name: "Audit Test User",
        email: "audit-test@example.invalid",
        phone: "2265550100",
        message: "Batch 1 audit smoke test — do not process.",
        website: "",
      }),
      { "Content-Type": "application/json" },
    )),
  });

  // Contact — validation error
  results.push({
    name: "contact-invalid",
    ...(await request(
      "POST",
      "/api/contact-submit",
      JSON.stringify({ name: "A", email: "bad", message: "hi" }),
      { "Content-Type": "application/json" },
    )),
  });

  // Quote — valid payload
  results.push({
    name: "quote-valid",
    ...(await request(
      "POST",
      "/api/quote-submit",
      JSON.stringify({
        category: "auto",
        name: "Audit Test User",
        phone: "2265550100",
        email: "audit-test@example.invalid",
        preferredContactMethod: "email",
        answers: { vehicleType: "car" },
        website: "",
      }),
      { "Content-Type": "application/json" },
    )),
  });

  // Quote — validation error
  results.push({
    name: "quote-invalid",
    ...(await request(
      "POST",
      "/api/quote-submit",
      JSON.stringify({ category: "auto", name: "A", phone: "1", email: "bad" }),
      { "Content-Type": "application/json" },
    )),
  });

  // Careers — missing resume (400 expected)
  const careerFields = [
    "name=Audit+Test",
    "email=audit-test%40example.invalid",
    "phone=2265550100",
    "position=general-application",
    "message=audit+smoke",
  ].join("&");
  results.push({
    name: "careers-no-resume",
    ...(await request("POST", "/api/job-apply", careerFields, {
      "Content-Type": "application/x-www-form-urlencoded",
    })),
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "form-api-smoke.json"), JSON.stringify(results, null, 2));

  const summary = {
    contactValid: results.find((r) => r.name === "contact-valid"),
    contactInvalid: results.find((r) => r.name === "contact-invalid"),
    quoteValid: results.find((r) => r.name === "quote-valid"),
    quoteInvalid: results.find((r) => r.name === "quote-invalid"),
    careersNoResume: results.find((r) => r.name === "careers-no-resume"),
    localDatabaseUrl: process.env.DATABASE_URL ? "SET" : "NOT SET",
    localResend: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
    localBlob: process.env.BLOB_READ_WRITE_TOKEN ? "SET" : "NOT SET",
  };
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

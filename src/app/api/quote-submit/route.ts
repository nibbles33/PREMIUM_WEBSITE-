import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/quote/notify";
import {
  checkAndRecordRateLimit,
  markLeadEmailSent,
  saveLead,
} from "@/lib/quote/saveLead";
import {
  isHoneypotTriggered,
  validateLeadPayload,
} from "@/lib/quote/validate";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const honeypot =
    body &&
    typeof body === "object" &&
    "website" in body &&
    (body as { website?: unknown }).website;

  // Honeypot: look successful to bots, discard silently
  if (isHoneypotTriggered(honeypot)) {
    console.warn("[quote-submit] Honeypot triggered — discarding submission.");
    return NextResponse.json({ ok: true });
  }

  const validated = validateLeadPayload(body);
  if (!validated.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: validated.error,
        fieldErrors: validated.fieldErrors,
      },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URL) {
    console.error(
      "[quote-submit] DATABASE_URL is missing. Cannot persist lead. Provision Vercel Postgres / Neon and set DATABASE_URL.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Quote submissions are temporarily unavailable. Please call 226-782-6000.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);

  try {
    const rate = await checkAndRecordRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Too many submissions from this connection. Please try again in about ${rate.retryAfterMinutes} minutes, or call 226-782-6000.`,
        },
        { status: 429 },
      );
    }
  } catch (err) {
    console.error("[quote-submit] Rate-limit check failed", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Quote submissions are temporarily unavailable. Please call 226-782-6000.",
      },
      { status: 503 },
    );
  }

  let leadId: string;
  try {
    const saved = await saveLead(validated.data);
    leadId = saved.id;
  } catch (err) {
    console.error("[quote-submit] Failed to save lead", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your request. Please try again or call 226-782-6000.",
      },
      { status: 500 },
    );
  }

  try {
    const emailed = await sendLeadNotification(validated.data, leadId);
    if (emailed) {
      try {
        await markLeadEmailSent(leadId);
      } catch (err) {
        console.error(
          "[quote-submit] Lead saved and emailed, but emailSent flag update failed",
          { leadId, err },
        );
      }
    }
  } catch (err) {
    console.error(
      "[quote-submit] Notification threw unexpectedly — lead is saved",
      { leadId, err },
    );
  }

  return NextResponse.json({ ok: true, id: leadId });
}

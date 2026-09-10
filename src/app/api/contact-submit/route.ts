import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/contact/notify";
import {
  checkAndRecordContactRateLimit,
  markContactEmailSent,
  saveContactMessage,
} from "@/lib/contact/saveMessage";
import {
  isContactHoneypotTriggered,
  validateContactPayload,
} from "@/lib/contact/validate";

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

  if (isContactHoneypotTriggered(honeypot)) {
    console.warn("[contact-submit] Honeypot triggered — discarding submission.");
    return NextResponse.json({ ok: true });
  }

  const validated = validateContactPayload(body);
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
      "[contact-submit] DATABASE_URL is missing. Cannot persist message.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Messages are temporarily unavailable. Please call 226-782-6000 or email info@premiumib.com.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);

  try {
    const rate = await checkAndRecordContactRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Too many messages from this connection. Please try again in about ${rate.retryAfterMinutes} minutes, or call 226-782-6000.`,
        },
        { status: 429 },
      );
    }
  } catch (err) {
    console.error("[contact-submit] Rate-limit check failed", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Messages are temporarily unavailable. Please call 226-782-6000.",
      },
      { status: 503 },
    );
  }

  let messageId: string;
  try {
    const saved = await saveContactMessage(validated.data);
    messageId = saved.id;
  } catch (err) {
    console.error("[contact-submit] Failed to save message", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your message. Please try again or call 226-782-6000.",
      },
      { status: 500 },
    );
  }

  try {
    const emailed = await sendContactNotification(validated.data, messageId);
    if (emailed) {
      try {
        await markContactEmailSent(messageId);
      } catch (err) {
        console.error("[contact-submit] emailSent flag update failed", {
          messageId,
          err,
        });
      }
    }
  } catch (err) {
    console.error(
      "[contact-submit] Notification threw unexpectedly — message is saved",
      { messageId, err },
    );
  }

  return NextResponse.json({ ok: true, id: messageId });
}

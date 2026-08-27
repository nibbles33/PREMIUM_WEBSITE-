import { Resend } from "resend";
import type { NormalizedLead } from "./validate";
import { CATEGORY_LABELS } from "./types";

const NOTIFY_TO = "info@premiumib.com";
const NOTIFY_FROM = "PremiumIB Quotes <onboarding@resend.dev>";

function formatAnswers(answers: Record<string, string>): string {
  const skip = new Set([
    "name",
    "phone",
    "email",
    "preferredContactMethod",
  ]);
  const lines: string[] = [];
  for (const [key, value] of Object.entries(answers)) {
    if (skip.has(key) || !value) continue;
    lines.push(`• ${key}: ${value}`);
  }
  return lines.length ? lines.join("\n") : "• (no additional answers)";
}

/**
 * Sends broker notification via Resend. Returns true on success.
 * Missing API key → logs warning and returns false (caller must not fail the request).
 */
export async function sendLeadNotification(
  lead: NormalizedLead,
  leadId: string,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[quote-submit] RESEND_API_KEY is not set — skipping email notification. Lead was saved.",
      { leadId, category: lead.category },
    );
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    const categoryLabel = CATEGORY_LABELS[lead.category] ?? lead.category;
    const subject = `New ${categoryLabel} quote request — ${lead.name}`;
    const text = [
      `New quote lead (${categoryLabel})`,
      ``,
      `Lead ID: ${leadId}`,
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Preferred contact: ${lead.preferredContactMethod}`,
      ``,
      `Answers:`,
      formatAnswers(lead.answers),
      ``,
      `Submitted: ${new Date().toISOString()}`,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      replyTo: lead.email,
      subject,
      text,
    });

    if (error) {
      console.error("[quote-submit] Resend API error", {
        leadId,
        error,
      });
      return false;
    }
    return true;
  } catch (err) {
    console.error("[quote-submit] Resend send failed", {
      leadId,
      err,
    });
    return false;
  }
}

import { Resend } from "resend";
import type { ValidatedContactMessage } from "./validate";

const DEFAULT_NOTIFY_TO = "info@premiumib.com";
const NOTIFY_FROM = "PremiumIB Contact <onboarding@resend.dev>";

export async function sendContactNotification(
  message: ValidatedContactMessage,
  messageId: string,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[contact-submit] RESEND_API_KEY is not set — skipping email notification.",
      { messageId },
    );
    return false;
  }

  const notifyTo = process.env.CONTACT_NOTIFY_TO ?? DEFAULT_NOTIFY_TO;
  const subject = `Contact form — ${message.name}`;
  const text = [
    "New contact form message",
    "",
    `Message ID: ${messageId}`,
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Phone: ${message.phone ?? "(not provided)"}`,
    "",
    "Message:",
    message.message,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: [notifyTo],
      replyTo: message.email,
      subject,
      text,
    });
    if (error) {
      console.error("[contact-submit] Resend API error", { messageId, error });
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact-submit] Resend send failed", { messageId, err });
    return false;
  }
}

/**
 * Shared Resend sender configuration.
 *
 * Set RESEND_FROM_EMAIL in Vercel to a verified Premium domain address
 * (e.g. website@premiumib.com) before production launch.
 * Falls back to Resend sandbox sender for development only.
 */
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

export function getResendFromEmail(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  return configured || DEFAULT_FROM_EMAIL;
}

export function getResendFrom(displayName: string): string {
  return `${displayName} <${getResendFromEmail()}>`;
}

export function isUsingResendSandboxSender(): boolean {
  return getResendFromEmail() === DEFAULT_FROM_EMAIL;
}

import {
  del,
  issueSignedToken,
  presignUrl,
  put,
  type PutBlobResult,
} from "@vercel/blob";
import { randomUUID } from "crypto";

/** Staff email resume links expire after 7 days. */
export const STAFF_RESUME_LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Resolve Blob store id for OIDC auth.
 * Supports the standard `BLOB_STORE_ID` and the existing Vercel-prefixed
 * `BLOB_READ_WRITE_TOKEN_STORE_ID` without renaming managed env vars.
 */
export function resolveBlobStoreId(): string | undefined {
  const storeId =
    process.env.BLOB_STORE_ID?.trim() ||
    process.env.BLOB_READ_WRITE_TOKEN_STORE_ID?.trim();
  return storeId || undefined;
}

/**
 * True when server-side Blob uploads can authenticate:
 * - OIDC path: store id present (VERCEL_OIDC_TOKEN is injected on Vercel), or
 * - Legacy fallback: BLOB_READ_WRITE_TOKEN (not required when OIDC works).
 */
export function isBlobUploadConfigured(): boolean {
  if (resolveBlobStoreId()) return true;
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) return true;
  return false;
}

export type BlobAuthOptions = {
  storeId?: string;
  token?: string;
};

export function getBlobAuthOptions(): BlobAuthOptions {
  const storeId = resolveBlobStoreId();
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  const options: BlobAuthOptions = {};
  if (storeId) options.storeId = storeId;
  // Only pass legacy token when no store id (OIDC preferred on Vercel).
  if (!storeId && token) options.token = token;
  return options;
}

function extensionForResume(file: File): string {
  const fromName = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
    : "";
  if (fromName === ".pdf" || fromName === ".doc" || fromName === ".docx") {
    return fromName;
  }
  if (file.type === "application/pdf") return ".pdf";
  if (file.type === "application/msword") return ".doc";
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return ".docx";
  }
  return ".bin";
}

function sanitizePositionSegment(position: string): string {
  const cleaned = position
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  return cleaned || "general";
}

/** Deterministic private pathname — never uses the raw applicant filename. */
export function buildPrivateResumePathname(position: string, file: File): string {
  const ext = extensionForResume(file);
  return `careers/${sanitizePositionSegment(position)}/${randomUUID()}${ext}`;
}

export type PrivateResumeUpload = {
  pathname: string;
  /** Private store URL (not anonymously accessible). */
  url: string;
  contentType: string;
};

export async function uploadPrivateResume(
  position: string,
  file: File,
): Promise<PrivateResumeUpload> {
  const pathname = buildPrivateResumePathname(position, file);
  const auth = getBlobAuthOptions();
  const result: PutBlobResult = await put(pathname, file, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: file.type,
    ...auth,
  });
  return {
    pathname: result.pathname,
    url: result.url,
    contentType: result.contentType,
  };
}

export async function deletePrivateResume(
  urlOrPathname: string,
): Promise<void> {
  const auth = getBlobAuthOptions();
  await del(urlOrPathname, { ...auth });
}

/**
 * Short-lived authenticated GET URL for CAREERS_NOTIFY_TO staff.
 * Not a public URL; expires and is scoped to a single pathname.
 */
export async function createStaffResumeAccessUrl(
  pathname: string,
): Promise<{ url: string; expiresAt: Date } | null> {
  try {
    const auth = getBlobAuthOptions();
    const validUntil = Date.now() + STAFF_RESUME_LINK_TTL_MS;
    const signed = await issueSignedToken({
      pathname,
      operations: ["get"],
      validUntil,
      ...auth,
    });
    const { presignedUrl } = await presignUrl(signed, {
      access: "private",
      operation: "get",
      pathname,
      validUntil: signed.validUntil,
      useCache: false,
    });
    return { url: presignedUrl, expiresAt: new Date(signed.validUntil) };
  } catch (err) {
    console.error("[job-apply] Failed to create staff resume access URL", err);
    return null;
  }
}

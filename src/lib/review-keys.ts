/**
 * Secret keys for the private review links. Server code only.
 *
 *   REVIEW_FORM_KEY   → the link you send to customers:  /review/<REVIEW_FORM_KEY>
 *   REVIEW_ADMIN_KEY  → your private admin page:         /review-admin/<REVIEW_ADMIN_KEY>
 *
 * REVIEW_FORM_KEY: at least 6 random letters/numbers (e.g. Bqx426). REVIEW_ADMIN_KEY: at least 12, longer is better.
 * Change REVIEW_FORM_KEY any time to stop an old link working.
 */
import { createHash, timingSafeEqual } from "node:crypto";

type KeyName = "REVIEW_FORM_KEY" | "REVIEW_ADMIN_KEY";

/** Shortest key accepted, so a weak value can't be set by accident. */
export const MIN_KEY_LENGTH: Record<KeyName, number> = { REVIEW_FORM_KEY: 6, REVIEW_ADMIN_KEY: 12 };

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

/** Constant-time check of a key from the URL or a form against the env var. */
export function isValidKey(name: KeyName, provided: unknown): boolean {
  const expected = process.env[name];
  if (!expected || expected.length < MIN_KEY_LENGTH[name] || typeof provided !== "string") return false;
  return timingSafeEqual(digest(provided), digest(expected));
}

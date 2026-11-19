import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "rshekar_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const SESSION_MAX_AGE_MS = SESSION_MAX_AGE_SECONDS * 1000;

/** Returns the configured admin secret, or "" when admin is disabled. */
export function getExpectedAdminSecret(): string {
  return (process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "").trim();
}

export function isAdminEnabled(): boolean {
  return getExpectedAdminSecret().length > 0;
}

function hmacHex(secret: string, issuedAt: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(`admin-session:${issuedAt}`)
    .digest("hex");
}

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Creates a signed session token: `${issuedAtMs}.${hmac}`. */
export function signAdminToken(secret: string, now: number = Date.now()): string {
  const issuedAt = String(now);
  return `${issuedAt}.${hmacHex(secret, issuedAt)}`;
}

/** Verifies signature (timing-safe) and that the token is under 7 days old. */
export function verifyAdminToken(
  token: string | undefined,
  secret: string,
  now: number = Date.now()
): boolean {
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [issuedAt, sig] = parts;
  if (!/^\d{1,16}$/.test(issuedAt) || !/^[0-9a-f]{64}$/.test(sig)) return false;

  const expected = Buffer.from(hmacHex(secret, issuedAt), "hex");
  const given = Buffer.from(sig, "hex");
  if (!safeEqual(given, expected)) return false;

  const age = now - Number(issuedAt);
  return age >= 0 && age <= SESSION_MAX_AGE_MS;
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const secret = getExpectedAdminSecret();
    if (!secret) return false;
    const cookieStore = await cookies();
    return verifyAdminToken(cookieStore.get(SESSION_COOKIE_NAME)?.value, secret);
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const secret = getExpectedAdminSecret();
  if (!secret) throw new Error("Admin disabled: ADMIN_SECRET is not set");
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, signAdminToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function validatePassword(password: unknown): boolean {
  const secret = getExpectedAdminSecret();
  if (!secret || typeof password !== "string" || !password) return false;
  const a = crypto.createHash("sha256").update(password.trim()).digest();
  const b = crypto.createHash("sha256").update(secret).digest();
  return safeEqual(a, b);
}

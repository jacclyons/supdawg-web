import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const BILLING_COOKIE = "sd_billing";

const SESSION_DAYS = 30;
const SESSION_SECONDS = SESSION_DAYS * 24 * 60 * 60;

function secret(): string | null {
  const password = process.env.BILLING_PASSWORD;
  if (!password) return null;
  // Signing with the password itself means changing the password logs everyone out.
  return `billing:${password}`;
}

export const isBillingConfigured = () => Boolean(process.env.BILLING_PASSWORD);

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(input: string) {
  const password = process.env.BILLING_PASSWORD;
  if (!password) return false;
  return safeEqual(input, password);
}

/** Cookie value is `expiryTimestamp.signature` — no database needed to validate it. */
export function createSessionToken() {
  const key = secret();
  if (!key) return null;
  const expires = String(Date.now() + SESSION_SECONDS * 1000);
  return `${expires}.${sign(expires, key)}`;
}

export function verifySessionToken(token: string | undefined) {
  const key = secret();
  if (!key || !token) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!safeEqual(signature, sign(expires, key))) return false;

  const expiresAt = Number(expires);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function isSignedIn() {
  const store = await cookies();
  return verifySessionToken(store.get(BILLING_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_SECONDS,
};

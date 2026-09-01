"use server";

import { cookies } from "next/headers";
import {
  BILLING_COOKIE,
  checkPassword,
  createSessionToken,
  isBillingConfigured,
  sessionCookieOptions,
} from "@/lib/billing-auth";

// Slows down password guessing. In-memory, so it resets on redeploy — fine for a single-tenant tool.
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;
let attempts: { count: number; resetAt: number } = { count: 0, resetAt: 0 };

function tooManyAttempts() {
  const now = Date.now();
  if (now > attempts.resetAt) attempts = { count: 0, resetAt: now + WINDOW_MS };
  return attempts.count >= MAX_ATTEMPTS;
}

export type LoginState = { error?: string };

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isBillingConfigured()) {
    return { error: "Billing login isn't set up. Add BILLING_PASSWORD to your environment." };
  }

  if (tooManyAttempts()) {
    return { error: "Too many tries. Wait 15 minutes." };
  }

  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    attempts.count += 1;
    return { error: "Wrong password." };
  }

  const token = createSessionToken();
  if (!token) return { error: "Couldn't start a session." };

  attempts.count = 0;
  const store = await cookies();
  store.set(BILLING_COOKIE, token, sessionCookieOptions);
  return {};
}

export async function signOut() {
  const store = await cookies();
  store.delete(BILLING_COOKIE);
}

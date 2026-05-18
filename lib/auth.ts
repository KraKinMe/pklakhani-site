import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { getSessionSecret, SESSION_MESSAGE } from "@/lib/auth-token";

export const ADMIN_COOKIE = "pkl_admin_session";

export function createSessionToken(): string {
  return createHmac("sha256", getSessionSecret())
    .update(SESSION_MESSAGE)
    .digest("hex");
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = createSessionToken();
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PANEL_PASSWORD?.trim();
  if (!expected) return false;
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function setSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function isRequestAuthenticated(req: Request | NextRequest): boolean {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return false;
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]*)`),
  );
  const token = match?.[1] ? decodeURIComponent(match[1]) : null;
  return verifySessionToken(token);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

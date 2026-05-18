import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionTokenEdge } from "@/lib/auth-edge";

const PROTECTED_API_MATCHERS = [
  "/api/blog",
  "/api/upload",
  "/api/admin",
  "/api/categories",
];

const PUBLIC_ADMIN_ROUTES = new Set([
  "/api/admin/login",
  "/api/admin/logout",
  "/api/admin/session",
]);

function isProtectedApi(pathname: string): boolean {
  return PROTECTED_API_MATCHERS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  if (isProtectedApi(pathname)) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const valid = await verifySessionTokenEdge(token);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/blog",
    "/api/blog/:path*",
    "/api/upload",
    "/api/admin/:path*",
    "/api/categories",
    "/api/categories/:path*",
  ],
};

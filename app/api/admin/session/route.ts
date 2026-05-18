import { NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/auth";

/** Returns auth state without 401 so the login page can probe session cleanly. */
export async function GET(req: Request) {
  return NextResponse.json({
    authenticated: isRequestAuthenticated(req),
  });
}

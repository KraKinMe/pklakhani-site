import { verifySessionTokenAsync } from "@/lib/auth-token";

export const ADMIN_COOKIE = "pkl_admin_session";

export async function verifySessionTokenEdge(
  token: string | undefined | null,
): Promise<boolean> {
  return verifySessionTokenAsync(token);
}

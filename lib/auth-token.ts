/** Shared session message — must match in Node (`lib/auth.ts`) and Edge (`lib/auth-edge.ts`). */
export const SESSION_MESSAGE = "authenticated";

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getSessionSecret(): string {
  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PANEL_PASSWORD?.trim();
  if (!secret) {
    throw new Error(
      "ADMIN_PANEL_PASSWORD (or ADMIN_SESSION_SECRET) must be set in environment variables.",
    );
  }
  return secret;
}

/** Edge-compatible HMAC token (proxy / edge runtime). */
export async function createSessionTokenAsync(): Promise<string> {
  const secret = getSessionSecret();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(SESSION_MESSAGE),
  );
  return bufferToHex(signature);
}

export async function verifySessionTokenAsync(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  try {
    const expected = await createSessionTokenAsync();
    return token === expected;
  } catch {
    return false;
  }
}

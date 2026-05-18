/** Authenticated fetch for admin CMS (httpOnly session cookie). */
export function adminFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  return fetch(input, {
    ...init,
    credentials: "include",
  });
}

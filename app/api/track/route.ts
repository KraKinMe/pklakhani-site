import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const method = searchParams.get("method") || "unknown";
  const label = searchParams.get("label") || "";
  const dest = searchParams.get("dest");

  if (!dest) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Try to extract client ID from _ga cookie if available
  const gaCookie = request.headers.get("cookie")?.match(/_ga=(.+?)(;|$)/);
  let clientId = crypto.randomUUID();
  
  if (gaCookie && gaCookie[1]) {
    // _ga cookie format is usually GA1.1.XXXXXXXX.YYYYYYYY. We want the XXXXXXXX.YYYYYYYY part.
    const parts = gaCookie[1].split(".");
    if (parts.length >= 4) {
      clientId = `${parts[2]}.${parts[3]}`;
    }
  }

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA_API_SECRET;

  if (measurementId && apiSecret) {
    // Fire to GA4 Measurement Protocol
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId,
          events: [
            {
              name: "contact_click",
              params: {
                method,
                label,
                source: "server_side",
              },
            },
          ],
        }),
      }
    ).catch(console.error); // Catch errors so we still redirect even if tracking fails
  }

  // Instantly redirect to the actual destination
  return NextResponse.redirect(dest);
}

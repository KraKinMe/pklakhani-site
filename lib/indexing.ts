import { google } from "googleapis";
import { getSiteUrl } from "@/config/site";

const SCOPES = ["https://www.googleapis.com/auth/indexing"];

/**
 * Initializes the Google API auth client using environment variables.
 */
function getAuthClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  // Replace escaped newlines if they exist in the env string
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    return null;
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
}

/**
 * Notifies Google Indexing API of a URL update (Addition/Modification)
 * @param relativeUrl - e.g. "/blogs/my-new-post"
 */
export async function notifyGoogleUrlUpdated(relativeUrl: string) {
  try {
    const authClient = getAuthClient();
    if (!authClient) {
      console.warn("Google Indexing API credentials missing. Skipping indexing request.");
      return;
    }

    const indexing = google.indexing({ version: "v3", auth: authClient });
    const siteUrl = getSiteUrl().replace(/\/+$/, "");
    const url = `${siteUrl}${relativeUrl}`;

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_UPDATED",
      },
    });

    console.log(`Successfully requested Google indexing for URL: ${url}`, res.data);
  } catch (error) {
    console.error("Error pushing URL to Google Indexing API:", error);
  }
}

/**
 * Notifies Google Indexing API of a URL deletion (Removal)
 * @param relativeUrl - e.g. "/blogs/my-deleted-post"
 */
export async function notifyGoogleUrlDeleted(relativeUrl: string) {
  try {
    const authClient = getAuthClient();
    if (!authClient) {
      console.warn("Google Indexing API credentials missing. Skipping indexing request.");
      return;
    }

    const indexing = google.indexing({ version: "v3", auth: authClient });
    const siteUrl = getSiteUrl().replace(/\/+$/, "");
    const url = `${siteUrl}${relativeUrl}`;

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_DELETED",
      },
    });

    console.log(`Successfully requested Google de-indexing for URL: ${url}`, res.data);
  } catch (error) {
    console.error("Error removing URL from Google Indexing API:", error);
  }
}

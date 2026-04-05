import type { Metadata } from "next";
import { SITE, getSiteUrl } from "./site";

/** Default Open Graph / Twitter image (path under `public/`). */
export const OG_IMAGE_PATH = "/images/hero_ca.png" as const;

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export const SEO_KEYWORDS = [
  "Chartered Accountant Gurugram",
  "CA Firm India",
  "Audit Services",
  "GST Compliance",
  "Tax Consultant",
] as const;

const rootDescription =
  "Chartered Accountants firm in Gurugram providing audit, taxation, GST and advisory services.";

const rootOgDescription =
  "Audit, taxation and advisory services for corporates and SMEs.";

/**
 * Root layout metadata — single place to edit site-wide defaults.
 * Per-route titles/descriptions stay in `config/meta.ts` via `generateMeta`.
 */
export const rootSiteMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

  title: {
    default: `${SITE.name} | Chartered Accountants`,
    template: `%s | ${SITE.name}`,
  },

  description: rootDescription,
  keywords: [...SEO_KEYWORDS],

  applicationName: SITE.name,

  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: SITE.name,
    description: rootOgDescription,
    url: getSiteUrl(),
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: absoluteUrl(OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: rootOgDescription,
    images: [absoluteUrl(OG_IMAGE_PATH)],
  },

  alternates: {
    canonical: getSiteUrl(),
  },
};

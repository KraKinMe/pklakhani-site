import type { Metadata } from "next";
import { SITE, getSiteUrl } from "./site";

/** Default Open Graph / Twitter image (path under `public/`). */
export const OG_IMAGE_PATH = "/images/hero_ca.png" as const;

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

const SEO_KEYWORDS = [
  "Chartered Accountant Gurugram",
  "CA firm Gurugram",
  "GST consultant Gurugram",
  "Income tax consultant India",
  "Statutory audit India",
  "Internal audit services",
  "Bookkeeping outsourcing India",
  "Payroll processing India",
  "Business advisory chartered accountant",
  "Tax compliance SMEs",
  "CA firm Sector 48 Gurugram",
  "Corporate tax advisory",
] as const;

const rootDescription =
  "Leading Chartered Accountant in Gurugram offering expert GST Audit, Tax Advisors, and statutory compliance for SMEs and corporates across India.";

const rootOgDescription =
  "Expert chartered accountants—audit, GST, tax and advisory—with an office on Sohna Road, Gurugram, serving trusted clients nationally.";

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

/**
 * Root layout metadata — site-wide defaults; per-route copy lives in `config/meta.ts`.
 */
export const rootSiteMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

  title: {
    default: `${SITE.name} | Chartered Accountants Gurugram`,
    template: `%s | ${SITE.name}`,
  },

  description: rootDescription,
  keywords: [...SEO_KEYWORDS],

  applicationName: SITE.name,

  authors: [{ name: SITE.name, url: getSiteUrl() }],

  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),

  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  other: {
    "geo.region": "IN-HR",
    "geo.placename": "Gurugram",
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
    title: `${SITE.name} | Chartered Accountants & Tax Advisors`,
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
        alt: `${SITE.name} — audit, taxation, GST and advisory in Gurugram`,
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

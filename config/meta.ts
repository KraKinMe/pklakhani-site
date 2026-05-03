import type { Metadata } from "next";
import { SITE, getSiteUrl } from "./site";
import { absoluteUrl, OG_IMAGE_PATH } from "./seo";

/** `absoluteTitle` avoids the root layout template so SERP snippets stay concise (~50–62 chars typical). */
const META = {
  home: {
    absoluteTitle:
      `${SITE.name} | CA Gurugram — Audit, GST & Tax Advisors`,
    description:
      "CA firm since 1994 in Gurugram: statutory audit, GST, income tax, bookkeeping & payroll for SMEs & corporates. Pan‑India support—WhatsApp or call for a consultation.",
    path: "",
  },

  about: {
    absoluteTitle:
      `About Us | ${SITE.name} — Gurugram Chartered Accountants`,
    description:
      "Learn about PK Lakhani & Co.—chartered accountants for corporates & SMEs since 1994: audits, taxation, outsourced accounting & compliance—with a Gurugram office and nationwide clients.",
    path: "/about",
  },

  services: {
    absoluteTitle:
      `Audit & Tax Services | ${SITE.name} Gurugram`,
    description:
      "Statutory & internal audits, GST & income-tax compliance, structuring advice, outsourced bookkeeping & payroll. Industry-aware delivery from Gurugram across India.",
    path: "/services",
  },

  contact: {
    absoluteTitle:
      `Contact PK Lakhani CA | Gurugram — Phone & WhatsApp`,
    description:
      "Book a chartered accountant consultation: Gurugram CA office phone, WhatsApp & email enquiries for audit, taxation, payroll & statutory deadlines.",
    path: "/contact",
  },

  careers: {
    absoluteTitle:
      `Careers | ${SITE.name} — Audit & Tax Professionals`,
    description:
      "Build your career at a reputable CA firm—roles in audits, taxation, GST & advisory. Apply via WhatsApp or our online application form.",
    path: "/careers",
  },
} as const;

const ogImage = absoluteUrl(OG_IMAGE_PATH);

const googleBot = {
  index: true as const,
  follow: true as const,
  "max-image-preview": "large" as const,
  "max-snippet": -1 as const,
  "max-video-preview": -1 as const,
};

/** Per-route metadata (title [absolute], description, canonical, OG/Twitter). */
export function generateMeta(key: keyof typeof META): Metadata {
  const meta = META[key];
  const base = getSiteUrl().replace(/\/+$/, "");
  const url = `${base}${meta.path}`;
  const pageTitle = meta.absoluteTitle;

  return {
    title: {
      absolute: pageTitle,
    },
    description: meta.description,
    authors: [{ name: SITE.name, url: base }],
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot,
    },
    openGraph: {
      title: pageTitle,
      description: meta.description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — audit, taxation and advisory Gurugram`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: meta.description,
      images: [ogImage],
    },
  };
}

/** Default public URL when `NEXT_PUBLIC_SITE_URL` is not set (e.g. local dev). */
const DEFAULT_SITE_URL = "https://www.pklakhani.com";

/**
 * Canonical site origin for metadata, OG URLs, JSON-LD, and sitemaps.
 * Set `NEXT_PUBLIC_SITE_URL` in `.env.local` for preview/staging (no trailing slash).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return DEFAULT_SITE_URL.replace(/\/+$/, "");
}

export const SITE = {
  name: "P.K. Lakhani & Co.",

  /** Use `getSiteUrl()` in new code; this getter keeps existing `SITE.baseUrl` usage working. */
  get baseUrl() {
    return getSiteUrl();
  },

  /** Shown under the firm name in the main navigation */
  taglineNav: "Chartered Accountants • Since 1994",

  /** Short line above the home hero headline */
  taglineHero:
    "Chartered Accountants • Established 1994 • Gurugram",

  brand: {
    prefix: "P.K.",
    highlight: "Lakhani",
    suffix: "& Co.",
  },

  contact: {
    phone: "+91 9811115617",
    email: "pradeep.lakhani@gmail.com",
    whatsapp: "918802805667",
  },

  address: {
    line: "302, JMD Galleria, Sohna Road, Sector 48, Gurugram, Haryana, India",
  },

  links: {
    whatsappBase: "https://wa.me/",
  },

  footer: {
    description:
      "Chartered Accountants based in Gurugram assisting SMEs and corporates in audit, taxation, and regulatory compliances.",
    established: "Established in 1994",
    bottomText:
      "Registered Chartered Accountants — Institute of Chartered Accountants of India",
  },

  /** Used in JSON-LD and legal footer context */
  schema: {
    foundingYear: "1994",
    locality: "Gurugram",
    region: "Haryana",
    country: "IN",
    areaServed: "India",
    professionalBody: "Institute of Chartered Accountants of India",
  },
};

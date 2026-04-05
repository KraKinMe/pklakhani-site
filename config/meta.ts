import type { Metadata } from "next";
import { SITE, getSiteUrl } from "./site";
import { absoluteUrl, OG_IMAGE_PATH } from "./seo";

export const META = {
  home: {
    title: "Audit, Tax & Compliance Services",
    description:
      "Audit, taxation, GST and compliance services for corporates and SMEs across India.",
    path: "",
  },

  about: {
    title: "About P.K. Lakhani & Co.",
    description:
      "Established in 1994, P.K. Lakhani & Co. is a Chartered Accountants firm based in Gurugram.",
    path: "/about",
  },

  services: {
    title: "Our Services",
    description:
      "Audit, GST, taxation and advisory services for corporates and SMEs.",
    path: "/services",
  },

  contact: {
    title: "Contact Us",
    description:
      "Contact P.K. Lakhani & Co. for audit, taxation and compliance services in Gurugram.",
    path: "/contact",
  },

  careers: {
    title: "Careers",
    description:
      "Explore career opportunities in audit, taxation and advisory.",
    path: "/careers",
  },
} as const;

const ogImage = absoluteUrl(OG_IMAGE_PATH);

/**
 * Per-route metadata (title, description, canonical, OG/Twitter).
 */
export function generateMeta(key: keyof typeof META): Metadata {
  const meta = META[key];
  const base = getSiteUrl();
  const url = `${base}${meta.path}`;

  return {
    title: meta.title,
    description: meta.description,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: meta.title,
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
          alt: SITE.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

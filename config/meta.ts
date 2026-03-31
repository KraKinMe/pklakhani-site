import type { Metadata } from "next";
import { SITE } from "./site";

const BASE_URL = SITE.baseUrl;

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
};

/**
 * Generate Next.js Metadata from config
 */
export function generateMeta(
  key: keyof typeof META
): Metadata {
  const meta = META[key];
  const url = `${BASE_URL}${meta.path}`;

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
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/hero_ca.png`, // fallback OG image
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
      images: [`${BASE_URL}/images/hero_ca.png`],
    },
  };
}
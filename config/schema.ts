import { SITE, getSiteUrl } from "./site";
import { absoluteUrl, OG_IMAGE_PATH } from "./seo";
import { SERVICES } from "./content";

const postalAddress = () => ({
  "@type": "PostalAddress" as const,
  streetAddress: SITE.address.line,
  addressLocality: SITE.schema.locality,
  addressRegion: SITE.schema.region,
  addressCountry: SITE.schema.country,
});

function catalogFromServices(base: string) {
  return {
    "@type": "OfferCatalog" as const,
    name: "Accounting, audit & tax services",
    itemListElement: SERVICES.map((s, index) => ({
      "@type": "Offer" as const,
      position: index + 1,
      itemOffered: {
        "@type": "Service" as const,
        name: s.title,
        description: s.description,
        url: `${base}/services`,
        provider: { "@id": `${base}/#organization` },
      },
    })),
  };
}

/** FAQ rich results — only use where the FAQ is visible on-page. */
export function getFaqPageJsonLd(
  faqs: readonly { readonly question: string; readonly answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Breadcrumbs for inner routes */
export function getBreadcrumbListJsonLd(
  items: readonly { readonly name: string; readonly path: string }[],
) {
  const base = getSiteUrl().replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? base : `${base}${item.path}`,
    })),
  };
}

/** Service listing for `/services` (paired with visible service content). */
export function getServicesItemListJsonLd() {
  const base = getSiteUrl().replace(/\/+$/, "");
  const pageUrl = `${base}/services`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} — services`,
    description:
      "Audit, taxation, GST, advisory and accounting services offered by the firm.",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((s, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: pageUrl,
      name: s.title,
      description: s.description,
    })),
  };
}

export function getSiteJsonLdGraph() {
  const base = getSiteUrl().replace(/\/+$/, "");
  const logoUrl = absoluteUrl(OG_IMAGE_PATH);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: SITE.name,
        legalName: SITE.name,
        url: base,
        logo: logoUrl,
        image: logoUrl,
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        foundingDate: SITE.schema.foundingYear,
        address: postalAddress(),
        areaServed: ["Gurugram", "Delhi NCR", "India"],
        memberOf: {
          "@type": "Organization",
          name: SITE.schema.professionalBody,
        },
        hasOfferCatalog: catalogFromServices(base),
        knowsAbout: [
          "Chartered Accountant Delhi NCR",
          "CA in Gurugram",
          "Statutory audit India",
          "Income tax advisory",
          "GST compliance India",
          "Corporate compliance",
          "Bookkeeping and payroll outsourcing",
          "Business advisory",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: SITE.name,
        inLanguage: "en-IN",
        publisher: { "@id": `${base}/#organization` },
        potentialAction: {
          "@type": "ContactAction",
          name: "Contact enquiry",
          target: `${base}/contact`,
        },
      },
      {
        "@type": ["AccountingService", "LocalBusiness"],
        "@id": `${base}/#accounting-service`,
        name: SITE.name,
        url: base,
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        foundingDate: SITE.schema.foundingYear,
        address: postalAddress(),
        areaServed: ["Gurugram", "Delhi NCR", "India"],
        memberOf: {
          "@type": "Organization",
          name: SITE.schema.professionalBody,
        },
        provider: { "@id": `${base}/#organization` },
      },
    ],
  };
}

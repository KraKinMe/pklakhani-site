import { SITE, getSiteUrl } from "./site";
import { absoluteUrl, OG_IMAGE_PATH } from "./seo";

const postalAddress = () => ({
  "@type": "PostalAddress" as const,
  streetAddress: SITE.address.line,
  addressLocality: SITE.schema.locality,
  addressRegion: SITE.schema.region,
  addressCountry: SITE.schema.country,
});

/**
 * Combined JSON-LD (@graph) for Organization, WebSite, and the primary service type.
 */
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
        url: base,
        logo: logoUrl,
        image: logoUrl,
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        foundingDate: SITE.schema.foundingYear,
        address: postalAddress(),
        areaServed: SITE.schema.areaServed,
        memberOf: {
          "@type": "Organization",
          name: SITE.schema.professionalBody,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: SITE.name,
        inLanguage: "en-IN",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "AccountingService",
        "@id": `${base}/#accounting-service`,
        name: SITE.name,
        url: base,
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        foundingDate: SITE.schema.foundingYear,
        address: postalAddress(),
        areaServed: SITE.schema.areaServed,
        memberOf: {
          "@type": "Organization",
          name: SITE.schema.professionalBody,
        },
        provider: { "@id": `${base}/#organization` },
      },
    ],
  };
}

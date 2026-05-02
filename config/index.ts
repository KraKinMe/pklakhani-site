/**
 * Central config entry — import from here when you want a single mental model:
 * `@/config` or `@/config/index`.
 */
export { SITE, getSiteUrl } from "./site";
export {
  rootSiteMetadata,
  absoluteUrl,
  OG_IMAGE_PATH,
  SEO_KEYWORDS,
} from "./seo";
export { generateMeta, META } from "./meta";
export {
  getSiteJsonLdGraph,
  getFaqPageJsonLd,
  getBreadcrumbListJsonLd,
  getServicesItemListJsonLd,
} from "./schema";
export { BRAND_COLORS } from "./branding";
export { CTA } from "./cta";
export { NAVIGATION } from "./navigation";

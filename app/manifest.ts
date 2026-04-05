import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { BRAND_COLORS } from "@/config/branding";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "P.K. Lakhani & Co.",
    description:
      "Chartered Accountants in Gurugram — audit, taxation, GST and advisory for SMEs and corporates.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: BRAND_COLORS.primary,
    lang: "en-IN",
    dir: "ltr",
  };
}

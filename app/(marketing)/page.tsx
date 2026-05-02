import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import ServicesPreview from "@/components/sections/ServicesPreview";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import JsonLd from "@/components/seo/JsonLd";
import { generateMeta } from "@/config/meta";
import { FAQ_HOME } from "@/config/content";
import { getFaqPageJsonLd } from "@/config/schema";

export const metadata = generateMeta("home");

export default function Home() {
  return (
    <>
      <JsonLd data={getFaqPageJsonLd(FAQ_HOME)} />
      <Hero />
      <Industries />
      <ServicesPreview />
      <FAQ />
      <CTA />
    </>
  );
}

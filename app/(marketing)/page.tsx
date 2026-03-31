import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import ServicesPreview from "@/components/sections/ServicesPreview";
import CTA from "@/components/sections/CTA";
import { generateMeta } from "@/config/meta";

export const metadata = generateMeta("home");

export default function Home() {
  return (
    <>
      <Hero />
      <Industries />
      <ServicesPreview />
      <CTA />
    </>
  );
}
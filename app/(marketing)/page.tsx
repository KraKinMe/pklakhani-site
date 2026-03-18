import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import ServicesPreview from "@/components/sections/ServicesPreview";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Home",
  description:
    "Audit, taxation, GST and compliance services for corporates and SMEs across India.",
};

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
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import PageHero from "@/components/common/PageHero";
import CTAButton from "@/components/common/CTAButton";
import WhatsAppCTA from "@/components/common/WhatsAppCTA";

import { generateMeta } from "@/config/meta";
import { PAGE_HERO, SERVICES } from "@/config/content";
import { CTA } from "@/config/cta";
import { SITE } from "@/config/site";

import {
  ShieldCheck,
  Calculator,
  LineChart,
  Users,
} from "lucide-react";

export const metadata = generateMeta("services");

// map icons
const ICON_MAP: Record<string, any> = {
  audit: ShieldCheck,
  tax: Calculator,
  advisory: LineChart,
  payroll: Users,
};

export default function ServicesPage() {
  return (
    <main>

      {/* HERO */}
      <PageHero {...PAGE_HERO.services} />

      {/* SERVICES */}
      {SERVICES.map((service, index) => {
        const Icon = ICON_MAP[service.icon];
        const reverse = index % 2 !== 0;

        return (
          <Section key={service.title}>
            <Container>

              <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">

                {/* TEXT */}
                <div className={reverse ? "md:order-2" : ""}>

                  <h2 className="heading heading-accent text-3xl md:text-4xl lg:text-5xl text-gray-900">
                    {service.title}
                  </h2>

                  <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
                    {service.description}
                  </p>

                  {/* BULLETS */}
                  <ul className="mt-6 space-y-3 text-gray-700 text-base md:text-lg">
                    {service.bullets.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8">
                    <WhatsAppCTA
                      message={service.cta.message}
                      label={service.cta.label}
                      className="inline-flex w-auto px-6 py-3 text-base"
                    />
                  </div>

                </div>

                {/* ICON VISUAL BLOCK (UPGRADED) */}
                <div className={`flex justify-center ${reverse ? "md:order-1" : ""}`}>
                  
                  <div className="relative">

                    {/* Glow background */}
                    <div className="absolute inset-0 bg-[#0B1F3A]/10 blur-2xl rounded-full scale-110"></div>

                    {/* Main card */}
                    <div className="relative w-64 h-64 rounded-3xl bg-white shadow-xl border border-gray-200 flex items-center justify-center">

                      <div className="w-24 h-24 rounded-2xl bg-[#0B1F3A] flex items-center justify-center">
                        <Icon size={48} strokeWidth={1.5} className="text-white" />
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </Container>
          </Section>
        );
      })}

      {/* TRUST SECTION */}
      <Section>
        <div className="bg-gray-50 py-24">
          <Container>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-center">

              <div>
                <p className="text-4xl font-bold text-[#0B1F3A]">30+</p>
                <p className="mt-2 text-sm text-gray-600">Years Experience</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-[#0B1F3A]">100%</p>
                <p className="mt-2 text-sm text-gray-600">Compliance Focus</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-[#0B1F3A]">Pan India</p>
                <p className="mt-2 text-sm text-gray-600">Service Coverage</p>
              </div>

            </div>

          </Container>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section dark>
        <div className="text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-3xl md:text-4xl lg:text-5xl">
              Talk to a Chartered Accountant Today
            </h2>

            <p className="mt-5 text-white/80 text-base md:text-lg">
              Get expert advice on audit, taxation, and compliance tailored to your business.
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">

              <CTAButton
                type="whatsapp"
                label="Chat on WhatsApp"
                message={CTA.general.message}
              />

              <a
                href={`tel:${SITE.contact.phone}`}
                className="px-6 py-3 rounded-md border border-white/30 text-white text-base font-medium hover:bg-white/10 transition"
              >
                Call Now
              </a>

            </div>

          </Container>
        </div>
      </Section>

    </main>
  );
}
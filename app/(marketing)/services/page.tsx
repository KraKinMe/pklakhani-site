import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import PageHero from "@/components/common/PageHero";
import CTAButton from "@/components/common/CTAButton";
import WhatsAppCTA from "@/components/common/WhatsAppCTA";

import { generateMeta } from "@/config/meta";
import { PAGE_HERO, SERVICES } from "@/config/content";
import { CTA } from "@/config/cta";
import { SITE } from "@/config/site";

export const metadata = generateMeta("services");

export default function ServicesPage() {
  return (
    <main>

      {/* HERO */}
      <PageHero {...PAGE_HERO.services} />

      {/* SERVICES */}
      {SERVICES.map((service) => {
        const isAlt = service.highlight;

        return (
          <Section key={service.title}>
            <div
              className={
                isAlt
                  ? "bg-gray-50 -my-24 py-24 text-center"
                  : "text-center"
              }
            >
              <Container size="sm">

                <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
                  {service.title}
                </h2>

                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  {service.description}
                </p>

                {/* CTA (from config) */}
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <WhatsAppCTA
                    message={service.cta.message}
                    label={service.cta.label}
                    className="px-6 py-2.5 text-sm rounded-md w-auto inline-flex"
                  />
                </div>

              </Container>
            </div>
          </Section>
        );
      })}

      {/* FINAL CTA */}
      <Section dark>
        <div className="text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-3xl md:text-4xl">
              Need Assistance?
            </h2>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">

              <CTAButton
                type="whatsapp"
                label={CTA.general.label}
                message={CTA.general.message}
              />

              <a
                href={`tel:${SITE.contact.phone}`}
                className="px-6 py-2.5 rounded-md border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition inline-flex items-center justify-center"
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
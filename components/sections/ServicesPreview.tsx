import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import WhatsAppCTA from "@/components/common/WhatsAppCTA";

import {
  SERVICES,
  SERVICES_SECTION,
} from "@/config/content";

export default function ServicesPreview() {
  return (
    <Section>
      <div className="text-center">
        <Container>

          {/* Heading */}
          <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
            {SERVICES_SECTION.title}
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {SERVICES_SECTION.description}
          </p>

          {/* Cards */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">

            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-black"
              >
                <h3 className="font-semibold text-lg text-gray-900">
                  {service.title}
                </h3>

                <p className="text-xs font-medium text-gray-500 mt-2 uppercase tracking-wide">
                  {service.subtitle}
                </p>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* CTA */}
                {/* <div className="mt-4">
                  <WhatsAppCTA
                    message={service.cta.message}
                    label={service.cta.label}
                    className="text-sm px-4 py-2"
                  />
                </div> */}
              </div>
            ))}

          </div>

        </Container>
      </div>
    </Section>
  );
}
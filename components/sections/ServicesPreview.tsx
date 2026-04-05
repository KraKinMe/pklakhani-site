import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

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
          <h2 className="heading heading-accent text-2xl md:text-3xl">
            {SERVICES_SECTION.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-page-muted">
            {SERVICES_SECTION.description}
          </p>

          {/* Cards */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">

            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-card-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-page-fg hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-page-fg">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-page-muted">
                  {service.subtitle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-page-muted">
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
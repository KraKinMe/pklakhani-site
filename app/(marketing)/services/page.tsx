import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";
import { SERVICES } from "@/config/content";
import { MESSAGES } from "@/config/messages";
import { SITE } from "@/config/site";
import { generateMeta } from "@/config/meta";

export const metadata = generateMeta("services");

export default function ServicesPage() {
  return (
    <main>

      {/* HERO */}
      <Section dark>
        <div className="text-center">
          <Container size="sm">
            <h1 className="heading heading-accent text-3xl md:text-4xl">
              Our Services
            </h1>

            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Comprehensive audit, taxation, and advisory services designed to ensure
              compliance, reduce risk, and support business growth.
            </p>
          </Container>
        </div>
      </Section>

      {/* SERVICES */}
      {SERVICES.map((service, index) => {
        const isAlt = service.highlight;

        return (
          <Section key={service.title}>
            <div className={isAlt ? "bg-gray-50 -my-24 py-24 text-center" : "text-center"}>
              <Container size="sm">

                <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
                  {service.title}
                </h2>

                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  {service.description}
                </p>

                <div className="mt-8">
                  <Button
                    href={getWhatsAppLink(MESSAGES[service.messageKey])}
                    target="_blank"
                  >
                    {service.ctaLabel}
                  </Button>
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

              <Button
                href={getWhatsAppLink(MESSAGES.general)}
                target="_blank"
              >
                WhatsApp
              </Button>

              <Button
                href={`tel:${SITE.contact.phone}`}
                variant="secondary-dark"
              >
                Call
              </Button>

            </div>

          </Container>
        </div>
      </Section>

    </main>
  );
}
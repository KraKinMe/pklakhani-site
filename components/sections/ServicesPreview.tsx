import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";
import { SERVICES } from "@/config/content";
import { MESSAGES } from "@/config/messages";

export default function ServicesPreview() {
  return (
    <Section>
      <div className="text-center">
        <Container>

          {/* Heading */}
          <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
            Our Core Services
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Comprehensive audit, taxation, and advisory solutions designed to ensure compliance,
            optimize financial performance, and support business growth.
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
              </div>
            ))}

          </div>

          {/* CTA */}
          {/* <div className="mt-16">
            <Button
              href={getWhatsAppLink(MESSAGES.general)}
              target="_blank"
            >
              Talk to a Chartered Accountant
            </Button>
          </div> */}

        </Container>
      </div>
    </Section>
  );
}
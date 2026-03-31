import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";

export const metadata = {
  title: "Services",
  description:
    "Audit, GST, taxation and advisory services for corporates and SMEs.",
};

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

      {/* 1 — AUDIT */}
      <Section>
        <div className="text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
              Audit & Assurance
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Statutory audits, internal audits, and financial reviews designed to ensure
              compliance, accuracy, and transparency in financial reporting.
            </p>

            <div className="mt-8">
              <Button
                href={getWhatsAppLink(
                  "Hi, I would like to discuss Audit & Assurance services."
                )}
                target="_blank"
              >
                Discuss Audit Requirements
              </Button>
            </div>

          </Container>
        </div>
      </Section>

      {/* 2 — TAX */}
      <Section>
        <div className="bg-gray-50 -my-24 py-24 text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
              Income Tax & GST
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              End-to-end tax planning, return filing, and GST compliance services focused
              on minimizing tax exposure and ensuring regulatory adherence.
            </p>

            <div className="mt-8">
              <Button
                href={getWhatsAppLink(
                  "Hi, I would like to discuss Income Tax and GST services."
                )}
                target="_blank"
              >
                Discuss Tax & GST
              </Button>
            </div>

          </Container>
        </div>
      </Section>

      {/* 3 — ADVISORY */}
      <Section>
        <div className="text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
              Business Advisory & Structuring
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Advisory on business structuring, regulatory compliance, and financial
              decision-making to support scalable and sustainable growth.
            </p>

            <div className="mt-8">
              <Button
                href={getWhatsAppLink(
                  "Hi, I would like to discuss Business Advisory and Structuring services."
                )}
                target="_blank"
              >
                Get Advisory Support
              </Button>
            </div>

          </Container>
        </div>
      </Section>

      {/* 4 — ACCOUNTING */}
      <Section>
        <div className="bg-gray-50 -my-24 py-24 text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
              Outsourced Accounting & Bookkeeping
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Reliable accounting and bookkeeping services to maintain accurate financial
              records, improve reporting, and support informed business decisions.
            </p>

            <div className="mt-8">
              <Button
                href={getWhatsAppLink(
                  "Hi, I would like to discuss Accounting and Bookkeeping services."
                )}
                target="_blank"
              >
                Discuss Accounting Needs
              </Button>
            </div>

          </Container>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section dark>
        <div className="text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-3xl md:text-4xl">
              Need Assistance?
            </h2>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">

              <Button
                href={getWhatsAppLink(
                  "Hi, I would like to discuss your services."
                )}
                target="_blank"
              >
                WhatsApp
              </Button>

              <Button href="tel:+91981115617" variant="secondary-dark">
                Call
              </Button>

            </div>

          </Container>
        </div>
      </Section>

    </main>
  );
}
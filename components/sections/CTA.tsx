import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function CTA() {
  return (
    <Section dark>
      <Container size="sm">

        <div className="text-center max-w-2xl mx-auto">

          <h2 className="heading heading-accent text-3xl md:text-4xl">
            Need Assistance?
          </h2>

          <p className="mt-4 text-gray-300 leading-relaxed">
            Connect with our team to discuss your requirements and get expert guidance.
          </p>

          <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">

            <Button
              href={getWhatsAppLink(
                "Hi, I need assistance with audit, tax, or compliance services."
              )}
              target="_blank"
            >
              Talk to a Chartered Accountant
            </Button>

            <Button
              href="tel:+91981115617"
              variant="secondary-dark"
            >
              Call Now
            </Button>

          </div>

        </div>

      </Container>
    </Section>
  );
}
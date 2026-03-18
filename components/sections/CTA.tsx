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
            Need Assistance with Audit or Compliance?
          </h2>

          <p className="mt-4 text-gray-300 leading-relaxed">
            Connect with our team to discuss your requirements.
          </p>

          <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">

            <Button href={getWhatsAppLink()} target="_blank">
              WhatsApp
            </Button>

            <Button
              href="tel:+91981115617"
              variant="secondary-dark"
            >
              Call
            </Button>

          </div>

        </div>

      </Container>
    </Section>
  );
}
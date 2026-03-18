import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function CareersPage() {
  const form =
    "https://docs.google.com/forms/d/e/1FAIpQLSf0LUCcXhEC1SKWkEWlsmMKnOmUlhNoBzA1CRrPCCIzMDSeZw/viewform";

  return (
    <main>

      <Section dark>
        <Container size="sm">
          <h1 className="heading heading-accent text-3xl text-center">
            Careers
          </h1>
          <p className="mt-4 text-gray-300 text-center">
            Join us for professional growth in audit, taxation and advisory.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <div className="flex justify-center gap-4 flex-wrap">

            <Button href={getWhatsAppLink("Hi, I am interested in the career opportunity.")} target="_blank">
              Apply via WhatsApp
            </Button>

            <Button href={form} variant="secondary" target="_blank">
              Apply via Form
            </Button>

          </div>
        </Container>
      </Section>

    </main>
  );
}
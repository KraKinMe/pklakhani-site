import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/config/site";
import { MESSAGES } from "@/config/messages";
import { getWhatsAppLink } from "@/utils/whatsapp";
import { generateMeta } from "@/config/meta";

export const metadata = generateMeta("contact");

export default function ContactPage() {
  return (
    <main>

      <Section dark>
        <Container size="sm">
          <h1 className="heading heading-accent text-3xl text-center">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-300 text-center">
            Reach out for audit, taxation and advisory services.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="sm">

          <div className="space-y-6 text-gray-700">

            <div>
              <h3 className="font-semibold">Office Address</h3>
              <p className="text-sm text-gray-600">
                {SITE.address.line}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Phone</h3>
              <a
                href={`tel:${SITE.contact.phone}`}
                className="text-sm text-gray-600"
              >
                {SITE.contact.phone}
              </a>
            </div>

            <div>
              <h3 className="font-semibold">Email</h3>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="text-sm text-gray-600"
              >
                {SITE.contact.email}
              </a>
            </div>

          </div>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Button
              href={getWhatsAppLink(MESSAGES.general)}
              target="_blank"
            >
              WhatsApp
            </Button>

            <Button
              href={`tel:${SITE.contact.phone}`}
              variant="secondary"
            >
              Call
            </Button>
          </div>

          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              SITE.address.line
            )}&output=embed`}
            className="w-full h-[300px] rounded-lg border mt-6"
            loading="lazy"
          />

        </Container>
      </Section>

    </main>
  );
}
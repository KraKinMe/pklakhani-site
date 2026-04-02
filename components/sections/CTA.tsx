import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import WhatsAppCTA from "@/components/common/WhatsAppCTA";
import { CTA } from "@/config/cta";
import { SITE } from "@/config/site";

export default function CTASection() {
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

            {/* WhatsApp CTA */}
            <WhatsAppCTA
              {...CTA.general}
              label="Talk to a Chartered Accountant"
            />

            {/* Call CTA */}
            <Button
              href={`tel:${SITE.contact.phone}`}
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
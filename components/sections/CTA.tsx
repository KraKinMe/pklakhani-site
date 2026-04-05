import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import WhatsAppCTA from "@/components/common/WhatsAppCTA";
import { CTA } from "@/config/cta";
import { SITE } from "@/config/site";
import { HOME_CTA_SECTION, LABELS } from "@/config/content";

export default function CTASection() {
  return (
    <Section dark>
      <Container size="sm">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading heading-accent text-3xl md:text-4xl">
            {HOME_CTA_SECTION.title}
          </h2>

          <p className="mt-4 leading-relaxed text-zinc-300">
            {HOME_CTA_SECTION.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppCTA
              {...CTA.general}
              label={HOME_CTA_SECTION.whatsappLabel}
            />

            <Button
              href={`tel:${SITE.contact.phone}`}
              variant="secondary-dark"
            >
              {LABELS.callNow}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

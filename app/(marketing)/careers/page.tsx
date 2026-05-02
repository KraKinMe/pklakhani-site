import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import PageHero from "@/components/common/PageHero";
import CTAButton from "@/components/common/CTAButton";
import JsonLd from "@/components/seo/JsonLd";

import { generateMeta } from "@/config/meta";
import { CAREERS, PAGE_HERO } from "@/config/content";
import { CTA } from "@/config/cta";
import { getBreadcrumbListJsonLd } from "@/config/schema";

export const metadata = generateMeta("careers");

export default function CareersPage() {
  return (
    <div>
      <JsonLd
        data={getBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <PageHero {...PAGE_HERO.careers} />

      <Section>
        <div className="text-center">
          <Container size="sm">
            <p className="mx-auto max-w-2xl text-page-muted">
              {CAREERS.intro}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CTAButton
                type="whatsapp"
                label={CAREERS.whatsappButtonLabel}
                message={CTA.careers.message}
              />

              <a
                href={CAREERS.applicationFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {CAREERS.formButtonLabel}
              </a>
            </div>
          </Container>
        </div>
      </Section>
    </div>
  );
}

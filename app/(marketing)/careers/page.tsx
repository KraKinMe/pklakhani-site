import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import PageHero from "@/components/common/PageHero";
import CTAButton from "@/components/common/CTAButton";

import { generateMeta } from "@/config/meta";
import { PAGE_HERO } from "@/config/content";
import { CTA } from "@/config/cta";

export const metadata = generateMeta("careers");

export default function CareersPage() {
  const form =
    "https://docs.google.com/forms/d/e/1FAIpQLSdKeW8w7G_LzEqNntfKIYgxs7_PdU8k-REx4NRFGHanFfjO2Q/viewform?usp=publish-editor";

  return (
    <main>

      {/* HERO (Reusable) */}
      <PageHero {...PAGE_HERO.careers} />

      {/* VALUE + CTA */}
      <Section>
        <div className="text-center">
          <Container size="sm">

            <p className="text-gray-600 max-w-2xl mx-auto">
              We are always looking for motivated individuals who are eager to learn,
              take responsibility, and grow in a professional environment.
            </p>

            {/* ACTIONS */}
            <div className="mt-10 flex justify-center gap-4 flex-wrap">

              {/* WhatsApp CTA */}
              <CTAButton
                type="whatsapp"
                label="Apply via WhatsApp"
                message={CTA.careers.message}
              />

              {/* Form CTA */}
              <a
                href={form}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Apply via Form
              </a>

            </div>

          </Container>
        </div>
      </Section>

    </main>
  );
}
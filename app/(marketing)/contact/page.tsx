import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import PageHero from "@/components/common/PageHero";
import CTAButton from "@/components/common/CTAButton";

import { generateMeta } from "@/config/meta";
import { CONTACT_PAGE, LABELS, PAGE_HERO } from "@/config/content";
import { SITE } from "@/config/site";
import { CTA } from "@/config/cta";

export const metadata = generateMeta("contact");

export default function ContactPage() {
  return (
    <div>
      <PageHero {...PAGE_HERO.contact} position="top" />

      <Section>
        <Container size="sm">
          <div className="space-y-6 text-page-fg">
            <div>
              <h3 className="font-semibold">
                {CONTACT_PAGE.headings.address}
              </h3>
              <p className="text-sm text-page-muted">{SITE.address.line}</p>
            </div>

            <div>
              <h3 className="font-semibold">{CONTACT_PAGE.headings.phone}</h3>
              <CTAButton
                className="text-sm text-page-muted hover:text-page-fg"
                type="call"
                label={SITE.contact.phone}
                phone={SITE.contact.phone}
              />
            </div>

            <div>
              <h3 className="font-semibold">{CONTACT_PAGE.headings.email}</h3>
              <CTAButton
                className="text-sm text-page-muted hover:text-page-fg"
                type="email"
                label={SITE.contact.email}
                email={SITE.contact.email}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton
              type="whatsapp"
              label={CONTACT_PAGE.whatsappLabel}
              message={CTA.general.message}
            />

            <a
              href={`tel:${SITE.contact.phone}`}
              className="inline-flex items-center justify-center rounded-md border border-card-border px-6 py-2.5 text-sm font-medium text-page-fg transition hover:bg-muted-surface"
            >
              {LABELS.callNow}
            </a>
          </div>

          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              SITE.address.line
            )}&output=embed`}
            className="mt-6 h-[300px] w-full rounded-lg border border-card-border"
            loading="lazy"
            title="Office location map"
          />
        </Container>
      </Section>
    </div>
  );
}

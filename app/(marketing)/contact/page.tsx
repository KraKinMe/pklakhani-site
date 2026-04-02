import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import PageHero from "@/components/common/PageHero";
import CTAButton from "@/components/common/CTAButton";

import { generateMeta } from "@/config/meta";
import { PAGE_HERO } from "@/config/content";
import { SITE } from "@/config/site";
import { CTA } from "@/config/cta";

export const metadata = generateMeta("contact");

export default function ContactPage() {
  return (
    <main>

      {/* HERO (Reusable) */}
      <PageHero 
        {...PAGE_HERO.contact} 
        position="top"
      />

      {/* CONTACT INFO */}
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
              <CTAButton
                type="call"
                label={SITE.contact.phone}
                phone={SITE.contact.phone}
              />
            </div>

            <div>
              <h3 className="font-semibold">Email</h3>
              <CTAButton
                type="email"
                label={SITE.contact.email}
                email={SITE.contact.email}
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex gap-4 flex-wrap">

            <CTAButton
              type="whatsapp"
              label="WhatsApp"
              message={CTA.general.message}
            />

            <a
                href={`tel:${SITE.contact.phone}`}
                className="px-6 py-2.5 rounded-md border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition inline-flex items-center justify-center"
              >
                Call Now
              </a>

          </div>

          {/* MAP */}
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
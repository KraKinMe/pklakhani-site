import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import PageHero from "@/components/common/PageHero";
import CTAButton from "@/components/common/CTAButton";
import JsonLd from "@/components/seo/JsonLd";

import { generateMeta } from "@/config/meta";
import { LABELS, PAGE_HERO, SERVICES, SERVICES_PAGE_CTA } from "@/config/content";
import { CTA } from "@/config/cta";
import { SITE } from "@/config/site";
import {
  getBreadcrumbListJsonLd,
  getServicesItemListJsonLd,
} from "@/config/schema";

import LatestBlogPosts from "@/components/blogs/LatestBlogPosts";
import ServiceCard from "@/components/services/ServiceCard";
import StatsSection from "@/components/services/StatsSection";

import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Calculator, LineChart, Users } from "lucide-react";

export const metadata = generateMeta("services");

const ENABLE_ALTERNATE = false;

// service icons
const ICON_MAP: Record<string, LucideIcon> = {
  audit: ShieldCheck,
  tax: Calculator,
  advisory: LineChart,
  payroll: Users,
};

export default function ServicesPage() {
  return (
    <div>
      <JsonLd
        data={getBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd data={getServicesItemListJsonLd()} />

      <PageHero {...PAGE_HERO.services} />

      {/* SERVICES */}
      {SERVICES.map((service, index) => {
        const Icon = ICON_MAP[service.icon];
        const reverse = ENABLE_ALTERNATE && index % 2 !== 0;

        return (
          <ServiceCard
            key={service.title}
            service={service}
            Icon={Icon}
            reverse={reverse}
          />
        );
      })}

      {/* TRUST SECTION (SVG LEFT, TEXT RIGHT) */}
      <StatsSection />

      <LatestBlogPosts
        title="Related Insights"
        description="Practical articles on audit, tax, and compliance for businesses we serve."
      />

      {/* FINAL CTA */}
      <Section dark>
        <div className="text-center">
          <Container size="sm">
            <h2 className="heading heading-accent heading-accent-center text-3xl md:text-4xl lg:text-5xl">
              {SERVICES_PAGE_CTA.title}
            </h2>

            <p className="mt-5 text-base text-zinc-300 md:text-lg">
              {SERVICES_PAGE_CTA.description}
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <CTAButton
                type="whatsapp"
                label={LABELS.chatOnWhatsApp}
                message={CTA.general.message}
              />

              <a
                href={`tel:${SITE.contact.phone}`}
                className="rounded-md border border-white/30 px-6 py-3 text-base font-medium text-white transition hover:bg-white/10"
              >
                {LABELS.callNow}
              </a>
            </div>
          </Container>
        </div>
      </Section>
    </div>
  );
}
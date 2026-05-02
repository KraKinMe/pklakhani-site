import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import PageHero from "@/components/common/PageHero";
import CTAButton from "@/components/common/CTAButton";
import WhatsAppCTA from "@/components/common/WhatsAppCTA";
import JsonLd from "@/components/seo/JsonLd";

import { generateMeta } from "@/config/meta";
import {
  LABELS,
  PAGE_HERO,
  SERVICES,
  SERVICES_PAGE_CTA,
  STATS,
} from "@/config/content";
import { CTA } from "@/config/cta";
import { SITE } from "@/config/site";
import {
  getBreadcrumbListJsonLd,
  getServicesItemListJsonLd,
} from "@/config/schema";

import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Calculator,
  LineChart,
  Users,
  Clock,
  CheckCircle,
  Map,
} from "lucide-react";

export const metadata = generateMeta("services");

const ENABLE_ALTERNATE = false;

// service icons
const ICON_MAP: Record<string, LucideIcon> = {
  audit: ShieldCheck,
  tax: Calculator,
  advisory: LineChart,
  payroll: Users,
};

const STAT_ICON_MAP: Record<string, LucideIcon> = {
  clock: Clock,
  check: CheckCircle,
  india: Map,
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
          <Section key={service.title}>
            <Container>

              <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">

                {/* TEXT */}
                <div className={`${reverse ? "md:order-2" : ""} w-full text-left`}>

                  <h2 className="service-heading text-3xl md:text-4xl lg:text-5xl">
                    {service.title}
                  </h2>

                  <p className="mt-5 text-lg leading-relaxed text-page-muted md:text-xl">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3 text-lg text-page-fg md:text-xl">
                    {service.bullets.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <WhatsAppCTA
                      message={service.cta.message}
                      label={service.cta.label}
                      className="inline-flex w-auto px-6 py-3 text-base"
                    />
                  </div>

                </div>

                {/* ICON BLOCK */}
                <div className={`flex justify-center ${reverse ? "md:order-1" : ""}`}>
                  <div className="relative">

                    {/* glow */}
                    <div className="absolute inset-0 scale-110 rounded-full bg-brand/10 blur-2xl" />

                    <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl border border-card-border bg-card shadow-xl">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-brand">
                        <Icon size={48} strokeWidth={1.5} className="text-white" />
                      </div>

                    </div>

                  </div>
                </div>

              </div>

            </Container>
          </Section>
        );
      })}

      {/* TRUST SECTION (SVG LEFT, TEXT RIGHT) */}
      <Section>
        <div className="bg-muted-surface py-24">
          <Container>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">

              {STATS.map((stat) => {
                const Icon = STAT_ICON_MAP[stat.icon];

                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-6"
                  >

                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand/10 dark:bg-white/10">
                      <Icon
                        size={48}
                        className="text-brand dark:text-brand-accent"
                      />
                    </div>

                    <div>
                      <p className="text-4xl font-bold text-brand dark:text-white">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm text-page-muted dark:text-zinc-400">
                        {stat.label}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

          </Container>
        </div>
      </Section>

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
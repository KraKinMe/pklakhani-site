import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";

import WhatsAppCTA from "@/components/common/WhatsAppCTA";
import { CTA } from "@/config/cta";
import { SITE } from "@/config/site";
import { HERO, HOME_HERO, LABELS } from "@/config/content";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HOME_HERO.imageSrc}
          alt={HOME_HERO.imageAlt}
          fill
          priority
          quality={82}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      <Section dark>
        <div className="relative z-10 text-center text-white">
          <Container size="sm">
            <p className="mb-4 text-sm text-gray-200">{SITE.taglineHero}</p>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {HOME_HERO.title}
              <span className="mt-2 block text-[var(--brand-accent)]">
                {HOME_HERO.accent}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
              {HOME_HERO.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <WhatsAppCTA {...CTA.consultation} />

              <Button
                href={`tel:${SITE.contact.phone}`}
                variant="secondary-dark"
              >
                {LABELS.call}
              </Button>

              <Button
                href={`mailto:${SITE.contact.email}`}
                variant="secondary-dark"
              >
                {LABELS.email}
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-gray-200">
              {HERO.highlights.map((item) => (
                <span key={item.label}>{item.label}</span>
              ))}
            </div>
          </Container>
        </div>
      </Section>
    </div>
  );
}

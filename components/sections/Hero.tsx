import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";

import WhatsAppCTA from "@/components/common/WhatsAppCTA";
import { CTA } from "@/config/cta";
import { SITE } from "@/config/site";
import { HERO } from "@/config/content";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero_ca.webp"
          alt="Chartered Accountant Meeting"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      <Section dark>
        <div className="relative z-10 text-center text-white">

          <Container size="sm">

            <p className="text-sm text-gray-200 mb-4">
              Chartered Accountants • Established 1994 • Gurugram
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Chartered Accountants for SMEs & Corporates
              <span className="block text-[#C9A14A] mt-2">
                Audit, Tax & Strategic Advisory
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
              Enabling corporates and SMEs with expert statutory audit, taxation,
              and regulatory compliance services.
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">

              <WhatsAppCTA {...CTA.consultation} />

              <Button
                href={`tel:${SITE.contact.phone}`}
                variant="secondary-dark"
              >
                Call
              </Button>

              <Button
                href={`mailto:${SITE.contact.email}`}
                variant="secondary-dark"
              >
                Email
              </Button>

            </div>

            <div className="mt-8 flex justify-center gap-6 text-sm text-gray-200 flex-wrap font-semibold">
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
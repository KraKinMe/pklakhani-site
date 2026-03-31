import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";
import { MESSAGES } from "@/config/messages";
import { SITE } from "@/config/site";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero_ca.webp"
          alt="Chartered Accountant Meeting"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <Section dark>
        <div className="relative z-10 text-center text-white">

          <Container size="sm">

            <p className="text-sm text-gray-300 mb-4">
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

              {/* WhatsApp CTA */}
              <Button
                href={getWhatsAppLink(MESSAGES.consultation)}
                target="_blank"
              >
                <span className="flex items-center gap-2">
                  <img
                    src="/icons/whatsapp.svg"
                    alt="WhatsApp"
                    className="w-4 h-4 shrink-0"
                  />
                  Schedule a Consultation
                </span>
              </Button>

              {/* Secondary Actions */}
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

            <div className="mt-8 flex justify-center gap-6 text-sm text-gray-300 flex-wrap">
              <span>3+ Decades of Experience</span>
              <span>Pan India Services</span>
              <span>Corporate & SME Focus</span>
            </div>

          </Container>

        </div>
      </Section>

    </div>
  );
}
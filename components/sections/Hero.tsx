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
          quality={75}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAIAAAAy3EnLAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAB9UlEQVR4nAHqARX+AP39+Ozi0O3m2+br797s8bm+vqm+x8rk7tHm8ZalsYibqbTT5bnN3M7i78Tf7rHX6wD9/vbu4Mvq5NXu7u3x8u6+wsCwwcfZ6vLa6vKeqrKRnKcuKzIkLTfH4e/L4u7S4+0A+/vv49bC6+DU6+ri4+Tgvb6+t8LE6O7y5uzsxbu7lYqCbEQ2Ujkz0OTuzeLrzOHpAObSt9HEr+Lc0KCMf6uJeLarnYB4c7mtpMPIx72kmnxVQn57fE9ARV5zjsLL0MPHwwDIqYerlH2wlYOSgXeccFqjk4NhUUmHcmbCwLqurKlKOzZkcYUnP2YAHjtMW2q5uLEAhXJhdGZYhXlrHTVMSFtphX9zRjozeGtqjoyHd3h1TEtRHEFtAydNABEuBxswXVZOAJKEaI2AcIJ9aQ4rRgApSGBpaWpWTpN0bHx8fFJXZQMbMwQYMAAYOAAIJgAPKrKijgBsbF1pZV1taWQJL1AAAB4pMjlQQ0B+RzM3PEYgJS8RFBMbHiMAIkUAAiUAECyThXYAtq+mvLqzo6qwAB9AAAAakot6UEg9RTkvu7y2VUxFOzY1QTs4ABo8ABEyAAYlPDw2AL68tLa2raiuri82PiolG4uMhFBFOz4zJbSyrTs2ODctLEAtJgAKJwAZOgAAElRTTvi17iuzvJOBAAAAAElFTkSuQmCC"
          className="object-cover"
        />

        {/* Improved overlay */}
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

              {/* WhatsApp CTA */}
              <Button
                href={getWhatsAppLink(MESSAGES.consultation)}
                target="_blank"
              >
                <span className="flex items-center gap-2">
                  <Image
                    src="/icons/whatsapp.svg"
                    alt="WhatsApp"
                    width={16}
                    height={16}
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

            <div className="mt-8 flex justify-center gap-6 text-sm text-gray-200 flex-wrap">
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
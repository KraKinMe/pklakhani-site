import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function Hero() {
  return (
    <Section className="relative overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_ca.png"
          alt="Chartered Accountant Meeting"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <Container size="sm" className="relative z-10 text-center text-white">

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

          <Button
            href={getWhatsAppLink()}
            target="_blank"
            variant="secondary-dark"
          >
            Schedule a Consultation
          </Button>

          <Button href="tel:+91981115617" variant="secondary-dark">
            Call
          </Button>

          <Button href="mailto:pradeep.lakhani@gmail.com" variant="secondary-dark">
            Email
          </Button>

        </div>

        <div className="mt-8 flex justify-center gap-6 text-sm text-gray-300 flex-wrap">
          <span>3+ Decades of Experience</span>
          <span>Pan India Services</span>
          <span>Corporate & SME Focus</span>
        </div>

      </Container>
    </Section>
  );
}




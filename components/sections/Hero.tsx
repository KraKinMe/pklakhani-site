import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function Hero() {
  return (
    <Section dark>
      <Container size="sm">

        <p className="text-sm text-gray-300 mb-4 text-center">
          Chartered Accountants • Established 1994 • Gurugram
        </p>

        <h1 className="heading text-4xl md:text-5xl text-center">
          Audit, Tax & Compliance
          <br />
          for Growing Enterprises
        </h1>

        <p className="mt-6 text-lg text-gray-300 text-center">
          We assist corporates and SMEs with statutory audits, taxation and regulatory compliance.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          
          <Button
            href={getWhatsAppLink()}
            target="_blank"
          >
            Discuss Your Requirement
          </Button>

          <Button href="tel:+91981115617" variant="secondary-dark">
            Call
          </Button>

          <Button href="mailto:pradeep.lakhani@gmail.com" variant="secondary-dark">
            Email
          </Button>

        </div>

        <div className="mt-8 flex justify-center gap-6 text-sm text-gray-400 flex-wrap">
          <span>30+ Years Experience</span>
          <span>Pan India Services</span>
          <span>Corporate & SME Focus</span>
        </div>

      </Container>
    </Section>
  );
}
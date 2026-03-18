import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function ServicesPreview() {
  return (
    <Section>
      <Container>

        <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900 mb-14 text-center">
          Core Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="p-6 border border-gray-300 rounded-lg transition transform hover:-translate-y-1 hover:shadow-lg hover:border-black">
            <h3 className="font-semibold text-lg text-gray-900">
              Audit & Assurance
            </h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Statutory and internal audits ensuring compliance accuracy and financial transparency.
            </p>
          </div>

          <div className="p-6 border border-gray-300 rounded-lg transition transform hover:-translate-y-1 hover:shadow-lg hover:border-black">
            <h3 className="font-semibold text-lg text-gray-900">
              Taxation (Direct & GST)
            </h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Tax planning, filings and GST compliance tailored for corporates and SMEs.
            </p>
          </div>

          <div className="p-6 border border-gray-300 rounded-lg transition transform hover:-translate-y-1 hover:shadow-lg hover:border-black">
            <h3 className="font-semibold text-lg text-gray-900">
              Advisory
            </h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Business structuring and regulatory advisory for growing enterprises.
            </p>
          </div>

        </div>

        <div className="mt-14 text-center">
          <Button
            href={getWhatsAppLink()}
            target="_blank"
          >
            Speak with Our Team
          </Button>
        </div>

      </Container>
    </Section>
  );
}
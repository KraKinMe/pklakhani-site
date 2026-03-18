import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Services",
  description:
    "Audit, GST, taxation and advisory services for corporates and SMEs.",
};

export default function ServicesPage() {
  return (
    <main>

      <Section dark>
        <Container size="sm">
          <h1 className="heading heading-accent text-3xl text-center">
            Our Services
          </h1>
          <p className="mt-4 text-gray-300 text-center">
            Audit, taxation and advisory services for corporates and SMEs.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <h2 className="heading heading-accent text-2xl text-gray-900">
            Audit & Assurance
          </h2>

          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>• Statutory Audits</li>
            <li>• Internal Audits</li>
            <li>• Compliance Reviews</li>
          </ul>
        </Container>
      </Section>

      <Section>
        <div className="bg-gray-50 -my-24 py-24">
          <Container size="sm">
            <h2 className="heading heading-accent text-2xl text-gray-900">
              Taxation (Direct & GST)
            </h2>

            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Income Tax Filing</li>
              <li>• GST Compliance</li>
              <li>• Advisory & Representation</li>
            </ul>
          </Container>
        </div>
      </Section>

      <Section>
        <Container size="sm">
          <h2 className="heading heading-accent text-2xl text-gray-900">
            Advisory
          </h2>

          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>• Business Structuring</li>
            <li>• Financial Advisory</li>
            <li>• Compliance Strategy</li>
          </ul>
        </Container>
      </Section>

      <Section dark>
        <Container size="sm">

          <h2 className="heading heading-accent text-3xl text-center">
            Need Assistance?
          </h2>

          <div className="mt-8 flex justify-center gap-4">
            <Button href="https://wa.me/918802805667" target="_blank">
              WhatsApp
            </Button>

            <Button href="tel:+91981115617" variant="secondary-dark">
              Call
            </Button>
          </div>

        </Container>
      </Section>

    </main>
  );
}
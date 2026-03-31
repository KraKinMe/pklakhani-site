import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";

export const metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at P.K. Lakhani & Co. in audit, taxation and advisory.",
};

export default function CareersPage() {
  const form =
    "https://docs.google.com/forms/d/e/1FAIpQLSdKeW8w7G_LzEqNntfKIYgxs7_PdU8k-REx4NRFGHanFfjO2Q/viewform?usp=publish-editor";

  return (
    <main>

      {/* HERO */}
      <Section dark>
        <div className="text-center">
          <Container size="sm">

            <h1 className="heading heading-accent text-3xl md:text-4xl">
              Careers
            </h1>

            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Join us to Kick Start your Professional Career.
            </p>

          </Container>
        </div>
      </Section>

      {/* VALUE + CTA */}
      <Section>
        <div className="text-center">
          <Container size="sm">

            <p className="text-gray-600 max-w-2xl mx-auto">
              We are always looking for motivated individuals who are eager to learn,
              take responsibility, and grow in a professional environment.
            </p>

            {/* ACTIONS */}
            <div className="mt-10 flex justify-center gap-4 flex-wrap">

              <Button
                href={getWhatsAppLink("Hi, I am interested in career opportunities at P.K. Lakhani & Co.")}
                target="_blank"
              >
                Apply via WhatsApp
              </Button>

              <Button
                href={form}
                variant="secondary"
                target="_blank"
              >
                Apply via Form
              </Button>

            </div>

          </Container>
        </div>
      </Section>

    </main>
  );
}
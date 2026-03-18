import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "About",
  description:
    "Established in 1994, P.K. Lakhani & Co. is a Chartered Accountants firm based in Gurugram.",
};

export default function AboutPage() {
  return (
    <main>

      <Section dark>
        <Container size="sm">
          <h1 className="heading heading-accent text-3xl md:text-4xl text-center">
            About Us
          </h1>
          <p className="mt-4 text-gray-300 text-center">
            Established in 1994, P.K. Lakhani & Co. is a Chartered Accountants firm
            based in Gurugram serving corporates across India.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <h2 className="heading heading-accent text-2xl text-gray-900">
            Our Firm
          </h2>

          <p className="subtext mt-4">
            With over three decades of experience, we provide audit,
            taxation and advisory services to corporates and SMEs.
          </p>

          <p className="subtext mt-4">
            Our work focuses on compliance, accuracy and timely execution
            of financial and regulatory requirements.
          </p>
        </Container>
      </Section>

      <Section>
        <div className="bg-gray-50 -my-24 py-24">
          <Container size="sm">
            <h2 className="heading heading-accent text-2xl text-gray-900">
              Our Approach
            </h2>

            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li>• Compliance-focused execution</li>
              <li>• Timely delivery of assignments</li>
              <li>• Practical business advisory</li>
              <li>• Long-term client relationships</li>
            </ul>
          </Container>
        </div>
      </Section>

      <Section>
        <Container size="sm">
          <p className="text-sm text-gray-500 text-center">
            Member Firm — Institute of Chartered Accountants of India
          </p>
        </Container>
      </Section>

    </main>
  );
}
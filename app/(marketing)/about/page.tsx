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

      {/* HERO */}
      <Section dark>
        <div className="text-center">
          <Container size="sm">
            <h1 className="heading heading-accent text-3xl md:text-4xl">
              About Us
            </h1>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Established in 1994, P.K. Lakhani & Co. is a Chartered Accountants firm
              based in Gurugram, serving corporates and SMEs across India.
            </p>
          </Container>
        </div>
      </Section>

      {/* FIRM */}
      <Section>
        <div className="text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
              Our Firm
            </h2>

            <p className="subtext mt-4 max-w-2xl mx-auto">
              With over three decades of experience, we provide audit, taxation,
              and advisory services to corporates and SMEs.
            </p>

            <p className="subtext mt-4 max-w-2xl mx-auto">
              Our approach focuses on compliance, accuracy, and timely execution
              of financial and regulatory requirements while supporting long-term
              business growth.
            </p>

          </Container>
        </div>
      </Section>

      {/* APPROACH */}
      <Section>
        <div className="bg-gray-50 -my-24 py-24 text-center">
          <Container size="sm">

            <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
              Our Approach
            </h2>

            <div className="mt-10 space-y-6 max-w-3xl mx-auto text-left">

              <p className="text-gray-700">
                <strong>Client-Centric Understanding:</strong> We begin by understanding your business,
                industry, and specific requirements to deliver relevant solutions.
              </p>

              <p className="text-gray-700">
                <strong>Tailored Solutions:</strong> Customized strategies for audit, taxation,
                and compliance aligned with your operational needs.
              </p>

              <p className="text-gray-700">
                <strong>Accuracy & Compliance:</strong> Ensuring adherence to all statutory and
                regulatory requirements with precision.
              </p>

              <p className="text-gray-700">
                <strong>Timely Execution:</strong> Delivering services within defined timelines
                with consistency and reliability.
              </p>

              <p className="text-gray-700">
                <strong>Proactive Advisory:</strong> Identifying risks and opportunities to support
                better financial and strategic decisions.
              </p>

              <p className="text-gray-700">
                <strong>Technology-Driven Processes:</strong> Leveraging modern tools to enhance
                efficiency, reporting, and transparency.
              </p>

              <p className="text-gray-700">
                <strong>Confidentiality & Integrity:</strong> Maintaining the highest standards of
                professionalism, trust, and data security.
              </p>

            </div>

          </Container>
        </div>
      </Section>

      {/* ICAI */}
      <Section>
        <div className="text-center">
          <Container size="sm">

            <p className="text-sm text-gray-500">
              Member Firm — Institute of Chartered Accountants of India
            </p>

          </Container>
        </div>
      </Section>

    </main>
  );
}
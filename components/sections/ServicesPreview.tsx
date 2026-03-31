import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getWhatsAppLink } from "@/utils/whatsapp";

export default function ServicesPreview() {
  return (
    <Section>
      <div className="text-center">
        <Container>

          {/* Heading */}
          <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
            Our Core Services
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Comprehensive audit, taxation, and advisory solutions designed to ensure compliance,
            optimize financial performance, and support business growth.
          </p>

          {/* Cards */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">

            {/* 1 */}
            <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-black">
              <h3 className="font-semibold text-lg text-gray-900">
                Audit & Assurance
              </h3>
              <p className="text-xs font-medium text-gray-500 mt-2 uppercase tracking-wide">
                Statutory • Internal • Financial Reviews
              </p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Ensuring compliance, accuracy, and transparency in financial reporting for businesses of all sizes.
              </p>
            </div>

            {/* 2 */}
            <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-black">
              <h3 className="font-semibold text-lg text-gray-900">
                Income Tax & GST
              </h3>
              <p className="text-xs font-medium text-gray-500 mt-2 uppercase tracking-wide">
                Planning • Filing • Compliance
              </p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                End-to-end tax planning, return filing, and GST compliance to minimize tax exposure and ensure regulatory adherence.
              </p>
            </div>

            {/* 3 */}
            <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-black">
              <h3 className="font-semibold text-lg text-gray-900">
                Business Advisory & Structuring
              </h3>
              <p className="text-xs font-medium text-gray-500 mt-2 uppercase tracking-wide">
                Structuring • Compliance • Strategy
              </p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Supporting businesses with structuring, regulatory compliance, and financial decision-making for scalable growth.
              </p>
            </div>

            {/* 4 */}
            <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-black">
              <h3 className="font-semibold text-lg text-gray-900">
                Outsourced Accounting & Bookkeeping
              </h3>
              <p className="text-xs font-medium text-gray-500 mt-2 uppercase tracking-wide">
                Accounting • Reporting • Bookkeeping
              </p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Maintaining accurate financial records, improving reporting, and enabling informed business decisions.
              </p>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-16">
            <Button
              href={getWhatsAppLink(
                "Hi, I would like to discuss your audit, taxation, or accounting services."
              )}
              target="_blank"
            >
              Talk to a Chartered Accountant
            </Button>
          </div>

        </Container>
      </div>
    </Section>
  );
}
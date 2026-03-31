import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { INDUSTRIES } from "@/config/content";

export default function Industries() {
  return (
    <Section>
      <div className="bg-gray-50 -my-24 py-24 text-center">
        <Container>

          <h2 className="heading heading-accent text-2xl md:text-3xl text-gray-900">
            Industries We Serve
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            We work with businesses across diverse sectors, providing tailored audit,
            taxation, and advisory solutions aligned with industry-specific requirements.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            {INDUSTRIES.map((item) => (
              <span
                key={item}
                className="px-5 py-2.5 text-sm font-medium text-gray-800 
                border border-gray-300 rounded-full 
                bg-white shadow-sm 
                transition hover:border-black hover:shadow-md"
              >
                {item}
              </span>
            ))}

          </div>

        </Container>
      </div>
    </Section>
  );
}
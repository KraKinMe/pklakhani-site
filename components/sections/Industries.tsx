import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { INDUSTRIES, INDUSTRIES_SECTION } from "@/config/content";

export default function Industries() {
  return (
    <Section>
      <div className="-my-24 bg-muted-surface py-24 text-center">
        <Container>
          <h2 className="heading heading-accent text-2xl md:text-3xl">
            {INDUSTRIES_SECTION.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-page-muted md:text-base">
            {INDUSTRIES_SECTION.description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {INDUSTRIES.map((item) => (
              <span
                key={item}
                className="rounded-full border border-card-border bg-card px-5 py-2.5 text-sm font-medium text-page-fg shadow-sm transition hover:border-page-fg hover:shadow-md"
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

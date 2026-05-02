import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { FAQ_HOME, FAQ_SECTION } from "@/config/content";

export default function FAQ() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading heading-accent text-2xl md:text-3xl">
            {FAQ_SECTION.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-page-muted">
            {FAQ_SECTION.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ_HOME.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-card-border bg-card px-4 py-1 text-left shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-3 font-semibold text-page-fg [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1 text-left">{item.question}</span>
                <span
                  aria-hidden
                  className="shrink-0 text-page-muted transition group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>
              <div className="border-t border-card-border pb-4 pt-2 text-sm leading-relaxed text-page-muted">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

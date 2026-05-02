import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import PageHero from "@/components/common/PageHero";
import JsonLd from "@/components/seo/JsonLd";

import { generateMeta } from "@/config/meta";
import { ABOUT, PAGE_HERO } from "@/config/content";
import { getBreadcrumbListJsonLd } from "@/config/schema";

export const metadata = generateMeta("about");

export default function AboutPage() {
  return (
    <div>
      <JsonLd
        data={getBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "About us", path: "/about" },
        ])}
      />
      <PageHero {...PAGE_HERO.about} />

      <Section>
        <div className="text-center">
          <Container size="sm">
            <h2 className="heading heading-accent text-2xl md:text-3xl">
              {ABOUT.firm.title}
            </h2>

            {ABOUT.firm.paragraphs.map((text, i) => (
              <p key={i} className="subtext mx-auto mt-4 max-w-2xl">
                {text}
              </p>
            ))}
          </Container>
        </div>
      </Section>

      <Section>
        <div className="-my-24 bg-muted-surface py-24 text-center">
          <Container size="sm">
            <h2 className="heading heading-accent text-2xl md:text-3xl">
              {ABOUT.approach.title}
            </h2>

            <div className="mx-auto mt-10 max-w-3xl space-y-6 text-left">
              {ABOUT.approach.points.map((p) => (
                <p key={p.lead} className="text-page-fg">
                  <strong>{p.lead}:</strong> {p.body}
                </p>
              ))}
            </div>
          </Container>
        </div>
      </Section>
    </div>
  );
}

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import WhatsAppCTA from "@/components/common/WhatsAppCTA";
import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  service: {
    title: string;
    subtitle: string;
    description: string;
    bullets: string[];
    icon: string;
    highlightPoints: string[];
    cta: {
      label: string;
      message: string;
    };
  };
  Icon: LucideIcon;
  reverse?: boolean;
};

export default function ServiceCard({ service, Icon, reverse }: ServiceCardProps) {
  return (
    <Section>
      <Container>
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* TEXT */}
          <div className={`${reverse ? "md:order-2" : ""} w-full text-left`}>
            <h2 className="service-heading text-3xl md:text-4xl lg:text-5xl">
              {service.title}
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-page-muted md:text-xl">
              {service.description}
            </p>

            <ul className="mt-6 space-y-3 text-lg text-page-fg md:text-xl">
              {service.bullets.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <div className="mt-8">
              <WhatsAppCTA
                message={service.cta.message}
                label={service.cta.label}
                className="inline-flex w-auto px-6 py-3 text-base"
              />
            </div>
          </div>

          {/* ICON BLOCK */}
          <div className={`flex justify-center ${reverse ? "md:order-1" : ""}`}>
            <div className="relative">
              {/* glow */}
              <div className="absolute inset-0 scale-110 rounded-full bg-brand/10 blur-2xl" />

              <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl border border-card-border bg-card shadow-xl">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-brand">
                  <Icon size={48} strokeWidth={1.5} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

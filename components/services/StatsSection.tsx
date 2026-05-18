import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import type { LucideIcon } from "lucide-react";
import { Clock, CheckCircle, Map } from "lucide-react";
import { STATS } from "@/config/content";

const STAT_ICON_MAP: Record<string, LucideIcon> = {
  clock: Clock,
  check: CheckCircle,
  india: Map,
};

export default function StatsSection() {
  return (
    <Section>
      <div className="bg-muted-surface py-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {STATS.map((stat) => {
              const Icon = STAT_ICON_MAP[stat.icon];

              return (
                <div key={stat.label} className="flex items-center gap-6">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand/10 dark:bg-white/10">
                    <Icon size={48} className="text-brand dark:text-brand-accent" />
                  </div>

                  <div>
                    <p className="text-4xl font-bold text-brand dark:text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-page-muted dark:text-zinc-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </Section>
  );
}

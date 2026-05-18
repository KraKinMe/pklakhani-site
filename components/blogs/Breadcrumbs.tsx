import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({
  items,
  variant = "dark",
}: {
  items: BreadcrumbItem[];
  variant?: "dark" | "light";
}) {
  const textMuted =
    variant === "dark" ? "text-white/80" : "text-gray-500 dark:text-gray-400";
  const textActive =
    variant === "dark" ? "text-white font-medium" : "text-gray-900 dark:text-white font-medium";
  const textHover =
    variant === "dark" ? "hover:text-white" : "hover:text-blue-600 dark:hover:text-blue-400";
  const chevron =
    variant === "dark" ? "text-white/50" : "text-gray-400";

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-1 text-sm ${textMuted}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight size={14} className={`${chevron} shrink-0`} aria-hidden />
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className={`${textHover} transition-colors`}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? textActive : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

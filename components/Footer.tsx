import Link from "next/link";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/common/CTAButton";

import { SITE } from "@/config/site";
import { NAVIGATION } from "@/config/navigation";
import { CTA } from "@/config/cta";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-footer-border bg-footer-bg text-footer-fg">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {SITE.brand.prefix}{" "}
              <span className="text-[var(--brand-accent)]">
                {SITE.brand.highlight}
              </span>{" "}
              {SITE.brand.suffix}
            </h3>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-footer-muted">
              {SITE.footer.description}
            </p>

            <p className="mt-4 text-xs text-footer-muted">
              {SITE.footer.established}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-footer-muted">
              Navigation
            </h4>

            <ul className="space-y-2 text-sm">
              {NAVIGATION.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-footer-muted transition hover:text-footer-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-footer-muted">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-footer-muted">
              <p className="leading-relaxed">{SITE.address.line}</p>

              <CTAButton
                type="call"
                label={SITE.contact.phone}
                phone={SITE.contact.phone}
                className="block text-footer-muted transition hover:text-footer-fg"
              />

              <CTAButton
                type="email"
                label={SITE.contact.email}
                email={SITE.contact.email}
                className="block text-footer-muted transition hover:text-footer-fg"
              />
            </div>

            <div className="mt-5">
              <CTAButton
                type="whatsapp"
                label="Chat on WhatsApp"
                message={CTA.general.message}
                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-xs text-white transition hover:bg-green-700"
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-footer-border px-6 py-5 text-center text-xs text-footer-muted">
        {SITE.footer.bottomText}
      </div>

      <div className="pb-5 text-center text-xs text-footer-muted/80">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}

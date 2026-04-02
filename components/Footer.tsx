import Link from "next/link";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/common/CTAButton";

import { SITE } from "@/config/site";
import { NAVIGATION } from "@/config/navigation";
import { CTA } from "@/config/cta";

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white mt-24">
      <Container>
        <div className="py-14 grid gap-10 md:grid-cols-3">

          {/* Firm */}
          <div>
            <h3 className="font-semibold tracking-tight text-xl">
              {SITE.brand.prefix}{" "}
              <span className="text-[#C9A14A]">
                {SITE.brand.highlight}
              </span>{" "}
              {SITE.brand.suffix}
            </h3>

            <p className="text-sm text-gray-300 mt-4 leading-relaxed max-w-xs">
              {SITE.footer.description}
            </p>

            <p className="text-xs text-gray-400 mt-4">
              {SITE.footer.established}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wide text-gray-400 mb-4">
              Navigation
            </h4>

            <ul className="space-y-2 text-sm">
              {NAVIGATION.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wide text-gray-400 mb-4">
              Contact
            </h4>

            <div className="text-sm text-gray-300 space-y-3">

              <p className="leading-relaxed">
                {SITE.address.line}
              </p>

              <CTAButton
                type="call"
                label={SITE.contact.phone}
                phone={SITE.contact.phone}
                className="block hover:text-white"
              />

              <CTAButton
                type="email"
                label={SITE.contact.email}
                email={SITE.contact.email}
                className="block hover:text-white"
              />

            </div>

            {/* WhatsApp CTA (small + clean) */}
            <div className="mt-5">
              <CTAButton
                type="whatsapp"
                label="Chat on WhatsApp"
                message={CTA.general.message}
                className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition"
              />
            </div>
          </div>

        </div>
      </Container>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center text-xs text-gray-400 py-5 px-6">
        {SITE.footer.bottomText}
      </div>

      <div className="text-center text-xs text-gray-500 pb-5">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
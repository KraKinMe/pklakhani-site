"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/ui/Container";
import { getWhatsAppLink } from "@/utils/whatsapp";
import { SITE } from "@/config/site";
import { MESSAGES } from "@/config/messages";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-[#0B1F3A] text-white sticky top-0 z-50 border-b border-white/10">
      <Container>
        <div className="h-16 flex items-center justify-between">

          {/* Brand */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-semibold tracking-tight text-base">
              {SITE.name.split(" ")[0]}{" "}
              <span className="text-[#C9A14A]">& Co.</span>
            </span>
            <span className="text-xs text-gray-300">
              Chartered Accountants • Since 1994
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition ${
                    isActive
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">

            {/* Call */}
            <a
              href={`tel:${SITE.contact.phone}`}
              className="hidden sm:inline text-sm text-gray-300 hover:text-white"
            >
              Call
            </a>

            {/* WhatsApp */}
            <a
              href={getWhatsAppLink(MESSAGES.general)}
              target="_blank"
              className="bg-green-600 text-white text-sm px-4 py-2 rounded-md"
            >
              WhatsApp
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0B1F3A] border-t border-white/10">
          <div className="px-6 py-4 space-y-4 text-sm">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-gray-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-white/10 pt-4 space-y-3">

              <a
                href={`tel:${SITE.contact.phone}`}
                className="block text-gray-300"
              >
                Call
              </a>

              <a
                href={`mailto:${SITE.contact.email}`}
                className="block text-gray-300"
              >
                Email
              </a>

            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
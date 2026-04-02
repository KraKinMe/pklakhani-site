"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import Container from "@/components/ui/Container";
import CTAButton from "@/components/common/CTAButton";

import { SITE } from "@/config/site";
import { NAVIGATION } from "@/config/navigation";
import { CTA } from "@/config/cta";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // ✅ SCROLL LOCK + NO LAYOUT SHIFT
  useEffect(() => {
    if (open) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [open]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#0B1F3A] border-b border-white/10">
        <Container>
          <div className="h-20 flex items-center justify-between">

            {/* BRAND */}
            <Link href="/" className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight text-xl md:text-2xl lg:text-3xl text-white">
                {SITE.brand.prefix}{" "}
                <span className="text-[#C9A14A]">
                  {SITE.brand.highlight}
                </span>{" "}
                {SITE.brand.suffix}
              </span>
              <span className="text-xs text-gray-300 -mt-1">
                Chartered Accountants • Since 1994
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              {NAVIGATION.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative pb-1 transition ${
                      isActive
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}

                    <span
                      className={`absolute left-0 bottom-0 h-[2px] bg-[#C9A14A] transition-all ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-3">
                <CTAButton
                  type="call"
                  label="Call"
                  phone={SITE.contact.phone}
                  className="text-sm text-gray-300 hover:text-white"
                />

                <CTAButton
                  type="whatsapp"
                  label="Chat"
                  message={CTA.general.message}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
                />
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 rounded-md hover:bg-white/10 transition text-white"
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>

            </div>
          </div>
        </Container>
      </nav>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0B1F3A] shadow-2xl border-l border-white/10 z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-8">

          {/* Close */}
          <div className="flex justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-white p-2 rounded-md hover:bg-white/10 transition"
            >
              <X size={26} />
            </button>
          </div>

          {/* Links */}
          <div className="space-y-5 text-base">
            {NAVIGATION.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-gray-300 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="border-t border-white/10 pt-6 space-y-4">

            <CTAButton
              type="call"
              label="Call"
              phone={SITE.contact.phone}
              className="block text-white font-medium"
            />

            <CTAButton
              type="email"
              label="Email"
              email={SITE.contact.email}
              className="block text-white font-medium"
            />

            <CTAButton
              type="whatsapp"
              label="Chat"
              message={CTA.general.message}
              className="block bg-green-600 text-white px-4 py-2 rounded-md text-center hover:bg-green-700 transition"
            />

          </div>

        </div>
      </div>
    </>
  );
}
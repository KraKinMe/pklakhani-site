"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import Container from "@/components/ui/Container";
import CTAButton from "@/components/common/CTAButton";
import ThemeToggle from "@/components/ThemeToggle";

import { SITE } from "@/config/site";
import { NAVIGATION } from "@/config/navigation";
import { CTA } from "@/config/cta";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-[200] -translate-y-[150%] rounded-md border border-nav-border bg-nav-bg px-4 py-2 text-sm font-medium text-nav-fg shadow-lg transition-transform duration-200 focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--brand-accent)]"
      >
        Skip to main content
      </a>
      <nav className="sticky top-0 z-50 border-b border-nav-border bg-nav-bg">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex flex-col leading-tight">
              <span className="text-xl font-semibold tracking-tight text-nav-fg md:text-2xl lg:text-3xl">
                {SITE.brand.prefix}{" "}
                <span className="text-[var(--brand-accent)]">
                  {SITE.brand.highlight}
                </span>{" "}
                {SITE.brand.suffix}
              </span>
              <span className="-mt-1 text-xs text-nav-muted">
                {SITE.taglineNav}
              </span>
            </Link>

            <div className="hidden items-center gap-6 text-sm md:flex">
              {NAVIGATION.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative pb-1 transition ${
                      isActive
                        ? "text-nav-fg"
                        : "text-nav-muted hover:text-nav-fg"
                    }`}
                  >
                    {link.label}

                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[var(--brand-accent)] transition-all ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <ThemeToggle />

              <div className="hidden items-center gap-3 md:flex">
                <CTAButton
                  type="call"
                  label="Call"
                  phone={SITE.contact.phone}
                  className="text-sm text-nav-muted transition hover:text-nav-fg"
                />

                <CTAButton
                  type="whatsapp"
                  label="Chat"
                  message={CTA.general.message}
                  className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="rounded-md p-2 text-nav-fg transition hover:bg-nav-hover md:hidden"
                aria-label="Toggle mobile menu"
                aria-expanded={open}
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm transform border-l border-nav-border bg-nav-bg shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="space-y-8 p-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-nav-fg transition hover:bg-nav-hover"
              aria-label="Close mobile menu"
            >
              <X size={26} />
            </button>
          </div>

          <div className="space-y-5 text-base">
            {NAVIGATION.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-nav-muted transition hover:text-nav-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-4 border-t border-nav-border pt-6">
            <CTAButton
              type="call"
              label="Call"
              phone={SITE.contact.phone}
              className="block font-medium text-nav-fg"
            />

            <CTAButton
              type="email"
              label="Email"
              email={SITE.contact.email}
              className="block font-medium text-nav-fg"
            />

            <CTAButton
              type="whatsapp"
              label="Chat"
              message={CTA.general.message}
              className="block rounded-md bg-green-600 px-4 py-2 text-center text-white transition hover:bg-green-700"
            />
          </div>
        </div>
      </div>
    </>
  );
}

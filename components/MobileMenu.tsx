import Link from "next/link";
import { X } from "lucide-react";
import CTAButton from "@/components/common/CTAButton";
import { SITE } from "@/config/site";
import { NAVIGATION } from "@/config/navigation";
import { CTA } from "@/config/cta";

export type MobileMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  return (
    <>
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

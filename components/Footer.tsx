import Link from "next/link";
import Container from "@/components/ui/Container";
import { getWhatsAppLink } from "@/utils/whatsapp";
import { SITE } from "@/config/site";
import { MESSAGES } from "@/config/messages";

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white mt-24">
      
      <Container>
        <div className="py-16 grid gap-12 md:grid-cols-3">
          
          {/* Firm */}
          <div>
            <h3 className="font-semibold tracking-tight text-lg">
              P.K.{" "}
              <span className="text-[#C9A14A]">Lakhani</span>{" "}
              & Co.
            </h3>

            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              Chartered Accountants based in Gurugram assisting SMEs and corporates 
              in audit, taxation, and regulatory compliances.
            </p>

            <p className="text-sm text-gray-400 mt-4">
              Established in 1994
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-4">
              Navigation
            </h4>

            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-4">
              Contact
            </h4>

            <div className="text-sm text-gray-400 space-y-3">
              
              <p>
                {SITE.address.line}
              </p>

              <a
                href={`tel:${SITE.contact.phone}`}
                className="block hover:text-white"
              >
                {SITE.contact.phone}
              </a>

              <a
                href={`mailto:${SITE.contact.email}`}
                className="block hover:text-white"
              >
                {SITE.contact.email}
              </a>

            </div>

            <a
              href={getWhatsAppLink(MESSAGES.general)}
              target="_blank"
              className="inline-block mt-5 bg-green-600 text-white text-sm px-5 py-2.5 rounded-md hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>
          </div>

        </div>
      </Container>

      {/* ICAI */}
      <div className="border-t border-white/10 text-center text-xs text-gray-400 py-6 px-6">
        Registered Chartered Accountants — Institute of Chartered Accountants of India
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/common/WhatsAppCTA";

import { SITE } from "@/config/site";
import { CTA } from "@/config/cta";

/* =========================
   Fonts
========================= */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================
   Metadata (SEO)
========================= */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),

  title: {
    default: `${SITE.name} | Chartered Accountants`,
    template: `%s | ${SITE.name}`,
  },

  description:
    "Chartered Accountants firm in Gurugram providing audit, taxation, GST and advisory services.",

  keywords: [
    "Chartered Accountant Gurugram",
    "CA Firm India",
    "Audit Services",
    "GST Compliance",
    "Tax Consultant",
  ],

  openGraph: {
    title: SITE.name,
    description:
      "Audit, taxation and advisory services for corporates and SMEs.",
    url: SITE.baseUrl,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE.baseUrl}/images/hero_ca.png`,
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description:
      "Audit, taxation and advisory services for corporates and SMEs.",
    images: [`${SITE.baseUrl}/images/hero_ca.png`],
  },

  alternates: {
    canonical: SITE.baseUrl,
  },
};

/* =========================
   Layout
========================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: SITE.name,
    url: SITE.baseUrl,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    foundingDate: "1994",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line,
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    areaServed: "India",
    memberOf: {
      "@type": "Organization",
      name: "Institute of Chartered Accountants of India",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Navbar />
        {children}
        <Footer />

        {/* Floating WhatsApp CTA */}
        <WhatsAppCTA 
          {...CTA.general} 
          label="Chat with Us"
          variant="floating" 
        />
      </body>
    </html>
  );
}
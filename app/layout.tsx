import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

import { SITE } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description:
      "Audit, taxation and advisory services for corporates and SMEs.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Structured Data (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />

        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
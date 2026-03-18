import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://pklakhani.com"),
  title: {
    default: "P.K. Lakhani & Co. | Chartered Accountants",
    template: "%s | P.K. Lakhani & Co.",
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
    title: "P.K. Lakhani & Co.",
    description:
      "Audit, taxation and advisory services for corporates and SMEs.",
    url: "https://pklakhani.com",
    siteName: "P.K. Lakhani & Co.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AccountingService",
              name: "P.K. Lakhani & Co.",
              url: "https://pklakhani.com",
              telephone: "+91-9811115617",
              email: "pradeep.lakhani@gmail.com",
              foundingDate: "1994",
              address: {
                "@type": "PostalAddress",
                streetAddress: "302, JMD Galleria, Sohna Road, Sector 48",
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

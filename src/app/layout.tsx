import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FDFDFC",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://doorstepltdbd.com"),
  title: {
    default: "Doorstep Limited - Marketing & Branding Agency Dhaka",
    template: "%s | Doorstep Limited",
  },
  description:
    "Doorstep Limited is a full-service marketing and branding agency in Dhaka, Bangladesh. We build identities, run campaigns, and make the content that carries a brand from idea to shelf.",
  keywords: [
    "Doorstep Limited",
    "Branding Agency Dhaka",
    "Digital Marketing Bangladesh",
    "Creative Agency Dhaka",
    "Packaging Design Bangladesh",
    "Social Media Marketing",
    "Marketing Strategy Dhaka",
    "Video Production Bangladesh",
  ],
  authors: [{ name: "Doorstep Limited", url: "https://doorstepltdbd.com" }],
  creator: "Doorstep Limited",
  publisher: "Doorstep Limited",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://doorstepltdbd.com",
    siteName: "Doorstep Limited",
    title: "Doorstep Limited - Marketing & Branding Agency Dhaka",
    description:
      "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh.",
    images: [
      {
        url: "/logo/80X80 px-01.png",
        width: 800,
        height: 800,
        alt: "Doorstep Limited Agency Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doorstep Limited - Marketing & Branding Agency Dhaka",
    description:
      "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh.",
    images: ["/logo/80X80 px-01.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo/32X32px-01.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/80X80 px-01.png", sizes: "80x80", type: "image/png" },
    ],
    apple: [
      { url: "/logo/80X80 px-01.png", sizes: "80x80", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Doorstep Limited",
  image: "https://doorstepltdbd.com/logo/80X80%20px-01.png",
  url: "https://doorstepltdbd.com",
  telephone: "+8801785031126",
  email: "doorstepltdofficial@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "House 60, Road Dolphin Goli, Kolabagan",
    addressLocality: "Dhaka",
    postalCode: "1205",
    addressCountry: "BD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "23.7508",
    longitude: "90.3843",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
    ],
    opens: "10:00",
    closes: "19:00",
  },
  sameAs: [
    "https://www.facebook.com/doorstepltdbd",
    "https://www.instagram.com/doorstepltdbd",
    "https://www.linkedin.com/company/doorstepltdbd/",
  ],
};

import QueryProvider from "@/providers/QueryProvider";
import SiteShell from "@/components/SiteShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} light`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFDFC] text-[#12151B] antialiased selection:bg-[#2954F5]/10 selection:text-[#2954F5]">
        <QueryProvider>
          <AnalyticsTracker />
          <SiteShell>{children}</SiteShell>
        </QueryProvider>
      </body>
    </html>
  );
}

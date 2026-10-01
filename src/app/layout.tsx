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
  title: "Doorstep Limited - Marketing & Branding Agency Dhaka",
  description:
    "Doorstep Limited is a full-service marketing and branding agency in Dhaka, Bangladesh. We build identities, run campaigns, and make the content that carries a brand from idea to shelf.",
  keywords: [
    "Doorstep Limited",
    "Branding Agency Dhaka",
    "Digital Marketing Bangladesh",
    "Creative Agency",
    "Packaging Design",
    "Social Media Marketing",
  ],
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

import QueryProvider from "@/providers/QueryProvider";
import SiteShell from "@/components/SiteShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} light`}>
      <body className="min-h-screen flex flex-col bg-[#FDFDFC] text-[#12151B] antialiased selection:bg-[#2954F5]/10 selection:text-[#2954F5]">
        <QueryProvider>
          <SiteShell>{children}</SiteShell>
        </QueryProvider>
      </body>
    </html>
  );
}

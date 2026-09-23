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
  title: "Doorstep Limited — Marketing & Branding Agency Dhaka",
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
  authors: [{ name: "Doorstep Limited" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} light`}>
      <body className="min-h-screen flex flex-col bg-[#FDFDFC] text-[#12151B] antialiased selection:bg-[#2954F5]/10 selection:text-[#2954F5]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

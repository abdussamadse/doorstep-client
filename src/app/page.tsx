import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { API_BASE_URL } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  let seoData = {
    metaTitle: "Doorstep Limited - Marketing & Branding Agency Dhaka",
    metaDescription:
      "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh.",
    keywords: "branding, digital marketing, creative agency, packaging design, Dhaka, Bangladesh",
    canonicalUrl: "https://doorstepltdbd.com/",
    ogImage: "",
    noIndex: false,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data?.seo) {
        seoData = { ...seoData, ...json.data.seo };
      }
    }
  } catch (err) {
    // Graceful fallback to default seoData
  }

  const canonical = seoData.canonicalUrl?.trim() || "https://doorstepltdbd.com/";
  const title = seoData.metaTitle || "Doorstep Limited - Marketing & Branding Agency Dhaka";
  const description =
    seoData.metaDescription ||
    "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh.";
  const keywordsList = seoData.keywords
    ? seoData.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : ["branding", "digital marketing", "creative agency"];

  const ogImages = seoData.ogImage
    ? [{ url: seoData.ogImage, width: 1200, height: 630, alt: title }]
    : [{ url: "/logo/80X80 px-01.png", width: 800, height: 800, alt: title }];

  return {
    title,
    description,
    keywords: keywordsList,
    metadataBase: new URL(canonical),
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: "Doorstep Limited",
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoData.ogImage || "/logo/80X80 px-01.png"],
    },
    robots: seoData.noIndex
      ? { index: false, follow: false }
      : {
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
  };
}

export default function HomePage() {
  return <HomeClient />;
}

import React from "react";
import Link from "next/link";
import PortfolioClient from "./PortfolioClient";
import { ArrowRight, Quote } from "lucide-react";

export const metadata = {
  title: "Portfolio — Doorstep Limited | Case Studies & Selected Work",
  description:
    "Explore case studies in branding, packaging, digital marketing, and creative production from Doorstep Limited, Dhaka.",
};

const testimonials = [
  {
    quote:
      "Doorstep Limited transformed Caffeine Coffee’s digital presence completely. Their content calendar is relentless, their reels look international, and our weekly footfall reflects the buzz.",
    author: "Founder & Lead Roaster",
    company: "Caffeine Coffee Dhaka",
  },
  {
    quote:
      "From naming advice to interior signage and launch branding, Doorstep operated like an extension of our in-house team. Highly recommended for any serious retail venture in Bangladesh.",
    author: "Managing Partner",
    company: "Chefs Canvas Food Court",
  },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      {/* ========================================================
          1. PAGE HERO (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="bg-[#F2F4F8] border-b border-[#E3E5EC] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#12151B] max-w-3xl leading-[1.1]">
            Work crafted with intent, proven by numbers.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#5B5F6B] max-w-2xl leading-relaxed font-normal">
            A selection of recent brand identity, packaging, content, and growth marketing retainers executed for clients in food, beverage, agri-commerce, and lifestyle retail.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. PORTFOLIO CLIENT GRID WITH FILTERS & MODAL
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioClient />
      </section>

      {/* ========================================================
          3. CLIENT TESTIMONIALS (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F5F8] border border-[#E3E5EC] rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="max-w-xl mb-12">
            <h2 className="text-3xl font-bold text-[#12151B] tracking-tight">
              Words From Our Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E3E5EC] flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-[#2954F5]/30" />
                  <p className="text-base text-[#12151B] leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F4F5F8]">
                  <h4 className="font-bold text-sm text-[#12151B]">{t.company}</h4>
                  <p className="text-xs text-[#5B5F6B] mt-0.5">{t.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. INQUIRY CTA (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12151B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to bring your brand vision to life?
          </h2>
          <p className="text-gray-300 text-base max-w-xl mx-auto leading-relaxed font-normal">
            Let’s discuss your upcoming brand launch, campaign, or packaging brief over coffee at our Kolabagan studio.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2954F5] text-white font-medium hover:bg-[#1B3BC9] transition-all transform hover:-translate-y-0.5"
            >
              <span>Start Your Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

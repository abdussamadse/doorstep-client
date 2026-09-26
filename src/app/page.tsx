import React from "react";
import Link from "next/link";
import {
  AGENCY_SERVICES,
  WORK_STEPS,
} from "@/data/agencyData";
import ClientLogosGrid from "@/components/ClientLogos";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Target,
  Palette,
  Rocket,
} from "lucide-react";

export const metadata = {
  title: "Doorstep Limited — Marketing & Branding Agency Dhaka",
  description:
    "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh.",
};

const workStepConfig = [
  {
    icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" />,
    bgClass: "bg-[#2954F5]/10 text-[#2954F5] border-[#2954F5]/25",
    hoverBorder: "hover:border-[#2954F5]",
    textHover: "group-hover:text-[#2954F5]",
    taglineClass: "text-[#2954F5]",
  },
  {
    icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
    bgClass: "bg-[#E51F25]/10 text-[#E51F25] border-[#E51F25]/25",
    hoverBorder: "hover:border-[#E51F25]",
    textHover: "group-hover:text-[#E51F25]",
    taglineClass: "text-[#E51F25]",
  },
  {
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
    bgClass: "bg-[#2954F5]/10 text-[#2954F5] border-[#2954F5]/25",
    hoverBorder: "hover:border-[#2954F5]",
    textHover: "group-hover:text-[#2954F5]",
    taglineClass: "text-[#2954F5]",
  },
  {
    icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
    bgClass: "bg-[#E51F25]/10 text-[#E51F25] border-[#E51F25]/25",
    hoverBorder: "hover:border-[#E51F25]",
    textHover: "group-hover:text-[#E51F25]",
    taglineClass: "text-[#E51F25]",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-16 md:space-y-20 pb-16 sm:pb-20">
      {/* ========================================================
          1. CINEMATIC VIDEO BANNER (COMPACT & MINIMAL)
      ======================================================== */}
      <section className="relative w-full h-[26vh] sm:h-[36vh] md:h-[48vh] min-h-[190px] sm:min-h-[260px] max-h-[480px] flex items-center justify-center overflow-hidden border-b border-[#E3E5EC] bg-[#12151B]">
        {/* Full-Bleed Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic dark tint for clean contrast */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />

        {/* Minimal Centered Heading */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white space-y-1 sm:space-y-1.5">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm font-display leading-tight">
            Branding &amp; Marketing That Drives Results
          </h1>
          <p className="text-[11px] sm:text-sm md:text-base text-gray-200 font-normal tracking-wide">
            For Brands and Businesses Across Bangladesh &amp; Beyond
          </p>
        </div>
      </section>

      {/* ========================================================
          2. EDITORIAL MANIFESTO (COMPACT PADDING & MARGIN)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#12151B] tracking-tight leading-snug">
            We create brand experiences that inspire behavior.{" "}
            <span className="block mt-0.5">
              Spinning incredible stories – from emerging startups to household names.
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#5B5F6B] leading-relaxed max-w-3xl font-normal">
            Through new ways of reaching your audience, and by being an integral part of the process all the way from concept to consumer, we help transform your brand presence. We are a full-service marketing and branding agency helping brands and organizations break barriers, pushing your identity forward into the future.
          </p>
        </div>
      </section>

      <div>
        {/* ========================================================
          3. HOW WE WORK (FULL-WIDTH BACKGROUND, ZERO GAP AFTER SERVICES)
      ======================================================== */}
        <section id="how-we-work" className="relative w-full bg-[#F4F5F8] border-b border-[#E3E5EC] py-12 sm:py-16 md:py-20 !mt-0 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 pb-4 sm:pb-8 border-b border-[#E3E5EC]">
              <div>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#12151B] tracking-tight">
                  How We Work
                </h2>
                <p className="mt-1 text-xs sm:text-base text-[#5B5F6B] max-w-xl">
                  Small enough to stay close to every brief, structured enough to execute it end to end.
                </p>
              </div>
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#2954F5] text-white text-xs sm:text-sm font-semibold hover:bg-[#1B3BC9] transition-all transform hover:-translate-y-0.5 shadow-sm self-start md:self-auto"
              >
                <span>Explore Full Methodology</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 mt-5 sm:mt-10">
              {WORK_STEPS.map((step, idx) => {
                const config = workStepConfig[idx] || workStepConfig[0];
                return (
                  <div
                    key={step.step}
                    className={`bg-white p-4 sm:p-7 rounded-xl sm:rounded-2xl border border-[#E3E5EC] flex flex-col items-center justify-between text-center ${config.hoverBorder} hover:shadow-lg transition-all duration-300 group`}
                  >
                    <div className="w-full flex flex-col items-center">
                      {/* Centered Icon with Branding Colors */}
                      <div className="mb-2.5 sm:mb-4 flex items-center justify-center">
                        <div
                          className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border ${config.bgClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs`}
                        >
                          {config.icon}
                        </div>
                      </div>

                      <h3 className={`text-xs sm:text-lg font-bold text-[#12151B] mb-1 sm:mb-2 ${config.textHover} transition-colors tracking-tight`}>
                        {step.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-[#5B5F6B] leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {step.desc}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-[#F4F5F8] w-full">
                      <span className={`text-[9px] sm:text-xs font-semibold ${config.taglineClass} truncate block`}>
                        {step.tagline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
          4. OUR SERVICES (BRAND BLUE BACKGROUND & IMAGE CARDS)
      ======================================================== */}
        <section id="services" className="relative w-full bg-[#1E42D0] py-12 sm:py-16 md:py-20 overflow-hidden scroll-mt-20">
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-black/25 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 pb-3 sm:pb-5 border-b border-white/20">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Our Services
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-blue-100">
                  Five specialized disciplines purpose-built for market impact and revenue growth.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#E51F25] text-white hover:bg-[#C9181E] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-red-500/25 self-start sm:self-auto hover:-translate-y-0.5"
              >
                <span>Request a Custom Quote</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </Link>
            </div>

            {/* Symmetrical Layout - 2 per row on mobile, 3 per row on desktop */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 md:gap-5 mt-5 sm:mt-8">
              {AGENCY_SERVICES.map((service) => {
                return (
                  <Link
                    key={service.id}
                    href={`/contact?service=${service.id}`}
                    className="w-[calc((100%-0.625rem)/2)] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] bg-[#111420] rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/35 overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 group shrink-0"
                  >
                    {/* Top: Image */}
                    <div className="w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black/40 relative">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Bottom: Title & Subtitle only */}
                    <div className="p-3 sm:p-4 md:p-5 text-center flex flex-col justify-center grow">
                      <h3 className="text-white font-bold text-xs sm:text-base md:text-lg tracking-tight group-hover:text-blue-200 transition-colors truncate">
                        {service.name}
                      </h3>
                      <p className="text-[9px] sm:text-[11px] md:text-xs font-semibold text-blue-200/80 uppercase tracking-wider mt-1 truncate">
                        {service.shortDesc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>



        {/* ========================================================
          5. BRANDS WE WORK WITH (PREMIUM EDITORIAL SHOWCASE)
      ======================================================== */}
        <section className="relative w-full bg-[#FAFAFC] border-b border-[#E3E5EC] py-12 sm:py-16 md:py-20 overflow-hidden">
          {/* Subtle Ambient Brand Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2954F5]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E51F25]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 pb-3 sm:pb-5 border-b border-[#E3E5EC] mb-6 sm:mb-10">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#12151B] tracking-tight">
                  Brands We Work With
                </h2>
              </div>
              <p className="text-[11px] sm:text-sm text-[#5B5F6B]">
                Trusted by Bangladesh&apos;s premier hospitality destinations, culinary icons &amp; enterprises
              </p>
            </div>
            <ClientLogosGrid />
          </div>
        </section>
      </div>

      {/* ========================================================
          6. INQUIRY CALL-TO-ACTION (BRAND BLUE)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E42D0] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-2xl border border-blue-400/30">
          {/* Subtle Ambient Brand Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-6">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-snug text-white font-display">
              Ready to take your brand from idea to shelf?
            </h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-normal">
              Whether you need a complete corporate rebranding, high-conversion paid media, or tactile retail packaging, our senior team in Dhaka is ready.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 rounded-full bg-[#E51F25] text-white font-bold text-xs sm:text-base hover:bg-[#C9181E] transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-red-500/25"
              >
                <span>Get in Touch With Us</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </Link>
              <a
                href="tel:+8801785031126"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-4 rounded-full border border-white/40 text-white font-medium text-xs sm:text-base hover:bg-white/15 transition-colors backdrop-blur-xs"
              >
                <span>+880 1785-031126</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

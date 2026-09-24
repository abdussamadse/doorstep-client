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
  Megaphone,
  PenTool,
  Film,
  Package,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "Doorstep Limited — Marketing & Branding Agency Dhaka",
  description:
    "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh.",
};

const serviceIconMap: Record<string, React.ReactNode> = {
  digital: <Megaphone className="w-4 h-4 text-[#2954F5] group-hover:text-white transition-colors" />,
  branding: <PenTool className="w-4 h-4 text-[#E51F25] group-hover:text-white transition-colors" />,
  creative: <Film className="w-4 h-4 text-[#2954F5] group-hover:text-white transition-colors" />,
  packaging: <Package className="w-4 h-4 text-[#E51F25] group-hover:text-white transition-colors" />,
  strategy: <Compass className="w-4 h-4 text-[#2954F5] group-hover:text-white transition-colors" />,
};

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

      {/* ========================================================
          3. OUR SERVICES (SINGLE-LINE SLEEK ROWS - LOW HEIGHT)
      ======================================================== */}
      <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-3 pb-2.5 sm:pb-3 border-b border-[#12151B]">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#12151B] tracking-tight">
              Our Services
            </h2>
            <p className="mt-0.5 text-[11px] sm:text-xs md:text-sm text-[#5B5F6B]">
              Five specialized disciplines purpose-built for market impact and revenue growth.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#12151B] hover:text-[#2954F5] transition-colors self-start sm:self-auto"
          >
            <span>Request a Custom Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#2954F5]" />
          </Link>
        </div>

        {/* Single-Line Row List */}
        <div className="divide-y divide-[#E3E5EC] border-b border-[#E3E5EC]">
          {AGENCY_SERVICES.map((service, index) => (
            <Link
              key={service.id}
              href={`/contact?service=${service.id}`}
              className="group py-3 sm:py-4 flex items-center justify-between gap-2.5 sm:gap-6 hover:bg-[#F8F9FB] px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl transition-all duration-150"
            >
              {/* Left: Number, Icon & Service Name + Subtitle (compact row) */}
              <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#5B5F6B] group-hover:text-[#2954F5] transition-colors w-5 sm:w-7 shrink-0">
                  0{index + 1}.
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F4F5F8] border border-[#E3E5EC] flex items-center justify-center shrink-0 group-hover:bg-[#12151B] group-hover:border-[#12151B] transition-all duration-200">
                  {serviceIconMap[service.id]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                    <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#12151B] group-hover:text-[#2954F5] transition-colors tracking-tight truncate">
                      {service.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-[#5B5F6B] font-normal truncate mt-0.5 md:mt-0">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Action Arrow */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-[#5B5F6B] group-hover:text-[#12151B] transition-colors hidden lg:inline">
                  Inquire
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-[#E3E5EC] flex items-center justify-center group-hover:bg-[#2954F5] group-hover:border-[#2954F5] transition-all">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#12151B] group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. HOW WE WORK (COMPACT MOBILE 2x2 GRID)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F5F8] border border-[#E3E5EC] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-14">
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
              className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#12151B] text-white text-xs sm:text-sm font-semibold hover:bg-[#2954F5] transition-colors self-start md:self-auto"
            >
              <span>Explore Full Methodology</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 mt-4 sm:mt-10">
            {WORK_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white p-3.5 sm:p-7 rounded-xl sm:rounded-2xl border border-[#E3E5EC] flex flex-col justify-between hover:border-[#12151B] hover:shadow-md transition-all"
              >
                <div>
                  <span className="font-mono text-base sm:text-3xl font-bold text-[#12151B] block mb-1 sm:mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-xs sm:text-xl font-bold text-[#12151B] mb-1 sm:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#5B5F6B] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-[#F4F5F8]">
                  <span className="text-[9px] sm:text-xs font-semibold text-[#2954F5] truncate block">
                    {step.tagline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. BRANDS WE WORK WITH (STATIC 2-ROW GRID)
      ======================================================== */}
      <section className="space-y-4 sm:space-y-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 pb-2.5 sm:pb-3 border-b border-[#E3E5EC]">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#12151B] tracking-tight">
                Brands We Work With
              </h2>
            </div>
            <p className="text-[11px] sm:text-sm text-[#5B5F6B]">
              National &amp; regional enterprises across Bangladesh
            </p>
          </div>
        </div>

        <ClientLogosGrid />
      </section>

      {/* ========================================================
          6. INQUIRY CALL-TO-ACTION (COMPACT & CRISP)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12151B] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-6">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-snug">
              Ready to take your brand from idea to shelf?
            </h2>
            <p className="text-gray-300 text-xs sm:text-base leading-relaxed font-normal">
              Whether you need a complete corporate rebranding, high-conversion paid media, or tactile retail packaging, our senior team in Dhaka is ready.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 rounded-full bg-[#2954F5] text-white font-medium text-xs sm:text-base hover:bg-[#1B3BC9] transition-all transform hover:-translate-y-0.5"
              >
                <span>Get in Touch With Us</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <a
                href="tel:+8801785031126"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-4 rounded-full border border-gray-700 text-white font-medium text-xs sm:text-base hover:bg-white/10 transition-colors"
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

import React from "react";
import Link from "next/link";
import {
  AGENCY_SERVICES,
  WORK_STEPS,
  AGENCY_STATS,
} from "@/data/agencyData";
import ClientLogosMarquee from "@/components/ClientLogos";
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Sparkles,
  Palette,
  Box,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "Doorstep Limited — Marketing & Branding Agency Dhaka",
  description:
    "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh.",
};

const serviceIconMap: Record<string, React.ReactNode> = {
  digital: <Globe className="w-6 h-6 text-[#2954F5]" />,
  branding: <Sparkles className="w-6 h-6 text-[#E51F25]" />,
  creative: <Palette className="w-6 h-6 text-[#2954F5]" />,
  packaging: <Box className="w-6 h-6 text-[#E51F25]" />,
  strategy: <Compass className="w-6 h-6 text-[#2954F5]" />,
};

export default function HomePage() {
  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      {/* ========================================================
          1. HERO SECTION (NO BADGES / NO EYEBROWS)
      ======================================================== */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center overflow-hidden border-b border-[#E3E5EC]">
        {/* Full-Bleed Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Directional contrast overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FDFDFC] via-[#FDFDFC]/30 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          {/* Main Display Headline (Direct - Zero Badges) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#12151B] max-w-3xl leading-[1.06]">
            Brand and marketing work, delivered right to your{" "}
            <span className="text-[#2954F5] underline decoration-[#2954F5]/30 decoration-4 underline-offset-8">
              doorstep.
            </span>
          </h1>

          {/* Lead Paragraph */}
          <p className="mt-8 text-lg sm:text-xl text-[#12151B]/85 max-w-2xl leading-relaxed font-normal">
            Doorstep Limited is a full-service marketing and branding agency. We build
            identities, engineer campaigns, and produce the creative content that carries a brand
            from idea to shelf.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#12151B] text-white font-medium text-sm sm:text-base hover:bg-[#2954F5] transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/90 backdrop-blur-xs border border-[#E3E5EC] text-[#12151B] font-medium text-sm sm:text-base hover:bg-white hover:border-[#12151B] transition-all duration-200 transform hover:-translate-y-0.5 shadow-xs"
            >
              <span>See Our Work</span>
              <ArrowUpRight className="w-4 h-4 text-[#5B5F6B]" />
            </Link>
          </div>

          {/* Agency Metrics Row */}
          <div className="mt-20 pt-10 border-t border-[#E3E5EC]/80 grid grid-cols-2 md:grid-cols-4 gap-8">
            {AGENCY_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="block font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12151B] tracking-tight">
                  {stat.value}
                </span>
                <span className="block text-sm font-semibold text-[#12151B]">
                  {stat.label}
                </span>
                <span className="block text-xs text-[#5B5F6B] font-medium">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. OUR SERVICES (DIRECT HEADING - NO BADGES)
      ======================================================== */}
      <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E3E5EC] mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12151B] tracking-tight">
              Our Services
            </h2>
            <p className="mt-3 text-base text-[#5B5F6B] max-w-xl font-normal leading-relaxed">
              Five specialized creative disciplines purpose-built for market impact, cultural relevance, and revenue growth.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-[#E3E5EC] text-sm font-semibold text-[#12151B] hover:bg-[#F4F5F8] hover:border-gray-400 transition-colors self-start md:self-auto"
          >
            <span>Request a Custom Quote</span>
            <ArrowUpRight className="w-4 h-4 text-[#5B5F6B]" />
          </Link>
        </div>

        {/* Advanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AGENCY_SERVICES.map((service, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={service.id}
                className={`bg-white border border-[#E3E5EC] rounded-2xl p-8 flex flex-col justify-between hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group ${
                  isFeatured ? "lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#E3E5EC]">
                    <span className="font-mono text-base font-bold text-[#5B5F6B]">
                      0{index + 1}
                    </span>
                    <div className="p-3 rounded-xl bg-[#F4F5F8] border border-[#E3E5EC] group-hover:scale-110 group-hover:bg-white transition-all">
                      {serviceIconMap[service.id]}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#12151B] tracking-tight group-hover:text-[#2954F5] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#5B5F6B]">
                      {service.shortDesc}
                    </p>
                  </div>

                  <p className="mt-4 text-sm text-[#12151B] leading-relaxed font-normal">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#F4F5F8] space-y-2.5">
                    <span className="text-xs font-bold text-[#5B5F6B] block">
                      Scope Includes:
                    </span>
                    <ul className="grid grid-cols-1 gap-2">
                      {service.tags.map((tag, tIdx) => (
                        <li
                          key={tIdx}
                          className="flex items-center gap-2 text-xs font-medium text-[#12151B]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2954F5] shrink-0" />
                          <span>{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E3E5EC] flex items-center justify-between">
                  <Link
                    href={`/contact?service=${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#12151B] group-hover:text-[#2954F5] transition-colors"
                  >
                    <span>Inquire for {service.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#2954F5] group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. HOW WE WORK (DIRECT HEADING - NO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F5F8] border border-[#E3E5EC] rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E3E5EC]">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
                How We Work
              </h2>
              <p className="mt-2 text-base text-[#5B5F6B] max-w-xl">
                Small enough to stay close to every brief, structured enough to execute it end to end.
              </p>
            </div>
            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#12151B] text-white text-sm font-semibold hover:bg-[#2954F5] transition-colors self-start md:self-auto"
            >
              <span>Explore Full Methodology</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {WORK_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white p-7 rounded-2xl border border-[#E3E5EC] flex flex-col justify-between hover:border-[#12151B] hover:shadow-md transition-all"
              >
                <div>
                  <span className="font-mono text-3xl font-bold text-[#12151B] block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-[#12151B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#5B5F6B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F4F5F8]">
                  <span className="text-xs font-semibold text-[#2954F5]">
                    {step.tagline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. BRANDS WE WORK WITH (DIRECT HEADING - NO BADGES)
      ======================================================== */}
      <section className="space-y-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#12151B] tracking-tight">
                Brands We Work With
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B5F6B]">
              National &amp; regional enterprises across Bangladesh
            </p>
          </div>
        </div>

        <ClientLogosMarquee />
      </section>

      {/* ========================================================
          5. INQUIRY CALL-TO-ACTION (DIRECT HEADING - NO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12151B] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Ready to take your brand from idea to shelf?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed font-normal">
              Whether you need a complete corporate rebranding, high-conversion paid media, or tactile retail packaging, our senior team in Dhaka is ready.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2954F5] text-white font-medium text-sm sm:text-base hover:bg-[#1B3BC9] transition-all transform hover:-translate-y-0.5"
              >
                <span>Get in Touch With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+8801785031126"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-gray-700 text-white font-medium text-sm sm:text-base hover:bg-white/10 transition-colors"
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

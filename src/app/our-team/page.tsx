import React from "react";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/data/agencyData";
import { ArrowRight, Sparkles, HeartHandshake, Zap, Trophy } from "lucide-react";

export const metadata = {
  title: "Our Team — Doorstep Limited | Creative & Strategy Leadership",
  description:
    "Meet the experienced creative directors, brand strategists, and performance marketers behind Doorstep Limited in Dhaka.",
};

const culturePoints = [
  {
    title: "Senior Hands-On Execution",
    desc: "We don't pitch with senior directors and pass the work to interns. The specialists you meet on day one are the ones drafting your strategy and designing your assets.",
    icon: <Trophy className="w-5 h-5 text-[#2954F5]" />,
  },
  {
    title: "Fast Iteration, Zero Bureaucracy",
    desc: "Speed is a competitive advantage in modern marketing. Our flat structure allows ideas to move from concept to client review without red tape.",
    icon: <Zap className="w-5 h-5 text-[#E51F25]" />,
  },
  {
    title: "Uncompromising Visual Craft",
    desc: "From kerning and typography to pacing in a 15-second reel, we care deeply about aesthetic details that elevate brands above competitors.",
    icon: <Sparkles className="w-5 h-5 text-[#2954F5]" />,
  },
  {
    title: "Radical Transparency",
    desc: "Clear timelines, straightforward pricing, and honest reporting. If an ad creative underperforms, we dissect the data and optimize immediately.",
    icon: <HeartHandshake className="w-5 h-5 text-[#E51F25]" />,
  },
];

export default function OurTeamPage() {
  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      {/* ========================================================
          1. PAGE HERO (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="bg-[#F2F4F8] border-b border-[#E3E5EC] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#12151B] max-w-3xl leading-[1.1]">
            A small, senior team that stays on your account from start to finish.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#5B5F6B] max-w-2xl leading-relaxed font-normal">
            We are built as a specialized studio rather than a bloated agency. You get direct access to creative thinkers, strategists, and executors who care about your brand as much as you do.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. TEAM ROSTER GRID
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Studio Leadership &amp; Function Leads
          </h2>
          <p className="text-sm text-[#5B5F6B] mt-2">
            Every core service is spearheaded by a dedicated practice lead.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="relative aspect-[3/4.2] rounded-xl sm:rounded-2xl overflow-hidden bg-[#141722] border border-[#E3E5EC] hover:border-[#12151B] group shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Photo */}
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Vignette / Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

              {/* Overlay Information */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-1">
                <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl tracking-tight leading-snug font-display">
                  {member.name}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-normal">
                  {member.role}
                </p>

                {/* LinkedIn Icon Badge matching screenshot */}
                <div className="pt-2">
                  <a
                    href={member.linkedin || "https://linkedin.com"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#1C1F28] hover:bg-[#E51F25] text-[#E51F25] hover:text-white transition-all duration-200 border border-white/10"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. HOW OUR TEAM OPERATES (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F5F8] border border-[#E3E5EC] rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="max-w-xl mb-12">
            <h2 className="text-3xl font-bold text-[#12151B] tracking-tight">
              How We Work Together
            </h2>
            <p className="text-sm text-[#5B5F6B] mt-2">
              The internal habits that keep our team synchronized and delivering peak output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturePoints.map((cp, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-[#E3E5EC] space-y-3 hover:border-[#12151B] hover:shadow-md transition-all"
              >
                <div className="p-3 bg-[#F4F5F8] rounded-xl w-fit border border-[#E3E5EC]">
                  {cp.icon}
                </div>
                <h3 className="text-xl font-bold text-[#12151B]">{cp.title}</h3>
                <p className="text-sm text-[#5B5F6B] leading-relaxed">{cp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CTA (BRAND BLUE & RED CTA)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E42D0] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-2xl border border-blue-400/30">
          {/* Subtle Ambient Brand Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-6">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-snug text-white font-display">
              Put our team to work on your brand.
            </h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-normal">
              Get in touch today to schedule an initial consultation with our managing director and creative lead.
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

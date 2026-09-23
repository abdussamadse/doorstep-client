import React from "react";
import Link from "next/link";
import { TEAM_MEMBERS, AGENCY_INFO } from "@/data/agencyData";
import { ArrowRight, Mail, Sparkles, HeartHandshake, Zap, Trophy } from "lucide-react";

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
          2. TEAM ROSTER GRID (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-bold text-[#12151B] tracking-tight">
            Studio Leadership &amp; Function Leads
          </h2>
          <p className="text-sm text-[#5B5F6B] mt-2">
            Every core service is spearheaded by a dedicated practice lead.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-[#E3E5EC] rounded-2xl overflow-hidden hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-4/3 bg-gradient-to-br from-[#F4F5F8] via-[#ECEEF2] to-[#E3E5EC] flex flex-col items-center justify-center p-6 relative border-b border-[#E3E5EC]">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-[#E3E5EC] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                    <span className="font-display font-bold text-2xl text-[#12151B]">
                      {member.initials}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#5B5F6B] mt-4">
                    {member.dept}
                  </span>
                </div>

                <div className="p-8 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-[#12151B] group-hover:text-[#2954F5] transition-colors tracking-tight">
                      {member.role}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#2954F5]">
                      {member.specialty}
                    </p>
                  </div>
                  <p className="text-sm text-[#5B5F6B] leading-relaxed pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="px-8 py-4 bg-[#F4F5F8]/60 border-t border-[#E3E5EC] flex items-center justify-between text-xs text-[#5B5F6B]">
                <span className="font-medium text-[#12151B]">
                  Dhaka Creative Studio
                </span>
                <span className="font-mono text-gray-400">Full-Time</span>
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
          4. CAREERS CALLOUT (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#E3E5EC] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-white hover:border-[#12151B] hover:shadow-lg transition-all">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#12151B] tracking-tight">
              Want to build remarkable brands with us?
            </h2>
            <p className="text-sm text-[#5B5F6B] leading-relaxed">
              We are continually looking for passionate art directors, motion designers, copywriters, and paid media strategists based in Dhaka.
            </p>
          </div>
          <a
            href={`mailto:${AGENCY_INFO.email}?subject=Career%20Application%20at%20Doorstep%20Limited`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#12151B] text-white text-sm font-semibold hover:bg-[#2954F5] transition-colors shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Send Your Portfolio</span>
          </a>
        </div>
      </section>

      {/* ========================================================
          5. CTA (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12151B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Put our team to work on your brand.
          </h2>
          <p className="text-gray-300 text-base max-w-xl mx-auto leading-relaxed font-normal">
            Get in touch today to schedule an initial consultation with our managing director and creative lead.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2954F5] text-white font-medium hover:bg-[#1B3BC9] transition-all transform hover:-translate-y-0.5"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

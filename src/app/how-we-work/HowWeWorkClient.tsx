"use client";

import React from "react";
import Link from "next/link";
import { WORK_STEPS } from "@/data/agencyData";
import { useMethodology, usePageContent } from "@/hooks/useCMS";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Target,
  Zap,
  Users2,
  Search,
  Palette,
  Rocket,
} from "lucide-react";

const workStepConfig = [
  {
    icon: <Search className="w-5 h-5" />,
    bgClass: "bg-[#2954F5]/10 text-[#2954F5] border-[#2954F5]/25",
    hoverBorder: "hover:border-[#2954F5]",
    textHover: "group-hover:text-[#2954F5]",
    taglineClass: "text-[#2954F5]",
    checkColor: "text-[#2954F5]",
    deliverablesLabel: "KEY DELIVERABLES",
  },
  {
    icon: <Target className="w-5 h-5" />,
    bgClass: "bg-[#E51F25]/10 text-[#E51F25] border-[#E51F25]/25",
    hoverBorder: "hover:border-[#E51F25]",
    textHover: "group-hover:text-[#E51F25]",
    taglineClass: "text-[#E51F25]",
    checkColor: "text-[#E51F25]",
    deliverablesLabel: "KEY DELIVERABLES",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    bgClass: "bg-[#2954F5]/10 text-[#2954F5] border-[#2954F5]/25",
    hoverBorder: "hover:border-[#2954F5]",
    textHover: "group-hover:text-[#2954F5]",
    taglineClass: "text-[#2954F5]",
    checkColor: "text-[#2954F5]",
    deliverablesLabel: "KEY DELIVERABLES",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    bgClass: "bg-[#E51F25]/10 text-[#E51F25] border-[#E51F25]/25",
    hoverBorder: "hover:border-[#E51F25]",
    textHover: "group-hover:text-[#E51F25]",
    taglineClass: "text-[#E51F25]",
    checkColor: "text-[#E51F25]",
    deliverablesLabel: "KEY DELIVERABLES",
  },
];

const DOORSTEP_STANDARDS = [
  {
    title: "Work We'd Sign Our Name To",
    desc: (
      <>
        Every single brief{" "}
        <strong className="text-[#12151B] font-semibold">
          receives original, bespoke thinking
        </strong>
        . We don&apos;t believe in recycled{" "}
        <strong className="text-[#12151B] font-semibold">
          templates dressed up
        </strong>{" "}
        in new color palettes.
      </>
    ),
    icon: <ShieldCheck className="w-5 h-5 text-[#2954F5]" />,
    iconBg: "bg-[#2954F5]/10 border-[#2954F5]/20",
  },
  {
    title: "Close to the Client",
    desc: (
      <>
        Small, agile team structures{" "}
        <strong className="text-[#12151B] font-semibold">
          mean zero bureaucratic handoffs
        </strong>
        ,{" "}
        <strong className="text-[#12151B] font-semibold">
          lightning-fast revisions
        </strong>
        , and{" "}
        <strong className="text-[#12151B] font-semibold">
          senior attention
        </strong>{" "}
        on every single account.
      </>
    ),
    icon: <Users2 className="w-5 h-5 text-[#E51F25]" />,
    iconBg: "bg-[#E51F25]/10 border-[#E51F25]/20",
  },
  {
    title: "Strategy Before Design",
    desc: (
      <>
        We{" "}
        <strong className="text-[#12151B] font-semibold">
          define the &quot;why&quot; before producing the &quot;what&quot;
        </strong>
        . Every logo curve, copy hook, and media budget ties back to a commercial
        objective.
      </>
    ),
    icon: <Target className="w-5 h-5 text-[#2954F5]" />,
    iconBg: "bg-[#2954F5]/10 border-[#2954F5]/20",
  },
  {
    title: "Built for Bangladeshi Brands",
    desc: (
      <>
        We understand the local{" "}
        <strong className="text-[#12151B] font-semibold">
          retail shelf, distributor
        </strong>{" "}
        dynamics, consumer{" "}
        <strong className="text-[#12151B] font-semibold">
          cultural habits
        </strong>
        , and regional media consumption inside out.
      </>
    ),
    icon: <Zap className="w-5 h-5 text-[#E51F25]" />,
    iconBg: "bg-[#E51F25]/10 border-[#E51F25]/20",
  },
];

const FAQS = [
  {
    q: "Do you work on a monthly retainer or per-project basis?",
    a: "We accommodate both models. For continuous growth (social media management, daily creative, performance media), our monthly retainer ensures dedicated studio bandwidth. For branding, packaging, or brand guidelines, we operate on milestone-based project scopes.",
  },
  {
    q: "How do we communicate throughout the project?",
    a: "Every client has direct access to our core team via a dedicated WhatsApp/Slack channel for day-to-day updates, alongside structured weekly or bi-weekly review meetings.",
  },
  {
    q: "What is your typical turnaround time for a branding project?",
    a: "A comprehensive brand identity (discovery, logo suite, typography, color palette, and initial stationery) typically takes 2 to 3 weeks. Full brand guideline manuals take 4 weeks.",
  },
  {
    q: "How are campaign results and ROI measured?",
    a: "Every monthly retainer closes with a concrete analytics report covering reach, engagement, cost per acquisition (CPA), and actionable qualitative insights.",
  },
];

// Rich descriptions matching screenshot typography
const STEP_STYLED_DESCS: Record<string, React.ReactNode> = {
  "01": (
    <>
      We start with the{" "}
      <strong className="text-[#12151B] font-semibold">brand</strong>, the
      category, the Bangladeshi consumer landscape, and the competitive
      environment —{" "}
      <strong className="text-[#12151B] font-semibold">
        not a recycled template
      </strong>
      .
    </>
  ),
  "02": (
    <>
      A concrete{" "}
      <strong className="text-[#12151B] font-semibold">
        strategic plan and milestone calendar
      </strong>{" "}
      mapped out before a single pixel or line of copy is generated.
    </>
  ),
  "03": (
    <>
      <strong className="text-[#12151B] font-semibold">
        Design, copywriting, motion graphics, and print production
      </strong>{" "}
      strictly aligned with the brand aesthetic —{" "}
      <strong className="text-[#12151B] font-semibold">never compromised</strong>
      .
    </>
  ),
  "04": (
    <>
      Work{" "}
      <strong className="text-[#12151B] font-semibold">
        launches on schedule
      </strong>
      , and every monthly retainer or campaign closes with{" "}
      <strong className="text-[#12151B] font-semibold">
        real performance metrics
      </strong>
      , not just vanity assets.
    </>
  ),
};

export default function HowWeWorkClient() {
  const { data: dynamicSteps = [] } = useMethodology();
  const { data: pageContent } = usePageContent();
  const stepsToRender = dynamicSteps.length > 0 ? dynamicSteps : WORK_STEPS;
  const content = pageContent?.howWeWork;

  return (
    <div className="space-y-16 sm:space-y-24 md:space-y-32 pb-20 sm:pb-28">
      {/* ========================================================
          1. PAGE HERO (WITH SOFT LIGHT BACKGROUND)
      ======================================================== */}
      <section className="w-full bg-[#F2F4F8] border-b border-[#E3E5EC] py-14 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#12151B] leading-[1.15]">
              {content?.heroTitle || "Small enough to stay close, structured enough to deliver end-to-end."}
            </h1>
            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#5B5F6B] max-w-2xl leading-relaxed font-normal">
              {content?.heroDesc || "Great marketing is not born out of guess-work. Our 4-stage process bridges commercial insight with bold creative craft to build brands that earn a lasting place in people’s minds."}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. OUR 4-STAGE METHODOLOGY / HOW EVERY PROJECT UNFOLDS
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <span className="text-[#2954F5] text-xs sm:text-sm font-bold uppercase tracking-wider block mb-1">
            OUR 4-STAGE METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#12151B] tracking-tight">
            How Every Project Unfolds
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#5B5F6B]">
            From initial discovery to continuous reporting, here is our
            transparent end-to-end workflow designed for clarity and commercial
            impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stepsToRender.map((step, idx) => {
            const config = workStepConfig[idx] || workStepConfig[0];
            const bullets =
              step.bulletPoints || (step as any).milestones || [];
            const stepNum = step.step || `0${idx + 1}`;
            const description =
              STEP_STYLED_DESCS[stepNum] ||
              step.desc ||
              (step as any).summary ||
              "";
            const tagline = step.tagline || `Phase ${stepNum}`;

            return (
              <div
                key={stepNum}
                className={`bg-white p-5 sm:p-6 rounded-2xl border border-[#E3E5EC] flex flex-col justify-between ${config.hoverBorder} hover:shadow-xl transition-all duration-300 group`}
              >
                <div>
                  {/* Centered Icon badge */}
                  <div className="flex items-center justify-center mb-4 sm:mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl border ${config.bgClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs`}
                    >
                      {config.icon}
                    </div>
                  </div>

                  {/* Centered Title */}
                  <h3
                    className={`text-base sm:text-lg font-bold text-[#12151B] tracking-tight ${config.textHover} transition-colors text-center mb-2.5`}
                  >
                    {step.title}
                  </h3>

                  {/* Centered Description with subtle bold highlights */}
                  <p className="text-xs text-[#5B5F6B] leading-relaxed text-center mb-6">
                    {description}
                  </p>

                  {/* KEY DELIVERABLES label */}
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-3">
                    {config.deliverablesLabel}
                  </div>

                  {/* Bullet points with checkmarks */}
                  <div className="space-y-2 mb-6">
                    {bullets.map((point: string, pIdx: number) => (
                      <div key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${config.checkColor} shrink-0 mt-0.5`}
                        />
                        <span className="text-[11px] sm:text-xs text-[#5B5F6B] leading-tight font-medium">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tagline with top border */}
                <div className="pt-3.5 border-t border-gray-100 mt-auto text-left">
                  <span
                    className={`text-xs font-semibold ${config.taglineClass}`}
                  >
                    {tagline}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. THE DOORSTEP STANDARD (LIGHT 2x2 GRID AS IN SCREENSHOT)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#12151B] tracking-tight">
            The Doorstep Standard
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#5B5F6B]">
            The operating codes that guides our team across every phone call,
            Figma file, and campaign launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {DOORSTEP_STANDARDS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-6 sm:p-7 hover:border-gray-300 transition-all duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl border ${item.iconBg} flex items-center justify-center mb-4 shadow-xs`}
              >
                {item.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#12151B] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B5F6B] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. FREQUENTLY ASKED QUESTIONS (CENTERED AS IN SCREENSHOT)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#12151B] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 space-y-2 hover:border-gray-300 transition-colors"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#12151B]">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B5F6B] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. CTA BANNER ("Have a brief you'd like to discuss?")
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E42D0] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-2xl border border-blue-400/30">
          {/* Subtle Ambient Brand Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-6">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-snug text-white font-display">
              {content?.ctaTitle || "Have a brief you'd like to discuss?"}
            </h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-normal">
              {content?.ctaDesc || "Tell us about your brand challenge. We will review your goals and walk you through a tailored roadmap."}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 rounded-full bg-[#E51F25] text-white font-bold text-xs sm:text-base hover:bg-[#C9181E] transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-red-500/25"
              >
                <span>{content?.ctaButtonText || "Schedule a Discovery Call"}</span>
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

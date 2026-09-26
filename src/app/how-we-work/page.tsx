import React from "react";
import Link from "next/link";
import { WORK_STEPS } from "@/data/agencyData";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Target,
  Zap,
  Users2,
} from "lucide-react";

export const metadata = {
  title: "How We Work — Doorstep Limited | Agency Methodology",
  description:
    "Discover the structured 4-step creative methodology at Doorstep Limited: Understand, Plan, Create, and Deliver & Report.",
};

const agencyPrinciples = [
  {
    title: "Work We'd Sign Our Name To",
    desc: "Every single brief receives original, bespoke thinking. We don't believe in recycled templates dressed up in new color palettes.",
    icon: <ShieldCheck className="w-6 h-6 text-[#2954F5]" />,
  },
  {
    title: "Close to the Client",
    desc: "Small, agile team structures mean zero bureaucratic handoffs, lightning-fast revisions, and senior attention on every single account.",
    icon: <Users2 className="w-6 h-6 text-[#E51F25]" />,
  },
  {
    title: "Strategy Before Design",
    desc: "We define the 'why' before producing the 'what'. Every logo curve, copy hook, and media budget ties back to a commercial objective.",
    icon: <Target className="w-6 h-6 text-[#2954F5]" />,
  },
  {
    title: "Built for Bangladeshi Brands",
    desc: "We understand the local retail shelf, distributor dynamics, consumer cultural habits, and regional media consumption inside out.",
    icon: <Zap className="w-6 h-6 text-[#E51F25]" />,
  },
];

const faqs = [
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

export default function HowWeWorkPage() {
  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      {/* ========================================================
          1. PAGE HERO (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="bg-[#F2F4F8] border-b border-[#E3E5EC] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#12151B] max-w-3xl leading-[1.1]">
            Small enough to stay close, structured enough to deliver end-to-end.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#5B5F6B] max-w-2xl leading-relaxed font-normal">
            Great marketing is not born out of guess-work. Our 4-stage process bridges commercial insight with bold creative craft to build brands that earn a lasting place in people’s minds.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. THE 4-STEP METHODOLOGY (ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {WORK_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white border border-[#E3E5EC] rounded-2xl p-8 sm:p-12 hover:border-[#12151B] hover:shadow-lg transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4">
                  <span className="font-mono text-4xl sm:text-5xl font-bold text-[#12151B] block mb-2">
                    {step.step}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#12151B] tracking-tight">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-[#2954F5]">
                    {step.tagline}
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <p className="text-base text-[#12151B] leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="bg-[#F4F5F8] p-6 rounded-xl border border-[#E3E5EC] space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#12151B]">
                      Key Deliverables &amp; Milestones
                    </h3>
                    <ul className="space-y-2">
                      {step.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-sm text-[#5B5F6B]">
                          <CheckCircle2 className="w-4 h-4 text-[#2954F5] mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. AGENCY PRINCIPLES (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            The Doorstep Standard
          </h2>
          <p className="mt-3 text-[#5B5F6B] text-base">
            The operating code that guides our team across every phone call, Figma file, and campaign launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agencyPrinciples.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#F4F5F8] border border-[#E3E5EC] rounded-2xl space-y-4 hover:bg-white hover:border-[#12151B] hover:shadow-md transition-all"
            >
              <div className="p-3 bg-white border border-[#E3E5EC] rounded-xl w-fit">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#12151B]">{item.title}</h3>
              <p className="text-sm text-[#5B5F6B] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. ENGAGEMENT FAQ (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#12151B] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#E3E5EC] border-y border-[#E3E5EC]">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-6 space-y-2">
              <h3 className="text-lg font-bold text-[#12151B]">{faq.q}</h3>
              <p className="text-sm text-[#5B5F6B] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. CALL TO ACTION (BRAND BLUE & RED CTA)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E42D0] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-2xl border border-blue-400/30">
          {/* Subtle Ambient Brand Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-6">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-snug text-white font-display">
              Have a brief you’d like to discuss?
            </h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-normal">
              Tell us about your brand challenge. We will review your goals and walk you through a tailored roadmap.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 rounded-full bg-[#E51F25] text-white font-bold text-xs sm:text-base hover:bg-[#C9181E] transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-red-500/25"
              >
                <span>Schedule a Discovery Call</span>
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

"use client";

import React from "react";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/data/agencyData";
import { useTeam, usePageContent } from "@/hooks/useCMS";
import { ArrowRight } from "lucide-react";

export default function OurTeamClient() {
  const { data: dynamicTeam = [] } = useTeam();
  const { data: pageContent } = usePageContent();
  const teamToRender = dynamicTeam.length > 0 ? dynamicTeam : TEAM_MEMBERS;
  const content = pageContent?.ourTeam;

  return (
    <div className="space-y-16 sm:space-y-24 md:space-y-32 pb-20 sm:pb-28">
      {/* ========================================================
          1. PAGE HERO (LIGHT BACKGROUND AS IN SCREENSHOT)
      ======================================================== */}
      <section className="w-full bg-[#F2F4F8] border-b border-[#E3E5EC] py-14 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#12151B] leading-[1.15]">
              {content?.heroTitle || "A small, senior team that stays on your account from start to finish."}
            </h1>
            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#5B5F6B] max-w-2xl leading-relaxed font-normal">
              {content?.heroDesc || "We are built as a specialized studio rather than a bloated agency. You get direct access to creative thinkers, strategists, and executors who care about your brand as much as you do."}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. STUDIO LEADERSHIP & FUNCTION LEADS
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#12151B] tracking-tight">
            {content?.sectionTitle || "Studio Leadership & Function Leads"}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm md:text-base text-[#5B5F6B]">
            {content?.sectionDesc || "Every core service is spearheaded by a dedicated practice lead."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {teamToRender.map((member: any) => {
            const memberId = member._id || member.id || member.name;
            const avatar = member.avatar || member.image || "/img/team/placeholder.jpg";
            const role = member.role || "Specialist";
            const linkedinUrl = member.linkedin || "https://linkedin.com";

            return (
              <div
                key={memberId}
                className="relative aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#141722] border border-[#E3E5EC] hover:border-[#12151B] group shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Photo */}
                <img
                  src={avatar}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette / Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                {/* Bottom Overlay Info (Name, Role, Red Badge) */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 space-y-0.5">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-300 font-normal">
                    {role}
                  </p>
                  <div className="pt-2">
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#E51F25] text-white hover:bg-[#C9181E] transition-colors shadow-xs"
                    >
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. CTA BANNER ("Put our team to work on your brand.")
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E42D0] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-2xl border border-blue-400/30">
          {/* Subtle Ambient Brand Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-6">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-snug text-white font-display">
              {content?.ctaTitle || "Put our team to work on your brand."}
            </h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-normal">
              {content?.ctaDesc || "Get in touch today to schedule an initial consultation with our managing director and creative lead."}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 rounded-full bg-[#E51F25] text-white font-bold text-xs sm:text-base hover:bg-[#C9181E] transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-red-500/25"
              >
                <span>{content?.ctaButtonText || "Get in Touch With Us"}</span>
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

import React, { Suspense } from "react";
import ContactClient from "./ContactClient";
import { Navigation } from "lucide-react";

export const metadata = {
  title: "Get in Touch — Doorstep Limited | Dhaka Agency Studio",
  description:
    "Contact Doorstep Limited in Kolabagan, Dhaka. Request a quote or project brief for branding, packaging, digital marketing, and creative production.",
};

export default function ContactPage() {
  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      {/* ========================================================
          1. PAGE HERO (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="bg-[#F2F4F8] border-b border-[#E3E5EC] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#12151B] max-w-3xl leading-[1.1]">
            Let’s build something your customers will remember.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#5B5F6B] max-w-2xl leading-relaxed font-normal">
            Tell us about your brand goals. Whether launching an FMCG product, refreshing your brand identity, or scaling your paid social performance, we are ready to assist.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. CONTACT FORM & DIRECT DETAILS (ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="p-12 text-center text-sm text-[#5B5F6B]">Loading inquiry form...</div>}>
          <ContactClient />
        </Suspense>
      </section>

      {/* ========================================================
          3. STUDIO LOCATION & DIRECTIONS (DIRECT HEADING - ZERO BADGES)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F5F8] border border-[#E3E5EC] rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E3E5EC]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#12151B] tracking-tight">
                Dhaka Creative Studio
              </h2>
              <p className="text-sm text-[#5B5F6B] mt-1">
                Centrally situated in Kolabagan, easily accessible from Dhanmondi, Panthapath, and Farmgate.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Kolabagan,Dhaka,Bangladesh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2954F5] text-white text-sm font-semibold hover:bg-[#1B3BC9] transition-all transform hover:-translate-y-0.5 shadow-sm self-start md:self-auto"
            >
              <Navigation className="w-4 h-4 text-white" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-7 rounded-2xl border border-[#E3E5EC]">
              <h3 className="font-bold text-base text-[#12151B] mb-2">Dhanmondi / Mirpur Road</h3>
              <p className="text-xs text-[#5B5F6B] leading-relaxed">
                Just 2 minutes off the main Mirpur Road via Dolphin Goli alleyway.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-[#E3E5EC]">
              <h3 className="font-bold text-base text-[#12151B] mb-2">Panthapath / Green Road</h3>
              <p className="text-xs text-[#5B5F6B] leading-relaxed">
                5 minutes from Square Hospital and Bashundhara City intersection.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-[#E3E5EC]">
              <h3 className="font-bold text-base text-[#12151B] mb-2">Consultation Protocol</h3>
              <p className="text-xs text-[#5B5F6B] leading-relaxed">
                Prior appointment is appreciated to ensure our creative and strategy directors are available to host you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

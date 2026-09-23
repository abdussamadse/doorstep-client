import React from "react";
import Link from "next/link";
import DoorstepLogo from "./DoorstepLogo";
import { AGENCY_INFO } from "@/data/agencyData";
import { ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#E3E5EC] bg-[#12151B] text-white">
      {/* Upper Footer: Agency Information Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Col 1: Brand & Synopsis */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 20c0-5.5 4.5-10 10-10h20c27.6 0 50 22.4 50 50s-22.4 50-50 50H30c-5.5 0-10-4.5-10-10V70h26c11 0 20-9 20-20s-9-20-20-20H20z"
                  fill="#2954F5"
                />
                <rect x="20" y="42" width="26" height="26" rx="8" fill="#E51F25" />
              </svg>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Doorstep <span className="text-[#E51F25]">Limited</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A full-service marketing and branding agency based in Dhaka. We build memorable brand identities, run high-converting campaigns, and engineer content that takes brands from concept to shelf.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={AGENCY_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2954F5] hover:bg-[#2954F5]/10 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">FB</span>
              </a>
              <a
                href={AGENCY_INFO.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2954F5] hover:bg-[#2954F5]/10 transition-colors"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href={AGENCY_INFO.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2954F5] hover:bg-[#2954F5]/10 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">IN</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Pages</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-we-work" className="text-gray-300 hover:text-white transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="text-gray-300 hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Agency Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Our Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E51F25]"></span>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Digital Marketing & Social
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2954F5]"></span>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Brand Identity & Systems
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E51F25]"></span>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Creative & Content Production
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2954F5]"></span>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Packaging & Print Collaterals
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E51F25]"></span>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Marketing Strategy & Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Studio Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Dhaka Studio</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2954F5] mt-1 shrink-0" />
                <span>House 60, Road Dolphin Goli, Kolabagan, Dhaka-1205</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2954F5] shrink-0" />
                <a href={`mailto:${AGENCY_INFO.email}`} className="hover:text-white transition-colors">
                  {AGENCY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2954F5] shrink-0" />
                <a href={`tel:${AGENCY_INFO.phone}`} className="hover:text-white transition-colors">
                  {AGENCY_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-xs">{AGENCY_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} Doorstep Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-gray-500">Built for forward-thinking Bangladeshi brands</span>
            <Link href="/contact" className="inline-flex items-center gap-1 text-[#2954F5] hover:text-white font-medium transition-colors">
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AGENCY_INFO } from "@/data/agencyData";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Copy,
  Check,
} from "lucide-react";

const SERVICE_OPTIONS = [
  { id: "digital", label: "Digital Marketing & Social" },
  { id: "branding", label: "Brand Identity & Guidelines" },
  { id: "creative", label: "Creative & Content Production" },
  { id: "packaging", label: "Packaging, Menus & Print" },
  { id: "strategy", label: "Marketing Strategy & Consulting" },
];

const BUDGET_RANGES = [
  "Under 50,000 BDT",
  "50,000 – 1,50,000 BDT",
  "1,50,000 – 3,00,000 BDT",
  "3,00,000+ BDT",
  "Monthly Retainer Discussion",
];

export default function ContactClient() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: initialService ? [initialService] : [] as string[],
    budget: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialService && !formData.services.includes(initialService)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, initialService],
      }));
    }
  }, [initialService]);

  const toggleService = (id: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(id);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== id)
          : [...prev.services, id],
      };
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AGENCY_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left Column: Direct Agency Contacts & Studio Info (NO BADGES) */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Let’s start the conversation.
          </h2>
          <p className="mt-4 text-base text-[#5B5F6B] leading-relaxed">
            Whether you have a detailed RFP or just an early concept on a napkin, our team will review your objectives and respond within 24 hours.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4">
          {/* Email */}
          <div className="p-6 bg-white border border-[#E3E5EC] rounded-2xl flex items-start justify-between gap-4 hover:border-[#12151B] transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#F4F5F8] rounded-xl text-[#2954F5]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F6B]">
                  Direct Email
                </span>
                <a
                  href={`mailto:${AGENCY_INFO.email}`}
                  className="block text-base font-bold text-[#12151B] hover:text-[#2954F5] transition-colors mt-0.5"
                >
                  {AGENCY_INFO.email}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg text-gray-400 hover:text-[#12151B] hover:bg-[#F4F5F8] transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone / WhatsApp */}
          <div className="p-6 bg-white border border-[#E3E5EC] rounded-2xl flex items-start gap-4 hover:border-[#12151B] transition-colors">
            <div className="p-2.5 bg-[#F4F5F8] rounded-xl text-[#E51F25]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F6B]">
                Phone / WhatsApp
              </span>
              <a
                href={`tel:${AGENCY_INFO.phone}`}
                className="block text-base font-bold text-[#12151B] hover:text-[#2954F5] transition-colors mt-0.5"
              >
                {AGENCY_INFO.phone}
              </a>
              <span className="text-xs text-[#5B5F6B]">Direct line to studio accounts</span>
            </div>
          </div>

          {/* Address */}
          <div className="p-6 bg-white border border-[#E3E5EC] rounded-2xl flex items-start gap-4 hover:border-[#12151B] transition-colors">
            <div className="p-2.5 bg-[#F4F5F8] rounded-xl text-[#2954F5]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F6B]">
                Studio Address
              </span>
              <p className="text-base font-bold text-[#12151B] mt-0.5">
                House 60, Road Dolphin Goli
              </p>
              <p className="text-sm text-[#5B5F6B]">Kolabagan, Dhaka-1205, Bangladesh</p>
            </div>
          </div>

          {/* Hours */}
          <div className="p-6 bg-[#F4F5F8] border border-[#E3E5EC] rounded-2xl flex items-start gap-4">
            <div className="p-2.5 bg-white rounded-xl text-gray-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F6B]">
                Operating Hours
              </span>
              <p className="text-sm font-bold text-[#12151B] mt-0.5">
                {AGENCY_INFO.hours}
              </p>
              <span className="text-xs text-[#5B5F6B]">Friday Closed (Emergency Retainer Support Active)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Project Brief Form (NO BADGES) */}
      <div className="lg:col-span-7 bg-white border border-[#E3E5EC] rounded-3xl p-8 sm:p-12 shadow-xs">
        {submitted ? (
          <div className="text-center py-12 space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#12151B]">
              Inquiry Received!
            </h3>
            <p className="text-sm text-[#5B5F6B] max-w-md mx-auto leading-relaxed">
              Thank you for considering Doorstep Limited. Our account lead will review your requirements and reach out via email/phone within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  services: [],
                  budget: "",
                  message: "",
                });
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#E3E5EC] text-sm font-medium text-[#12151B] hover:bg-[#F4F5F8] transition-colors cursor-pointer"
            >
              <span>Submit Another Brief</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#12151B] tracking-tight">Project Brief</h3>
              <p className="text-xs text-[#5B5F6B] mt-1">
                Fill out the details below and we’ll formulate a scope proposal.
              </p>
            </div>

            {/* Service Multi-Select */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#12151B]">
                Services Needed <span className="text-[#E51F25]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICE_OPTIONS.map((svc) => {
                  const isChecked = formData.services.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleService(svc.id)}
                      className={`text-left px-4 py-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? "bg-[#2954F5]/5 border-[#2954F5] text-[#2954F5] font-semibold"
                          : "bg-white border-[#E3E5EC] text-[#5B5F6B] hover:border-gray-400"
                      }`}
                    >
                      <span>{svc.label}</span>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "bg-[#2954F5] border-[#2954F5] text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-semibold text-[#12151B]">
                  Your Name <span className="text-[#E51F25]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] text-sm text-[#12151B] focus:outline-none focus:ring-2 focus:ring-[#2954F5] focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-[#12151B]">
                  Work Email <span className="text-[#E51F25]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="e.g. tanvir@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] text-sm text-[#12151B] focus:outline-none focus:ring-2 focus:ring-[#2954F5] focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-xs font-semibold text-[#12151B]">
                  Phone / WhatsApp <span className="text-[#E51F25]">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="e.g. +880 1700-000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] text-sm text-[#12151B] focus:outline-none focus:ring-2 focus:ring-[#2954F5] focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="company" className="block text-xs font-semibold text-[#12151B]">
                  Brand / Company Name
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="e.g. Dhaka Artisan Food Co."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] text-sm text-[#12151B] focus:outline-none focus:ring-2 focus:ring-[#2954F5] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <label htmlFor="budget" className="block text-xs font-semibold text-[#12151B]">
                Estimated Budget Range
              </label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] text-sm text-[#12151B] focus:outline-none focus:ring-2 focus:ring-[#2954F5] focus:border-transparent transition-all"
              >
                <option value="">Select an estimated investment level...</option>
                {BUDGET_RANGES.map((b, idx) => (
                  <option key={idx} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-semibold text-[#12151B]">
                What do you need help with? <span className="text-[#E51F25]">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Tell us about your brand, current challenges, expected deliverables, and target timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] text-sm text-[#12151B] focus:outline-none focus:ring-2 focus:ring-[#2954F5] focus:border-transparent transition-all resize-y"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#12151B] text-white font-medium text-sm hover:bg-[#2954F5] transition-all disabled:opacity-50 cursor-pointer shadow-xs hover:shadow-md"
            >
              {loading ? (
                <span>Submitting Brief...</span>
              ) : (
                <>
                  <span>Send Project Inquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

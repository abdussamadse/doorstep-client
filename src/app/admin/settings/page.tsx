"use client";

import React, { useState, useEffect } from "react";
import { AgencyInfo } from "@/data/agencyData";
import { Save, Check, Building, Phone, Mail, MapPin, Globe } from "lucide-react";
import { useSettings, useUpdateSettings } from "@/hooks/useCMS";

export default function AdminSettingsPage() {
  const { data: settings } = useSettings();
  const updateMutation = useUpdateSettings();
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tagline, setTagline] = useState("");
  const [blurb, setBlurb] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    if (settings) {
      setPhone(settings.phone || "");
      setEmail(settings.email || "");
      setAddress(settings.address || "");
      setTagline(settings.tagline || "");
      setBlurb(settings.blurb || "");
      setFacebook(settings.social?.facebook || "");
      setInstagram(settings.social?.instagram || "");
    }
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate({
      phone,
      email,
      address,
      tagline,
      blurb,
      social: {
        facebook,
        instagram,
        linkedin: settings?.social?.linkedin || "https://linkedin.com",
      },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Global Configuration
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">
            Site &amp; Agency Settings CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Manage contact channels, studio address, social profiles, and agency branding.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Info Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
            <Building className="w-5 h-5 text-[#2954F5]" />
            <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
              Primary Contact Channels &amp; Office
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Official Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Official Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Studio Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Mission & Tagline */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
            <Globe className="w-5 h-5 text-[#E51F25]" />
            <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
              Agency Copy &amp; Social Links
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Website Tagline *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Company Description (About Us Footer) *
              </label>
              <textarea
                rows={3}
                required
                value={blurb}
                onChange={(e) => setBlurb(e.target.value)}
                className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2954F5] text-white font-semibold text-xs sm:text-sm hover:bg-[#1E42D0] transition-colors shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AgencyInfo } from "@/data/agencyData";
import { Save, Check, Building, Phone, Mail, MapPin, Globe } from "lucide-react";
import {
  getStoredData,
  setStoredData,
  CMS_KEYS,
  INITIAL_CMS_DATA,
} from "@/lib/cmsStore";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AgencyInfo>(
    INITIAL_CMS_DATA.settings
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [tagline, setTagline] = useState(settings.tagline);
  const [blurb, setBlurb] = useState(settings.blurb);
  const [facebook, setFacebook] = useState(settings.social.facebook);
  const [instagram, setInstagram] = useState(settings.social.instagram);

  useEffect(() => {
    const data = getStoredData<AgencyInfo>(
      CMS_KEYS.SETTINGS,
      INITIAL_CMS_DATA.settings
    );
    setSettings(data);
    setPhone(data.phone);
    setEmail(data.email);
    setAddress(data.address);
    setTagline(data.tagline);
    setBlurb(data.blurb);
    setFacebook(data.social.facebook);
    setInstagram(data.social.instagram);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: AgencyInfo = {
      ...settings,
      phone,
      email,
      address,
      tagline,
      blurb,
      social: {
        ...settings.social,
        facebook,
        instagram,
      },
    };

    setSettings(updated);
    setStoredData(CMS_KEYS.SETTINGS, updated);
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

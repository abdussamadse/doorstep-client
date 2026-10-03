"use client";

import React, { useState, useEffect } from "react";
import { AgencyInfo } from "@/data/agencyData";
import { Save, Check, Building, Phone, Mail, MapPin, Globe, Video, Film, RefreshCw } from "lucide-react";
import { useSettings, useUpdateSettings } from "@/hooks/useCMS";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";
import { useToast } from "@/providers/ToastProvider";

export default function AdminSettingsPage() {
  const { data: settings } = useSettings();
  const updateMutation = useUpdateSettings();
  const { toast } = useToast();
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tagline, setTagline] = useState("");
  const [blurb, setBlurb] = useState("");
  const [headline, setHeadline] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroVideo, setHeroVideo] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    if (settings) {
      setPhone(settings.phone || "");
      setEmail(settings.email || "");
      setAddress(settings.address || "");
      setTagline(settings.tagline || "");
      setBlurb(settings.blurb || "");
      setHeadline(settings.headline || "Branding & Marketing That Drives Results");
      setHeroSubtitle(settings.heroSubtitle || "For Brands and Businesses Across Bangladesh & Beyond");
      setHeroVideo(settings.heroVideo || "/videos/hero.mp4");
      setFacebook(settings.social?.facebook || "");
      setInstagram(settings.social?.instagram || "");
      setLinkedin(settings.social?.linkedin || "");
      setYoutube(settings.social?.youtube || "");
    }
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate(
      {
        phone,
        email,
        address,
        tagline,
        blurb,
        headline,
        heroSubtitle,
        heroVideo,
        social: {
          facebook,
          instagram,
          linkedin,
          youtube,
        },
      },
      {
        onSuccess: () => {
          toast.success("Site & agency settings saved successfully!");
        },
        onError: () => {
          toast.error("Failed to save settings. Please try again.");
        },
      }
    );

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

        {/* Home Hero Section & Background Video Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E3E5EC] gap-2">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-[#2954F5]" />
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Home Hero Banner &amp; Background Video
                </h2>
                <p className="text-xs text-[#5B5F6B]">
                  Configure the cinematic video loop, main title, and subtitle displayed on the homepage hero.
                </p>
              </div>
            </div>
            {heroVideo && heroVideo !== "/videos/hero.mp4" && (
              <button
                type="button"
                onClick={() => setHeroVideo("/videos/hero.mp4")}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors font-medium cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Default Video</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Hero Main Headline *
              </label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Branding & Marketing That Drives Results"
                className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Hero Subtitle / Tagline *
              </label>
              <input
                type="text"
                required
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="e.g. For Brands and Businesses Across Bangladesh & Beyond"
                className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-bold uppercase text-[#12151B]">
                Hero Background Video (Upload or Direct URL) *
              </label>

              {/* Cloudinary Video Upload */}
              <CloudinaryUploader
                label="Upload New Video to Cloudinary (MP4 / WebM)"
                folder="doorstep/hero"
                accept="video/*,video/mp4,video/webm"
                currentUrl={heroVideo}
                onUploadSuccess={(url) => setHeroVideo(url)}
              />

              {/* Or manual URL input */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                  Or Direct Video URL / Path
                </span>
                <div className="relative">
                  <Video className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={heroVideo}
                    onChange={(e) => setHeroVideo(e.target.value)}
                    placeholder="https://res.cloudinary.com/.../hero.mp4 or /videos/hero.mp4"
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>

              {/* Video Live Preview */}
              {heroVideo && (
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-700 block mb-2">
                    Current Video Preview:
                  </span>
                  <div className="relative rounded-xl overflow-hidden border border-[#E3E5EC] bg-[#12151B] max-w-xl h-48 sm:h-56 shadow-sm">
                    <video
                      key={heroVideo}
                      src={heroVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 pointer-events-none">
                      <div className="text-center text-white">
                        <p className="text-sm sm:text-base font-bold drop-shadow-sm font-display">
                          {headline || "Hero Headline Preview"}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-200 mt-1">
                          {heroSubtitle || "Hero subtitle preview"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                  placeholder="https://facebook.com/..."
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
                  placeholder="https://instagram.com/..."
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  LinkedIn Company URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/company/..."
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/..."
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
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

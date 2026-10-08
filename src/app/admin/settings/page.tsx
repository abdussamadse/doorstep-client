"use client";

import React, { useState, useEffect } from "react";
import { AgencyInfo } from "@/data/agencyData";
import { Save, Check, Building, Phone, Mail, MapPin, Globe, Video, Film, RefreshCw, BarChart3, Activity, Search } from "lucide-react";
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
  const [fbPixelId, setFbPixelId] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");

  // Dynamic SEO State
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("https://doorstepltdbd.com/");
  const [ogImage, setOgImage] = useState("");
  const [noIndex, setNoIndex] = useState(false);

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
      setFbPixelId(settings.fbPixelId || "");
      setGoogleAnalyticsId(settings.googleAnalyticsId || "");
      setMetaTitle(settings.seo?.metaTitle || "Doorstep Limited - Marketing & Branding Agency Dhaka");
      setMetaDescription(
        settings.seo?.metaDescription ||
          "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh."
      );
      setKeywords(settings.seo?.keywords || "branding, digital marketing, creative agency, packaging design, Dhaka, Bangladesh");
      setCanonicalUrl(settings.seo?.canonicalUrl || "https://doorstepltdbd.com/");
      setOgImage(settings.seo?.ogImage || "");
      setNoIndex(Boolean(settings.seo?.noIndex));
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
        fbPixelId: fbPixelId.trim(),
        googleAnalyticsId: googleAnalyticsId.trim(),
        seo: {
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
          keywords: keywords.trim(),
          canonicalUrl: canonicalUrl.trim() || "https://doorstepltdbd.com/",
          ogImage: ogImage.trim(),
          noIndex,
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

        {/* Dynamic SEO Configuration (Targeted for https://doorstepltdbd.com/) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E5EC] gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                    Search Engine Optimization (SEO)
                  </h2>
                  <span className="text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-mono">
                    {canonicalUrl || "https://doorstepltdbd.com/"}
                  </span>
                </div>
                <p className="text-xs text-[#5B5F6B]">
                  Manage meta titles, search descriptions, keywords, social share image, and Google ranking settings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium ${!noIndex ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${!noIndex ? "bg-emerald-500" : "bg-amber-500"}`} />
                Status: {!noIndex ? "Indexed by Google" : "NoIndex (Hidden)"}
              </span>
            </div>
          </div>

          {/* Google Search Result Live Preview Card */}
          <div className="bg-[#F8F9FA] rounded-xl p-4 sm:p-5 border border-[#E3E5EC] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                Google Search Result Live Preview
              </span>
              <span className="text-[11px] text-gray-400 font-normal normal-case">
                Simulated search snippet
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs max-w-2xl font-sans transition-all">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] font-bold text-[#2954F5]">
                  D
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#202124] font-medium leading-none truncate">
                    Doorstep Limited
                  </p>
                  <p className="text-[10px] text-[#5f6368] font-mono leading-none truncate mt-0.5">
                    {canonicalUrl || "https://doorstepltdbd.com/"}
                  </p>
                </div>
              </div>
              <h3 className="text-[#1a0dab] hover:underline font-medium text-base sm:text-lg leading-snug cursor-pointer line-clamp-1">
                {metaTitle || "Doorstep Limited - Marketing & Branding Agency Dhaka"}
              </h3>
              <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2 mt-1">
                {metaDescription || "Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh."}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Target Canonical URL */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase text-[#12151B]">
                  Target Canonical Website Link *
                </label>
                <span className="text-[11px] text-[#2954F5] font-mono">
                  Primary indexed URL
                </span>
              </div>
              <input
                type="url"
                required
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://doorstepltdbd.com/"
                className="w-full text-xs sm:text-sm font-mono border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white transition-all shadow-xs"
              />
              <p className="text-[11px] text-[#5B5F6B] mt-1">
                All search engine authority and indexing will point to this canonical address.
              </p>
            </div>

            {/* SEO Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase text-[#12151B]">
                  SEO Meta Title (Title Tag) *
                </label>
                <span className={`text-[11px] font-mono ${metaTitle.length > 60 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {metaTitle.length}/60 chars (Recommended: 50-60)
                </span>
              </div>
              <input
                type="text"
                required
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Doorstep Limited - Marketing & Branding Agency Dhaka"
                className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white transition-all shadow-xs"
              />
            </div>

            {/* SEO Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase text-[#12151B]">
                  SEO Meta Description *
                </label>
                <span className={`text-[11px] font-mono ${metaDescription.length > 160 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {metaDescription.length}/160 chars (Recommended: 120-160)
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Full-service branding, digital marketing, creative content, packaging, and strategy agency in Dhaka, Bangladesh."
                className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white transition-all shadow-xs"
              />
            </div>

            {/* SEO Meta Keywords */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Meta Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="branding agency dhaka, digital marketing bangladesh, creative agency, packaging design"
                className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white transition-all shadow-xs"
              />
              <p className="text-[11px] text-[#5B5F6B] mt-1">
                Separate keywords or phrases with commas.
              </p>
            </div>

            {/* Social Share (OpenGraph) Image */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-2">
                Social Share Image (Facebook, WhatsApp &amp; LinkedIn Preview Banner)
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 w-full">
                  <input
                    type="url"
                    placeholder="https://res.cloudinary.com/... or /logo/80X80 px-01.png"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white shadow-xs"
                  />
                </div>
                <div className="shrink-0">
                  <CloudinaryUploader
                    label="Upload OG Banner"
                    accept="image/*"
                    onUploadSuccess={(url: string) => setOgImage(url)}
                  />
                </div>
              </div>

              {ogImage && (
                <div className="mt-3 flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-xl max-w-md">
                  <img
                    src={ogImage}
                    alt="Social Preview"
                    className="w-16 h-12 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-800 truncate">Preview banner active</p>
                    <p className="text-[10px] text-gray-500 truncate">{ogImage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOgImage("")}
                    className="text-xs text-red-500 hover:text-red-700 px-2 py-1 font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Search Engine Indexing Toggle */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <label className="text-xs sm:text-sm font-bold text-[#12151B] block">
                  Search Engine Visibility
                </label>
                <p className="text-xs text-[#5B5F6B]">
                  Uncheck if you want to temporarily hide this website from Google and other search crawlers.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!noIndex}
                  onChange={(e) => setNoIndex(!e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Marketing Analytics & Tracking (Facebook Pixel & Google Analytics) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E5EC] gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2954F5]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Marketing Analytics &amp; Tracking
                </h2>
                <p className="text-xs text-[#5B5F6B]">
                  Connect Meta (Facebook) Pixel &amp; Google Analytics to track visitor events &amp; ads performance.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium ${fbPixelId.trim() ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${fbPixelId.trim() ? "bg-emerald-500" : "bg-gray-400"}`} />
                Pixel: {fbPixelId.trim() ? "Active" : "Off"}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium ${googleAnalyticsId.trim() ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${googleAnalyticsId.trim() ? "bg-emerald-500" : "bg-gray-400"}`} />
                GA4: {googleAnalyticsId.trim() ? "Active" : "Off"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook Pixel */}
            <div className="p-4 sm:p-5 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-blue-50/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center font-bold text-xs">
                    f
                  </div>
                  <label className="text-xs font-bold uppercase tracking-wide text-[#12151B]">
                    Meta / Facebook Pixel ID
                  </label>
                </div>
                {fbPixelId.trim() ? (
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Connected
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                    Not configured
                  </span>
                )}
              </div>

              <input
                type="text"
                placeholder="e.g. 123456789012345"
                value={fbPixelId}
                onChange={(e) => setFbPixelId(e.target.value)}
                className="w-full text-xs sm:text-sm font-mono border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white transition-all shadow-sm"
              />

              <p className="text-[11px] leading-relaxed text-[#5B5F6B]">
                Enter your 15–16 digit Pixel ID from Meta Events Manager. Automatically tracks page views and SPA client route changes.
              </p>
            </div>

            {/* Google Analytics */}
            <div className="p-4 sm:p-5 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-amber-50/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <label className="text-xs font-bold uppercase tracking-wide text-[#12151B]">
                    Google Analytics (GA4) ID
                  </label>
                </div>
                {googleAnalyticsId.trim() ? (
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Connected
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                    Not configured
                  </span>
                )}
              </div>

              <input
                type="text"
                placeholder="e.g. G-ABC123XYZ0"
                value={googleAnalyticsId}
                onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                className="w-full text-xs sm:text-sm font-mono border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white transition-all shadow-sm"
              />

              <p className="text-[11px] leading-relaxed text-[#5B5F6B]">
                Enter your GA4 Measurement ID (starts with <span className="font-semibold text-gray-700">G-</span>) from Google Analytics Data Streams.
              </p>
            </div>
          </div>

          {/* Quick Notice / Tips */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs text-[#5B5F6B] flex items-start gap-2.5">
            <span className="text-[#2954F5] font-bold text-sm leading-none mt-0.5">ℹ</span>
            <div className="space-y-0.5 leading-relaxed">
              <span className="font-semibold text-[#12151B]">Dynamic &amp; Non-intrusive Injection:</span>{" "}
              Analytics scripts are only loaded in the visitor&apos;s browser when an ID is provided. Both scripts automatically record SPA route navigation across all pages without requiring page reloads.
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

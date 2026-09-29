"use client";

import React, { useState } from "react";
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_CATEGORIES,
  CaseStudy,
} from "@/data/agencyData";
import {
  X,
  Play,
  Film,
  Layers,
  Sparkles,
  Box,
} from "lucide-react";

export default function PortfolioClient() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("All");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Current Category Metadata
  const currentCategoryMeta =
    PORTFOLIO_CATEGORIES.find((c) => c.key === activeCategoryKey) ||
    PORTFOLIO_CATEGORIES[0];

  // Filtered portfolio items
  const filteredItems =
    activeCategoryKey === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategoryKey);

  return (
    <div className="space-y-10">
      {/* ========================================================
          1. CATEGORY FILTER TABS
      ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-[#E3E5EC] pb-6">
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const isActive = activeCategoryKey === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategoryKey(cat.key)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1E42D0] text-white shadow-md shadow-blue-600/25 scale-[1.02]"
                    : "bg-white text-[#5B5F6B] border border-[#E3E5EC] hover:text-[#1E42D0] hover:border-[#1E42D0]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* ========================================================
            2. ACTIVE CATEGORY HEADER & SUBTITLE
        ======================================================== */}
        <div className="bg-[#F8F9FC] border border-[#E3E5EC] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E51F25]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#12151B] tracking-tight">
                {currentCategoryMeta.name}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B5F6B] font-medium leading-relaxed">
              {currentCategoryMeta.subtitle}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E42D0] bg-white border border-[#E3E5EC] px-4 py-2 rounded-full w-fit">
            <span>{filteredItems.length} Featured Works</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. CATEGORY SPECIFIC GRID SHOWCASE
          (Cards only show Title on Top + Image/Video below)
      ======================================================== */}
      {/* --- A. REELS (9:16 VERTICAL CARDS) --- */}
      {activeCategoryKey === "REELS" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="bg-white border border-[#E3E5EC] rounded-2xl p-3 sm:p-4 hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Title on Top */}
              <div className="mb-2.5">
                <h3 className="font-bold text-xs sm:text-sm text-[#12151B] group-hover:text-[#1E42D0] transition-colors leading-snug line-clamp-1">
                  {item.title}
                </h3>
              </div>

              {/* 9:16 Vertical Video / Thumbnail */}
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-[#0D0F17]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Duration Badge */}
                {item.duration && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur-md text-white">
                    {item.duration}
                  </span>
                )}

                {/* Reel Badge */}
                <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E51F25] text-white">
                  <Film className="w-2.5 h-2.5" />
                  <span>Reel</span>
                </span>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E51F25] transition-all shadow-xl">
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- B. COMMERCIAL (16:9 WIDESCREEN CINEMA CARDS) --- */}
      {activeCategoryKey === "COMMERCIAL" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="bg-white border border-[#E3E5EC] rounded-2xl p-4 sm:p-5 hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Title on Top */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-bold text-base sm:text-lg text-[#12151B] group-hover:text-[#1E42D0] transition-colors leading-snug line-clamp-1">
                  {item.title}
                </h3>
                {item.duration && (
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/5 text-[#5B5F6B]">
                    {item.duration}
                  </span>
                )}
              </div>

              {/* 16:9 Widescreen Video / Thumbnail */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0D0F17]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E51F25] transition-all shadow-xl">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- C. STATIC (1:1 SQUARE CREATIVES) --- */}
      {activeCategoryKey === "STATIC" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="bg-white border border-[#E3E5EC] rounded-2xl p-4 sm:p-5 hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Title on Top */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-bold text-base sm:text-lg text-[#12151B] group-hover:text-[#1E42D0] transition-colors leading-snug line-clamp-1">
                  {item.title}
                </h3>
                {item.slidesCount && (
                  <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1E42D0]/10 text-[#1E42D0]">
                    <Layers className="w-3 h-3" />
                    <span>{item.slidesCount} Slides</span>
                  </span>
                )}
              </div>

              {/* 1:1 Square Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F4F5F8]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- D. MOTION (16:9 DYNAMIC MOTION CARDS) --- */}
      {activeCategoryKey === "MOTION" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="bg-white border border-[#E3E5EC] rounded-2xl p-4 sm:p-5 hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Title on Top */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-bold text-base sm:text-lg text-[#12151B] group-hover:text-[#1E42D0] transition-colors leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1E42D0] text-white">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Motion</span>
                </span>
              </div>

              {/* 16:9 Motion Preview */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0D0F17]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E51F25] transition-all shadow-xl">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- E. PACKAGING & PRINT DESIGN (4:3 PRODUCT CARDS) --- */}
      {activeCategoryKey === "PACKAGING & PRINT DESIGN" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="bg-white border border-[#E3E5EC] rounded-2xl p-4 sm:p-5 hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Title on Top */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-bold text-base sm:text-lg text-[#12151B] group-hover:text-[#1E42D0] transition-colors leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/5 text-[#12151B]">
                  <Box className="w-2.5 h-2.5 text-[#E51F25]" />
                  <span>Print</span>
                </span>
              </div>

              {/* 4:3 Packaging Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4F5F8]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- F. ALL CATEGORIES (RESPONSIVE GRID SHOWING TITLE ON TOP + MEDIA) --- */}
      {activeCategoryKey === "All" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="bg-white border border-[#E3E5EC] rounded-2xl p-4 sm:p-5 hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Title on Top */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-bold text-base sm:text-lg text-[#12151B] group-hover:text-[#1E42D0] transition-colors leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1E42D0]/10 text-[#1E42D0]">
                  {item.category}
                </span>
              </div>

              {/* Media: Image or Video */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0D0F17]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Video Play Icon if Video */}
                {item.mediaType === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E51F25] transition-all shadow-xl">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Duration Badge if applicable */}
                {item.duration && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur-md text-white">
                    {item.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================
          4. INTERACTIVE MODAL
          (Media on top, and Below: Title & Description)
      ======================================================== */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-[#E3E5EC] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer z-30"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* 1. MEDIA ON TOP (ইমেজ বা ভিডিও ক্যাটাগরি অনুযায়ী) */}
              {selectedCase.mediaType === "video" ? (
                <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-lg">
                  {selectedCase.aspectRatio === "9:16" ? (
                    // Vertical Reel Player
                    <div className="max-w-[280px] sm:max-w-[320px] mx-auto aspect-[9/16] bg-black">
                      <video
                        src={selectedCase.videoUrl || "/videos/hero.mp4"}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    // Widescreen 16:9 Video Player
                    <div className="aspect-[16/9] w-full bg-black">
                      <video
                        src={selectedCase.videoUrl || "/videos/hero.mp4"}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ) : (
                // Image Preview for Static & Packaging
                <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 max-h-[460px] flex items-center justify-center">
                  <img
                    src={selectedCase.thumbnail}
                    alt={selectedCase.title}
                    className="w-full max-h-[460px] object-cover"
                  />
                </div>
              )}

              {/* 2. TITLE BELOW MEDIA (ইমেজ বা ভিডিও এর নিচে টাইটেল) */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E42D0] text-white">
                    {selectedCase.category}
                  </span>
                  <span className="text-xs font-semibold text-[#5B5F6B] uppercase tracking-wider">
                    {selectedCase.clientType}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#12151B] tracking-tight pt-1">
                  {selectedCase.title}
                </h3>
              </div>

              {/* 3. DESCRIPTION BELOW TITLE (এন্ড ডেসক্রিপশন) */}
              <div className="pt-2 border-t border-[#F0F2F6] space-y-3">
                <p className="text-sm sm:text-base text-[#12151B] leading-relaxed font-normal">
                  {selectedCase.summary}
                </p>
                {selectedCase.solution && (
                  <p className="text-xs sm:text-sm text-[#5B5F6B] leading-relaxed">
                    {selectedCase.solution}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

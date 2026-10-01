"use client";

import React, { useState } from "react";
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_CATEGORIES,
  CaseStudy,
} from "@/data/agencyData";
import { Play } from "lucide-react";

// Ordered categories matching the exact serial requested:
// 1. Static (4:5)
// 2. Reels (9:16)
// 3. Motion (9:16 - exact same as Reels)
// 4. Commercial (16:9)
// 5. Packaging & Print Design (4:5)
const ORDERED_CATEGORIES = [
  {
    key: "STATIC",
    name: "Static",
    subtitle: "Social media posts, carousel, promotional creatives",
    aspect: "aspect-[4/5]",
    gridClass: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
  },
  {
    key: "REELS",
    name: "Reels",
    subtitle: "Short form vertical videos, food reels, promotional reels",
    aspect: "aspect-[9/16]",
    gridClass: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
  },
  {
    key: "MOTION",
    name: "Motion",
    subtitle: "Motion graphics, animated posts, typography animation, logo animation",
    aspect: "aspect-[9/16]",
    gridClass: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
  },
  {
    key: "COMMERCIAL",
    name: "Commercial",
    subtitle: "16:9 landscape video, TV screen content, brand promotional video, food commercial",
    aspect: "aspect-[16/9]",
    gridClass: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  },
  {
    key: "PACKAGING & PRINT DESIGN",
    name: "Packaging & Print Design",
    subtitle: "Food packaging, takeaway box, cup, bag, label, menu, flyer, poster, Signage",
    aspect: "aspect-[4/5]",
    gridClass: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
  },
] as const;

function PortfolioCard({
  item,
  aspectClass,
  isPlaying,
  onPlay,
}: {
  item: CaseStudy;
  aspectClass: string;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-[#E3E5EC] bg-[#0D0F17] hover:border-[#12151B] hover:shadow-xl transition-all duration-300 group ${aspectClass}`}
    >
      {item.mediaType === "video" ? (
        isPlaying ? (
          <video
            src={item.videoUrl || "/videos/hero.mp4"}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors pointer-events-none" />

            {/* Center Play Button (Plays inline on page) */}
            <button
              type="button"
              onClick={onPlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
              aria-label={`Play ${item.title}`}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 text-[#1E42D0] hover:bg-[#E51F25] hover:text-white flex items-center justify-center transition-all shadow-xl hover:scale-110">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
              </div>
            </button>
          </div>
        )
      ) : (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function PortfolioClient() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("All");
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});

  const handlePlayVideo = (id: string) => {
    setPlayingVideos((prev) => ({ ...prev, [id]: true }));
  };

  // Current single Category Metadata if not "All"
  const currentCategoryMeta =
    PORTFOLIO_CATEGORIES.find((c) => c.key === activeCategoryKey) ||
    PORTFOLIO_CATEGORIES[0];

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
            2. ACTIVE CATEGORY HEADER (When specific category tab selected)
        ======================================================== */}
        {activeCategoryKey !== "All" && (
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
              <span>
                {
                  PORTFOLIO_ITEMS.filter((i) => i.category === activeCategoryKey)
                    .length
                }{" "}
                Works
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          3. PORTFOLIO SHOWCASE
      ======================================================== */}
      {activeCategoryKey === "All" ? (
        // --- ALL TAB: CATEGORIES IN EXACT SERIAL ORDER ---
        <div className="space-y-12 sm:space-y-16">
          {ORDERED_CATEGORIES.map((cat) => {
            const items = PORTFOLIO_ITEMS.filter(
              (item) => item.category === cat.key
            );
            if (items.length === 0) return null;

            return (
              <section key={cat.key} className="space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-[#E3E5EC]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2954F5]" />
                    <h3 className="text-xl sm:text-2xl font-bold text-[#12151B] tracking-tight">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B5F6B]">
                    {cat.subtitle}
                  </p>
                </div>

                <div className={cat.gridClass}>
                  {items.map((item) => (
                    <PortfolioCard
                      key={item.id}
                      item={item}
                      aspectClass={cat.aspect}
                      isPlaying={Boolean(playingVideos[item.id])}
                      onPlay={() => handlePlayVideo(item.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // --- SINGLE CATEGORY TAB ---
        (() => {
          const selectedConfig = ORDERED_CATEGORIES.find(
            (c) => c.key === activeCategoryKey
          ) || {
            aspect: "aspect-[4/5]",
            gridClass:
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
          };
          const items = PORTFOLIO_ITEMS.filter(
            (item) => item.category === activeCategoryKey
          );

          return (
            <div className={selectedConfig.gridClass}>
              {items.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  aspectClass={selectedConfig.aspect}
                  isPlaying={Boolean(playingVideos[item.id])}
                  onPlay={() => handlePlayVideo(item.id)}
                />
              ))}
            </div>
          );
        })()
      )}
    </div>
  );
}

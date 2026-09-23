"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_ITEMS, CaseStudy } from "@/data/agencyData";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  TrendingUp,
} from "lucide-react";

const CATEGORIES = ["All", "Branding", "Digital", "Packaging", "Strategy"] as const;

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-16">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E3E5EC] pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                isActive
                  ? "bg-[#12151B] text-white"
                  : "bg-white text-[#5B5F6B] border border-[#E3E5EC] hover:text-[#12151B] hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Case Study Cards (NO BADGES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="bg-white border border-[#E3E5EC] rounded-2xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#12151B] hover:shadow-xl transition-all group"
          >
            <div>
              {/* Header Meta (Clean Typography, No Badges) */}
              <div className="flex items-center justify-between text-xs text-[#5B5F6B] mb-4">
                <span className="font-semibold uppercase tracking-wider text-[#2954F5]">
                  {item.clientType}
                </span>
                <span className="font-mono text-gray-400">{item.year}</span>
              </div>

              {/* Title & Summary */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#12151B] group-hover:text-[#2954F5] transition-colors tracking-tight">
                {item.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#5B5F6B] leading-relaxed">
                {item.summary}
              </p>

              {/* Key Results */}
              <div className="mt-6 pt-6 border-t border-[#F4F5F8] space-y-2">
                <span className="text-xs font-bold text-[#12151B] block">
                  Measured Commercial Outcomes:
                </span>
                <div className="space-y-1.5">
                  {item.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 text-xs font-medium text-[#12151B]">
                      <TrendingUp className="w-3.5 h-3.5 text-[#2954F5] shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with Scope List & Modal Trigger */}
            <div className="mt-8 pt-6 border-t border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#5B5F6B]">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="font-medium">
                    {tag}
                    {tIdx < item.tags.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedCase(item)}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#12151B] hover:text-[#2954F5] shrink-0 group-hover:translate-x-1 transition-all cursor-pointer"
              >
                <span>Full Case Brief</span>
                <ArrowUpRight className="w-4 h-4 text-[#2954F5]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 sm:p-12 shadow-2xl border border-[#E3E5EC] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-8 right-8 p-2 rounded-full text-gray-400 hover:text-[#12151B] hover:bg-[#F4F5F8] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2954F5]">
                  {selectedCase.clientType} · {selectedCase.year}
                </p>
                <h3 className="text-3xl font-bold text-[#12151B] mt-1 tracking-tight">
                  {selectedCase.title}
                </h3>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4 text-sm text-[#12151B] leading-relaxed">
                <div className="p-5 bg-[#F4F5F8] rounded-xl border border-[#E3E5EC]">
                  <h4 className="font-bold text-[#12151B] mb-1">The Challenge:</h4>
                  <p className="text-[#5B5F6B]">{selectedCase.challenge}</p>
                </div>
                <div className="p-5 bg-[#F4F5F8] rounded-xl border border-[#E3E5EC]">
                  <h4 className="font-bold text-[#12151B] mb-1">Our Strategy &amp; Solution:</h4>
                  <p className="text-[#5B5F6B]">{selectedCase.solution}</p>
                </div>
              </div>

              {/* Deliverables & Outcomes */}
              <div>
                <h4 className="text-xs font-bold text-[#12151B] mb-2">
                  Delivered Scope:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#F4F5F8] rounded-md text-xs font-medium text-[#12151B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Commercial Results */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-[#12151B] mb-2">
                  Measured Commercial Results:
                </h4>
                <ul className="space-y-2">
                  {selectedCase.results.map((res, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm font-semibold text-[#12151B]">
                      <CheckCircle2 className="w-4 h-4 text-[#2954F5]" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal CTA */}
              <div className="pt-6 border-t border-[#E3E5EC] flex items-center justify-between">
                <span className="text-xs text-[#5B5F6B]">
                  Looking for similar results?
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#2954F5] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1B3BC9] transition-colors"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  PORTFOLIO_CATEGORIES,
  CaseStudy,
  PortfolioCategory,
} from "@/data/agencyData";
import {
  PlusCircle,
  Trash2,
  Edit2,
  Play,
  Film,
  Layers,
  Sparkles,
  Box,
  X,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  getStoredData,
  setStoredData,
  CMS_KEYS,
  INITIAL_CMS_DATA,
} from "@/lib/cmsStore";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<CaseStudy[]>(INITIAL_CMS_DATA.portfolio);
  const [filterCat, setFilterCat] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CaseStudy | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<PortfolioCategory>("STATIC");
  const [formMediaType, setFormMediaType] = useState<"image" | "video">("image");
  const [formThumbnail, setFormThumbnail] = useState("");
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formDuration, setFormDuration] = useState("");

  useEffect(() => {
    const data = getStoredData<CaseStudy[]>(
      CMS_KEYS.PORTFOLIO,
      INITIAL_CMS_DATA.portfolio
    );
    setItems(data);
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormCategory("STATIC");
    setFormMediaType("image");
    setFormThumbnail("/img/services/brand-identity.jpg");
    setFormVideoUrl("");
    setFormDuration("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CaseStudy) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormMediaType(item.mediaType === "video" ? "video" : "image");
    setFormThumbnail(item.thumbnail);
    setFormVideoUrl(item.videoUrl || "");
    setFormDuration(item.duration || "");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this portfolio work?")) return;
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    setStoredData(CMS_KEYS.PORTFOLIO, updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Auto determine aspect ratio based on category
    let aspect: CaseStudy["aspectRatio"] = "4:5";
    if (formCategory === "REELS" || formCategory === "MOTION") {
      aspect = "9:16";
    } else if (formCategory === "COMMERCIAL") {
      aspect = "16:9";
    } else {
      aspect = "4:5";
    }

    if (editingItem) {
      // Update
      const updated = items.map((i) =>
        i.id === editingItem.id
          ? {
              ...i,
              title: formTitle,
              category: formCategory,
              mediaType: formMediaType,
              aspectRatio: aspect,
              thumbnail: formThumbnail,
              videoUrl: formMediaType === "video" ? formVideoUrl : undefined,
              duration: formDuration || undefined,
            }
          : i
      );
      setItems(updated);
      setStoredData(CMS_KEYS.PORTFOLIO, updated);
    } else {
      // Create new
      const newItem: CaseStudy = {
        id: `work-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        clientType: `${formCategory} Production`,
        summary: "Created by Doorstep Limited creative studio team.",
        challenge: "Brand growth brief.",
        solution: "Execution with strategic craft.",
        tags: [formCategory],
        results: ["100% Client Satisfaction"],
        year: "2024",
        color: "#1E42D0",
        mediaType: formMediaType,
        aspectRatio: aspect,
        thumbnail: formThumbnail || "/img/services/creative-content.jpg",
        videoUrl: formMediaType === "video" ? formVideoUrl || "/videos/hero.mp4" : undefined,
        duration: formDuration || undefined,
      };
      const updated = [newItem, ...items];
      setItems(updated);
      setStoredData(CMS_KEYS.PORTFOLIO, updated);
    }

    setIsModalOpen(false);
  };

  const filteredItems =
    filterCat === "All"
      ? items
      : items.filter((item) => item.category === filterCat);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E3E5EC]">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Portfolio Management
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">Portfolio Works CMS</h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Add, update, or remove portfolio items across all 5 production disciplines.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2954F5] text-white font-semibold text-xs hover:bg-[#1E42D0] transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Work</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E3E5EC] pb-4">
        {PORTFOLIO_CATEGORIES.map((cat) => {
          const isActive = filterCat === cat.key;
          const count =
            cat.key === "All"
              ? items.length
              : items.filter((i) => i.category === cat.key).length;

          return (
            <button
              key={cat.key}
              onClick={() => setFilterCat(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#1E42D0] text-white shadow-xs"
                  : "bg-white text-[#5B5F6B] border border-[#E3E5EC] hover:text-[#1E42D0]"
              }`}
            >
              <span>{cat.name}</span>
              <span className="ml-1.5 opacity-80 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E3E5EC] p-3 hover:border-gray-400 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div>
              {/* Media Preview Box */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black mb-3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {item.mediaType === "video" && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E51F25] text-white flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Video</span>
                  </span>
                )}

                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/70 text-white">
                  {item.aspectRatio}
                </span>
              </div>

              {/* Title & Category */}
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2954F5] block">
                {item.category}
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-[#12151B] mt-0.5 line-clamp-2 leading-snug">
                {item.title}
              </h3>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#F4F5F8] mt-3 flex items-center justify-between">
              <button
                onClick={() => handleOpenEdit(item)}
                className="inline-flex items-center gap-1 text-xs text-[#2954F5] font-semibold hover:underline cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold hover:underline cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================
          MODAL: ADD / EDIT PORTFOLIO WORK
      ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3E5EC] max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3E5EC] pb-3">
              <h2 className="text-lg font-bold text-[#12151B]">
                {editingItem ? "Edit Portfolio Work" : "Add New Portfolio Work"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Title / Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. SomBoon Thai — Signature Pour Reel"
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 focus:border-[#2954F5] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      const cat = e.target.value as PortfolioCategory;
                      setFormCategory(cat);
                      if (cat === "REELS" || cat === "MOTION" || cat === "COMMERCIAL") {
                        setFormMediaType("video");
                      } else {
                        setFormMediaType("image");
                      }
                    }}
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3 py-2.5 bg-white font-medium outline-none"
                  >
                    <option value="STATIC">Static (4:5)</option>
                    <option value="REELS">Reels (9:16)</option>
                    <option value="MOTION">Motion (9:16)</option>
                    <option value="COMMERCIAL">Commercial (16:9)</option>
                    <option value="PACKAGING & PRINT DESIGN">Packaging &amp; Print (4:5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Media Format *
                  </label>
                  <select
                    value={formMediaType}
                    onChange={(e) => setFormMediaType(e.target.value as "image" | "video")}
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3 py-2.5 bg-white font-medium outline-none"
                  >
                    <option value="image">Image (Static / Print)</option>
                    <option value="video">Video (Reel / Motion / Commercial)</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary Direct Uploader */}
              <CloudinaryUploader
                label="Direct Media Upload to Cloudinary (Optional)"
                folder="doorstep/portfolio"
                accept={formMediaType === "video" ? "video/*,image/*" : "image/*"}
                onUploadSuccess={(url) => {
                  if (formMediaType === "video" && url.match(/\.(mp4|webm|mov|m4v)$/i)) {
                    setFormVideoUrl(url);
                  } else {
                    setFormThumbnail(url);
                  }
                }}
              />

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Thumbnail Image Path / Cloudinary URL *
                </label>
                <input
                  type="text"
                  required
                  value={formThumbnail}
                  onChange={(e) => setFormThumbnail(e.target.value)}
                  placeholder="/img/somboon.jpeg or Cloudinary CDN link"
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 focus:border-[#2954F5] outline-none"
                />
              </div>

              {formMediaType === "video" && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                      Video File Cloudinary URL / Path *
                    </label>
                    <input
                      type="text"
                      value={formVideoUrl}
                      onChange={(e) => setFormVideoUrl(e.target.value)}
                      placeholder="/videos/hero.mp4 or Cloudinary video link"
                      className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 focus:border-[#2954F5] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                      Duration (Optional)
                    </label>
                    <input
                      type="text"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      placeholder="e.g. 0:30"
                      className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 focus:border-[#2954F5] outline-none"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-[#E3E5EC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E3E5EC] text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2954F5] text-white text-xs font-semibold hover:bg-[#1E42D0] transition-colors cursor-pointer"
                >
                  {editingItem ? "Update Work" : "Create Work"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

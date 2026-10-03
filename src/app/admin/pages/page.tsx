"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Check,
  FileText,
  Home,
  Briefcase,
  GitBranch,
  Users,
  Mail,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
} from "lucide-react";
import { usePageContent, useUpdatePageContent } from "@/hooks/useCMS";
import { DEFAULT_PAGE_CONTENT, PageContentData } from "@/data/pageContentData";
import { useToast } from "@/providers/ToastProvider";
import { useConfirm } from "@/providers/ConfirmModalProvider";

type PageTab = "home" | "portfolio" | "howWeWork" | "ourTeam" | "contact";

export default function AdminPagesCMS() {
  const { data: pageContent, isLoading } = usePageContent();
  const updateMutation = useUpdatePageContent();
  const { toast } = useToast();
  const confirm = useConfirm();

  const [activeTab, setActiveTab] = useState<PageTab>("home");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<PageContentData>(DEFAULT_PAGE_CONTENT);

  useEffect(() => {
    if (pageContent) {
      setFormData({
        home: { ...DEFAULT_PAGE_CONTENT.home, ...pageContent.home },
        portfolio: { ...DEFAULT_PAGE_CONTENT.portfolio, ...pageContent.portfolio },
        howWeWork: { ...DEFAULT_PAGE_CONTENT.howWeWork, ...pageContent.howWeWork },
        ourTeam: { ...DEFAULT_PAGE_CONTENT.ourTeam, ...pageContent.ourTeam },
        contact: { ...DEFAULT_PAGE_CONTENT.contact, ...pageContent.contact },
      });
    }
  }, [pageContent]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("All page static content saved successfully!");
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      },
      onError: () => {
        toast.error("Failed to save page content. Please try again.");
      },
    });
  };

  const handleResetToDefault = () => {
    confirm({
      title: "Reset to Default Copy?",
      message:
        "Are you sure you want to restore the default agency copy for this section? Any unsaved edits will be replaced.",
      confirmText: "Yes, Reset",
      cancelText: "Keep My Changes",
      variant: "warning",
      icon: "alert",
      onConfirm: () => {
        setFormData((prev) => ({
          ...prev,
          [activeTab]: DEFAULT_PAGE_CONTENT[activeTab],
        }));
        toast.info(`Restored default content for ${activeTab} page.`);
      },
    });
  };

  const tabs = [
    { id: "home", label: "Home Page", icon: Home },
    { id: "portfolio", label: "Portfolio Page", icon: Briefcase },
    { id: "howWeWork", label: "How We Work", icon: GitBranch },
    { id: "ourTeam", label: "Our Team", icon: Users },
    { id: "contact", label: "Contact Page", icon: Mail },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Global Content Management
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">
            Pages Static Content CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Dynamically edit editorial copy, section headings, manifesto statements, and call-to-actions across all pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved!</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors cursor-pointer"
            title="Reset current tab to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Section</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E3E5EC] pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as PageTab)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#2954F5] text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-[#E3E5EC]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ========================================================
            TAB 1: HOME PAGE CONTENT
        ======================================================== */}
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* 1. Manifesto Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <Sparkles className="w-5 h-5 text-[#2954F5]" />
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                    Editorial Manifesto (About Agency Intro)
                  </h2>
                  <p className="text-xs text-[#5B5F6B]">
                    Shown right beneath the video banner on the homepage.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Main Headline (First Sentence) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.home.manifestoTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        home: { ...formData.home, manifestoTitle: e.target.value },
                      })
                    }
                    placeholder="We create brand experiences that inspire behavior."
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Highlight Subtitle (Second Sentence) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.home.manifestoSubtitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          manifestoSubtitle: e.target.value,
                        },
                      })
                    }
                    placeholder="Spinning incredible stories – from emerging startups to household names."
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Manifesto Paragraph Body *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.home.manifestoDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        home: { ...formData.home, manifestoDesc: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Services & Methodology Section Titles */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <FileText className="w-5 h-5 text-[#E51F25]" />
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                    Home Section Titles &amp; Introductions
                  </h2>
                  <p className="text-xs text-[#5B5F6B]">
                    Customize the intro headers for Services &amp; Methodology blocks on the home page.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                      Services Section Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.home.servicesTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          home: { ...formData.home, servicesTitle: e.target.value },
                        })
                      }
                      className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                      Services Section Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.home.servicesDesc}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          home: { ...formData.home, servicesDesc: e.target.value },
                        })
                      }
                      className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                      Methodology Section Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.home.methodologyTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          home: {
                            ...formData.home,
                            methodologyTitle: e.target.value,
                          },
                        })
                      }
                      className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                      Methodology Section Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.home.methodologyDesc}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          home: {
                            ...formData.home,
                            methodologyDesc: e.target.value,
                          },
                        })
                      }
                      className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Bottom CTA Banner */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <ArrowRight className="w-5 h-5 text-[#2954F5]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Home Bottom CTA Banner
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    CTA Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.home.ctaTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        home: { ...formData.home, ctaTitle: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Button Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.home.ctaButtonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        home: { ...formData.home, ctaButtonText: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    CTA Description Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.home.ctaDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        home: { ...formData.home, ctaDesc: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: PORTFOLIO PAGE CONTENT
        ======================================================== */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <Briefcase className="w-5 h-5 text-[#2954F5]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Portfolio Page Hero Header
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Hero Main Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.portfolio.heroTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolio: {
                          ...formData.portfolio,
                          heroTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Hero Subtitle / Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.portfolio.heroDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolio: {
                          ...formData.portfolio,
                          heroDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <ArrowRight className="w-5 h-5 text-[#E51F25]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Portfolio Bottom CTA Banner
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    CTA Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.portfolio.ctaTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolio: {
                          ...formData.portfolio,
                          ctaTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Button Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.portfolio.ctaButtonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolio: {
                          ...formData.portfolio,
                          ctaButtonText: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    CTA Description Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.portfolio.ctaDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolio: {
                          ...formData.portfolio,
                          ctaDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: HOW WE WORK PAGE CONTENT
        ======================================================== */}
        {activeTab === "howWeWork" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <GitBranch className="w-5 h-5 text-[#2954F5]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  How We Work Hero Header
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Hero Main Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.howWeWork.heroTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        howWeWork: {
                          ...formData.howWeWork,
                          heroTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Hero Subtitle / Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.howWeWork.heroDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        howWeWork: {
                          ...formData.howWeWork,
                          heroDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <ArrowRight className="w-5 h-5 text-[#E51F25]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  How We Work Bottom CTA Banner
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    CTA Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.howWeWork.ctaTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        howWeWork: {
                          ...formData.howWeWork,
                          ctaTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Button Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.howWeWork.ctaButtonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        howWeWork: {
                          ...formData.howWeWork,
                          ctaButtonText: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    CTA Description Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.howWeWork.ctaDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        howWeWork: {
                          ...formData.howWeWork,
                          ctaDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: OUR TEAM PAGE CONTENT
        ======================================================== */}
        {activeTab === "ourTeam" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <Users className="w-5 h-5 text-[#2954F5]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Our Team Hero Header
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Hero Main Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ourTeam.heroTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ourTeam: {
                          ...formData.ourTeam,
                          heroTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Hero Subtitle / Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.ourTeam.heroDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ourTeam: {
                          ...formData.ourTeam,
                          heroDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <Sparkles className="w-5 h-5 text-[#E51F25]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Team Grid Section Title
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Section Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ourTeam.sectionTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ourTeam: {
                          ...formData.ourTeam,
                          sectionTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Section Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ourTeam.sectionDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ourTeam: {
                          ...formData.ourTeam,
                          sectionDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <ArrowRight className="w-5 h-5 text-[#2954F5]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Our Team Bottom CTA Banner
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    CTA Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ourTeam.ctaTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ourTeam: {
                          ...formData.ourTeam,
                          ctaTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Button Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ourTeam.ctaButtonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ourTeam: {
                          ...formData.ourTeam,
                          ctaButtonText: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    CTA Description Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ourTeam.ctaDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ourTeam: {
                          ...formData.ourTeam,
                          ctaDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: CONTACT PAGE CONTENT
        ======================================================== */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <Mail className="w-5 h-5 text-[#2954F5]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Contact Page Hero Header
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Hero Main Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact.heroTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          heroTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Hero Subtitle / Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.contact.heroDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          heroDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
                <FileText className="w-5 h-5 text-[#E51F25]" />
                <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                  Studio Location Section
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Studio Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact.studioTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          studioTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                    Studio Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact.studioDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          studioDesc: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button */}
        <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-[#E3E5EC]">
          <span className="text-xs text-[#5B5F6B]">
            All updates instantly reflect on the public website upon saving.
          </span>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2954F5] text-white font-semibold text-xs sm:text-sm hover:bg-[#1E42D0] transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Page Content</span>
          </button>
        </div>
      </form>
    </div>
  );
}

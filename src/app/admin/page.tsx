"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Layers,
  Users,
  Inbox,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";
import {
  useDashboardStats,
  useInquiries,
  useUpdateInquiryStatus,
  useSettings,
  usePortfolios,
  useServices,
  useTeam,
} from "@/hooks/useCMS";
import { InquiryItem } from "@/lib/cmsStore";

export default function AdminOverviewPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: inquiries = [] } = useInquiries();
  const { data: portfolio = [] } = usePortfolios();
  const { data: services = [] } = useServices();
  const { data: team = [] } = useTeam();
  const { data: settings } = useSettings();
  const updateStatusMutation = useUpdateInquiryStatus();

  const newInquiries = inquiries.filter((i) => i.status === "New");

  const handleUpdateStatus = (id: string, newStatus: InquiryItem["status"]) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  return (
    <div className="space-y-8">
      {/* ========================================================
          1. HEADER & WELCOME
      ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E5EC] shadow-xs">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Doorstep Control Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#12151B] tracking-tight">
            Website CMS &amp; Operations Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B] mt-1">
            Manage all frontend pages, media assets, team rosters, and client leads dynamically.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/portfolio"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2954F5] text-white font-semibold text-xs hover:bg-[#1E42D0] transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Portfolio Work</span>
          </Link>

          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E3E5EC] bg-white text-[#12151B] font-semibold text-xs hover:bg-gray-50 transition-colors"
          >
            <span>Site Settings</span>
          </Link>
        </div>
      </div>

      {/* ========================================================
          2. KEY METRICS GRID
      ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Portfolio Works */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] hover:border-[#2954F5] transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F6B]">
              Portfolio Works
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#2954F5]/10 text-[#2954F5] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#12151B]">{portfolio.length}</div>
            <div className="mt-2 text-xs text-[#5B5F6B] flex items-center justify-between">
              <span>5 Active Categories</span>
              <Link href="/admin/portfolio" className="text-[#2954F5] font-semibold hover:underline">
                Manage &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Metric 2: Leads & Inquiries */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] hover:border-[#E51F25] transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F6B]">
              Leads / Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#E51F25]/10 text-[#E51F25] flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#12151B]">{inquiries.length}</span>
              {newInquiries.length > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#E51F25] text-white">
                  {newInquiries.length} New
                </span>
              )}
            </div>
            <div className="mt-2 text-xs text-[#5B5F6B] flex items-center justify-between">
              <span>From Contact Form</span>
              <Link href="/admin/inquiries" className="text-[#E51F25] font-semibold hover:underline">
                View All &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Metric 3: Services */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] hover:border-[#2954F5] transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F6B]">
              Core Services
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#2954F5]/10 text-[#2954F5] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#12151B]">{services.length}</div>
            <div className="mt-2 text-xs text-[#5B5F6B] flex items-center justify-between">
              <span>All dynamic</span>
              <Link href="/admin/services" className="text-[#2954F5] font-semibold hover:underline">
                Edit &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Metric 4: Team Members */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] hover:border-[#12151B] transition-all shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B5F6B]">
              Team Members
            </span>
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-[#12151B] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#12151B]">{team.length}</div>
            <div className="mt-2 text-xs text-[#5B5F6B] flex items-center justify-between">
              <span>Leadership &amp; Talent</span>
              <Link href="/admin/team" className="text-[#12151B] font-semibold hover:underline">
                Manage &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. RECENT INQUIRIES & FAST ACTIONS
      ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column: Recent Inquiries Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E3E5EC] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E5EC]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#12151B]">
                Recent Inquiries &amp; Leads
              </h2>
              <p className="text-xs text-[#5B5F6B]">
                Live messages received from prospective clients on `/contact`
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-[#2954F5] hover:underline flex items-center gap-1"
            >
              <span>Full Inbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-xl border border-[#E3E5EC] hover:border-gray-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50"
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#12151B]">{inq.name}</span>
                    {inq.company && (
                      <span className="text-xs text-[#5B5F6B]">({inq.company})</span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inq.status === "New"
                          ? "bg-red-100 text-red-700"
                          : inq.status === "Contacted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#2954F5]">
                    {inq.serviceNeeded}
                  </div>
                  <p className="text-xs text-[#5B5F6B] line-clamp-1">{inq.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      handleUpdateStatus(inq.id, e.target.value as InquiryItem["status"])
                    }
                    className="text-xs border border-[#E3E5EC] rounded-lg px-2.5 py-1.5 bg-white font-medium cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <a
                    href={`mailto:${inq.email}`}
                    className="p-1.5 rounded-lg border border-[#E3E5EC] bg-white text-gray-700 hover:text-black hover:bg-gray-100"
                    title={`Email ${inq.email}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Fast Overview / Live Settings Card */}
        <div className="space-y-6">
          <div className="bg-[#12151B] text-white rounded-2xl p-6 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2954F5] bg-white/10 px-2.5 py-1 rounded">
                Live Agency Details
              </span>
              <Link href="/admin/settings" className="text-xs text-blue-400 hover:underline">
                Edit
              </Link>
            </div>

            <div className="space-y-3 text-xs text-gray-300">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-mono">
                  Agency Name
                </span>
                <span className="font-bold text-white text-sm">Doorstep Limited</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-mono">
                  Phone Number
                </span>
                <span className="font-mono text-white">{settings?.phone || "+880 1700-000000"}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-mono">
                  Official Email
                </span>
                <span className="text-white">{settings?.email || "hello@doorstepltd.com"}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-mono">
                  Office Studio
                </span>
                <span className="text-white leading-relaxed">{settings?.address || "Kolabagan, Dhaka, Bangladesh"}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-800">
              <Link
                href="/contact"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                <span>Test Live Contact Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-2xl border border-[#E3E5EC] p-6 space-y-3 shadow-xs">
            <h3 className="font-bold text-sm text-[#12151B]">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/admin/how-we-work"
                className="p-2.5 rounded-xl border border-[#E3E5EC] hover:border-[#2954F5] hover:text-[#2954F5] transition-colors font-medium text-center"
              >
                Methodology CMS
              </Link>
              <Link
                href="/admin/clients"
                className="p-2.5 rounded-xl border border-[#E3E5EC] hover:border-[#2954F5] hover:text-[#2954F5] transition-colors font-medium text-center"
              >
                Client Logos
              </Link>
              <Link
                href="/admin/services"
                className="p-2.5 rounded-xl border border-[#E3E5EC] hover:border-[#2954F5] hover:text-[#2954F5] transition-colors font-medium text-center"
              >
                Services List
              </Link>
              <Link
                href="/admin/team"
                className="p-2.5 rounded-xl border border-[#E3E5EC] hover:border-[#2954F5] hover:text-[#2954F5] transition-colors font-medium text-center"
              >
                Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

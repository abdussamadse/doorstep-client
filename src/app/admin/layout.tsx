"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  GitBranch,
  Users,
  Handshake,
  Inbox,
  Settings,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell,
  LogOut,
} from "lucide-react";
import { getStoredData, CMS_KEYS, InquiryItem, INITIAL_CMS_DATA } from "@/lib/cmsStore";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Methodology", href: "/admin/how-we-work", icon: GitBranch },
  { name: "Team Members", href: "/admin/team", icon: Users },
  { name: "Client Brands", href: "/admin/clients", icon: Handshake },
  { name: "Leads & Inquiries", href: "/admin/inquiries", icon: Inbox, hasBadge: true },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const inquiries = getStoredData<InquiryItem[]>(
        CMS_KEYS.INQUIRIES,
        INITIAL_CMS_DATA.inquiries
      );
      setNewInquiriesCount(inquiries.filter((i) => i.status === "New").length);
    };

    updateCount();
    window.addEventListener("doorstep_cms_updated", updateCount);
    return () => window.removeEventListener("doorstep_cms_updated", updateCount);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#12151B] flex flex-col lg:flex-row antialiased">
      {/* ========================================================
          1. DESKTOP SIDEBAR
      ======================================================== */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-[#12151B] text-white shrink-0 border-r border-gray-800">
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="bg-white/10 p-2 rounded-xl border border-white/15 group-hover:scale-105 transition-transform">
              <Image
                src="/logo/32X32px-01.png"
                alt="Doorstep Limited"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <span className="font-display font-bold text-base tracking-tight text-white block">
                Doorstep <span className="text-[#E51F25]">Admin</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase block">
                Control Hub v1.0
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Navigation Menu
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#2954F5] text-white shadow-md shadow-blue-500/20"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.hasBadge && newInquiriesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E51F25] text-white">
                    {newInquiriesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
              View
            </span>
          </Link>

          <div className="pt-2 border-t border-gray-800 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2954F5] text-white flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div>
                <span className="text-xs font-bold text-white block leading-none">
                  Administrator
                </span>
                <span className="text-[10px] text-green-400 font-mono">
                  ● Online
                </span>
              </div>
            </div>
            <Link
              href="/"
              title="Logout / Exit"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ========================================================
          2. MOBILE NAVBAR
      ======================================================== */}
      <div className="lg:hidden bg-[#12151B] text-white border-b border-gray-800 px-4 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo/32X32px-01.png"
            alt="Doorstep"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="font-bold text-sm text-white">
            Doorstep <span className="text-[#E51F25]">Admin</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-lg bg-white/10 text-gray-200 text-xs font-medium flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Site</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12151B] border-b border-gray-800 p-4 space-y-1.5 z-40">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "bg-[#2954F5] text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.hasBadge && newInquiriesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#E51F25] text-white">
                    {newInquiriesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {/* ========================================================
          3. MAIN CONTENT SHELL
      ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-[#E3E5EC] px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2954F5] bg-[#2954F5]/10 px-2.5 py-1 rounded-md">
              CMS Dashboard
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-bold text-[#12151B] capitalize">
              {pathname === "/admin"
                ? "Overview"
                : pathname.replace("/admin/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Live &amp; Synced</span>
            </div>

            <Link
              href="/admin/inquiries"
              className="relative p-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
              title="Inquiries"
            >
              <Bell className="w-4 h-4" />
              {newInquiriesCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E51F25]" />
              )}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

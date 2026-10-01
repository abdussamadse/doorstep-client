"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Bell,
  LogOut,
  UserCircle,
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
  { name: "My Profile", href: "/admin/profile", icon: UserCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // If on login page, render clean login view without admin shell
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    // Auth Guard
    const token = localStorage.getItem("doorstep_admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const storedUser = localStorage.getItem("doorstep_admin_user");
    if (storedUser) {
      try {
        setAdminUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
    setAuthChecked(true);

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
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem("doorstep_admin_token");
    localStorage.removeItem("doorstep_admin_user");
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Prevent flash of admin content before checking auth token
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center text-white">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  const userInitial = adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "A";

  return (
    <div className="h-screen overflow-hidden bg-[#F4F6F9] text-[#12151B] flex flex-col lg:flex-row antialiased">
      {/* ========================================================
          1. DESKTOP SIDEBAR (FIXED & NON-SCROLLING SHELL)
      ======================================================== */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-screen bg-[#12151B] text-white shrink-0 border-r border-gray-800 select-none">
        {/* Brand Header (Pinned) */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between shrink-0">
          <Link href="/admin" className="inline-flex items-center gap-2.5 group">
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

        {/* Footer Actions (Pinned) */}
        <div className="p-4 border-t border-gray-800 space-y-2 shrink-0">
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
            <Link
              href="/admin/profile"
              title="Click to view profile"
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#2954F5] text-white flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                {userInitial}
              </div>
              <div>
                <span className="text-xs font-bold text-white block leading-none group-hover:text-blue-300 transition-colors truncate max-w-[110px]">
                  {adminUser?.name || "Doorstep Admin"}
                </span>
                <span className="text-[10px] text-green-400 font-mono">
                  ● Online
                </span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              title="Sign Out / Exit"
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
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
            className="p-2 rounded-lg bg-white/10 text-white cursor-pointer"
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

          <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
            <span className="text-xs text-gray-400">{adminUser?.name || "Admin"}</span>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 font-semibold flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          3. MAIN CONTENT SHELL (FIXED TOPBAR + SCROLLABLE BODY)
      ======================================================== */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Topbar (Permanently Pinned - Never Scrolls) */}
        <header className="shrink-0 bg-white border-b border-[#E3E5EC] px-6 lg:px-10 py-4 flex items-center justify-between z-20 select-none">
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

            <Link
              href="/admin/profile"
              className="w-8 h-8 rounded-full bg-[#2954F5] text-white flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
              title="My Profile"
            >
              {userInitial}
            </Link>
          </div>
        </header>

        {/* Page Content (The ONLY element that scrolls vertically) */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
          <div className="max-w-7xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

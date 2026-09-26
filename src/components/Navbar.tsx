"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DoorstepLogo from "./DoorstepLogo";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "How We Work", href: "/how-we-work" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Our Team", href: "/our-team" },
  { name: "Get in Touch", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#FDFDFC]/90 backdrop-blur-md shadow-xs border-b border-[#E3E5EC]"
          : "bg-[#FDFDFC]/95 backdrop-blur-xs border-b border-[#E3E5EC]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <DoorstepLogo iconSize={30} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F4F5F8] p-1.5 rounded-full border border-[#E3E5EC]">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? "bg-white text-[#12151B] shadow-xs font-semibold"
                      : "text-[#5B5F6B] hover:text-[#12151B] hover:bg-white/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#2954F5] text-white text-sm font-semibold hover:bg-[#1B3BC9] transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#12151B] hover:bg-[#F4F5F8] transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3E5EC] bg-white animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-5 space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#F4F5F8] text-[#12151B] font-semibold border-l-4 border-[#2954F5]"
                      : "text-[#5B5F6B] hover:text-[#12151B] hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#E3E5EC]">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2954F5] text-white font-medium hover:bg-[#1B3BC9] transition-colors"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

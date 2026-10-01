import {
  PORTFOLIO_ITEMS,
  SERVICES,
  WORK_STEPS,
  TEAM_MEMBERS,
  AGENCY_INFO,
  CaseStudy,
  ServiceItem,
  WorkStep,
  TeamMember,
} from "@/data/agencyData";
import { CLIENT_LOGOS } from "@/components/ClientLogos";

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  company?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: "New" | "Contacted" | "In Progress" | "Archived";
  createdAt: string;
}

export interface ClientLogoCMS {
  id: string;
  name: string;
  logo: string;
}

// Default initial inquiries for demonstration
const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: "inq-1",
    name: "Tanvir Ahmed",
    email: "tanvir@foodiebangla.com",
    phone: "+880 1812-345678",
    serviceNeeded: "Creative & Content (Reels, Design)",
    company: "Foodie Bangla",
    budget: "$1k - $3k",
    timeline: "Within 2 weeks",
    message: "Need 12 high-energy food reels and daily carousel designs for our Dhaka cloud kitchen launch.",
    status: "New",
    createdAt: "2026-10-01 10:15 AM",
  },
  {
    id: "inq-2",
    name: "Sabrina Rahman",
    email: "sabrina@lifestylebd.com",
    phone: "+880 1799-887766",
    serviceNeeded: "Brand Identity (Logo, Guidelines)",
    company: "Aura Lifestyle",
    budget: "$3k - $5k",
    timeline: "1 month",
    message: "Full brand identity guidelines, typography, packaging die-lines for our organic skincare line.",
    status: "Contacted",
    createdAt: "2026-09-30 04:30 PM",
  },
  {
    id: "inq-3",
    name: "Kamrul Islam",
    email: "kamrul@bengalfmcg.com",
    phone: "+880 1611-223344",
    serviceNeeded: "Packaging & Print (Box, Label, Menu)",
    company: "Bengal Agro FMCG",
    budget: "$5k+",
    timeline: "Immediate",
    message: "Shelf-ready snack packaging boxes, export carton graphics, and point-of-sale retail flyers.",
    status: "In Progress",
    createdAt: "2026-09-29 02:00 PM",
  },
];

// Helper to get from localStorage or fallback
export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(`doorstep_cms_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

// Helper to save to localStorage
export function setStoredData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`doorstep_cms_${key}`, JSON.stringify(data));
    window.dispatchEvent(new Event("doorstep_cms_updated"));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
}

// Keys
export const CMS_KEYS = {
  PORTFOLIO: "portfolio",
  SERVICES: "services",
  METHODOLOGY: "methodology",
  TEAM: "team",
  CLIENTS: "clients",
  SETTINGS: "settings",
  INQUIRIES: "inquiries",
};

export const INITIAL_CMS_DATA = {
  portfolio: PORTFOLIO_ITEMS,
  services: SERVICES,
  methodology: WORK_STEPS,
  team: TEAM_MEMBERS,
  clients: CLIENT_LOGOS.map((c, i) => ({ id: `client-${i + 1}`, name: c.name, logo: c.src })),
  settings: AGENCY_INFO,
  inquiries: INITIAL_INQUIRIES,
};

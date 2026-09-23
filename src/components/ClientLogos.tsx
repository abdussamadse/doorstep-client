import React from "react";
import { Coffee, UtensilsCrossed, Sparkles, Sprout, Store, Layers, Building2, Flame } from "lucide-react";

export interface ClientBrand {
  name: string;
  category: string;
  location: string;
  icon: React.ReactNode;
}

export const CLIENT_BRANDS: ClientBrand[] = [
  {
    name: "Caffeine Coffee",
    category: "Specialty Beverage & Cafe",
    location: "Dhaka",
    icon: <Coffee className="w-5 h-5 text-[#2954F5]" />,
  },
  {
    name: "Chefs Canvas",
    category: "Hospitality & Food Court",
    location: "Faridpur",
    icon: <UtensilsCrossed className="w-5 h-5 text-[#E51F25]" />,
  },
  {
    name: "Indian Masala",
    category: "Culinary & Quick Service",
    location: "Dhaka",
    icon: <Flame className="w-5 h-5 text-[#2954F5]" />,
  },
  {
    name: "Bose Agro",
    category: "Agri-Commodities & B2B Trading",
    location: "Nationwide",
    icon: <Sprout className="w-5 h-5 text-emerald-600" />,
  },
  {
    name: "Dining Hub Food Court",
    category: "Multi-Cuisine Retail Destination",
    location: "Dhaka",
    icon: <Store className="w-5 h-5 text-[#E51F25]" />,
  },
  {
    name: "Bengal Brews",
    category: "Artisanal Beverages",
    location: "Dhaka",
    icon: <Coffee className="w-5 h-5 text-[#2954F5]" />,
  },
  {
    name: "Artisan Living",
    category: "Lifestyle & Retail Goods",
    location: "Dhaka",
    icon: <Layers className="w-5 h-5 text-[#12151B]" />,
  },
  {
    name: "Heritage Foods",
    category: "FMCG & Consumer Goods",
    location: "Chittagong",
    icon: <Building2 className="w-5 h-5 text-[#2954F5]" />,
  },
];

export default function ClientLogosMarquee() {
  // Duplicate array so it loops seamlessly from right to left
  const marqueeItems = [...CLIENT_BRANDS, ...CLIENT_BRANDS];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-[#E3E5EC] bg-white">
      {/* Subtle edge fades for smooth marquee entry and exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white via-white/80 to-transparent" />

      <div className="animate-marquee items-center gap-6">
        {marqueeItems.map((client, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 px-6 py-4 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] hover:border-gray-400 hover:shadow-xs transition-all duration-200 shrink-0 group cursor-default"
          >
            <div className="p-2 rounded-lg bg-[#F4F5F8] border border-[#E3E5EC] group-hover:scale-110 transition-transform">
              {client.icon}
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#12151B] tracking-tight group-hover:text-[#2954F5] transition-colors whitespace-nowrap">
                {client.name}
              </div>
              <div className="text-[11px] font-medium text-[#5B5F6B] whitespace-nowrap">
                {client.category} · {client.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

export default function ClientLogosGrid() {
  const line1 = CLIENT_BRANDS.slice(0, 4);
  const line2 = CLIENT_BRANDS.slice(4, 8);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5 sm:space-y-4">
      {/* Line 1 (4 Brands) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {line1.map((client, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-4 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] hover:border-[#12151B] hover:shadow-xs transition-all duration-200 group cursor-default"
          >
            <div className="p-1.5 sm:p-2.5 rounded-lg bg-[#F4F5F8] border border-[#E3E5EC] group-hover:scale-105 group-hover:bg-[#12151B] group-hover:text-white transition-all shrink-0">
              {client.icon}
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-xs sm:text-sm text-[#12151B] tracking-tight group-hover:text-[#2954F5] transition-colors truncate">
                {client.name}
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium text-[#5B5F6B] truncate">
                {client.category} · {client.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Line 2 (4 Brands) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {line2.map((client, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-4 rounded-xl border border-[#E3E5EC] bg-[#FDFDFC] hover:border-[#12151B] hover:shadow-xs transition-all duration-200 group cursor-default"
          >
            <div className="p-1.5 sm:p-2.5 rounded-lg bg-[#F4F5F8] border border-[#E3E5EC] group-hover:scale-105 group-hover:bg-[#12151B] group-hover:text-white transition-all shrink-0">
              {client.icon}
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-xs sm:text-sm text-[#12151B] tracking-tight group-hover:text-[#2954F5] transition-colors truncate">
                {client.name}
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium text-[#5B5F6B] truncate">
                {client.category} · {client.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

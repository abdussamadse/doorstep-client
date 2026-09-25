import React from "react";

export interface ClientLogoItem {
  name: string;
  src: string;
  theme?: "blue" | "red";
}

export const CLIENT_LOGOS: ClientLogoItem[] = [
  { name: "The Westin Dhaka", src: "/img/the-westin.jpeg", theme: "blue" },
  { name: "InterContinental Hotels & Resorts", src: "/img/intercontinental.jpeg", theme: "red" },
  { name: "Pan Pacific Sonargaon Dhaka", src: "/img/pan-pacific.jpeg", theme: "blue" },
  { name: "Chef's Canvas", src: "/img/chefs-canvas.jpeg", theme: "red" },
  { name: "Mughal Mahal", src: "/img/mughal-mahal.jpeg", theme: "blue" },
  { name: "Kyoto Japanese & Korean Cuisine", src: "/img/kyoto.jpeg", theme: "red" },
  { name: "Taste of Adana", src: "/img/taste-of-adana.jpeg", theme: "blue" },
  { name: "SomBoon The King of Taste", src: "/img/somboon.jpeg", theme: "red" },
  { name: "Eat & Play", src: "/img/eat-and-play.jpeg", theme: "blue" },
  { name: "Crepe E Waffle", src: "/img/crepe-e-waffle.jpeg", theme: "red" },
  { name: "Pistrina Bakery & Pastry", src: "/img/pistrina.jpeg", theme: "blue" },
];

export default function ClientLogosGrid() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3.5 lg:gap-5">
      {CLIENT_LOGOS.map((brand, idx) => {
        const hoverBorder =
          brand.theme === "red"
            ? "hover:border-[#E51F25]"
            : "hover:border-[#2954F5]";
        const hoverShadow =
          brand.theme === "red"
            ? "hover:shadow-[0_12px_28px_-8px_rgba(229,31,37,0.18)]"
            : "hover:shadow-[0_12px_28px_-8px_rgba(41,84,245,0.18)]";

        return (
          <div
            key={idx}
            className={`w-full bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-[#E3E5EC] p-2 sm:p-3.5 lg:p-5 flex items-center justify-center aspect-square shadow-xs ${hoverBorder} ${hoverShadow} hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden`}
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="max-h-7 sm:max-h-10 md:max-h-12 lg:max-h-16 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}

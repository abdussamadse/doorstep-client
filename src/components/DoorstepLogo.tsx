import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  iconSize?: number;
}

export default function DoorstepLogo({ className = "", iconSize = 28 }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90 ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <path
          d="M20 20c0-5.5 4.5-10 10-10h20c27.6 0 50 22.4 50 50s-22.4 50-50 50H30c-5.5 0-10-4.5-10-10V70h26c11 0 20-9 20-20s-9-20-20-20H20z"
          fill="#2954F5"
        />
        <rect x="20" y="42" width="26" height="26" rx="8" fill="#E51F25" />
      </svg>
      <span className="font-display font-bold text-lg tracking-tight text-[#12151B]">
        Doorstep <span className="text-[#E51F25]">Limited</span>
      </span>
    </Link>
  );
}

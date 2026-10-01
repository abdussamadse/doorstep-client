import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  iconSize?: number;
  variant?: "horizontal" | "square";
}

export default function DoorstepLogo({
  className = "",
  variant = "horizontal",
}: LogoProps) {
  const isSquare = variant === "square";

  return (
    <Link
      href="/"
      className={`inline-flex items-center group transition-opacity hover:opacity-90 ${className}`}
      aria-label="Doorstep Limited Home"
    >
      <Image
        src={isSquare ? "/logo/80X80 px-01.png" : "/logo/400X90px.png"}
        alt="Doorstep Limited"
        width={isSquare ? 48 : 200}
        height={isSquare ? 48 : 45}
        priority
        className={`${
          isSquare ? "h-10 w-10" : "h-8 sm:h-9 md:h-10 w-auto"
        } object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
      />
    </Link>
  );
}

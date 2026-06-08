"use client";

// Mini flag icons for Day 2 massage picker — India, Thailand, Sweden.
// Fixed: replaced abstract massage glyphs with country flags for each tradition.

import { useId } from "react";

type MassageStyleMiniProps = {
  variant: "ayurvedic" | "thai" | "swedish";
  className?: string;
};

export function MassageStyleMini({ variant, className = "" }: MassageStyleMiniProps) {
  const clipId = useId();

  const shared = {
    className: `massage-flag-mini ${className}`.trim(),
    viewBox: "0 0 48 36",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  const clip = (
    <defs>
      <clipPath id={clipId}>
        <rect x="2" y="2" width="44" height="32" rx="4" />
      </clipPath>
    </defs>
  );

  if (variant === "ayurvedic") {
    return (
      <svg {...shared}>
        {clip}
        <g clipPath={`url(#${clipId})`}>
          <rect x="2" y="2" width="44" height="10.67" fill="#FF9933" />
          <rect x="2" y="12.67" width="44" height="10.66" fill="#FFFFFF" />
          <rect x="2" y="23.33" width="44" height="10.67" fill="#138808" />
          <circle cx="24" cy="18" r="3.2" fill="none" stroke="#000080" strokeWidth="0.9" />
          <circle cx="24" cy="18" r="0.9" fill="#000080" />
          {Array.from({ length: 8 }).map((_, index) => {
            const angle = (index * Math.PI) / 4;
            const x1 = 24 + Math.cos(angle) * 1.4;
            const y1 = 18 + Math.sin(angle) * 1.4;
            const x2 = 24 + Math.cos(angle) * 2.6;
            const y2 = 18 + Math.sin(angle) * 2.6;
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#000080"
                strokeWidth="0.55"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </svg>
    );
  }

  if (variant === "thai") {
    return (
      <svg {...shared}>
        {clip}
        <g clipPath={`url(#${clipId})`}>
          <rect x="2" y="2" width="44" height="32" fill="#A51931" />
          <rect x="2" y="7" width="44" height="5" fill="#F4F5F8" />
          <rect x="2" y="24" width="44" height="5" fill="#F4F5F8" />
          <rect x="2" y="12" width="44" height="12" fill="#2D2A4A" />
        </g>
      </svg>
    );
  }

  return (
    <svg {...shared}>
      {clip}
      <g clipPath={`url(#${clipId})`}>
        <rect x="2" y="2" width="44" height="32" fill="#006AA7" />
        <rect x="14" y="2" width="6" height="32" fill="#FECC00" />
        <rect x="2" y="13" width="44" height="6" fill="#FECC00" />
      </g>
    </svg>
  );
}

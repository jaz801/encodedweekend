"use client";

// Mini plate icons for Day 2 breakfast — English, pancakes, oatmeal.

import { useId } from "react";

type BreakfastPlateVariant = "english" | "pancake" | "oatmeal";

type BreakfastPlateMiniProps = {
  variant: BreakfastPlateVariant;
  className?: string;
};

export function BreakfastPlateMini({ variant, className = "" }: BreakfastPlateMiniProps) {
  const clipId = useId();

  if (variant === "english") {
    return (
      <svg
        className={`breakfast-plate-mini ${className}`.trim()}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="32" cy="52" rx="22" ry="3.5" fill="rgba(0,0,0,0.35)" />
        <ellipse cx="32" cy="36" rx="24" ry="17" fill="#141414" stroke="#efefef" strokeWidth="1.6" />
        <ellipse cx="22" cy="34" rx="5" ry="4" fill="#e07a6a" />
        <ellipse cx="32" cy="32" rx="4.5" ry="4.5" fill="#f0d080" stroke="#e6ba4a" strokeWidth="0.8" />
        <circle cx="32" cy="31" r="1.8" fill="#e6ba4a" />
        <rect x="40" y="30" width="10" height="6" rx="2" fill="#c45c3e" />
        <ellipse cx="44" cy="33" rx="3" ry="2" fill="#8b4513" opacity="0.5" />
        <ellipse cx="18" cy="40" rx="4" ry="3" fill="#6b8e4e" />
        <ellipse cx="38" cy="40" rx="5" ry="3.5" fill="#d47474" opacity="0.85" />
      </svg>
    );
  }

  if (variant === "pancake") {
    return (
      <svg
        className={`breakfast-plate-mini ${className}`.trim()}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="32" cy="52" rx="22" ry="3.5" fill="rgba(0,0,0,0.35)" />
        <ellipse cx="32" cy="40" rx="22" ry="14" fill="#141414" stroke="#efefef" strokeWidth="1.6" />
        <ellipse cx="32" cy="38" rx="16" ry="5" fill="#d4a85a" />
        <ellipse cx="32" cy="35" rx="14" ry="4.5" fill="#e0b868" />
        <ellipse cx="32" cy="32" rx="12" ry="4" fill="#ecc878" />
        <path
          d="M26 28c2-4 6-6 6-6s4 2 6 6"
          stroke="#c4a46c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="38" cy="27" r="2" fill="#e6ba4a" opacity="0.8" />
      </svg>
    );
  }

  return (
    <svg
      className={`breakfast-plate-mini ${className}`.trim()}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="32" cy="36" rx="18" ry="12" />
        </clipPath>
      </defs>
      <ellipse cx="32" cy="52" rx="20" ry="3.5" fill="rgba(0,0,0,0.35)" />
      <path
        d="M14 38c0-12 8-20 18-20s18 8 18 20v6c0 4-4 7-10 7H24c-6 0-10-3-10-7v-6Z"
        fill="#141414"
        stroke="#efefef"
        strokeWidth="1.6"
      />
      <g clipPath={`url(#${clipId})`}>
        <ellipse cx="32" cy="38" rx="17" ry="11" fill="#c8a066" />
        {Array.from({ length: 14 }).map((_, i) => (
          <circle
            key={i}
            cx={18 + (i % 7) * 4.5}
            cy={30 + Math.floor(i / 7) * 5}
            r="0.9"
            fill="#a67c3d"
            opacity="0.55"
          />
        ))}
      </g>
      <path
        d="M24 18c2-3 5-5 8-5s6 2 8 5M28 14c1-2 3-3 4-3s3 1 4 3"
        stroke="#c4a46c"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <ellipse cx="32" cy="22" rx="6" ry="2" fill="rgba(196, 164, 108, 0.15)" />
    </svg>
  );
}

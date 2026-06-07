"use client";

// Fixed: mini glass illustrations for green juice menu drink previews.

import { useId } from "react";

type DrinkGlassMiniProps = {
  liquid: string;
  meniscus: string;
  highlight?: string;
  className?: string;
};

export function DrinkGlassMini({
  liquid,
  meniscus,
  highlight = "rgba(255,255,255,0.16)",
  className = "",
}: DrinkGlassMiniProps) {
  const clipId = useId();

  return (
    <svg
      className={`drink-glass-mini ${className}`.trim()}
      viewBox="0 0 48 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M10 24 L38 24 C39 27, 38 32, 36 36 L32 46 L16 46 L12 36 C10 32, 9 27, 10 24 Z" />
        </clipPath>
      </defs>

      <ellipse cx="24" cy="56" rx="9" ry="2" fill="rgba(0,0,0,0.35)" />

      <path
        d="M10 24 L38 24 C39 27, 38 32, 36 36 L32 46 L16 46 L12 36 C10 32, 9 27, 10 24 Z"
        fill="#161616"
        stroke="#efefef"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="46"
        x2="24"
        y2="52"
        stroke="#efefef"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="24"
        cy="54"
        rx="7"
        ry="2"
        fill="#161616"
        stroke="#efefef"
        strokeWidth="1.5"
      />

      <g clipPath={`url(#${clipId})`}>
        <rect x="9" y="14" width="30" height="34" fill={liquid} />
        <rect x="12" y="14" width="5" height="34" fill={highlight} />
        <ellipse cx="24" cy="14" rx="13" ry="2.5" fill={meniscus} />
      </g>

      <path
        d="M14 24 Q24 21, 34 24"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

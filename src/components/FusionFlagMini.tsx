"use client";

// Day 3 fusion dinner — dual country flags for each fusion plate.
// Fixed: replaced Vietnam/Mexico pair with Indonesia/India for vegan Indonesian curry.

import { useId } from "react";

type FusionFlagVariant = "indonesia-india" | "korea-usa" | "mexico-spain";

type FusionFlagMiniProps = {
  variant: FusionFlagVariant;
  className?: string;
};

type FlagCountry = "indonesia" | "india" | "korea" | "mexico" | "usa" | "spain";

function FlagShape({
  country,
  x,
  clipId,
}: {
  country: FlagCountry;
  x: number;
  clipId: string;
}) {
  if (country === "indonesia") {
    return (
      <g clipPath={`url(#${clipId})`} transform={`translate(${x}, 0)`}>
        <rect x="2" y="2" width="44" height="16" fill="#FF0000" />
        <rect x="2" y="18" width="44" height="16" fill="#FFFFFF" />
      </g>
    );
  }

  if (country === "india") {
    return (
      <g clipPath={`url(#${clipId})`} transform={`translate(${x}, 0)`}>
        <rect x="2" y="2" width="44" height="10.67" fill="#FF9933" />
        <rect x="2" y="12.67" width="44" height="10.66" fill="#FFFFFF" />
        <rect x="2" y="23.33" width="44" height="10.67" fill="#138808" />
        <circle cx="24" cy="18" r="3.2" fill="none" stroke="#000080" strokeWidth="0.9" />
        <circle cx="24" cy="18" r="1.2" fill="#000080" />
      </g>
    );
  }

  if (country === "korea") {
    return (
      <g clipPath={`url(#${clipId})`} transform={`translate(${x}, 0)`}>
        <rect x="2" y="2" width="44" height="32" fill="#FFFFFF" />
        <circle cx="24" cy="18" r="7" fill="#CD2E3A" />
        <path d="M24 11 A7 7 0 0 1 24 25 A3.5 3.5 0 0 1 24 18 A3.5 3.5 0 0 0 24 11Z" fill="#0047A0" />
        <path d="M24 18 A3.5 3.5 0 0 1 24 25 A7 7 0 0 1 24 11 A3.5 3.5 0 0 0 24 18Z" fill="#CD2E3A" />
        <g stroke="#000" strokeWidth="0.7" fill="#000">
          <path d="M8 8h3v3H8zM11 8l2 2-2 2-2-2z" />
          <path d="M34 8h3v3h-3zM37 8l2 2-2 2-2-2z" />
          <path d="M8 26h3v3H8zM11 26l2 2-2 2-2-2z" />
          <path d="M34 26h3v3h-3zM37 26l2 2-2 2-2-2z" />
        </g>
      </g>
    );
  }

  if (country === "mexico") {
    return (
      <g clipPath={`url(#${clipId})`} transform={`translate(${x}, 0)`}>
        <rect x="2" y="2" width="14.67" height="32" fill="#006847" />
        <rect x="16.67" y="2" width="14.66" height="32" fill="#FFFFFF" />
        <rect x="31.33" y="2" width="14.67" height="32" fill="#CE1126" />
        <circle cx="24" cy="18" r="4.2" fill="#8B4513" opacity="0.85" />
        <circle cx="24" cy="18" r="2.8" fill="#006847" opacity="0.9" />
      </g>
    );
  }

  if (country === "usa") {
    return (
      <g clipPath={`url(#${clipId})`} transform={`translate(${x}, 0)`}>
        <rect x="2" y="2" width="44" height="32" fill="#B22234" />
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <rect key={index} x="2" y={2 + index * 5.33} width="44" height="2.67" fill="#FFFFFF" />
        ))}
        <rect x="2" y="2" width="18" height="16" fill="#3C3B6E" />
        {[
          [6, 6],
          [10, 6],
          [14, 6],
          [8, 9],
          [12, 9],
          [6, 12],
          [10, 12],
          [14, 12],
        ].map(([starX, starY]) => (
          <circle key={`${starX}-${starY}`} cx={starX} cy={starY} r="0.9" fill="#FFFFFF" />
        ))}
      </g>
    );
  }

  return (
    <g clipPath={`url(#${clipId})`} transform={`translate(${x}, 0)`}>
      <rect x="2" y="2" width="44" height="8" fill="#AA151B" />
      <rect x="2" y="10" width="44" height="16" fill="#F1BF00" />
      <rect x="2" y="26" width="44" height="8" fill="#AA151B" />
    </g>
  );
}

const flagPairs: Record<FusionFlagVariant, [FlagCountry, FlagCountry]> = {
  "indonesia-india": ["indonesia", "india"],
  "korea-usa": ["korea", "usa"],
  "mexico-spain": ["mexico", "spain"],
};

export function FusionFlagMini({ variant, className = "" }: FusionFlagMiniProps) {
  const clipLeft = useId();
  const clipRight = useId();
  const [left, right] = flagPairs[variant];

  return (
    <svg
      className={`fusion-flag-mini ${className}`.trim()}
      viewBox="0 0 104 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipLeft}>
          <rect x="2" y="2" width="44" height="32" rx="4" />
        </clipPath>
        <clipPath id={clipRight}>
          <rect x="58" y="2" width="44" height="32" rx="4" />
        </clipPath>
      </defs>
      <FlagShape country={left} x={0} clipId={clipLeft} />
      <FlagShape country={right} x={56} clipId={clipRight} />
    </svg>
  );
}

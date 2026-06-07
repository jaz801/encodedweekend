"use client";

// Fixed: poke, salad, and soup mini icons redesigned to read clearly as each dish.

import { useId } from "react";

type LunchBowlVariant = "poke" | "salad" | "soup";

type LunchBowlMiniProps = {
  variant: LunchBowlVariant;
  className?: string;
};

export function LunchBowlMini({ variant, className = "" }: LunchBowlMiniProps) {
  const clipId = useId();

  if (variant === "poke") {
    return (
      <svg
        className={`lunch-bowl-mini ${className}`.trim()}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <ellipse cx="32" cy="33" rx="19" ry="14" />
          </clipPath>
        </defs>

        <ellipse cx="32" cy="52" rx="22" ry="3.5" fill="rgba(0,0,0,0.35)" />

        <ellipse
          cx="32"
          cy="34"
          rx="22"
          ry="16"
          fill="#141414"
          stroke="#efefef"
          strokeWidth="1.6"
        />
        <ellipse cx="32" cy="28" rx="19" ry="5" fill="rgba(255,255,255,0.06)" />

        <g clipPath={`url(#${clipId})`}>
          <ellipse cx="32" cy="35" rx="18" ry="13" fill="#d8c4a0" />
          <ellipse cx="32" cy="33" rx="17" ry="4" fill="#e8d8b8" opacity="0.9" />

          <rect x="18" y="28" width="4.5" height="4.5" rx="1" fill="#e07a6a" transform="rotate(-8 20 30)" />
          <rect x="24" y="26" width="4" height="4" rx="1" fill="#e8927c" transform="rotate(6 26 28)" />
          <rect x="30" y="27" width="4.5" height="4.5" rx="1" fill="#e07a6a" transform="rotate(-4 32 29)" />
          <rect x="36" y="29" width="3.8" height="3.8" rx="1" fill="#e8927c" transform="rotate(10 38 31)" />
          <rect x="22" y="33" width="3.5" height="3.5" rx="1" fill="#d96b5c" transform="rotate(12 24 35)" />

          <path
            d="M40 31 C44 30, 46 33, 45 36 C43 39, 39 38, 38 35 C37 32, 38 31, 40 31Z"
            fill="#6dbf6d"
          />
          <path
            d="M42 34 C45 33, 47 35, 46 37 C44 39, 41 38, 41 36Z"
            fill="#8ed48e"
            opacity="0.85"
          />

          <ellipse cx="20" cy="36" rx="3.2" ry="2" fill="#7ec87e" />
          <ellipse cx="17" cy="38" rx="2.4" ry="1.5" fill="#6dbf6d" />

          <ellipse cx="28" cy="38" rx="2.8" ry="1.4" fill="#72c4a8" opacity="0.9" />
          <ellipse cx="34" cy="39" rx="2.5" ry="1.2" fill="#5eb898" opacity="0.85" />

          <circle cx="24" cy="31" r="1" fill="#f5f0e6" opacity="0.9" />
          <circle cx="29" cy="34" r="0.8" fill="#f5f0e6" opacity="0.8" />
          <circle cx="35" cy="32" r="0.9" fill="#f5f0e6" opacity="0.85" />
        </g>

        <ellipse
          cx="32"
          cy="22"
          rx="19"
          ry="5"
          fill="none"
          stroke="#efefef"
          strokeWidth="1.4"
          opacity="0.55"
        />
      </svg>
    );
  }

  if (variant === "salad") {
    return (
      <svg
        className={`lunch-bowl-mini ${className}`.trim()}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="32" cy="52" rx="24" ry="3.5" fill="rgba(0,0,0,0.35)" />

        <path
          d="M8 30 C8 24, 18 20, 32 20 C46 20, 56 24, 56 30 L54 40 C54 44, 46 48, 32 48 C18 48, 10 44, 10 40 Z"
          fill="#141414"
          stroke="#efefef"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <ellipse cx="32" cy="30" rx="18" ry="6" fill="#2d5a30" opacity="0.35" />

        <path
          d="M22 38 C24 28, 28 24, 32 22 C36 24, 40 28, 42 38 C40 42, 36 44, 32 44 C28 44, 24 42, 22 38Z"
          fill="#3a7a3e"
        />
        <path
          d="M26 36 C27 30, 30 27, 33 26 C36 27, 38 30, 39 36 C38 39, 35 40, 33 40 C30 40, 27 39, 26 36Z"
          fill="#4a9a4e"
        />
        <path
          d="M28 34 C29 30, 31 28, 33 27 C35 28, 36 30, 37 34 C36 36, 34 37, 33 37 C31 37, 29 36, 28 34Z"
          fill="#5cb85f"
        />

        <path
          d="M24 32 C25 29, 27 28, 28 29 C29 30, 28 32, 27 33 C25 33, 24 33, 24 32Z"
          fill="#3d8b40"
        />
        <path
          d="M36 31 C37 28, 39 27, 40 29 C41 30, 40 32, 38 33 C37 33, 36 32, 36 31Z"
          fill="#3d8b40"
        />
        <path
          d="M30 24 C31 21, 33 20, 34 22 C35 23, 34 25, 32 26 C31 26, 30 25, 30 24Z"
          fill="#2f6b32"
        />

        <circle cx="27" cy="33" r="2" fill="#5a7fd4" />
        <circle cx="34" cy="31" r="1.8" fill="#6b8fd4" />
        <circle cx="38" cy="35" r="1.7" fill="#5a7fd4" />
        <circle cx="30" cy="37" r="1.6" fill="#7a9fe8" />

        <ellipse cx="24" cy="39" rx="2.2" ry="1.4" fill="#8b6914" transform="rotate(-20 24 39)" />
        <ellipse cx="37" cy="38" rx="2" ry="1.3" fill="#a07820" transform="rotate(15 37 38)" />
        <ellipse cx="31" cy="40" rx="1.8" ry="1.1" fill="#8b6914" transform="rotate(-5 31 40)" />

        <ellipse cx="33" cy="41" rx="3" ry="1.6" fill="#7ec87e" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg
      className={`lunch-bowl-mini ${className}`.trim()}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M14 26 C14 22, 22 18, 32 18 C42 18, 50 22, 50 26 L48 40 C47 44, 40 47, 32 47 C24 47, 17 44, 16 40 Z" />
        </clipPath>
      </defs>

      <ellipse cx="32" cy="52" rx="20" ry="3.5" fill="rgba(0,0,0,0.35)" />

      <path
        d="M14 26 C14 22, 22 18, 32 18 C42 18, 50 22, 50 26 L48 40 C47 44, 40 47, 32 47 C24 47, 17 44, 16 40 Z"
        fill="#141414"
        stroke="#efefef"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M50 30 C54 30, 56 32, 56 35 C56 38, 54 40, 51 40"
        stroke="#efefef"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M51 40 C54 40, 56 42, 56 45 C56 47, 54 48, 52 47"
        stroke="#efefef"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      <g clipPath={`url(#${clipId})`}>
        <rect x="13" y="24" width="38" height="22" fill="#c9922a" />
        <ellipse cx="32" cy="26" rx="17" ry="4" fill="#e6ba4a" opacity="0.85" />
        <ellipse cx="32" cy="27" rx="15" ry="2.5" fill="#f0d060" opacity="0.5" />

        <path
          d="M22 32 C24 30, 26 33, 28 31 C30 29, 32 33, 34 31 C36 29, 38 32, 40 30"
          stroke="#b07818"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.45"
        />

        <ellipse cx="24" cy="33" rx="3" ry="1.5" fill="#4a8f4a" transform="rotate(-15 24 33)" />
        <ellipse cx="30" cy="35" rx="2.8" ry="1.3" fill="#5cb85f" transform="rotate(10 30 35)" />
        <ellipse cx="36" cy="32" rx="3.2" ry="1.4" fill="#4a8f4a" transform="rotate(-8 36 32)" />
        <ellipse cx="28" cy="30" rx="2.2" ry="1" fill="#6ecf6e" transform="rotate(20 28 30)" />
      </g>

      <path
        d="M22 14 C22 10, 24 7, 26 7"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M30 12 C30 8, 32 5, 34 5"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M38 14 C38 10, 36 7, 34 7"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

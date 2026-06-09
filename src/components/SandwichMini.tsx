"use client";

// Day 3 brunch mini icons — banh mi, panini, and falafel wrap.

type SandwichVariant = "banhmi" | "panini" | "falafel";

type SandwichMiniProps = {
  variant: SandwichVariant;
  className?: string;
};

export function SandwichMini({ variant, className = "" }: SandwichMiniProps) {
  const shared = {
    className: `lunch-bowl-mini ${className}`.trim(),
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  if (variant === "banhmi") {
    return (
      <svg {...shared}>
        <ellipse cx="32" cy="50" rx="22" ry="3" fill="rgba(0,0,0,0.35)" />
        <path
          d="M10 28 C10 22, 18 18, 32 18 C46 18, 54 22, 54 28 L52 36 C51 40, 44 42, 32 42 C20 42, 13 40, 12 36 Z"
          fill="#d4b896"
          stroke="#efefef"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M12 30 C14 26, 22 24, 32 24 C42 24, 50 26, 52 30"
          fill="#c9a87a"
          opacity="0.85"
        />
        <rect x="16" y="27" width="32" height="8" rx="2" fill="#8b5a3c" opacity="0.9" />
        <rect x="18" y="29" width="6" height="2" rx="0.5" fill="#e8927c" />
        <rect x="26" y="29" width="5" height="2" rx="0.5" fill="#f0d060" />
        <rect x="33" y="29" width="6" height="2" rx="0.5" fill="#6dbf6d" />
        <rect x="41" y="29" width="5" height="2" rx="0.5" fill="#72c48a" />
        <path
          d="M10 28 C10 22, 18 18, 32 18 C46 18, 54 22, 54 28 L52 32 C51 28, 44 26, 32 26 C20 26, 13 28, 12 32 Z"
          fill="#e8d4b0"
          stroke="#efefef"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "panini") {
    return (
      <svg {...shared}>
        <ellipse cx="32" cy="50" rx="24" ry="3" fill="rgba(0,0,0,0.35)" />
        <path
          d="M8 30 C8 24, 16 20, 32 20 C48 20, 56 24, 56 30 L54 38 C53 42, 46 44, 32 44 C18 44, 11 42, 10 38 Z"
          fill="#c9922a"
          stroke="#efefef"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M12 32 C14 28, 22 26, 32 26 C42 26, 50 28, 52 32"
          fill="#e8927c"
          opacity="0.55"
        />
        <ellipse cx="28" cy="33" rx="8" ry="3" fill="#f5f0e6" opacity="0.85" />
        <ellipse cx="38" cy="33" rx="7" ry="2.5" fill="#d96b5c" opacity="0.7" />
        <path
          d="M8 30 C8 24, 16 20, 32 20 C48 20, 56 24, 56 30 L54 34 C53 30, 46 28, 32 28 C18 28, 11 30, 10 34 Z"
          fill="#e6ba4a"
          stroke="#efefef"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M14 22 L18 18" stroke="#efefef" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M50 22 L46 18" stroke="#efefef" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <ellipse cx="32" cy="50" rx="20" ry="3" fill="rgba(0,0,0,0.35)" />
      <ellipse
        cx="32"
        cy="34"
        rx="20"
        ry="10"
        fill="#c9922a"
        stroke="#efefef"
        strokeWidth="1.4"
      />
      <ellipse cx="32" cy="30" rx="17" ry="6" fill="#e6ba4a" opacity="0.75" />
      <circle cx="24" cy="32" r="3.5" fill="#8b6914" />
      <circle cx="32" cy="33" r="3.2" fill="#9a7820" />
      <circle cx="40" cy="32" r="3.5" fill="#8b6914" />
      <path
        d="M14 34 C18 30, 46 30, 50 34 C46 38, 18 38, 14 34 Z"
        fill="#6dbf6d"
        opacity="0.55"
      />
      <path
        d="M18 28 C22 24, 42 24, 46 28"
        stroke="#efefef"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

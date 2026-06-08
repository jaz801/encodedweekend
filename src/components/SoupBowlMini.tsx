"use client";

// Mini bowl illustrations for Day 2 soup dinner — ramen, pho, green pea.
// Fixed: new soup bowl icons for Day 2 dinner selection menu.
// Fixed: removed chopsticks, lime wedge, and pea swirl — bowls only with broth toppings.

type SoupBowlVariant = "ramen" | "pho" | "pea";

type SoupBowlMiniProps = {
  variant: SoupBowlVariant;
  className?: string;
};

export function SoupBowlMini({ variant, className = "" }: SoupBowlMiniProps) {
  if (variant === "ramen") {
    return (
      <svg
        className={`soup-bowl-mini ${className}`.trim()}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <ellipse cx="32" cy="52" rx="22" ry="3.5" fill="rgba(0,0,0,0.35)" />
        <path
          d="M14 30 C14 22 22 18 32 18 C42 18 50 22 50 30 L48 40 C48 44 41 47 32 47 C23 47 16 44 16 40 Z"
          fill="#141414"
          stroke="#efefef"
          strokeWidth="1.6"
        />
        <ellipse cx="32" cy="30" rx="14" ry="8" fill="#d4b896" />
        <path
          d="M22 28 C26 31 30 29 34 32 C38 34 42 31 44 29"
          stroke="#e8c868"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 32 C28 34 32 32 38 34"
          stroke="#d4a84a"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
        <ellipse cx="38" cy="27" rx="3.5" ry="2.8" fill="#f5f0e6" />
        <circle cx="38" cy="27.5" r="1.4" fill="#e8923a" />
        <circle cx="26" cy="33" r="1" fill="#6dbf6d" />
        <circle cx="30" cy="34" r="0.8" fill="#6dbf6d" />
      </svg>
    );
  }

  if (variant === "pho") {
    return (
      <svg
        className={`soup-bowl-mini ${className}`.trim()}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <ellipse cx="32" cy="52" rx="22" ry="3.5" fill="rgba(0,0,0,0.35)" />
        <path
          d="M14 30 C14 22 22 18 32 18 C42 18 50 22 50 30 L48 40 C48 44 41 47 32 47 C23 47 16 44 16 40 Z"
          fill="#141414"
          stroke="#efefef"
          strokeWidth="1.6"
        />
        <ellipse cx="32" cy="30" rx="14" ry="8" fill="#c49a5a" opacity="0.9" />
        <path d="M22 31 L42 31" stroke="#e8d4b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <path d="M24 33 L40 33" stroke="#e8d4b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M26 35 L38 35" stroke="#e8d4b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <ellipse cx="24" cy="28" rx="2" ry="1" fill="#6dbf6d" />
        <ellipse cx="28" cy="27" rx="1.8" ry="0.9" fill="#5cb85f" />
        <circle cx="40" cy="29" r="2.2" fill="#e8927c" opacity="0.85" />
      </svg>
    );
  }

  return (
    <svg
      className={`soup-bowl-mini ${className}`.trim()}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="32" cy="52" rx="22" ry="3.5" fill="rgba(0,0,0,0.35)" />
      <path
        d="M14 30 C14 22 22 18 32 18 C42 18 50 22 50 30 L48 40 C48 44 41 47 32 47 C23 47 16 44 16 40 Z"
        fill="#141414"
        stroke="#efefef"
        strokeWidth="1.6"
      />
      <ellipse cx="32" cy="30" rx="14" ry="8" fill="#5cb85f" />
      <ellipse cx="32" cy="29" rx="11" ry="5.5" fill="#72c878" opacity="0.7" />
    </svg>
  );
}

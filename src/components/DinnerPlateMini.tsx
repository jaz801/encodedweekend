"use client";

// Mini plate illustrations for dinner menu cards (steak, lasagna, hummus).

type DinnerPlateVariant = "steak" | "lasagna" | "hummus";

type DinnerPlateMiniProps = {
  variant: DinnerPlateVariant;
  className?: string;
};

export function DinnerPlateMini({ variant, className = "" }: DinnerPlateMiniProps) {
  if (variant === "steak") {
    return (
      <svg
        className={`dinner-plate-mini ${className}`.trim()}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="32" cy="52" rx="24" ry="3.5" fill="rgba(0,0,0,0.35)" />
        <ellipse cx="32" cy="36" rx="24" ry="14" fill="#141414" stroke="#efefef" strokeWidth="1.6" />
        <ellipse cx="32" cy="32" rx="20" ry="10" fill="rgba(255,255,255,0.04)" />

        <ellipse cx="28" cy="34" rx="11" ry="7" fill="#8b3a32" />
        <ellipse cx="28" cy="33" rx="10" ry="5.5" fill="#a84840" />
        <path
          d="M20 34 C22 30, 26 29, 30 30 C34 31, 36 34, 34 37 C32 39, 26 38, 20 34Z"
          fill="#6d2a24"
          opacity="0.5"
        />

        <path
          d="M34 30 C38 28, 42 31, 41 35 C40 38, 36 39, 34 36Z"
          fill="#3d2518"
          opacity="0.85"
        />
        <circle cx="37" cy="32" r="0.7" fill="#f5f0e6" opacity="0.7" />
        <circle cx="39" cy="34" r="0.6" fill="#f5f0e6" opacity="0.6" />

        <rect x="40" y="28" width="3" height="10" rx="1" fill="#e8c868" transform="rotate(8 41 33)" />
        <rect x="44" y="27" width="3" height="11" rx="1" fill="#d4a84a" transform="rotate(-6 45 32)" />
        <rect x="48" y="29" width="2.8" height="9" rx="1" fill="#e8c868" transform="rotate(12 49 33)" />

        <ellipse cx="18" cy="38" rx="2" ry="4" fill="#6dbf6d" transform="rotate(-25 18 38)" />
        <ellipse cx="22" cy="40" rx="1.8" ry="3.5" fill="#5cb85f" transform="rotate(-10 22 40)" />
        <circle cx="16" cy="36" r="1.5" fill="#e8927c" />
      </svg>
    );
  }

  if (variant === "lasagna") {
    return (
      <svg
        className={`dinner-plate-mini ${className}`.trim()}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="32" cy="52" rx="22" ry="3.5" fill="rgba(0,0,0,0.35)" />
        <ellipse cx="32" cy="40" rx="22" ry="12" fill="#141414" stroke="#efefef" strokeWidth="1.6" />

        <rect x="18" y="22" width="28" height="22" rx="2" fill="#8b2e22" />
        <rect x="18" y="26" width="28" height="3" fill="#f0e6c8" />
        <rect x="18" y="31" width="28" height="3" fill="#f5f0e0" />
        <rect x="18" y="36" width="28" height="3" fill="#f0e6c8" />
        <rect x="18" y="41" width="28" height="3" fill="#c45a3a" opacity="0.9" />

        <path d="M18 22 L46 22 L44 20 L20 20 Z" fill="#e8ba4a" />
        <ellipse cx="26" cy="21" rx="3" ry="1.2" fill="#f5e6a8" />
        <ellipse cx="36" cy="21" rx="2.5" ry="1" fill="#f5e6a8" />

        <path
          d="M22 24 C24 23, 26 25, 28 24 C30 23, 32 25, 34 24"
          stroke="#6d4a2a"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`dinner-plate-mini ${className}`.trim()}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="52" rx="20" ry="3.5" fill="rgba(0,0,0,0.35)" />

      <ellipse cx="32" cy="38" rx="16" ry="10" fill="#141414" stroke="#efefef" strokeWidth="1.6" />
      <ellipse cx="32" cy="36" rx="13" ry="7" fill="#d4c4a0" />
      <ellipse cx="32" cy="35" rx="11" ry="5" fill="#e8d8b0" />

      <path
        d="M24 36 C28 33, 32 33, 36 35 C38 36, 38 38, 36 39 C32 40, 28 39, 24 36Z"
        fill="#c4a46c"
        opacity="0.55"
      />
      <circle cx="32" cy="35" r="2.5" fill="#8b6914" opacity="0.7" />
      <path
        d="M30 33 C32 32, 34 33, 33 35"
        stroke="#6d5010"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />

      <path
        d="M46 30 C50 28, 54 32, 52 36 C50 40, 46 39, 44 35 C43 32, 44 31, 46 30Z"
        fill="#e8d4a8"
        stroke="#efefef"
        strokeWidth="1.2"
      />
      <path d="M46 32 L50 34" stroke="#c4a46c" strokeWidth="0.8" opacity="0.5" />

      <circle cx="26" cy="33" r="0.8" fill="#c45a3a" opacity="0.8" />
      <circle cx="38" cy="37" r="0.7" fill="#c45a3a" opacity="0.7" />
    </svg>
  );
}

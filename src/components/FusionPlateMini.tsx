"use client";

// Mini plate icons for Day 3 fusion dinner cards.
// Fixed: korean-burger and quesadilla variants now read clearly as stacked burger + folded quesadilla.

type FusionPlateVariant = "tacos" | "korean-burger" | "quesadilla";

type FusionPlateMiniProps = {
  variant: FusionPlateVariant;
  className?: string;
};

export function FusionPlateMini({ variant, className = "" }: FusionPlateMiniProps) {
  const shared = {
    className: `dinner-plate-mini ${className}`.trim(),
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  if (variant === "tacos") {
    return (
      <svg {...shared}>
        <ellipse cx="32" cy="52" rx="22" ry="3" fill="rgba(0,0,0,0.35)" />
        <path
          d="M14 34 C18 28, 28 26, 36 28 C44 30, 50 34, 48 38 C44 42, 28 42, 18 40 C14 38, 12 36, 14 34Z"
          fill="#c9922a"
          stroke="#efefef"
          strokeWidth="1.3"
        />
        <path
          d="M18 32 C22 30, 30 29, 38 31 C42 32, 44 35, 42 37 C38 39, 24 38, 20 36Z"
          fill="#e8927c"
          opacity="0.75"
        />
        <ellipse cx="28" cy="33" rx="4" ry="2" fill="#6dbf6d" />
        <ellipse cx="36" cy="34" rx="3.5" ry="1.8" fill="#c45a3a" opacity="0.8" />
        <path
          d="M22 36 C24 34, 28 34, 30 36"
          stroke="#f5f0e6"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    );
  }

  if (variant === "korean-burger") {
    return (
      <svg {...shared}>
        <ellipse cx="32" cy="52" rx="22" ry="3" fill="rgba(0,0,0,0.35)" />

        {/* bottom bun */}
        <path
          d="M12 40 C12 44, 52 44, 52 40 L50 35 C32 33, 14 35, 12 40Z"
          fill="#c9922a"
          stroke="#efefef"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* glazed patty */}
        <path
          d="M14 31 C14 29, 50 29, 50 31 L49 35 C32 33, 15 35, 14 31Z"
          fill="#5c2418"
          stroke="#efefef"
          strokeWidth="1"
        />
        <path
          d="M16 30 C22 28, 42 28, 48 30"
          stroke="#c45a3a"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* gochujang mayo */}
        <path
          d="M15 27 C20 25, 44 25, 49 27 C44 28, 20 28, 15 27Z"
          fill="#f5f0e0"
          opacity="0.9"
        />

        {/* kimchi slaw */}
        <path
          d="M14 24 C18 22, 24 23, 28 21 C32 19, 36 21, 40 22 C44 23, 48 22, 50 24 C46 26, 40 25, 32 25 C24 25, 18 26, 14 24Z"
          fill="#6dbf6d"
          opacity="0.85"
        />
        <path
          d="M20 23 C24 22, 28 24, 32 22 C36 24, 40 22, 44 23"
          stroke="#c45a3a"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* top bun */}
        <path
          d="M12 24 C12 16, 20 12, 32 12 C44 12, 52 16, 52 24 C50 26, 14 26, 12 24Z"
          fill="#e6ba4a"
          stroke="#efefef"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M14 22 C18 18, 46 18, 50 22"
          fill="#c9922a"
          opacity="0.45"
        />

        {/* sesame seeds */}
        <ellipse cx="24" cy="16" rx="1.2" ry="0.7" fill="#f5f0e6" transform="rotate(-20 24 16)" />
        <ellipse cx="32" cy="14" rx="1.2" ry="0.7" fill="#f5f0e6" />
        <ellipse cx="40" cy="16" rx="1.2" ry="0.7" fill="#f5f0e6" transform="rotate(20 40 16)" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <ellipse cx="32" cy="52" rx="20" ry="3" fill="rgba(0,0,0,0.35)" />

      {/* wedge slice — cut quesadilla */}
      <path
        d="M32 14 L54 46 L10 46 Z"
        fill="#c9922a"
        stroke="#efefef"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M32 18 L50 44 L14 44 Z"
        fill="#e6ba4a"
        opacity="0.55"
      />

      {/* grill marks */}
      <path d="M24 30 L40 38" stroke="#a87828" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <path d="M20 36 L44 42" stroke="#a87828" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <path d="M28 24 L38 32" stroke="#a87828" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />

      {/* cross-section layers at cut edge */}
      <path d="M14 44 L50 44 L48 41 L16 41 Z" fill="#f0d060" />
      <path d="M16 41 L48 41 L46 38 L18 38 Z" fill="#c45a3a" opacity="0.85" />
      <path d="M18 38 L46 38 L44 35 L20 35 Z" fill="#f5f0e0" opacity="0.9" />
      <path d="M20 35 L44 35 L42 32 L22 32 Z" fill="#8b3a32" opacity="0.8" />

      {/* melted cheese drip */}
      <path
        d="M30 46 C31 48, 33 48, 34 46"
        stroke="#f0d060"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

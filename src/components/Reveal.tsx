"use client";

// Added: aria-labelledby / aria-label passthrough for section reveals (frequency report intro).

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

export function Reveal({
  children,
  className = "",
  as: Component = "div",
  id,
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as never}
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={`reveal ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

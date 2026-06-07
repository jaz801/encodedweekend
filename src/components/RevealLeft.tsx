"use client";

// Fade-in reveal for timeline Lotties — opacity only so sticky positioning is never affected.

import { useEffect, useRef } from "react";

type RevealLeftProps = {
  children: React.ReactNode;
  className?: string;
};

export function RevealLeft({ children, className = "" }: RevealLeftProps) {
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-left ${className}`.trim()}>
      {children}
    </div>
  );
}

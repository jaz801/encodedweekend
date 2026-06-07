"use client";

// Each timeline block gets its own sticky Lottie locked beside that section's titles.
// Recurring bug: unbounded Lottie height + inline menu cards resized the section and made sticky jitter.

import { useEffect, useRef, useState, type ComponentType } from "react";
import { RevealLeft } from "./RevealLeft";

type TimelineVisual = ComponentType<{ isActive?: boolean }>;

type TimelineSectionProps = {
  Visual: TimelineVisual;
  children: React.ReactNode;
};

export function TimelineSection({ Visual, children }: TimelineSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="timeline-section">
      <div className="timeline-section-visual">
        <div className="timeline-section-sticky">
          <RevealLeft>
            <Visual isActive={isActive} />
          </RevealLeft>
        </div>
      </div>

      <div className="timeline-section-content">{children}</div>
    </div>
  );
}

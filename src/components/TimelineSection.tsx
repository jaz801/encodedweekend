"use client";

// Each timeline block gets its own sticky Lottie locked beside that section's titles.
// Recurring bug: unbounded Lottie height + uneven sticky margins made visuals drift on scroll.

import { useEffect, useRef, useState, type ComponentType } from "react";
import { RevealLeft } from "./RevealLeft";

type TimelineVisual = ComponentType<{ isActive?: boolean }>;

type TimelineSectionProps = {
  Visual?: TimelineVisual;
  children: React.ReactNode;
  /** Vertically center the sticky visual beside shorter single-item sections. */
  centerVisual?: boolean;
};

export function TimelineSection({ Visual, children, centerVisual = false }: TimelineSectionProps) {
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
    <div
      ref={sectionRef}
      className={`timeline-section${centerVisual ? " timeline-section-center" : ""}${Visual ? "" : " timeline-section-no-visual"}`}
    >
      {Visual ? (
        <div className="timeline-section-visual">
          <div className="timeline-section-sticky">
            <RevealLeft>
              <Visual isActive={isActive} />
            </RevealLeft>
          </div>
        </div>
      ) : null}

      <div className="timeline-section-content">{children}</div>
    </div>
  );
}

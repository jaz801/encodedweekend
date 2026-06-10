"use client";

// Added: scrollable encoded acceleration layout — measure content only (no hero labels).
// Fixed: removed Physical body / Mental body hero text.

import { useRef } from "react";
import { EncodedAccelerationMeasureContent } from "@/components/EncodedAccelerationMeasureContent";

export function EncodedAccelerationExperience() {
  const contentRef = useRef<HTMLElement>(null);

  return (
    <div className="encoded-accel-scroll-layout">
      <EncodedAccelerationMeasureContent ref={contentRef} />
    </div>
  );
}

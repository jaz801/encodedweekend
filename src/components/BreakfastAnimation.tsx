"use client";

// Breakfast Lottie — harmonized white line art for dark timeline.
// Recurring bug: unbounded Lottie height made sticky timeline visuals jitter on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import breakfastAnimationData from "@/assets/breakfast-animation.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const BREAKFAST_HOLD_FRAME = 50;

type BreakfastAnimationProps = {
  isActive?: boolean;
};

export function BreakfastAnimation({ isActive = false }: BreakfastAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => ({
      ...harmonizeTimelineLottie(breakfastAnimationData, "white-line"),
      op: 101,
    }),
    [],
  );

  useTimelineLottie(lottieRef, isActive, BREAKFAST_HOLD_FRAME);

  return (
    <div className="breakfast-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-breakfast timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

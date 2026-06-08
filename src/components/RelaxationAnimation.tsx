"use client";

// Relaxation thermometer Lottie — harmonized white line art for dark timeline.
// Recurring bug: unbounded Lottie height made sticky timeline visuals jitter on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import relaxationAnimationData from "@/assets/relaxation-animation.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const RELAXATION_HOLD_FRAME = 20;

type RelaxationAnimationProps = {
  isActive?: boolean;
};

export function RelaxationAnimation({ isActive = false }: RelaxationAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => ({
      ...harmonizeTimelineLottie(relaxationAnimationData, "white-line"),
      op: 40,
    }),
    [],
  );

  useTimelineLottie(lottieRef, isActive, RELAXATION_HOLD_FRAME);

  return (
    <div className="relaxation-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-relaxation timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

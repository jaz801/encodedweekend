"use client";

// Day 3 spa Lottie — bg plate stripped, steam recolored white for dark timeline.
// Recurring bug: nested spa group split made lottie-react render nothing; drop bg path instead.
// Fixed: 50×50 source comp read small vs other timeline visuals — display size is 168px in CSS.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import spaAnimationData from "@/assets/spa-animation.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const SPA_HOLD_FRAME = 20;
const ANIMATION_OUT_POINT = 41;

type SpaAnimationProps = {
  isActive?: boolean;
};

export function SpaAnimation({ isActive = false }: SpaAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const animationData = useMemo(
    () => ({
      ...harmonizeTimelineLottie(spaAnimationData, "spa"),
      op: ANIMATION_OUT_POINT,
    }),
    [],
  );

  useTimelineLottie(lottieRef, isActive, SPA_HOLD_FRAME);

  return (
    <div className="spa-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-spa timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

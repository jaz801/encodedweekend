"use client";

// Day 3 morning walk Lottie — black strokes to white, lime backdrop to site bg.
// Recurring bug: unbounded Lottie height made sticky timeline visuals jitter on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import walkAnimationData from "@/assets/walk-animation.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const WALK_HOLD_FRAME = 15;
const ANIMATION_OUT_POINT = 31;

type WalkAnimationProps = {
  isActive?: boolean;
};

export function WalkAnimation({ isActive = false }: WalkAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => ({
      ...harmonizeTimelineLottie(walkAnimationData, "walk"),
      op: ANIMATION_OUT_POINT,
    }),
    [],
  );

  useTimelineLottie(lottieRef, isActive, WALK_HOLD_FRAME);

  return (
    <div className="walk-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-walk timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

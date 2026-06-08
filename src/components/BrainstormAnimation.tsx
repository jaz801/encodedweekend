"use client";

// Brainstorm Lottie — harmonized white strokes, dark fills, rounded caps.
// Recurring bug: source op=100 plays past bulb layers, leaving a blank final frame.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import brainstormingData from "@/assets/brainstorming.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const BULB_HOLD_FRAME = 97;
const ANIMATION_OUT_POINT = 98;

type BrainstormAnimationProps = {
  isActive?: boolean;
};

export function BrainstormAnimation({ isActive = false }: BrainstormAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => ({
      ...harmonizeTimelineLottie(brainstormingData, "brainstorm"),
      op: ANIMATION_OUT_POINT,
    }),
    [],
  );

  useTimelineLottie(lottieRef, isActive, BULB_HOLD_FRAME);

  return (
    <div className="brainstorm-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-brainstorm timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

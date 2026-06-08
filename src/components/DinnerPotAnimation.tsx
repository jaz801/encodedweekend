"use client";

// Cooking pot Lottie — harmonized white fills for dark timeline.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import dinnerPotData from "@/assets/dinner-pot.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const POT_HOLD_FRAME = 42;
const ANIMATION_OUT_POINT = 50;

type DinnerPotAnimationProps = {
  isActive?: boolean;
};

export function DinnerPotAnimation({ isActive = false }: DinnerPotAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => ({
      ...harmonizeTimelineLottie(dinnerPotData, "dinner-fill"),
      op: ANIMATION_OUT_POINT,
    }),
    [],
  );

  useTimelineLottie(lottieRef, isActive, POT_HOLD_FRAME);

  return (
    <div className="dinner-pot-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-dinner-pot timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

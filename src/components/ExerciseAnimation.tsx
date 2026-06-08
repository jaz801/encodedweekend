"use client";

// Yoga mat roll Lottie — user-provided animation; black strokes recolored white for dark timeline.
// Recurring bug: unbounded Lottie height made sticky timeline visuals jitter on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import yogaAnimationData from "@/assets/yoga-animation.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const EXERCISE_HOLD_FRAME = 281;

type ExerciseAnimationProps = {
  isActive?: boolean;
};

export function ExerciseAnimation({ isActive = false }: ExerciseAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => harmonizeTimelineLottie(yogaAnimationData, "white-line"),
    [],
  );

  useTimelineLottie(lottieRef, isActive, EXERCISE_HOLD_FRAME);

  return (
    <div className="exercise-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-exercise timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

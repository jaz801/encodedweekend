"use client";

// Sleep Lottie — harmonized white line art for dark timeline.
// Recurring bug: unbounded Lottie height made sticky timeline visuals jitter on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import sleepAnimationData from "@/assets/sleep-animation.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const SLEEP_HOLD_FRAME = 29;

type SleepAnimationProps = {
  isActive?: boolean;
};

export function SleepAnimation({ isActive = false }: SleepAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => harmonizeTimelineLottie(sleepAnimationData, "white-line"),
    [],
  );

  useTimelineLottie(lottieRef, isActive, SLEEP_HOLD_FRAME);

  return (
    <div className="sleep-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-sleep timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

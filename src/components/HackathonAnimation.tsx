"use client";

// Day 3 hackathon Lottie — laptop open/close; grays harmonized to site palette.
// Recurring bug: unbounded Lottie height made sticky timeline visuals jitter on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import hackathonAnimationData from "@/assets/hackathon-animation.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const HACKATHON_HOLD_FRAME = 40;
const ANIMATION_OUT_POINT = 81;

type HackathonAnimationProps = {
  isActive?: boolean;
};

export function HackathonAnimation({ isActive = false }: HackathonAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => ({
      ...harmonizeTimelineLottie(hackathonAnimationData, "hackathon"),
      op: ANIMATION_OUT_POINT,
    }),
    [],
  );

  useTimelineLottie(lottieRef, isActive, HACKATHON_HOLD_FRAME);

  return (
    <div className="hackathon-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-hackathon timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

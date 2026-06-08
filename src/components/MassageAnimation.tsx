"use client";

// Massage Lottie — harmonized white line art for dark timeline.
// Recurring bug: unbounded Lottie height made sticky timeline visuals jitter on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import massageAnimationData from "@/assets/massage-animation.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  harmonizeTimelineLottie,
  LOTTIE_RENDERER_SETTINGS,
} from "@/lib/lottieHarmonize";

const MASSAGE_HOLD_FRAME = 30;

type MassageAnimationProps = {
  isActive?: boolean;
};

export function MassageAnimation({ isActive = false }: MassageAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(
    () => ({
      ...harmonizeTimelineLottie(massageAnimationData, "white-line"),
      op: 61,
    }),
    [],
  );

  useTimelineLottie(lottieRef, isActive, MASSAGE_HOLD_FRAME);

  return (
    <div className="massage-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-massage timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

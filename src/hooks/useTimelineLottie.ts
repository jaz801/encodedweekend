"use client";

// Shared play/pause behavior for sticky timeline Lotties.

import { useEffect, useRef, type RefObject } from "react";
import type { LottieRefCurrentProps } from "lottie-react";

export function useTimelineLottie(
  lottieRef: RefObject<LottieRefCurrentProps | null>,
  isActive: boolean,
  holdFrame: number,
) {
  const hasStarted = useRef(false);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      player.goToAndStop(holdFrame, true);
      return;
    }

    if (isActive) {
      if (!hasStarted.current) {
        hasStarted.current = true;
        player.goToAndPlay(0, true);
      } else {
        player.play();
      }
      return;
    }

    player.pause();
  }, [isActive, holdFrame, lottieRef]);
}

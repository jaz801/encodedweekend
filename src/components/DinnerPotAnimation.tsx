"use client";

// Cooking pot Lottie for Day 1 dinner — colored fills recolored white; loops continuously while active.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useMemo, useRef } from "react";
import dinnerPotData from "@/assets/dinner-pot.json";

const POT_WHITE: [number, number, number, number] = [1, 1, 1, 1];
const POT_HOLD_FRAME = 42;
const ANIMATION_OUT_POINT = 50;

type LottieColor = { a?: number; k: number[] };

type DinnerPotAnimationProps = {
  isActive?: boolean;
};

function isNotWhite(color: number[]) {
  return color.length >= 3 && !(color[0] > 0.99 && color[1] > 0.99 && color[2] > 0.99);
}

function replaceFillColors(
  value: unknown,
  match: (color: number[]) => boolean,
  replacement: [number, number, number, number],
): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => replaceFillColors(item, match, replacement));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const record = value as Record<string, unknown>;
  const next: Record<string, unknown> = {};

  for (const [key, child] of Object.entries(record)) {
    if (key === "c" && child && typeof child === "object" && "k" in child) {
      const color = child as LottieColor;
      if (Array.isArray(color.k) && match(color.k)) {
        next[key] = { ...color, k: [...replacement] };
        continue;
      }
    }

    next[key] = replaceFillColors(child, match, replacement);
  }

  return next;
}

function prepareDinnerPotAnimation() {
  const data = replaceFillColors(
    JSON.parse(JSON.stringify(dinnerPotData)),
    isNotWhite,
    POT_WHITE,
  ) as typeof dinnerPotData;

  return {
    ...data,
    op: ANIMATION_OUT_POINT,
  };
}

export function DinnerPotAnimation({ isActive = false }: DinnerPotAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasStarted = useRef(false);
  const animationData = useMemo(() => prepareDinnerPotAnimation(), []);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      player.goToAndStop(POT_HOLD_FRAME, true);
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
  }, [isActive]);

  return (
    <div className="dinner-pot-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-dinner-pot"
      />
    </div>
  );
}

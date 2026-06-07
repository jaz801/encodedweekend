"use client";

// Fixed: liquid strip through glass recolored to --bg; loops continuously while section is active.
// Recurring bug: unbounded Lottie height made sticky cocktail glass jitter up/down on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useMemo, useRef } from "react";
import cocktailGlassData from "@/assets/cocktail-glass.json";

const BG_LOTTIE: [number, number, number, number] = [17 / 255, 17 / 255, 17 / 255, 1];
const GLASS_LOTTIE: [number, number, number, number] = [1, 1, 1, 1];
const REDUCED_MOTION_FRAME = cocktailGlassData.op - 1;

const SPARKLE_LAYERS = new Set(["Line2", "Line3", "Line4", "Line5"]);
const GLASS_LAYERS = new Set(["Coupe1 Outlines", "Stem Outlines"]);
const LIQUID_LAYER = "Liquid Outlines";

type LottieColor = { a?: number; k: number[] };

type CocktailGlassProps = {
  isActive?: boolean;
};

function isLottieBlack(color: number[]) {
  return color.length >= 3 && color[0] === 0 && color[1] === 0 && color[2] === 0;
}

function isLottieWhite(color: number[]) {
  return color.length >= 3 && color[0] === 1 && color[1] === 1 && color[2] === 1;
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

function replaceBlackColors(value: unknown, replacement: [number, number, number, number]): unknown {
  return replaceFillColors(value, isLottieBlack, replacement);
}

function prepareCocktailAnimation() {
  return {
    ...cocktailGlassData,
    layers: cocktailGlassData.layers
      .filter((layer) => layer.nm !== "Plate_white")
      .map((layer) => {
        const copy = JSON.parse(JSON.stringify(layer)) as (typeof cocktailGlassData.layers)[number];

        if (SPARKLE_LAYERS.has(layer.nm)) {
          return replaceBlackColors(copy, BG_LOTTIE) as typeof layer;
        }

        if (GLASS_LAYERS.has(layer.nm)) {
          return replaceBlackColors(copy, GLASS_LOTTIE) as typeof layer;
        }

        if (layer.nm === LIQUID_LAYER) {
          return replaceFillColors(copy, isLottieWhite, BG_LOTTIE) as typeof layer;
        }

        return copy;
      }),
  };
}

export function CocktailGlass({ isActive = false }: CocktailGlassProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasStarted = useRef(false);
  const animationData = useMemo(() => prepareCocktailAnimation(), []);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      player.goToAndStop(REDUCED_MOTION_FRAME, true);
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
    <div className="cocktail-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-cocktail"
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}

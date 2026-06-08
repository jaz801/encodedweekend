"use client";

// Cocktail Lottie — layer-specific recolor + harmonized stroke weight and round caps.
// Recurring bug: unbounded Lottie height made sticky cocktail glass jitter up/down on scroll.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useMemo, useRef } from "react";
import cocktailGlassData from "@/assets/cocktail-glass.json";
import { useTimelineLottie } from "@/hooks/useTimelineLottie";
import {
  cloneLottie,
  harmonizeLottieStrokes,
  LOTTIE_BG,
  LOTTIE_RENDERER_SETTINGS,
  LOTTIE_WHITE,
  type LottieRGBA,
} from "@/lib/lottieHarmonize";

const COCKTAIL_HOLD_FRAME = cocktailGlassData.op - 1;

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
  replacement: LottieRGBA,
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

function prepareCocktailAnimation() {
  const base = cloneLottie(cocktailGlassData);

  const recolored = {
    ...base,
    layers: base.layers
      .filter((layer) => layer.nm !== "Plate_white")
      .map((layer) => {
        const copy = cloneLottie(layer);

        if (SPARKLE_LAYERS.has(layer.nm)) {
          return replaceFillColors(copy, isLottieBlack, LOTTIE_BG) as typeof layer;
        }

        if (GLASS_LAYERS.has(layer.nm)) {
          return replaceFillColors(copy, isLottieBlack, LOTTIE_WHITE) as typeof layer;
        }

        if (layer.nm === LIQUID_LAYER) {
          return replaceFillColors(copy, isLottieWhite, LOTTIE_BG) as typeof layer;
        }

        return copy;
      }),
  };

  return harmonizeLottieStrokes(recolored, recolored.w ?? 500);
}

export function CocktailGlass({ isActive = false }: CocktailGlassProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animationData = useMemo(() => prepareCocktailAnimation(), []);

  useTimelineLottie(lottieRef, isActive, COCKTAIL_HOLD_FRAME);

  return (
    <div className="cocktail-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-cocktail timeline-lottie"
        rendererSettings={LOTTIE_RENDERER_SETTINGS}
      />
    </div>
  );
}

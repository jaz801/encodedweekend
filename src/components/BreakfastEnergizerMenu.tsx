"use client";

// Day 2 breakfast energizer picker — protein shake, matcha, or berry smoothie with recipes.

import { useId, useRef, useState } from "react";
import { DrinkGlassMini } from "./DrinkGlassMini";
import { IngredientIcon } from "./IngredientIcon";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const energizers = [
  {
    id: "protein-shake",
    name: "Protein Shake",
    tagline: "Muscle recovery and clean fuel",
    liquid: "#d4b87a",
    meniscus: "#e6ba4a",
    ingredients: [
      { icon: "milk", text: "1 cup milk of choice (dairy, oat, or almond)" },
      { icon: "banana", text: "½ frozen banana" },
      { icon: "almond-butter", text: "1 tbsp almond or peanut butter" },
      { icon: "ice", text: "½ cup ice" },
      { icon: "maple", text: "1 tsp honey or maple syrup (optional)" },
      { icon: "spinach", text: "1 scoop vanilla whey or plant protein (25–30 g)" },
    ],
    method:
      "Blend protein with a splash of milk first to avoid clumps, then add banana, nut butter, remaining milk, and ice. Drink within 30 minutes while the group settles in.",
    benefits: [
      "Replenishes protein after morning movement",
      "Supports muscle repair and satiety",
      "Steady energy without a sugar crash",
    ],
  },
  {
    id: "matcha",
    name: "Matcha",
    tagline: "Calm focus with ceremonial lift",
    liquid: "#4a8f5c",
    meniscus: "#72c48a",
    ingredients: [
      { icon: "matcha", text: "1½ tsp ceremonial-grade matcha" },
      { icon: "ice", text: "2 tbsp warm water for whisking" },
      { icon: "milk", text: "1 cup oat or almond milk" },
      { icon: "maple", text: "1 tsp maple syrup (optional)" },
      { icon: "ice", text: "Ice for an iced latte" },
    ],
    method:
      "Whisk matcha with warm water until smooth — no clumps. Froth with cold milk and ice for a creamy iced matcha latte, or serve warm if the morning is cool.",
    benefits: [
      "L-theanine + caffeine for calm alertness",
      "Rich in EGCG antioxidants",
      "Gentle lift without coffee jitters",
    ],
  },
  {
    id: "berry-smoothie",
    name: "Antioxidant Berry Smoothie",
    tagline: "Purple fuel and polyphenol power",
    liquid: "#6b3f8f",
    meniscus: "#9b6bc4",
    ingredients: [
      { icon: "berries", text: "1 cup frozen mixed berries" },
      { icon: "blueberries", text: "½ cup fresh blueberries to top" },
      { icon: "coconut", text: "1 cup coconut water" },
      { icon: "chia", text: "1 tbsp chia seeds" },
      { icon: "lemon", text: "Juice of ½ lemon" },
      { icon: "acai", text: "1 tsp acai powder (optional boost)" },
    ],
    method:
      "Blend berries, coconut water, chia, and lemon until silky. Pour thick, top with fresh blueberries, and serve immediately while the color is vibrant.",
    benefits: [
      "Dense anthocyanin antioxidants",
      "Hydrating after class and rest",
      "Light but satisfying pre-massage fuel",
    ],
  },
] as const;

export function BreakfastEnergizerMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rowRef = useRef<HTMLDivElement>(null);

  useChoiceMenu(open, setOpen, rowRef);

  return (
    <div ref={rowRef} className="timeline-lead-row">
      <p className="timeline-lead">
        <button
          type="button"
          className="choice-trigger choice-trigger-green"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          Pick your energiser drink.
        </button>
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Breakfast energizer menu">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close energizer menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 2</span>
            <h4 className="juice-menu-title">Breakfast</h4>
            <p className="juice-menu-sub">Three energizer drinks to pair with your breakfast plate.</p>
          </div>

          <ul className="juice-menu-list">
            {energizers.map((item) => (
              <li key={item.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <DrinkGlassMini liquid={item.liquid} meniscus={item.meniscus} />
                  <span className="juice-drink-name">{item.name}</span>
                  <span className="juice-drink-tag">{item.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
                  <span className="juice-recipe-label">Benefits</span>
                  <ul className="choice-benefits">
                    {item.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                  <span className="juice-recipe-label">Recipe</span>
                  <ul className="juice-ingredients">
                    {item.ingredients.map((ingredient) => (
                      <li key={ingredient.text}>
                        <IngredientIcon name={ingredient.icon} />
                        <span>{ingredient.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="juice-method">{item.method}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

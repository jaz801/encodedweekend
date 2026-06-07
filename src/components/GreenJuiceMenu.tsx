"use client";

// Fixed: green juice menu shows three drink cards side-by-side with a close button.

import { useEffect, useId, useRef, useState } from "react";
import { DrinkGlassMini } from "./DrinkGlassMini";
import { IngredientIcon } from "./IngredientIcon";

const drinks = [
  {
    id: "spirulina-matcha",
    name: "Blue Spirulina Matcha",
    tagline: "Ceremonial calm with ocean minerals",
    liquid: "#3d9fbf",
    meniscus: "#6ec8e8",
    ingredients: [
      { icon: "matcha", text: "1 tsp ceremonial matcha" },
      { icon: "spirulina", text: "½ tsp blue spirulina powder" },
      { icon: "coconut", text: "1 cup coconut water" },
      { icon: "banana", text: "½ frozen banana" },
      { icon: "ice", text: "4 ice cubes" },
    ],
    method: "Blend until silky. Pour over ice.",
  },
  {
    id: "energizer",
    name: "Morning Energizer",
    tagline: "Greens, ginger, and clean lift",
    liquid: "#3fbf62",
    meniscus: "#72e88a",
    ingredients: [
      { icon: "spinach", text: "2 cups baby spinach" },
      { icon: "cucumber", text: "½ cucumber" },
      { icon: "apple", text: "1 green apple, cored" },
      { icon: "lemon", text: "Juice of ½ lemon" },
      { icon: "ginger", text: "1 inch fresh ginger" },
      { icon: "moringa", text: "1 tsp moringa powder" },
      { icon: "coconut", text: "1 cup coconut water" },
    ],
    method: "Blend on high for 45 seconds. Serve immediately.",
  },
  {
    id: "acai",
    name: "Antioxidant Acai",
    tagline: "Thick purple base, light on sugar",
    liquid: "#5b2d82",
    meniscus: "#8b5bb8",
    ingredients: [
      { icon: "acai", text: "1 packet unsweetened frozen acai" },
      { icon: "banana", text: "1 frozen banana" },
      { icon: "berries", text: "½ cup frozen mixed berries" },
      { icon: "milk", text: "½ cup unsweetened almond milk" },
      { icon: "almond-butter", text: "1 tbsp almond butter" },
      { icon: "chia", text: "1 tsp chia seeds" },
      { icon: "blueberries", text: "Fresh blueberries to top" },
    ],
    method: "Blend thick with minimal liquid. Top with berries and chia.",
  },
] as const;

export function GreenJuiceLead() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rowRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rowRef} className="timeline-lead-row">
      <p className="timeline-lead">
        Day 1 — with{" "}
        <button
          type="button"
          className="green-juice-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          green juice
        </button>
        .
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Green juice menu">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close green juice menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 1</span>
            <h4 className="juice-menu-title">Green juice bar</h4>
            <p className="juice-menu-sub">Three blends for the weekend kickoff.</p>
          </div>

          <ul className="juice-menu-list">
            {drinks.map((drink) => (
              <li key={drink.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <DrinkGlassMini liquid={drink.liquid} meniscus={drink.meniscus} />
                  <span className="juice-drink-name">{drink.name}</span>
                  <span className="juice-drink-tag">{drink.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
                  <span className="juice-recipe-label">Recipe</span>
                  <ul className="juice-ingredients">
                    {drink.ingredients.map((item) => (
                      <li key={item.text}>
                        <IngredientIcon name={item.icon} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="juice-method">{drink.method}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

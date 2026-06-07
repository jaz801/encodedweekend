"use client";

// Dinner menu: USA steak, Italian lasagna, Middle East hummus — fresh-made black card.

import { useEffect, useId, useRef, useState } from "react";
import { DinnerPlateMini } from "./DinnerPlateMini";
import { IngredientIcon } from "./IngredientIcon";

const dinners = [
  {
    id: "usa-steak",
    variant: "steak" as const,
    region: "USA",
    name: "Steak & Hand-Cut Frites",
    tagline: "Pepper-crusted ribeye with cognac cream sauce",
    ingredients: [
      { icon: "steak", text: "10 oz dry-aged ribeye or New York strip" },
      { icon: "pepper", text: "2 tbsp cracked black peppercorns" },
      { icon: "pepper", text: "2 tbsp green peppercorns, lightly crushed" },
      { icon: "wine", text: "3 tbsp cognac or brandy, for flambé" },
      { icon: "cream", text: "1 cup heavy cream" },
      { icon: "onion", text: "2 shallots, finely minced" },
      { icon: "butter", text: "2 tbsp butter" },
      { icon: "olive-oil", text: "2 tbsp olive oil" },
      { icon: "potato", text: "Russet potatoes, hand-cut into frites" },
      { icon: "asparagus", text: "Roasted asparagus and baby carrots" },
      { icon: "garlic", text: "2 cloves garlic and fresh thyme" },
    ],
    method:
      "Crust the steak in pepper, sear in butter and oil, rest. Deglaze with cognac, reduce cream with shallots into a silky pepper sauce. Serve with twice-cooked frites and roasted vegetables.",
  },
  {
    id: "italian-lasagna",
    variant: "lasagna" as const,
    region: "Italian",
    name: "Premium Lasagna",
    tagline: "Slow-braised ragù with red wine and fresh pasta layers",
    ingredients: [
      { icon: "pasta", text: "Fresh egg pasta sheets, rolled today" },
      { icon: "steak", text: "1 lb wagyu-beef and pork ragù blend" },
      { icon: "wine", text: "1 cup full-bodied red wine (Barolo or Chianti)" },
      { icon: "tomato", text: "San Marzano tomatoes, slow-simmered" },
      { icon: "cheese", text: "Fresh ricotta, mozzarella, and Parmigiano" },
      { icon: "cream", text: "Béchamel with nutmeg and butter" },
      { icon: "onion", text: "Onion, carrot, celery soffritto" },
      { icon: "garlic", text: "4 cloves garlic, minced" },
      { icon: "olive-oil", text: "Extra virgin olive oil" },
      { icon: "spinach", text: "Fresh basil to finish" },
    ],
    method:
      "Build the ragù with soffritto, wine reduction, and tomatoes until deep and rich. Layer fresh pasta with ragù, cheeses, and béchamel. Bake until bubbling with a golden top.",
  },
  {
    id: "middle-east-hummus",
    variant: "hummus" as const,
    region: "Middle East",
    name: "Hummus",
    tagline: "Silky chickpea hummus with tahini and warm spices",
    ingredients: [
      { icon: "chickpea", text: "1½ cups dried chickpeas, soaked overnight" },
      { icon: "tahini", text: "⅓ cup premium tahini" },
      { icon: "lemon", text: "Juice of 2 lemons" },
      { icon: "garlic", text: "3 cloves roasted garlic" },
      { icon: "olive-oil", text: "¼ cup extra virgin olive oil, plus finish" },
      { icon: "turmeric", text: "1 tsp cumin and smoked paprika" },
      { icon: "sesame", text: "Toasted pine nuts and sesame" },
      { icon: "paprika", text: "Sumac and za'atar to garnish" },
      { icon: "pita", text: "Warm fresh pita and pickled vegetables" },
    ],
    method:
      "Cook soaked chickpeas until tender. Blend with tahini, lemon, roasted garlic, and ice water until cloud-smooth. Swirl on a plate, finish with olive oil, herbs, pine nuts, and warm pita.",
  },
] as const;

export function DinnerLead() {
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
        <button
          type="button"
          className="lunch-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          Select a meal based on frequency.
        </button>
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Dinner menu">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close dinner menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 1</span>
            <h4 className="juice-menu-title">Dinner</h4>
            <p className="juice-menu-sub">
              Every dish is made fresh today — highest quality, maximum care. Pick what matches
              your frequency.
            </p>
          </div>

          <ul className="juice-menu-list">
            {dinners.map((dinner) => (
              <li key={dinner.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <DinnerPlateMini variant={dinner.variant} />
                  <span className="juice-drink-region">{dinner.region}</span>
                  <span className="juice-drink-name">{dinner.name}</span>
                  <span className="juice-drink-tag">{dinner.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
                  <span className="juice-recipe-label">Recipe</span>
                  <ul className="juice-ingredients">
                    {dinner.ingredients.map((item) => (
                      <li key={item.text}>
                        <IngredientIcon name={item.icon} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="juice-method">{dinner.method}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

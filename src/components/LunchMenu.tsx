"use client";

// Lunch/brunch menu: three superfood dishes in expandable black card with bowl icons.

import { useEffect, useId, useRef, useState } from "react";
import { IngredientIcon } from "./IngredientIcon";
import { LunchBowlMini } from "./LunchBowlMini";

const lunches = [
  {
    id: "poke-bowl",
    variant: "poke" as const,
    name: "Superfood Poke Bowl",
    tagline: "Sushi-grade salmon over quinoa with vibrant toppings",
    ingredients: [
      { icon: "salmon", text: "8 oz sashimi-grade salmon, cubed" },
      { icon: "quinoa", text: "1 cup cooked tri-color quinoa" },
      { icon: "avocado", text: "1 ripe avocado, sliced" },
      { icon: "edamame", text: "½ cup steamed shelled edamame" },
      { icon: "cucumber", text: "½ cup diced cucumber" },
      { icon: "carrot", text: "½ cup shredded carrot" },
      { icon: "cabbage", text: "½ cup shredded red cabbage" },
      { icon: "soy", text: "2 tbsp tamari or soy sauce" },
      { icon: "sesame", text: "1 tsp toasted sesame oil" },
      { icon: "ginger", text: "1 tsp grated fresh ginger" },
      { icon: "sesame", text: "1 tsp toasted sesame seeds" },
    ],
    method:
      "Marinate salmon 20 minutes in tamari, sesame oil, and ginger. Layer quinoa in bowls, arrange toppings, and drizzle with the remaining sauce.",
  },
  {
    id: "super-salad",
    variant: "salad" as const,
    name: "Superfood Salad",
    tagline: "Massaged kale, blueberries, walnuts, and maple-Dijon dressing",
    ingredients: [
      { icon: "kale", text: "2 cups chopped curly kale, massaged" },
      { icon: "spinach", text: "1 cup baby spinach" },
      { icon: "quinoa", text: "1 cup cooked quinoa, cooled" },
      { icon: "blueberries", text: "1 cup fresh blueberries" },
      { icon: "walnut", text: "½ cup toasted walnuts, chopped" },
      { icon: "avocado", text: "1 large avocado, diced" },
      { icon: "broccoli", text: "1 cup broccoli florets, blanched" },
      { icon: "edamame", text: "½ cup shelled edamame" },
      { icon: "onion", text: "⅓ cup finely diced red onion" },
      { icon: "olive-oil", text: "⅓ cup extra virgin olive oil" },
      { icon: "lemon", text: "1 tbsp lemon juice" },
      { icon: "dijon", text: "1 tbsp Dijon mustard" },
      { icon: "maple", text: "2 tbsp pure maple syrup" },
    ],
    method:
      "Whisk the dressing. Toss kale and spinach with dressing, then fold in quinoa, blueberries, walnuts, avocado, broccoli, edamame, and onion.",
  },
  {
    id: "super-soup",
    variant: "soup" as const,
    name: "Superfood Soup",
    tagline: "Golden turmeric lentil soup with ginger and wilted spinach",
    ingredients: [
      { icon: "lentil", text: "1½ cups dried red lentils, rinsed" },
      { icon: "spinach", text: "2 cups fresh spinach, chopped" },
      { icon: "onion", text: "1 small yellow onion, diced" },
      { icon: "carrot", text: "2 carrots, diced" },
      { icon: "celery", text: "2 celery stalks, diced" },
      { icon: "garlic", text: "3 cloves garlic, minced" },
      { icon: "ginger", text: "1 tbsp grated fresh ginger" },
      { icon: "turmeric", text: "1 tsp turmeric, 1 tsp cumin, ½ tsp coriander" },
      { icon: "coconut", text: "1 can (400 ml) coconut milk" },
      { icon: "olive-oil", text: "1 tbsp olive oil" },
      { icon: "lemon", text: "Juice of ½ lemon" },
    ],
    method:
      "Sauté onion, carrot, and celery. Add garlic, ginger, and spices. Simmer lentils in vegetable broth and coconut milk 20–25 minutes. Stir in spinach and finish with lemon.",
  },
] as const;

export function LunchBrunchLead() {
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
          Select which lunch matches your frequency.
        </button>
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Lunch and brunch menu">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close lunch menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 1</span>
            <h4 className="juice-menu-title">Lunch / Brunch</h4>
            <p className="juice-menu-sub">Three superfood plates — pick what matches your frequency.</p>
          </div>

          <ul className="juice-menu-list">
            {lunches.map((lunch) => (
              <li key={lunch.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <LunchBowlMini variant={lunch.variant} />
                  <span className="juice-drink-name">{lunch.name}</span>
                  <span className="juice-drink-tag">{lunch.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
                  <span className="juice-recipe-label">Recipe</span>
                  <ul className="juice-ingredients">
                    {lunch.ingredients.map((item) => (
                      <li key={item.text}>
                        <IngredientIcon name={item.icon} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="juice-method">{lunch.method}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

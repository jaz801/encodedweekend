"use client";

// Day 2 breakfast plate picker — English breakfast, pancakes, or oatmeal with recipes.
// Fixed: lead copy is "Select a breakfast plate".

import { useId, useRef, useState } from "react";
import { BreakfastPlateMini } from "./BreakfastPlateMini";
import { IngredientIcon } from "./IngredientIcon";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const breakfastPlates = [
  {
    id: "english-breakfast",
    variant: "english" as const,
    name: "English Breakfast",
    tagline: "The classic fry-up done properly",
    ingredients: [
      { icon: "steak", text: "4 pork sausages (Cumberland or chipolatas)" },
      { icon: "steak", text: "6 rashers back bacon" },
      { icon: "egg", text: "4 eggs, fried or scrambled" },
      { icon: "tomato", text: "2 tomatoes, halved and lightly fried" },
      { icon: "mushroom", text: "2 cups mushrooms, sautéed in butter" },
      { icon: "beans", text: "1 can baked beans, warmed gently" },
      { icon: "potato", text: "4 slices bread, toasted or fried" },
      { icon: "butter", text: "Butter, salt, pepper, and brown sauce" },
    ],
    method:
      "Warm a large plate. Fry sausages slowly until cooked through, then bacon until crisp. Sauté mushrooms and tomatoes in the same pan. Warm beans in a small pot. Fry or poach eggs last so the yolks stay runny. Pile everything on the plate and serve with toast.",
  },
  {
    id: "pancakes",
    variant: "pancake" as const,
    name: "Fluffy Pancakes",
    tagline: "Stacked high with maple and butter",
    ingredients: [
      { icon: "milk", text: "1 cup milk (dairy or oat)" },
      { icon: "egg", text: "2 large eggs" },
      { icon: "maple", text: "1 tbsp sugar + maple syrup to serve" },
      { icon: "butter", text: "2 tbsp melted butter, plus more for the pan" },
      { icon: "flour", text: "⅔ cup all-purpose flour" },
      { icon: "moringa", text: "2 tsp baking powder" },
      { icon: "berries", text: "Fresh berries or banana to top (optional)" },
    ],
    method:
      "Whisk milk, eggs, sugar, and melted butter. Fold in flour, baking powder, and a pinch of salt — do not overmix. Rest the batter 5 minutes. Cook ¼-cup scoops on a medium-hot buttered pan until bubbles form, flip, and finish golden. Stack and serve with maple syrup.",
  },
  {
    id: "oatmeal",
    variant: "oatmeal" as const,
    name: "Creamy Oatmeal",
    tagline: "Slow oats with a silky finish",
    ingredients: [
      { icon: "milk", text: "1 cup milk + ½ cup water" },
      { icon: "oats", text: "½ cup rolled oats" },
      { icon: "maple", text: "1 tbsp maple syrup or honey" },
      { icon: "butter", text: "1 tsp butter" },
      { icon: "cinnamon", text: "Pinch cinnamon and sea salt" },
      { icon: "berries", text: "Blueberries, banana, or nut butter to top" },
    ],
    method:
      "Toast oats in butter for 1 minute until fragrant. Add water and simmer 4 minutes, stirring. Pour in milk and cook 3–4 minutes more until creamy and tender. Sweeten with maple, finish with cinnamon, and top with fruit or nuts.",
  },
] as const;

export function BreakfastPlateMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rowRef = useRef<HTMLDivElement>(null);

  useChoiceMenu(open, setOpen, rowRef);

  return (
    <div ref={rowRef} className="timeline-lead-row timeline-lead-row-secondary">
      <p className="timeline-lead">
        <button
          type="button"
          className="choice-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          Select a breakfast plate
        </button>
        .
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Breakfast plate menu">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close breakfast plate menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 2</span>
            <h4 className="juice-menu-title">Breakfast plates</h4>
            <p className="juice-menu-sub">Hearty plates alongside your energizer drink.</p>
          </div>

          <ul className="juice-menu-list">
            {breakfastPlates.map((item) => (
              <li key={item.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <BreakfastPlateMini variant={item.variant} />
                  <span className="juice-drink-name">{item.name}</span>
                  <span className="juice-drink-tag">{item.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
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

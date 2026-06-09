"use client";

// Day 3 brunch picker — banh mi, panini, and falafel wrap.
// Fixed: recipes rewritten from Hot Thai Kitchen, Food Network, and The Lemon Bowl sources.

import { useId, useRef, useState } from "react";
import { IngredientIcon } from "./IngredientIcon";
import { SandwichMini } from "./SandwichMini";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const baguettes = [
  {
    id: "banh-mi",
    variant: "banhmi" as const,
    region: "Vietnam",
    name: "Banh Mi",
    tagline: "Grilled lemongrass pork, đồ chua, pâté, and fresh herbs",
    ingredients: [
      { icon: "baguette", text: "4 Vietnamese baguettes — crisp crust, airy crumb" },
      { icon: "steak", text: "400 g pork tenderloin, silverskin removed" },
      { icon: "garlic", text: "3 cloves garlic, minced" },
      { icon: "ginger", text: "1 tbsp lemongrass paste (or 2 stalks, minced)" },
      { icon: "soy", text: "1½ tbsp fish sauce and 1 tbsp soy sauce" },
      { icon: "maple", text: "1 tbsp sugar for the pork marinade" },
      { icon: "turmeric", text: "½ tsp Chinese five-spice powder" },
      { icon: "carrot", text: "90 g carrot and 90 g daikon, cut into batons" },
      { icon: "lemon", text: "½ cup rice vinegar, 3 tbsp sugar, ¼ tsp salt (đồ chua brine)" },
      { icon: "butter", text: "Pork liver pâté and mayonnaise for both sides of the bread" },
      { icon: "cucumber", text: "1 cucumber, cut into long thin sticks" },
      { icon: "basil", text: "Fresh cilantro and Thai basil, torn" },
      { icon: "jalapeno", text: "1–2 jalapeños, thinly sliced (optional)" },
    ],
    method:
      "Massage carrot and daikon with salt and sugar, rinse, then pickle in vinegar brine at least 10 minutes (or up to 1 month refrigerated). Marinate pork in garlic, lemongrass, fish sauce, soy, sugar, and five-spice 30 minutes to overnight. Grill over medium-high heat until charred and cooked through, then rest and slice thin. Split baguettes, spread pâté and mayo on both sides, layer pork, đồ chua, cucumber, herbs, and chili. Finish with Maggi seasoning or soy sauce.",
  },
  {
    id: "panini",
    variant: "panini" as const,
    region: "Italy",
    name: "Panini",
    tagline: "Prosciutto di Parma, roasted peppers, and fresh mozzarella — pressed crisp",
    ingredients: [
      { icon: "baguette", text: "8 thin slices chewy crusty Italian bread or ciabatta" },
      { icon: "steak", text: "150 g thinly sliced prosciutto di Parma" },
      { icon: "cheese", text: "450 g fresh mozzarella, sliced" },
      { icon: "pepper", text: "1 jar (400 g) roasted red peppers, drained well" },
      { icon: "basil", text: "4 tbsp fresh basil pesto (optional layer)" },
      { icon: "spinach", text: "2 cups arugula (optional)" },
      { icon: "olive-oil", text: "Extra-virgin olive oil for drizzling the bread exterior" },
    ],
    method:
      "Preheat a grill pan or heavy skillet over medium-high heat. On each bottom slice, layer 2–3 slices prosciutto, an even layer of roasted pepper, then mozzarella. Add arugula or pesto if using, and close the sandwich. Drizzle both outer sides with olive oil. Weight with a foil-covered brick or another heavy pan and press 2–3 minutes per side until the bread is golden and the cheese melts. Rest 1 minute, then cut on the bias and serve immediately.",
  },
  {
    id: "falafel-wrap",
    variant: "falafel" as const,
    region: "Lebanon",
    name: "Falafel Wrap",
    tagline: "Classic chickpea falafel, hummus, tahini, and pickled turnips",
    ingredients: [
      { icon: "chickpea", text: "225 g dry chickpeas, soaked 12–24 hours (do not use canned)" },
      { icon: "onion", text: "1 small onion, quartered" },
      { icon: "garlic", text: "3 cloves garlic" },
      { icon: "spinach", text: "1 cup flat-leaf parsley and ½ cup cilantro" },
      { icon: "turmeric", text: "1 tsp ground cumin and 1 tsp ground coriander" },
      { icon: "maple", text: "1½ tsp salt and ½ tsp baking soda" },
      { icon: "chickpea", text: "Hummus for spreading inside the wrap" },
      { icon: "tahini", text: "¼ cup tahini, 2 tbsp lemon juice, 1 clove garlic, warm water to thin" },
      { icon: "tomato", text: "1 cup diced tomato and thinly sliced red onion" },
      { icon: "pickle", text: "Pickled turnips or cucumber ribbons" },
      { icon: "wrap", text: "4 large pita breads or lavash wraps, warmed" },
      { icon: "spinach", text: "Shredded lettuce and fresh mint" },
    ],
    method:
      "Pulse onion, garlic, parsley, and cilantro until chopped. Add drained soaked chickpeas, cumin, coriander, salt, and baking soda. Pulse until coarse and sandy — not a smooth paste. Rest the mix 30 minutes, then shape into balls or patties and deep-fry at 175°C until deeply golden, or bake at 220°C until crisp. Whisk tahini sauce with lemon, garlic, salt, and water until pourable. Spread hummus on warm pita, add falafel, tomato, onion, pickles, and lettuce. Drizzle tahini, roll tight, and cut in half.",
  },
] as const;

export function BrunchBaguetteMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rowRef = useRef<HTMLDivElement>(null);

  useChoiceMenu(open, setOpen, rowRef);

  return (
    <div ref={rowRef} className="timeline-lead-row">
      <p className="timeline-lead">
        <button
          type="button"
          className="choice-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          Select your baguette
        </button>
        .
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Brunch baguette menu">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close brunch menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 3</span>
            <h4 className="juice-menu-title">Brunch</h4>
            <p className="juice-menu-sub">
              Three stacked sandwiches — Vietnamese banh mi, Italian panini, or a falafel wrap.
              Recipes drawn from published sources; pick what you want built fresh.
            </p>
          </div>

          <ul className="juice-menu-list">
            {baguettes.map((item) => (
              <li key={item.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <SandwichMini variant={item.variant} />
                  <span className="juice-drink-region">{item.region}</span>
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

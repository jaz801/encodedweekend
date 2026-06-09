"use client";

// Day 3 fusion dinner — vegan Indonesian curry, Korean BBQ burger, and chorizo quesadilla.
// Fixed: replaced lemongrass pork tacos with vegan Indonesian vegetable curry.
// Fixed: meal cards use dual country flags instead of food plate icons.

import { useId, useRef, useState } from "react";
import { FusionFlagMini } from "./FusionFlagMini";
import { IngredientIcon } from "./IngredientIcon";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const fusionMeals = [
  {
    id: "vegan-indonesian-curry",
    variant: "indonesia-india" as const,
    region: "Indonesia × India",
    name: "Vegan Indonesian Curry",
    tagline: "Coconut vegetable curry with tempeh, galangal, and steamed jasmine rice",
    ingredients: [
      { icon: "chickpea", text: "300 g tempeh, cut into bite-size cubes" },
      { icon: "coconut", text: "1 can (400 ml) full-fat coconut milk" },
      { icon: "carrot", text: "2 cups mixed vegetables — green beans, cabbage, and carrot" },
      { icon: "turmeric", text: "2 tbsp red curry paste (or homemade rempah)" },
      { icon: "onion", text: "3 shallots and 4 cloves garlic, minced" },
      { icon: "ginger", text: "1 tbsp grated fresh ginger or galangal" },
      { icon: "lemon", text: "2 kaffir lime leaves (or 1 tbsp lime juice)" },
      { icon: "soy", text: "1 tbsp tamari" },
      { icon: "maple", text: "1 tsp coconut sugar or palm sugar" },
      { icon: "beans", text: "400 ml vegetable stock" },
      { icon: "quinoa", text: "Steamed jasmine rice to serve" },
      { icon: "basil", text: "Crispy fried shallots, cilantro, and Thai basil to garnish" },
    ],
    method:
      "Pan-fry tempeh in a little oil until golden on all sides; set aside. Fry shallots, garlic, ginger, and curry paste in oil until fragrant. Pour in coconut milk and stock, add lime leaves, tamari, and sugar, then simmer vegetables until just tender. Return tempeh to the pot and cook 5 minutes so it absorbs the sauce. Adjust salt and spice, then serve over jasmine rice with fried shallots and fresh herbs.",
  },
  {
    id: "korean-bbq-burger",
    variant: "korea-usa" as const,
    region: "Korea × USA",
    name: "Korean BBQ Burger",
    tagline: "Tempeh patty glazed in gochujang barbecue sauce with kimchi slaw",
    ingredients: [
      { icon: "chickpea", text: "8 oz tempeh, crumbled (or 4 plant-based burger patties)" },
      { icon: "soy", text: "½ cup low-sodium tamari" },
      { icon: "maple", text: "¼ cup brown sugar or maple syrup" },
      { icon: "garlic", text: "2–3 cloves garlic, minced" },
      { icon: "ginger", text: "1 tbsp minced fresh ginger" },
      { icon: "soy", text: "1 tbsp gochujang and 2 tsp white miso (doenjang substitute)" },
      { icon: "lemon", text: "1 tbsp rice vinegar" },
      { icon: "sesame", text: "1 tbsp toasted sesame oil" },
      { icon: "flour", text: "1 tbsp cornstarch whisked with ¼ cup water" },
      { icon: "pita", text: "4 burger buns, toasted" },
      { icon: "cabbage", text: "Kimchi slaw — shredded cabbage tossed with kimchi" },
      { icon: "butter", text: "Gochujang mayo — vegan mayo mixed with gochujang" },
    ],
    method:
      "Simmer tamari, brown sugar, garlic, ginger, gochujang, vinegar, sesame oil, and miso until the sugar dissolves. Whisk in cornstarch slurry and cook 1–2 minutes until glossy. Mix crumbled tempeh with water, tamari, gochujang, miso, garlic, ginger, and breadcrumbs; form 4 patties and pan-fry until browned. Glaze patties with Korean BBQ sauce in the pan until sticky. Stack on toasted buns with gochujang mayo and kimchi slaw.",
  },
  {
    id: "chorizo-quesadilla",
    variant: "mexico-spain" as const,
    region: "Mexico × Spain",
    name: "Chorizo Quesadilla",
    tagline: "Crispy tortilla, melted Oaxaca cheese, and spiced Mexican chorizo",
    ingredients: [
      { icon: "steak", text: "1 lb Mexican chorizo, casings removed" },
      { icon: "onion", text: "1 onion, diced" },
      { icon: "pepper", text: "1 red bell pepper, diced" },
      { icon: "cheese", text: "2 cups shredded Oaxaca or Chihuahua cheese" },
      { icon: "wrap", text: "8 flour tortillas (10-inch)" },
      { icon: "olive-oil", text: "3 tbsp canola or vegetable oil, divided" },
      { icon: "tomato", text: "1 cup pico de gallo to serve" },
      { icon: "cream", text: "Sour cream or crema for serving" },
      { icon: "turmeric", text: "Salt and black pepper to season the filling" },
    ],
    method:
      "Brown chorizo in a skillet over medium-high heat, breaking it up with a spoon, 3–5 minutes. Add onion and bell pepper; cook until the chorizo is cooked through and the vegetables are tender. Drain excess fat if needed. Warm tortillas on a griddle. Divide cheese over half of each tortilla, top with chorizo mixture, fold in half, and press. Cook in an oiled skillet 2–4 minutes per side until golden and the cheese melts. Cut into wedges and serve with pico de gallo and sour cream.",
  },
] as const;

export function FusionDinnerMenu() {
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
          Choose your meal
        </button>
        .
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Fusion dinner menu">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close dinner menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 3</span>
            <h4 className="juice-menu-title">Dinner</h4>
            <p className="juice-menu-sub">
              Three fusion plates — a vegan Indonesian curry, a Korean BBQ burger, and a classic
              chorizo quesadilla. Pick what matches your frequency tonight.
            </p>
          </div>

          <ul className="juice-menu-list">
            {fusionMeals.map((meal) => (
              <li key={meal.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <FusionFlagMini variant={meal.variant} />
                  <span className="juice-drink-region">{meal.region}</span>
                  <span className="juice-drink-name">{meal.name}</span>
                  <span className="juice-drink-tag">{meal.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
                  <span className="juice-recipe-label">Recipe</span>
                  <ul className="juice-ingredients">
                    {meal.ingredients.map((item) => (
                      <li key={item.text}>
                        <IngredientIcon name={item.icon} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="juice-method">{meal.method}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

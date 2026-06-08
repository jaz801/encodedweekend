"use client";

// Day 2 dinner soup picker — ramen, pho, or green pea soup with researched recipes.
// Fixed: added 19:00 dinner with three soup options, icons, and ingredient lists.

import { useId, useRef, useState } from "react";
import { IngredientIcon } from "./IngredientIcon";
import { SoupBowlMini } from "./SoupBowlMini";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const soups = [
  {
    id: "ramen",
    variant: "ramen" as const,
    region: "Japan",
    name: "Ramen",
    tagline: "Creamy tonkotsu broth with shoyu tare",
    ingredients: [
      { icon: "steak", text: "3 lb pork trotters and marrow bones, blanched and scrubbed clean" },
      { icon: "ginger", text: "1 knob ginger and 1 head garlic, charred" },
      { icon: "onion", text: "1 large onion and 1 bunch scallions" },
      { icon: "mushroom", text: "1 dried shiitake and 1 piece kombu (dried kelp)" },
      { icon: "soy", text: "4 tbsp usukuchi soy sauce, 2 tbsp sake, 2 tbsp mirin" },
      { icon: "pasta", text: "4 portions fresh alkaline ramen noodles" },
      { icon: "egg", text: "4 soft-boiled ajitama eggs (6 min 30 sec)" },
      { icon: "steak", text: "8 slices chashu pork belly, braised in soy and mirin" },
      { icon: "mushroom", text: "Rehydrated wood ear mushrooms and menma bamboo shoots" },
    ],
    method:
      "Blanch bones, then simmer 8–12 hours at a rolling boil for a milky collagen-rich broth. Build shoyu tare with soy, sake, mirin, kombu, and shiitake. Bowl: tare first, hot broth, noodles, chashu, egg, scallions, and mushrooms.",
  },
  {
    id: "pho",
    variant: "pho" as const,
    region: "Vietnam",
    name: "Pho",
    tagline: "Clear beef broth with charred aromatics and warm spice",
    ingredients: [
      { icon: "steak", text: "3 lb beef marrow and knuckle bones, parboiled 10 min" },
      { icon: "steak", text: "1 lb beef brisket and 8 oz eye of round, sliced paper-thin" },
      { icon: "onion", text: "2 large onions and 4-inch ginger, charred over flame" },
      { icon: "cinnamon", text: "3 star anise, 1 cinnamon stick, cloves, coriander, fennel" },
      { icon: "soy", text: "3 tbsp fish sauce, 1 tbsp yellow rock sugar, kosher salt" },
      { icon: "pasta", text: "1 lb dried flat rice noodles (bánh phở)" },
      { icon: "spinach", text: "Thai basil, cilantro, mint, and bean sprouts" },
      { icon: "lemon", text: "Lime wedges, sliced jalapeños, and hoisin on the side" },
      { icon: "onion", text: "Thinly sliced white onion and scallion greens" },
    ],
    method:
      "Parboil and rinse bones for a clear broth. Char onion and ginger, toast spices, then simmer gently 4–6 hours — skim often. Season with fish sauce and rock sugar. Serve boiling broth over noodles with raw beef slices that cook in the bowl; finish with herbs, sprouts, and lime.",
  },
  {
    id: "green-pea",
    variant: "pea" as const,
    region: "Spring",
    name: "Green Pea Soup",
    tagline: "Bright peas blended with fresh mint and crème fraîche",
    ingredients: [
      { icon: "butter", text: "3 tbsp unsalted butter and 1 medium onion, chopped" },
      { icon: "garlic", text: "2 cloves garlic, minced" },
      { icon: "pea", text: "6 cups shelled fresh peas or frozen petite peas" },
      { icon: "mint", text: "¼ cup fresh mint leaves and ¼ cup flat-leaf parsley" },
      { icon: "celery", text: "4 cups low-sodium vegetable broth, divided" },
      { icon: "cream", text: "¼ cup crème fraîche whisked with 2 tbsp heavy cream" },
      { icon: "olive-oil", text: "Drizzle of extra virgin olive oil to finish" },
      { icon: "onion", text: "Fresh chives, chopped, for garnish" },
    ],
    method:
      "Sweat onion in butter until soft, add garlic, then peas and half the broth. Simmer 5 minutes until tender. Blend with mint and parsley until silky; thin with remaining broth. Season, serve warm, and top with chives, a swirl of crème fraîche, and olive oil.",
  },
] as const;

export function SoupMenu() {
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
          Select your soup
        </button>
        .
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Soup menu">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close soup menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 2</span>
            <h4 className="juice-menu-title">Dinner</h4>
            <p className="juice-menu-sub">
              Three soups — slow-built ramen, aromatic pho, or a light green pea bowl. Pick what
              your body wants tonight.
            </p>
          </div>

          <ul className="juice-menu-list">
            {soups.map((soup) => (
              <li key={soup.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <SoupBowlMini variant={soup.variant} />
                  <span className="juice-drink-region">{soup.region}</span>
                  <span className="juice-drink-name">{soup.name}</span>
                  <span className="juice-drink-tag">{soup.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
                  <span className="juice-recipe-label">Recipe</span>
                  <ul className="juice-ingredients">
                    {soup.ingredients.map((item) => (
                      <li key={item.text}>
                        <IngredientIcon name={item.icon} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="juice-method">{soup.method}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

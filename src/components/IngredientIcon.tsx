// Fixed: ingredient icons for green juice, lunch/brunch, breakfast plate, and soup recipes.
// Fixed: added pea and mint icons for Day 2 green pea soup.
// Fixed: added baguette, basil, jalapeño, pickle, and wrap icons for Day 3 brunch menu.
// Recurring bug: hand-written path d strings with chained negatives (e.g. 0-6-3-8) break SVG parse in Chrome.

type IngredientIconProps = {
  name: string;
  className?: string;
};

export function IngredientIcon({ name, className = "" }: IngredientIconProps) {
  const shared = {
    className: `ingredient-icon ${className}`.trim(),
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "matcha":
      return (
        <svg {...shared}>
          <path
            d="M10 3C7 5 5 8 5 11a5 5 0 0 0 10 0c0-3-2-6-5-8Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M10 3v14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "spirulina":
      return (
        <svg {...shared}>
          <path
            d="M3 11c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M3 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );
    case "banana":
      return (
        <svg {...shared}>
          <path
            d="M6 14c-1-4 1-8 5-10 2 3 2 7 0 10-2 2-4 2-5 0Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "coconut":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="12" rx="5" ry="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7 8c1-2 5-2 6 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="10" cy="12" r="1.2" fill="currentColor" />
        </svg>
      );
    case "ice":
      return (
        <svg {...shared}>
          <path
            d="M10 3 13 8l-3 9-3-9 6-5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "spinach":
      return (
        <svg {...shared}>
          <path
            d="M10 4c-3 2-4 5-3 8 1-2 3-3 5-2-2-3-1-5-2-6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M10 10v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "cucumber":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="10" rx="7" ry="4" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="10" r="0.8" fill="currentColor" />
          <circle cx="12" cy="9" r="0.8" fill="currentColor" />
        </svg>
      );
    case "apple":
      return (
        <svg {...shared}>
          <path
            d="M11 4c2 0 4 2 4 5a4.5 4.5 0 0 1-9 0c0-3 2-5 4-5 1-2 2-2 1 0Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M11 4V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "lemon":
      return (
        <svg {...shared}>
          <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10 4v12M6 10h8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "ginger":
      return (
        <svg {...shared}>
          <path
            d="M6 12c0-3 2-6 5-7 2 2 1 5-1 7-2 2-4 1-4 0Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M12 6c2 1 3 3 2 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "moringa":
      return (
        <svg {...shared}>
          <path d="M10 16V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="M10 8c-2-1-4 0-4 2s2 3 4 2M10 11c2-1 4 0 4 2s-2 3-4 2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "acai":
      return (
        <svg {...shared}>
          <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="9" r="1" fill="currentColor" opacity="0.7" />
          <circle cx="12" cy="11" r="1" fill="currentColor" opacity="0.7" />
        </svg>
      );
    case "berries":
      return (
        <svg {...shared}>
          <circle cx="7" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="13" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "milk":
      return (
        <svg {...shared}>
          <path
            d="M7 4h6l1 3v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7l1-3Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M8 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "almond-butter":
      return (
        <svg {...shared}>
          <rect x="5" y="5" width="10" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7 9h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "chia":
      return (
        <svg {...shared}>
          <circle cx="7" cy="8" r="1.2" fill="currentColor" />
          <circle cx="12" cy="7" r="1.2" fill="currentColor" />
          <circle cx="10" cy="12" r="1.2" fill="currentColor" />
          <circle cx="14" cy="13" r="1.2" fill="currentColor" />
          <circle cx="6" cy="13" r="1.2" fill="currentColor" />
        </svg>
      );
    case "blueberries":
      return (
        <svg {...shared}>
          <circle cx="8" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="13" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 8V6M13 9V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "salmon":
      return (
        <svg {...shared}>
          <path
            d="M4 10c3-3 7-4 11-2 2 1 4 1 5-1 1 3-1 5-3 6-4 2-9 1-13-3Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="9" r="0.8" fill="currentColor" />
        </svg>
      );
    case "quinoa":
      return (
        <svg {...shared}>
          <circle cx="7" cy="8" r="1" fill="currentColor" />
          <circle cx="11" cy="7" r="1" fill="currentColor" />
          <circle cx="14" cy="10" r="1" fill="currentColor" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="13" cy="13" r="1" fill="currentColor" />
          <circle cx="6" cy="13" r="1" fill="currentColor" opacity="0.7" />
        </svg>
      );
    case "avocado":
      return (
        <svg {...shared}>
          <path
            d="M10 5c-2 3-2 7 0 10 2 2 5 2 7 0 2-3 2-7 0-10-2-2-5-2-7 0Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.35" />
        </svg>
      );
    case "edamame":
      return (
        <svg {...shared}>
          <path
            d="M8 6c2-1 5-1 7 1 2 2 2 5 0 7-2 2-5 2-7 0-2-2-2-5 0-7 2-2 5-2 7-1Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="10" cy="10" r="1.2" fill="currentColor" />
          <circle cx="13" cy="11" r="1.2" fill="currentColor" />
        </svg>
      );
    case "carrot":
      return (
        <svg {...shared}>
          <path
            d="M9 15c0-4 2-8 5-10 1 3 0 6-2 8-2 2-4 3-3 2Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M14 5l1-2M15 6l2-1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "cabbage":
      return (
        <svg {...shared}>
          <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 10h8M10 6v8" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        </svg>
      );
    case "soy":
      return (
        <svg {...shared}>
          <path
            d="M8 4h4l2 3v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7l2-3Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M9 10h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "sesame":
      return (
        <svg {...shared}>
          <circle cx="7" cy="9" r="1" fill="currentColor" />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
          <circle cx="13" cy="9" r="1" fill="currentColor" />
          <circle cx="11" cy="12" r="1" fill="currentColor" />
          <circle cx="8" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case "kale":
      return (
        <svg {...shared}>
          <path
            d="M10 4c-3 1-5 4-4 7 1-2 3-3 5-2M10 9c2-1 4 0 5 2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path d="M10 9v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "walnut":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="11" rx="5" ry="6.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10 6.5v9" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "broccoli":
      return (
        <svg {...shared}>
          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="11" r="2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M10 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "onion":
      return (
        <svg {...shared}>
          <path
            d="M10 4v2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M7.5 8.5c0-1.8 1.1-3 2.5-3s2.5 1.2 2.5 3v6.5c0 1.5-1.1 2.8-2.5 2.8s-2.5-1.3-2.5-2.8V8.5z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M8 10.5h4M8 12.5h4"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </svg>
      );
    case "lentil":
      return (
        <svg {...shared}>
          <ellipse cx="8" cy="10" rx="2.2" ry="1.6" fill="currentColor" />
          <ellipse cx="12" cy="9" rx="2.2" ry="1.6" fill="currentColor" />
          <ellipse cx="10" cy="13" rx="2.2" ry="1.6" fill="currentColor" opacity="0.75" />
        </svg>
      );
    case "turmeric":
      return (
        <svg {...shared}>
          <path
            d="M7,13 C7,9 9.5,6.5 12.5,5.5 C14,8 13.5,10.5 11.5,12.5 C10,13.5 8,13.5 7,13 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "garlic":
      return (
        <svg {...shared}>
          <path
            d="M10 5v1.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M8 8.5c0-1.7 0.9-3 2-3s2 1.3 2 3v5.5c0 1.3-0.9 2.5-2 2.5s-2-1.2-2-2.5V8.5z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M9 10h2M9 12h2"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "celery":
      return (
        <svg {...shared}>
          <path
            d="M8 16V6c0-2 2-3 4-2 1 3 0 6-2 8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path d="M10 8h4M10 11h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "olive-oil":
      return (
        <svg {...shared}>
          <path
            d="M9 4h2v2c2 0 3 2 3 4v6H6v-6c0-2 1-4 3-4V4Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M8 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "dijon":
      return (
        <svg {...shared}>
          <rect x="6" y="5" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "maple":
      return (
        <svg {...shared}>
          <path
            d="M10 3v3M8 6h4M9 6v9c-2 0-3-1-3-2h6c0 1-1 2-3 2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "steak":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="11" rx="7" ry="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 11c2-1 4-1 6 0" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "pepper":
      return (
        <svg {...shared}>
          <circle cx="8" cy="9" r="1.3" fill="currentColor" />
          <circle cx="12" cy="8" r="1.2" fill="currentColor" />
          <circle cx="10" cy="12" r="1.2" fill="currentColor" />
          <circle cx="14" cy="11" r="1.1" fill="currentColor" opacity="0.8" />
        </svg>
      );
    case "cream":
      return (
        <svg {...shared}>
          <path
            d="M7 5h6l1 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7l1-2Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M8 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "butter":
      return (
        <svg {...shared}>
          <rect x="5" y="8" width="10" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 11h10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "potato":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="11" rx="6" ry="4" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="10" r="0.7" fill="currentColor" opacity="0.5" />
          <circle cx="12" cy="12" r="0.6" fill="currentColor" opacity="0.5" />
        </svg>
      );
    case "asparagus":
      return (
        <svg {...shared}>
          <path
            d="M10 4v12M8 8l2-1 2 1M8 12l2-1 2 1"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "wine":
      return (
        <svg {...shared}>
          <path
            d="M8 4h4v5c0 2-1.5 3.5-2 4.5V16H8v-2.5C7.5 12.5 6 11 6 9V4h2Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M8 9h4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "pasta":
      return (
        <svg {...shared}>
          <rect x="5" y="6" width="10" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          <rect x="5" y="10" width="10" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          <rect x="5" y="14" width="10" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "tomato":
      return (
        <svg {...shared}>
          <circle cx="10" cy="11" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10 6V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8 4h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "cheese":
      return (
        <svg {...shared}>
          <path
            d="M5 14 L10 5 L15 14 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="11" r="0.8" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="12" r="0.7" fill="currentColor" opacity="0.6" />
        </svg>
      );
    case "chickpea":
      return (
        <svg {...shared}>
          <ellipse cx="7" cy="10" rx="2" ry="1.5" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="12" cy="9" rx="2" ry="1.5" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="10" cy="13" rx="2" ry="1.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "tahini":
      return (
        <svg {...shared}>
          <rect x="6" y="5" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 9h4M8 12h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case "paprika":
      return (
        <svg {...shared}>
          <path
            d="M6 14s1-4 4-6 4-2 4-2v10H6Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "pita":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="10" rx="7" ry="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 10h10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      );
    case "egg":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="11" rx="5.5" ry="7" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="10" cy="12" r="2" fill="currentColor" opacity="0.35" />
        </svg>
      );
    case "mushroom":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="8" rx="6" ry="4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 12v5M12 12v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "beans":
      return (
        <svg {...shared}>
          <ellipse cx="7" cy="11" rx="2.2" ry="3" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="11" cy="10" rx="2" ry="2.8" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="14" cy="12" rx="2.1" ry="3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "cinnamon":
      return (
        <svg {...shared}>
          <path
            d="M6 14c2-6 4-8 4-10s2 2 4 8M10 14c1-4 2-6 2-8"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "oats":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="12" rx="6" ry="4" stroke="currentColor" strokeWidth="1.3" />
          {[
            [7, 11],
            [10, 10],
            [13, 11],
            [8.5, 13],
            [11.5, 13],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.8" fill="currentColor" opacity="0.7" />
          ))}
        </svg>
      );
    case "flour":
      return (
        <svg {...shared}>
          <path
            d="M7 6h6l2 3v8H5V9l2-3Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M8 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "pea":
      return (
        <svg {...shared}>
          <circle cx="8" cy="10" r="2.2" fill="currentColor" />
          <circle cx="12" cy="8.5" r="2.2" fill="currentColor" />
          <circle cx="12" cy="13" r="2.2" fill="currentColor" />
          <circle cx="15.5" cy="10.5" r="2.2" fill="currentColor" opacity="0.85" />
        </svg>
      );
    case "mint":
      return (
        <svg {...shared}>
          <path
            d="M10 15 C10 11 8 8 10 5 C11 8 10 11 10 15Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M10 5 C12 7 13 10 12 14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M10 15 L10 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "baguette":
      return (
        <svg {...shared}>
          <path
            d="M4 11 C4 8 7 6 10 6 C12 6 13 7 14 8 C15 7 16 6 18 6 C21 6 24 8 24 11 C24 13 22 14 20 14 L6 14 C5 14 4 13 4 11Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M7 9h2M11 8h2M15 9h2M19 8h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
        </svg>
      );
    case "basil":
      return (
        <svg {...shared}>
          <path
            d="M10 16 C10 12 7 9 10 5 C11 8 10 11 10 14 C12 11 13 8 12 5 C14 8 14 12 10 16Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M10 16 L10 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "jalapeno":
      return (
        <svg {...shared}>
          <path
            d="M6 12 C6 9 8 7 11 7 C13 7 14 8 14 10 C16 10 17 11 17 13 C17 15 15 16 13 16 L8 16 C7 16 6 15 6 12Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M11 7 L11 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "pickle":
      return (
        <svg {...shared}>
          <rect x="7" y="5" width="6" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 8h4M8 11h4M8 14h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          <ellipse cx="10" cy="5" rx="2" ry="1" fill="currentColor" opacity="0.35" />
        </svg>
      );
    case "wrap":
      return (
        <svg {...shared}>
          <ellipse cx="10" cy="11" rx="7" ry="4" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M5 11 C7 9 13 9 15 11 C13 13 7 13 5 11Z"
            fill="currentColor"
            opacity="0.25"
          />
          <path d="M6 10 L14 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
        </svg>
      );
    default:
      return (
        <svg {...shared}>
          <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

"use client";

// Day 2 massage picker — ayurvedic, thai, or swedish with style, benefits, and pick guidance.
// Fixed: timeline title is Relax the Musculature; lead is Pick your massage.

import { useId, useRef, useState } from "react";
import { MassageStyleMini } from "./MassageStyleMini";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const massages = [
  {
    id: "ayurvedic",
    variant: "ayurvedic" as const,
    name: "Ayurvedic Massage",
    tagline: "Warm oils and rhythmic healing",
    guide: "This one is with oil — warmed herbal oils are worked into the skin from start to finish.",
    style:
      "Abhyanga-style treatment with long rhythmic strokes and marma-point work to balance the body's energy. Expect to feel oiled, nourished, and deeply relaxed — not sporty or rough.",
    benefits: [
      "Deep detoxification and nourishment",
      "Reduces stress and anxiety",
      "Improves skin health and joint flexibility",
      "Balances Vata, Pitta, and Kapha energy",
    ],
  },
  {
    id: "thai",
    variant: "thai" as const,
    name: "Thai Massage",
    tagline: "Assisted stretches on the mat",
    guide: "The roughest of the three — firm pressure, deep stretches, and joint work. More intense than it looks.",
    style:
      "Performed clothed on a floor mat — acupressure, deep compression, and yoga-like stretches along the body's sen energy lines. No oils. The therapist moves your body; it can feel strong and activating rather than soft.",
    benefits: [
      "Increases flexibility and range of motion",
      "Relieves muscle and joint tension",
      "Boosts energy and circulation",
      "Eases back pain and sedentary stiffness",
    ],
  },
  {
    id: "swedish",
    variant: "swedish" as const,
    name: "Swedish Massage",
    tagline: "Classic relaxation and release",
    guide: "A bit vanilla — but that's the point. The safest pick if you've never had a massage before.",
    style:
      "Oil-based table massage with long flowing effleurage strokes, kneading, and gentle circular movements toward the heart. Familiar, mellow, and easy to settle into.",
    benefits: [
      "Melts stress and quiets the mind",
      "Improves blood circulation",
      "Relieves muscle soreness",
      "Enhances sleep quality",
    ],
  },
] as const;

export function MassageMenu() {
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
          Pick your massage
        </button>
        .
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Massage options">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close massage menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 2</span>
            <h4 className="juice-menu-title">Relax the Musculature</h4>
            <p className="juice-menu-sub">
              Three traditions — each works tension out of the muscles so the body is ready to downshift.
            </p>
          </div>

          <ul className="juice-menu-list">
            {massages.map((item) => (
              <li key={item.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <MassageStyleMini variant={item.variant} />
                  <span className="juice-drink-name">{item.name}</span>
                  <span className="juice-drink-tag">{item.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
                  <p className="massage-guide">{item.guide}</p>
                  <span className="juice-recipe-label">Style</span>
                  <p className="juice-method">{item.style}</p>
                  <span className="juice-recipe-label">Benefits</span>
                  <ul className="choice-benefits">
                    {item.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

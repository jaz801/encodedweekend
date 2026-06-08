"use client";

// Day 2 morning exercise picker — calisthenics, yoga, or pilates with benefits.

import { useId, useRef, useState } from "react";
import { ExerciseClassMini } from "./ExerciseClassMini";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const exerciseClasses = [
  {
    id: "calisthenics",
    variant: "calisthenics" as const,
    name: "Calisthenics",
    tagline: "Bodyweight strength and control",
    style: "Floor-based circuits — push, pull, squat, and core progressions scaled to your level.",
    benefits: [
      "Builds functional strength without equipment",
      "Improves joint stability and coordination",
      "Easy to scale from beginner to advanced",
      "Wakes up the whole body before breakfast",
    ],
  },
  {
    id: "yoga",
    variant: "yoga" as const,
    name: "Yoga",
    tagline: "Breath-led flow and mobility",
    style: "Slow vinyasa on mats — linking breath to movement, held stretches, and balance work.",
    benefits: [
      "Releases overnight stiffness",
      "Calms the nervous system through breath",
      "Improves flexibility and balance",
      "Centers the mind before the day unfolds",
    ],
  },
  {
    id: "pilates",
    variant: "pilates" as const,
    name: "Pilates",
    tagline: "Core-first precision work",
    style: "Mat or reformer Pilates — alignment, pelvic stability, and controlled, low-impact reps.",
    benefits: [
      "Strengthens deep core and postural muscles",
      "Improves controlled mobility",
      "Low impact but highly targeted",
      "Leaves you tall and aligned for the day",
    ],
  },
] as const;

export function ExerciseClassMenu() {
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
          Choose your exercise class.
        </button>
      </p>

      {open ? (
        <div id={panelId} className="juice-menu-card" role="region" aria-label="Exercise class options">
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close exercise menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 2</span>
            <h4 className="juice-menu-title">Physical morning exercise</h4>
            <p className="juice-menu-sub">Pick the class that matches how you want to move this morning.</p>
          </div>

          <ul className="juice-menu-list">
            {exerciseClasses.map((item) => (
              <li key={item.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <ExerciseClassMini variant={item.variant} />
                  <span className="juice-drink-name">{item.name}</span>
                  <span className="juice-drink-tag">{item.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
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

"use client";

// Day 2 relaxation experience picker — floating tank, cryo chamber, or ice bath.
// Fixed: lead copy is Align with your body experience (was pick your relaxation experience).

import { useId, useRef, useState } from "react";
import { RelaxationExperienceMini } from "./RelaxationExperienceMini";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const experiences = [
  {
    id: "floating-tank",
    variant: "float" as const,
    name: "Floating Tank",
    tagline: "Sensory deprivation in salt water",
    style:
      "Float on your back in body-temperature water saturated with Epsom salt — inside a private, light-proof pod with sound dialed down.",
    duration: "45–60 min per session",
    benefits: [
      "Strongest parasympathetic shift of the three — lowers blood pressure and breathing rate",
      "Sensory reduction tips the autonomic balance toward rest-and-digest",
      "Magnesium-rich salt eases residual muscle tension",
      "Mental quiet in a distraction-free pod",
    ],
    intensity: "low" as const,
  },
  {
    id: "cryo-chamber",
    variant: "cryo" as const,
    name: "Cryo Chamber",
    tagline: "Whole-body cold air therapy",
    style:
      "Stand in a cryotherapy chamber exposed to extremely cold dry air (−110°C to −140°C) for 2–4 minutes — no water, full-body chill.",
    duration: "2–4 min per session",
    benefits: [
      "Cold triggers vasoconstriction, then baroreflex kicks in — heart rate drops, vagal tone rises",
      "Studies show higher HRV (RMSSD) after a session — parasympathetic rebound",
      "Eases inflammation and muscle soreness from massage",
      "Short, dry cold hit — no water immersion",
    ],
    intensity: "medium" as const,
  },
  {
    id: "ice-bath",
    variant: "ice-bath" as const,
    name: "Ice Bath",
    tagline: "Cold water plunge immersion",
    style:
      "Immerse up to the shoulders in cold water (10–15°C) for 10–15 minutes — classic cold plunge with sustained hydrostatic pressure.",
    duration: "10–15 min per session",
    benefits: [
      "Face and neck immersion fires the diving reflex — powerful vagal slowdown of the heart",
      "Initial cold shock is sympathetic; the afterglow shifts toward parasympathetic calm",
      "Meta-analyses link cold-water immersion to higher HRV and longer R–R intervals",
      "Sustained hydrostatic pressure flushes tired muscle tissue",
    ],
    intensity: "high" as const,
  },
] as const;

const intensityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const;

export function RelaxationExperienceMenu() {
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
          Align with your body experience
        </button>
        .
      </p>

      {open ? (
        <div
          id={panelId}
          className="juice-menu-card"
          role="region"
          aria-label="Parasympathetic relaxation options"
        >
          <button
            type="button"
            className="juice-menu-close"
            aria-label="Close parasympathetic relaxation menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="juice-menu-head">
            <span className="juice-menu-eyebrow">Day 2</span>
            <h4 className="juice-menu-title">Parasympathetic relaxation</h4>
          </div>

          <ul className="juice-menu-list">
            {experiences.map((item) => (
              <li key={item.id} className="juice-drink">
                <div className="juice-drink-visual">
                  <RelaxationExperienceMini variant={item.variant} />
                  <span className="juice-drink-name">{item.name}</span>
                  <span className="juice-drink-tag">{item.tagline}</span>
                </div>

                <div className="juice-drink-recipe">
                  <span className="juice-recipe-label">Experience</span>
                  <p className="juice-method">{item.style}</p>
                  <span className="juice-recipe-label">Session</span>
                  <p className="juice-method">{item.duration}</p>
                  <span className="juice-recipe-label">Intensity</span>
                  <p className={`experience-intensity experience-intensity-${item.intensity}`}>
                    {intensityLabels[item.intensity]}
                  </p>
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

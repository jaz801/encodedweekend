"use client";

// Collapsible menu — tier activity groups (T1–2, T3–4, T5–6) + frequency transition activities.
// Fixed: menu starts closed; buttons reveal activity panels on encoded acceleration page.

import { useId, useState } from "react";
import {
  FREQUENCY_ACTIVITY_GROUPS,
  FREQUENCY_TRANSITION_GROUP,
} from "@/lib/encodedAccelerationEnfp";

type PanelId = (typeof FREQUENCY_ACTIVITY_GROUPS)[number]["id"] | "transition";

const MENU_OPTIONS = [
  ...FREQUENCY_ACTIVITY_GROUPS.map((g) => ({
    id: g.id as PanelId,
    label: g.buttonLabel,
  })),
  { id: "transition" as const, label: FREQUENCY_TRANSITION_GROUP.buttonLabel },
];

function ActivityPanel({ group }: { group: (typeof FREQUENCY_ACTIVITY_GROUPS)[number] | typeof FREQUENCY_TRANSITION_GROUP }) {
  return (
    <div className="encoded-accel-freq-panel" role="region" aria-label={group.title}>
      <header className="encoded-accel-freq-panel-head">
        <span className="encoded-accel-freq-panel-range">{group.tierRange}</span>
        <h4>{group.title}</h4>
        <p>{group.description}</p>
      </header>
      <ul className="encoded-accel-freq-activity-list">
        {group.activities.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong>
            <span>{item.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EncodedAccelerationFrequencyMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);
  const panelId = useId();

  const selectedGroup =
    activePanel === "transition"
      ? FREQUENCY_TRANSITION_GROUP
      : FREQUENCY_ACTIVITY_GROUPS.find((g) => g.id === activePanel) ?? null;

  function handleSelect(id: PanelId) {
    setActivePanel((current) => (current === id ? null : id));
  }

  return (
    <section className="encoded-accel-freq-menu-section" aria-labelledby="encoded-accel-freq-menu-heading">
      <p className="encoded-measure-eyebrow" id="encoded-accel-freq-menu-heading">
        Frequency activities
      </p>

      <button
        type="button"
        className="encoded-accel-freq-menu-trigger"
        aria-expanded={menuOpen}
        aria-controls={panelId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "Close activity menu" : "Open activities by frequency"}
      </button>

      {menuOpen ? (
        <div id={panelId} className="encoded-accel-freq-menu-card">
          <div className="encoded-accel-freq-menu-buttons" role="group" aria-label="Activity tier groups">
            {MENU_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`encoded-accel-freq-menu-btn${activePanel === option.id ? " active" : ""}`}
                aria-pressed={activePanel === option.id}
                onClick={() => handleSelect(option.id)}
              >
                {option.id === "transition" ? "Frequency transition activities" : `Tier ${option.label}`}
              </button>
            ))}
          </div>

          {selectedGroup ? <ActivityPanel group={selectedGroup} /> : null}
        </div>
      ) : null}
    </section>
  );
}

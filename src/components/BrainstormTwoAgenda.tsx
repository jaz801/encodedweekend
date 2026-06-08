"use client";

// Optimising the Future — direction, team gaps, and antifragile role plays.
// Fixed: Day 2 brainstorm session renamed; Right now card has team frequency icon.
// Fixed: antifragile role-play scenarios rewritten as realistic Encoded continuity stress tests.
// Fixed: all three detail cards rewritten for clearer structure and step-by-step flow.
// Fixed: Direction uses "lays down" not "reclines"; lawsuit scenario replaces revenue cliff.
// Fixed: Direction card now uses labelled steps like Right now and Antifragile.

import { useEffect, useId, useRef, useState } from "react";
import { BeanBagFigureMini } from "./BeanBagFigureMini";
import { TeamFrequencyMini } from "./TeamFrequencyMini";

type AgendaId = "direction" | "right-now" | "antifragile";

const agendaItems = [
  {
    id: "direction" as const,
    label:
      "What direction should we build Encoded out on 3 year, 10 year, 30 year time horizon?",
    eyebrow: "Future horizons",
    title: "Direction",
    body: (
      <>
        <div className="brainstorm-detail-visual">
          <BeanBagFigureMini />
        </div>
        <p>
          Picture Encoded at 3, 10, and 30 years — not in slides, but as a felt future.
        </p>
        <span className="juice-recipe-label">Step 1 — Visualise</span>
        <p className="brainstorm-detail-note">
          Everyone lays down on a bean bag, listens to a guided visualisation, then writes personal
          notes.
        </p>
        <span className="juice-recipe-label">Step 2 — Generate</span>
        <p className="brainstorm-detail-note">
          Upload everyone&apos;s notes to AI and generate images or short videos from them.
        </p>
        <span className="juice-recipe-label">Step 3 — Review</span>
        <p className="brainstorm-detail-note">
          Review the outputs together — what surprised you, what repeated, what conflicted?
        </p>
        <span className="juice-recipe-label">Step 4 — Cluster</span>
        <p className="brainstorm-detail-note">
          Cluster the themes. Name the patterns that keep showing up across the room.
        </p>
      </>
    ),
  },
  {
    id: "right-now" as const,
    label: "What skills, habits, people, do we miss right now to achieve that aim?",
    eyebrow: "Team gaps",
    title: "Right now",
    body: (
      <>
        <div className="brainstorm-detail-visual">
          <TeamFrequencyMini />
        </div>
        <p>
          Before hiring or reorganising, get honest about what the team is missing today — skills,
          habits, and the kind of person who would change the room.
        </p>
        <span className="juice-recipe-label">Step 1 — Read the room</span>
        <p className="brainstorm-detail-note">
          Pull up the group&apos;s collective frequency, then each person&apos;s individual
          frequency. Compare them side by side: where is the team aligned, and where are the gaps?
        </p>
        <span className="juice-recipe-label">Step 2 — Describe the person</span>
        <ol className="brainstorm-detail-steps">
          <li>
            Ask everyone to describe a personality type, not a job title — traits, energy, how they
            show up in a room.
          </li>
          <li>One by one, each person draws or writes their answer on the whiteboard while others watch.</li>
          <li>
            Close by naming the personality the team keeps circling — and the one that is clearly
            missing.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "antifragile" as const,
    label: "How can we make Encoded more antifragile.",
    eyebrow: "Stress tests",
    title: "Antifragile",
    body: (
      <>
        <p>
          Antifragile means getting stronger from stress — not just surviving a shock. Start with a
          two-minute explanation, then pressure-test Encoded through role play.
        </p>
        <span className="juice-recipe-label">How to run it</span>
        <p className="brainstorm-detail-note">
          Split into small teams. Assign one scenario per group. Each team answers: what breaks
          first, who owns the response, and what should already be documented today?
        </p>
        <span className="juice-recipe-label">Scenarios</span>
        <ul className="brainstorm-detail-points">
          <li>
            <strong>Leadership goes dark.</strong> Both founders vanish for 90 days. Renewals,
            payroll, and hire approvals all need decisions now. Who has authority — and is it written
            down anywhere?
          </li>
          <li>
            <strong>Lawsuit lands.</strong> A user, partner, or competitor files suit — the grounds
            could be anything from IP to a product claim. Press asks questions, morale dips, and
            legal costs start mounting. Who speaks publicly, who talks to the team, and what is
            already documented that protects you?
          </li>
          <li>
            <strong>Delivery stops cold.</strong> Go-live week hits a cloud outage, cyber incident,
            or travel shutdown. Clients are waiting. What is the 48-hour playbook — and who talks to
            them?
          </li>
          <li>
            <strong>Key person steps out.</strong> The only engineer on a live account, or the only
            person holding a renewal relationship, leaves 48 hours before a deadline. What is not
            backed up — and how do you cover without burning out the rest?
          </li>
        </ul>
        <span className="juice-recipe-label">Solution space — post-it round</span>
        <p className="brainstorm-detail-note">
          After the role plays, capture answers on post-its under three prompts:
        </p>
        <ul className="brainstorm-detail-points">
          <li>What systems would make us harder to break?</li>
          <li>What agreements should be in writing to build long-term trust?</li>
          <li>What trends are we already seeing — and not preparing for?</li>
        </ul>
      </>
    ),
  },
];

export function BrainstormTwoAgenda() {
  const [openId, setOpenId] = useState<AgendaId | null>(null);
  const rootId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openId) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenId(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenId(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openId]);

  return (
    <div ref={rootRef} className="brainstorm-agenda">
      <ul className="brainstorm-agenda-list">
        {agendaItems.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${rootId}-${item.id}`;

          return (
            <li key={item.id} className="brainstorm-agenda-item">
              <button
                type="button"
                className="brainstorm-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
              >
                {item.label}
              </button>

              {isOpen ? (
                <div
                  id={panelId}
                  className="brainstorm-detail-card"
                  role="region"
                  aria-label={item.title}
                >
                  <button
                    type="button"
                    className="brainstorm-detail-close"
                    aria-label={`Close ${item.title}`}
                    onClick={() => setOpenId(null)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>

                  <span className="brainstorm-detail-eyebrow">{item.eyebrow}</span>
                  <h4 className="brainstorm-detail-title">{item.title}</h4>
                  <div className="brainstorm-detail-body">{item.body}</div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

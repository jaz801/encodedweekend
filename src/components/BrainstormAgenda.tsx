"use client";

// Optimising the Now — three clickable prompts open detail cards (accordion-style).
// Fixed: Tabler icons on each detail card — presentation, chalkboard, devices-code.

import { useEffect, useId, useRef, useState } from "react";
import { BrainstormOneIcon } from "./BrainstormOneIcon";

type AgendaId = "working" | "better" | "hackathon";

const agendaItems = [
  {
    id: "working" as const,
    label: "What are we doing as a team that is working?",
    eyebrow: "Opening round",
    title: "What is working",
    body: (
      <>
        <div className="brainstorm-detail-visual">
          <BrainstormOneIcon variant="working" />
        </div>
        <p>
          Everyone answers in front of the group. Then we ask the people to imagine how Encoded
          looks in 2027, and write down the vision, mission, and feeling.
        </p>
      </>
    ),
  },
  {
    id: "better" as const,
    label: "What can we do to make Encoded even better?",
    eyebrow: "Ideation sprint",
    title: "Make Encoded better",
    body: (
      <>
        <div className="brainstorm-detail-visual">
          <BrainstormOneIcon variant="better" />
        </div>
        <ul className="brainstorm-detail-points">
          <li>8 people: 7 from your team plus 1 facilitator.</li>
        <li>
          Split into 4 pairs (one pair includes the facilitator). Each pair gets a rolling
          whiteboard.
        </li>
        <li>15 minutes to write down your idea.</li>
          <li>10-minute presentations, then vote on the winning idea.</li>
        </ul>
      </>
    ),
  },
  {
    id: "hackathon" as const,
    label: "Micro Hackathon",
    eyebrow: "30 minutes",
    title: "Micro Hackathon",
    body: (
      <>
        <div className="brainstorm-detail-visual">
          <BrainstormOneIcon variant="hackathon" />
        </div>
        <p>Build the winning idea in the remaining 30 minutes.</p>
        <ol className="brainstorm-detail-steps">
          <li>Decide who takes what role.</li>
          <li>Create a plan of attack.</li>
          <li>Build.</li>
          <li>Present.</li>
        </ol>
        <p className="brainstorm-detail-note">
          The facilitator invites participants to switch what they normally do — vibe-coding and
          Claude let you play any role. It&apos;s a weekend to explore; the heavy lifting can be
          done later.
        </p>
      </>
    ),
  },
];

export function BrainstormAgenda() {
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

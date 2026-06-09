"use client";

// Day 3 hackathon — gameplan run sheet and award ceremony detail cards.
// Fixed: award card shows tablet icon plus branding and use-case lists for reMarkable prize.
// Fixed: award intro copy notes that most people like gifts, not just winning.

import { useEffect, useId, useRef, useState } from "react";
import { BrainstormOneIcon } from "./BrainstormOneIcon";
import { RemarkableTabletMini } from "./RemarkableTabletMini";

type HackathonSheetId = "gameplan" | "award";

const hackathonSheets = [
  {
    id: "gameplan" as const,
    label: "Open the hackathon run sheet › Gameplan",
    eyebrow: "Final build",
    title: "Gameplan",
    body: (
      <>
        <div className="brainstorm-detail-visual">
          <BrainstormOneIcon variant="hackathon" />
        </div>
        <p>
          One last push — small teams, fast design, three hours of building, then show the room
          what you made.
        </p>
        <span className="juice-recipe-label">Step 1 — Micro teams</span>
        <p className="brainstorm-detail-note">
          Split into pairs again — teams of 2. Pick a partner you haven&apos;t built with yet this
          weekend.
        </p>
        <span className="juice-recipe-label">Step 2 — Ideation workshop</span>
        <p className="brainstorm-detail-note">
          Walk through Google Stitch to give your idea a quick visual design, then refine it in
          Claude Design before you write a line of code.
        </p>
        <span className="juice-recipe-label">Step 3 — Build (3 hours)</span>
        <p className="brainstorm-detail-note">
          Three hours on the clock. Everyone vibecodes — use Claude, swap roles, ship something real
          enough to demo.
        </p>
        <span className="juice-recipe-label">Step 4 — Present</span>
        <p className="brainstorm-detail-note">
          Each team presents what they built. Keep it tight: problem, what you made, what you&apos;d
          do next.
        </p>
      </>
    ),
  },
  {
    id: "award" as const,
    label: "Award ceremony",
    eyebrow: "Closing",
    title: "Award ceremony",
    body: (
      <>
        <div className="brainstorm-detail-visual">
          <RemarkableTabletMini />
        </div>
        <p>
          People always like to win prizes — and most people like gifts. This isn&apos;t about
          competition, but it would be nice if you gave the winning team a reMarkable tablet.
        </p>
        <span className="juice-recipe-label">Why it fits Encoded</span>
        <ul className="brainstorm-detail-points">
          <li>
            <strong>Minimal by default.</strong> No apps, alerts, or noise — just paper-like
            writing on a calm screen. That matches how Encoded thinks about product.
          </li>
          <li>
            <strong>Premium without being loud.</strong> It feels like a serious gift, not
            conference swag — understated hardware for a team that cares about craft.
          </li>
          <li>
            <strong>Paperless long term.</strong> One tablet replaces stacks of notebooks and
            printouts. Less clutter, fewer trees, same depth of thinking.
          </li>
          <li>
            <strong>Built to last daily use.</strong> Not a trophy that sits on a shelf — something
            the winners will actually reach for every week.
          </li>
        </ul>
        <span className="juice-recipe-label">What the team can do with it</span>
        <ul className="brainstorm-detail-points">
          <li>Sketch user flows and wireframes before a build — pen on e-paper, no laptop open.</li>
          <li>Take clean handwritten notes in workshops, retros, and client sessions.</li>
          <li>Read specs, RFCs, and long docs without the pull of Slack or email.</li>
          <li>Annotate PDFs and mark up designs when reviewing work together.</li>
          <li>Keep one shared thinking surface per person instead of scattered paper pads.</li>
        </ul>
      </>
    ),
  },
];

export function DayThreeHackathonMenu() {
  const [openId, setOpenId] = useState<HackathonSheetId | null>(null);
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
        {hackathonSheets.map((item) => {
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

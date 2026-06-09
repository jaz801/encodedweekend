"use client";

// Standalone organizer note — white button between Day 3 and footer, opens Jasper's message card.
// Fixed: added wellness cities copy (Amsterdam, Helsinki, Bali) to organizer message.

import { useId, useRef, useState } from "react";
import { useChoiceMenu } from "@/hooks/useChoiceMenu";

const GINA_LINKEDIN = "https://www.linkedin.com/in/ginaschinkel/";

export function OrganizeThisNote() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useChoiceMenu(open, setOpen, rootRef);

  return (
    <section className="organize-this-section" aria-label="Organizer note">
      <div className="wrap">
        <div ref={rootRef} className="organize-this-wrap">
          {open ? (
            <div
              id={panelId}
              className="organize-this-card"
              role="region"
              aria-label="Note from Jasper Ruijs"
            >
              <button
                type="button"
                className="organize-this-close"
                aria-label="Close organizer note"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>

              <p className="organize-this-message">
                I made this program with love for the Encoded Team. Although it isn&apos;t cheap, I
                believe the ideas and bonding that come out of this trip will double payback. Since
                the offsite scores high on wellness, I do know that this would be possible in the
                following cities: Amsterdam, Helsinki, and Bali. Since I am not a trip planner, I
                would like to reference{" "}
                <a href={GINA_LINKEDIN} target="_blank" rel="noopener noreferrer">
                  Gina Schinkel
                </a>
                , who runs retreats, workations, and offsites for remote-first and distributed
                teams.
              </p>

              <div className="organize-this-signoff">
                <img
                  src="/jasper.png"
                  alt="Portrait of Jasper Ruijs"
                  className="organize-this-photo"
                  width={56}
                  height={56}
                />
                <p className="organize-this-name">
                  Vibe On!
                  <br />
                  Jasper Ruijs
                </p>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            className="btn organize-this-button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((current) => !current)}
          >
            Organize this
          </button>
        </div>
      </div>
    </section>
  );
}

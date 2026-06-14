// Added: Frequency Signals watch — photo wallpaper, clock, update signal question flow.
// Added: side panel unique updates → Austin meetup invitation with yes/maybe/no + thanks screens.
// Fixed: side panel hint removed; "unique updates" is an underlined inline link in the copy.
// Fixed: yes/no question screen uses ENCODED logo and solid black background.
// Fixed: "Thanks for answering" screen uses solid black background.
// Fixed: meetup date Nov 24, Celtic frame removed, solid black meetup background.
// Fixed: Frequency Signals reskin — ENCODED gold palette, typography, cards, and success states.
// Added: three tier-3 frequency wave animations under meetup Yes/Maybe/No buttons.
// Added: side panel unique-update actions — unique entry passes, Remotion wearable teaser, meetup.
// Added: Unique entry pass flow replaces festival invite — tap egg, mint randomized pass.
// Fixed: side panel copy in ENCODED voice; meetup first in demo order; entry passes marked phase 2.
// Added: Build Plan overlay on watch — triggered from bottom bar on this page only.
// Fixed: Build Plan overlay moved to full-screen layer in EncodedAppleWatchAppExperience.
// Fixed: custom watch cursor stuck on mobile — only show on fine-pointer / hover-capable devices.

"use client";

import { useCallback, useEffect, useState } from "react";
import { GiftingWatchExperience } from "@/components/GiftingWatchExperience";
import { EncodedLogo } from "@/components/EncodedLogo";
import { TierFrequencyAnimation } from "@/components/TierFrequencyAnimation";
import { WatchClockFace } from "@/components/WatchClockFace";
import { WatchDeviceShell } from "@/components/WatchDeviceShell";
import { WearableTeaserWatchVideo } from "@/components/WearableTeaserWatchVideo";
import { useFinePointer } from "@/hooks/useFinePointer";
import { FREQUENCY_TIERS } from "@/lib/frequencyTiers";

type Phase =
  | "clock"
  | "ping"
  | "question"
  | "questionThanks"
  | "gifting"
  | "wearableVideo"
  | "meetup"
  | "meetupThanks";

const CHECK_IN_INTERVAL_MS = 3000;
const THANKS_SCREEN_MS = 2600;
const WEARABLE_VIDEO_MS = 2200;

const WALLPAPER_PHOTO =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80";

const MEETUP = {
  title: "First ENCODED Meet Up",
  location: "Austin, TX",
  date: "Tue, Nov 24",
  time: "6:30 PM",
  signedUp: ["Maya R.", "Chris W.", "Jordan L.", "Sam K.", "Alex T.", "Riley P."],
  totalSignedUp: 24,
};

// Fixed: meetup wave — tier 3 signal, full-width edge-to-edge (preserveAspectRatio none, 244px viewBox).
// Fixed: meetup screen reskin — watchOS-style hierarchy, type scale, and date/time pills.
// Fixed: meetup title, location, date/time type scaled up for watch readability.
// Fixed: mouse over watch screen shows circle cursor (matches Frequency Logging / GPS prototypes).

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
};

const MEETUP_TIER_3 = FREQUENCY_TIERS[2];

function SignalPingNotification({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      className="encoded-watch-ping encoded-watch-signals-ping"
      onClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      aria-label="Open frequency signal update"
    >
      <span className="encoded-watch-ping-ring" aria-hidden="true" />
      <span className="encoded-watch-ping-dot" aria-hidden="true" />
      <span className="encoded-watch-ping-copy">
        <strong>ENCODED</strong>
        <span>Update Frequency signal</span>
      </span>
    </button>
  );
}

function ThanksScreen({ message }: { message: string }) {
  return (
    <div className="encoded-watch-logged encoded-watch-signals-thanks" role="status" aria-live="polite">
      <div className="encoded-watch-logged-check">
        <span className="encoded-watch-logged-check-ring" aria-hidden="true" />
        <span className="encoded-watch-logged-check-mark" aria-hidden="true" />
      </div>
      <div className="encoded-watch-logged-copy">
        <strong>{message}</strong>
      </div>
    </div>
  );
}

function GroupEventsQuestion({ onAnswer }: { onAnswer: (answer: "yes" | "no") => void }) {
  return (
    <div
      className="encoded-watch-signals-card encoded-watch-signals-card--question"
      onClick={(event) => event.stopPropagation()}
    >
      <EncodedLogo className="encoded-watch-signals-logo" />
      <h2 className="encoded-watch-signals-card-question">I would be open to do group events</h2>
      <div className="encoded-watch-signals-card-actions encoded-watch-signals-card-actions--duo">
        <button
          type="button"
          className="encoded-watch-signals-btn encoded-watch-signals-btn--primary"
          onClick={() => onAnswer("yes")}
        >
          Yes
        </button>
        <button
          type="button"
          className="encoded-watch-signals-btn encoded-watch-signals-btn--ghost"
          onClick={() => onAnswer("no")}
        >
          No
        </button>
      </div>
    </div>
  );
}

function MeetupInvitation({
  onAnswer,
}: {
  onAnswer: (answer: "yes" | "maybe" | "no") => void;
}) {
  return (
    <div
      className="encoded-watch-signals-card encoded-watch-signals-card--meetup"
      onClick={(event) => event.stopPropagation()}
    >
      <header className="encoded-watch-signals-meetup-head">
        <p className="encoded-watch-signals-meetup-eyebrow">Meetup update</p>
        <h2 className="encoded-watch-signals-meetup-title">{MEETUP.title}</h2>
        <p className="encoded-watch-signals-meetup-location">{MEETUP.location}</p>
        <div className="encoded-watch-signals-meetup-when">
          <span className="encoded-watch-signals-meetup-date">{MEETUP.date}</span>
          <span className="encoded-watch-signals-meetup-time">{MEETUP.time}</span>
        </div>
      </header>

      <div className="encoded-watch-signals-meetup-bottom">
        <div className="encoded-watch-signals-meetup-rsvp">
          <p className="encoded-watch-signals-meetup-prompt">Will you attend?</p>
          <p className="encoded-watch-signals-meetup-signed">
            <strong>{MEETUP.totalSignedUp}</strong>
            <span>already signed up</span>
          </p>
        </div>

        <div className="encoded-watch-signals-card-actions encoded-watch-signals-card-actions--meetup">
          <button
            type="button"
            className="encoded-watch-signals-btn encoded-watch-signals-btn--primary"
            onClick={() => onAnswer("yes")}
          >
            Yes
          </button>
          <button
            type="button"
            className="encoded-watch-signals-btn encoded-watch-signals-btn--secondary"
            onClick={() => onAnswer("maybe")}
          >
            Maybe
          </button>
          <button
            type="button"
            className="encoded-watch-signals-btn encoded-watch-signals-btn--ghost"
            onClick={() => onAnswer("no")}
          >
            No
          </button>
        </div>
      </div>

      <div className="encoded-watch-signals-meetup-waves" aria-hidden="true">
        <TierFrequencyAnimation
          variant={MEETUP_TIER_3.waveVariant}
          energy={1}
          preserveAspectRatio="none"
        />
      </div>
    </div>
  );
}

function SignalsPhotoBackground() {
  return (
    <div className="encoded-watch-signals-bg" aria-hidden="true">
      <img className="encoded-watch-signals-photo" src={WALLPAPER_PHOTO} alt="" />
      <div className="encoded-watch-signals-photo-shade" />
      <WatchClockFace variant="photo" />
    </div>
  );
}

function FrequencySignalsSidePanel({
  onGifting,
  onWearableVideo,
  onMeetupUpdate,
}: {
  onGifting: () => void;
  onWearableVideo: () => void;
  onMeetupUpdate: () => void;
}) {
  return (
    <aside className="encoded-watch-side-panel encoded-watch-signals-side-panel is-visible" aria-hidden={false}>
      <div className="encoded-watch-side-line encoded-watch-side-line--signals">
        <span className="encoded-watch-side-signals-icon" aria-hidden="true">
          <span className="encoded-watch-side-signals-wave encoded-watch-side-signals-wave--a" />
          <span className="encoded-watch-side-signals-wave encoded-watch-side-signals-wave--b" />
          <span className="encoded-watch-side-signals-wave encoded-watch-side-signals-wave--c" />
        </span>
        <div className="encoded-watch-signals-unique-block">
          <p className="encoded-watch-side-instruction">
            Ask members questions. Send meetups and updates that feel personal — right on the wrist,
            where ENCODED already lives.
          </p>
          <p className="encoded-watch-signals-unique-label">Unique updates</p>
          <div className="encoded-watch-signals-unique-actions">
            <button type="button" className="encoded-watch-signals-unique-btn" onClick={onMeetupUpdate}>
              Meetup update
            </button>
            <button type="button" className="encoded-watch-signals-unique-btn" onClick={onWearableVideo}>
              Wearable teaser
            </button>
            <button
              type="button"
              className="encoded-watch-signals-unique-btn encoded-watch-signals-unique-btn--phase2"
              onClick={onGifting}
            >
              Unique entry passes
              <span className="encoded-watch-signals-unique-btn-phase">Phase 2</span>
            </button>
          </div>
          <p className="encoded-watch-signals-unique-footnote">
            v1 ships questions and meetup updates. Entry passes and richer drops once the daily habit is
            working.
          </p>
        </div>
      </div>
    </aside>
  );
}

export function FrequencySignalsWatch() {
  const hasFinePointer = useFinePointer();
  const [phase, setPhase] = useState<Phase>("clock");
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0, visible: false });

  const resetToClock = useCallback(() => {
    setPhase("clock");
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!hasFinePointer) return;

      const rect = event.currentTarget.getBoundingClientRect();
      setCursor({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        visible: true,
      });
    },
    [hasFinePointer],
  );

  const hideCursor = useCallback(() => {
    setCursor((current) => ({ ...current, visible: false }));
  }, []);

  const openQuestion = useCallback(() => {
    setPhase("question");
  }, []);

  const [giftingKey, setGiftingKey] = useState(0);

  const openGifting = useCallback(() => {
    setGiftingKey((current) => current + 1);
    setPhase("gifting");
  }, []);

  const openWearableVideo = useCallback(() => {
    setPhase("wearableVideo");
  }, []);

  const openMeetup = useCallback(() => {
    setPhase("meetup");
  }, []);

  const handleScreenClick = useCallback(() => {
    if (phase === "clock") {
      setPhase("ping");
      return;
    }

    if (phase === "ping") {
      openQuestion();
      return;
    }

    if (phase === "wearableVideo") {
      resetToClock();
    }
  }, [openQuestion, phase, resetToClock]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPhase((current) => (current === "clock" ? "ping" : current));
    }, CHECK_IN_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (phase !== "questionThanks" && phase !== "meetupThanks") return;

    const timeoutId = window.setTimeout(resetToClock, THANKS_SCREEN_MS);
    return () => window.clearTimeout(timeoutId);
  }, [phase, resetToClock]);

  useEffect(() => {
    if (phase !== "wearableVideo") return;

    const timeoutId = window.setTimeout(resetToClock, WEARABLE_VIDEO_MS);
    return () => window.clearTimeout(timeoutId);
  }, [phase, resetToClock]);

  return (
    <div className="encoded-watch-stage" aria-label="Frequency Signals Apple Watch">
      <div className="encoded-watch-prototype-scale">
        <WatchDeviceShell
          screen={
            <div
              className={`device-screen encoded-watch-screen encoded-watch-signals-screen encoded-watch-screen--${phase}`}
              onClick={handleScreenClick}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseMove}
              onMouseLeave={hideCursor}
              role="application"
              aria-label="Frequency Signals watch screen"
            >
              {phase === "clock" || phase === "ping" ? <SignalsPhotoBackground /> : null}
              {phase === "clock" ? <div className="encoded-watch-signals-bg-tap" aria-hidden="true" /> : null}
              {phase === "ping" ? <SignalPingNotification onOpen={openQuestion} /> : null}
              {phase === "question" ? (
                <GroupEventsQuestion onAnswer={() => setPhase("questionThanks")} />
              ) : null}
              {phase === "questionThanks" ? <ThanksScreen message="Thanks for answering" /> : null}
              {phase === "gifting" ? (
                <GiftingWatchExperience key={giftingKey} onDismiss={resetToClock} />
              ) : null}
              {phase === "wearableVideo" ? <WearableTeaserWatchVideo /> : null}
              {phase === "meetup" ? (
                <MeetupInvitation onAnswer={() => setPhase("meetupThanks")} />
              ) : null}
              {phase === "meetupThanks" ? <ThanksScreen message="Thank you" /> : null}

              {hasFinePointer && cursor.visible ? (
                <span
                  className="encoded-watch-screen-cursor"
                  style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
                  aria-hidden="true"
                />
              ) : null}
            </div>
          }
        />
      </div>
      <FrequencySignalsSidePanel
        onGifting={openGifting}
        onWearableVideo={openWearableVideo}
        onMeetupUpdate={openMeetup}
      />
    </div>
  );
}

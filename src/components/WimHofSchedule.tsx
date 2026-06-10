"use client";

// Wim Hof breathing schedule — three daily collection windows for next-week experiment.
// Added: simple round timer per session for biometric data collection windows.

import { useCallback, useEffect, useState } from "react";

const SESSIONS = [
  { id: "morning", label: "Morning", time: "07:00", rounds: 3 },
  { id: "midday", label: "Midday", time: "13:00", rounds: 3 },
  { id: "evening", label: "Evening", time: "20:00", rounds: 3 },
] as const;

const ROUND_SECONDS = 90;

type SessionId = (typeof SESSIONS)[number]["id"];

export function WimHofSchedule() {
  const [activeId, setActiveId] = useState<SessionId | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [round, setRound] = useState(1);

  const activeSession = SESSIONS.find((s) => s.id === activeId);

  useEffect(() => {
    if (!activeId || secondsLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [activeId, secondsLeft]);

  useEffect(() => {
    if (!activeSession || secondsLeft > 0) {
      return;
    }

    if (round < activeSession.rounds) {
      setRound((r) => r + 1);
      setSecondsLeft(ROUND_SECONDS);
      return;
    }

    setActiveId(null);
    setRound(1);
  }, [secondsLeft, round, activeSession]);

  const startSession = useCallback((id: SessionId) => {
    setActiveId(id);
    setRound(1);
    setSecondsLeft(ROUND_SECONDS);
  }, []);

  const stopSession = useCallback(() => {
    setActiveId(null);
    setSecondsLeft(0);
    setRound(1);
  }, []);

  return (
    <div className="freq-report-wim-schedule">
      {SESSIONS.map((session) => {
        const isActive = activeId === session.id;
        return (
          <article
            key={session.id}
            className={`freq-report-wim-slot${isActive ? " freq-report-wim-slot-active" : ""}`}
          >
            <div className="freq-report-wim-slot-head">
              <span className="freq-report-wim-slot-label">{session.label}</span>
              <span className="freq-report-wim-slot-time">{session.time}</span>
            </div>
            {isActive ? (
              <div className="freq-report-wim-timer" aria-live="polite">
                <span className="freq-report-wim-timer-round">
                  Round {round} / {session.rounds}
                </span>
                <span className="freq-report-wim-timer-clock">
                  {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
                </span>
                <button type="button" className="btn btn-ghost freq-report-wim-stop" onClick={stopSession}>
                  Stop
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-ghost freq-report-wim-start"
                onClick={() => startSession(session.id)}
              >
                Start session
              </button>
            )}
            <p className="freq-report-wim-slot-note">Log HRV before + 10 min after</p>
          </article>
        );
      })}
    </div>
  );
}

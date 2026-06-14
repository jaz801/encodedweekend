// Added: Encoded Apple Watch App page — interactive prototype with demo loop.
// Fixed: removed static PNG watch image and caption.
// Added: GPS Activity button — horizontal scroll to second watch with standard wallpaper clock.
// Fixed: toggle label when viewing GPS — "Frequency logging" instead of "ENCODED App".
// Added: third prototype — Frequency Signals; carousel cycles logging → GPS → signals.
// Added: Build Plan bar button — visible on Frequency Signals panel only.
// Fixed: Build Plan opens as full-screen collaboration invite overlay.
// Fixed: hero + panel tabs, correct panel labels, next-prototype button, Build Plan hint on Signals.
// Fixed: demo frame styling — premium stage card for all three prototype panels.
// Fixed: removed “Apple Watch prototype” / “Interactive prototype” labels from hero and demo frames.
// Fixed: tablet + mobile responsive layout for all three prototype panels.
// Fixed: panel tabs moved to compact sub-nav below site nav — hero title stays fully readable.

"use client";

import { useEffect, useState } from "react";
import { AppleWatchPrototype } from "@/components/AppleWatchPrototype";
import { BuildPlanOverlayCard } from "@/components/BuildPlanOverlayCard";
import { FrequencySignalsWatch } from "@/components/FrequencySignalsWatch";
import { GpsActivityWatch } from "@/components/GpsActivityWatch";

type WatchPanel = 0 | 1 | 2;

const FREQUENCY_SIGNALS_PANEL: WatchPanel = 2;

const WATCH_PANELS = [
  {
    id: 0 as WatchPanel,
    num: "01",
    label: "Frequency logging",
    blurb: "Daily check-in — ping, pick your tier, confirm. The habit between journal sessions.",
  },
  {
    id: 1 as WatchPanel,
    num: "02",
    label: "GPS Activity",
    blurb: "GPS auto-tracking for effortless activity tracking.",
  },
  {
    id: 2 as WatchPanel,
    num: "03",
    label: "Frequency Signals",
    blurb: "Questions, meetups, and member updates — how ENCODED talks to your most dedicated people.",
  },
] as const;

function nextPanel(current: WatchPanel): WatchPanel {
  return ((current + 1) % 3) as WatchPanel;
}

export function EncodedAppleWatchAppExperience() {
  const [panel, setPanel] = useState<WatchPanel>(0);
  const [buildPlanOpen, setBuildPlanOpen] = useState(false);

  const activePanel = WATCH_PANELS[panel];
  const nextPanelMeta = WATCH_PANELS[nextPanel(panel)];

  useEffect(() => {
    if (panel !== FREQUENCY_SIGNALS_PANEL) {
      setBuildPlanOpen(false);
    }
  }, [panel]);

  useEffect(() => {
    if (!buildPlanOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [buildPlanOpen]);

  const onFrequencySignalsPanel = panel === FREQUENCY_SIGNALS_PANEL;

  return (
    <div className="encoded-watch-app-shell">
      <nav className="encoded-watch-app-subnav" aria-label="Prototype sections">
        {WATCH_PANELS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`encoded-watch-app-panel-tab${panel === item.id ? " is-active" : ""}`}
            onClick={() => setPanel(item.id)}
            aria-current={panel === item.id ? "true" : undefined}
          >
            <span className="encoded-watch-app-panel-tab-num">{item.num}</span>
            <span className="encoded-watch-app-panel-tab-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <header className="encoded-watch-app-hero">
        <h1 className="encoded-watch-app-hero-title">ENCODED on the wrist</h1>
        <p className="encoded-watch-app-hero-lead">
          Three daily loops that keep frequency training alive between journal sessions.
        </p>

        <p className="encoded-watch-app-hero-panel-blurb">{activePanel.blurb}</p>

        {onFrequencySignalsPanel ? (
          <p className="encoded-watch-app-build-plan-hint">
            Ready to ship?{" "}
            <button type="button" className="encoded-watch-app-build-plan-hint-link" onClick={() => setBuildPlanOpen(true)}>
              Open Build Plan
            </button>{" "}
            for scope, timeline, and beta.
          </p>
        ) : null}
      </header>

      <div className="encoded-watch-app-demo">
        <div className="encoded-watch-app-demo-glow" aria-hidden="true" />
        <div className="encoded-watch-app-demo-frame">
          <div className="encoded-watch-app-demo-header">
            <h2 className="encoded-watch-app-demo-title">{activePanel.label}</h2>
          </div>

          <div className="encoded-watch-app">
            <div className="encoded-watch-app-carousel-viewport">
              <div
                className="encoded-watch-app-carousel-track"
                data-panel={panel}
                style={{ transform: `translate3d(-${panel * (100 / 3)}%, 0, 0)` }}
              >
                <div className="encoded-watch-app-panel">
                  <AppleWatchPrototype />
                </div>
                <div className="encoded-watch-app-panel">
                  <GpsActivityWatch />
                </div>
                <div className="encoded-watch-app-panel">
                  <FrequencySignalsWatch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {buildPlanOpen ? (
        <div className="encoded-watch-build-plan-screen">
          <button
            type="button"
            className="encoded-watch-build-plan-backdrop"
            onClick={() => setBuildPlanOpen(false)}
            aria-label="Close build plan"
          />
          <BuildPlanOverlayCard onClose={() => setBuildPlanOpen(false)} />
        </div>
      ) : null}

      <div
        className={`encoded-watch-gps-bar${onFrequencySignalsPanel ? " encoded-watch-gps-bar--with-build-plan" : ""}`}
      >
        {onFrequencySignalsPanel ? (
          <button
            type="button"
            className="encoded-watch-gps-activity-btn"
            onClick={() => setBuildPlanOpen(true)}
            aria-expanded={buildPlanOpen}
          >
            Build Plan
          </button>
        ) : null}
        <button
          type="button"
          className="encoded-watch-gps-activity-btn"
          onClick={() => setPanel((current) => nextPanel(current))}
          aria-label={`Next prototype: ${nextPanelMeta.label}`}
        >
          Next: {nextPanelMeta.label}
        </button>
      </div>
    </div>
  );
}

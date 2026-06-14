// Added: full ENCODED watch prototype — clock → ping → scrollable tier picker → double-tap confirm.
// Fixed: demo only cycles clock → ping every 3s; user scrolls/confirms manually afterward.
// Fixed: pointer drag scrolling with snap + flick on picker for realistic watch interaction.
// Fixed: tier info on watch (swipe left for description); guide lines + icons on the right.
// Fixed: frequency detail text only on picker after swipe left; default tier view stays minimal.
// Fixed: swipe-left on picker — axis-aware pointer drag + full-screen hit area (parent touch-action blocked native scroll).
// Fixed: vertical tier scroll — capture pointer on down, pass-through overlay, prefer vertical axis in ties.
// Fixed: hide wave animation on swipe-left detail page so frequency text is easy to read.
// Fixed: after double-tap confirm show frequency logged screen, then auto-return to clock.
// Fixed: frequency logged shows "tap to undo" — tap returns to tier picker menu.
// Fixed: picker dot taps jump to tier; wave anim stays fluid while scrolling (no energy-driven restart).
// Fixed: double-tap confirm window was 380ms — too tight for a slow second tap; widened to 750ms.
// Fixed: frequency logging side panel always visible on load (guide lines, not only during picker).

"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { TierFrequencyAnimation } from "@/components/TierFrequencyAnimation";
import { WatchClockFace } from "@/components/WatchClockFace";
import { WatchDeviceShell } from "@/components/WatchDeviceShell";
import { FREQUENCY_TIERS, type FrequencyTier } from "@/lib/frequencyTiers";

type Phase = "clock" | "ping" | "picker" | "confirming" | "logged";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
};

const TIER_COUNT = FREQUENCY_TIERS.length;
const CHECK_IN_INTERVAL_MS = 3000;
const SNAP_TRANSITION_MS = 420;
const DOUBLE_TAP_MS = 750;
const DRAG_THRESHOLD_PX = 6;
const HORIZONTAL_BIAS_PX = 10;
const DEMO_CONFIRM_MS = 2200;
const LOGGED_SCREEN_MS = 2600;

type DragAxis = "x" | "y";

function getCenteredTierScrollEl(root: HTMLElement): HTMLDivElement | null {
  return root.querySelector<HTMLDivElement>(
    ".encoded-watch-scroll-item.is-centered [data-tier-detail-scroll]",
  );
}

function snapTierDetailScroll(el: HTMLDivElement) {
  const pageWidth = el.clientWidth;
  if (!pageWidth) return;
  const page = Math.round(el.scrollLeft / pageWidth);
  el.scrollTo({ left: page * pageWidth, behavior: "smooth" });
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function clampTierIndex(index: number) {
  return Math.max(0, Math.min(TIER_COUNT - 1, index));
}

function rubberBandPosition(position: number) {
  if (position < 0) return position * 0.28;
  if (position > TIER_COUNT - 1) return TIER_COUNT - 1 + (position - (TIER_COUNT - 1)) * 0.28;
  return position;
}

export function PingNotification({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      className="encoded-watch-ping"
      onClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      aria-label="Open ENCODED frequency check-in"
    >
      <span className="encoded-watch-ping-ring" aria-hidden="true" />
      <span className="encoded-watch-ping-dot" aria-hidden="true" />
      <span className="encoded-watch-ping-copy">
        <strong>ENCODED</strong>
        <span>Frequency check-in</span>
      </span>
    </button>
  );
}

function syncTierDetailScrollState(el: HTMLDivElement) {
  el.dispatchEvent(new Event("scroll"));
}

function TierFullScreen({
  tier,
  inPicker = false,
  offset = 0,
  isScrolling = false,
}: {
  tier: FrequencyTier;
  inPicker?: boolean;
  offset?: number;
  isScrolling?: boolean;
}) {
  const energy = Math.max(0.35, 1.15 - offset * 0.22);
  const isCentered = offset < 0.45;
  const showFrequencySwipe = inPicker && isCentered;
  const detailScrollRef = useRef<HTMLDivElement>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const syncDetailOpen = useCallback(() => {
    const el = detailScrollRef.current;
    if (!el) {
      setDetailOpen(false);
      return;
    }
    setDetailOpen(el.scrollLeft > el.clientWidth * 0.35);
  }, []);

  useEffect(() => {
    if (!showFrequencySwipe) {
      setDetailOpen(false);
      return;
    }

    detailScrollRef.current?.scrollTo({ left: 0, behavior: "auto" });
    setDetailOpen(false);

    const el = detailScrollRef.current;
    if (!el) return;

    const onScroll = () => syncDetailOpen();
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => el.removeEventListener("scroll", onScroll);
  }, [showFrequencySwipe, syncDetailOpen, tier.id]);

  return (
    <div
      className={`encoded-watch-tier-screen ${tier.screenClass}${inPicker ? " encoded-watch-tier-screen--in-picker" : ""}${isCentered ? " is-centered" : ""}${detailOpen ? " is-detail-open" : ""}`}
      style={{ "--scroll-offset": offset } as CSSProperties}
    >
      {!detailOpen ? (
        <TierFrequencyAnimation
          variant={tier.waveVariant}
          energy={energy}
          isScrolling={isScrolling || inPicker}
        />
      ) : null}
      <div className="encoded-watch-tier-screen-content">
        {showFrequencySwipe ? (
          <div className="encoded-watch-tier-screen-scroll" ref={detailScrollRef} data-tier-detail-scroll>
            <div className="encoded-watch-tier-screen-page">
              <p className="encoded-watch-tier-screen-num">Tier {tier.id}</p>
              <h2 className="encoded-watch-tier-screen-name">{tier.shortLabel}</h2>
            </div>
            <div className="encoded-watch-tier-screen-page encoded-watch-tier-screen-page--detail">
              <p className="encoded-watch-tier-screen-num">Tier {tier.id}</p>
              <h2 className="encoded-watch-tier-screen-name">{tier.name}</h2>
              <p className="encoded-watch-tier-screen-tagline">{tier.tagline}</p>
              <p className="encoded-watch-tier-screen-description">{tier.description}</p>
            </div>
          </div>
        ) : isCentered ? (
          <>
            <p className="encoded-watch-tier-screen-num">Tier {tier.id}</p>
            <h2 className="encoded-watch-tier-screen-name">{tier.name}</h2>
            <p className="encoded-watch-tier-screen-tagline">{tier.tagline}</p>
          </>
        ) : (
          <>
            <p className="encoded-watch-tier-screen-num">Tier {tier.id}</p>
            <h2 className="encoded-watch-tier-screen-name">{tier.shortLabel}</h2>
          </>
        )}
      </div>
    </div>
  );
}

export function TierPickerScreen({
  scrollPosition,
  onSelect,
  isDragging,
  isScrolling,
  snapTransitionMs,
}: {
  scrollPosition: number;
  onSelect: (index: number) => void;
  isDragging: boolean;
  isScrolling: boolean;
  snapTransitionMs: number;
}) {
  const activeIndex = Math.round(scrollPosition);

  return (
    <div
      className={`encoded-watch-picker${isScrolling ? " is-scrolling" : ""}${isDragging ? " is-dragging" : ""}`}
    >
      <div className="encoded-watch-scroll-window" aria-live="polite">
        <ul
          className={`encoded-watch-scroll-track${isScrolling ? " is-moving" : ""}`}
          style={{
            transform: `translate3d(0, -${scrollPosition * 100}%, 0)`,
            transitionDuration: isDragging ? "0ms" : `${snapTransitionMs}ms`,
          }}
        >
          {FREQUENCY_TIERS.map((tier, index) => {
            const offset = Math.abs(index - scrollPosition);
            return (
              <li
                key={tier.id}
                className={`encoded-watch-scroll-item${offset < 0.45 ? " is-centered" : ""}`}
              >
                <TierFullScreen
                  tier={tier}
                  inPicker
                  offset={offset}
                  isScrolling={isScrolling || isDragging}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="encoded-watch-picker-chrome" onPointerDown={(event) => event.stopPropagation()}>
        <div className="encoded-watch-picker-dots" role="tablist" aria-label="Frequency tiers">
          {FREQUENCY_TIERS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`encoded-watch-picker-dot${index === activeIndex ? " is-active" : ""}`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(index);
              }}
              aria-selected={index === activeIndex}
              aria-label={`Tier ${item.id}: ${item.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FrequencyLoggedScreen({ tier }: { tier: FrequencyTier }) {
  return (
    <div className="encoded-watch-logged" role="status" aria-live="polite">
      <span className="encoded-watch-logged-check" aria-hidden="true">
        <span className="encoded-watch-logged-check-ring" />
        <span className="encoded-watch-logged-check-mark" />
      </span>
      <div className="encoded-watch-logged-copy">
        <strong>Frequency logged</strong>
        <span>
          Tier {tier.id} · {tier.shortLabel}
        </span>
      </div>
      <p className="encoded-watch-logged-hint">Tap to undo</p>
    </div>
  );
}

function WatchSidePanel({ highlightConfirm }: { highlightConfirm: boolean }) {
  return (
    <aside
      className="encoded-watch-side-panel encoded-watch-logging-side-panel is-visible"
      aria-hidden={false}
    >
      <div className="encoded-watch-side-line encoded-watch-side-line--scroll">
        <span className="encoded-watch-side-scroll-icon" aria-hidden="true">
          <span className="encoded-watch-side-scroll-icon-arrow encoded-watch-side-scroll-icon-arrow--up" />
          <span className="encoded-watch-side-scroll-icon-track">
            <span className="encoded-watch-side-scroll-icon-thumb" />
          </span>
          <span className="encoded-watch-side-scroll-icon-arrow encoded-watch-side-scroll-icon-arrow--down" />
        </span>
        <p className="encoded-watch-side-instruction">Scroll up and down to select the tier</p>
      </div>

      <div className="encoded-watch-side-line encoded-watch-side-line--confirm">
        <span className="encoded-watch-side-doubletap-icon" aria-hidden="true">
          <span className="encoded-watch-side-doubletap-icon-ring encoded-watch-side-doubletap-icon-ring--first" />
          <span className="encoded-watch-side-doubletap-icon-ring encoded-watch-side-doubletap-icon-ring--second" />
          <span className="encoded-watch-side-doubletap-icon-dot" />
        </span>
        <p
          className={`encoded-watch-side-instruction${highlightConfirm ? " encoded-watch-side-instruction--active" : ""}`}
        >
          Double tap to confirm tier
        </p>
      </div>

      <div className="encoded-watch-side-line encoded-watch-side-line--swipe">
        <span className="encoded-watch-side-swipe-left-icon" aria-hidden="true">
          <span className="encoded-watch-side-swipe-left-icon-hand" />
          <span className="encoded-watch-side-swipe-left-icon-track">
            <span className="encoded-watch-side-swipe-left-icon-thumb" />
          </span>
          <span className="encoded-watch-side-swipe-left-icon-arrow" />
        </span>
        <p className="encoded-watch-side-instruction encoded-watch-side-instruction--hint">
          Swipe left on the watch for more info about the tier
        </p>
      </div>
    </aside>
  );
}

function TapRipple({
  x,
  y,
  keySeed,
}: {
  x: number;
  y: number;
  keySeed: number;
}) {
  return (
    <>
      <span
        key={`tap-a-${keySeed}`}
        className="encoded-watch-double-tap encoded-watch-double-tap--first"
        style={{ left: x, top: y }}
        aria-hidden="true"
      />
      <span
        key={`tap-b-${keySeed}`}
        className="encoded-watch-double-tap encoded-watch-double-tap--second"
        style={{ left: x, top: y }}
        aria-hidden="true"
      />
    </>
  );
}

async function playDemoDoubleTap(
  x: number,
  y: number,
  setDoubleTapPulse: (value: { x: number; y: number; key: number } | null) => void,
) {
  const key = Date.now();
  setDoubleTapPulse({ x, y, key });
  await delay(500);
  setDoubleTapPulse({ x, y, key: key + 1 });
}

export function AppleWatchPrototype() {
  const [phase, setPhase] = useState<Phase>("clock");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [confirmedIndex, setConfirmedIndex] = useState(0);
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0, visible: false });
  const [doubleTapPulse, setDoubleTapPulse] = useState<{ x: number; y: number; key: number } | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const lastTapRef = useRef(0);
  const dragRef = useRef({
    pending: false,
    active: false,
    axis: null as DragAxis | null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startPosition: 0,
    moved: false,
    pointerId: -1,
    scrollEl: null as HTMLDivElement | null,
  });
  const velocityRef = useRef(0);
  const lastMoveRef = useRef({ position: 0, time: 0 });

  const snapToIndex = useCallback((index: number) => {
    const clamped = clampTierIndex(index);
    setScrollPosition(clamped);
    setIsScrolling(true);
    window.setTimeout(() => setIsScrolling(false), SNAP_TRANSITION_MS + 80);
  }, []);

  const showDoubleTapPulse = useCallback((x: number, y: number) => {
    void playDemoDoubleTap(x, y, setDoubleTapPulse);
  }, []);

  const confirmSelection = useCallback(
    (x: number, y: number) => {
      const picked = clampTierIndex(Math.round(scrollPosition));
      setConfirmedIndex(picked);
      setScrollPosition(picked);
      setPhase("confirming");
      showDoubleTapPulse(x, y);
      window.setTimeout(() => setPhase("logged"), DEMO_CONFIRM_MS);
    },
    [scrollPosition, showDoubleTapPulse],
  );

  const openPicker = useCallback(() => {
    setPhase("picker");
    setScrollPosition(0);
    setIsScrolling(false);
  }, []);

  const undoLogged = useCallback(() => {
    setPhase("picker");
    setScrollPosition(confirmedIndex);
    lastTapRef.current = 0;
    setDoubleTapPulse(null);
  }, [confirmedIndex]);

  const handleScreenClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (dragRef.current.moved) {
        dragRef.current.moved = false;
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const now = Date.now();

      if (phase === "clock") {
        setPhase("ping");
        return;
      }

      if (phase === "ping") {
        openPicker();
        return;
      }

      if (phase === "picker") {
        const sinceLastTap = now - lastTapRef.current;
        if (lastTapRef.current > 0 && sinceLastTap < DOUBLE_TAP_MS) {
          lastTapRef.current = 0;
          confirmSelection(x, y);
          return;
        }
        lastTapRef.current = now;
        return;
      }

      if (phase === "logged") {
        undoLogged();
      }
    },
    [confirmSelection, openPicker, phase, undoLogged],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (phase !== "picker") return;
      if (event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest(".encoded-watch-picker-chrome")) {
        return;
      }

      dragRef.current = {
        pending: true,
        active: false,
        axis: null,
        startX: event.clientX,
        startY: event.clientY,
        startScrollLeft: 0,
        startPosition: scrollPosition,
        moved: false,
        pointerId: event.pointerId,
        scrollEl: getCenteredTierScrollEl(event.currentTarget),
      };
      velocityRef.current = 0;
      lastMoveRef.current = { position: scrollPosition, time: performance.now() };
      setIsScrolling(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      event.preventDefault();
    },
    [phase, scrollPosition],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (phase !== "picker") return;
      if (event.pointerId !== dragRef.current.pointerId) return;
      if (!dragRef.current.pending && !dragRef.current.active) return;

      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;

      if (dragRef.current.pending && dragRef.current.axis === null) {
        if (Math.abs(dx) < DRAG_THRESHOLD_PX && Math.abs(dy) < DRAG_THRESHOLD_PX) return;

        const horizontalDominant =
          Boolean(dragRef.current.scrollEl) && Math.abs(dx) > Math.abs(dy) + HORIZONTAL_BIAS_PX;

        if (horizontalDominant) {
          dragRef.current.axis = "x";
          dragRef.current.active = true;
          dragRef.current.pending = false;
          dragRef.current.startScrollLeft = dragRef.current.scrollEl!.scrollLeft;
          setIsDragging(true);
        } else {
          dragRef.current.axis = "y";
          dragRef.current.active = true;
          dragRef.current.pending = false;
          setIsDragging(true);
          setIsScrolling(true);
        }
      }

      if (dragRef.current.axis === "x" && dragRef.current.scrollEl) {
        if (Math.abs(dx) > DRAG_THRESHOLD_PX) {
          dragRef.current.moved = true;
        }
        dragRef.current.scrollEl.scrollLeft = dragRef.current.startScrollLeft - dx;
        syncTierDetailScrollState(dragRef.current.scrollEl);
        event.preventDefault();
        return;
      }

      if (!dragRef.current.active || dragRef.current.axis !== "y") return;

      const rect = event.currentTarget.getBoundingClientRect();
      const deltaY = event.clientY - dragRef.current.startY;

      if (Math.abs(deltaY) > DRAG_THRESHOLD_PX) {
        dragRef.current.moved = true;
      }

      const deltaIndex = -deltaY / rect.height;
      const nextPosition = rubberBandPosition(dragRef.current.startPosition + deltaIndex);
      const now = performance.now();
      const elapsed = Math.max(now - lastMoveRef.current.time, 16);
      velocityRef.current = ((nextPosition - lastMoveRef.current.position) / elapsed) * 1000;
      lastMoveRef.current = { position: nextPosition, time: now };
      setScrollPosition(nextPosition);
      event.preventDefault();
    },
    [phase],
  );

  const finishDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current.pending && !dragRef.current.active) return;

      const { axis, scrollEl, moved } = dragRef.current;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (axis === "x" && scrollEl) {
        snapTierDetailScroll(scrollEl);
        syncTierDetailScrollState(scrollEl);
      }

      if (axis === "y") {
        const flickTarget = Math.round(scrollPosition + velocityRef.current * 0.18);
        snapToIndex(flickTarget);
      }

      dragRef.current = {
        pending: false,
        active: false,
        axis: null,
        startX: 0,
        startY: 0,
        startScrollLeft: 0,
        startPosition: scrollPosition,
        moved,
        pointerId: -1,
        scrollEl: null,
      };
      setIsDragging(false);
      setIsScrolling(false);
    },
    [scrollPosition, snapToIndex],
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (phase !== "picker") return;

      const scrollEl = getCenteredTierScrollEl(event.currentTarget);
      if (scrollEl && Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
        scrollEl.scrollLeft += event.deltaX;
        syncTierDetailScrollState(scrollEl);
        return;
      }

      event.preventDefault();
      snapToIndex(Math.round(scrollPosition) + (event.deltaY > 0 ? 1 : -1));
    },
    [phase, scrollPosition, snapToIndex],
  );

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      visible: true,
    });
  }, []);

  const hideCursor = useCallback(() => {
    setCursor((current) => ({ ...current, visible: false }));
  }, []);

  const selectTier = useCallback(
    (index: number) => {
      snapToIndex(index);
    },
    [snapToIndex],
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPhase((current) => (current === "clock" ? "ping" : current));
    }, CHECK_IN_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (phase !== "logged") return;

    const timeoutId = window.setTimeout(() => {
      setPhase("clock");
      setScrollPosition(0);
      lastTapRef.current = 0;
      setDoubleTapPulse(null);
    }, LOGGED_SCREEN_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  const showTapRipple = phase === "confirming" && doubleTapPulse !== null;
  const activeTier = FREQUENCY_TIERS[confirmedIndex];

  return (
    <div className="encoded-watch-stage" aria-label="Encoded Apple Watch prototype">
      <div className="encoded-watch-prototype-scale">
        <WatchDeviceShell
          screen={
            <div
              className={`device-screen encoded-watch-screen encoded-watch-screen--${phase}${phase === "picker" ? " encoded-watch-screen--draggable" : ""}`}
              onClick={handleScreenClick}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishDrag}
              onPointerCancel={finishDrag}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseMove}
              onMouseLeave={hideCursor}
              role="application"
              aria-label="ENCODED watch app screen"
            >
              {phase === "clock" ? <WatchClockFace /> : null}
              {phase === "ping" ? <PingNotification onOpen={openPicker} /> : null}
              {phase === "picker" || phase === "confirming" ? (
                <TierPickerScreen
                  scrollPosition={scrollPosition}
                  onSelect={selectTier}
                  isDragging={isDragging}
                  isScrolling={isScrolling}
                  snapTransitionMs={SNAP_TRANSITION_MS}
                />
              ) : null}
              {phase === "logged" ? <FrequencyLoggedScreen tier={activeTier} /> : null}

              {showTapRipple && doubleTapPulse ? (
                <TapRipple x={doubleTapPulse.x} y={doubleTapPulse.y} keySeed={doubleTapPulse.key} />
              ) : null}

              {cursor.visible ? (
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

      <WatchSidePanel highlightConfirm={phase === "confirming"} />
    </div>
  );
}

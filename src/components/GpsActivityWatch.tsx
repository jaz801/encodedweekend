// Added: GPS Activity watch mockup — standard wallpaper + Austin clock.
// Added: side panel with GPS connect copy + stick-in map pin animation.
// Fixed: replaced beam/activity icon — white 📍-style pin drops and sticks in (monochrome white only).
// Fixed: wider GPS side card so instruction text spans more horizontally.
// Added: interactive flow — 2s check-in → frequency picker → tap create GPS activity → micro keyboard → success → clock.
// Fixed: picker hover shows dual touchpoints; single tap opens create-GPS flow (not double-tap confirm).
// Added: side panel two-finger tap guide with animation — open Create GPS location.
// Fixed: emoji button toggles full emoji picker instead of inline emoji keys on letter keyboard.
// Added: emoji keyboard search — filter emoji grid by keyword.
// Added: #+= symbols button opens symbol picker on micro keyboard.
// Fixed: letter keyboard missing I O P M N — now full QWERTY layout with tighter keys.
// Fixed: activity name pinned to top; letter keys scale to full watch width so none clip off.
// Fixed: side panel always shows GPS pin + two-finger guide; removed keyboard hint copy.
// Fixed: keyboard layout — safe-area padding, compact keys, two-row action bar so nothing clips.
// Fixed: keyboard uses full bottom half of watch; larger keys; activity name at top of bottom panel.
// Fixed: keyboard panel expanded upward (~72% of watch) with larger tap targets.
// Fixed: space/OK buttons inset with rounded bottom corners so they clear watch screen curve.
// Fixed: GPS Activity Created uses static activity icon instead of animated location pin.
// Fixed: activity icon animated on success screen; tier removed — GPS activity only.
// Fixed: activity icon pulse + ring animation — wrapper target so SVG animates reliably.
// Fixed: GPS copy — log once, then GPS auto-tracking for effortless activity tracking matched with frequency.

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconActivity } from "@tabler/icons-react";
import {
  PingNotification,
  TierPickerScreen,
} from "@/components/AppleWatchPrototype";
import { WatchClockFace } from "@/components/WatchClockFace";
import { WatchDeviceShell } from "@/components/WatchDeviceShell";
import { FREQUENCY_TIERS, type FrequencyTier } from "@/lib/frequencyTiers";

type Phase = "clock" | "ping" | "picker" | "create" | "keyboard" | "created";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
};

type DragAxis = "x" | "y";

const TIER_COUNT = FREQUENCY_TIERS.length;
const CHECK_IN_INTERVAL_MS = 2000;
const SNAP_TRANSITION_MS = 420;
const DRAG_THRESHOLD_PX = 6;
const HORIZONTAL_BIAS_PX = 10;
const CREATED_SCREEN_MS = 2600;

const KEYBOARD_LETTERS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

type KeyboardMode = "letters" | "emoji" | "symbols";

const KEYBOARD_SYMBOLS = [
  "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "/",
  "\\", "|", "~", "`", "[", "]", "{", "}", "<", ">", ".", ",", ":", ";",
  "?", "'", "\"", "°", "·", "•", "–", "—", "…", "§", "€", "£", "¥", "¢",
  "©", "®", "™", "№", "±", "÷", "×", "≠", "≈", "∞", "√", "π", "∆", "✓",
];

type EmojiEntry = {
  emoji: string;
  keywords: string[];
};

const EMOJI_CATALOG: EmojiEntry[] = [
  { emoji: "🏃", keywords: ["run", "running", "jog", "sprint"] },
  { emoji: "🚴", keywords: ["bike", "cycle", "cycling", "ride"] },
  { emoji: "🏊", keywords: ["swim", "swimming", "pool"] },
  { emoji: "🧘", keywords: ["yoga", "meditate", "stretch", "calm"] },
  { emoji: "⛰️", keywords: ["mountain", "hike", "peak", "climb"] },
  { emoji: "🌳", keywords: ["tree", "nature", "forest", "park"] },
  { emoji: "✨", keywords: ["sparkle", "star", "magic", "new"] },
  { emoji: "🚶", keywords: ["walk", "walking", "stroll"] },
  { emoji: "🏋️", keywords: ["gym", "lift", "weights", "strength"] },
  { emoji: "🤸", keywords: ["gymnastics", "flip", "acro"] },
  { emoji: "🧗", keywords: ["climb", "boulder", "rock"] },
  { emoji: "🎾", keywords: ["tennis", "racket", "court"] },
  { emoji: "⚽", keywords: ["soccer", "football", "kick"] },
  { emoji: "🏀", keywords: ["basketball", "hoops", "court"] },
  { emoji: "🏈", keywords: ["football", "american", "sport"] },
  { emoji: "⛳", keywords: ["golf", "course", "swing"] },
  { emoji: "🛹", keywords: ["skate", "skateboard", "board"] },
  { emoji: "🏄", keywords: ["surf", "wave", "ocean"] },
  { emoji: "🤿", keywords: ["dive", "snorkel", "underwater"] },
  { emoji: "🚣", keywords: ["row", "kayak", "paddle", "boat"] },
  { emoji: "🏕️", keywords: ["camp", "camping", "tent", "outdoor"] },
  { emoji: "🌲", keywords: ["pine", "forest", "woods", "trail"] },
  { emoji: "🌊", keywords: ["wave", "ocean", "sea", "water"] },
  { emoji: "☀️", keywords: ["sun", "sunny", "day", "bright"] },
  { emoji: "🌧️", keywords: ["rain", "wet", "storm", "weather"] },
  { emoji: "❤️", keywords: ["heart", "love", "health"] },
  { emoji: "💪", keywords: ["strong", "muscle", "power", "fit"] },
  { emoji: "🔥", keywords: ["fire", "burn", "hot", "intense"] },
  { emoji: "⭐", keywords: ["star", "favorite", "best"] },
  { emoji: "🎯", keywords: ["target", "goal", "focus", "aim"] },
  { emoji: "📍", keywords: ["pin", "location", "gps", "map"] },
  { emoji: "🥾", keywords: ["boot", "hike", "trail", "trek"] },
  { emoji: "🧭", keywords: ["compass", "navigate", "direction"] },
  { emoji: "🗺️", keywords: ["map", "route", "explore"] },
  { emoji: "🌅", keywords: ["sunrise", "morning", "dawn"] },
  { emoji: "🌄", keywords: ["sunset", "evening", "dusk"] },
  { emoji: "🦋", keywords: ["butterfly", "nature", "light"] },
  { emoji: "🐕", keywords: ["dog", "pet", "walk"] },
  { emoji: "☕", keywords: ["coffee", "cafe", "break"] },
  { emoji: "🍎", keywords: ["apple", "fruit", "snack", "health"] },
  { emoji: "🧊", keywords: ["ice", "cold", "recover"] },
  { emoji: "🛤️", keywords: ["track", "rail", "path", "run"] },
  { emoji: "🏟️", keywords: ["stadium", "arena", "event"] },
  { emoji: "🎿", keywords: ["ski", "snow", "winter", "slopes"] },
  { emoji: "⛷️", keywords: ["ski", "downhill", "snow"] },
  { emoji: "🏂", keywords: ["snowboard", "snow", "winter"] },
  { emoji: "🤾", keywords: ["handball", "sport", "throw"] },
  { emoji: "🏐", keywords: ["volleyball", "beach", "net"] },
  { emoji: "🥊", keywords: ["box", "boxing", "fight", "punch"] },
  { emoji: "🚵", keywords: ["mountain bike", "mtb", "trail"] },
];

function filterEmojiCatalog(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return EMOJI_CATALOG;

  return EMOJI_CATALOG.filter(
    (entry) =>
      entry.emoji === normalized ||
      entry.keywords.some((keyword) => keyword.includes(normalized) || normalized.includes(keyword)),
  );
}

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

function syncTierDetailScrollState(el: HTMLDivElement) {
  el.dispatchEvent(new Event("scroll"));
}

function clampTierIndex(index: number) {
  return Math.max(0, Math.min(TIER_COUNT - 1, index));
}

function rubberBandPosition(position: number) {
  if (position < 0) return position * 0.28;
  if (position > TIER_COUNT - 1) return TIER_COUNT - 1 + (position - (TIER_COUNT - 1)) * 0.28;
  return position;
}

function TwoFingerTapGuide({ active = false }: { active?: boolean }) {
  return (
    <div className="encoded-watch-side-line encoded-watch-side-line--twofinger">
      <span className="encoded-watch-side-twofinger-icon" aria-hidden="true">
        <span className="encoded-watch-side-twofinger-ring encoded-watch-side-twofinger-ring--left" />
        <span className="encoded-watch-side-twofinger-ring encoded-watch-side-twofinger-ring--right" />
        <span className="encoded-watch-side-twofinger-dot encoded-watch-side-twofinger-dot--left" />
        <span className="encoded-watch-side-twofinger-dot encoded-watch-side-twofinger-dot--right" />
      </span>
      <p
        className={`encoded-watch-side-instruction${active ? " encoded-watch-side-instruction--active" : ""}`}
      >
        Tap with two fingers to open Create GPS location
      </p>
    </div>
  );
}

function GpsSidePanel({ highlightTwoFinger = false }: { highlightTwoFinger?: boolean }) {
  return (
    <aside className="encoded-watch-side-panel encoded-watch-gps-side-panel is-visible" aria-hidden={false}>
      <div className="encoded-watch-side-line encoded-watch-side-line--gps">
        <span className="encoded-watch-side-gps-stick-icon" aria-hidden="true">
          <span className="encoded-watch-side-gps-stick-pin">
            <span className="encoded-watch-side-gps-stick-pin-head" />
            <span className="encoded-watch-side-gps-stick-pin-point" />
          </span>
          <span className="encoded-watch-side-gps-stick-surface" />
        </span>
        <p className="encoded-watch-side-instruction">
          Log a location once. GPS auto-tracking gives you effortless activity tracking — ENCODED
          matches it with your frequency whenever you&apos;re at that place.
        </p>
      </div>
      <TwoFingerTapGuide active={highlightTwoFinger} />
    </aside>
  );
}

function CreateGpsActivityScreen({
  tier,
  activityName,
  onNameTap,
}: {
  tier: FrequencyTier;
  activityName: string;
  onNameTap: () => void;
}) {
  return (
    <div className="encoded-watch-gps-create">
      <p className="encoded-watch-gps-create-eyebrow">Tier {tier.id}</p>
      <h2 className="encoded-watch-gps-create-title">Create GPS activity</h2>
      <p className="encoded-watch-gps-create-subtitle">{tier.shortLabel}</p>
      <button
        type="button"
        className="encoded-watch-gps-create-field"
        onClick={(event) => {
          event.stopPropagation();
          onNameTap();
        }}
      >
        <span className="encoded-watch-gps-create-field-label">Activity</span>
        <span className={`encoded-watch-gps-create-field-value${activityName ? "" : " is-placeholder"}`}>
          {activityName || "Tap to name activity"}
        </span>
      </button>
    </div>
  );
}

function WatchMicroKeyboard({
  value,
  onChange,
  onOk,
}: {
  value: string;
  onChange: (next: string) => void;
  onOk: () => void;
}) {
  const [keyboardMode, setKeyboardMode] = useState<KeyboardMode>("letters");
  const [emojiSearch, setEmojiSearch] = useState("");
  const emojiSearchRef = useRef<HTMLInputElement>(null);
  const append = (token: string) => onChange(value + token);
  const backspace = () => onChange(value.slice(0, -1));

  const filteredEmoji = useMemo(() => filterEmojiCatalog(emojiSearch), [emojiSearch]);
  const panelOpen = keyboardMode !== "letters";

  const showLetters = useCallback(() => {
    setKeyboardMode("letters");
    setEmojiSearch("");
  }, []);

  useEffect(() => {
    if (keyboardMode !== "emoji") return;
    window.setTimeout(() => emojiSearchRef.current?.focus(), 0);
  }, [keyboardMode]);

  return (
    <div
      className={`encoded-watch-gps-keyboard${panelOpen ? " encoded-watch-gps-keyboard--panel-open" : ""}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="encoded-watch-gps-keyboard-spacer" aria-hidden="true" />
      <div className="encoded-watch-gps-keyboard-panel">
        <div className="encoded-watch-gps-keyboard-header">
          <p className="encoded-watch-gps-keyboard-preview">{value || "Activity name"}</p>
        </div>
        <div className="encoded-watch-gps-keyboard-keys">
          <div className="encoded-watch-gps-keyboard-grid" role="group" aria-label="Micro keyboard">
        {keyboardMode === "emoji" ? (
          <>
            <div className="encoded-watch-gps-emoji-search">
              <span className="encoded-watch-gps-emoji-search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                ref={emojiSearchRef}
                type="search"
                className="encoded-watch-gps-emoji-search-input"
                value={emojiSearch}
                onChange={(event) => setEmojiSearch(event.target.value)}
                placeholder="Search emoji"
                aria-label="Search emoji"
                onClick={(event) => event.stopPropagation()}
              />
              {emojiSearch ? (
                <button
                  type="button"
                  className="encoded-watch-gps-emoji-search-clear"
                  onClick={() => setEmojiSearch("")}
                  aria-label="Clear emoji search"
                >
                  ×
                </button>
              ) : null}
            </div>
            <div className="encoded-watch-gps-emoji-picker" aria-label="Emoji picker">
              {filteredEmoji.length > 0 ? (
                filteredEmoji.map((entry) => (
                  <button
                    key={entry.emoji}
                    type="button"
                    className="encoded-watch-gps-key encoded-watch-gps-key--emoji-pick"
                    onClick={() => append(entry.emoji)}
                    title={entry.keywords[0]}
                  >
                    {entry.emoji}
                  </button>
                ))
              ) : (
                <p className="encoded-watch-gps-emoji-empty">No emoji found</p>
              )}
            </div>
          </>
        ) : null}

        {keyboardMode === "symbols" ? (
          <div className="encoded-watch-gps-symbol-picker" aria-label="Symbol picker">
            {KEYBOARD_SYMBOLS.map((symbol) => (
              <button
                key={symbol}
                type="button"
                className="encoded-watch-gps-key encoded-watch-gps-key--symbol-pick"
                onClick={() => append(symbol)}
              >
                {symbol}
              </button>
            ))}
          </div>
        ) : null}

        {keyboardMode === "letters"
          ? KEYBOARD_LETTERS.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="encoded-watch-gps-keyboard-row encoded-watch-gps-keyboard-row--letters"
                style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
              >
                {row.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="encoded-watch-gps-key encoded-watch-gps-key--letter"
                    onClick={() => append(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))
          : null}
        </div>

        <div
          className={`encoded-watch-gps-keyboard-actions${keyboardMode === "letters" ? " encoded-watch-gps-keyboard-actions--letters" : ""}`}
        >
          {keyboardMode === "letters" ? (
            <>
              <div className="encoded-watch-gps-keyboard-row encoded-watch-gps-keyboard-row--actions encoded-watch-gps-keyboard-row--actions-mini">
                <button
                  type="button"
                  className="encoded-watch-gps-key encoded-watch-gps-key--emoji-toggle"
                  onClick={() => setKeyboardMode("emoji")}
                  aria-label="Open emoji keyboard"
                >
                  😀
                </button>
                <button
                  type="button"
                  className="encoded-watch-gps-key encoded-watch-gps-key--symbols-toggle"
                  onClick={() => setKeyboardMode("symbols")}
                  aria-label="Open symbols keyboard"
                >
                  #+=
                </button>
                <button type="button" className="encoded-watch-gps-key" onClick={backspace} aria-label="Delete">
                  ⌫
                </button>
              </div>
              <div className="encoded-watch-gps-keyboard-row encoded-watch-gps-keyboard-row--actions encoded-watch-gps-keyboard-row--actions-wide">
                <button
                  type="button"
                  className="encoded-watch-gps-key encoded-watch-gps-key--wide"
                  onClick={() => append(" ")}
                >
                  space
                </button>
                <button type="button" className="encoded-watch-gps-key encoded-watch-gps-key--ok" onClick={onOk}>
                  OK
                </button>
              </div>
            </>
          ) : (
            <div className="encoded-watch-gps-keyboard-row encoded-watch-gps-keyboard-row--actions encoded-watch-gps-keyboard-row--actions-panel">
              <button type="button" className="encoded-watch-gps-key encoded-watch-gps-key--abc" onClick={showLetters}>
                ABC
              </button>
              {keyboardMode === "symbols" ? (
                <button
                  type="button"
                  className="encoded-watch-gps-key encoded-watch-gps-key--emoji-toggle"
                  onClick={() => setKeyboardMode("emoji")}
                  aria-label="Open emoji keyboard"
                >
                  😀
                </button>
              ) : (
                <button
                  type="button"
                  className="encoded-watch-gps-key encoded-watch-gps-key--symbols-toggle"
                  onClick={() => setKeyboardMode("symbols")}
                  aria-label="Open symbols keyboard"
                >
                  #+=
                </button>
              )}
              <button type="button" className="encoded-watch-gps-key" onClick={backspace} aria-label="Delete">
                ⌫
              </button>
              <button type="button" className="encoded-watch-gps-key encoded-watch-gps-key--ok" onClick={onOk}>
                OK
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

function GpsActivityCreatedScreen({ activityName }: { activityName: string }) {
  return (
    <div className="encoded-watch-logged encoded-watch-gps-created" role="status" aria-live="polite">
      <span className="encoded-watch-gps-created-icon" aria-hidden="true">
        <span className="encoded-watch-gps-created-icon-ring encoded-watch-gps-created-icon-ring--a" />
        <span className="encoded-watch-gps-created-icon-ring encoded-watch-gps-created-icon-ring--b" />
        <span className="encoded-watch-gps-created-icon-mark">
          <IconActivity className="encoded-watch-gps-created-icon-svg" size={36} stroke={1.75} />
        </span>
      </span>
      <div className="encoded-watch-logged-copy">
        <strong>GPS Activity Created</strong>
        <span>{activityName.trim() || "New activity"}</span>
      </div>
    </div>
  );
}

function DualTouchpoints({ x, y }: { x: number; y: number }) {
  return (
    <>
      <span
        className="encoded-watch-touchpoint encoded-watch-touchpoint--first"
        style={{ left: x - 16, top: y }}
        aria-hidden="true"
      />
      <span
        className="encoded-watch-touchpoint encoded-watch-touchpoint--second"
        style={{ left: x + 16, top: y }}
        aria-hidden="true"
      />
    </>
  );
}

export function GpsActivityWatch() {
  const [phase, setPhase] = useState<Phase>("clock");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activityName, setActivityName] = useState("");
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0, visible: false });
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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

  const openPicker = useCallback(() => {
    setPhase("picker");
    setScrollPosition(0);
    setIsScrolling(false);
  }, []);

  const resetToClock = useCallback(() => {
    setPhase("clock");
    setScrollPosition(0);
    setActivityName("");
    setSelectedIndex(0);
  }, []);

  const handleScreenClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (dragRef.current.moved) {
        dragRef.current.moved = false;
        return;
      }

      if (phase === "clock") {
        setPhase("ping");
        return;
      }

      if (phase === "ping") {
        openPicker();
        return;
      }

      if (phase === "picker") {
        setSelectedIndex(clampTierIndex(Math.round(scrollPosition)));
        setPhase("create");
        return;
      }
    },
    [openPicker, phase, scrollPosition],
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

  const confirmActivity = useCallback(() => {
    setPhase("created");
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPhase((current) => (current === "clock" ? "ping" : current));
    }, CHECK_IN_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (phase !== "created") return;

    const timeoutId = window.setTimeout(resetToClock, CREATED_SCREEN_MS);
    return () => window.clearTimeout(timeoutId);
  }, [phase, resetToClock]);

  const activeTier = FREQUENCY_TIERS[selectedIndex];
  const showWallpaper = phase === "clock" || phase === "ping";
  const showDualTouchpoints = phase === "picker" && cursor.visible;
  const interactiveScreen = phase !== "clock";

  return (
    <div className="encoded-watch-stage" aria-label="GPS Activity Apple Watch">
      <div className="encoded-watch-prototype-scale">
        <WatchDeviceShell
          screen={
            <div
              className={`device-screen encoded-watch-screen encoded-watch-gps-screen encoded-watch-screen--${phase}${phase === "picker" ? " encoded-watch-screen--draggable" : ""}${interactiveScreen ? " encoded-watch-gps-screen--interactive" : ""}`}
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
              aria-label="GPS Activity watch screen"
            >
              {showWallpaper ? <div className="encoded-watch-gps-wallpaper" aria-hidden="true" /> : null}
              {phase === "clock" || phase === "ping" ? <WatchClockFace variant="wallpaper" /> : null}
              {phase === "ping" ? <PingNotification onOpen={openPicker} /> : null}
              {phase === "picker" ? (
                <TierPickerScreen
                  scrollPosition={scrollPosition}
                  onSelect={selectTier}
                  isDragging={isDragging}
                  isScrolling={isScrolling}
                  snapTransitionMs={SNAP_TRANSITION_MS}
                />
              ) : null}
              {phase === "create" ? (
                <CreateGpsActivityScreen
                  tier={activeTier}
                  activityName={activityName}
                  onNameTap={() => setPhase("keyboard")}
                />
              ) : null}
              {phase === "keyboard" ? (
                <WatchMicroKeyboard value={activityName} onChange={setActivityName} onOk={confirmActivity} />
              ) : null}
              {phase === "created" ? <GpsActivityCreatedScreen activityName={activityName} /> : null}

              {showDualTouchpoints ? <DualTouchpoints x={cursor.x} y={cursor.y} /> : null}

              {cursor.visible && interactiveScreen && !showDualTouchpoints ? (
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

      <GpsSidePanel highlightTwoFinger={phase === "picker"} />
    </div>
  );
}

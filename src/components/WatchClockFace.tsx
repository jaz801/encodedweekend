// Added: shared Austin clock face for ENCODED and GPS Activity watch mockups.
// Added: `photo` variant — large digital time over photo wallpaper (Frequency Signals).

"use client";

import { useEffect, useState } from "react";

const AUSTIN_TIMEZONE = "America/Chicago";

function getAustinTimeParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: AUSTIN_TIMEZONE,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  const hour24 = read("hour") % 24;
  const minutes = read("minute");
  const seconds = read("second");
  const hours = hour24 % 12 || 12;
  const hourDeg = (hour24 % 12) * 30 + (minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  return { hours, minutes, hourDeg, minuteDeg, secondDeg };
}

function useLiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return getAustinTimeParts(time);
}

export function WatchClockFace({
  variant = "dark",
}: {
  variant?: "dark" | "wallpaper" | "photo";
}) {
  const { hours, minutes, hourDeg, minuteDeg, secondDeg } = useLiveClock();

  if (variant === "photo") {
    return (
      <div className="encoded-watch-clock encoded-watch-clock--photo" aria-hidden="true">
        <p className="encoded-watch-clock-digital encoded-watch-clock-digital--photo">
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
        </p>
      </div>
    );
  }

  return (
    <div className={`encoded-watch-clock${variant === "wallpaper" ? " encoded-watch-clock--wallpaper" : ""}`}>
      <div className="encoded-watch-clock-face" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className="encoded-watch-clock-tick"
            style={{ transform: `rotate(${index * 30}deg)` }}
          />
        ))}
        <span
          className="encoded-watch-clock-hand encoded-watch-clock-hand-hour"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />
        <span
          className="encoded-watch-clock-hand encoded-watch-clock-hand-minute"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />
        <span
          className="encoded-watch-clock-hand encoded-watch-clock-hand-second"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />
        <span className="encoded-watch-clock-center" />
      </div>
      <p className="encoded-watch-clock-digital">
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const TYPEWRITER_TEXT =
  "In 2026 you doubled in size, I believe you deserve to celebrate that as a team. This website is the result of my aligned actions exercise, after doing the program for 7 days. Here is the potential itinerary for a 3-day weekend.";

export function Typewriter() {
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function type() {
      if (index <= TYPEWRITER_TEXT.length) {
        setText(TYPEWRITER_TEXT.slice(0, index));
        index += 1;
        const previousChar = TYPEWRITER_TEXT[index - 2];
        const delay = previousChar === "." || previousChar === "," ? 180 : 26;
        timeoutId = setTimeout(type, delay);
      }
    }

    const startId = setTimeout(type, 450);

    return () => {
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <p className="hero-sub typewriter">
      <span id="tw-text">{text}</span>
      <span className="tw-cursor" aria-hidden="true">
        |
      </span>
    </p>
  );
}

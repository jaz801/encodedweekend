"use client";

const days = [
  { id: "day-1", label: "Day 1" },
  { id: "day-2", label: "Day 2" },
  { id: "day-3", label: "Day 3" },
] as const;

export function DayButtons() {
  function scrollToDay(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="day-buttons">
      {days.map((day) => (
        <button
          key={day.id}
          type="button"
          className="btn btn-ghost day-btn"
          onClick={() => scrollToDay(day.id)}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}

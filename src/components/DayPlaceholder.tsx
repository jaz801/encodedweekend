import { Reveal } from "./Reveal";

type DayPlaceholderProps = {
  id: string;
  day: string;
  label: string;
};

export function DayPlaceholder({ id, day, label }: DayPlaceholderProps) {
  return (
    <section id={id} className="day-section section-alt">
      <div className="wrap">
        <Reveal className="day-heading day-heading-center">
          <div className="eyebrow">{day}</div>
          <h2>{label}</h2>
          <p className="day-placeholder-copy">Schedule details coming soon.</p>
        </Reveal>
      </div>
    </section>
  );
}

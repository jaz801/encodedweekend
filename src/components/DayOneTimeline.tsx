// Day 1 schedule: each major block has its own sticky Lottie locked beside its titles.
// Rest durations match schedule: most are 1 hour; afternoon rest is 2 hours.

import { BrainstormAgenda } from "./BrainstormAgenda";
import { BrainstormAnimation } from "./BrainstormAnimation";
import { CocktailGlass } from "./CocktailGlass";
import { GreenJuiceLead } from "./GreenJuiceMenu";
import { DinnerLead } from "./DinnerMenu";
import { DinnerPotAnimation } from "./DinnerPotAnimation";
import { LunchAnimation } from "./LunchAnimation";
import { LunchBrunchLead } from "./LunchMenu";
import { Reveal } from "./Reveal";
import { SunsetAnimation } from "./SunsetAnimation";
import { TimelineSection } from "./TimelineSection";

const openingPoints = [
  "Lock in intention for the weekend",
  "Update the group on everyone's current frequency",
];

export function DayOneTimeline() {
  return (
    <section id="day-1" className="day-section">
      <div className="wrap">
        <div className="day-heading">
          <div className="eyebrow">Day 1</div>
          <h2>Kickoff & brainstorm</h2>
        </div>

        <div className="day-timeline-layout">
          <TimelineSection Visual={CocktailGlass}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">10:00</time>
                <h3>Arrival at Location X</h3>
                <GreenJuiceLead />
                <ul className="timeline-points">
                  {openingPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">11:00</time>
                <h3>Rest</h3>
                <p className="timeline-lead">1 hour</p>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={BrainstormAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">12:00</time>
                <h3>Brainstorm</h3>
                <BrainstormAgenda />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">13:00</time>
                <h3>Rest</h3>
                <p className="timeline-lead">1 hour</p>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={LunchAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">14:00</time>
                <h3>Lunch / Brunch</h3>
                <LunchBrunchLead />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">15:00</time>
                <h3>Rest</h3>
                <p className="timeline-lead">2 hours</p>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={SunsetAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">17:00</time>
                <h3>Sunset walk</h3>
                <p className="timeline-lead">Next to the beach.</p>
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">18:00</time>
                <h3>Rest</h3>
                <p className="timeline-lead">1 hour</p>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={DinnerPotAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">19:00</time>
                <h3>Dinner</h3>
                <DinnerLead />
              </div>
            </Reveal>
          </TimelineSection>
        </div>
      </div>
    </section>
  );
}

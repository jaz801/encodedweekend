// Day 2 schedule: exercise through Optimising the Future, break, soup dinner, then free evening.
// Fixed: 20:00 free evening continues same Day 2 section — no duplicate day heading.

import { BrainstormTwoAgenda } from "./BrainstormTwoAgenda";
import { BrainstormAnimation } from "./BrainstormAnimation";
import { BreakfastAnimation } from "./BreakfastAnimation";
import { BreakfastEnergizerMenu } from "./BreakfastEnergizerMenu";
import { BreakfastPlateMenu } from "./BreakfastPlateMenu";
import { ExerciseAnimation } from "./ExerciseAnimation";
import { ExerciseClassMenu } from "./ExerciseClassMenu";
import { RelaxationAnimation } from "./RelaxationAnimation";
import { RelaxationExperienceMenu } from "./RelaxationExperienceMenu";
import { DinnerPotAnimation } from "./DinnerPotAnimation";
import { MassageAnimation } from "./MassageAnimation";
import { MassageMenu } from "./MassageMenu";
import { SleepAnimation } from "./SleepAnimation";
import { SoupMenu } from "./SoupMenu";
import { Reveal } from "./Reveal";
import { TimelineSection } from "./TimelineSection";

export function DayTwoTimeline() {
  return (
    <section id="day-2" className="day-section section-alt">
      <div className="wrap">
        <div className="day-heading">
          <div className="eyebrow">Day 2</div>
          <h2>Deep Relaxation</h2>
        </div>

        <div className="day-timeline-layout">
          <TimelineSection Visual={ExerciseAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">08:00</time>
                <h3>Physical morning exercise</h3>
                <ExerciseClassMenu />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">09:00</time>
                <h3>Rest</h3>
                <p className="timeline-lead">1 hour</p>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={BreakfastAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">10:00</time>
                <h3>Breakfast</h3>
                <BreakfastEnergizerMenu />
                <BreakfastPlateMenu />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">10:30</time>
                <h3>Rest</h3>
                <p className="timeline-lead">30 min</p>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={MassageAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">11:00</time>
                <h3>Relax the Musculature</h3>
                <MassageMenu />
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={RelaxationAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">12:00</time>
                <h3>Parasympathetic relaxation</h3>
                <RelaxationExperienceMenu />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">15:00</time>
                <h3>Rest</h3>
                <p className="timeline-lead">1 hour</p>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={BrainstormAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">16:00</time>
                <h3>Optimising the Future</h3>
                <BrainstormTwoAgenda />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">18:00</time>
                <h3>Break</h3>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={DinnerPotAnimation} centerVisual>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">19:00</time>
                <h3>Dinner</h3>
                <SoupMenu />
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={SleepAnimation} centerVisual>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">20:00</time>
                <h3>Free evening</h3>
              </div>
            </Reveal>
          </TimelineSection>
        </div>
      </div>
    </section>
  );
}

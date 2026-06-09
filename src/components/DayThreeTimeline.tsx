// Day 3 schedule: walk, brunch, hackathon, fusion dinner, spa, and free evening.
// Fixed: hackathon block uses dedicated laptop Lottie instead of brainstorm bulb.

import { HackathonAnimation } from "./HackathonAnimation";
import { BrunchBaguetteMenu } from "./BrunchBaguetteMenu";
import { DayThreeHackathonMenu } from "./DayThreeHackathonMenu";
import { DinnerPotAnimation } from "./DinnerPotAnimation";
import { FusionDinnerMenu } from "./FusionDinnerMenu";
import { LunchAnimation } from "./LunchAnimation";
import { SpaAnimation } from "./SpaAnimation";
import { Reveal } from "./Reveal";
import { SleepAnimation } from "./SleepAnimation";
import { TimelineSection } from "./TimelineSection";
import { WalkAnimation } from "./WalkAnimation";

export function DayThreeTimeline() {
  return (
    <section id="day-3" className="day-section">
      <div className="wrap">
        <div className="day-heading">
          <div className="eyebrow">Day 3</div>
          <h2>Celebration</h2>
        </div>

        <div className="day-timeline-layout">
          <TimelineSection Visual={WalkAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">09:00</time>
                <h3>Morning walk</h3>
                <p className="timeline-lead">Clear the head for the final day.</p>
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">10:00</time>
                <h3>Break</h3>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={LunchAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">11:00</time>
                <h3>Brunch</h3>
                <BrunchBaguetteMenu />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">12:00</time>
                <h3>Break</h3>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={HackathonAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">13:00</time>
                <h3>Hackathon</h3>
                <DayThreeHackathonMenu />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">16:00</time>
                <h3>Break</h3>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={DinnerPotAnimation} centerVisual>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">18:00</time>
                <h3>Dinner</h3>
                <FusionDinnerMenu />
              </div>
            </Reveal>

            <Reveal className="timeline-item timeline-item-rest">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">19:00</time>
                <h3>Break</h3>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={SpaAnimation}>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">20:00</time>
                <h3>Spa</h3>
                <p className="timeline-lead">Unwind, reset, and let the body catch up.</p>
              </div>
            </Reveal>
          </TimelineSection>

          <TimelineSection Visual={SleepAnimation} centerVisual>
            <Reveal className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-body">
                <time className="timeline-time">21:00</time>
                <h3>Free evening program</h3>
              </div>
            </Reveal>
          </TimelineSection>
        </div>
      </div>
    </section>
  );
}

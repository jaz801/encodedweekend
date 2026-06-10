"use client";

// What the accelerator does — top performers, sync sources, experiments → ENCODED model.
// Fixed: cohort invite + Oura/Apple Watch sync; activity scheduling window (week vs month).
// Added: card 03 — application effect; weekly mastermind improves product and frequency measurement together.

export function EncodedAccelerationIntro() {
  return (
    <section className="freq-report-intro encoded-accel-intro" aria-labelledby="accel-intro-heading">
      <p className="encoded-measure-eyebrow">Encoded acceleration</p>
      <h2 id="accel-intro-heading" className="freq-report-intro-title">
        What the accelerator does
      </h2>
      <div className="freq-report-intro-grid">
        <article className="freq-report-intro-card">
          <span className="freq-report-intro-num">01</span>
          <h3>Top performers → pro cohort</h3>
          <p>
            We ask the top-performing ENCODED members to join the accelerator cohort. Everyone needs a
            sync source on wrist — we recommend Oura Ring and Apple Watch. That is how biometrics
            flow into the same pipeline as the frequency each person logs.
          </p>
          <dl className="freq-report-intro-data">
            <div>
              <dt>Sync source</dt>
              <dd>Oura Ring + Apple Watch</dd>
            </div>
            <div>
              <dt>Cohort size</dt>
              <dd>12 members</dd>
            </div>
            <div>
              <dt>Selection</dt>
              <dd>Top performers</dd>
            </div>
          </dl>
        </article>
        <article className="freq-report-intro-card">
          <span className="freq-report-intro-num">02</span>
          <h3>Schedule · experiment · model</h3>
          <p>
            We schedule one activity per cycle and align as a group whether one week of tracking
            makes sense — or whether we need a full month. Then we run the experiments. Data science
            finds the correlations and feeds the ENCODED model we are building together.
          </p>
          <dl className="freq-report-intro-data">
            <div>
              <dt>Activity cadence</dt>
              <dd>1 per cycle</dd>
            </div>
            <div>
              <dt>Tracking window</dt>
              <dd>1 week or 1 month</dd>
            </div>
            <div>
              <dt>ENCODED model</dt>
              <dd>v0.4 beta</dd>
            </div>
          </dl>
        </article>
        <article className="freq-report-intro-card">
          <span className="freq-report-intro-num">03</span>
          <h3>Application effect · mastermind</h3>
          <p>
            Every week the cohort meets to improve ENCODED in real use — and at the same time to
            improve how they measure and shift frequency. Wisdom of the crowd compounds: shared
            protocols, sharper reads, and product changes that only show up when a group trains
            together. It works like a mastermind.
          </p>
          <dl className="freq-report-intro-data">
            <div>
              <dt>Meet cadence</dt>
              <dd>Weekly</dd>
            </div>
            <div>
              <dt>Dual outcome</dt>
              <dd>Product + frequency</dd>
            </div>
            <div>
              <dt>Group dynamic</dt>
              <dd>Wisdom of the crowd</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

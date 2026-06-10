// Added: scroll target content after MEASURE cube — fitness devices, opt-in biometrics, frequency science.
// Fixed: Apple Watch uses transparent cutout PNG (gray/checkerboard bg removed).
// Added: animated wearables, accelerator program steps (brand guide).
// Fixed: black bg only — removed grey card and bottom CTAs; step 04 links to /frequency-report.
// Added: golden sample report links — Courtney Confare and Chris Walker.
// Fixed: wearables open the page; cohort invite, sync sources, experiments → model, weekly pro report.
// Fixed: removed "What we track" and frequency activities menu from this page.

import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import { EncodedAccelerationIntro } from "@/components/EncodedAccelerationIntro";

const OURA_RING_SRC = "/oura ring.avif";
const APPLE_WATCH_SRC = "/apple-watch-cutout.png";

const ACCELERATOR_STEPS = [
  {
    step: "01",
    title: "Invite top performers to the cohort",
    body: "We ask ENCODED's top-performing members to join the pro cohort. Opt in to share biometrics and the frequencies you log — voluntary, but the pool only works when the best data comes in.",
  },
  {
    step: "02",
    title: "Sync Oura Ring or Apple Watch",
    body: "Everyone needs a sync source on wrist. We recommend Oura Ring and Apple Watch — the two devices the cohort standardizes on so HRV, sleep, and recovery land in one pipeline.",
  },
  {
    step: "03",
    title: "Schedule the activity",
    body: "We pick one activity per cycle and align as a group: does one week of tracking make sense, or do we need a full month? The window has to match what we are trying to prove.",
  },
  {
    step: "04",
    title: "Run experiments · build the model",
    body: "Members run the scheduled activity. Data science finds correlations between biometrics, logged frequency, and what moved the band — and feeds the ENCODED model we are building together.",
  },
  {
    step: "05",
    title: "Receive your weekly frequency pro report",
    body: "Every week you get a frequency pro report — bandwidth, pure-tier normals, activities that lifted or dropped you, and the benchmarks that are yours, not Apple's or Oura's generalized score.",
    href: "/frequency-report",
    sampleReports: [
      { label: "Courtney Confare", href: "/frequency-report" },
      { label: "Chris Walker", href: "/frequency-report/chris-walker" },
    ],
  },
] as const;

export const EncodedAccelerationMeasureContent = forwardRef<HTMLElement>(
  function EncodedAccelerationMeasureContent(_props, ref) {
    return (
      <article ref={ref} className="encoded-measure-content" id="encoded-measure-content">
        <div className="encoded-measure-inner encoded-measure-centered">
          <section
            className="encoded-measure-devices-section encoded-measure-devices-opener"
            aria-labelledby="encoded-measure-devices-heading"
          >
            <p className="encoded-measure-eyebrow" id="encoded-measure-devices-heading">
              Sync source
            </p>
            <h2 className="encoded-measure-lead encoded-measure-lead-opener">
              Most Encoded users already track their body with a wearable.
            </h2>
            <p className="encoded-measure-device-copy">
              The cohort needs a reliable sync source — we recommend Oura Ring and Apple Watch.
              Fragmented device data is still your signal. Sync with ENCODED to see your frequency
              band and how training shifts mind-body connection over time.
            </p>

            <div className="encoded-measure-devices" aria-label="Recommended sync devices">
              <figure className="encoded-measure-device encoded-measure-device-oura-wrap">
                <div className="encoded-measure-device-frame encoded-measure-device-glow encoded-measure-device-glow-gold">
                  <Image
                    src={OURA_RING_SRC}
                    alt=""
                    width={220}
                    height={220}
                    aria-hidden="true"
                    className="encoded-measure-device-image encoded-measure-device-oura"
                  />
                </div>
                <figcaption>Oura Ring</figcaption>
              </figure>
              <figure className="encoded-measure-device encoded-measure-device-watch-wrap">
                <div className="encoded-measure-device-frame encoded-measure-device-glow encoded-measure-device-glow-blue">
                  <Image
                    src={APPLE_WATCH_SRC}
                    alt=""
                    width={435}
                    height={470}
                    aria-hidden="true"
                    className="encoded-measure-device-image encoded-measure-device-watch"
                  />
                </div>
                <figcaption>Apple Watch</figcaption>
              </figure>
            </div>
          </section>

          <EncodedAccelerationIntro />

          <section
            className="encoded-measure-program"
            aria-labelledby="encoded-accelerator-steps"
          >
            <p className="encoded-measure-eyebrow" id="encoded-accelerator-steps">
              How the program works
            </p>
            <h3 className="encoded-measure-program-title">Five steps. One shared experiment.</h3>

            <ol className="encoded-measure-steps">
              {ACCELERATOR_STEPS.map((item) => (
                <li key={item.step} className="encoded-measure-step">
                  <span className="encoded-measure-step-marker" aria-hidden="true" />
                  <div className="encoded-measure-step-body">
                    <span className="encoded-measure-step-num">{item.step}</span>
                    {"href" in item && item.href ? (
                      <h4>
                        <Link href={item.href} className="encoded-measure-report-link">
                          {item.title}
                        </Link>
                      </h4>
                    ) : (
                      <h4>{item.title}</h4>
                    )}
                    <p>{item.body}</p>
                    {"sampleReports" in item && item.sampleReports ? (
                      <div className="encoded-measure-report-links">
                        {item.sampleReports.map((report) => (
                          <Link
                            key={report.href}
                            href={report.href}
                            className="encoded-measure-report-link"
                          >
                            {report.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    );
  },
);

// Added: Courtney Confare ENFP frequency pro report — linked from Encoded Acceleration step 04.
// Added: enhanced report profile — ambient orbs, diary/tier animations, item hovers.

import type { Metadata } from "next";
import { FrequencyReportAmbient } from "@/components/FrequencyReportAmbient";
import { FrequencyReportExperience } from "@/components/FrequencyReportExperience";
import { courtneyConfareReport } from "@/lib/frequencyReports/courtneyConfare";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "ENCODED | Courtney Confare — ENFP Frequency Pro Report",
  description:
    "Courtney Confare's ENFP frequency pro report — Instagram, design, course building, exercise, reflection, and connection mapped to biometrics.",
};

export default function FrequencyReportPage() {
  return (
    <div className="amplification-page">
      <Nav />
      <main
        className="frequency-report-main frequency-report-main-enhanced"
        aria-label="Courtney Confare frequency pro report"
      >
        <FrequencyReportAmbient />
        <FrequencyReportExperience report={courtneyConfareReport} animationProfile="enhanced" />
      </main>
      <Footer />
    </div>
  );
}

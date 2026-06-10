// Added: Courtney Confare ENFP frequency pro report — linked from Encoded Acceleration step 04.

import type { Metadata } from "next";
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
      <main className="frequency-report-main" aria-label="Courtney Confare frequency pro report">
        <FrequencyReportExperience report={courtneyConfareReport} />
      </main>
      <Footer />
    </div>
  );
}

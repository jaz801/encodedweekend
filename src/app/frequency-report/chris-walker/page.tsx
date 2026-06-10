// Added: Chris Walker ENTJ frequency pro report — podcast, gym, strategy, LinkedIn, events, family/friends, reading.

import type { Metadata } from "next";
import { FrequencyReportExperience } from "@/components/FrequencyReportExperience";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { chrisWalkerReport } from "@/lib/frequencyReports/chrisWalker";

export const metadata: Metadata = {
  title: "ENCODED | Chris Walker — ENTJ Frequency Pro Report",
  description:
    "Chris Walker's ENTJ frequency pro report — podcast, gym, strategy, LinkedIn, events, and biometrics mapped to ENCODED training.",
};

export default function ChrisWalkerFrequencyReportPage() {
  return (
    <div className="amplification-page">
      <Nav />
      <main className="frequency-report-main" aria-label="Chris Walker frequency pro report">
        <FrequencyReportExperience report={chrisWalkerReport} />
      </main>
      <Footer />
    </div>
  );
}

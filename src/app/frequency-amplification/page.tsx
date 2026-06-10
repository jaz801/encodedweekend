// Added: rain-on-water frequency amplification animation between nav and footer.

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { FrequencyAmplificationAnimation } from "@/components/FrequencyAmplificationAnimation";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "ENCODED | Frequency Amplification",
  description: "Frequency Amplification by ENCODED.",
};

export default function FrequencyAmplificationPage() {
  return (
    <div className="amplification-page">
      <Nav />
      <main className="amplification-main">
        <FrequencyAmplificationAnimation />
      </main>
      <Footer />
    </div>
  );
}

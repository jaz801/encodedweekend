// Added: rain-on-water frequency amplification animation between nav and footer.
// Fixed: animation performance — canvas-rendered ripples replace heavy DOM/CSS pulse layer.
// Fixed: pulse z-index — water layer below black air mask, rain layer above mask.

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

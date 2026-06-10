// Added: Encoded Acceleration page — logo nav, black main area, footer (matches amplification layout).
// Fixed: encoded acceleration — logical page flow, tier activity menu, wearable biometrics.

import type { Metadata } from "next";
import { EncodedAccelerationExperience } from "@/components/EncodedAccelerationExperience";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "ENCODED | Encoded Acceleration",
  description:
    "Encoded acceleration — tier activities, transition protocols, Apple Watch + Oura biometrics, and frequency training.",
};

export default function EncodedAccelerationPage() {
  return (
    <div className="amplification-page">
      <Nav />
      <main className="encoded-accel-page-main" aria-label="Encoded Acceleration">
        <EncodedAccelerationExperience />
      </main>
      <Footer />
    </div>
  );
}

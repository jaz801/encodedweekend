// Added: Encoded Apple Watch App page — hero, three prototype tabs, and interactive watch demos.

import type { Metadata } from "next";
import { EncodedAppleWatchAppExperience } from "@/components/EncodedAppleWatchAppExperience";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "ENCODED | Encoded Apple Watch App",
  description:
    "ENCODED on the wrist — frequency logging, GPS activity, and member updates.",
};

export default function EncodedAppleWatchAppPage() {
  return (
    <div className="amplification-page">
      <Nav />
      <main className="encoded-watch-app-main" aria-label="Encoded Apple Watch App">
        <EncodedAppleWatchAppExperience />
      </main>
      <Footer />
    </div>
  );
}

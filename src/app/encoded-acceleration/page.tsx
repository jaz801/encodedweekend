// Added: Encoded Acceleration page — logo nav, black main area, footer (matches amplification layout).

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "ENCODED | Encoded Acceleration",
  description: "Encoded Acceleration by ENCODED.",
};

export default function EncodedAccelerationPage() {
  return (
    <div className="amplification-page">
      <Nav />
      <main className="amplification-main" aria-label="Encoded Acceleration" />
      <Footer />
    </div>
  );
}

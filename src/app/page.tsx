// Hero plus day navigation; Day 1 timeline with Lottie cocktail glass.

import { DayButtons } from "@/components/DayButtons";
import { DayOneTimeline } from "@/components/DayOneTimeline";
import { DayPlaceholder } from "@/components/DayPlaceholder";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Typewriter } from "@/components/Typewriter";

export default function Home() {
  return (
    <>
      <Nav />

      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Frequency Weekend
            <br />
            to celebrate <span className="gold">500 members</span>
          </h1>
          <Typewriter />
          <DayButtons />
        </div>
      </header>

      <DayOneTimeline />
      <DayPlaceholder id="day-2" day="Day 2" label="Training & connection" />
      <DayPlaceholder id="day-3" day="Day 3" label="Integration & close" />

      <Footer />
    </>
  );
}

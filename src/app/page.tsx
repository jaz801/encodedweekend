// Hero plus day navigation; Day 1–3 timelines with expandable menus.

import { DayButtons } from "@/components/DayButtons";
import { DayOneTimeline } from "@/components/DayOneTimeline";
import { DayTwoTimeline } from "@/components/DayTwoTimeline";
import { DayThreeTimeline } from "@/components/DayThreeTimeline";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OrganizeThisNote } from "@/components/OrganizeThisNote";
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
      <DayTwoTimeline />
      <DayThreeTimeline />

      <OrganizeThisNote />
      <Footer />
    </>
  );
}

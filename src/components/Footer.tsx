// Added: footer nav buttons linking to Frequency Weekend (home) and Frequency Amplification pages.
// Added: Encoded Apple Watch App link in footer navigation.

import Link from "next/link";
import { EncodedLogo } from "./EncodedLogo";

export function Footer() {
  return (
    <footer>
      <div className="brand">
        <EncodedLogo className="encoded-logo-footer" />
      </div>
      <div className="footer-links">
        <Link href="/" className="btn btn-ghost footer-btn">
          Frequency Weekend
        </Link>
        <Link href="/frequency-amplification" className="btn btn-ghost footer-btn">
          Frequency Amplification
        </Link>
        <Link href="/encoded-apple-watch-app" className="btn btn-ghost footer-btn">
          Encoded Apple Watch App
        </Link>
      </div>
      <div className="fine">
        Frequency Training for Your Subconscious Mind ·{" "}
        <span className="gold">500+ members and counting</span>
      </div>
    </footer>
  );
}

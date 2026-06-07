import { EncodedLogo } from "./EncodedLogo";

export function Footer() {
  return (
    <footer>
      <div className="brand">
        <EncodedLogo className="encoded-logo-footer" />
      </div>
      <div className="fine">
        Frequency Training for Your Subconscious Mind ·{" "}
        <span className="gold">500+ members and counting</span>
      </div>
    </footer>
  );
}

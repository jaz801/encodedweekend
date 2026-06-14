// Added: Build Plan overlay card — black website card over the watch with partnership pitch + Calendly.
// Fixed: only shown from Frequency Signals page via bottom bar button (not inside watch screen).
// Fixed: full-screen collaboration invite with large readable typography.
// Fixed: timeline updated to 2 months — simple check-ins (frequency, location, updates); NFT/entry passes later.
// Fixed: invitation rewritten — assumes design buy-in; vision-led, collaborative tone for ENFP decision-maker.

type BuildPlanOverlayCardProps = {
  onClose: () => void;
};

export function BuildPlanOverlayCard({ onClose }: BuildPlanOverlayCardProps) {
  return (
    <div
      className="encoded-watch-build-plan-card"
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Build plan proposal"
    >
      <button type="button" className="encoded-watch-build-plan-close" onClick={onClose} aria-label="Close build plan">
        ×
      </button>
      <div className="encoded-watch-build-plan-scroll">
        <div className="encoded-watch-build-plan-inner">
          <p className="encoded-watch-build-plan-lead">You’ve seen the direction — here’s how we ship it.</p>
          <p className="encoded-watch-build-plan-quote">
            ENCODED on the wrist: the daily loop that keeps frequency training alive between journal
            sessions.
          </p>
          <p className="encoded-watch-build-plan-body">
            I’d love to build this with you — as the first aligned venture we launch together. v1 stays
            simple and real: frequency check-ins, location logging, and member updates. The entry-pass and
            richer experiences can come once the daily habit is working.
          </p>
          <p className="encoded-watch-build-plan-body">
            Two months to build (July–August). Beta with 50 of your most dedicated advanced-package members
            in September. Launch the wearable app in October.
          </p>
          <p className="encoded-watch-build-plan-body">
            If this feels like the right first venture, let’s map the build together — scope, beta, and what
            we ship first.
          </p>
          <p className="encoded-watch-build-plan-cta-label">Next step</p>
          <a
            className="encoded-watch-build-plan-link"
            href="https://calendly.com/jasperruijs/introduction-meeting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book 20 minutes with me
          </a>
        </div>
      </div>
    </div>
  );
}

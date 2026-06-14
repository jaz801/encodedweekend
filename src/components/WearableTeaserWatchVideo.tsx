// Added: Remotion Player wrapper for wearable teaser on the Frequency Signals watch screen.
// Fixed: play once (no loop) so the watch does not replay into an extra second.

"use client";

import { Player } from "@remotion/player";
import { WearableTeaserComposition } from "@/remotion/WearableTeaserComposition";
import { WEARABLE_TEASER } from "@/remotion/wearableTeaserConfig";

export function WearableTeaserWatchVideo() {
  return (
    <div className="encoded-watch-signals-video" aria-label="ENCODED wearable coming soon">
      <Player
        component={WearableTeaserComposition}
        durationInFrames={WEARABLE_TEASER.durationInFrames}
        fps={WEARABLE_TEASER.fps}
        compositionWidth={WEARABLE_TEASER.width}
        compositionHeight={WEARABLE_TEASER.height}
        style={{
          width: "100%",
          height: "100%",
        }}
        loop={false}
        autoPlay
        controls={false}
        clickToPlay={false}
        showVolumeControls={false}
        initiallyMuted
        acknowledgeRemotionLicense
      />
    </div>
  );
}

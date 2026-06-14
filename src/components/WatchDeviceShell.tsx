// Added: shared Apple Watch Ultra device chrome for prototype mockups.

import type { ReactNode } from "react";

export function WatchDeviceShell({ screen }: { screen: ReactNode }) {
  return (
    <div className="device device-apple-watch-ultra">
      <div className="device-frame">{screen}</div>
      <div className="device-stripe" />
      <div className="device-header" />
      <div className="device-btns" />
      <div className="device-power" />
      <div className="device-home" />
    </div>
  );
}

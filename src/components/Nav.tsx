// Removed nav links and CTA — page sections they targeted were removed.

import { EncodedLogo } from "./EncodedLogo";

export function Nav() {
  return (
    <nav>
      <div className="brand">
        <EncodedLogo />
      </div>
    </nav>
  );
}

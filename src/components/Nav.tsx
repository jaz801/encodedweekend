// Removed nav links and CTA — page sections they targeted were removed.
// Fixed: restored wave logo + ENCODED wordmark on the left, linking home.

import Link from "next/link";
import { EncodedLogo } from "./EncodedLogo";

export function Nav() {
  return (
    <nav>
      <Link href="/" className="brand brand-link" aria-label="ENCODED home">
        <EncodedLogo showWordmark={false} className="encoded-logo-nav-icon" />
        <span className="brand-wordmark">ENCODED</span>
      </Link>
    </nav>
  );
}

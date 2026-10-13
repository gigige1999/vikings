/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Gilt line glyphs for the milestone era seals (replaces the old emoji badges).
 */

import React from "react";

const GLYPHS: Record<string, React.ReactNode> = {
  // 793 · Lindisfarne raid — dragon-prowed longship
  raid: (
    <>
      <path d="M3.4 14.6 H20.6 L19 17.4 Q12 19.6 5 17.4 Z" fill="currentColor" />
      <path d="M20.4 14.8 C22.4 12.6 22.4 9.4 19.8 8.8" strokeWidth="1.8" />
      <path d="M3.6 14.8 C1.6 12.6 1.6 9.4 4.2 8.8" strokeWidth="1.8" />
      <path d="M12 14.6 V3" />
      <path d="M7.4 4.6 H16.6 L16 12.2 H8 Z" fill="currentColor" fillOpacity="0.3" />
      <path d="M12 4.6 V12.2" strokeWidth="1" opacity="0.6" />
      <path d="M4 21.2 q2 -1.3 4 0 t4 0 t4 0 t4 0" strokeWidth="1.3" />
    </>
  ),
  // 802–878 · Resistance — round plank shield
  resistance: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      <path d="M12 3.4 V9.6 M12 14.4 V20.6 M3.4 12 H9.6 M14.4 12 H20.6" strokeWidth="1.1" />
      <path d="M5.9 5.9 L10.3 10.3 M13.7 13.7 L18.1 18.1" strokeWidth="1.1" opacity="0.6" />
    </>
  ),
  // 899–954 · Wessex reclaims the land — upright sword
  expansion: (
    <>
      <path d="M12 2.4 L13.6 4.8 V14.6 H10.4 V4.8 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M12 6 V13.4" strokeWidth="1" opacity="0.7" />
      <path d="M6.6 14.8 Q12 13.6 17.4 14.8" strokeWidth="2" />
      <path d="M12 15.6 V19.4" strokeWidth="2" />
      <circle cx="12" cy="20.9" r="1.4" fill="currentColor" />
    </>
  ),
  // 973 · Edgar's coronation — crown
  peak: (
    <>
      <path d="M4.4 17 L3.4 8.4 L8.2 11.6 L12 5.4 L15.8 11.6 L20.6 8.4 L19.6 17 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M4.4 19.6 H19.6" strokeWidth="1.8" />
      <circle cx="3.4" cy="7.4" r="1.1" fill="currentColor" />
      <circle cx="12" cy="4.2" r="1.1" fill="currentColor" />
      <circle cx="20.6" cy="7.4" r="1.1" fill="currentColor" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  // 991–1013 · Danegeld — silver penny and hoard
  danegeld: (
    <>
      <circle cx="12" cy="9.6" r="7.2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="9.6" r="5" strokeWidth="1" />
      <path d="M12 6.4 V12.8 M8.8 9.6 H15.2" />
      <path d="M5 19.4 H19" strokeWidth="1.8" />
      <path d="M7 22 H17" strokeWidth="1.8" />
    </>
  ),
  // 1016 · Cnut's North Sea Empire — orb and cross
  empire: (
    <>
      <circle cx="12" cy="14.6" r="6.6" fill="currentColor" fillOpacity="0.22" />
      <path d="M5.4 14.6 H18.6" />
      <path d="M12 8 V14.6" />
      <path d="M12 8 V2.4 M9.6 4.6 H14.4" strokeWidth="1.8" />
    </>
  ),
  // 1035–1042 · The empire breaks apart — broken chain
  collapse: (
    <>
      <rect x="2.4" y="9" width="9.2" height="6" rx="3" transform="rotate(-35 7 12)" />
      <rect x="12.4" y="9" width="9.2" height="6" rx="3" transform="rotate(-35 17 12)" />
      <path d="M11.2 6.2 L12.2 7.9 M13.9 5.4 L13.4 7.4 M12.6 16.6 L11.6 18.4 M10.2 17.6 L10.9 16" strokeWidth="1.2" />
    </>
  ),
  // 1066 · Twilight — Dane axe
  ending: (
    <>
      <g transform="rotate(18 12 12)">
        <path d="M9.6 2.2 V21.8" strokeWidth="1.9" />
        <path d="M9.6 4.4 L12.4 3.6 C16.8 4.6 19.6 7.6 20 12.6 C17 11 14 10.6 11.6 11.4 L9.6 11.6 Z" fill="currentColor" />
        <path d="M9.6 20.6 V22" strokeWidth="2.8" />
      </g>
    </>
  ),
};

export default function EraGlyph({ id, fallback, className = "" }: { id: string; fallback?: string; className?: string }) {
  const glyph = GLYPHS[id];
  if (!glyph) return <span className={className}>{fallback}</span>;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}

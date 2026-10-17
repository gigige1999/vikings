/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Hand-drawn SVG portrait medallions for the Chronicle's key figures,
 * in the manner of an illuminated-manuscript miniature.
 * Each figure carries the attribute they are known by (Forkbeard's split beard,
 * the Confessor's white beard and halo, St Edmund's arrow, Harold's Bayeux moustache…).
 * Drawn in a local coordinate space of −50…50, clipped to a circle of radius 50.
 */

import React from "react";
import { FIGURE_BY_ID, FACTIONS } from "../figures_data";

type Hair = "short" | "long" | "none";
type Beard = "none" | "short" | "full" | "long" | "forked" | "moustache";
type Head = "crown" | "trefoil" | "nasal" | "spectacle" | "conical" | "coif" | "veil" | "headband" | "none";
type Brows = "calm" | "stern" | "worried";

interface Look {
  hair: Hair;
  hairColor: string;
  beard: Beard;
  head: Head;
  cloak: string;
  tunic: string;
  brows?: Brows;
  halo?: boolean;
  arrow?: boolean;
  cross?: boolean;
  fur?: boolean;
  braids?: boolean;
  lips?: boolean;
}

const INK = "#2a2017";
const SKIN = "#efd7b2";
const SKIN_SHADE = "#d6b187";
const SKIN_LINE = "#a8805a";
const GOLD = "#d9b46a";
const GOLD_DK = "#9c7a45";
const IRON = "#8d939b";
const IRON_DK = "#5d636b";
const IRON_HI = "#c8cdd2";
const MAIL = "#9ba1a8";
const VEIL = "#f4efe3";
const LINEN = "#e9dfc8";

const LOOKS: Record<string, Look> = {
  // Crowned martyr with halo and the arrow of his passion
  edmund_martyr: { hair: "short", hairColor: "#6b4a2b", beard: "short", head: "crown", cloak: "#6e2a3a", tunic: LINEN, halo: true, arrow: true },
  // Round iron helm with nasal, dark braids, fur
  ivar: { hair: "long", hairColor: "#3e2a1a", beard: "full", head: "nasal", cloak: "#3b3127", tunic: "#5a1814", braids: true, fur: true, brows: "stern" },
  // Bare-headed, red-haired, leather headband
  ubba: { hair: "long", hairColor: "#a5522a", beard: "full", head: "headband", cloak: "#3d4a3a", tunic: "#c9b48a", brows: "stern" },
  // "Spectacle" helm of the Gjermundbu type, fair beard
  halfdan: { hair: "long", hairColor: "#c9a35a", beard: "full", head: "spectacle", cloak: "#2f3d5a", tunic: "#e3d0a6", brows: "stern" },
  // Gold crown, brown beard, royal red cloak
  alfred: { hair: "long", hairColor: "#6b4a2b", beard: "short", head: "crown", cloak: "#7d1d18", tunic: LINEN },
  // The baptised king: bare head, fair hair, gold cross
  guthrum: { hair: "long", hairColor: "#b8935a", beard: "full", head: "none", cloak: "#5a4632", tunic: LINEN, cross: true },
  // Young trefoil crown, anxious brows of the "ill-counselled" king
  aethelred2: { hair: "short", hairColor: "#8a6238", beard: "short", head: "trefoil", cloak: "#34557a", tunic: "#e3d0a6", brows: "worried" },
  // Crowned queen in veil and wimple
  emma: { hair: "none", hairColor: VEIL, beard: "none", head: "veil", cloak: "#7d1d18", tunic: VEIL, lips: true },
  // The split "fork" beard
  sweyn: { hair: "long", hairColor: "#9a7440", beard: "forked", head: "crown", cloak: "#2f3d5a", tunic: "#e3d0a6", brows: "stern" },
  // "Ironside": mail coif under a circlet
  edmund2: { hair: "none", hairColor: "#5a3e24", beard: "short", head: "coif", cloak: "#7d1d18", tunic: MAIL, brows: "stern" },
  // Trefoil crown, trimmed beard, blue and gold
  cnut: { hair: "long", hairColor: "#7a5530", beard: "short", head: "trefoil", cloak: "#34557a", tunic: GOLD },
  // The saint-king: long white beard, crown and halo
  edward: { hair: "long", hairColor: "#ece6da", beard: "long", head: "crown", cloak: "#34557a", tunic: LINEN, halo: true },
  // Norman conical helm with nasal and mail, clean-shaven
  william: { hair: "none", hairColor: "#3e2a1a", beard: "none", head: "conical", cloak: "#7d1d18", tunic: MAIL, brows: "stern" },
  // Crowned, with the long English moustache of the Bayeux Tapestry
  harold: { hair: "long", hairColor: "#a07a45", beard: "moustache", head: "crown", cloak: "#7d1d18", tunic: LINEN },
  // The giant of the north: long fair beard, braids, fur, crown
  hardrada: { hair: "long", hairColor: "#d2b06a", beard: "long", head: "crown", cloak: "#2f3d5a", tunic: "#e3d0a6", braids: true, fur: true, brows: "stern" }
};

const FALLBACK: Look = { hair: "short", hairColor: "#6b4a2b", beard: "short", head: "none", cloak: "#5a4632", tunic: LINEN };

const ln = { stroke: INK, strokeWidth: 1.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/* --------------------------------- parts --------------------------------- */

const darken = (hex: string, k = 0.72) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.round(v * k).toString(16).padStart(2, "0");
  return `#${c((n >> 16) & 255)}${c((n >> 8) & 255)}${c(n & 255)}`;
};

const Crown = ({ y0 }: { y0: number }) => (
  <g>
    <path
      d={`M-17 ${y0} L-17.5 ${y0 - 12} L-11 ${y0 - 6} L-5.5 ${y0 - 15} L0 ${y0 - 7} L5.5 ${y0 - 15} L11 ${y0 - 6} L17.5 ${y0 - 12} L17 ${y0} Z`}
      fill={GOLD}
      {...ln}
      strokeWidth={1.4}
    />
    <path d={`M-17 ${y0 - 3.6} L17 ${y0 - 3.6}`} stroke={GOLD_DK} strokeWidth={1.1} />
    {[-17.5, -5.5, 5.5, 17.5].map((x, i) => (
      <circle key={i} cx={x} cy={y0 - (Math.abs(x) > 10 ? 12 : 15)} r={1.7} fill={GOLD} stroke={INK} strokeWidth={1} />
    ))}
    <circle cx={0} cy={y0 - 1.8} r={1.7} fill="#8b1a1a" />
    <circle cx={-10} cy={y0 - 1.8} r={1.3} fill="#2f5a7a" />
    <circle cx={10} cy={y0 - 1.8} r={1.3} fill="#2f5a7a" />
  </g>
);

const Trefoil = ({ y0 }: { y0: number }) => (
  <g>
    {[-10.5, 0, 10.5].map((cx) => {
      const top = y0 - (cx === 0 ? 12.5 : 10.5);
      return (
        <g key={cx} fill={GOLD} stroke={INK} strokeWidth={1.1}>
          <circle cx={cx} cy={top} r={2.9} />
          <circle cx={cx - 2.7} cy={top + 2.7} r={2.1} />
          <circle cx={cx + 2.7} cy={top + 2.7} r={2.1} />
        </g>
      );
    })}
    <path d={`M-17 ${y0} L17 ${y0} L16.4 ${y0 - 6.5} L-16.4 ${y0 - 6.5} Z`} fill={GOLD} {...ln} strokeWidth={1.4} />
    <circle cx={0} cy={y0 - 3.2} r={1.8} fill="#8b1a1a" />
    <circle cx={-9.5} cy={y0 - 3.2} r={1.3} fill="#2a5a3f" />
    <circle cx={9.5} cy={y0 - 3.2} r={1.3} fill="#2a5a3f" />
  </g>
);

const HelmDome = ({ tall = false }: { tall?: boolean }) => (
  <g>
    {tall ? (
      <path d="M-18 -5 C-17.5 -16 -9 -29 0 -38 C9 -29 17.5 -16 18 -5 Z" fill={IRON} {...ln} />
    ) : (
      <path d="M-18.5 -5 C-19.5 -22 -11 -30.5 0 -30.5 C11 -30.5 19.5 -22 18.5 -5 Z" fill={IRON} {...ln} />
    )}
    <path d={tall ? "M-4 -31 C-9 -25 -13 -17 -14.5 -9" : "M-6 -27.5 C-12 -24.5 -15 -18 -16 -10"} stroke={IRON_HI} strokeWidth={2.4} fill="none" strokeLinecap="round" />
    {!tall && <path d="M0 -30.5 L0 -10" stroke={IRON_DK} strokeWidth={1.3} />}
    <path d="M-19 -10 L19 -10 L18.6 -4.5 L-18.6 -4.5 Z" fill={IRON_DK} {...ln} strokeWidth={1.3} />
    {[-13, -6.5, 6.5, 13].map((x) => (
      <circle key={x} cx={x} cy={-7.2} r={0.95} fill={IRON_HI} />
    ))}
  </g>
);

const Nasal = ({ to = 5.5 }: { to?: number }) => (
  <path d={`M-2.3 -5 L2.3 -5 L1.8 ${to} Q0 ${to + 1.2} -1.8 ${to} Z`} fill={IRON} {...ln} strokeWidth={1.2} />
);

const MailRings = ({ d }: { d: string }) => <path d={d} fill="none" stroke={IRON_DK} strokeWidth={1.05} strokeDasharray="1.4 1.6" />;

const Arrow = ({ tip, tail }: { tip: [number, number]; tail: [number, number] }) => {
  const [tx, ty] = tip;
  const [fx, fy] = tail;
  const len = Math.hypot(fx - tx, fy - ty);
  const ux = (fx - tx) / len;
  const uy = (fy - ty) / len;
  const px = -uy;
  const py = ux;
  const fl = (k: number, side: number) =>
    `M${(fx - ux * k).toFixed(1)} ${(fy - uy * k).toFixed(1)} l${(px * side * 3.4 + ux * 3).toFixed(1)} ${(py * side * 3.4 + uy * 3).toFixed(1)}`;
  return (
    <g strokeLinecap="round">
      <circle cx={tx} cy={ty} r="1.6" fill="#5a1814" opacity="0.8" />
      <path d={`M${tx} ${ty} L${fx} ${fy}`} stroke={INK} strokeWidth="3" />
      <path d={`M${tx} ${ty} L${fx} ${fy}`} stroke="#8a6a44" strokeWidth="1.7" />
      <path d={[0, 2.6, 5.2].map((k) => `${fl(k, 1)} ${fl(k, -1)}`).join(" ")} stroke="#f2ead8" strokeWidth="1.5" />
    </g>
  );
};

const BEARDS: Record<Exclude<Beard, "none" | "moustache">, string> = {
  short: "M-16.3 1 C-15.5 13 -9 20.5 0 21.5 C9 20.5 15.5 13 16.3 1 C13 8 9 9.5 4 9 Q0 7.5 -4 9 C-9 9.5 -13 8 -16.3 1 Z",
  full: "M-16.6 -1 C-17.6 15 -11 30 0 33 C11 30 17.6 15 16.6 -1 C13 8 9 9.5 4 9 Q0 7.5 -4 9 C-9 9.5 -13 8 -16.6 -1 Z",
  long: "M-16.6 -1 C-19 18 -10 40 0 47 C10 40 19 18 16.6 -1 C13 8 9 9.5 4 9 Q0 7.5 -4 9 C-9 9.5 -13 8 -16.6 -1 Z",
  forked: "M-16.6 -1 C-17.6 13 -13.5 25 -8.5 41 L-1.6 30 L0 31.5 L1.6 30 L8.5 41 C13.5 25 17.6 13 16.6 -1 C13 8 9 9.5 4 9 Q0 7.5 -4 9 C-9 9.5 -13 8 -16.6 -1 Z"
};

const BEARD_STRANDS: Partial<Record<Beard, string>> = {
  full: "M-7 15 Q-6 23 -3.5 29 M7 15 Q6 23 3.5 29 M0 14 L0 28",
  long: "M-8 15 Q-7 28 -3.5 40 M8 15 Q7 28 3.5 40 M0 14 L0 41",
  forked: "M-9 15 Q-9 26 -7 35 M9 15 Q9 26 7 35"
};

/* ------------------------------- the artwork ------------------------------ */

export function PortraitArt({ id }: { id: string }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const look = LOOKS[id] ?? FALLBACK;
  const fig = FIGURE_BY_ID[id];
  const bg = fig ? FACTIONS[fig.faction].color : "#5a4632";
  const hairDk = darken(look.hairColor);
  const helmeted = look.head === "nasal" || look.head === "spectacle" || look.head === "conical";
  const showHairCap = look.hair !== "none" && !helmeted && look.head !== "coif" && look.head !== "veil";
  const beardFill = look.hairColor;

  const brows =
    look.brows === "stern"
      ? ["M-10.5 -10.2 L-3 -8.2", "M10.5 -10.2 L3 -8.2"]
      : look.brows === "worried"
        ? ["M-10.5 -8.2 L-3 -10.6", "M10.5 -8.2 L3 -10.6"]
        : ["M-10.5 -8.6 Q-7 -10.8 -3 -9", "M10.5 -8.6 Q7 -10.8 3 -9"];

  return (
    <g>
      <defs>
        <clipPath id={`pc-${uid}`}>
          <circle r="50" />
        </clipPath>
        <radialGradient id={`pv-${uid}`} cx="50%" cy="40%" r="60%">
          <stop offset="62%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.32" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#pc-${uid})`}>
        {/* Field */}
        <circle r="50" fill={bg} />
        <circle cx="0" cy="-12" r="36" fill="#fff" opacity="0.12" />

        {/* Figure, framed a little closer so the face reads at node size */}
        <g transform="translate(0 5) scale(1.13)">
        {/* Halo with punched-gold dots */}
        {look.halo && (
          <g>
            <circle cx="0" cy="-8" r="29" fill={GOLD} stroke={GOLD_DK} strokeWidth="1.5" />
            <circle cx="0" cy="-8" r="25.5" fill="none" stroke={GOLD_DK} strokeWidth="1" strokeDasharray="0.1 3.2" strokeLinecap="round" />
          </g>
        )}

        {/* Hair falling behind the shoulders */}
        {look.hair === "long" && !look.head.match(/coif|veil|conical/) && (
          <path d="M-18 -10 C-23 6 -22 22 -16 32 L16 32 C22 22 23 6 18 -10 Z" fill={look.hairColor} {...ln} />
        )}

        {/* Shoulders: cloak, tunic, gold trim, brooch */}
        <path d="M-52 62 L-52 50 C-48 34 -32 26 -12 23 L12 23 C32 26 48 34 52 50 L52 62 Z" fill={look.cloak} {...ln} />
        <path d="M-12 23 L0 40 L12 23 Z" fill={look.tunic} {...ln} />
        <path d="M-12.5 23.4 L0 41 L12.5 23.4" fill="none" stroke={GOLD} strokeWidth="1.8" />
        {look.tunic === MAIL && <MailRings d="M-8 26 L0 37 L8 26" />}

        {look.fur && (
          <path
            d="M-45 43 Q-39 30 -24 27 Q-15 25 -9 25 L9 25 Q15 25 24 27 Q39 30 45 43 Q41 39 37 41 Q33 35 28 38 Q24 33 19 36 Q15 31 11 34 L0 39 L-11 34 Q-15 31 -19 36 Q-24 33 -28 38 Q-33 35 -37 41 Q-41 39 -45 43 Z"
            fill="#cdbfa3"
            {...ln}
            strokeWidth={1.2}
          />
        )}

        {/* Emma's veil drapes over the shoulders */}
        {look.head === "veil" && (
          <path d="M-21 -12 C-26 8 -30 30 -38 58 L-14 58 C-14 42 -12 31 -10 24 L10 24 C12 31 14 42 14 58 L38 58 C30 30 26 8 21 -12 Z" fill={VEIL} {...ln} />
        )}

        {!look.fur && !look.cross && !look.arrow && look.head !== "veil" && (
          <g>
            <circle cx="-24" cy="33" r="4.4" fill={GOLD} {...ln} strokeWidth={1.2} />
            <circle cx="-24" cy="33" r="1.6" fill="#8b1a1a" />
          </g>
        )}

        {/* St Edmund's arrows, lodged in both shoulders */}
        {look.arrow && (
          <g>
            <Arrow tip={[15, 30]} tail={[33, 12]} />
            <Arrow tip={[-17, 29]} tail={[-34, 15]} />
          </g>
        )}

        {/* Neck, ears, head */}
        <path d="M-7.5 12 L-7.5 26 Q0 30 7.5 26 L7.5 12 Z" fill={SKIN_SHADE} {...ln} strokeWidth={1.2} />
        <ellipse cx="-16.4" cy="-1" rx="3.2" ry="5" fill={SKIN} {...ln} strokeWidth={1.3} />
        <ellipse cx="16.4" cy="-1" rx="3.2" ry="5" fill={SKIN} {...ln} strokeWidth={1.3} />
        <ellipse cx="0" cy="-2" rx="16.5" ry="20" fill={SKIN} {...ln} strokeWidth={1.8} />

        {/* Wimple wraps the chin */}
        {look.head === "veil" && (
          <path d="M-14.5 5 C-13 19 -7 25 0 25 C7 25 13 19 14.5 5 L15.5 25 Q0 34 -15.5 25 Z" fill={VEIL} {...ln} strokeWidth={1.4} />
        )}

        {/* Face */}
        <circle cx="-9.5" cy="4" r="3.2" fill="#de8f78" opacity="0.32" />
        <circle cx="9.5" cy="4" r="3.2" fill="#de8f78" opacity="0.32" />
        {brows.map((d) => (
          <path key={d} d={d} fill="none" stroke={look.head === "veil" ? "#6b4a2b" : darken(look.hairColor === "#ece6da" ? "#b9b2a4" : look.hairColor, 0.8)} strokeWidth="1.9" strokeLinecap="round" />
        ))}
        <ellipse cx="-6.5" cy="-3.6" rx="2" ry="1.7" fill={INK} />
        <ellipse cx="6.5" cy="-3.6" rx="2" ry="1.7" fill={INK} />
        <circle cx="-5.9" cy="-4.2" r="0.55" fill="#fff" opacity="0.8" />
        <circle cx="7.1" cy="-4.2" r="0.55" fill="#fff" opacity="0.8" />
        <path d="M0.6 -6 Q-1.6 2 -2.3 4.2 Q0 5.7 2.3 4.4" fill="none" stroke={SKIN_LINE} strokeWidth="1.3" strokeLinecap="round" />
        {look.lips ? (
          <path d="M-3.6 10.4 Q0 13.8 3.6 10.4 Q0 11.3 -3.6 10.4 Z" fill="#b5524a" />
        ) : (
          (look.beard === "none" || look.beard === "moustache") && (
            <path d={look.beard === "moustache" ? "M-3.2 12.6 Q0 14 3.2 12.6" : "M-3.8 10.5 Q0 12.6 3.8 10.5"} fill="none" stroke="#9a4a3a" strokeWidth="1.5" strokeLinecap="round" />
          )
        )}

        {/* Hair on top of the head */}
        {showHairCap && (
          <path
            d="M-17 0 C-19 -18 -9 -25.5 0 -25.5 C9 -25.5 19 -18 17 0 C15.5 -8 12 -12.5 6.5 -14.5 C2.5 -12 -3.5 -12 -8 -14 C-12 -12.5 -15.2 -8 -17 0 Z"
            fill={look.hairColor}
            {...ln}
          />
        )}

        {/* Braids beside the face */}
        {look.braids &&
          [-19.6, 19.6].map((x) => (
            <g key={x}>
              {[3, 9, 15, 21, 27].map((y) => (
                <ellipse key={y} cx={x} cy={y} rx="2.8" ry="3.6" fill={look.hairColor} stroke={INK} strokeWidth="1" />
              ))}
              <circle cx={x} cy="32" r="1.7" fill={GOLD} stroke={INK} strokeWidth="0.8" />
            </g>
          ))}

        {/* Beard & moustache */}
        {look.beard !== "none" && look.beard !== "moustache" && (
          <g>
            <path d={BEARDS[look.beard]} fill={beardFill} {...ln} />
            {BEARD_STRANDS[look.beard] && <path d={BEARD_STRANDS[look.beard]} fill="none" stroke={hairDk} strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />}
            <path d="M-8.5 9.2 C-5 6.2 -2 6.6 0 7.8 C2 6.6 5 6.2 8.5 9.2 C5 9.6 2.5 10 0 9.3 C-2.5 10 -5 9.6 -8.5 9.2 Z" fill={beardFill} stroke={hairDk} strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M-2.6 11.8 Q0 12.8 2.6 11.8" fill="none" stroke="#7a3a2c" strokeWidth="1.3" strokeLinecap="round" />
            {look.beard === "long" && <circle cx="0" cy="44" r="1.8" fill={GOLD} stroke={INK} strokeWidth="0.8" />}
          </g>
        )}
        {look.beard === "moustache" && (
          <path d="M0 7.6 C-3 6 -7 6.4 -10.5 14.5 C-8 11.6 -4.5 10.2 0 10 C4.5 10.2 8 11.6 10.5 14.5 C7 6.4 3 6 0 7.6 Z" fill={look.hairColor} stroke={hairDk} strokeWidth="1.1" strokeLinejoin="round" />
        )}

        {/* Guthrum's baptismal cross */}
        {look.cross && (
          <g transform="translate(-21.5 16) scale(0.85)">
            <path d="M-2 0 h4 v4.2 h4.2 v4 h-4.2 v8 h-4 v-8 h-4.2 v-4 h4.2 Z" fill={GOLD} stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
            <circle cx="0" cy="6.2" r="1.1" fill="#8b1a1a" />
          </g>
        )}

        {/* Headgear */}
        {look.head === "crown" && <Crown y0={-12} />}
        {look.head === "trefoil" && <Trefoil y0={-12} />}
        {look.head === "headband" && (
          <g>
            <path d="M-17 -13 C-8 -17 8 -17 17 -13 L17.3 -9.6 C8 -13.6 -8 -13.6 -17.3 -9.6 Z" fill="#6e2a1c" {...ln} strokeWidth={1.2} />
            {[-10, 0, 10].map((x) => (
              <circle key={x} cx={x} cy={x === 0 ? -13.4 : -12.6} r="1.2" fill={GOLD} />
            ))}
          </g>
        )}
        {look.head === "nasal" && (
          <g>
            <HelmDome />
            <Nasal />
          </g>
        )}
        {look.head === "spectacle" && (
          <g>
            <HelmDome />
            <circle cx="-6.6" cy="-2.6" r="4.8" fill="none" stroke={IRON_DK} strokeWidth="3" />
            <circle cx="6.6" cy="-2.6" r="4.8" fill="none" stroke={IRON_DK} strokeWidth="3" />
            <circle cx="-6.6" cy="-2.6" r="4.8" fill="none" stroke={IRON_HI} strokeWidth="0.8" opacity="0.7" />
            <circle cx="6.6" cy="-2.6" r="4.8" fill="none" stroke={IRON_HI} strokeWidth="0.8" opacity="0.7" />
            <Nasal to={3} />
          </g>
        )}
        {look.head === "conical" && (
          <g>
            <path d="M-19.5 -6 C-21.5 12 -15 27.5 0 29.5 C15 27.5 21.5 12 19.5 -6 L15.6 -6 C15.6 8 10 17.6 0 18.9 C-10 17.6 -15.6 8 -15.6 -6 Z" fill={MAIL} {...ln} strokeWidth={1.4} />
            <MailRings d="M-17.6 -2 C-18.6 13 -12 24.5 0 26 C12 24.5 18.6 13 17.6 -2" />
            <HelmDome tall />
            <Nasal to={7} />
          </g>
        )}
        {look.head === "coif" && (
          <g>
            <path
              d="M-21.5 2 C-22.5 -18 -12 -29 0 -29 C12 -29 22.5 -18 21.5 2 C21.5 18 15 29 0 31 C-15 29 -21.5 18 -21.5 2 Z M-14 -4 C-14 9 -8.5 17.5 0 18.6 C8.5 17.5 14 9 14 -4 C14 -13 8 -17 0 -17 C-8 -17 -14 -13 -14 -4 Z"
              fill={MAIL}
              fillRule="evenodd"
              {...ln}
              strokeWidth={1.4}
            />
            <MailRings d="M-18 0 C-18.5 -14 -10 -24.5 0 -24.5 C10 -24.5 18.5 -14 18 0 C18 14 12 24.5 0 26.5 C-12 24.5 -18 14 -18 0" />
            <Crown y0={-19} />
          </g>
        )}
        {look.head === "veil" && (
          <g>
            <path d="M-19 0 C-20 -19 -10 -26 0 -26 C10 -26 20 -19 19 0 C17 -8 15 -13 11 -15.5 C6 -17.5 -6 -17.5 -11 -15.5 C-15 -13 -17 -8 -19 0 Z" fill={VEIL} {...ln} />
            <Crown y0={-15} />
          </g>
        )}
        </g>

        {/* Soft vignette for depth */}
        <circle r="50" fill={`url(#pv-${uid})`} />
      </g>
    </g>
  );
}

/** Standalone medallion (detail card, chips). */
export function Portrait({ id, className = "", ring = true }: { id: string; className?: string; ring?: boolean }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      <PortraitArt id={id} />
      {ring && (
        <>
          <circle r="48.4" fill="none" stroke={GOLD} strokeWidth="3.2" />
          <circle r="45.6" fill="none" stroke="#f6eedd" strokeOpacity="0.55" strokeWidth="0.9" />
        </>
      )}
    </svg>
  );
}

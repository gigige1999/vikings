/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Architecture chapter, page 1.
 * Left page: how building changed across four stages (c. 800–1066).
 * Right page: a hand-drawn, labelled diagram of the selected stage.
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { ARCH_ERAS, ARCH_W, ARCH_H, ArchEra } from "../arch_data";

type Lang = "en" | "zh";

interface SharedProps {
  language: Lang;
  era: number;
  onEraChange: (i: number) => void;
  spot: number | null;
  onSpot: (n: number | null) => void;
}

const fonts = (isZh: boolean) => ({
  title: isZh ? "font-zh-serif font-bold tracking-[0.08em]" : "font-gothic",
  label: isZh ? "font-zh-serif tracking-[0.2em]" : "font-display uppercase tracking-[0.22em]"
});

/* ------------------------------- palette ------------------------------- */

const INK = "#2a2017";
const WOOD = "#8a6038";
const WOOD_DK = "#5e3f22";
const THATCH = "#caa45c";
const THATCH_DK = "#a07c3a";
const TURF = "#6f7f45";
const EARTH = "#9a7a52";
const STONE = "#d8cdb6";
const STONE_DK = "#a99d84";
const INTERIOR = "#ece1c7";
const FIRE = "#e0702c";
const ln = { stroke: INK, strokeWidth: 1.3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

const range = (a: number, b: number, step: number) => {
  const out: number[] = [];
  for (let v = a; v <= b; v += step) out.push(v);
  return out;
};

const Flames = ({ xs, base }: { xs: number[]; base: number }) => (
  <g>
    {xs.map((x, i) => (
      <path
        key={i}
        d={`M${x - 4} ${base} C${x - 5} ${base - 6} ${x - 1} ${base - 8} ${x} ${base - 13} C${x + 2} ${base - 8} ${x + 5} ${base - 6} ${x + 4} ${base} Z`}
        fill={FIRE}
        stroke="#9a3a12"
        strokeWidth="0.9"
      />
    ))}
  </g>
);

const Smoke = ({ x, y }: { x: number; y: number }) => (
  <path
    d={`M${x} ${y} c-6 -6 6 -10 0 -16 c-6 -6 6 -10 0 -16`}
    fill="none"
    stroke="#8d8579"
    strokeWidth="2.2"
    strokeLinecap="round"
    opacity="0.55"
  />
);

const ThatchStrokes = ({ x0, x1, y0, y1, clip }: { x0: number; x1: number; y0: number; y1: number; clip: string }) => {
  const id = "th" + React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={clip} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`} stroke={THATCH_DK} strokeWidth="0.9" strokeLinecap="round" opacity="0.8">
        {range(y0 + 4, y1 - 3, 7).map((y, r) =>
          range(x0 + (r % 2) * 4, x1, 8).map((x) => <path key={`${x}-${y}`} d={`M${x} ${y} l1.5 4`} />)
        )}
      </g>
    </g>
  );
};

/* ------------------------------- diagrams ------------------------------- */

function Longhouse({ isZh }: { isZh: boolean }) {
  const G = 186;
  return (
    <g>
      {/* plan inset */}
      <g>
        <rect x="8" y="5" width="124" height="44" rx="6" fill="#fff" fillOpacity="0.5" stroke="#b8955f" strokeOpacity="0.6" />
        <path d="M20 21 Q68 9 116 21 L116 33 Q68 45 20 33 Z" fill={INTERIOR} {...ln} />
        {range(32, 104, 12).map((x) => (
          <g key={x}>
            <circle cx={x} cy={23.5} r="1.6" fill={WOOD_DK} />
            <circle cx={x} cy={30.5} r="1.6" fill={WOOD_DK} />
          </g>
        ))}
        <path d="M50 27 H86" stroke={FIRE} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M100 21.5 V32.5" stroke={WOOD_DK} strokeWidth="1.2" />
        <text x="70" y="47" textAnchor="middle" fontSize="7" fill="#6b5a45" className={isZh ? "font-zh-serif" : "font-display"} letterSpacing="1">
          {isZh ? "俯视平面" : "PLAN"}
        </text>
      </g>

      {/* ground */}
      <rect x="0" y={G} width={ARCH_W} height={ARCH_H - G} fill="#cdb98e" opacity="0.55" />
      <path d={`M0 ${G} H${ARCH_W}`} {...ln} />

      {/* interior back wall */}
      <rect x="30" y="118" width="270" height={G - 118} fill={INTERIOR} {...ln} />
      <g stroke="#cbb994" strokeWidth="0.8">
        {range(40, 292, 12).map((x) => (
          <path key={x} d={`M${x} 122 V${G}`} />
        ))}
      </g>

      {/* benches */}
      <rect x="36" y="160" width="206" height={G - 160} fill="#c9a36a" {...ln} />
      <path d="M36 160 H242" stroke={WOOD_DK} strokeWidth="2.4" />
      {[60, 88, 116, 222].map((x) => (
        <path key={x} d={`M${x - 9} 160 q4 -5 9 -2 q5 -4 9 2 Z`} fill="#efe6d2" stroke={INK} strokeWidth="0.9" />
      ))}

      {/* byre */}
      <rect x="246" y="118" width="4" height={G - 118} fill={WOOD} {...ln} strokeWidth={1} />
      {[268, 288].map((x) => (
        <path key={x} d={`M${x} 160 V${G}`} stroke={WOOD_DK} strokeWidth="2" />
      ))}
      <path d="M256 152 C262 146 286 146 292 152 L298 150 L299 158 L294 158 L292 176 L288 176 L287 164 L262 164 L261 176 L257 176 L256 160 Z" fill="#7a5a3a" {...ln} strokeWidth={1.1} />
      <path d="M298 150 l3 -3" {...ln} strokeWidth={1} />
      <path d="M252 154 h44" stroke={WOOD_DK} strokeWidth="1.6" />

      {/* hearth */}
      <rect x="130" y="177" width="100" height="8" rx="2" fill="#5a4632" {...ln} />
      {range(133, 228, 7).map((x) => (
        <circle key={x} cx={x} cy="177" r="2.6" fill={STONE_DK} stroke={INK} strokeWidth="0.7" />
      ))}
      <Flames xs={[152, 170, 188, 206]} base={176} />

      {/* posts and beam */}
      {[55, 95, 135, 175, 215].map((x) => (
        <rect key={x} x={x - 3} y="118" width="6" height={G - 118} fill={WOOD} {...ln} strokeWidth={1.1} />
      ))}
      <rect x="28" y="116" width="274" height="5" fill={WOOD_DK} {...ln} strokeWidth={1} />

      {/* hanging meat and fish */}
      {[118, 158, 198].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 121 V127`} stroke={INK} strokeWidth="0.8" />
          <path d={i === 1 ? `M${x - 2.5} 127 h5 l-1 10 q-1.5 3 -3 0 Z` : `M${x - 3} 127 q3 -1 6 0 q1 6 -3 11 q-4 -5 -3 -11 Z`} fill={i === 1 ? "#cfb68c" : "#9a3a2a"} stroke={INK} strokeWidth="0.8" />
        </g>
      ))}

      {/* roof (long side, cut along the eaves) */}
      <path d="M22 120 L60 84 L150 84 L150 88 L170 88 L170 84 L268 84 L308 120 Z" fill={THATCH} {...ln} strokeWidth={1.5} />
      <ThatchStrokes x0={22} x1={306} y0={84} y1={120} clip="M24 119 L60 85 L268 85 L306 119 Z" />
      <path d="M60 84 L150 84 M170 84 L268 84" stroke={TURF} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M22 120 H308" stroke={THATCH_DK} strokeWidth="2" />
      <Smoke x={160} y={84} />
    </g>
  );
}

function IslandHouse() {
  const G = 186;
  const stones = (x0: number, x1: number) =>
    range(142, 180, 9).map((y, r) => (
      <g key={`${x0}-${y}`}>
        <rect x={x0} y={y} width={x1 - x0} height="8" rx="2.5" fill={STONE} stroke={INK} strokeWidth="0.9" transform={r % 2 ? `translate(${x0 < 160 ? -1 : 1} 0)` : undefined} />
      </g>
    ));
  return (
    <g>
      <rect x="0" y={G} width={ARCH_W} height={ARCH_H - G} fill="#b9b27a" opacity="0.5" />
      <path d="M0 196 q20 -4 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#6f8aa0" strokeWidth="1.3" opacity="0.6" />

      {/* interior */}
      <path d={`M80 140 L160 72 L240 140 L240 ${G} L80 ${G} Z`} fill={INTERIOR} {...ln} />

      {/* walls: two drystone faces, earth core */}
      {[
        { o: "M26 186 L32 138 L82 138 L84 186 Z", a: [28, 42], b: [70, 84], core: [42, 70] },
        { o: "M294 186 L288 138 L238 138 L236 186 Z", a: [278, 292], b: [236, 250], core: [250, 278] }
      ].map((w, i) => (
        <g key={i}>
          <path d={w.o} fill={EARTH} {...ln} />
          {range(146, 182, 6).map((y) => (
            <circle key={y} cx={(w.core[0] + w.core[1]) / 2 + ((y / 6) % 2 ? 5 : -5)} cy={y} r="1" fill="#5e4a30" />
          ))}
          {stones(w.a[0], w.a[1])}
          {stones(w.b[0], w.b[1])}
          <path d={`M${w.a[0] - 2} 136 H${w.b[1] + 2}`} stroke={TURF} strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}

      {/* benches, hearth */}
      <rect x="86" y="168" width="28" height={G - 168} fill="#c9a36a" {...ln} />
      <rect x="206" y="168" width="28" height={G - 168} fill="#c9a36a" {...ln} />
      <rect x="136" y="180" width="48" height="6" rx="2" fill="#5a4632" {...ln} />
      {range(139, 182, 7).map((x) => (
        <circle key={x} cx={x} cy="180" r="2.4" fill={STONE_DK} stroke={INK} strokeWidth="0.7" />
      ))}
      <Flames xs={[150, 160, 170]} base={179} />

      {/* posts and tie-beam */}
      {[118, 202].map((x) => (
        <rect key={x} x={x - 3} y="96" width="6" height={G - 96} fill={WOOD} {...ln} strokeWidth={1.1} />
      ))}
      <rect x="112" y="102" width="96" height="5" fill={WOOD_DK} {...ln} strokeWidth={1} />

      {/* rafters under the turf */}
      <path d="M44 140 L160 68 L276 140" fill="none" stroke={WOOD} strokeWidth="4" strokeLinejoin="round" />
      <path d="M44 140 L160 68 L276 140" fill="none" stroke={INK} strokeWidth="0.8" strokeLinejoin="round" />

      {/* turf roof */}
      <path d="M18 142 L160 52 L302 142 L288 147 L160 66 L32 147 Z" fill={TURF} {...ln} strokeWidth={1.5} />
      <g stroke="#9cab66" strokeWidth="1" strokeLinecap="round">
        {range(28, 150, 9).map((x) => (
          <path key={`l${x}`} d={`M${x} ${142 - ((x - 18) * 90) / 142 - 1} l-1 -3.5 M${x + 3} ${142 - ((x - 15) * 90) / 142 - 1} l1 -3`} />
        ))}
        {range(170, 294, 9).map((x) => (
          <path key={`r${x}`} d={`M${x} ${52 + ((x - 160) * 90) / 142 - 1} l1 -3.5 M${x + 3} ${52 + ((x - 157) * 90) / 142 - 1} l-1 -3`} />
        ))}
      </g>
      <Smoke x={160} y={56} />
    </g>
  );
}

function TownStreet() {
  const G = 150;
  const wattleWall = (x0: number, x1: number, y0: number, y1: number, k: string) => (
    <g key={k}>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="#c9ad7e" {...ln} />
      {range(y0 + 4, y1 - 2, 6).map((y, i) => (
        <path key={y} d={`M${x0} ${y} q${(x1 - x0) / 4} ${i % 2 ? 2.5 : -2.5} ${(x1 - x0) / 2} 0 t${(x1 - x0) / 2} 0`} fill="none" stroke="#8a6a44" strokeWidth="1" />
      ))}
    </g>
  );
  return (
    <g>
      {/* soil */}
      <rect x="0" y={G} width={ARCH_W} height={ARCH_H - G} fill="#7a5c3a" opacity="0.55" />
      {range(8, 312, 13).map((x, i) => (
        <circle key={x} cx={x} cy={160 + ((i * 17) % 44)} r="1.3" fill="#3e2c1a" opacity="0.5" />
      ))}
      <path d="M262 190 c4 -6 18 -6 24 -1 l2 5 h-26 Z" fill="#4a3220" stroke={INK} strokeWidth="0.9" />
      <rect x="292" y="178" width="18" height="6" rx="1.5" fill="#e3d6b8" stroke={INK} strokeWidth="0.8" />
      {range(294, 308, 2.5).map((x) => (
        <path key={x} d={`M${x} 184 v3`} stroke={INK} strokeWidth="0.7" />
      ))}

      {/* street planks */}
      <rect x="0" y={G - 4} width={ARCH_W} height="4" fill={WOOD} opacity="0.7" />
      <path d={`M0 ${G} H${ARCH_W}`} {...ln} />

      {/* left house: post-and-wattle */}
      {wattleWall(14, 104, 104, G, "lw")}
      {[14, 44, 74, 104].map((x) => (
        <rect key={x} x={x - 2} y="104" width="4" height={G - 104} fill={WOOD_DK} {...ln} strokeWidth={0.9} />
      ))}
      <path d={`M50 ${G} V126 Q59 118 68 126 V${G} Z`} fill="#4a3220" {...ln} />
      <path d="M8 106 L59 58 L110 106 Z" fill={THATCH} {...ln} strokeWidth={1.4} />
      <ThatchStrokes x0={10} x1={108} y0={60} y1={106} clip="M10 105 L59 60 L108 105 Z" />

      {/* plot fences */}
      {wattleWall(106, 118, 128, G, "f1")}
      {wattleWall(202, 214, 128, G, "f2")}

      {/* middle house: cut away, sunken floor */}
      <rect x="120" y="104" width="80" height="81" fill={INTERIOR} {...ln} />
      <rect x="120" y={G} width="80" height="35" fill="#e3d4b0" {...ln} />
      {range(120, 200, 10).map((x) => (
        <path key={x} d={`M${x} ${G} V185`} stroke="#b89a6a" strokeWidth="0.8" />
      ))}
      <path d="M120 185 H200" stroke={INK} strokeWidth="1.8" />
      {[124, 130, 136].map((x, i) => (
        <path key={x} d={`M${x} ${G + 8 + i * 9} h7`} stroke={WOOD_DK} strokeWidth="2.6" strokeLinecap="round" />
      ))}
      {/* shelf of turned bowls */}
      <path d="M134 132 H188" stroke={WOOD_DK} strokeWidth="2.4" strokeLinecap="round" />
      {[140, 152, 164, 176].map((x) => (
        <path key={x} d={`M${x - 5} 131 q5 -8 10 0 Z`} fill="#b4844a" stroke={INK} strokeWidth="0.8" />
      ))}
      {/* lathe bench */}
      <rect x="142" y="168" width="30" height="5" fill={WOOD} {...ln} strokeWidth={1} />
      <path d="M145 173 V185 M169 173 V185" stroke={WOOD_DK} strokeWidth="2" />
      <ellipse cx="157" cy="164" rx="6" ry="4" fill="#b4844a" stroke={INK} strokeWidth="0.9" />
      <path d="M140 164 H174" stroke={INK} strokeWidth="1" />
      {[120, 200].map((x) => (
        <rect key={x} x={x - 2.5} y="104" width="5" height="81" fill={WOOD_DK} {...ln} strokeWidth={0.9} />
      ))}
      <path d="M114 106 L160 58 L206 106 Z" fill={THATCH} {...ln} strokeWidth={1.4} />
      <ThatchStrokes x0={116} x1={204} y0={60} y1={106} clip="M116 105 L160 60 L204 105 Z" />

      {/* right house: oak planks between posts */}
      <rect x="216" y="104" width="90" height={G - 104} fill="#9a6a3c" {...ln} />
      {range(110, G - 2, 6).map((y) => (
        <path key={y} d={`M216 ${y} H306`} stroke={WOOD_DK} strokeWidth="1" />
      ))}
      {[216, 261, 306].map((x) => (
        <rect key={x} x={x - 2.5} y="104" width="5" height={G - 104} fill={WOOD_DK} {...ln} strokeWidth={0.9} />
      ))}
      <path d={`M270 ${G} V126 Q279 118 288 126 V${G} Z`} fill="#3e2a18" {...ln} />
      <path d="M210 106 L261 58 L312 106 Z" fill={THATCH} {...ln} strokeWidth={1.4} />
      <ThatchStrokes x0={212} x1={310} y0={60} y1={106} clip="M212 105 L261 60 L310 105 Z" />
      <Smoke x={160} y={60} />
    </g>
  );
}

function StoneChurch() {
  const G = 186;
  const courses = (x0: number, x1: number, y0: number) => (
    <g stroke={STONE_DK} strokeWidth="0.8">
      {range(y0 + 8, G - 2, 8).map((y, r) => (
        <g key={y}>
          <path d={`M${x0} ${y} H${x1}`} />
          {range(x0 + (r % 2 ? 6 : 12), x1 - 3, 14).map((x) => (
            <path key={x} d={`M${x} ${y - 8} v8`} />
          ))}
        </g>
      ))}
    </g>
  );
  const arch = (x: number, y: number, w: number, h: number, fill = "#3e2c1c") => (
    <path d={`M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z`} fill={fill} stroke={INK} strokeWidth="1" />
  );
  return (
    <g>
      <rect x="0" y={G} width={ARCH_W} height={ARCH_H - G} fill="#b9b27a" opacity="0.5" />
      <path d={`M0 ${G} H${ARCH_W}`} {...ln} />

      {/* chancel */}
      <rect x="196" y="130" width="66" height={G - 130} fill={STONE} {...ln} />
      {courses(196, 262, 130)}
      {arch(225, 140, 7, 13)}
      <path d="M192 132 L204 114 L254 114 L266 132 Z" fill="#7d6f5f" {...ln} strokeWidth={1.4} />

      {/* nave */}
      <rect x="76" y="112" width="120" height={G - 112} fill={STONE} {...ln} />
      {courses(76, 196, 112)}
      {arch(90, 120, 7, 14)}
      {arch(176, 120, 7, 14)}
      <rect x="124" y="133" width="28" height="18" fill="#efe6d2" stroke={INK} strokeWidth="1" />
      <path d="M130 136 h16 M128 148 h20" stroke="#8a7a60" strokeWidth="0.8" />
      <path d="M131 141 A7 7 0 0 0 145 141 Z" fill="#e3d6b8" stroke={INK} strokeWidth="0.9" />
      {[0, 30, 60, 90, 120, 150, 180].map((a) => (
        <path key={a} d={`M138 141 l${(-7 * Math.cos((a * Math.PI) / 180)).toFixed(2)} ${(7 * Math.sin((a * Math.PI) / 180)).toFixed(2)}`} stroke={INK} strokeWidth="0.6" />
      ))}
      {arch(128, 154, 20, 32, "#4a3220")}
      <path d="M72 114 L86 90 L186 90 L200 114 Z" fill="#7d6f5f" {...ln} strokeWidth={1.4} />
      <g stroke="#5f5346" strokeWidth="0.7">
        {range(94, 112, 6).map((y) => (
          <path key={y} d={`M${86 - ((y - 90) * 14) / 24} ${y} H${186 + ((y - 90) * 14) / 24}`} />
        ))}
      </g>

      {/* west tower with long-and-short quoins and paired belfry openings */}
      <rect x="36" y="44" width="40" height={G - 44} fill={STONE} {...ln} />
      {courses(36, 76, 44)}
      {range(48, G - 10, 16).map((y) => (
        <g key={y} fill="#e9e1cf" stroke={INK} strokeWidth="0.8">
          <rect x="36" y={y} width="5" height="11" />
          <rect x="36" y={y + 11} width="11" height="5" />
          <rect x="71" y={y} width="5" height="11" />
          <rect x="65" y={y + 11} width="11" height="5" />
        </g>
      ))}
      <path d="M36 82 H76" stroke={INK} strokeWidth="1.6" />
      {arch(45, 56, 8, 18)}
      {arch(59, 56, 8, 18)}
      <rect x="54.5" y="62" width="3" height="12" fill={STONE_DK} stroke={INK} strokeWidth="0.7" />
      {arch(53, 112, 6, 12)}
      <path d="M32 46 L56 26 L80 46 Z" fill="#7d6f5f" {...ln} strokeWidth={1.4} />

      {/* ring-headed stone cross */}
      <rect x="280" y="182" width="20" height="6" fill={STONE_DK} {...ln} strokeWidth={1} />
      <rect x="286" y="112" width="8" height="70" fill="#c98a6a" {...ln} />
      <path d={range(116, 176, 6).map((y) => `M286 ${y} l8 4 l-8 4`).join(" ")} fill="none" stroke="#8a4a32" strokeWidth="0.8" />
      <circle cx="290" cy="102" r="9" fill="none" stroke={INK} strokeWidth="4.4" />
      <circle cx="290" cy="102" r="9" fill="none" stroke="#c98a6a" strokeWidth="2.6" />
      <path d="M286 90 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 Z" fill="#c98a6a" {...ln} strokeWidth={1.1} />

      {/* hogback in the foreground */}
      <path d="M200 204 V192 Q231 170 262 192 V204 Z" fill="#c4b79c" {...ln} strokeWidth={1.4} />
      {[0, 1, 2].map((r) => (
        <path
          key={r}
          d={range(206 + r * 3, 256 - r * 3, 7).map((x) => `M${x} ${190 + r * 4 - Math.max(0, 9 - Math.abs(x - 231) / 3) + 3} q3.5 3 7 0`).join(" ")}
          fill="none"
          stroke="#7a6d55"
          strokeWidth="0.8"
        />
      ))}
      {[200, 262].map((x, i) => (
        <path key={x} d={`M${x} 204 V190 q${i ? 6 : -6} -4 ${i ? 4 : -4} -10 q${i ? 4 : -4} 2 ${i ? 4 : -4} 8 V204 Z`} fill="#9a8a6a" {...ln} strokeWidth={1.1} />
      ))}

      {/* small headstones */}
      {[96, 112].map((x) => (
        <path key={x} d={`M${x} ${G + 12} V${G + 2} q4 -5 8 0 V${G + 12} Z`} fill={STONE_DK} {...ln} strokeWidth={0.9} />
      ))}
    </g>
  );
}

const DIAGRAMS: Record<ArchEra["id"], (p: { isZh: boolean }) => React.ReactElement> = {
  longhouse: Longhouse,
  island: IslandHouse,
  town: TownStreet,
  stone: StoneChurch
};

/* ============================== LEFT PAGE ============================== */

export function ArchLeftPage({ language, era, onEraChange, onSpot }: SharedProps) {
  const isZh = language === "zh";
  const f = fonts(isZh);
  const cur = ARCH_ERAS[era];

  return (
    <div className="w-full flex-1 flex flex-col h-full min-h-0 relative z-10" id="arch-overview-module">
      <div className="mb-4 pb-3 border-b border-ink/10 flex items-end justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <p className={`${f.label} text-[10px] text-ink-soft/60`}>{isZh ? "建筑变迁" : "Ars Aedificandi"}</p>
          <h3 className={`${f.title} mt-1 text-lg sm:text-xl text-ink leading-snug`}>
            {isZh ? "从长屋到石教堂" : "From Longhouse to Stone Church"}
          </h3>
        </div>
        <span className="shrink-0 font-display text-[10px] tracking-[0.2em] text-oxblood/80">800–1066</span>
      </div>

      {/* Stage stepper */}
      <div className="shrink-0 relative grid grid-cols-4 gap-1" role="tablist" data-no-swipe>
        <span className="absolute left-[12.5%] right-[12.5%] top-[17px] h-px bg-gilt/45" />
        {ARCH_ERAS.map((e, i) => {
          const sel = i === era;
          return (
            <button
              key={e.id}
              role="tab"
              aria-selected={sel}
              onClick={() => {
                onEraChange(i);
                onSpot(null);
              }}
              className="relative flex flex-col items-center gap-1.5 pb-1 cursor-pointer group"
            >
              <span
                className="w-[34px] h-[34px] rounded-full grid place-items-center font-mono text-[14px] text-white/95 transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: e.color,
                  opacity: sel || i < era ? 1 : 0.5,
                  boxShadow: `0 0 0 ${sel ? 2 : 1}px ${sel ? "rgba(227,208,166,0.95)" : "rgba(184,149,95,0.5)"}, 0 3px 6px rgba(0,0,0,0.2)`
                }}
              >
                {e.rune}
              </span>
              <span className={`font-display text-[9.5px] tracking-[0.06em] leading-none whitespace-nowrap transition-colors ${sel ? "text-oxblood" : "text-ink-soft/60"}`}>
                {e.years}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-ink/10 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 select-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block font-display text-[10.5px] tracking-[0.18em]" style={{ color: cur.color }}>
              {isZh ? "阶段" : "Stage"} {["I", "II", "III", "IV"][era]} · {cur.years}
            </span>
            <h4 className={`${f.title} mt-1 text-[1.25rem] sm:text-[1.4rem] text-ink leading-snug`}>{cur.title[language]}</h4>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {cur.points.map((p, i) => (
                <span key={i} className={`inline-flex items-center h-6 px-2.5 rounded-full text-[11.5px] bg-white/45 ring-1 ring-gilt/35 text-ink/80 ${isZh ? "font-zh-serif" : "font-serif"}`}>
                  {p[language]}
                </span>
              ))}
            </div>

            <p className={`mt-3 font-serif text-[14px] text-ink/90 text-justify ${isZh ? "leading-[1.9]" : "leading-relaxed"}`}>
              {cur.text[language]}
            </p>

            <p className="mt-3 pl-3 border-l-2 border-gilt/50 font-serif italic text-[12px] leading-relaxed text-ink-soft/80">
              <span className={`not-italic mr-1 text-ink-soft ${isZh ? "font-zh-serif" : "font-display text-[10px] tracking-[0.14em] uppercase"}`}>
                {isZh ? "考古与遗存" : "Evidence"}
              </span>
              {cur.evidence[language]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================== RIGHT PAGE ============================== */

export function ArchDiagramPanel({ language, era, onEraChange, spot, onSpot }: SharedProps) {
  const isZh = language === "zh";
  const f = fonts(isZh);
  const cur = ARCH_ERAS[era];
  const Diagram = DIAGRAMS[cur.id];
  const sel = spot != null ? cur.spots.find((s) => s.n === spot) ?? null : null;

  const detailRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (spot == null || window.innerWidth >= 1024) return;
    requestAnimationFrame(() => detailRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  }, [spot]);

  return (
    <div className="w-full flex-1 flex flex-col h-full relative z-10 select-none">
      <div className="w-full flex items-baseline justify-between gap-3 mb-3 pb-3 border-b border-ink/10">
        <h3 className={`${f.label} text-[11px] text-ink`}>{isZh ? "建筑图解" : "Diagram"}</h3>
        <span className="font-display text-[10px] tracking-[0.16em] uppercase" style={{ color: cur.color }}>
          {["I", "II", "III", "IV"][era]} · {cur.years}
        </span>
      </div>

      {/* Stage switcher (handy on mobile, where the diagram comes first) */}
      <div className="lg:hidden mb-2.5 flex gap-1 p-1 rounded-full ring-1 ring-gilt/30 bg-white/35" data-no-swipe>
        {ARCH_ERAS.map((e, i) => (
          <button
            key={e.id}
            onClick={() => {
              onEraChange(i);
              onSpot(null);
            }}
            className={`flex-1 h-7 rounded-full text-[11px] transition-colors cursor-pointer ${isZh ? "font-zh-serif" : "font-display tracking-wider"} ${
              i === era ? "text-white" : "text-ink-soft/70"
            }`}
            style={i === era ? { backgroundColor: e.color } : undefined}
          >
            {e.rune} {["I", "II", "III", "IV"][i]}
          </button>
        ))}
      </div>

      {/* Diagram */}
      <div className="relative rounded-xl bg-white/40 ring-1 ring-gilt/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] overflow-hidden" data-no-swipe>
        <AnimatePresence mode="wait">
          <motion.svg
            key={cur.id}
            viewBox={`0 0 ${ARCH_W} ${ARCH_H}`}
            className="w-full h-auto block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="group"
            aria-label={cur.diagram[language]}
          >
            <Diagram isZh={isZh} />
            {cur.spots.map((s) => {
              const on = s.n === spot;
              return (
                <g
                  key={s.n}
                  transform={`translate(${s.x} ${s.y})`}
                  role="button"
                  tabIndex={0}
                  aria-label={s.name[language]}
                  aria-pressed={on}
                  onClick={() => onSpot(on ? null : s.n)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSpot(on ? null : s.n);
                    }
                  }}
                  className="cursor-pointer focus:outline-none group/spot"
                >
                  <circle r="14" fill="transparent" />
                  {!on && <circle r="9" fill="none" stroke="#7d1d18" strokeOpacity="0.5" className="animate-ping" style={{ transformBox: "fill-box", transformOrigin: "center", animationDuration: "2.4s" }} />}
                  <circle
                    r="7.5"
                    fill={on ? "#7d1d18" : "#fbf6ea"}
                    stroke={on ? "#e3d0a6" : "#7d1d18"}
                    strokeWidth="1.6"
                    className="transition-transform duration-200 group-hover/spot:scale-110"
                    style={{ transformBox: "fill-box", transformOrigin: "center", filter: "drop-shadow(0 1.5px 1.5px rgba(42,30,18,0.35))" }}
                  />
                  <text textAnchor="middle" dominantBaseline="central" y="0.4" fontSize="9" fontWeight="700" className="font-display pointer-events-none" fill={on ? "#fbf6ea" : "#7d1d18"}>
                    {s.n}
                  </text>
                </g>
              );
            })}
          </motion.svg>
        </AnimatePresence>
      </div>
      <p className={`mt-1.5 text-center text-[11px] text-ink-soft/70 ${isZh ? "font-zh-serif tracking-[0.1em]" : "font-serif italic"}`}>{cur.diagram[language]}</p>

      {/* Parts list */}
      <div className="mt-2.5 grid grid-cols-2 gap-x-2 gap-y-1" data-no-swipe>
        {cur.spots.map((s) => {
          const on = s.n === spot;
          return (
            <button
              key={s.n}
              onClick={() => onSpot(on ? null : s.n)}
              className={`flex items-center gap-2 h-7 pl-1 pr-2 rounded-full text-left transition-colors cursor-pointer ${on ? "bg-white/80 ring-1 ring-oxblood/45" : "hover:bg-white/50"}`}
            >
              <span className={`w-5 h-5 shrink-0 rounded-full grid place-items-center font-display text-[10px] font-bold ring-1 ${on ? "bg-oxblood text-parchment ring-oxblood" : "bg-parchment text-oxblood ring-oxblood/60"}`}>
                {s.n}
              </span>
              <span className={`truncate text-[12px] ${on ? "text-oxblood font-semibold" : "text-ink/80"} ${isZh ? "font-zh-serif" : "font-serif"}`}>{s.name[language]}</span>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div ref={detailRef} className="mt-2.5 pt-2.5 border-t border-ink/10 min-h-[84px] lg:min-h-0 lg:flex-1 relative scroll-mb-28">
        <AnimatePresence mode="wait">
          {sel ? (
            <motion.div
              key={`${cur.id}-${sel.n}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative pr-7 select-text"
            >
              <button
                onClick={() => onSpot(null)}
                className="absolute top-0 right-0 w-6 h-6 grid place-items-center rounded-full text-ink-soft/60 hover:text-oxblood hover:bg-ink/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X strokeWidth={1.5} className="w-3.5 h-3.5" />
              </button>
              <h4 className={`${isZh ? "font-zh-serif font-bold tracking-[0.06em]" : "font-serif font-semibold"} text-[15px] text-oxblood leading-snug mb-0.5`}>
                {sel.n} · {sel.name[language]}
              </h4>
              <p className={`font-serif text-[13px] text-ink/85 ${isZh ? "leading-[1.8]" : "leading-relaxed"}`}>{sel.text[language]}</p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[72px] flex items-center justify-center text-center font-serif italic text-[12px] leading-relaxed text-ink-soft/70 px-2"
            >
              {isZh ? "点击图中的编号或下方的部件名称，查看它的构造与用途。" : "Select a number on the diagram, or a part below, to see how it was built and used."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

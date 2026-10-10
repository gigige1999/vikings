/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { MAP_W, MAP_H, LAND_PATH, GRATICULE_PATH, REGION_SHAPES, project } from "../expansion_geo";
import {
  EXPANSION_ERAS,
  EXPANSION_REGIONS,
  EXPANSION_SITES,
  EXPANSION_ROUTES,
  OFF_MAP_WEST,
  SEA_LABELS,
  SiteKind
} from "../expansion_data";

export type ExpansionFocus = { kind: "region" | "site"; id: string } | null;

interface SharedProps {
  language: "en" | "zh";
  era: number;
  focus: ExpansionFocus;
  onFocus: (f: ExpansionFocus) => void;
}

const KIND_LABEL: Record<SiteKind, { en: string; zh: string }> = {
  raid: { en: "Raid", zh: "劫掠" },
  settlement: { en: "Settlement", zh: "定居 / 统治" },
  trade: { en: "Trade", zh: "商埠" }
};

const fonts = (isZh: boolean) => ({
  title: isZh ? "font-zh-serif font-bold tracking-[0.08em]" : "font-gothic",
  label: isZh ? "font-zh-serif tracking-[0.2em]" : "font-display uppercase tracking-[0.22em]"
});

// Hand-placed label anchors (map units) so crowded British Isles labels never overlap
const LABEL_POS: Record<string, { x: number; y: number; anchor: "start" | "middle" | "end" }> = {
  iceland: { x: 168, y: 210, anchor: "middle" },
  faroes: { x: 262, y: 252, anchor: "start" },
  northern_isles: { x: 314, y: 334, anchor: "start" },
  hebrides: { x: 198, y: 372, anchor: "end" },
  dublin: { x: 178, y: 474, anchor: "end" },
  isle_of_man: { x: 208, y: 436, anchor: "end" },
  danelaw: { x: 300, y: 522, anchor: "start" },
  england_cnut: { x: 184, y: 562, anchor: "end" },
  normandy: { x: 262, y: 624, anchor: "middle" }
};

const pathFrom = (pts: [number, number][]) =>
  pts.map(([lon, lat], i) => {
    const [x, y] = project(lon, lat);
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

/* ============================== LEFT PAGE ============================== */

export function ExpansionLeftPage({
  language,
  era,
  focus,
  onFocus,
  onEraChange,
  intro
}: SharedProps & { onEraChange: (i: number) => void; intro: string }) {
  const isZh = language === "zh";
  const f = fonts(isZh);

  return (
    <div className="w-full flex-1 flex flex-col h-full relative z-10" id="expansion-era-module">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-ink/10 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className={`${f.label} text-[10px] text-ink-soft/60`}>{isZh ? "维京扩张" : "Expansio Normannorum"}</p>
          <h3 className={`${f.title} mt-1 text-lg sm:text-xl text-ink leading-snug`}>
            {isZh ? "维京人的欧洲版图" : "The Viking World in Europe"}
          </h3>
        </div>
        <span className="shrink-0 font-display text-[10px] tracking-[0.2em] text-oxblood/80">790–1066</span>
      </div>

      <p className={`font-serif text-[13.5px] text-ink/80 text-justify mb-4 ${isZh ? "leading-[1.9]" : "leading-relaxed"}`}>
        {intro}
      </p>

      {/* Era selector */}
      <div className="relative flex-1 overflow-y-auto max-h-[300px] sm:max-h-[360px] lg:max-h-[400px] pr-2 min-h-[220px]">
        <div className="absolute left-[25px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gilt/45 to-transparent" />
        <div className="relative space-y-1">
          {EXPANSION_ERAS.map((e, i) => {
            const isSel = i === era;
            const isPast = i < era;
            const regions = EXPANSION_REGIONS.filter((r) => r.era === i);
            const sites = EXPANSION_SITES.filter((s) => s.era === i);
            return (
              <div key={e.id}>
                <button
                  onClick={() => {
                    onEraChange(i);
                    onFocus(null);
                  }}
                  className={`w-full flex items-center gap-3.5 text-left p-2 rounded-xl transition-colors duration-300 cursor-pointer ${
                    isSel ? "bg-white/45 ring-1 ring-gilt/35" : "hover:bg-ink/[0.03]"
                  }`}
                >
                  <span
                    className="w-8 h-8 shrink-0 rounded-full grid place-items-center font-mono text-[13px] text-white/95 transition-transform duration-300"
                    style={{
                      backgroundColor: e.color,
                      opacity: isSel || isPast ? 1 : 0.45,
                      boxShadow: `0 0 0 ${isSel ? 2 : 1}px ${isSel ? "rgba(227,208,166,0.95)" : "rgba(184,149,95,0.5)"}, 0 3px 6px rgba(0,0,0,0.2)`
                    }}
                  >
                    {e.rune}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display text-[10px] tracking-[0.18em]" style={{ color: isSel ? "var(--color-oxblood)" : e.color }}>
                      {e.range}
                    </span>
                    <span className={`block truncate font-serif text-[15px] font-semibold leading-snug ${isSel ? "text-oxblood" : isPast ? "text-ink" : "text-ink/55"}`}>
                      {e.label[language]}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isSel && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden pl-[54px] pr-1"
                    >
                      <p className={`pt-1.5 pb-2 font-serif text-[12.5px] text-ink/75 text-justify ${isZh ? "leading-[1.85]" : "leading-relaxed"}`}>
                        {e.summary[language]}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pb-2.5">
                        {regions.map((r) => {
                          const active = focus?.kind === "region" && focus.id === r.id;
                          return (
                            <button
                              key={r.id}
                              onClick={() => onFocus(active ? null : { kind: "region", id: r.id })}
                              className={`h-6 px-2.5 rounded-full text-[11px] font-serif transition-colors duration-300 cursor-pointer ring-1 ${
                                active ? "text-parchment" : "text-ink/80 hover:text-ink bg-white/40"
                              }`}
                              style={active ? { backgroundColor: e.color, ["--tw-ring-color" as string]: e.color } : { ["--tw-ring-color" as string]: `${e.color}66` }}
                            >
                              {r.name[language]}
                            </button>
                          );
                        })}
                        {sites.map((s) => {
                          const active = focus?.kind === "site" && focus.id === s.id;
                          return (
                            <button
                              key={s.id}
                              onClick={() => onFocus(active ? null : { kind: "site", id: s.id })}
                              className={`h-6 px-2.5 rounded-full text-[11px] font-serif transition-colors duration-300 cursor-pointer ${
                                active ? "bg-ink text-parchment" : "text-ink-soft hover:text-ink hover:bg-ink/5"
                              }`}
                            >
                              {s.kind === "raid" ? "✕ " : s.kind === "trade" ? "◆ " : "● "}
                              {s.name[language]} <span className="opacity-60">{s.year}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 pt-3 border-t border-ink/10 shrink-0 font-serif italic text-[11.5px] leading-relaxed text-ink-soft/70">
        {isZh
          ? "版图按时期逐层累积：选择某一时期，即显示截至该时期维京人控制或定居的全部区域，新增区域以深色突出。"
          : "Territories build up phase by phase: choosing a period shows every area held or settled up to that point, with new gains in stronger colour."}
      </p>
    </div>
  );
}

/* ============================== RIGHT PAGE ============================== */

export function ExpansionMapPanel({ language, era, focus, onFocus }: SharedProps) {
  const isZh = language === "zh";
  const f = fonts(isZh);
  const current = EXPANSION_ERAS[era];

  const regions = EXPANSION_REGIONS.filter((r) => r.era <= era).sort((a, b) => b.era - a.era);
  const routes = EXPANSION_ROUTES.filter((r) => r.era <= era);
  const sites = EXPANSION_SITES.filter((s) => s.era <= era);
  const offMap = OFF_MAP_WEST.filter((o) => o.era <= era);

  const focusRegion = focus?.kind === "region" ? EXPANSION_REGIONS.find((r) => r.id === focus.id) : undefined;
  const focusSite = focus?.kind === "site" ? EXPANSION_SITES.find((s) => s.id === focus.id) : undefined;
  const focusItem = focusRegion || focusSite;

  const halo = { paintOrder: "stroke" as const, stroke: "#f5eedc", strokeWidth: 6, strokeLinejoin: "round" as const };

  return (
    <div className="w-full flex-1 flex flex-col h-full relative z-10">
      {/* Header */}
      <div className="w-full flex items-baseline justify-between gap-3 mb-4 pb-3 border-b border-ink/10 select-none">
        <h3 className={`${f.label} text-[11px] text-ink`}>{isZh ? "扩张版图" : "Map of Expansion"}</h3>
        <span className="font-display text-[10px] tracking-[0.2em] uppercase" style={{ color: current.color }}>
          {isZh ? "截至 " : "To "}
          {current.range}
        </span>
      </div>

      {/* Map */}
      <div className="relative w-full max-w-[400px] mx-auto p-1.5 bg-[#fbf6ea] rounded-[6px] ring-1 ring-gilt/40 shadow-[0_22px_36px_-22px_rgba(42,30,18,0.7),0_2px_5px_rgba(42,30,18,0.10)]">
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="block w-full h-auto rounded-[3px] select-none"
          role="img"
          aria-label={isZh ? "维京人在欧洲的扩张地图" : "Map of Viking expansion in Europe"}
          onClick={(e) => {
            if (e.target === e.currentTarget) onFocus(null);
          }}
        >
          <defs>
            <radialGradient id="exp-sea" cx="50%" cy="45%" r="75%">
              <stop offset="0%" stopColor="#e2ddca" />
              <stop offset="100%" stopColor="#cbc5ae" />
            </radialGradient>
          </defs>

          <rect width={MAP_W} height={MAP_H} fill="url(#exp-sea)" onClick={() => onFocus(null)} />
          <path d={GRATICULE_PATH} fill="none" stroke="#6b5a45" strokeOpacity={0.16} strokeWidth={1.2} />
          <path d={LAND_PATH} fill="#f4ecd8" fillRule="evenodd" stroke="#8e724b" strokeOpacity={0.75} strokeWidth={1.1} onClick={() => onFocus(null)} />

          {SEA_LABELS.map((s) => {
            const [x, y] = project(s.lon, s.lat);
            return (
              <text key={s.id} x={x} y={y} textAnchor="middle" fontSize={isZh ? 24 : 22} fontStyle="italic" letterSpacing={isZh ? 6 : 2}
                fill="#6b5a45" fillOpacity={0.55} className="font-serif pointer-events-none">
                {s.name[language]}
              </text>
            );
          })}

          {/* Territories (older phases drawn last so they stay visible on top) */}
          {regions.map((r) => {
            const shape = REGION_SHAPES[r.id];
            const color = EXPANSION_ERAS[r.era].color;
            const isNew = r.era === era;
            const isFocus = focusRegion?.id === r.id;
            return (
              <motion.path
                key={r.id}
                d={shape.path}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
                fill={color}
                fillOpacity={isFocus ? 0.85 : isNew ? 0.68 : 0.4}
                fillRule="evenodd"
                stroke={isFocus ? "#2a2017" : color}
                strokeWidth={isFocus ? 3 : 1.4}
                strokeLinejoin="round"
                className="cursor-pointer"
                onClick={() => onFocus(isFocus ? null : { kind: "region", id: r.id })}
              >
                <title>{`${r.name[language]} · ${r.year}`}</title>
              </motion.path>
            );
          })}

          {/* Routes */}
          {routes.map((r) => {
            const color = EXPANSION_ERAS[r.era].color;
            return (
              <path key={r.id} d={pathFrom(r.points)} fill="none" stroke={color} strokeOpacity={r.era === era ? 0.95 : 0.55}
                strokeWidth={2.6} strokeDasharray="10 8" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none" />
            );
          })}

          {/* Beyond the western edge */}
          {offMap.map((o) => {
            const y = o.y;
            const [sx, sy] = project(-20.5, 63.6); // leave from Iceland's south-west coast
            const isNew = o.era === era;
            const color = EXPANSION_ERAS[o.era].color;
            return (
              <g key={o.id} className="pointer-events-none" opacity={isNew ? 1 : 0.65}>
                <path d={`M${sx.toFixed(0)} ${sy.toFixed(0)} Q ${(sx * 0.6).toFixed(0)} ${y} 22 ${y}`} fill="none" stroke={color} strokeWidth={2.6} strokeDasharray="10 8" strokeLinecap="round" />
                <path d={`M34 ${y - 9} L18 ${y} L34 ${y + 9}`} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                <text x={26} y={y + 30} fontSize={22} fontWeight={600} fill={color} style={halo} className="font-serif">
                  {o.name[language]} {o.year}
                </text>
              </g>
            );
          })}

          {/* Region labels for the selected phase */}
          {regions
            .filter((r) => r.era === era || focusRegion?.id === r.id)
            .map((r) => {
              const [lx, ly] = REGION_SHAPES[r.id].label;
              const pos = LABEL_POS[r.id] ?? { x: lx, y: ly, anchor: "middle" as const };
              return (
                <text key={`lbl-${r.id}`} x={pos.x} y={pos.y} textAnchor={pos.anchor} dominantBaseline="middle" fontSize={24} fontWeight={700}
                  fill="#2a2017" style={halo} className="font-serif pointer-events-none">
                  {r.name[language]}
                </text>
              );
            })}

          {/* Sites */}
          {sites.map((s) => {
            const [x, y] = project(s.lon, s.lat);
            const isFocus = focusSite?.id === s.id;
            const showLabel = s.era === era || isFocus;
            const color = EXPANSION_ERAS[s.era].color;
            const left = s.labelSide === "left";
            return (
              <g key={s.id} className="cursor-pointer" onClick={() => onFocus(isFocus ? null : { kind: "site", id: s.id })}>
                <circle cx={x} cy={y} r={20} fill="transparent" />
                {s.kind === "raid" ? (
                  <g stroke="#7d1d18" strokeWidth={isFocus ? 5 : 4} strokeLinecap="round">
                    <circle cx={x} cy={y} r={11} fill="#f5eedc" stroke="none" opacity={0.85} />
                    <line x1={x - 7} y1={y - 7} x2={x + 7} y2={y + 7} />
                    <line x1={x + 7} y1={y - 7} x2={x - 7} y2={y + 7} />
                  </g>
                ) : s.kind === "trade" ? (
                  <rect x={x - 8} y={y - 8} width={16} height={16} transform={`rotate(45 ${x} ${y})`} fill={color} stroke="#fbf6ea" strokeWidth={isFocus ? 4 : 3} />
                ) : (
                  <circle cx={x} cy={y} r={isFocus ? 11 : 9} fill={color} stroke="#fbf6ea" strokeWidth={3} />
                )}
                {isFocus && <circle cx={x} cy={y} r={18} fill="none" stroke="#2a2017" strokeWidth={2} />}
                {showLabel && (
                  <text x={left ? x - 16 : x + 16} y={y + 7} textAnchor={left ? "end" : "start"} fontSize={21} fontWeight={600}
                    fill="#2a2017" style={halo} className="font-serif pointer-events-none">
                    {s.name[language].replace(/（.*）| \(.*\)/, "")}
                  </text>
                )}
                <title>{`${s.name[language]} · ${s.year}`}</title>
              </g>
            );
          })}

          {/* Compass */}
          <g transform={`translate(${MAP_W - 62} 66)`} className="pointer-events-none" opacity={0.75}>
            <circle r={34} fill="#f5eedc" fillOpacity={0.7} stroke="#8e724b" strokeWidth={1.5} />
            <path d="M0 -28 L7 0 L0 28 L-7 0 Z" fill="#8e724b" fillOpacity={0.35} stroke="#6b5a45" strokeWidth={1.2} />
            <path d="M0 -28 L7 0 L-7 0 Z" fill="#7d1d18" />
            <text y={-38} textAnchor="middle" fontSize={20} fill="#6b5a45" className="font-display">N</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10.5px] text-ink-soft/80 select-none">
        {EXPANSION_ERAS.slice(0, era + 1).map((e) => (
          <span key={e.id} className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: e.color }} />
            {e.range}
          </span>
        ))}
        <span className="inline-flex items-center gap-1"><span className="text-oxblood font-bold">✕</span>{KIND_LABEL.raid[language]}</span>
        <span className="inline-flex items-center gap-1"><span>◆</span>{KIND_LABEL.trade[language]}</span>
      </div>

      {/* Detail */}
      <div className="mt-3 pt-3 border-t border-ink/10 h-[96px] relative">
        <AnimatePresence mode="wait">
          {focusItem ? (
            <motion.div
              key={focusItem.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative h-full overflow-y-auto pr-7 select-text"
            >
              <button
                onClick={() => onFocus(null)}
                className="absolute top-0 right-0 w-6 h-6 grid place-items-center rounded-full text-ink-soft/60 hover:text-oxblood hover:bg-ink/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X strokeWidth={1.5} className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-baseline gap-2 mb-0.5">
                <h4 className={`${isZh ? "font-zh-serif font-bold tracking-[0.06em]" : "font-serif font-semibold"} text-[15px] leading-snug`}
                  style={{ color: EXPANSION_ERAS[focusItem.era].color }}>
                  {focusItem.name[language]}
                </h4>
                <span className="font-display text-[10px] tracking-wider text-ink-soft/70">
                  {focusItem.year}
                  {focusSite ? ` · ${KIND_LABEL[focusSite.kind][language]}` : ""}
                </span>
              </div>
              <p className={`font-serif text-[13px] text-ink/85 ${isZh ? "leading-[1.8]" : "leading-relaxed"}`}>
                {focusItem.description[language]}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key={`era-${era}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-center font-serif italic text-[12px] leading-relaxed text-ink-soft/70 px-2"
            >
              {isZh
                ? "点击地图上的彩色领地或标记，或左侧的地名，查看该地被维京人占据的年代与经过。"
                : "Tap a coloured territory or marker on the map — or a place name on the left — to read when and how the Norse took it."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

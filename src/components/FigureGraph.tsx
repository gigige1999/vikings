/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Chronicle chapter, page 1: relationship graph of the key figures (right page)
 * and the selected figure's deeds (left page).
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FIGURES,
  FIGURE_BY_ID,
  TIES,
  FACTIONS,
  TIE_TYPES,
  BANDS,
  RAGNAR_GROUP,
  GRAPH_W,
  GRAPH_H,
  TieType
} from "../figures_data";
import { PortraitArt, Portrait } from "./FigurePortrait";

const NODE_R = 18;

type Lang = "en" | "zh";

interface SharedProps {
  language: Lang;
  focusId: string;
  onFocus: (id: string) => void;
}

const fonts = (isZh: boolean) => ({
  title: isZh ? "font-zh-serif font-bold tracking-[0.08em]" : "font-gothic",
  label: isZh ? "font-zh-serif tracking-[0.2em]" : "font-display uppercase tracking-[0.22em]"
});

const TIE_STYLE: Record<TieType, { color: string; dash?: string; width: number }> = {
  kin: { color: "#a8854f", width: 1.6 },
  marriage: { color: "#a8854f", dash: "5 3", width: 1.6 },
  conflict: { color: "#7d1d18", width: 1.6 },
  bond: { color: "#2f4a3a", dash: "1.5 3.5", width: 1.9 }
};

const tiesOf = (id: string) => TIES.filter((t) => t.a === id || t.b === id);

const TieSwatch = ({ type }: { type: TieType }) => {
  const s = TIE_STYLE[type];
  return (
    <svg width="18" height="6" viewBox="0 0 18 6" aria-hidden="true" className="shrink-0">
      <line x1="1" y1="3" x2="17" y2="3" stroke={s.color} strokeWidth={s.width} strokeDasharray={s.dash} strokeLinecap="round" />
    </svg>
  );
};

/* ============================== RIGHT PAGE ============================== */

export function FigureGraphPanel({ language, focusId, onFocus }: SharedProps) {
  const isZh = language === "zh";
  const f = fonts(isZh);
  const [hoverId, setHoverId] = React.useState<string | null>(null);
  const activeId = hoverId ?? focusId;

  const activeTies = tiesOf(activeId);
  const related = new Set<string>([activeId, ...activeTies.map((t) => (t.a === activeId ? t.b : t.a))]);
  const halo = { paintOrder: "stroke" as const, stroke: "#f6eedd", strokeWidth: 4, strokeLinejoin: "round" as const };

  return (
    <div className="w-full flex-1 flex flex-col h-full relative z-10 select-none">
      {/* Header */}
      <div className="w-full flex items-baseline justify-between gap-3 mb-4 pb-3 border-b border-ink/10">
        <h3 className={`${f.label} text-[11px] text-ink`}>{isZh ? "人物关系图谱" : "Web of Kin & War"}</h3>
        <span className="font-display text-[10px] tracking-[0.2em] uppercase text-ink-soft/55">
          {isZh ? `${FIGURES.length} 位人物` : `${FIGURES.length} figures`}
        </span>
      </div>

      {/* Graph */}
      <div className="relative w-full max-w-[360px] lg:max-w-[338px] mx-auto rounded-xl bg-white/35 ring-1 ring-gilt/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] px-1.5 py-2">
        <svg viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} className="w-full h-auto block" role="group" aria-label={isZh ? "人物关系图谱" : "Relationship graph"}>
          {/* Era bands */}
          {BANDS.map((b, i) => (
            <g key={i}>
              {i > 0 && <line x1="8" x2={GRAPH_W - 8} y1={b.y0} y2={b.y0} stroke="#b8955f" strokeOpacity="0.45" strokeDasharray="2 4" />}
              <text
                x={GRAPH_W - 8}
                y={b.y0 + 13}
                textAnchor="end"
                className={isZh ? "font-zh-serif" : "font-display"}
                fontSize={isZh ? 9.5 : 8.5}
                letterSpacing={isZh ? 1.5 : 1}
                fill="#6b5a45"
                fillOpacity="0.75"
              >
                {b.label[language]}
              </text>
            </g>
          ))}

          {/* Sons of Ragnar group outline */}
          <rect
            x={RAGNAR_GROUP.rect.x}
            y={RAGNAR_GROUP.rect.y}
            width={RAGNAR_GROUP.rect.w}
            height={RAGNAR_GROUP.rect.h}
            rx="20"
            fill="#7d1d18"
            fillOpacity={RAGNAR_GROUP.ids.includes(activeId) ? 0.07 : 0.035}
            stroke="#7d1d18"
            strokeOpacity={RAGNAR_GROUP.ids.includes(activeId) ? 0.5 : 0.25}
            strokeDasharray="3 3"
            style={{ transition: "all 300ms" }}
          />
          <text
            x={RAGNAR_GROUP.rect.x + RAGNAR_GROUP.rect.w / 2}
            y={RAGNAR_GROUP.rect.y + 22}
            textAnchor="middle"
            className={isZh ? "font-zh-serif" : "font-serif"}
            fontSize="9.5"
            fontStyle={isZh ? undefined : "italic"}
            letterSpacing={isZh ? 1.5 : 0.3}
            fill="#7d1d18"
            fillOpacity="0.8"
          >
            {RAGNAR_GROUP.label[language]}
          </text>

          {/* Ties */}
          {TIES.filter((t) => !t.hidden).map((t) => {
            const a = FIGURE_BY_ID[t.a];
            const b = FIGURE_BY_ID[t.b];
            const s = TIE_STYLE[t.type];
            const on = t.a === activeId || t.b === activeId;
            return (
              <line
                key={`${t.a}-${t.b}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={s.color}
                strokeWidth={on ? s.width + 0.6 : s.width}
                strokeDasharray={s.dash}
                strokeLinecap="round"
                strokeOpacity={on ? 0.95 : 0.22}
                style={{ transition: "stroke-opacity 300ms, stroke-width 300ms" }}
              />
            );
          })}

          {/* Nodes */}
          {FIGURES.map((p) => {
            const isActive = p.id === activeId;
            const isFocus = p.id === focusId;
            const dim = !related.has(p.id);
            return (
              <g
                key={p.id}
                transform={`translate(${p.x} ${p.y})`}
                role="button"
                tabIndex={0}
                aria-label={p.name[language]}
                aria-pressed={isFocus}
                onClick={() => onFocus(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onFocus(p.id);
                  }
                }}
                onMouseEnter={() => setHoverId(p.id)}
                onMouseLeave={() => setHoverId(null)}
                className="group/node cursor-pointer focus:outline-none"
                style={{ opacity: dim ? 0.38 : 1, transition: "opacity 300ms" }}
              >
                {/* Generous invisible hit area for touch */}
                <circle r={NODE_R + 8} fill="transparent" />
                {isFocus && <circle r={NODE_R + 4.5} fill="none" stroke="#b8955f" strokeWidth="1.5" />}
                <g
                  className="transition-transform duration-300 group-hover/node:scale-110 group-focus-visible/node:scale-110"
                  style={{ transformOrigin: "0px 0px", filter: "drop-shadow(0 2px 2.5px rgba(42,30,18,0.32))" }}
                >
                  <g transform={`scale(${NODE_R / 50})`} className="pointer-events-none">
                    <PortraitArt id={p.id} />
                  </g>
                  <circle r={NODE_R} fill="none" stroke={isActive ? "#d9b46a" : "#f6eedd"} strokeWidth={isActive ? 2.4 : 1.7} />
                </g>
                <text
                  y={NODE_R + 14}
                  textAnchor="middle"
                  className={`pointer-events-none ${isZh ? "font-zh-serif" : "font-serif"}`}
                  fontSize={isZh ? 11.5 : 12}
                  fontWeight={isActive ? 700 : 600}
                  fill={isActive ? "#7d1d18" : "#2a2017"}
                  style={halo}
                >
                  {p.short[language]}
                </text>
              </g>
            );
          })}

          {/* Labels of the active figure's ties (drawn last so they sit above nodes) */}
          {activeTies.filter((t) => !t.hidden).map((t) => {
            const a = FIGURE_BY_ID[t.a];
            const b = FIGURE_BY_ID[t.b];
            return (
              <text
                key={`lbl-${t.a}-${t.b}`}
                x={a.x + (b.x - a.x) * (t.at ?? 0.5)}
                y={a.y + (b.y - a.y) * (t.at ?? 0.5) + 3.5}
                textAnchor="middle"
                className={`pointer-events-none ${isZh ? "font-zh-serif" : "font-serif"}`}
                fontSize="9.5"
                fontWeight="600"
                fill={TIE_STYLE[t.type].color}
                style={{ ...halo, strokeWidth: 5 }}
              >
                {t.label[language]}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-col items-center gap-1.5 text-[10.5px] text-ink-soft/80">
        <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-1">
          {(Object.keys(FACTIONS) as (keyof typeof FACTIONS)[]).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: FACTIONS[k].color }} />
              {FACTIONS[k].label[language]}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-1">
          {(Object.keys(TIE_TYPES) as TieType[]).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <TieSwatch type={k} />
              {TIE_TYPES[k][language]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================== LEFT PAGE ============================== */

export function FigureLeftPage({ language, focusId, onFocus, intro }: SharedProps & { intro: string }) {
  const isZh = language === "zh";
  const f = fonts(isZh);
  const fig = FIGURE_BY_ID[focusId] ?? FIGURES[0];
  const faction = FACTIONS[fig.faction];
  const ties = tiesOf(fig.id);

  // Bring the detail card into view after a new pick (mobile: below the graph; desktop: reset its scroll)
  const cardRef = React.useRef<HTMLDivElement>(null);
  const prevFocus = React.useRef(focusId);
  React.useEffect(() => {
    if (prevFocus.current === focusId) return; // only react to a real change of selection
    prevFocus.current = focusId;
    const el = cardRef.current;
    if (!el) return;
    if (window.innerWidth >= 1024) {
      el.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.55) el.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [focusId]);

  return (
    <div className="w-full flex-1 flex flex-col h-full min-h-0 relative z-10" id="figure-graph-module">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-ink/10 flex items-end justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <p className={`${f.label} text-[10px] text-ink-soft/60`}>{isZh ? "人物谱系" : "Dramatis Personae"}</p>
          <h3 className={`${f.title} mt-1 text-lg sm:text-xl text-ink leading-snug`}>
            {isZh ? "大事记人物关系图谱" : "The Chronicle's Key Figures"}
          </h3>
        </div>
        <span className="shrink-0 font-display text-[10px] tracking-[0.2em] text-oxblood/80">865–1066</span>
      </div>

      <p className={`shrink-0 font-serif text-[13px] text-ink/75 text-justify ${isZh ? "leading-[1.85]" : "leading-relaxed"}`}>
        {intro}
      </p>

      {/* Selected figure */}
      <div ref={cardRef} className="mt-4 pt-4 border-t border-ink/10 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 scroll-mt-4 select-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={fig.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3 text-[10.5px]">
              <span className={`inline-flex items-center gap-1.5 ${isZh ? "font-zh-serif tracking-[0.12em]" : "font-display uppercase tracking-[0.16em]"}`} style={{ color: faction.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: faction.color }} />
                {faction.label[language]}
              </span>
              <span className="font-display tracking-[0.14em] text-ink-soft/70">{fig.dates[language]}</span>
            </div>

            <div className="mt-2.5 flex items-center gap-4">
              <Portrait id={fig.id} className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] shrink-0 drop-shadow-[0_6px_10px_rgba(42,30,18,0.28)]" />
              <div className="min-w-0">
                <h4 className={`${f.title} text-[1.35rem] sm:text-2xl text-ink leading-tight`}>{fig.name[language]}</h4>
                {isZh && <p className="mt-0.5 font-serif italic text-[12px] text-ink-soft/60">{fig.name.en}</p>}
                <p className={`mt-1 text-[12.5px] leading-snug text-oxblood/85 ${isZh ? "font-zh-serif tracking-[0.04em]" : "font-serif italic"}`}>{fig.role[language]}</p>
              </div>
            </div>

            <p className={`mt-3 font-serif text-[14px] text-ink/90 text-justify ${isZh ? "leading-[1.85]" : "leading-relaxed"}`}>
              {fig.summary[language]}
            </p>

            {/* Deeds */}
            <p className={`${f.label} mt-5 mb-2 text-[9.5px] text-ink-soft/60`}>{isZh ? "ᛟ 生平事迹" : "ᛟ Deeds"}</p>
            <ol className="relative space-y-2.5 before:absolute before:left-[3px] before:top-1.5 before:bottom-1.5 before:w-px before:bg-gilt/40">
              {fig.deeds.map((d, i) => (
                <li key={i} className="relative pl-4">
                  <span className="absolute left-0 top-[7px] w-[7px] h-[7px] rounded-full bg-parchment ring-1 ring-oxblood/60" />
                  <span className="block font-display text-[10.5px] tracking-[0.14em] text-oxblood">{d.year}</span>
                  <span className={`block font-serif text-[13px] text-ink/85 text-justify ${isZh ? "leading-[1.8]" : "leading-relaxed"}`}>
                    {d.text[language]}
                  </span>
                </li>
              ))}
            </ol>

            {/* Ties */}
            <p className={`${f.label} mt-5 mb-2 text-[9.5px] text-ink-soft/60`}>{isZh ? "ᛟ 人物关系" : "ᛟ Ties"}</p>
            <div className="flex flex-wrap gap-1.5" data-no-swipe>
              {ties.map((t) => {
                const other = FIGURE_BY_ID[t.a === fig.id ? t.b : t.a];
                return (
                  <button
                    key={`${t.a}-${t.b}`}
                    onClick={() => onFocus(other.id)}
                    className="group inline-flex items-center gap-1.5 h-8 pl-1 pr-3 rounded-full bg-white/45 ring-1 ring-gilt/35 hover:ring-oxblood/40 hover:bg-white/75 transition-colors cursor-pointer text-[12px]"
                  >
                    <Portrait id={other.id} className="w-6 h-6 shrink-0" />
                    <span className={`font-semibold text-ink group-hover:text-oxblood ${isZh ? "font-zh-serif" : "font-serif"}`}>{other.short[language]}</span>
                    <TieSwatch type={t.type} />
                    <span className="text-ink-soft/70">{t.label[language]}</span>
                  </button>
                );
              })}
            </div>

            {fig.note && (
              <p className="mt-4 pl-3 border-l-2 border-gilt/50 font-serif italic text-[12px] leading-relaxed text-ink-soft/80">
                <span className={`not-italic mr-1 text-ink-soft ${isZh ? "font-zh-serif" : "font-display text-[10px] tracking-[0.14em] uppercase"}`}>
                  {isZh ? "史料注" : "Source note"}
                </span>
                {fig.note[language]}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

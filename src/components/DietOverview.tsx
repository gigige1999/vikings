/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Diet chapter, page 1.
 * Left page: how eating habits changed across four periods (790–1066).
 * Right page: the common foods, hand-drawn, filtered by period.
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { DIET_ERAS, FOODS, FOOD_BY_ID, FOOD_CATS, MEALS, FoodCat } from "../diet_data";

type Lang = "en" | "zh";

interface SharedProps {
  language: Lang;
  era: number;
  onEraChange: (i: number) => void;
  food: string | null;
  onFood: (id: string | null) => void;
}

const fonts = (isZh: boolean) => ({
  title: isZh ? "font-zh-serif font-bold tracking-[0.08em]" : "font-gothic",
  label: isZh ? "font-zh-serif tracking-[0.2em]" : "font-display uppercase tracking-[0.22em]"
});

/* ------------------------------ food icons ------------------------------ */

const INK = "#2a2017";
const s = { stroke: INK, strokeWidth: 1.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

const ICONS: Record<string, React.ReactNode> = {
  barley: (
    <g>
      {[-7, 0, 7].map((dx, i) => (
        <g key={i} transform={`translate(${dx} 0) rotate(${dx * 2.2} 0 22)`}>
          <path d="M0 22 L0 -6" {...s} />
          {[-16, -11, -6, -1].map((y) => (
            <g key={y}>
              <ellipse cx="-2.6" cy={y} rx="2.4" ry="3.6" transform={`rotate(-28 -2.6 ${y})`} fill="#e2b75e" {...s} strokeWidth={1.1} />
              <ellipse cx="2.6" cy={y} rx="2.4" ry="3.6" transform={`rotate(28 2.6 ${y})`} fill="#e2b75e" {...s} strokeWidth={1.1} />
            </g>
          ))}
          <path d="M0 -19 L0 -25" {...s} strokeWidth={1} />
        </g>
      ))}
    </g>
  ),
  flatbread: (
    <g>
      <ellipse cx="0" cy="4" rx="20" ry="11" fill="#c99a55" {...s} />
      <ellipse cx="0" cy="1" rx="20" ry="11" fill="#e3bd78" {...s} />
      <circle cx="0" cy="1" r="2.4" fill="#f3ead7" {...s} strokeWidth={1.1} />
      {[[-11, -2], [-6, 5], [7, -4], [11, 4], [2, 7], [-2, -6]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.1" fill="#8a5a2a" />
      ))}
    </g>
  ),
  dairy: (
    <g>
      <path d="M-20 6 L-4 -12 L14 -2 L14 12 L-20 12 Z" fill="#f2d98a" {...s} />
      <path d="M-20 6 L-4 -12 L14 -2 L-2 8 Z" fill="#f7e6a8" {...s} />
      <path d="M-2 8 L-2 12" {...s} />
      {[[-8, 2], [3, 0], [6, 7], [-12, 9]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="1.8" ry="1.3" fill="#d9b85e" />
      ))}
      <rect x="6" y="-20" width="14" height="10" rx="2" fill="#f6e9a6" {...s} transform="rotate(8 13 -15)" />
    </g>
  ),
  skyr: (
    <g>
      <path d="M-17 -6 L17 -6 L13 17 Q0 21 -13 17 Z" fill="#a37a4c" {...s} />
      <path d="M-15 1 L15 1 M-14 9 L14 9" stroke="#6e4f2e" strokeWidth="1.1" />
      <ellipse cx="0" cy="-6" rx="17" ry="5" fill="#fbf6ea" {...s} />
      <path d="M-6 -7 Q0 -12 6 -7" fill="#fbf6ea" {...s} strokeWidth={1.1} />
      <path d="M12 -8 L22 -22" {...s} strokeWidth={2} />
      <ellipse cx="11" cy="-7" rx="3" ry="2" fill="#c9a36a" {...s} strokeWidth={1.1} />
    </g>
  ),
  beef_mutton: (
    <g>
      <path d="M-8 -16 C6 -22 20 -10 16 4 C13 14 2 18 -6 13 C-12 10 -14 2 -10 -4 C-13 -8 -12 -14 -8 -16 Z" fill="#b2493b" {...s} />
      <path d="M-4 -8 C3 -12 10 -6 9 1" fill="none" stroke="#e9a594" strokeWidth="2" strokeLinecap="round" />
      <path d="M-8 12 L-19 21" {...s} strokeWidth={4.4} stroke={INK} />
      <path d="M-8 12 L-19 21" stroke="#f3ead7" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="-20" cy="19.5" r="2.6" fill="#f3ead7" {...s} strokeWidth={1.1} />
      <circle cx="-17.5" cy="22.5" r="2.6" fill="#f3ead7" {...s} strokeWidth={1.1} />
    </g>
  ),
  pork: (
    <g>
      <ellipse cx="0" cy="3" rx="18" ry="13" fill="#e7a693" {...s} />
      <path d="M-11 -7 L-15 -17 L-5 -10" fill="#e7a693" {...s} />
      <path d="M11 -7 L15 -17 L5 -10" fill="#e7a693" {...s} />
      <ellipse cx="0" cy="7" rx="7" ry="5" fill="#d8897a" {...s} />
      <circle cx="-2.4" cy="7" r="1.2" fill={INK} />
      <circle cx="2.4" cy="7" r="1.2" fill={INK} />
      <circle cx="-7" cy="-2" r="1.5" fill={INK} />
      <circle cx="7" cy="-2" r="1.5" fill={INK} />
      <path d="M-11 13 Q-12 17 -14 18 M11 13 Q12 17 14 18" {...s} strokeWidth={1.2} fill="none" />
    </g>
  ),
  horse: (
    <g>
      <path d="M-14 20 C-14 6 -10 -6 -2 -14 L-2 -20 L3 -14 C10 -12 16 -4 18 4 C19 8 16 10 13 8 L8 4 C6 8 4 14 4 20 Z" fill="#8a6038" {...s} />
      <path d="M-2 -14 C-8 -8 -12 2 -13 12" fill="none" stroke="#3e2a1a" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="7" cy="-6" r="1.4" fill={INK} />
      <circle cx="15" cy="4" r="0.9" fill={INK} />
    </g>
  ),
  herring: (
    <g>
      <path d="M-18 0 C-10 -9 8 -9 15 0 C8 9 -10 9 -18 0 Z" fill="#a9b6bf" {...s} />
      <path d="M15 0 L23 -7 L21 0 L23 7 Z" fill="#8d9ba5" {...s} />
      <path d="M-18 0 C-10 -3 6 -3 15 0" fill="none" stroke="#e8eef2" strokeWidth="1.6" />
      <circle cx="-12" cy="-2" r="1.5" fill={INK} />
      <path d="M-7 -5 Q-5 0 -7 5" fill="none" {...s} strokeWidth={1.1} />
      <path d="M-14 12 L18 12" stroke="#b8955f" strokeWidth="1.2" strokeDasharray="1 3" strokeLinecap="round" />
    </g>
  ),
  stockfish: (
    <g>
      <path d="M-22 -18 L22 -18" {...s} strokeWidth={2.4} />
      {[-9, 9].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M0 -18 L0 -13" {...s} strokeWidth={1.1} />
          <path d="M-5 -13 L5 -13 L4 9 Q0 14 -4 9 Z" fill="#cfb68c" {...s} />
          <path d="M-4 9 L-7 19 L0 14 L7 19 L4 9" fill="#b89c6e" {...s} />
          <path d="M-2 -8 L-2 5 M2 -8 L2 5" stroke="#8a6a44" strokeWidth="0.9" />
        </g>
      ))}
    </g>
  ),
  eel: (
    <g>
      <path d="M-22 6 C-14 -10 -4 -10 0 0 C4 10 14 10 20 -4" fill="none" stroke={INK} strokeWidth="8.4" strokeLinecap="round" />
      <path d="M-22 6 C-14 -10 -4 -10 0 0 C4 10 14 10 20 -4" fill="none" stroke="#6e6a3e" strokeWidth="6" strokeLinecap="round" />
      <path d="M-20 4 C-14 -7 -5 -7 -1 1" fill="none" stroke="#a9a66a" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="18.6" cy="-3.6" r="1.1" fill="#f3ead7" />
    </g>
  ),
  pulses: (
    <g>
      <path d="M-20 -6 C-12 -16 8 -16 18 -8 C10 4 -12 6 -20 -6 Z" fill="#7d9a52" {...s} />
      {[-11, -3, 5].map((x) => (
        <circle key={x} cx={x + 2} cy="-7" r="3.6" fill="#a8c06e" {...s} strokeWidth={1.1} />
      ))}
      <path d="M18 -8 Q22 -12 22 -16" fill="none" {...s} strokeWidth={1.2} />
      {[[-8, 12], [0, 15], [8, 11]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4.8" ry="3.3" fill="#9a7444" {...s} strokeWidth={1.1} />
      ))}
    </g>
  ),
  fruit_nuts: (
    <g>
      <circle cx="-6" cy="4" r="10" fill="#b8402e" {...s} />
      <path d="M-6 -6 Q-5 -11 -3 -13" fill="none" {...s} />
      <path d="M-4 -10 C1 -15 6 -12 6 -9 C1 -8 -2 -9 -4 -10 Z" fill="#6f8a45" {...s} strokeWidth={1.1} />
      <circle cx="-9" cy="0" r="2.2" fill="#e27a64" />
      <g transform="translate(12 10)">
        <path d="M-7 -1 C-7 -9 7 -9 7 -1 L7 2 L-7 2 Z" fill="#8a5a2a" {...s} strokeWidth={1.2} />
        <ellipse cx="0" cy="5" rx="6.4" ry="6" fill="#c08a4a" {...s} strokeWidth={1.2} />
      </g>
      <circle cx="13" cy="-11" r="3.4" fill="#4d3a6e" {...s} strokeWidth={1.1} />
      <circle cx="18" cy="-8" r="3.4" fill="#4d3a6e" {...s} strokeWidth={1.1} />
    </g>
  ),
  ale: (
    <g>
      <path d="M-14 -12 L10 -12 L8 20 L-12 20 Z" fill="#a37a4c" {...s} />
      <path d="M-13.4 -2 L9.4 -2 M-12.8 10 L8.8 10" stroke={INK} strokeWidth="2.2" />
      <path d="M10 -6 C20 -6 20 12 9 12" fill="none" {...s} strokeWidth={2.6} />
      <path d="M-16 -12 C-17 -20 -8 -21 -6 -17 C-3 -22 6 -21 6 -16 C10 -19 14 -15 12 -11 L-15 -11 Z" fill="#fbf3dc" {...s} />
    </g>
  ),
  mead: (
    <g>
      <path d="M-20 -14 C-18 6 0 18 14 18 L18 12 C6 10 -6 0 -10 -14 Z" fill="#e9dcc0" {...s} />
      <path d="M-20 -14 C-17 -17 -12 -17 -10 -14 C-12 -11 -17 -11 -20 -14 Z" fill="#d6a23a" {...s} />
      <path d="M-15.5 -6 C-13 -4 -10 -4 -8.6 -6.5 M-9 6 C-6 7.5 -3 6.6 -2 4.4" fill="none" stroke="#b8955f" strokeWidth="1.8" />
      <path d="M13.4 18 L17.6 12" stroke="#b8955f" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-15 -12 Q-15 -20 -18 -22" fill="none" stroke="#d6a23a" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
    </g>
  ),
  wine: (
    <g>
      <path d="M-9 -20 L9 -20 C9 -8 6 0 2 4 L2 16 L-2 16 L-2 4 C-6 0 -9 -8 -9 -20 Z" fill="#e8eef2" fillOpacity="0.7" {...s} />
      <path d="M-8.2 -12 L8.2 -12 C7.6 -6 5 -1 2 2 L-2 2 C-5 -1 -7.6 -6 -8.2 -12 Z" fill="#7a1f3a" />
      <path d="M-6 -18 C-6 -12 -4 -6 -2 -3" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="0" cy="17" rx="7" ry="2.6" fill="#e8eef2" {...s} />
    </g>
  )
};

export function FoodIcon({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="-26 -26 52 52" className={className} aria-hidden="true">
      {ICONS[id] ?? <circle r="12" fill="#b8955f" />}
    </svg>
  );
}

/* ============================== LEFT PAGE ============================== */

export function DietLeftPage({ language, era, onEraChange, onFood }: SharedProps) {
  const isZh = language === "zh";
  const f = fonts(isZh);
  const cur = DIET_ERAS[era];

  return (
    <div className="w-full flex-1 flex flex-col h-full min-h-0 relative z-10" id="diet-overview-module">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-ink/10 flex items-end justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <p className={`${f.label} text-[10px] text-ink-soft/60`}>{isZh ? "饮食变迁" : "Mutatio Mensae"}</p>
          <h3 className={`${f.title} mt-1 text-lg sm:text-xl text-ink leading-snug`}>
            {isZh ? "饮食习惯的变迁" : "How the Table Changed"}
          </h3>
        </div>
        <span className="shrink-0 font-display text-[10px] tracking-[0.2em] text-oxblood/80">790–1066</span>
      </div>

      {/* Era stepper */}
      <div className="shrink-0 relative grid grid-cols-4 gap-1" role="tablist" data-no-swipe>
        <span className="absolute left-[12.5%] right-[12.5%] top-[17px] h-px bg-gilt/45" />
        {DIET_ERAS.map((e, i) => {
          const sel = i === era;
          return (
            <button
              key={e.id}
              role="tab"
              aria-selected={sel}
              onClick={() => {
                onEraChange(i);
                onFood(null);
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

      {/* Era content */}
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
              {isZh ? "时期" : "Period"} {["I", "II", "III", "IV"][era]} · {cur.years}
            </span>
            <h4 className={`${f.title} mt-1 text-[1.25rem] sm:text-[1.4rem] text-ink leading-snug`}>{cur.title[language]}</h4>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {cur.points.map((p, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center h-6 px-2.5 rounded-full text-[11.5px] bg-white/45 ring-1 ring-gilt/35 text-ink/80 ${isZh ? "font-zh-serif" : "font-serif"}`}
                >
                  {p[language]}
                </span>
              ))}
            </div>

            <p className={`mt-3 font-serif text-[14px] text-ink/90 text-justify ${isZh ? "leading-[1.9]" : "leading-relaxed"}`}>
              {cur.text[language]}
            </p>

            <p className="mt-3 pl-3 border-l-2 border-gilt/50 font-serif italic text-[12px] leading-relaxed text-ink-soft/80">
              <span className={`not-italic mr-1 text-ink-soft ${isZh ? "font-zh-serif" : "font-display text-[10px] tracking-[0.14em] uppercase"}`}>
                {isZh ? "考古与史料" : "Evidence"}
              </span>
              {cur.evidence[language]}
            </p>

            {era === 0 && (
              <div className="mt-4">
                <p className={`${f.label} mb-2 text-[9.5px] text-ink-soft/60`}>{isZh ? "ᛟ 一日两餐" : "ᛟ Two meals a day"}</p>
                <div className="grid grid-cols-2 divide-x divide-ink/10 border-y border-ink/10">
                  {MEALS.map((m) => (
                    <div key={m.norse} className="py-2 px-2 text-center">
                      <span className={`block text-[13px] font-semibold text-ink ${isZh ? "font-zh-serif" : "font-serif"}`}>
                        {m.name[language]} <span className="font-serif italic font-normal text-ink-soft/70">{m.norse}</span>
                      </span>
                      <span className="block mt-0.5 text-[11.5px] leading-snug text-ink-soft/75">{m.time[language]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================== RIGHT PAGE ============================== */

export function DietFoodPanel({ language, era, food, onFood }: SharedProps) {
  const isZh = language === "zh";
  const f = fonts(isZh);
  const cur = DIET_ERAS[era];
  const onTable = new Set(cur.foods);
  const sel = food ? FOOD_BY_ID[food] : null;
  const catLabel = (c: FoodCat) => FOOD_CATS.find((x) => x.id === c)!.label[language];

  const detailRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!food || window.innerWidth >= 1024) return;
    requestAnimationFrame(() => detailRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  }, [food]);

  return (
    <div className="w-full flex-1 flex flex-col h-full relative z-10 select-none">
      {/* Header */}
      <div className="w-full flex items-baseline justify-between gap-3 mb-3 pb-3 border-b border-ink/10">
        <h3 className={`${f.label} text-[11px] text-ink`}>{isZh ? "常见食物" : "Common Foods"}</h3>
        <span className="font-display text-[10px] tracking-[0.16em] uppercase" style={{ color: cur.color }}>
          {["I", "II", "III", "IV"][era]} · {cur.years} · {isZh ? `${cur.foods.length} 种` : `${cur.foods.length} foods`}
        </span>
      </div>

      {/* Food grid by category */}
      <div className="space-y-2.5" data-no-swipe>
        {FOOD_CATS.map((c) => {
          const items = FOODS.filter((x) => x.cat === c.id);
          return (
            <div key={c.id} className="flex items-start gap-2.5">
              <span className={`shrink-0 pt-[18px] text-ink-soft/65 ${isZh ? "w-9 text-[10.5px] font-zh-serif tracking-[0.12em]" : "w-[46px] text-[9px] font-display uppercase tracking-[0.04em]"}`}>
                {c.label[language]}
              </span>
              <div className="flex-1 grid grid-cols-3 gap-1.5">
                {items.map((it) => {
                  const on = onTable.has(it.id);
                  const isSel = food === it.id;
                  return (
                    <button
                      key={it.id}
                      onClick={() => onFood(isSel ? null : it.id)}
                      aria-pressed={isSel}
                      className={`relative flex flex-col items-center gap-0.5 pt-1.5 pb-1.5 rounded-xl transition-all duration-300 cursor-pointer ${
                        isSel
                          ? "bg-white/80 ring-[1.5px] ring-oxblood/55 shadow-[0_6px_14px_-8px_rgba(42,30,18,0.5)]"
                          : on
                            ? "bg-white/50 ring-1 ring-gilt/40 hover:bg-white/75"
                            : "bg-transparent ring-1 ring-ink/[0.07] opacity-45 hover:opacity-80"
                      }`}
                    >
                      <FoodIcon id={it.id} className="w-9 h-9" />
                      <span className={`text-[11.5px] leading-tight text-ink ${isZh ? "font-zh-serif" : "font-serif"} ${isSel ? "font-bold text-oxblood" : "font-semibold"}`}>
                        {it.short[language]}
                      </span>
                      {on && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cur.color }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail */}
      <div ref={detailRef} className="mt-3 pt-3 border-t border-ink/10 min-h-[112px] lg:min-h-0 lg:h-[112px] relative scroll-mb-28">
        <AnimatePresence mode="wait">
          {sel ? (
            <motion.div
              key={sel.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative h-full lg:overflow-y-auto pr-7 select-text"
            >
              <button
                onClick={() => onFood(null)}
                className="absolute top-0 right-0 w-6 h-6 grid place-items-center rounded-full text-ink-soft/60 hover:text-oxblood hover:bg-ink/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X strokeWidth={1.5} className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-baseline flex-wrap gap-x-2 mb-0.5">
                <h4 className={`${isZh ? "font-zh-serif font-bold tracking-[0.06em]" : "font-serif font-semibold"} text-[15px] text-oxblood leading-snug`}>
                  {sel.name[language]}
                </h4>
                <span className="font-serif italic text-[12px] text-ink-soft/70">{sel.norse}</span>
                <span className={`text-[10px] text-ink-soft/60 ${isZh ? "font-zh-serif tracking-[0.12em]" : "font-display uppercase tracking-[0.12em]"}`}>· {catLabel(sel.cat)}</span>
              </div>
              <p className={`font-serif text-[13px] text-ink/85 ${isZh ? "leading-[1.8]" : "leading-relaxed"}`}>{sel.text[language]}</p>
              {sel.evidence && (
                <p className="mt-1 font-serif italic text-[11.5px] leading-relaxed text-ink-soft/75">{sel.evidence[language]}</p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full min-h-[96px] flex items-center justify-center text-center font-serif italic text-[12px] leading-relaxed text-ink-soft/70 px-2"
            >
              {isZh
                ? "亮起的是这一时期餐桌上的主要食物。点击任一食物，查看它的做法与出处。"
                : "Highlighted foods were mainstays of this period. Select any food to read how it was made and eaten."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

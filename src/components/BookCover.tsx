/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

const LEATHER = "#24190f";
const GOLD = "url(#emblem-gold)";
const DISC_R = 73;
const f = (n: number) => n.toFixed(1);

/* ---------- Knotwork ring: two strands woven over / under ---------- */
const KNOT_R = 84.5;
const KNOT_AMP = 4.3;
const KNOT_N = 30;

function strand(phase: number, t0 = 0, t1 = Math.PI * 2, steps = 900) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = t0 + ((t1 - t0) * i) / steps;
    const r = KNOT_R + KNOT_AMP * Math.sin(KNOT_N * t + phase);
    pts.push(`${i ? "L" : "M"}${f(r * Math.sin(t))} ${f(-r * Math.cos(t))}`);
  }
  return pts.join("");
}
const STRAND_A = strand(0) + "Z";
const STRAND_B = strand(Math.PI) + "Z";
// Strand A re-drawn on top at every other crossing so the two strands interlace
const STRAND_A_OVER = Array.from({ length: KNOT_N }, (_, k) => {
  const tc = (2 * k * Math.PI) / KNOT_N;
  const span = (0.42 * Math.PI) / KNOT_N;
  return strand(0, tc - span, tc + span, 24);
}).join("");

function Knot({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="none" stroke={LEATHER} strokeWidth="4.6" strokeLinecap="round" />
      <path d={d} fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
    </>
  );
}

/* ---------- Bold curling waves (dark strokes on gold) ---------- */
type WaveRow = { base: number; w: number; h: number; start: number; sw: number };
const WAVE_ROWS: WaveRow[] = [
  { base: 38, w: 30, h: 11, start: -96, sw: 2.6 },
  { base: 58, w: 40, h: 16, start: -112, sw: 3.4 },
];

function wavePaths({ base: B, w, h, start }: WaveRow) {
  let edge = `M${f(start)} ${f(B)}`;
  const curls: string[] = [];
  for (let x0 = start; x0 < 110; x0 += w) {
    const X = (k: number) => f(x0 + k * w);
    const Y = (k: number) => f(B - k * h);
    edge +=
      ` C${X(0.3)} ${Y(0)} ${X(0.4)} ${Y(1)} ${X(0.62)} ${Y(1)}` +
      ` C${X(0.84)} ${Y(1)} ${X(0.92)} ${Y(0.62)} ${X(0.86)} ${Y(0.42)}` +
      ` C${X(0.9)} ${Y(0.16)} ${X(0.95)} ${Y(0)} ${X(1)} ${Y(0)}`;
    curls.push(
      `M${X(0.86)} ${Y(0.42)} C${X(0.78)} ${Y(0.16)} ${X(0.56)} ${Y(0.3)} ${X(0.6)} ${Y(0.58)}` +
        ` C${X(0.63)} ${Y(0.8)} ${X(0.8)} ${Y(0.72)} ${X(0.75)} ${Y(0.5)}`
    );
  }
  return { edge, curls: curls.join(" ") };
}
const WAVES = WAVE_ROWS.map((r) => ({ ...wavePaths(r), sw: r.sw }));

/* ---------- Ship geometry ---------- */
const SAIL = "M-36 -56 Q-3 -61 30 -56 C43 -40 44 -18 34 -2 Q-2 3 -36 -2 C-31 -20 -31 -38 -36 -56 Z";
const HULL = "M-60 2 C-40 13 38 13 56 2 C52 18 30 27 -2 27 C-32 27 -54 18 -60 2 Z";
const SHIELDS = [-32, -16, 0, 16, 32];

function Diamond({ x, y, s = 5 }: { x: number; y: number; s?: number }) {
  return <rect x={x - s / 2} y={y - s / 2} width={s} height={s} fill={GOLD} stroke={LEATHER} strokeWidth="1" transform={`rotate(45 ${x} ${y})`} />;
}

function DragonProw() {
  const neck = "M50 8 C64 2 71 -10 73 -26 C74 -36 76 -42 81 -47";
  const head =
    "M75 -44 C74 -56 80 -64 88 -67 L89 -77 L94 -67 L98 -74 L99 -65" +
    " C104 -64 108 -62 112 -58.5 L112.5 -54 L104 -53 L97 -51 L110.5 -46.5 L108.5 -42" +
    " C100 -40 90 -38 81 -36 Z";
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* Neck */}
      <path d={neck} fill="none" stroke={LEATHER} strokeWidth="13" />
      <path d={neck} fill="none" stroke={GOLD} strokeWidth="9" />
      <path d={neck} fill="none" stroke={LEATHER} strokeWidth="1.4" strokeDasharray="0.1 3.4" />
      {/* Mane spikes */}
      {[
        [69, -14],
        [70, -23],
        [71, -32],
        [73, -41],
      ].map(([x, y]) => (
        <path key={y} d={`M${x} ${y} L${x - 9} ${y - 5} L${x - 1} ${y - 7.5} Z`} fill={GOLD} stroke={LEATHER} strokeWidth="1.2" />
      ))}
      {/* Head with open jaws */}
      <path d={head} fill={GOLD} stroke={LEATHER} strokeWidth="1.9" />
      {/* Teeth */}
      <path d="M100 -52.4 L101.6 -50.2 L103.2 -52.7 L104.8 -50.4 L106.4 -52.9" fill="none" stroke={LEATHER} strokeWidth="0.9" />
      <path d="M100.5 -49.2 L102.2 -51.2 L103.8 -48.6 L105.5 -50.7 L107.2 -47.9" fill="none" stroke={LEATHER} strokeWidth="0.9" />
      {/* Eye, brow, nostril, cheek scroll */}
      <path d="M88 -62.5 C91.5 -64.5 96 -64 98.5 -61.5" fill="none" stroke={LEATHER} strokeWidth="1.4" />
      <circle cx="93.5" cy="-59.2" r="2.3" fill={LEATHER} />
      <circle cx="94.2" cy="-59.9" r="0.7" fill="#f2dcaa" />
      <circle cx="110" cy="-56.6" r="1" fill={LEATHER} />
      <path d="M80 -47 C82 -42 88 -42 89 -46.5 C89.6 -49.5 85.5 -50.2 85 -47.4" fill="none" stroke={LEATHER} strokeWidth="1.2" />
      <path d="M84 -38.5 C91 -40.5 99 -43 108 -45" fill="none" stroke={LEATHER} strokeWidth="0.9" opacity="0.8" />
    </g>
  );
}

// Medallion after the reference: knotwork ring, gold disc with fjord & gulls,
// billowing striped sail, shield row, carved dragon prow breaking the frame, curling waves
function LongshipEmblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-114 -114 228 228" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="emblem-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2dcaa" />
          <stop offset="55%" stopColor="#d6b277" />
          <stop offset="100%" stopColor="#a9824c" />
        </linearGradient>
        <radialGradient id="emblem-disc-fill" cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#f3dfb0" />
          <stop offset="70%" stopColor="#d9b67b" />
          <stop offset="100%" stopColor="#b48c55" />
        </radialGradient>
        <clipPath id="emblem-disc"><circle r={DISC_R} /></clipPath>
        <clipPath id="emblem-sail"><path d={SAIL} /></clipPath>
      </defs>

      {/* Top & bottom ornaments */}
      {[-106, 106].map((y) => (
        <g key={y}>
          <line x1="-50" y1={y} x2="-9" y2={y} stroke="#c9a66c" strokeWidth="1" />
          <line x1="9" y1={y} x2="50" y2={y} stroke="#c9a66c" strokeWidth="1" />
          <Diamond x={0} y={y} s={6} />
        </g>
      ))}

      {/* Knotwork ring */}
      <circle r="93" fill="none" stroke={GOLD} strokeWidth="1.6" />
      <circle r="76.5" fill="none" stroke={GOLD} strokeWidth="1.4" />
      <Knot d={STRAND_A} />
      <Knot d={STRAND_B} />
      <Knot d={STRAND_A_OVER} />

      {/* Gold disc */}
      <circle r={DISC_R} fill="url(#emblem-disc-fill)" />

      <g clipPath="url(#emblem-disc)">
        {/* Fjord mountains on the horizon */}
        <g fill={LEATHER}>
          <path d="M-78 20 L-70 4 L-65 9 L-55 -12 L-44 6 L-39 1 L-28 20 Z" opacity="0.9" />
          <path d="M24 20 L34 4 L40 9 L52 -14 L62 4 L67 -1 L78 20 Z" opacity="0.9" />
        </g>
        <g fill="none" stroke="#f2dcaa" strokeWidth="1" opacity="0.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-59 -4 L-55 -12 L-51 -5 M-55 -12 L-56 0" />
          <path d="M48 -6 L52 -14 L56 -6 M52 -14 L51 -2" />
        </g>
        {/* Horizon water */}
        <g stroke={LEATHER} strokeLinecap="round">
          <line x1="-80" y1="20.5" x2="80" y2="20.5" strokeWidth="1.4" />
          <line x1="-70" y1="25" x2="-40" y2="25" strokeWidth="0.9" opacity="0.6" />
          <line x1="44" y1="25" x2="72" y2="25" strokeWidth="0.9" opacity="0.6" />
        </g>
        {/* Gulls */}
        <g fill="none" stroke={LEATHER} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-58 -36 q3.5 -4 7 0 q3.5 -4 7 0" />
          <path d="M-46 -47 q3 -3.5 6 0 q3 -3.5 6 0" />
          <path d="M-36 -38 q2.5 -3 5 0 q2.5 -3 5 0" />
        </g>

        {/* Rigging */}
        <g stroke={LEATHER} strokeWidth="0.9" opacity="0.75">
          <line x1="-2" y1="-66" x2="52" y2="2" />
          <line x1="-2" y1="-66" x2="-56" y2="2" />
        </g>
        {/* Mast, pennant */}
        <rect x="-3.6" y="-68" width="3.4" height="74" fill={LEATHER} />
        <path d="M-0.5 -68 C8 -71 14 -64 25 -67 L20 -61 C12 -59 7 -65 -0.5 -62 Z" fill={LEATHER} />

        {/* Billowing striped sail */}
        <path d={SAIL} fill="url(#emblem-gold)" />
        <g clipPath="url(#emblem-sail)" fill="none" stroke={LEATHER} strokeWidth="7.5">
          {[-27, -11, 5, 21].map((x) => (
            <path key={x} d={`M${x} -62 C${x + 9} -42 ${x + 10} -20 ${x + 3} 4`} />
          ))}
        </g>
        <path d={SAIL} fill="none" stroke={LEATHER} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M-40 -57 Q-3 -63 34 -57" fill="none" stroke={LEATHER} strokeWidth="3.4" strokeLinecap="round" />

        {/* Hull & stern curl */}
        <path d={HULL} fill={LEATHER} />
        <path d="M-58 4 C-67 -4 -68 -18 -63 -26 C-58 -33 -49 -30 -51 -23 C-52 -19 -57 -20 -56 -24" fill="none" stroke={LEATHER} strokeWidth="5" strokeLinecap="round" />
        <g fill="none" stroke={GOLD} strokeLinecap="round">
          <path d="M-52 13 C-28 21 26 21 48 13" strokeWidth="1.1" />
          <path d="M-42 19 C-22 25 20 25 38 19" strokeWidth="0.8" opacity="0.7" />
        </g>

        {/* Shield row */}
        {SHIELDS.map((x) => (
          <g key={x}>
            <circle cx={x} cy="7.5" r="7.4" fill={LEATHER} stroke={GOLD} strokeWidth="1.5" />
            <circle cx={x} cy="7.5" r="4.2" fill="none" stroke={GOLD} strokeWidth="0.8" />
            <circle cx={x} cy="7.5" r="1.7" fill={GOLD} />
          </g>
        ))}

        {/* Curling waves */}
        {WAVES.map((w, i) => (
          <g key={i} fill="none" stroke={LEATHER} strokeLinecap="round" strokeLinejoin="round">
            <path d={w.edge} strokeWidth={w.sw} />
            <path d={w.curls} strokeWidth={w.sw * 0.85} />
          </g>
        ))}
        <path d="M-60 66 C-30 62 30 62 60 66" fill="none" stroke={LEATHER} strokeWidth="1.2" opacity="0.6" />
      </g>

      {/* Carved dragon prow breaking out of the ring */}
      <DragonProw />

      {/* Studs */}
      <Diamond x={0} y={-93} />
      <Diamond x={0} y={93} />
      <Diamond x={-93} y={0} />
      <Diamond x={93} y={10} />
    </svg>
  );
}

interface BookCoverProps {
  onOpen: () => void;
  language: "en" | "zh";
  onLanguageChange: (lang: "en" | "zh") => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function BookCover({ onOpen, language, onLanguageChange, theme, onToggleTheme }: BookCoverProps) {
  const isZh = language === "zh";

  return (
    <div
      id="book-cover-container"
      className="relative min-h-screen overflow-hidden bg-chrome-bg transition-colors duration-500 flex flex-col items-center justify-center gap-7 sm:gap-9 px-4 py-20"
    >
      {/* Ambient light & grain */}
      <div className="absolute inset-0 pointer-events-none app-ambient" />
      <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay app-noise" />

      {/* Top-right controls: background theme + language */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          title={theme === "dark" ? (isZh ? "切换为白色背景" : "Switch to white background") : (isZh ? "切换为深色背景" : "Switch to dark background")}
          aria-label={isZh ? "切换背景" : "Toggle background"}
          className="w-8 h-8 grid place-items-center rounded-full ring-1 ring-chrome-line/25 bg-chrome-surface backdrop-blur-md text-chrome/60 hover:text-chrome transition-colors duration-300 cursor-pointer"
        >
          {theme === "dark" ? <Sun strokeWidth={1.5} className="w-4 h-4" /> : <Moon strokeWidth={1.5} className="w-4 h-4" />}
        </button>
        <div className="flex items-center p-0.5 rounded-full ring-1 ring-chrome-line/25 bg-chrome-surface backdrop-blur-md">
          {(["en", "zh"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`h-7 px-3 rounded-full text-[11px] tracking-wider transition-colors duration-300 cursor-pointer ${
                language === lang
                  ? "bg-chrome text-chrome-bg font-semibold"
                  : "text-chrome/55 hover:text-chrome"
              }`}
            >
              {lang === "en" ? "English" : "中文"}
            </button>
          ))}
        </div>
      </div>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center pointer-events-none"
      >
        <p className={`${isZh ? "font-zh-serif tracking-[0.5em]" : "font-display tracking-[0.45em]"} uppercase text-[10px] sm:text-[11px] text-chrome-line/80`}>
          {isZh ? "交互式历史手抄本" : "Interactive Manuscript"}
        </p>
        <h1
          className={`${
            isZh ? "font-zh-serif font-bold text-4xl sm:text-[3.4rem] tracking-[0.14em]" : "font-gothic text-4xl sm:text-[3.4rem] tracking-wide"
          } mt-3 text-chrome leading-tight title-glow`}
        >
          {isZh ? "不列颠维京纪元" : "The Viking Age in Britain"}
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3 text-chrome-line/70">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-current" />
          <span className="font-display text-[10px] sm:text-[11px] tracking-[0.3em]">793 — 1066</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-current" />
        </div>
      </motion.div>

      {/* Book */}
      <motion.button
        id="leather-book-3d"
        type="button"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={onOpen}
        aria-label={isZh ? "打开手抄本" : "Open the manuscript"}
        className="group relative z-10 w-[min(360px,78vw,calc((100svh_-_300px)*0.75))] aspect-[3/4] rounded-[6px] overflow-hidden cursor-pointer book-shadow ring-1 ring-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt"
        style={{
          backgroundColor: "#24190f",
          backgroundImage:
            "radial-gradient(ellipse 80% 65% at 50% 45%, rgba(120,84,48,0.35) 0%, rgba(36,25,15,0) 70%), radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)"
        }}
      >
        {/* Leather grain */}
        <div className="absolute inset-0 bg-noise opacity-[0.07] mix-blend-overlay pointer-events-none" />

        {/* Single tooled gilt frame */}
        <div className="absolute inset-4 sm:inset-5 border border-gilt-soft/20 rounded-[2px] pointer-events-none" />

        {/* Title line at the head of the cover */}
        <div className="absolute top-11 sm:top-14 inset-x-0 flex flex-col items-center gap-3 px-8 pointer-events-none">
          <p className="font-display font-semibold text-[26px] sm:text-[30px] tracking-[0.42em] pl-[0.42em] leading-none text-center bg-gradient-to-b from-[#f0d7a2] via-[#d4b073] to-[#a8814b] bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.5)]">
            VIKINGS
          </p>
        </div>

        {/* Emblem — longship medallion */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none pt-8">
          <LongshipEmblem className="w-[84%] h-auto transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02] drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]" />
        </div>

        {/* Quiet foot line */}
        <div className="absolute bottom-9 sm:bottom-11 inset-x-0 flex items-center justify-center gap-3 text-gilt-soft/45 pointer-events-none">
          <span className="h-px w-6 bg-current" />
          <span className="font-display text-[9px] tracking-[0.45em]">DCCXCIII · MLXVI</span>
          <span className="h-px w-6 bg-current" />
        </div>

        {/* Spine shading */}
        <div className="absolute top-0 left-0 w-5 h-full bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
      </motion.button>

      {/* Hint */}
      <p
        className={`relative z-10 pointer-events-none ${
          isZh ? "font-zh-serif tracking-[0.3em] text-[12px]" : "font-display tracking-[0.3em] uppercase text-[10px]"
        } text-chrome/45 animate-pulse`}
      >
        {isZh ? "轻触封面 · 开启手卷" : "Touch the cover to open"}
      </p>
    </div>
  );
}

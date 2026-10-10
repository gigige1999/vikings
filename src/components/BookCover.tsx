/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

const LEATHER = "#24190f";
const DISC_R = 70;
const HORIZON = 26;
const SHIELD_XS = [-48, -36, -24, -12, 0, 12, 24, 36, 48];
const gunwale = (x: number) => 9 * (1 - (x / 64) ** 2);

// Longship silhouette (hull, dragon prow, curled stern, mast, sail, pennant) in a single colour
function ShipShape({ color }: { color: string }) {
  return (
    <g fill={color} stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-64 0 C-44 12 44 12 64 0 C58 18 34 27 0 27 C-34 27 -58 18 -64 0 Z" strokeWidth="1" />
      {/* Dragon prow */}
      <path d="M58 4 C69 -5 72 -23 76 -36 C79 -45 88 -48 91 -41 C92 -36 88 -34 84 -36" fill="none" strokeWidth="4.6" />
      <path d="M86 -45 L90 -54 L91 -44 Z" strokeWidth="1.2" />
      {/* Curled stern */}
      <path d="M-58 4 C-69 -5 -72 -23 -77 -34 C-81 -43 -92 -43 -93 -35 C-94 -28 -86 -26 -84 -32" fill="none" strokeWidth="4.6" />
      {/* Mast, yard, pennant */}
      <rect x="-1.6" y="-62" width="3.2" height="66" strokeWidth="0" />
      <rect x="-39" y="-58.5" width="78" height="2.6" rx="1.3" strokeWidth="0" />
      <path d="M1 -62 L13 -58.5 L1 -55 Z" strokeWidth="0.8" />
      {/* Square sail */}
      <path d="M-36 -56 L36 -56 C40 -37 40 -19 34 -2 L-34 -2 C-40 -19 -40 -37 -36 -56 Z" strokeWidth="1" />
    </g>
  );
}

type WaveRow = { base: number; w: number; h: number; start: number };

// Three rows of curling Norse scroll-waves, from far (small) to near (large)
const WAVE_ROWS: WaveRow[] = [
  { base: 42, w: 32, h: 14, start: -100 },
  { base: 58, w: 42, h: 19, start: -118 },
  { base: 80, w: 54, h: 27, start: -106 },
];

const f = (n: number) => n.toFixed(1);

function waveRowPaths({ base: B, w, h, start }: WaveRow) {
  let edge = `M${f(start)} ${f(B)}`;
  const curls: string[] = [];
  const foam: string[] = [];
  let x0 = start;
  for (; x0 < 112; x0 += w) {
    const X = (k: number) => f(x0 + k * w);
    const Y = (k: number) => f(B - k * h);
    edge +=
      ` C${X(0.3)} ${Y(0)} ${X(0.4)} ${Y(1)} ${X(0.62)} ${Y(1)}` +
      ` C${X(0.84)} ${Y(1)} ${X(0.92)} ${Y(0.62)} ${X(0.86)} ${Y(0.42)}` +
      ` C${X(0.9)} ${Y(0.16)} ${X(0.95)} ${Y(0)} ${X(1)} ${Y(0)}`;
    // Spiral curl tucked under the breaking lip
    curls.push(
      `M${X(0.86)} ${Y(0.42)} C${X(0.78)} ${Y(0.18)} ${X(0.58)} ${Y(0.3)} ${X(0.62)} ${Y(0.56)}` +
        ` C${X(0.65)} ${Y(0.76)} ${X(0.81)} ${Y(0.7)} ${X(0.76)} ${Y(0.5)}`
    );
    // Wind-combed lines on the back of the wave
    foam.push(`M${X(0.08)} ${Y(0.05)} C${X(0.28)} ${Y(0.1)} ${X(0.36)} ${Y(0.6)} ${X(0.52)} ${Y(0.8)}`);
    foam.push(`M${X(0.2)} ${Y(-0.02)} C${X(0.36)} ${Y(0.02)} ${X(0.44)} ${Y(0.38)} ${X(0.56)} ${Y(0.52)}`);
  }
  const fill = `${edge} L${f(x0)} 120 L${f(start)} 120 Z`;
  return { edge, fill, curls: curls.join(" "), foam: foam.join(" ") };
}

const WAVES = WAVE_ROWS.map(waveRowPaths);

// Braided cable ring (two interlaced sinusoids) — a classic Norse border
function braid(r: number, amp: number, n: number, phase: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 720; i++) {
    const t = (i / 720) * Math.PI * 2;
    const rr = r + amp * Math.sin(n * t + phase);
    pts.push(`${i ? "L" : "M"}${f(rr * Math.sin(t))} ${f(-rr * Math.cos(t))}`);
  }
  return pts.join("") + "Z";
}
const BRAID_A = braid(81, 2.6, 36, 0);
const BRAID_B = braid(81, 2.6, 36, Math.PI);

function Waves({ fill, line, only }: { fill?: string; line: string; only?: number[] }) {
  return (
    <>
      {WAVES.map((w, i) =>
        only && !only.includes(i) ? null : (
          <g key={i}>
            {fill && <path d={w.fill} fill={fill} />}
            <path d={w.edge} fill="none" stroke={line} strokeWidth={1.4 + i * 0.45} strokeLinecap="round" strokeLinejoin="round" />
            <path d={w.curls} fill="none" stroke={line} strokeWidth={1.2 + i * 0.4} strokeLinecap="round" />
            <path d={w.foam} fill="none" stroke={line} strokeWidth={0.75 + i * 0.2} strokeLinecap="round" opacity="0.7" />
          </g>
        )
      )}
    </>
  );
}

// Gilt emblem: a setting sun, a longship riding great scroll-waves, Odin's two ravens
function LongshipEmblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-110 -100 220 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="emblem-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d7a2" />
          <stop offset="55%" stopColor="#d4b073" />
          <stop offset="100%" stopColor="#a8814b" />
        </linearGradient>
        <clipPath id="emblem-disc"><circle r={DISC_R} /></clipPath>
        <clipPath id="emblem-sail"><path d="M-36 -56 L36 -56 C40 -37 40 -19 34 -2 L-34 -2 C-40 -19 -40 -37 -36 -56 Z" /></clipPath>
        <mask id="emblem-outside">
          <rect x="-120" y="-120" width="240" height="240" fill="#fff" />
          <circle r={DISC_R} fill="#000" />
        </mask>
        {/* Where the near waves spill over the bottom of the frame */}
        <mask id="emblem-spill">
          <circle r="90" fill="#fff" />
          <circle r={DISC_R} fill="#000" />
          <rect x="-120" y="-120" width="240" height="176" fill="#000" />
          <rect x="-120" y="-120" width="58" height="240" fill="#000" />
          <rect x="62" y="-120" width="58" height="240" fill="#000" />
        </mask>
      </defs>

      {/* Braided Norse border */}
      <circle r="88" fill="none" stroke="url(#emblem-gold)" strokeWidth="0.8" opacity="0.55" />
      <g fill="none" stroke="url(#emblem-gold)" strokeWidth="1" opacity="0.7">
        <path d={BRAID_A} />
        <path d={BRAID_B} />
      </g>
      <circle r="75" fill="none" stroke="url(#emblem-gold)" strokeWidth="0.6" opacity="0.45" />

      {/* Sun disc */}
      <circle r={DISC_R} fill="url(#emblem-gold)" />

      <g clipPath="url(#emblem-disc)">
        {/* Horizon */}
        <rect x="-80" y={HORIZON} width="160" height="1.2" fill={LEATHER} opacity="0.8" />
        <rect x="-80" y={HORIZON + 5} width="160" height="0.8" fill={LEATHER} opacity="0.45" />

        {/* Oars dipping into the sea */}
        <g stroke={LEATHER} strokeWidth="1.8" strokeLinecap="round">
          {[-42, -26, -10, 6, 22, 38].map((x) => (
            <line key={x} x1={x + 4} y1="16" x2={x - 7} y2="40" />
          ))}
        </g>

        <ShipShape color={LEATHER} />

        {/* Gold details cut into the silhouette */}
        <g clipPath="url(#emblem-sail)" fill="url(#emblem-gold)">
          {[-27, -9, 9, 27].map((x) => (
            <rect key={x} x={x - 4.5} y="-58" width="9" height="58" opacity="0.9" />
          ))}
        </g>
        <path d="M-60 16 C-30 25 30 25 60 16" fill="none" stroke="url(#emblem-gold)" strokeWidth="0.9" opacity="0.7" />
        {SHIELD_XS.map((x) => (
          <g key={x}>
            <circle cx={x} cy={gunwale(x) + 0.5} r="4.6" fill={LEATHER} stroke="url(#emblem-gold)" strokeWidth="1.3" />
            <circle cx={x} cy={gunwale(x) + 0.5} r="1.3" fill="url(#emblem-gold)" />
          </g>
        ))}

        {/* Huginn & Muninn */}
        <g fill="none" stroke={LEATHER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-60 -30 q4 -5 8 0 q4 -5 8 0" />
          <path d="M-47 -43 q3 -4 6.5 0 q3 -4 6.5 0" />
        </g>

        {/* Great scroll-waves in front of the hull */}
        <Waves fill={LEATHER} line="url(#emblem-gold)" />
      </g>

      {/* Prow & stern break out of the sun — inverted to gold */}
      <g mask="url(#emblem-outside)">
        <ShipShape color="#d9bb84" />
      </g>

      {/* Rim of the sun, then the near waves' gilt lines crash over the bottom of the frame */}
      <circle r={DISC_R} fill="none" stroke="url(#emblem-gold)" strokeWidth="1.4" />
      <g mask="url(#emblem-spill)">
        <path d={WAVES[2].fill} fill={LEATHER} />
        <Waves line="url(#emblem-gold)" only={[2]} />
      </g>

      {/* Studs on the border */}
      {[0, 90, 270].map((a) => (
        <rect key={a} x="-2.8" y="-2.8" width="5.6" height="5.6" fill="url(#emblem-gold)" transform={`rotate(${a}) translate(0 -88) rotate(45)`} />
      ))}
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
          <div className="flex items-center gap-2 text-gilt-soft/50">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-current" />
            <span className="w-1.5 h-1.5 rotate-45 bg-current" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-current" />
          </div>
        </div>

        {/* Emblem — a longship crossing the setting sun */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none pt-6">
          <LongshipEmblem className="w-[80%] h-auto transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02] drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]" />
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

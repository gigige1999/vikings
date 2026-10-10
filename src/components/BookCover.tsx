/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

// Gunwale curve shared by the hull, shields and oars
const gunwaleY = (x: number) => 113 + 7 * (1 - ((x - 120) / 76) ** 2);
const SHIELD_XS = [62, 76, 90, 104, 118, 132, 146, 160, 174];

// Gilt line-art drakkar: dragon prow, spiral stern, striped sail, shield row and oars over stylised waves
function Longship({ className = "" }: { className?: string }) {
  const sail = "M78 30 L162 30 C167 58 166 84 160 104 L80 104 C74 84 73 58 78 30 Z";
  return (
    <svg viewBox="0 0 240 200" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <clipPath id="sail-clip"><path d={sail} /></clipPath>
      </defs>

      {/* Sun disc behind the sail */}
      <circle cx="120" cy="72" r="66" strokeWidth="0.8" opacity="0.3" />
      <circle cx="120" cy="72" r="58" strokeWidth="0.6" opacity="0.18" strokeDasharray="2 4" />

      {/* Rigging */}
      <g strokeWidth="0.9" opacity="0.6">
        <line x1="120" y1="14" x2="198" y2="100" />
        <line x1="120" y1="14" x2="42" y2="102" />
      </g>

      {/* Mast, yard and pennant */}
      <line x1="120" y1="12" x2="120" y2="118" strokeWidth="2.4" />
      <line x1="74" y1="29" x2="166" y2="29" strokeWidth="2.4" />
      <path d="M120 12 L134 16 L120 20" strokeWidth="1.4" />

      {/* Striped square sail */}
      <g clipPath="url(#sail-clip)">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={80 + i * 21} y="28" width="10.5" height="80" fill="currentColor" stroke="none" opacity="0.32" />
        ))}
      </g>
      <path d={sail} strokeWidth="2" />
      <path d="M80 67 C100 71 140 71 160 67" strokeWidth="0.8" opacity="0.5" />

      {/* Oars */}
      <g strokeWidth="1.3" opacity="0.8">
        {SHIELD_XS.filter((_, i) => i % 2 === 0).map((x) => (
          <line key={x} x1={x + 6} y1={gunwaleY(x) + 8} x2={x - 6} y2={154} />
        ))}
      </g>

      {/* Hull, strakes, dragon prow and spiral stern */}
      <path
        d="M36 80 C33 102 42 120 62 128 C92 140 148 140 178 128 C198 120 207 102 204 78 C192 104 156 114 120 114 C84 114 48 104 36 80 Z"
        fill="#24190f"
        stroke="none"
      />
      <path d="M36 80 C33 102 42 120 62 128 C92 140 148 140 178 128 C198 120 207 102 204 78" strokeWidth="2.4" />
      <path d="M204 78 C192 104 156 114 120 114 C84 114 48 104 36 80" strokeWidth="1.6" />
      <path d="M48 114 C82 126 158 126 192 114" strokeWidth="1.4" opacity="0.8" />
      <path d="M58 124 C90 134 150 134 182 124" strokeWidth="1" opacity="0.55" />
      <path d="M204 78 C203 62 210 48 221 45 C230 43 234 51 228 55 L222 56" strokeWidth="2.4" />
      <path d="M222 45 L226 38 L224 46" strokeWidth="1.4" />
      <circle cx="224.5" cy="49.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M36 80 C34 63 26 53 18 55 C11 57 11 67 18 67 C23 67 24 61 20 60" strokeWidth="2.4" />

      {/* Shield row */}
      {SHIELD_XS.map((x, i) => {
        const y = gunwaleY(x);
        return (
          <g key={x}>
            <circle cx={x} cy={y} r="6.2" fill="#24190f" strokeWidth="1.6" />
            <path d={i % 2 ? `M${x - 6} ${y} H${x + 6}` : `M${x} ${y - 6} V${y + 6}`} strokeWidth="0.8" opacity="0.6" />
            <circle cx={x} cy={y} r="1.5" fill="currentColor" stroke="none" />
          </g>
        );
      })}

      {/* Waves */}
      <g strokeWidth="1.2">
        <path d="M14 150 q12 -7 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" opacity="0.75" />
        <path d="M26 162 q12 -6 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" opacity="0.45" />
        <path d="M44 173 q12 -5 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" opacity="0.25" />
      </g>
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
        <div className="absolute top-10 sm:top-12 inset-x-0 flex flex-col items-center gap-2.5 px-10 pointer-events-none">
          <p className={`${isZh ? "font-zh-serif font-semibold text-[17px] sm:text-[19px] tracking-[0.42em] pl-[0.42em]" : "font-gothic text-[21px] sm:text-[23px] tracking-wide"} text-[#d9bb84] text-center leading-none`}>
            {isZh ? "海上来的北方人" : "Se Norþmenn"}
          </p>
          <div className="flex items-center gap-2 text-gilt-soft/45">
            <span className="h-px w-8 bg-current" />
            <span className="font-display text-[8.5px] tracking-[0.5em] pl-[0.5em]">{isZh ? "SE NORÞMENN" : "THE NORTHMEN"}</span>
            <span className="h-px w-8 bg-current" />
          </div>
        </div>

        {/* Longship — the emblem of the sea-raiders */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none pt-4">
          <Longship className="w-[84%] h-auto text-[#cfae74] transition-transform duration-[1400ms] ease-out group-hover:-translate-y-1 drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]" />
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

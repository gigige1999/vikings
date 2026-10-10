/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

const ELDER_FUTHARK = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ";

// Gilt-tooled Vegvísir: eight staves radiating from a centre, ringed by the Elder Futhark
function Vegvisir({ className = "" }: { className?: string }) {
  const ends = [
    // crossbars
    <g key="a"><line x1="0" y1="-14" x2="0" y2="-70" /><line x1="-8" y1="-56" x2="8" y2="-56" /><line x1="-8" y1="-65" x2="8" y2="-65" /></g>,
    // trident
    <g key="b"><line x1="0" y1="-14" x2="0" y2="-72" /><path d="M-9 -72 V-60 H9 V-72" /></g>,
    // ring
    <g key="c"><line x1="0" y1="-14" x2="0" y2="-62" /><circle cx="0" cy="-68" r="5.5" /></g>,
    // arrow
    <g key="d"><line x1="0" y1="-14" x2="0" y2="-70" /><path d="M-8 -62 L0 -72 L8 -62" /><line x1="-5" y1="-46" x2="5" y2="-46" /></g>,
  ];
  return (
    <svg viewBox="-100 -100 200 200" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <path id="futhark-ring" d="M0,-86 A86,86 0 1,1 -0.01,-86" />
      </defs>
      <circle r="94" strokeWidth="1.2" opacity="0.8" />
      <circle r="79" strokeWidth="0.8" opacity="0.55" />
      <text fill="currentColor" stroke="none" fontSize="9.2" letterSpacing="2.2" opacity="0.75" style={{ fontFamily: "'Apple Symbols','Segoe UI Historic','Noto Sans Runic',serif" }}>
        <textPath href="#futhark-ring" startOffset="0" textLength="528" lengthAdjust="spacing">{ELDER_FUTHARK}</textPath>
      </text>
      <g strokeWidth="2.6">
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 45})`}>{ends[i % 4]}</g>
        ))}
      </g>
      <circle r="9" strokeWidth="2.2" />
      <circle r="2.6" fill="currentColor" stroke="none" />
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

        {/* Vegvísir — the Norse wayfinder */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <Vegvisir className="w-[62%] h-auto text-[#cfae74] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]" />
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

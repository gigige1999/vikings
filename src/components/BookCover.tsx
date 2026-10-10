/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

interface BookCoverProps {
  onOpen: () => void;
  coverImage: string;
  language: "en" | "zh";
  onLanguageChange: (lang: "en" | "zh") => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function BookCover({ onOpen, coverImage, language, onLanguageChange, theme, onToggleTheme }: BookCoverProps) {
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
        className="group relative z-10 w-[min(380px,80vw,calc((100svh_-_300px)*0.75))] aspect-[3/4] rounded-[6px] overflow-hidden bg-stone-900 cursor-pointer book-shadow ring-1 ring-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt"
      >
        <img
          src={coverImage}
          alt="Leather Book Cover"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/45 pointer-events-none" />

        {/* Tooled gilt frame */}
        <div className="absolute inset-3 sm:inset-4 border border-gilt-soft/25 pointer-events-none" />
        <div className="absolute inset-[18px] sm:inset-[22px] border border-gilt-soft/10 pointer-events-none" />

        {/* Embossed content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-12 sm:py-14 px-8 pointer-events-none">
          <div className="text-center">
            <span className="font-display text-[10px] tracking-[0.5em] text-gilt-soft/70">CHRONICVLVM</span>
            <div className="mt-2 h-px w-14 mx-auto bg-gilt-soft/30" />
          </div>

          <div className="font-mono text-[11px] tracking-[0.6em] text-gilt-soft/45 select-none">ᚠᚢᚦᚨᚱᚲ</div>

          <div className="text-center">
            <p className={`${isZh ? "font-zh-serif text-lg tracking-[0.35em]" : "font-gothic text-xl tracking-wider"} text-gilt-soft/90`}>
              {isZh ? "北欧人编年史" : "Se Norþmenn"}
            </p>
            <p className="mt-1.5 font-display text-[9px] tracking-[0.4em] text-gilt-soft/45">ANNO DOMINI</p>
          </div>
        </div>

        {/* Spine shading */}
        <div className="absolute top-0 left-0 w-5 h-full bg-gradient-to-r from-black/70 via-black/25 to-transparent pointer-events-none" />
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

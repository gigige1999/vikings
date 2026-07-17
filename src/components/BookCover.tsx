/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen, ShieldAlert, Compass } from "lucide-react";

interface BookCoverProps {
  onOpen: () => void;
  coverImage: string;
  language: "en" | "zh";
  onLanguageChange: (lang: "en" | "zh") => void;
}

export default function BookCover({ onOpen, coverImage, language, onLanguageChange }: BookCoverProps) {
  const isZh = language === "zh";

  return (
    <div id="book-cover-container" className="flex items-center justify-center min-h-screen bg-neutral-900 overflow-hidden relative p-4">
      {/* Dynamic dust / ember particle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,30,10,0.4)_0%,rgba(10,5,2,0.9)_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-noise pointer-events-none" />

      {/* Top right language toggle */}
      <div className="absolute top-4 right-4 z-20 flex bg-black/45 p-1 rounded-xl border border-neutral-800 backdrop-blur-sm shadow-md">
        <button
          onClick={() => onLanguageChange("en")}
          className={`px-3 py-1 text-xs font-sans rounded-lg transition-all cursor-pointer ${
            language === "en"
              ? "bg-[#8b0000] text-white font-bold"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          English
        </button>
        <button
          onClick={() => onLanguageChange("zh")}
          className={`px-3 py-1 text-xs font-sans rounded-lg transition-all cursor-pointer ${
            language === "zh"
              ? "bg-[#8b0000] text-white font-bold"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          中文
        </button>
      </div>

      {/* Medieval Title Card floating slightly */}
      <div className="absolute top-10 sm:top-16 text-center pointer-events-none z-10 px-4">
        <h2 className={`${isZh ? "font-zh-retro text-neutral-400 tracking-[0.25em]" : "font-display text-neutral-500 tracking-[0.3em]"} uppercase text-[10px] sm:text-xs mb-1.5 sm:mb-2`}>
          {isZh ? "交互式历史手抄本" : "Interactive Manuscript"}
        </h2>
        <h1 className={`${isZh ? "font-zh-serif font-black text-4xl sm:text-6xl tracking-[0.08em]" : "font-gothic text-3xl sm:text-5xl tracking-wider"} text-[#dbbe8b] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
          {isZh ? "不列颠维京纪元" : "The Viking Age in Britain"}
        </h1>
        <p className={`${isZh ? "font-zh-retro text-neutral-400 text-xs sm:text-sm tracking-widest mt-2" : "font-serif italic text-neutral-400 text-xs sm:text-sm mt-1"}`}>
          {isZh ? "彩绘数字编年史 • 公元 793 – 1066 年" : "An Illuminated Digital Chronicle • 793 – 1066 AD"}
        </p>
      </div>

      {/* 3D-like Book Canvas */}
      <motion.div
        id="leather-book-3d"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={onOpen}
        className="relative w-full max-w-[480px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] bg-stone-900 group cursor-pointer hover:shadow-[0_45px_120px_rgba(139,0,0,0.35)] transition-shadow"
      >
        {/* Leather texture generated image background */}
        <img
          src={coverImage}
          alt="Leather Book Cover"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Dark gold foil/vignette shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

        {/* Embossed Ornate Center Stamp */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-16 px-8 z-10 pointer-events-none">
          <div className="text-center">
            <span className="text-[10px] tracking-[0.4em] font-mono text-[#a37f4c]/70 block mb-1">CHRONICULUM</span>
            <div className="h-[2px] w-20 bg-[#a37f4c]/40 mx-auto" />
          </div>

          {/* Clean ornament with absolutely no button-like platter or border */}
          <div className="flex flex-col items-center justify-center py-6">
            <Compass className="w-12 h-12 text-[#a37f4c]/70 animate-[spin_120s_linear_infinite]" />
            <span className={`${isZh ? "font-zh-retro tracking-[0.2em] text-[10px]" : "font-mono tracking-[0.3em] text-[9px] uppercase"} text-[#a37f4c]/65 mt-2`}>
              {isZh ? "不列颠" : "BRITANNIA"}
            </span>
          </div>

          <div className="text-center">
            <p className={`${isZh ? "font-zh-brush text-2xl text-[#dbbe8b]/90 tracking-widest" : "font-gothic text-lg text-[#dbbe8b]/80 tracking-widest"}`}>
              {isZh ? "编年史 • 北欧人" : "Englisce • Se Norþmenn"}
            </p>
            <p className="text-[10px] text-neutral-400 font-serif mt-1">Anno Domini Milleximo</p>
          </div>
        </div>

        {/* Vintage spine simulation on the left */}
        <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </motion.div>

      {/* Guide label at bottom */}
      <div className="absolute bottom-6 text-center pointer-events-none">
        <span className={`${isZh ? "font-zh-retro text-xs text-[#dbbe8b]/65 tracking-widest" : "font-mono text-[10px] tracking-widest uppercase"} animate-pulse`}>
          {isZh ? "点击封面任意位置，开启尘封的历史手卷。" : "Click anywhere on the cover to open the dusty history scroll."}
        </span>
      </div>
    </div>
  );
}

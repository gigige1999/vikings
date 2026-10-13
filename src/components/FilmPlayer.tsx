/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, ArrowLeft, Loader2 } from "lucide-react";

// Remember where the reader stopped, for this browser session
let resumeAt = 0;

// Chapter marks (seconds) matching the scene cuts of the film
const CHAPTERS: { t: number; year?: string; zh: string; en: string }[] = [
  { t: 0, zh: "开篇 · 维京时代", en: "Opening · The Viking Age" },
  { t: 5, zh: "北方人", en: "The Northmen" },
  { t: 19.5, zh: "扩张的足迹", en: "Footprints of Expansion" },
  { t: 38.5, year: "793", zh: "圣岛大劫掠", en: "The Raid on Lindisfarne" },
  { t: 43, year: "865", zh: "异教徒大军", en: "The Great Heathen Army" },
  { t: 47.5, year: "878", zh: "爱丁顿大捷", en: "Victory at Edington" },
  { t: 52, year: "927", zh: "英格兰的诞生", en: "The Birth of England" },
  { t: 57, year: "954", zh: "约克维京王国终结", en: "End of Viking York" },
  { t: 61.5, year: "991", zh: "丹麦金", en: "Danegeld" },
  { t: 66.5, year: "1013", zh: "丹麦王征服英格兰", en: "Sweyn Conquers England" },
  { t: 71.5, year: "1016", zh: "北海帝国", en: "The North Sea Empire" },
  { t: 76, year: "1042", zh: "王朝复辟", en: "The House of Wessex Restored" },
  { t: 80.5, zh: "王冠的血脉", en: "Bloodlines of the Crown" },
  { t: 100, year: "1066", zh: "斯坦福桥战役", en: "Stamford Bridge" },
  { t: 104.5, year: "1066", zh: "黑斯廷斯战役", en: "Hastings" },
  { t: 109.5, zh: "尾声 · 诺曼人即北方人", en: "Epilogue · Normans were Northmen" },
];
const chapterAt = (s: number) => {
  let i = 0;
  for (let k = 0; k < CHAPTERS.length; k++) if (s >= CHAPTERS[k].t - 0.05) i = k;
  return i;
};

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

interface FilmPlayerProps {
  src: string;
  poster: string;
  language: "en" | "zh";
  onClose: () => void;
}

export default function FilmPlayer({ src, poster, language, onClose }: FilmPlayerProps) {
  const isZh = language === "zh";
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | undefined>(undefined);

  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(resumeAt);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const v = () => videoRef.current;

  const play = useCallback(() => {
    const el = v();
    if (!el) return;
    if (el.ended) el.currentTime = 0;
    el.play().catch(() => setPlaying(false));
  }, []);
  const pause = useCallback(() => v()?.pause(), []);
  const toggle = useCallback(() => {
    const el = v();
    if (!el) return;
    el.paused || el.ended ? play() : pause();
  }, [play, pause]);

  const seekBy = useCallback((d: number) => {
    const el = v();
    if (!el || !isFinite(el.duration)) return;
    el.currentTime = Math.min(Math.max(0, el.currentTime + d), el.duration - 0.05);
    setFlash(d > 0 ? `+${d}s` : `${d}s`);
  }, []);

  const toggleMute = useCallback(() => {
    const el = v();
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }, []);

  const toggleFull = useCallback(() => {
    const stage = stageRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    const el = v() as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    const doc = document as Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void };
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      (document.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
      return;
    }
    if (stage?.requestFullscreen) stage.requestFullscreen().catch(() => {});
    else if (stage?.webkitRequestFullscreen) stage.webkitRequestFullscreen();
    else el?.webkitEnterFullscreen?.(); // iOS Safari
  }, []);

  // Start playing as soon as the panel opens (opened by a click, so sound is allowed)
  useEffect(() => {
    const el = v();
    if (!el) return;
    const start = () => {
      if (resumeAt > 0 && resumeAt < el.duration - 1) el.currentTime = resumeAt;
      play();
    };
    if (el.readyState >= 1) start();
    else el.addEventListener("loadedmetadata", start, { once: true });
    return () => {
      resumeAt = el.ended ? 0 : el.currentTime;
      el.pause();
    };
  }, [play]);

  // Fullscreen state
  useEffect(() => {
    const onFs = () => setIsFull(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      document.removeEventListener("webkitfullscreenchange", onFs);
    };
  }, []);

  // Keyboard shortcuts while the film is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const k = e.key.toLowerCase();
      if (k === " " || k === "k") { e.preventDefault(); toggle(); }
      else if (k === "arrowright") { e.preventDefault(); seekBy(5); }
      else if (k === "arrowleft") { e.preventDefault(); seekBy(-5); }
      else if (k === "m") toggleMute();
      else if (k === "f") toggleFull();
      else if (k === "escape" && !document.fullscreenElement) onClose();
      else return;
      wake();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, seekBy, toggleMute, toggleFull, onClose]);

  // Auto-hide controls while playing
  const wake = useCallback(() => {
    setChromeVisible(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setChromeVisible(false);
    }, 2600);
  }, []);
  useEffect(() => () => window.clearTimeout(hideTimer.current), []);
  useEffect(() => {
    if (!playing) setChromeVisible(true);
    else wake();
  }, [playing, wake]);

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 650);
    return () => window.clearTimeout(id);
  }, [flash]);

  // Progress-bar scrubbing (mouse & touch)
  const ratioAt = (clientX: number) => {
    const r = barRef.current?.getBoundingClientRect();
    if (!r) return 0;
    return Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  };
  const onBarDown = (e: React.PointerEvent) => {
    const el = v();
    if (!el || !duration) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setScrubbing(true);
    const t = ratioAt(e.clientX) * duration;
    el.currentTime = t;
    setTime(t);
  };
  const onBarMove = (e: React.PointerEvent) => {
    const r = barRef.current?.getBoundingClientRect();
    if (r) setHoverX(Math.min(r.width, Math.max(0, e.clientX - r.left)));
    if (!scrubbing) return;
    const el = v();
    if (!el) return;
    const t = ratioAt(e.clientX) * duration;
    el.currentTime = t;
    setTime(t);
  };
  const onBarUp = () => setScrubbing(false);

  const seekTo = (t: number) => {
    const el = v();
    if (!el) return;
    el.currentTime = t;
    setTime(t);
    if (el.paused) play();
    wake();
  };
  const currentChapter = chapterAt(time);
  const chapterListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = chapterListRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-ch="${currentChapter}"]`);
    if (list && item) {
      const top = item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2;
      list.scrollTo({ top, behavior: "smooth" });
    }
  }, [currentChapter]);

  const pct = duration ? (time / duration) * 100 : 0;
  const bufPct = duration ? (buffered / duration) * 100 : 0;
  const hoverTime = hoverX !== null && barRef.current ? (hoverX / barRef.current.clientWidth) * duration : 0;
  const showChrome = chromeVisible || !playing || scrubbing;

  const labelFont = isZh ? "font-zh-serif tracking-[0.2em]" : "font-display uppercase tracking-[0.22em]";
  const iconBtn = "w-8 h-8 grid place-items-center rounded-full text-[#f5eedc]/85 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e3d0a6]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-30 right-page-immersive p-6 sm:p-8 md:p-10 lg:p-11 flex flex-col"
      role="dialog"
      aria-label={isZh ? "纪录短片播放器" : "Documentary player"}
    >
      <div className="absolute inset-2.5 sm:inset-3.5 rounded-[10px] border border-gilt/25 pointer-events-none" />

      {/* Header */}
      <div className="relative w-full flex items-center justify-between gap-3 mb-5 pb-3 border-b border-ink/10 select-none">
        <button
          onClick={onClose}
          className="group inline-flex items-center gap-1.5 h-8 pl-2 pr-3 -ml-2 rounded-full text-[12px] text-ink-soft hover:text-ink hover:bg-ink/5 transition-colors cursor-pointer"
        >
          <ArrowLeft strokeWidth={1.5} className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          {isZh ? "返回纪事" : "Back to chronicle"}
        </button>
        <span className={`${labelFont} text-[10px] text-ink-soft/60`}>{isZh ? "纪录短片" : "Documentary"}</span>
      </div>

      <div className="relative text-center mb-4">
        <h4 className={`${isZh ? "font-zh-serif font-bold tracking-[0.08em]" : "font-gothic"} text-lg sm:text-xl text-ink leading-snug`}>
          {isZh ? "维京时代 · 793 – 1066" : "The Viking Age · 793 – 1066"}
        </h4>
        <p className="mt-1 font-display text-[10px] tracking-[0.2em] text-ink-soft/60">
          {duration ? fmt(duration) : "2:00"} · {isZh ? "从林迪斯法恩到斯坦福桥" : "From Lindisfarne to Stamford Bridge"}
        </p>
      </div>

      {/* Player in a gallery mat */}
      <div className="relative w-full p-1.5 bg-[#fbf6ea] rounded-[6px] ring-1 ring-gilt/40 shadow-[0_22px_36px_-22px_rgba(42,30,18,0.7),0_2px_5px_rgba(42,30,18,0.10)]">
        <div
          ref={stageRef}
          onMouseMove={wake}
          onTouchStart={wake}
          onMouseLeave={() => playing && setChromeVisible(false)}
          className={`relative w-full aspect-video rounded-[3px] overflow-hidden bg-black ring-1 ring-black/10 select-none ${isFull ? "rounded-none" : ""} ${showChrome ? "" : "cursor-none"}`}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload="metadata"
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
            onClick={toggle}
            onDoubleClick={toggleFull}
            onPlay={() => { setPlaying(true); setStarted(true); setEnded(false); }}
            onPause={() => setPlaying(false)}
            onEnded={() => { setPlaying(false); setEnded(true); resumeAt = 0; }}
            onWaiting={() => setWaiting(true)}
            onCanPlay={() => setWaiting(false)}
            onPlaying={() => setWaiting(false)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onTimeUpdate={(e) => !scrubbing && setTime(e.currentTarget.currentTime)}
            onProgress={(e) => {
              const b = e.currentTarget.buffered;
              if (b.length) setBuffered(b.end(b.length - 1));
            }}
          />

          {/* Centre: big play / replay / buffering */}
          {waiting && playing && (
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <Loader2 className="w-9 h-9 text-[#f5eedc]/90 animate-spin" strokeWidth={1.5} />
            </div>
          )}
          {!playing && !waiting && (
            <button
              onClick={toggle}
              aria-label={ended ? (isZh ? "重新播放" : "Replay") : isZh ? "播放" : "Play"}
              className="absolute inset-0 grid place-items-center bg-black/25 hover:bg-black/15 transition-colors cursor-pointer group/play"
            >
              <span className="flex flex-col items-center gap-2.5">
                <span className="w-12 h-12 sm:w-[68px] sm:h-[68px] rounded-full grid place-items-center bg-[#f5eedc]/95 text-[#2a2017] shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-4 ring-white/15 transition-transform duration-300 group-hover/play:scale-105">
                  {ended ? <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} /> : <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1" fill="currentColor" strokeWidth={0} />}
                </span>
                <span className="hidden sm:block text-[12px] tracking-wider text-[#f5eedc] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {ended
                    ? isZh ? "重新播放" : "Replay"
                    : started || time > 1
                      ? `${isZh ? "继续播放" : "Resume"} · ${fmt(time)}`
                      : isZh ? "播放短片" : "Play film"}
                </span>
              </span>
            </button>
          )}

          {/* Seek flash */}
          {flash && (
            <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none">
              <span className="px-3 h-8 grid place-items-center rounded-full bg-black/55 text-[#f5eedc] text-[12px] font-display tracking-wider">{flash}</span>
            </div>
          )}

          {/* Control bar */}
          <div
            className={`absolute inset-x-0 bottom-0 px-2.5 sm:px-3 pb-1.5 pt-8 bg-gradient-to-t from-black/75 via-black/35 to-transparent transition-opacity duration-300 ${
              showChrome ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Progress */}
            <div
              ref={barRef}
              onPointerDown={onBarDown}
              onPointerMove={onBarMove}
              onPointerUp={onBarUp}
              onPointerLeave={() => !scrubbing && setHoverX(null)}
              role="slider"
              aria-label={isZh ? "播放进度" : "Seek"}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(time)}
              className="group/bar relative h-4 flex items-center cursor-pointer touch-none"
            >
              <div className="relative w-full h-[3px] group-hover/bar:h-[5px] transition-[height] rounded-full bg-white/25 overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-white/35" style={{ width: `${bufPct}%` }} />
                <div className="absolute inset-y-0 left-0 bg-[#d9bb84]" style={{ width: `${pct}%` }} />
                {duration > 0 &&
                  CHAPTERS.slice(1).map((c) => (
                    <span key={c.t} className="absolute inset-y-0 w-[2px] -ml-px bg-black/60" style={{ left: `${(c.t / duration) * 100}%` }} />
                  ))}
              </div>
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#f5eedc] shadow transition-transform ${scrubbing ? "scale-110" : "scale-0 group-hover/bar:scale-100"}`}
                style={{ left: `${pct}%` }}
              />
              {hoverX !== null && duration > 0 && (
                <div
                  className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded bg-black/85 text-[10px] text-[#f5eedc] whitespace-nowrap pointer-events-none"
                  style={{ left: Math.min(Math.max(hoverX, 60), (barRef.current?.clientWidth ?? 120) - 60) }}
                >
                  <span className="font-display tracking-wider">{fmt(hoverTime)}</span>
                  <span className="ml-1.5 opacity-80">{CHAPTERS[chapterAt(hoverTime)][language]}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5">
                <button onClick={toggle} className={iconBtn} aria-label={playing ? (isZh ? "暂停" : "Pause") : isZh ? "播放" : "Play"}>
                  {playing ? <Pause className="w-4 h-4" fill="currentColor" strokeWidth={0} /> : <Play className="w-4 h-4 ml-0.5" fill="currentColor" strokeWidth={0} />}
                </button>
                <button onClick={toggleMute} className={iconBtn} aria-label={muted ? (isZh ? "取消静音" : "Unmute") : isZh ? "静音" : "Mute"}>
                  {muted ? <VolumeX className="w-4 h-4" strokeWidth={1.75} /> : <Volume2 className="w-4 h-4" strokeWidth={1.75} />}
                </button>
                <span className="ml-1.5 font-display text-[11px] tracking-wider text-[#f5eedc]/85 tabular-nums shrink-0">
                  {fmt(time)} <span className="text-[#f5eedc]/45">/ {fmt(duration)}</span>
                </span>
                <span className="ml-2 hidden sm:inline truncate max-w-[150px] text-[11px] text-[#f5eedc]/70">
                  · {CHAPTERS[currentChapter][language]}
                </span>
              </div>
              <button onClick={toggleFull} className={iconBtn} aria-label={isFull ? (isZh ? "退出全屏" : "Exit full screen") : isZh ? "全屏" : "Full screen"}>
                {isFull ? <Minimize className="w-4 h-4" strokeWidth={1.75} /> : <Maximize className="w-4 h-4" strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="relative mt-4 flex items-baseline justify-between">
        <span className={`${labelFont} text-[9px] text-ink-soft/60`}>{isZh ? "ᛟ 章节" : "ᛟ Chapters"}</span>
        <span className="font-display text-[9px] tracking-[0.15em] text-ink-soft/50">
          {currentChapter + 1} / {CHAPTERS.length}
        </span>
      </div>
      <div ref={chapterListRef} className="relative mt-2 flex-1 min-h-0 max-h-[210px] overflow-y-auto pr-1.5 -mr-1.5 py-1 [mask-image:linear-gradient(to_bottom,transparent,#000_14px,#000_calc(100%-14px),transparent)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5">
          {CHAPTERS.map((c, i) => {
            const active = i === currentChapter;
            const done = i < currentChapter;
            return (
              <button
                key={c.t}
                data-ch={i}
                onClick={(e) => { seekTo(c.t + 0.05); if (e.detail > 0) e.currentTarget.blur(); }}
                className={`group/ch flex items-baseline gap-2 text-left px-2 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood/40 ${
                  active ? "bg-white/60 ring-1 ring-gilt/45" : "hover:bg-ink/[0.04]"
                }`}
              >
                <span className={`shrink-0 w-9 font-display text-[10px] tracking-wider tabular-nums ${active ? "text-oxblood" : "text-ink-soft/55"}`}>
                  {fmt(c.t)}
                </span>
                <span className={`flex-1 min-w-0 truncate font-serif text-[12.5px] leading-snug ${active ? "text-oxblood font-semibold" : done ? "text-ink/55" : "text-ink/80 group-hover/ch:text-ink"}`}>
                  {c.year && <span className="font-display text-[10px] tracking-wider mr-1.5 opacity-80">{c.year}</span>}
                  {c[language]}
                </span>
                {active && playing && (
                  <span className="shrink-0 flex items-end gap-[2px] h-2.5" aria-hidden="true">
                    {[0, 1, 2].map((b) => (
                      <span key={b} className="w-[2px] bg-oxblood rounded-full origin-bottom animate-[eq_0.9s_ease-in-out_infinite]" style={{ animationDelay: `${b * 0.15}s`, height: "100%" }} />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <p className="relative pt-3 text-center font-display text-[10px] tracking-[0.12em] text-ink-soft/55 hidden sm:block">
        {isZh ? "空格 播放/暂停 · ← → 快退/快进 5 秒 · M 静音 · F 全屏 · Esc 返回" : "Space play/pause · ← → seek 5s · M mute · F full screen · Esc back"}
      </p>
    </motion.div>
  );
}

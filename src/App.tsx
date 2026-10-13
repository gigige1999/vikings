/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CHAPTERS_DATA } from "./data";
import { CHAPTERS_DATA_ZH } from "./data_zh";
import { TIMELINE_ERAS, TimelineEvent, EraNode } from "./timeline_data";
import { Chapter, Hotspot } from "./types";
import BookCover from "./components/BookCover";
import { ExpansionLeftPage, ExpansionMapPanel, ExpansionFocus } from "./components/ExpansionMap";
import FilmPlayer from "./components/FilmPlayer";
import { EXPANSION_ERAS } from "./expansion_data";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Compass,
  Volume2,
  VolumeX,
  X,
  BookMarked,
  Sun,
  Moon,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { playParchmentTurnSound } from "./utils/sound";
import { asset } from "./utils/asset";

// Hotspot keyword trigger maps (mapping text phrases to Hotspot IDs for easy lookup)
const KEYWORD_MAPS: { [key: string]: string } = {
  "lindisfarne": "lindisfarne",
  "great heathen army": "heathen_army",
  "alfred the great": "alfred_great",
  "danelaw": "danelaw",
  "mead": "mead",
  "querns": "quern_stones",
  "skálar": "cauldron",
  "garlic": "wild_garlic",
  "longhouse": "longhouse",
  "wattle-and-daub": "wattle_daub",
  "wattle and daub": "wattle_daub",
  "stone crosses": "stone_crosses",
  "hearth-fire": "hearth_center",
  "mjölnir": "mjolnir",
  "cross": "celtic_cross",
  "molds": "dual_molds",
  "baptism": "guthrum_baptism",
  "shield wall": "shield_wall",
  "dane axe": "dane_axe",
  "broadaxe": "dane_axe",
  "sword": "pattern_welded_sword",
  "byrnie": "byrnie",
  "chainmail": "byrnie",
  
  // Chinese keyword triggers
  "林迪斯法恩": "lindisfarne",
  "林迪斯法恩圣岛": "lindisfarne",
  "异教徒大军": "heathen_army",
  "阿尔弗雷德大帝": "alfred_great",
  "阿尔弗雷德": "alfred_great",
  "丹麦法区": "danelaw",
  "蜜酒": "mead",
  "麦芽酒": "mead",
  "石磨盘": "quern_stones",
  "石磨": "quern_stones",
  "大铁锅": "cauldron",
  "大锅": "cauldron",
  "野大蒜": "wild_garlic",
  "野草药": "wild_garlic",
  "长屋": "longhouse",
  "草皮长屋": "longhouse",
  "篱笆和泥": "wattle_daub",
  "编藤抹泥": "wattle_daub",
  "石十字架": "stone_crosses",
  "十字架": "stone_crosses",
  "火坑": "hearth_center",
  "中央火坑": "hearth_center",
  "妙尔尼尔": "mjolnir",
  "雷神之锤": "mjolnir",
  "双重模具": "dual_molds",
  "皂石铸模": "dual_molds",
  "受洗": "guthrum_baptism",
  "王室受洗": "guthrum_baptism",
  "盾墙": "shield_wall",
  "战斧": "dane_axe",
  "丹麦战斧": "dane_axe",
  "丹麦大斧": "dane_axe",
  "折叠钢剑": "pattern_welded_sword",
  "花纹折叠钢剑": "pattern_welded_sword",
  "锁子甲": "byrnie"
};

const UI_TRANSLATIONS = {
  en: {
    bookCover: "Book Cover",
    askScribe: "Ask Scriptorium AI",
    resetIllustrations: "Reset Illustrations",
    prevFolio: "Previous Folio",
    nextFolio: "Next Folio",
    folioLabel: "Folio",
    chapterMeta: "Capitulum",
    chronicleLabel: "The Chronicle",
    interactiveLabel: "Interactive",
    configureLabel: "Configure",
    translateTitle: "Alchemist's Chronicle Prose Translator",
    modernProse: "Modern Prose",
    oldEnglish: "Old English Verse",
    skaldicKenning: "Skaldic Kenning Poetry",
    monasticChronicle: "10th C. Monastic Chronicle",
    translatingText: "Quill translates text into ancient tongue...",
    translationError: "The scribe failed to write down the poetry. Restore normal records or retry.",
    legendPlaceholder: "Click highlighted phrases in the saga text or tap crosshair markers on the painting above to consult the monastery scroll legends.",
    timelineHeader: "Kingship Timeline",
    sovereignSub: "* Tap an era node to reveal years and specific events. Click any year entry to reveal its detailed royal portrait and historical outcome.",
    timelineNodeTitle: "Kingship & Viking Era Chronicle",
    closeScroll: "Close Scroll",
    saxonKing: "Anglo-Saxon Monarch",
    vikingKing: "Viking King / Leader",
    timelineEraTitle: "Era of Major Events",
    viewDetails: "View Details",
    resetAlert: "Prism of Time has reset! All right-hand illustrations restored to default."
  },
  zh: {
    bookCover: "返回封面",
    askScribe: "咨询修道院 AI",
    resetIllustrations: "重置所有插图",
    prevFolio: "上一页",
    nextFolio: "下一页",
    folioLabel: "纸草页",
    chapterMeta: "第",
    chronicleLabel: "篇章",
    interactiveLabel: "交互式",
    configureLabel: "配置插图",
    translateTitle: "炼金术士的编年史散文翻译器",
    modernProse: "现代散文",
    oldEnglish: "古英语诗歌",
    skaldicKenning: "斯卡尔迪克肯宁诗 (吟游)",
    monasticChronicle: "10世纪修道院编年体",
    translatingText: "羽毛笔正在将文字转译为古老语言...",
    translationError: "书记官未能记录下这首诗。请恢复正常记录或重试。",
    legendPlaceholder: "点击编年史正文中的高亮短语，或点击上方绘画中的十字准星标记，即可查阅修道院羊皮纸手卷说明。",
    timelineHeader: "英格兰君王与维京纪元大事记",
    sovereignSub: "* 轻触下方时代节点，展开各年代次级子轨，点击年份条目可查阅血统、英非割据、克努特帝国及北欧霸业终结的详实图文历史。",
    timelineNodeTitle: "君王与维京纪元大事记",
    closeScroll: "收起卷轴",
    saxonKing: "盎格鲁-撒克逊君王",
    vikingKing: "维京君王与首领",
    timelineEraTitle: "重大时代节点",
    viewDetails: "查阅详情",
    resetAlert: "时光棱镜已重置！所有插图均已恢复为默认设置。"
  }
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

// Hairline divider with a runic centrepiece
const RuneDivider = ({ className = "", rune = "ᛟ" }: { className?: string; rune?: string }) => (
  <div className={`flex items-center gap-3 text-gilt ${className}`}>
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gilt/50" />
    <span className="font-mono text-[10px] leading-none opacity-80">{rune}</span>
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gilt/50" />
  </div>
);

// Single tooled hairline frame inside each page
const PageFrame = () => (
  <div className="absolute inset-2.5 sm:inset-3.5 rounded-[10px] border border-gilt/25 pointer-events-none" />
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDirectory, setShowDirectory] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [pageDirection, setPageDirection] = useState<"next" | "prev">("next");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  
  // Language and Timeline States
  const [language, setLanguage] = useState<"en" | "zh">("zh"); // Default to Chinese as requested "整个中文版本支持切换"
  const [activeEraNode, setActiveEraNode] = useState<string | null>("raid");
  const [hoveredEraNode, setHoveredEraNode] = useState<string | null>(null);
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<TimelineEvent | null>(TIMELINE_ERAS[0].subTrack[0]);

  // Expansion map state (defaults to the full extent by 1066)
  const [expansionEra, setExpansionEra] = useState(EXPANSION_ERAS.length - 1);
  const [expansionFocus, setExpansionFocus] = useState<ExpansionFocus>(null);

  // Milestones documentary film
  const [isFilmOpen, setIsFilmOpen] = useState(false);

  // Translation States
  const [translationStyle, setTranslationStyle] = useState<"modern" | "old-english" | "skaldic-verse" | "chronicle">("modern");
  const [translatedText, setTranslatedText] = useState<{ [key: string]: string }>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Reading-room theme: dark leather (default) or clean white
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    localStorage.getItem("viking_theme") === "light" ? "light" : "dark"
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("viking_theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Sound Effect State
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("viking_sound_enabled");
    return saved !== null ? saved === "true" : true;
  });

  const triggerPageTurnSound = () => {
    if (isSoundEnabled) {
      playParchmentTurnSound();
    }
  };

  // Mobile auto-page turn state with real-time countdown progress
  const [showAutoTurnHint, setShowAutoTurnHint] = useState(false);
  const [autoTurnProgress, setAutoTurnProgress] = useState(100);

  // All illustrations and hotspots are hard-coded in the data files
  const chaptersList = language === "en" ? CHAPTERS_DATA : CHAPTERS_DATA_ZH;

  // Keyboard navigation for turning pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFilmOpen) return; // arrows seek the film instead of turning pages
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapterIndex, activePageIndex, chaptersList, showDirectory, isSoundEnabled, isFilmOpen]);

  // Close the film whenever the reader leaves the page
  useEffect(() => {
    setIsFilmOpen(false);
  }, [activeChapterIndex, activePageIndex, showDirectory, isOpen]);

  const activeChapter = chaptersList[activeChapterIndex];
  const activePageIndexNormalized = Math.min(activePageIndex, activeChapter.pages.length - 1);
  const activePage = activeChapter.pages[activePageIndexNormalized];
  const activeImage = asset(activePage.image);
  const activeHotspots = activePage.hotspots;

  // Typography helpers: Gothic blackletter for Latin, refined Song serif for Chinese
  const isZh = language === "zh";
  const titleFont = isZh ? "font-zh-serif font-bold tracking-[0.08em]" : "font-gothic";
  const labelFont = isZh ? "font-zh-serif tracking-[0.2em]" : "font-display uppercase tracking-[0.22em]";
  const shortLabels = isZh
    ? ["里程碑", "大事记", "饮食篇", "古建筑", "旧信仰", "兵戈志"]
    : ["Milestones", "Chronicle", "Diet", "Settlement", "Faith", "Wars"];

  // Preload neighbouring page illustrations so page turns never flash an empty frame
  useEffect(() => {
    const resolveImage = (chIdx: number, pIdx: number) => {
      const ch = chaptersList[chIdx];
      const p = ch?.pages[pIdx];
      if (!ch || !p) return null;
      return p.image;
    };
    const candidates = [
      resolveImage(activeChapterIndex, activePageIndex + 1),
      resolveImage(activeChapterIndex + 1, 0),
      resolveImage(activeChapterIndex, activePageIndex - 1),
    ];
    if (activePageIndex === 0 && activeChapterIndex > 0) {
      const prevCh = chaptersList[activeChapterIndex - 1];
      candidates.push(resolveImage(activeChapterIndex - 1, prevCh.pages.length - 1));
    }
    candidates.forEach((src) => {
      if (src) {
        const img = new Image();
        img.decoding = "async";
        img.src = asset(src);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChapterIndex, activePageIndex, language]);

  // Combine static KEYWORD_MAPS with the hotspot names hard-coded in the data files for highlighters
  const dynamicKeywordMaps = React.useMemo(() => {
    const maps = { ...KEYWORD_MAPS };
    [...CHAPTERS_DATA, ...CHAPTERS_DATA_ZH].forEach((ch) => {
      ch.pages.forEach((p) => {
        p.hotspots.forEach((h) => {
          if (h.id && h.name) {
            maps[h.name.toLowerCase()] = h.id;
          }
        });
      });
    });
    return maps;
  }, []);

  // Throttle page turns so rapid clicks / held arrow keys don't queue up janky animations
  const turnLockRef = React.useRef(0);
  const acquireTurnLock = () => {
    const now = performance.now();
    if (now - turnLockRef.current < 320) return false;
    turnLockRef.current = now;
    return true;
  };

  // Switch chapters/pages
  const handleNextPage = () => {
    if (!acquireTurnLock()) return;
    if (showDirectory) {
      setPageDirection("next");
      setShowDirectory(false);
      setActiveChapterIndex(0);
      setActivePageIndex(0);
      setSelectedHotspot(null);
      setTranslationStyle("modern");
      triggerPageTurnSound();
      return;
    }
    const currentChapter = chaptersList[activeChapterIndex];
    if (activePageIndex < currentChapter.pages.length - 1) {
      setPageDirection("next");
      setActivePageIndex((prev) => prev + 1);
      setSelectedHotspot(null);
      setTranslationStyle("modern");
      triggerPageTurnSound();
    } else if (activeChapterIndex < chaptersList.length - 1) {
      setPageDirection("next");
      setActiveChapterIndex((prev) => prev + 1);
      setActivePageIndex(0);
      setSelectedHotspot(null);
      setTranslationStyle("modern");
      triggerPageTurnSound();
    }
  };

  const handlePrevPage = () => {
    if (showDirectory) {
      return; // Already at the first page (directory)
    }
    if (!acquireTurnLock()) return;
    if (activePageIndex > 0) {
      setPageDirection("prev");
      setActivePageIndex((prev) => prev - 1);
      setSelectedHotspot(null);
      setTranslationStyle("modern");
      triggerPageTurnSound();
    } else if (activeChapterIndex > 0) {
      setPageDirection("prev");
      const prevChapter = chaptersList[activeChapterIndex - 1];
      setActiveChapterIndex((prev) => prev - 1);
      setActivePageIndex(prevChapter.pages.length - 1);
      setSelectedHotspot(null);
      setTranslationStyle("modern");
      triggerPageTurnSound();
    } else if (activeChapterIndex === 0 && activePageIndex === 0) {
      // Turn back to the global directory page
      setPageDirection("prev");
      setShowDirectory(true);
      setSelectedHotspot(null);
      setTranslationStyle("modern");
      triggerPageTurnSound();
    }
  };

  const selectChapter = (idx: number) => {
    setShowDirectory(false);
    if (idx === activeChapterIndex) return;
    setPageDirection(idx > activeChapterIndex ? "next" : "prev");
    setActiveChapterIndex(idx);
    setActivePageIndex(0);
    setSelectedHotspot(null);
    setTranslationStyle("modern");
    triggerPageTurnSound();
  };

  const handleJumpToPage = (chapterIdx: number, pageIdx: number) => {
    setPageDirection(chapterIdx > activeChapterIndex || (chapterIdx === activeChapterIndex && pageIdx > activePageIndex) ? "next" : "prev");
    setActiveChapterIndex(chapterIdx);
    setActivePageIndex(pageIdx);
    setShowDirectory(false);
    setSelectedHotspot(null);
    setTranslationStyle("modern");
    triggerPageTurnSound();
  };

  // Mobile scroll-to-bottom auto-page turner listener
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;
    let isTransitioning = false;

    const handleScroll = () => {
      // Only active on mobile/tablet viewports where pages stack vertically (width < 1024)
      if (window.innerWidth >= 1024 || isFilmOpen) {
        setShowAutoTurnHint(false);
        return;
      }

      // Check window scroll position
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      
      // Allow some tolerance (e.g. 25px from bottom)
      const reachedBottom = scrollPosition >= totalHeight - 25;

      if (reachedBottom && !isTransitioning) {
        // Double-check if there's actually a next page to turn to
        const currentChapter = chaptersList[activeChapterIndex];
        const hasNext = activePageIndex < currentChapter.pages.length - 1 || activeChapterIndex < chaptersList.length - 1;
        
        if (hasNext) {
          setShowAutoTurnHint(true);
          
          // Let's reset progress and animate down to 0 over 1.5 seconds
          setAutoTurnProgress(100);
          const duration = 1500;
          const step = 50; // update every 50ms
          let elapsed = 0;

          clearInterval(intervalId);
          intervalId = setInterval(() => {
            elapsed += step;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            setAutoTurnProgress(remaining);
            if (elapsed >= duration) {
              clearInterval(intervalId);
            }
          }, step);

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            isTransitioning = true;
            handleNextPage();
            // Scroll back to top smoothly for the new chapter/page
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setShowAutoTurnHint(false);
              isTransitioning = false;
            }, 100);
          }, duration);
        }
      } else {
        setShowAutoTurnHint(false);
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [activeChapterIndex, activePageIndex, chaptersList, handleNextPage, isFilmOpen]);

  // Ask Gemini to translate the chapter's paragraphs dynamically
  const handleTranslatePage = async (style: "old-english" | "skaldic-verse" | "chronicle") => {
    if (isTranslating) return;
    setTranslationStyle(style);

    const cacheKey = `${activeChapter.id}-${style}`;
    if (translatedText[cacheKey]) return; // use cached translation

    setIsTranslating(true);
    const textToTranslate = activeChapter.paragraphs.join("\n\n");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToTranslate, style }),
      });
      const data = await response.json();
      if (data.translation) {
        setTranslatedText((prev) => ({ ...prev, [cacheKey]: data.translation }));
      }
    } catch (e) {
      console.error("Translation failed", e);
    } finally {
      setIsTranslating(false);
    }
  };

  // Helper: highlighted paragraph builder
  const renderParagraphWithHotspots = (paragraphText: string) => {
    // Sort keyword triggers by descending length to prevent partial replacements
    const triggers = Object.keys(dynamicKeywordMaps).sort((a, b) => b.length - a.length);
    let parts: (string | React.ReactNode)[] = [paragraphText];
    let keyCounter = 0;

    triggers.forEach((trigger) => {
      const hotspotId = dynamicKeywordMaps[trigger];
      const hotspot = activeHotspots.find((h) => h.id === hotspotId);
      if (!hotspot) return; // only replace keywords active for this chapter

      // Use \b only for English letters to prevent breaking words.
      // For Chinese, match directly.
      const isEnglish = /^[A-Za-z ]+$/.test(trigger);
      const regex = isEnglish 
        ? new RegExp(`\\b(${trigger}s?)\\b`, "gi")
        : new RegExp(`(${trigger.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "g");

      const newParts: (string | React.ReactNode)[] = [];

      parts.forEach((part) => {
        if (typeof part === "string") {
          const splitText = part.split(regex);
          splitText.forEach((sub, idx) => {
            const isMatch = isEnglish 
              ? (sub.toLowerCase().replace(/s$/, "") === trigger.toLowerCase() || sub.toLowerCase() === trigger.toLowerCase())
              : sub === trigger;
            
            if (isMatch) {
              newParts.push(
                <span
                  key={`${hotspotId}-${keyCounter++}`}
                  className="kw"
                >
                  {sub}
                </span>
              );
            } else {
              newParts.push(sub);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  // 1. Cover View
  if (!isOpen) {
    return (
      <BookCover
        onOpen={() => {
          setIsOpen(true);
          setShowDirectory(true);
          setSelectedHotspot(null);
          triggerPageTurnSound();
        }}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <>
      <div className="min-h-screen bg-chrome-bg text-ink flex flex-col justify-between select-none overflow-x-hidden relative transition-colors duration-500">
      {/* Background Ambient Texture */}
      <div className="fixed inset-0 pointer-events-none app-ambient" />
      <div className="fixed inset-0 bg-noise pointer-events-none mix-blend-overlay app-noise" />

      {/* Side Navigation Bookmarks */}
      <nav className="hidden xl:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col gap-1.5 z-30">
        {[{ key: "index", label: isZh ? "目录" : "Index", active: showDirectory, onClick: () => { setShowDirectory(true); triggerPageTurnSound(); } },
          ...chaptersList.map((ch, idx) => ({ key: ch.id, label: shortLabels[idx] ?? ch.englishTitle, active: !showDirectory && idx === activeChapterIndex, onClick: () => selectChapter(idx) }))
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={tab.onClick}
            className={`w-[92px] h-8 pl-4 pr-2 text-left text-[11px] rounded-l-full transition-all duration-300 cursor-pointer ${isZh ? "font-zh-serif tracking-[0.18em]" : "font-display tracking-[0.12em]"} ${
              tab.active
                ? "bg-oxblood text-parchment translate-x-0 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.7)]"
                : "bg-chrome-hover/50 text-chrome/45 ring-1 ring-chrome-line/10 translate-x-5 hover:translate-x-0 hover:text-chrome hover:bg-chrome-hover"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Global Book App Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto mt-3 sm:mt-5 px-4 sm:px-6 h-12 flex items-center justify-between gap-3 border-b border-chrome-line/15">
        <div className="flex items-center gap-1 min-w-0">
          <button
            onClick={() => {
              setIsOpen(false);
              setShowDirectory(false);
            }}
            className="flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] tracking-wide text-chrome/60 hover:text-chrome hover:bg-chrome-hover transition-colors duration-300 cursor-pointer shrink-0"
          >
            <BookMarked strokeWidth={1.5} className="w-4 h-4" />
            <span className="hidden sm:inline">{UI_TRANSLATIONS[language].bookCover}</span>
          </button>
          <button
            onClick={() => {
              setShowDirectory(!showDirectory);
              triggerPageTurnSound();
            }}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] tracking-wide transition-colors duration-300 cursor-pointer shrink-0 ${
              showDirectory
                ? "text-chrome bg-chrome-hover ring-1 ring-chrome-line/30"
                : "text-chrome/60 hover:text-chrome hover:bg-chrome-hover"
            }`}
          >
            <BookOpen strokeWidth={1.5} className="w-4 h-4" />
            <span className="hidden sm:inline">{isZh ? "目录" : "Index"}</span>
          </button>
          <span className="hidden md:block w-px h-4 bg-chrome-line/15 mx-2" />
          <span className="hidden md:block truncate font-serif italic text-[13px] text-chrome/45">
            {showDirectory
              ? (isZh ? "手抄本总目" : "Table of Contents")
              : `${ROMAN[activeChapterIndex]} · ${isZh ? activeChapter.gothicTitle : activeChapter.englishTitle}`}
          </span>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 rounded-full ring-1 ring-chrome-line/20">
            {(["en", "zh"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`h-6 px-2.5 rounded-full text-[10px] tracking-wider transition-colors duration-300 cursor-pointer ${
                  language === lang ? "bg-chrome text-chrome-bg font-semibold" : "text-chrome/50 hover:text-chrome"
                }`}
              >
                {lang === "en" ? "EN" : "中"}
              </button>
            ))}
          </div>

          {/* Background Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? (isZh ? "切换为白色背景" : "Switch to white background") : (isZh ? "切换为深色背景" : "Switch to dark background")}
            aria-label={isZh ? "切换背景" : "Toggle background"}
            className="w-8 h-8 grid place-items-center rounded-full text-chrome/45 hover:text-chrome hover:bg-chrome-hover transition-colors duration-300 cursor-pointer"
          >
            {theme === "dark" ? <Sun strokeWidth={1.5} className="w-4 h-4" /> : <Moon strokeWidth={1.5} className="w-4 h-4" />}
          </button>

          {/* Sound Effect Toggle */}
          <button
            onClick={() => {
              const nextVal = !isSoundEnabled;
              setIsSoundEnabled(nextVal);
              localStorage.setItem("viking_sound_enabled", String(nextVal));
              if (nextVal) {
                // Play a brief sound to confirm
                playParchmentTurnSound();
              }
            }}
            title={isZh ? "切换翻页音效" : "Toggle Page Turn Sound"}
            className="w-8 h-8 grid place-items-center rounded-full text-chrome/45 hover:text-chrome hover:bg-chrome-hover transition-colors duration-300 cursor-pointer"
          >
            {isSoundEnabled ? <Volume2 strokeWidth={1.5} className="w-4 h-4" /> : <VolumeX strokeWidth={1.5} className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Ribbon Tabs for smaller screens */}
      <div className="xl:hidden w-full max-w-5xl mx-auto px-4 mt-4 flex justify-start sm:justify-center overflow-x-auto py-1 z-30 relative scrollbar-none">
        <div className="flex items-center gap-0.5 p-1 rounded-full ring-1 ring-chrome-line/15 bg-chrome-surface backdrop-blur-sm shrink-0">
          {[{ key: "index", label: isZh ? "目录" : "Index", active: showDirectory, onClick: () => { setShowDirectory(true); triggerPageTurnSound(); } },
            ...chaptersList.map((ch, idx) => ({ key: ch.id, label: shortLabels[idx] ?? ch.englishTitle, active: !showDirectory && idx === activeChapterIndex, onClick: () => selectChapter(idx) }))
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={tab.onClick}
              className={`h-7 px-3 rounded-full text-[12px] whitespace-nowrap transition-colors duration-300 cursor-pointer ${isZh ? "font-zh-serif tracking-[0.1em]" : "font-serif"} ${
                tab.active ? "bg-chrome text-chrome-bg font-semibold" : "text-chrome/55 hover:text-chrome"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Double-Page Book Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8 md:py-10 flex items-center justify-center relative z-10">
        <div className="relative w-full bg-gradient-to-b from-[#2f2216] to-[#1f160e] p-1.5 sm:p-2.5 rounded-[18px] md:rounded-[22px] book-shadow ring-1 ring-black/70 flex flex-col transition-shadow duration-500">
          {/* Fine gilt hairline tooled into the leather cover */}
          <div className="absolute inset-[3px] sm:inset-[5px] rounded-[15px] md:rounded-[18px] border border-gilt/15 pointer-events-none" />

          {/* Left page-turn handle */}
          <button
            onClick={handlePrevPage}
            className="absolute -left-4 sm:-left-6 md:-left-9 lg:-left-14 top-1/2 -translate-y-1/2 z-40 group grid place-items-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-chrome-surface backdrop-blur-md ring-1 ring-chrome-line/25 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.35)] transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-chrome-surface-strong hover:ring-chrome-line/55 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt"
            title={UI_TRANSLATIONS[language].prevFolio}
            aria-label={UI_TRANSLATIONS[language].prevFolio}
          >
            <ChevronLeft strokeWidth={1.25} className="w-5 h-5 text-chrome/70 group-hover:text-chrome transition-[color,transform] duration-300 group-hover:-translate-x-0.5" />
          </button>

          {/* Right page-turn handle */}
          <button
            onClick={handleNextPage}
            className="absolute -right-4 sm:-right-6 md:-right-9 lg:-right-14 top-1/2 -translate-y-1/2 z-40 group grid place-items-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-chrome-surface backdrop-blur-md ring-1 ring-chrome-line/25 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.35)] transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-chrome-surface-strong hover:ring-chrome-line/55 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt"
            title={UI_TRANSLATIONS[language].nextFolio}
            aria-label={UI_TRANSLATIONS[language].nextFolio}
          >
            <ChevronRight strokeWidth={1.25} className="w-5 h-5 text-chrome/70 group-hover:text-chrome transition-[color,transform] duration-300 group-hover:translate-x-0.5" />
          </button>

          {/* Book Pages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-0 relative rounded-[14px] md:rounded-[16px] overflow-hidden bg-transparent lg:bg-parchment">
            {/* LEFT PAGE: Historical Chronicle Text or Interactive Timeline Map */}
            {showDirectory ? (
              <div className="left-page-immersive rounded-xl lg:rounded-l-2xl lg:rounded-r-none p-6 sm:p-8 md:p-10 lg:p-11 flex flex-col justify-between min-h-[480px] sm:min-h-[550px] lg:h-[700px] relative overflow-hidden">
                <PageFrame />

                {/* Viking Vegvisir Runic Compass Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] mix-blend-multiply select-none z-0">
                  <svg viewBox="0 0 200 200" className="w-96 h-96 text-[#3a2c1b]">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
                    <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="8 6" />
                    <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <path id="rune-path-left" d="M 18,100 A 82,82 0 1,1 18,100.1" fill="none" stroke="none" />
                    <text className="font-mono text-[7px] tracking-[0.22em] fill-currentColor">
                      <textPath href="#rune-path-left" startOffset="0%">
                        ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛗᛚᛜᛞᛟ ᛏᚼᛅ ᚴᚼᚢᚾᛁᚴᛚᛅ ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛗᛚᛜᛞᛟ
                      </textPath>
                    </text>
                  </svg>
                </div>

                <div className="w-full flex-1 flex flex-col justify-between h-full relative z-10">
                  {/* Title and Header */}
                  <div className="mb-6 text-center select-none">
                    <p className={`${labelFont} text-[10px] text-ink-soft/60`}>
                      {isZh ? "修道院手卷" : "Tabula Contentorum"}
                    </p>
                    <h3 className={`${titleFont} mt-2 text-2xl sm:text-3xl text-ink`}>
                      {isZh ? "全书总目" : "Index"}
                    </h3>
                    <RuneDivider className="mt-3 w-40 mx-auto" />
                  </div>

                  {/* Directory Scroll Area */}
                  <div className="relative flex-1 overflow-y-auto max-h-[360px] sm:max-h-[440px] md:max-h-[470px] lg:max-h-[480px] pr-2 min-h-[300px]">
                    <div className="space-y-5">
                      {chaptersList.map((ch, chIdx) => (
                        <div key={ch.id}>
                          {/* Chapter Header Link */}
                          <div
                            onClick={() => handleJumpToPage(chIdx, 0)}
                            className="group flex items-baseline gap-3 cursor-pointer"
                          >
                            <span className="w-7 shrink-0 font-display text-[11px] tracking-wider text-oxblood/75">
                              {ROMAN[chIdx]}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-[15px] font-semibold text-ink group-hover:text-oxblood transition-colors duration-300 leading-snug">
                                {ch.gothicTitle}
                              </h4>
                              <span className="block mt-0.5 text-[10px] tracking-[0.08em] text-ink-soft/55">
                                {ch.englishTitle}{ch.era && ` · ${ch.era}`}
                              </span>
                            </div>
                          </div>

                          {/* Pages */}
                          <div className="ml-[13px] mt-2 pl-[26px] border-l border-gilt/30 space-y-1.5">
                            {ch.pages.map((p, pIdx) => {
                              const isCurrentPage = !showDirectory && activeChapterIndex === chIdx && activePageIndex === pIdx;
                              return (
                                <div
                                  key={p.id}
                                  onClick={() => handleJumpToPage(chIdx, pIdx)}
                                  className="group/page flex items-center gap-2.5 cursor-pointer"
                                >
                                  <span className={`h-px shrink-0 transition-all duration-300 ${
                                    isCurrentPage ? "w-4 bg-oxblood" : "w-2 bg-ink/25 group-hover/page:w-4 group-hover/page:bg-oxblood/60"
                                  }`} />
                                  <span className={`font-serif text-[13px] leading-snug transition-colors duration-300 ${
                                    isCurrentPage ? "text-oxblood font-semibold" : "text-ink/70 group-hover/page:text-ink"
                                  }`}>
                                    {p.title}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Closing epigraph */}
                  <p className="pt-4 text-center select-none shrink-0 font-serif italic text-[12px] text-ink-soft/60">
                    {isZh
                      ? "“历史是写在羊皮卷上的铁与血。”"
                      : "“History is iron and blood written on vellum.”"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="left-page-immersive rounded-xl lg:rounded-l-2xl lg:rounded-r-none p-6 sm:p-8 md:p-10 lg:p-11 flex flex-col justify-between min-h-[480px] sm:min-h-[550px] lg:h-[700px] relative overflow-hidden">
              
              <PageFrame />

              {/* Viking Vegvisir Runic Compass Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] mix-blend-multiply select-none z-0">
                <svg viewBox="0 0 200 200" className="w-96 h-96 text-[#3a2c1b]">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
                  <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="8 6" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  <path id="rune-path-left" d="M 18,100 A 82,82 0 1,1 18,100.1" fill="none" stroke="none" />
                  <text className="font-mono text-[7px] tracking-[0.22em] fill-currentColor">
                    <textPath href="#rune-path-left" startOffset="0%">
                      ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛗᛚᛜᛞᛟ ᛏᚼᛅ ᚴᚼᚢᚾᛁᚴᛚᛅ ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛗᛚᛜᛞᛟ
                    </textPath>
                  </text>
                  <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
                    <line x1="100" y1="100" x2="100" y2="40" />
                    <line x1="95" y1="50" x2="105" y2="50" />
                    <line x1="93" y1="45" x2="107" y2="45" />
                    <line x1="100" y1="100" x2="142" y2="58" />
                    <line x1="126" y1="64" x2="133" y2="71" />
                    <line x1="100" y1="100" x2="160" y2="100" />
                    <line x1="150" y1="95" x2="150" y2="105" />
                    <line x1="155" y1="93" x2="155" y2="107" />
                    <line x1="100" y1="100" x2="142" y2="142" />
                    <line x1="126" y1="136" x2="133" y2="129" />
                    <line x1="100" y1="100" x2="100" y2="160" />
                    <line x1="95" y1="150" x2="105" y2="150" />
                    <line x1="93" y1="155" x2="107" y2="155" />
                    <line x1="100" y1="100" x2="58" y2="142" />
                    <line x1="74" y1="136" x2="67" y2="129" />
                    <line x1="100" y1="100" x2="40" y2="100" />
                    <line x1="50" y1="95" x2="50" y2="105" />
                    <line x1="45" y1="93" x2="45" y2="107" />
                    <line x1="100" y1="100" x2="58" y2="58" />
                    <line x1="74" y1="64" x2="67" y2="71" />
                  </g>
                  <circle cx="100" cy="100" r="3" fill="currentColor" />
                </svg>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeChapterIndex}-${activePageIndex}`}
                  initial={{ opacity: 0, x: pageDirection === "next" ? -8 : 8 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, x: pageDirection === "next" ? 6 : -6, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }}
                  style={{ willChange: "transform, opacity" }}
                  className="w-full flex-1 flex flex-col justify-between h-full relative z-10"
                >
                  {activePage.isExpansionMap ? (
                    /* ================== LEFT PAGE EXPANSION ERA SELECTOR ================== */
                    <ExpansionLeftPage
                      language={language}
                      era={expansionEra}
                      onEraChange={setExpansionEra}
                      focus={expansionFocus}
                      onFocus={setExpansionFocus}
                      intro={activePage.paragraphs[0]}
                    />
                  ) : activePage.isTimelineComponent ? (
                    /* ================== LEFT PAGE TIMELINE INTERACTIVE INTERFACE ================== */
                    <div className="w-full flex-1 flex flex-col justify-between h-full relative z-10" id="timeline-interactive-module">
                      {/* Timeline Header */}
                      <div className="mb-5 pb-3 border-b border-ink/10 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <p className={`${labelFont} text-[10px] text-ink-soft/60`}>
                            {isZh ? "纪元总览" : "Chronologia"}
                          </p>
                          <h3 className={`${titleFont} mt-1 text-lg sm:text-xl text-ink leading-snug`}>
                            {UI_TRANSLATIONS[language].timelineHeader}
                          </h3>
                        </div>
                        <span className="shrink-0 font-display text-[10px] tracking-[0.2em] text-oxblood/80">793–1066</span>
                      </div>

                      {/* Main vertical scrollable timeline area */}
                      <div className="relative flex-1 overflow-y-auto max-h-[260px] sm:max-h-[380px] md:max-h-[440px] pr-2 min-h-[200px] sm:min-h-[280px]" id="chronicle-scroll-area">
                        {/* Fine gilt spine linking the era seals */}
                        <div className="absolute left-[29px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gilt/45 to-transparent z-0" />

                        <div className="space-y-4 relative z-10 pl-1">
                          {TIMELINE_ERAS.map((era) => {
                            const isSelected = activeEraNode === era.id;
                            const isHovered = hoveredEraNode === era.id;
                            const isExpanded = isSelected || isHovered;

                            return (
                              <div
                                key={era.id}
                                onMouseEnter={() => setHoveredEraNode(era.id)}
                                onMouseLeave={() => setHoveredEraNode(null)}
                                className="group"
                              >
                                {/* Era Node Button */}
                                <div
                                  onClick={() => setActiveEraNode(era.id)}
                                  className={`flex items-center gap-3.5 cursor-pointer p-2 rounded-xl transition-colors duration-300 ${
                                    isSelected ? "bg-white/45 ring-1 ring-gilt/35" : "hover:bg-ink/[0.03]"
                                  }`}
                                >
                                  {/* Wax seal */}
                                  <div
                                    className="w-9 h-9 rounded-[45%_55%_50%_48%] flex items-center justify-center shrink-0 relative transition-transform duration-300 group-hover:scale-105"
                                    style={{
                                      backgroundColor: era.color,
                                      boxShadow: `0 0 0 ${isSelected ? 2 : 1}px ${isSelected ? "rgba(227,208,166,0.95)" : "rgba(184,149,95,0.55)"}, 0 3px 6px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -2px 3px rgba(0,0,0,0.3)`
                                    }}
                                  >
                                    <span className="text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] select-none text-sm">
                                      {era.badge}
                                    </span>
                                  </div>

                                  {/* Year & Label */}
                                  <div className="flex-1 min-w-0">
                                    <span className="block font-display text-[10px] tracking-[0.18em]" style={{ color: isSelected ? "var(--color-oxblood)" : era.color }}>
                                      AD {era.yearRange}
                                    </span>
                                    <span className={`block truncate font-serif text-[15px] font-semibold leading-snug transition-colors duration-300 ${
                                      isSelected ? "text-oxblood" : "text-ink"
                                    }`}>
                                      {era.label[language]}
                                    </span>
                                  </div>
                                </div>

                                {/* Level 2: Sub-track list container */}
                                <AnimatePresence initial={false}>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                      className="overflow-hidden pl-[58px] pr-1"
                                    >
                                      <div className="py-1.5 space-y-0.5">
                                        {era.subTrack.map((event, idx) => {
                                          const runes = ["ᚱ", "ᚦ", "ᛒ", "ᚼ", "ᛅ", "ᛋ"];
                                          const rune = runes[idx % runes.length];
                                          const isEventSelected = selectedTimelineEvent?.year === event.year;

                                          return (
                                            <button
                                              key={idx}
                                              onClick={() => setSelectedTimelineEvent(event)}
                                              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors duration-300 flex items-baseline gap-3 group/item cursor-pointer ${
                                                isEventSelected ? "bg-white/55 ring-1 ring-gilt/40" : "hover:bg-ink/[0.04]"
                                              }`}
                                            >
                                              <span className={`shrink-0 w-12 font-display text-[11px] tracking-wider ${
                                                isEventSelected ? "text-oxblood" : "text-oxblood/70"
                                              }`}>
                                                {event.year}
                                              </span>
                                              <span className={`flex-1 min-w-0 font-serif text-[13px] leading-snug transition-colors duration-300 ${
                                                isEventSelected ? "text-oxblood font-semibold" : "text-ink/80 group-hover/item:text-ink"
                                              }`}>
                                                {event.title[language]}
                                              </span>
                                              <span className={`shrink-0 font-mono text-[10px] transition-colors duration-300 ${
                                                isEventSelected ? "text-oxblood" : "text-gilt/70"
                                              }`}>
                                                {rune}
                                              </span>
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

                      {/* Legend instruction bar */}
                      <p className="mt-3 pt-3 border-t border-ink/10 shrink-0 font-serif italic text-[11.5px] leading-relaxed text-ink-soft/70">
                        {UI_TRANSLATIONS[language].sovereignSub.replace(/^\*\s*/, "")}
                      </p>
                    </div>
                  ) : (
                    /* ================== STANDARD CHAPTER PROSE WRITING ================== */
                    <div className="flex-1 flex flex-col justify-between h-full relative z-10">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Chapter Meta */}
                          <div className="flex items-center justify-between gap-3 mb-4 font-display text-[10px] tracking-[0.25em] uppercase text-ink-soft/65">
                            <span>Capitulum {ROMAN[activeChapterIndex]}</span>
                            <span className={`text-oxblood/80 truncate ${isZh ? "font-zh-serif normal-case tracking-[0.12em]" : ""}`}>{activeChapter.era}</span>
                          </div>

                          {/* Main Chapter Title */}
                          <h2 className={`${titleFont} text-2xl sm:text-[1.75rem] lg:text-[2.1rem] leading-tight text-ink text-center select-text`}>
                            {activeChapter.gothicTitle}
                          </h2>

                          {/* Runic subtitle block */}
                          <div className="mt-3 flex flex-col items-center gap-2">
                            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] text-ink-soft/55 text-center select-text">
                              {activeChapter.runicSubtitle}
                            </span>
                            <RuneDivider className="w-36 sm:w-44" />
                          </div>

                          {/* Sub-page Specific Title */}
                          <p className={`mt-3 mb-4 text-center text-[13px] sm:text-sm text-oxblood ${isZh ? "font-zh-serif tracking-[0.1em]" : "font-serif italic"}`}>
                            {activePage.title}
                          </p>

                          {/* Scrollable paragraph content container to guarantee same height */}
                          <div className="overflow-y-auto max-h-[260px] sm:max-h-[340px] md:max-h-[380px] pr-2 select-text">
                            <div className={`space-y-4 font-serif text-[15px] sm:text-[15.5px] lg:text-[16px] text-ink/90 ${isZh ? "leading-[1.95] tracking-[0.02em]" : "leading-[1.75]"}`}>
                              {activePage.paragraphs.map((p, idx) => (
                                <p key={idx} className={`text-justify ${idx === 0 ? `first-letter:float-left first-letter:text-[3.2em] first-letter:leading-[0.82] first-letter:mr-2.5 first-letter:mt-1 first-letter:text-oxblood ${isZh ? "first-letter:font-zh-serif first-letter:font-bold" : "first-letter:font-gothic"}` : ""}`}>
                                  {renderParagraphWithHotspots(p)}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Folio number */}
              <span className="hidden lg:block absolute bottom-[18px] left-1/2 -translate-x-1/2 font-display text-[10px] tracking-[0.3em] text-ink-soft/45 pointer-events-none select-none">
                {ROMAN[activeChapterIndex]}·{activePageIndexNormalized + 1}
              </span>
            </div>
            )}

            {/* RIGHT PAGE with 3D Turn Animation around the spine */}
            {showDirectory ? (
              <div className="right-page-immersive rounded-xl lg:rounded-r-2xl lg:rounded-l-none p-6 sm:p-8 md:p-10 lg:p-11 flex flex-col justify-between min-h-[480px] sm:min-h-[550px] lg:h-[700px] relative overflow-hidden">
                <PageFrame />

                {/* Viking Longship Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] mix-blend-multiply select-none z-0">
                  <svg viewBox="0 0 200 200" className="w-96 h-96 text-[#3a2c1b]">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </div>

                <div className="flex flex-col items-center justify-center relative z-10 w-full h-full my-auto">
                  {/* Illustration Panel Header */}
                  <div className="w-full flex items-baseline justify-between gap-3 mb-6 pb-3 border-b border-ink/10 select-none">
                    <h3 className={`${labelFont} text-[11px] text-ink`}>
                      {isZh ? "扉页画卷" : "Frontispiece"}
                    </h3>
                    <span className="font-display text-[10px] tracking-[0.2em] uppercase text-ink-soft/55">
                      {isZh ? "英格兰编年史" : "Illuminated Codex"}
                    </span>
                  </div>

                  {/* Gallery mat frame */}
                  <div className="relative w-full max-w-[260px] sm:max-w-[340px] aspect-[3/4] p-2 sm:p-2.5 bg-[#fbf6ea] rounded-[6px] ring-1 ring-gilt/40 shadow-[0_28px_44px_-26px_rgba(42,30,18,0.7),0_2px_6px_rgba(42,30,18,0.10)] group">
                    <div className="w-full h-full rounded-[3px] overflow-hidden relative bg-stone-900 ring-1 ring-black/10">
                      <img
                        src={asset("/images/viking_timeline_1784019399632.jpg")}
                        alt="The Viking Chronicle Frontispiece"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-amber-900/[0.06] mix-blend-color pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="mt-5 text-center select-none max-w-[300px] font-serif italic text-[12px] leading-relaxed text-ink-soft/70">
                    {isZh
                      ? "林迪斯法恩圣岛劫掠与征服之始 · 公元 793 年"
                      : "The Raid on Lindisfarne & the Dawn of Conquest · 793 AD"}
                  </p>
                </div>

              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl lg:rounded-r-2xl lg:rounded-l-none" style={{ perspective: 1200 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${activeChapterIndex}-${activePageIndex}`}
                  initial={{ 
                    opacity: 0, 
                    rotateY: pageDirection === "next" ? 35 : -35,
                    scale: 0.97,
                    x: pageDirection === "next" ? 12 : -12
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0,
                    scale: 1,
                    x: 0,
                    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateY: pageDirection === "next" ? -28 : 28,
                    scale: 0.98,
                    x: pageDirection === "next" ? -10 : 10,
                    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
                  }}
                  style={{ 
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                    willChange: "transform, opacity"
                  }}
                  className={`right-page-immersive rounded-xl lg:rounded-r-2xl lg:rounded-l-none p-6 sm:p-8 md:p-10 lg:p-11 flex flex-col justify-between lg:h-[700px] relative overflow-hidden ${isFilmOpen ? "min-h-[760px] sm:min-h-[860px] lg:min-h-0" : "min-h-[480px] sm:min-h-[550px]"}`}
                >
                  
                  <PageFrame />

                  {/* Viking Longship Nautical Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] mix-blend-multiply select-none z-0">
                    <svg viewBox="0 0 200 200" className="w-96 h-96 text-[#3a2c1b]">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.75" />
                      <path id="rune-path-right" d="M 18,100 A 82,82 0 1,1 18,100.1" fill="none" stroke="none" />
                      <text className="font-mono text-[7px] tracking-[0.22em] fill-currentColor">
                        <textPath href="#rune-path-right" startOffset="50%">
                          ᛏᚼᛅ ᚴᚼᚢᚾᛁᚴᛚᛅ ᚠᚢᚦᚨᚱᚲᚷᚹᚺᛃᛇᛈᛉᛊᛏᛒᛗᛚᛜᛞᛟ ᛏᚼᛅ ᚴᚼᚢᚾᛁᚴᛚᛅ ᚠᚢᚦᚨᚱᚲᚷᚹ
                        </textPath>
                      </text>
                      <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(45, 55) scale(0.55)">
                        <line x1="100" y1="20" x2="100" y2="150" strokeWidth="2" />
                        <path d="M 40,30 Q 100,25 160,30 Q 140,80 100,80 Q 60,80 40,30 Z" fill="none" strokeWidth="1.5" />
                        <path d="M 60,30 L 60,78 M 80,28 L 80,80 M 120,28 L 120,80 M 140,30 L 140,78" strokeWidth="0.5" />
                        <path d="M 42,40 L 158,40 M 45,55 L 155,55 M 50,70 L 150,70" strokeWidth="0.5" />
                        <path d="M 10,130 C 30,155 170,155 190,130 C 205,110 200,90 195,80 C 190,95 180,125 160,135 C 140,145 60,145 40,135 C 20,125 10,95 5,80 C 0,90 -5,110 10,130 Z" fill="none" strokeWidth="2" />
                        <path d="M 5,80 Q -15,50 -5,35 Q 0,45 5,80 Z" strokeWidth="1.5" />
                        <path d="M 195,80 Q 215,55 205,40 Q 200,50 195,80 Z" strokeWidth="1.5" />
                        <circle cx="50" cy="138" r="8" />
                        <circle cx="68" cy="140" r="8" />
                        <circle cx="86" cy="141" r="8" />
                        <circle cx="104" cy="141" r="8" />
                        <circle cx="122" cy="141" r="8" />
                        <circle cx="140" cy="140" r="8" />
                        <circle cx="158" cy="138" r="8" />
                        <path d="M -20,160 Q 20,150 60,160 Q 100,170 140,160 Q 180,150 220,160" strokeWidth="1" />
                        <path d="M -10,170 Q 30,165 70,175 Q 110,165 150,175 Q 190,165 230,170" strokeWidth="0.5" />
                      </g>
                    </svg>
                  </div>

                  {activePage.isExpansionMap ? (
                    /* ================== RIGHT PAGE EXPANSION MAP ================== */
                    <ExpansionMapPanel
                      language={language}
                      era={expansionEra}
                      focus={expansionFocus}
                      onFocus={setExpansionFocus}
                    />
                  ) : activePage.isTimelineComponent ? (
                    /* ================== CHAPTER 2 TIMELINE EVENT DETAIL DISPLAY ================== */
                    (() => {
                      const currentEvent = selectedTimelineEvent || TIMELINE_ERAS[0].subTrack[0];
                      const currentEventImage = asset(currentEvent.image || "/images/viking_timeline_1784019399632.jpg");

                      return (
                        <div className="w-full flex-1 flex flex-col justify-between h-full select-none relative z-10" id="timeline-detail-module">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              {/* Event Header */}
                              <div className="mb-4 pb-3 border-b border-ink/10 flex items-center justify-between gap-3">
                                <span className="font-display text-[12px] tracking-[0.2em] text-oxblood">
                                  AD {currentEvent.year}
                                </span>
                                {/* Documentary entry */}
                                <button
                                  onClick={() => setIsFilmOpen(true)}
                                  title={isZh ? "播放纪录短片《维京时代 793–1066》" : "Play the documentary “The Viking Age 793–1066”"}
                                  className="group/film flex items-center gap-2 h-9 pl-1 pr-3.5 rounded-full bg-white/50 ring-1 ring-gilt/45 hover:ring-oxblood/40 hover:bg-white/80 shadow-[0_6px_14px_-10px_rgba(42,30,18,0.6)] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood/50"
                                >
                                  <span className="relative w-12 h-7 rounded-full overflow-hidden ring-1 ring-black/10 shrink-0">
                                    <img src={asset("/videos/vikings_793-1066_poster.jpg")} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover/film:scale-110" />
                                    <span className="absolute inset-0 grid place-items-center bg-black/30 group-hover/film:bg-oxblood/60 transition-colors">
                                      <Play className="w-3 h-3 ml-px text-white" fill="currentColor" strokeWidth={0} />
                                    </span>
                                  </span>
                                  <span className="flex flex-col items-start leading-none">
                                    <span className={`${isZh ? "font-zh-serif tracking-[0.06em]" : "font-serif"} text-[12px] font-semibold text-ink group-hover/film:text-oxblood transition-colors`}>
                                      {isZh ? "观看纪录短片" : "Watch the film"}
                                    </span>
                                    <span className="mt-1 font-display text-[9px] tracking-[0.15em] text-ink-soft/60">2:00 · 793–1066</span>
                                  </span>
                                </button>
                              </div>

                              {/* Event Title */}
                              <h4 className={`${titleFont} text-lg sm:text-xl text-ink mb-4 text-center leading-snug select-text`}>
                                {currentEvent.title[language]}
                              </h4>

                              {/* Event Illustration — gallery mat */}
                              <div className="relative aspect-[16/10] w-[220px] sm:w-[260px] md:w-[300px] lg:w-[310px] xl:w-[330px] mx-auto p-1.5 bg-[#fbf6ea] rounded-[6px] ring-1 ring-gilt/40 shadow-[0_22px_36px_-22px_rgba(42,30,18,0.7),0_2px_5px_rgba(42,30,18,0.10)] group mb-4 shrink-0">
                                <div className="w-full h-full rounded-[3px] overflow-hidden relative bg-stone-900 ring-1 ring-black/10">
                                  <img
                                    src={currentEventImage}
                                    alt={currentEvent.title[language]}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                  />
                                  <div className="absolute inset-0 bg-amber-900/[0.06] mix-blend-color pointer-events-none" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                                </div>
                              </div>

                              {/* Sovereigns comparison */}
                              <div className="grid grid-cols-2 mb-3 shrink-0 divide-x divide-ink/10 border-y border-ink/10">
                                <div className="py-2 px-2 text-center min-w-0">
                                  <span className={`${labelFont} block text-[9px] text-ink-soft/60 truncate`}>
                                    {UI_TRANSLATIONS[language].saxonKing}
                                  </span>
                                  <span className="block mt-0.5 font-serif text-[13px] font-semibold text-[#2f4a3a] truncate leading-snug">
                                    {currentEvent.saxons[language]}
                                  </span>
                                </div>
                                <div className="py-2 px-2 text-center min-w-0">
                                  <span className={`${labelFont} block text-[9px] text-ink-soft/60 truncate`}>
                                    {UI_TRANSLATIONS[language].vikingKing}
                                  </span>
                                  <span className="block mt-0.5 font-serif text-[13px] font-semibold text-oxblood truncate leading-snug">
                                    {currentEvent.vikings[language]}
                                  </span>
                                </div>
                              </div>

                              {/* Detailed Content */}
                              <div className="overflow-y-auto h-[110px] sm:h-[140px] md:h-[150px] lg:h-[165px] xl:h-[185px] pr-2 select-text">
                                <span className={`${labelFont} block mb-1.5 text-[9px] text-ink-soft/60`}>
                                  {isZh ? "ᛟ 史实与人物" : "ᛟ Analysis & Characters"}
                                </span>
                                <p className={`font-serif text-[13px] text-ink/85 text-justify whitespace-pre-line ${isZh ? "leading-[1.9]" : "leading-relaxed"}`}>
                                  {currentEvent.details[language]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    /* ================== STANDARD HOTSPOTS INTERFACE ================== */
                    <>
                      <div className="flex flex-col items-center relative z-10 w-full">
                        {/* Illustration Panel Header */}
                        <div className="w-full flex items-baseline justify-between gap-3 mb-5 pb-3 border-b border-ink/10 select-none">
                          <h3 className={`${labelFont} text-[11px] text-ink`}>
                            {isZh ? "古籍插画" : "Illustration"}
                          </h3>
                          <span className="font-display text-[10px] tracking-[0.2em] uppercase text-ink-soft/55">
                            {activeHotspots.length > 0
                              ? (isZh ? `${activeHotspots.length} 处细节` : `${activeHotspots.length} details`)
                              : (isZh ? "画卷" : "Plate")}
                          </span>
                        </div>

                        {/* Gallery mat frame */}
                        <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[318px] aspect-[3/4] p-2 sm:p-2.5 bg-[#fbf6ea] rounded-[6px] ring-1 ring-gilt/40 shadow-[0_28px_44px_-26px_rgba(42,30,18,0.7),0_2px_6px_rgba(42,30,18,0.10)] group">
                          <div className="w-full h-full rounded-[3px] overflow-hidden relative bg-stone-900 ring-1 ring-black/10">
                            <img
                              src={activeImage}
                              alt={activeChapter.englishTitle}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
                            />

                            {/* Low-saturation old-photo look */}
                            <div className="absolute inset-0 bg-amber-900/[0.06] mix-blend-color pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                            {/* Hotspot Markers Overlay */}
                            {activeHotspots.map((h) => {
                              if (h.x === undefined || h.y === undefined) return null;
                              const isActive = selectedHotspot?.id === h.id;
                              return (
                                <div
                                  key={h.id}
                                  className="absolute"
                                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                                >
                                  <button
                                    onClick={() => setSelectedHotspot(h)}
                                    title={isZh ? ((h as any).nameZh || h.name) : h.name}
                                    className="group/hs relative flex items-center justify-center w-7 h-7 -ml-3.5 -mt-3.5 focus:outline-none cursor-pointer"
                                  >
                                    {!isActive && <span className="pulse-circle -inset-1" />}
                                    <span
                                      className={`relative z-10 rounded-full transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.5)] ${
                                        isActive
                                          ? "w-4 h-4 bg-oxblood ring-2 ring-gilt-soft"
                                          : "w-3 h-3 bg-gilt-soft/95 ring-[1.5px] ring-black/30 group-hover/hs:bg-oxblood group-hover/hs:ring-gilt-soft group-hover/hs:scale-125"
                                      }`}
                                    />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Legend / Explanation display box below image */}
                      <div className="mt-4 pt-4 border-t border-ink/10 h-[104px] sm:h-[112px] relative z-10 w-full">
                        <AnimatePresence mode="wait">
                          {selectedHotspot ? (
                            <motion.div
                              key={selectedHotspot.id}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="relative h-full overflow-y-auto pr-7 select-text"
                            >
                              <button
                                onClick={() => setSelectedHotspot(null)}
                                className="absolute top-0 right-0 w-6 h-6 grid place-items-center rounded-full text-ink-soft/60 hover:text-oxblood hover:bg-ink/5 transition-colors focus:outline-none cursor-pointer"
                                aria-label="Close"
                              >
                                <X strokeWidth={1.5} className="w-3.5 h-3.5" />
                              </button>
                              <h4 className={`${isZh ? "font-zh-serif font-bold tracking-[0.06em]" : "font-serif font-semibold"} text-[15px] text-oxblood mb-1 leading-snug`}>
                                {isZh ? ((selectedHotspot as any).nameZh || selectedHotspot.name) : selectedHotspot.name}
                              </h4>
                              <p className={`font-serif text-[13px] text-ink/85 ${isZh ? "leading-[1.85]" : "leading-relaxed"}`}>
                                {isZh ? ((selectedHotspot as any).descriptionZh || selectedHotspot.description) : selectedHotspot.description}
                              </p>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="no-selection"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex flex-col items-center justify-center text-center h-full gap-2"
                            >
                              <Compass strokeWidth={1} className="w-5 h-5 text-gilt" />
                              <p className="font-serif italic text-[12px] leading-relaxed text-ink-soft/70 max-w-[300px]">
                                {UI_TRANSLATIONS[language].legendPlaceholder}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}

                  {/* Documentary player slides over the milestones right page */}
                  <AnimatePresence>
                    {activePage.isTimelineComponent && isFilmOpen && (
                      <FilmPlayer
                        src={asset("/videos/vikings_793-1066.mp4")}
                        poster={asset("/videos/vikings_793-1066_poster.jpg")}
                        language={language}
                        onClose={() => setIsFilmOpen(false)}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
            )}

            {/* Minimalist Book Spine - Premium & Refined */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-10 -ml-5 z-30 pointer-events-none bg-gradient-to-r from-transparent via-black/[0.12] to-transparent">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -ml-px bg-[#3a2818]/25" />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Auto Page Turn Floating Notification */}
      <AnimatePresence>
        {showAutoTurnHint && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            onClick={() => {
              // Immediate manual turn on click
              handleNextPage();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setShowAutoTurnHint(false);
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md ring-1 ring-gilt/30 pl-3 pr-5 py-2.5 rounded-full shadow-[0_16px_36px_-12px_rgba(0,0,0,0.7)] cursor-pointer select-none active:scale-95 transition-transform"
          >
            {/* Visual Progress Spinner Ring */}
            <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  className="stroke-[#3a2c1b]"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  className="stroke-[#dbbe8b]"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="50.24"
                  strokeDashoffset={50.24 * (autoTurnProgress / 100)}
                />
              </svg>
              <span className="absolute text-[8px] font-mono text-[#dbbe8b] font-bold">
                {Math.ceil((autoTurnProgress / 100) * 2)}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-serif font-semibold text-parchment leading-none">
                {isZh ? "即将翻至下一页" : "Turning to the next folio"}
              </span>
              <span className="text-[10px] text-gilt-soft/60 leading-none">
                {isZh ? "轻触立即翻页" : "Tap to turn now"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>
  );
}

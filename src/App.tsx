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
import AdminConsole from "./components/AdminConsole";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Compass,
  Volume2,
  VolumeX,
  X,
  RefreshCw,
  Award,
  BookMarked,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { playParchmentTurnSound } from "./utils/sound";

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

  // Custom configuration images loaded from localStorage if saved
  const [illustrationOverrides, setIllustrationOverrides] = useState<{ [key: string]: string }>({});
  const [timelineEventImages, setTimelineEventImages] = useState<{ [key: string]: string }>({});
  const [isEditingTimelineImage, setIsEditingTimelineImage] = useState(false);
  const [editingTimelineYear, setEditingTimelineYear] = useState("");
  const [tempTimelineImageUrl, setTempTimelineImageUrl] = useState("");

  // Translation States
  const [translationStyle, setTranslationStyle] = useState<"modern" | "old-english" | "skaldic-verse" | "chronicle">("modern");
  const [translatedText, setTranslatedText] = useState<{ [key: string]: string }>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Admin Console States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [customHotspots, setCustomHotspots] = useState<{ [chapterId: string]: Hotspot[] }>({});

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

  // Load custom images and hotspots from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("viking_illustration_overrides");
    if (saved) {
      try {
        setIllustrationOverrides(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading illustration overrides", e);
      }
    }

    const savedTimelineImages = localStorage.getItem("viking_timeline_event_images");
    if (savedTimelineImages) {
      try {
        setTimelineEventImages(JSON.parse(savedTimelineImages));
      } catch (e) {
        console.error("Error loading timeline event images", e);
      }
    }

    const savedHotspots = localStorage.getItem("viking_custom_hotspots");
    if (savedHotspots) {
      try {
        setCustomHotspots(JSON.parse(savedHotspots));
      } catch (e) {
        console.error("Error loading custom hotspots", e);
      }
    }
  }, []);

  // Mobile auto-page turn state with real-time countdown progress
  const [showAutoTurnHint, setShowAutoTurnHint] = useState(false);
  const [autoTurnProgress, setAutoTurnProgress] = useState(100);

  const baseChaptersList = language === "en" ? CHAPTERS_DATA : CHAPTERS_DATA_ZH;
  const chaptersList = baseChaptersList.map((ch) => {
    const overrideHotspots = customHotspots[ch.id];
    const updatedHotspots = overrideHotspots !== undefined ? overrideHotspots : ch.hotspots;
    return {
      ...ch,
      hotspots: updatedHotspots,
      pages: ch.pages.map((p, idx) => {
        if (idx === 0 && overrideHotspots !== undefined) {
          return {
            ...p,
            hotspots: overrideHotspots
          };
        }
        return p;
      })
    };
  });

  // Keyboard navigation for turning pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept keypresses if admin console or dialog overlays are open
      if (isAdminOpen || isEditingTimelineImage) return;
      if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapterIndex, activePageIndex, isAdminOpen, isEditingTimelineImage, chaptersList]);

  const activeChapter = chaptersList[activeChapterIndex];
  const activePageIndexNormalized = Math.min(activePageIndex, activeChapter.pages.length - 1);
  const activePage = activeChapter.pages[activePageIndexNormalized];
  const activeImage = illustrationOverrides[activeChapter.id + "_" + activePage.id] || illustrationOverrides[activeChapter.id] || activePage.image;
  const activeHotspots = activePage.hotspots;

  // Combine static KEYWORD_MAPS with dynamic custom hotspot names for highlighters
  const dynamicKeywordMaps = React.useMemo(() => {
    const maps = { ...KEYWORD_MAPS };
    Object.keys(customHotspots).forEach((chapterId) => {
      const hotspots = customHotspots[chapterId];
      hotspots.forEach((h) => {
        if (h.id) {
          if (h.name) {
            maps[h.name.toLowerCase()] = h.id;
          }
          if ((h as any).nameZh) {
            maps[(h as any).nameZh] = h.id;
          }
        }
      });
    });
    return maps;
  }, [customHotspots]);

  // Save overrides helper
  const handleUpdateImage = (newUrl: string) => {
    const updated = { ...illustrationOverrides, [activeChapter.id]: newUrl };
    setIllustrationOverrides(updated);
    localStorage.setItem("viking_illustration_overrides", JSON.stringify(updated));
  };

  const handleSaveAdminConfig = (
    newOverrides: { [key: string]: string },
    newHotspots: { [chapterId: string]: Hotspot[] }
  ) => {
    setIllustrationOverrides(newOverrides);
    setCustomHotspots(newHotspots);
    localStorage.setItem("viking_illustration_overrides", JSON.stringify(newOverrides));
    localStorage.setItem("viking_custom_hotspots", JSON.stringify(newHotspots));
  };

  const handleUpdateTimelineEventImage = (eventYear: string, url: string) => {
    const updated = { ...timelineEventImages, [eventYear]: url };
    setTimelineEventImages(updated);
    localStorage.setItem("viking_timeline_event_images", JSON.stringify(updated));
  };

  // Switch chapters/pages
  const handleNextPage = () => {
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
      if (window.innerWidth >= 1024) {
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
  }, [activeChapterIndex, activePageIndex, chaptersList, handleNextPage]);

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
        : new RegExp(`(${trigger})`, "g");

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
                  className="font-serif font-bold text-[#8b0000] decoration-dotted underline px-0.5"
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

  // Reset all overrides
  const handleResetAllIllustrations = () => {
    setIllustrationOverrides({});
    localStorage.removeItem("viking_illustration_overrides");
    alert(UI_TRANSLATIONS[language].resetAlert);
  };

  // 1. Cover View
  if (!isOpen) {
    return (
      <>
        <BookCover
          onOpen={() => setIsOpen(true)}
          coverImage="/src/assets/images/viking_cover_1784019389283.jpg"
          language={language}
          onLanguageChange={setLanguage}
        />
        
        {/* Floating viewport-fixed admin trigger */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-black/60 hover:bg-neutral-800 text-[#dbbe8b] border border-[#dbbe8b]/30 hover:border-[#dbbe8b]/70 rounded-xl transition-all font-sans font-black shadow-md backdrop-blur-sm cursor-pointer text-xs"
          >
            <Settings className="w-4 h-4" />
            <span>{language === "zh" ? "手抄本配置管理后台" : "Scriptorium Admin"}</span>
          </button>
        </div>

        <AdminConsole
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          language={language}
          illustrationOverrides={illustrationOverrides}
          customHotspots={customHotspots}
          onSave={handleSaveAdminConfig}
        />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#1a120b] text-[#3a2c1b] flex flex-col justify-between select-none overflow-x-hidden relative">
      {/* Floating viewport-fixed admin trigger (completely outside the book frame) */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-black/60 hover:bg-neutral-800 text-[#dbbe8b] border border-[#dbbe8b]/30 hover:border-[#dbbe8b]/70 rounded-xl transition-all font-sans font-black shadow-md backdrop-blur-sm cursor-pointer text-xs"
        >
          <Settings className="w-4 h-4" />
          <span>{language === "zh" ? "配置后台" : "Admin Panel"}</span>
        </button>
      </div>

      {/* Background Ambient Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4a3728 0%, transparent 70%)" }} />

      {/* Side Navigation Bookmarks */}
      <div className="hidden xl:flex absolute right-4 top-1/4 flex-col space-y-1.5 z-30">
        <button
          onClick={() => {
            setShowDirectory(true);
            triggerPageTurnSound();
          }}
          className={`w-14 h-7 text-[9px] flex items-center justify-center font-bold font-sans uppercase tracking-tighter transition-all cursor-pointer rounded-l-md shadow-md border-y border-l border-[#3a2c1b]/30 ${
            showDirectory
              ? "bg-[#8b0000] text-white translate-x-0"
              : "bg-[#3a2c1b] text-[#c8a67a] translate-x-2 hover:translate-x-0"
          }`}
        >
          {language === "zh" ? "全书目录" : "Index"}
        </button>
        {chaptersList.map((ch, idx) => {
          const isActive = !showDirectory && idx === activeChapterIndex;
          const shortLabels = language === "zh"
            ? ["大事记", "饮食篇", "古建筑", "旧信仰", "兵戈志"]
            : ["Chron", "Diet", "Sett", "Faith", "Wars"];
          return (
            <button
              key={ch.id}
              onClick={() => selectChapter(idx)}
              className={`w-14 h-7 text-[9px] flex items-center justify-center font-bold font-sans uppercase tracking-tighter transition-all cursor-pointer rounded-l-md shadow-md border-y border-l border-[#3a2c1b]/30 ${
                isActive
                  ? "bg-[#8b0000] text-white translate-x-0"
                  : "bg-[#3a2c1b] text-[#c8a67a] translate-x-2 hover:translate-x-0"
              }`}
            >
              {shortLabels[idx]}
            </button>
          );
        })}
      </div>

      {/* Global Book App Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#3a2c1b]/30 bg-[#160f09]/60 backdrop-blur-sm shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setIsOpen(false);
              setShowDirectory(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-[#dbbe8b]/20 hover:border-[#dbbe8b]/50 text-[#dbbe8b] rounded-lg transition-all font-mono hover:bg-[#3a2c1b]/30 cursor-pointer"
          >
            <BookMarked className="w-4 h-4" />
            <span>{UI_TRANSLATIONS[language].bookCover}</span>
          </button>
          <button
            onClick={() => {
              setShowDirectory(!showDirectory);
              triggerPageTurnSound();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs border rounded-lg transition-all font-mono cursor-pointer ${
              showDirectory
                ? "bg-[#8b0000] border-[#dbbe8b] text-[#f3e5c8] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                : "border-[#dbbe8b]/20 hover:border-[#dbbe8b]/50 text-[#dbbe8b] hover:bg-[#3a2c1b]/30"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === "zh" ? "全书目录" : "Index"}</span>
          </button>
          <span className="hidden sm:inline text-[#dbbe8b]/30 font-mono text-xs">|</span>
          <span className="hidden sm:inline font-serif text-sm italic text-[#dbbe8b]/70">
            {showDirectory
              ? (language === "zh" ? "正在浏览手抄本目录" : "Viewing Scriptorium Table of Contents")
              : (language === "zh"
                ? `${UI_TRANSLATIONS[language].chapterMeta} ${activeChapterIndex + 1} ${UI_TRANSLATIONS[language].chronicleLabel}: ${activeChapter.englishTitle}`
                : `Chapter ${activeChapterIndex + 1} of ${chaptersList.length}: ${activeChapter.englishTitle}`)}
          </span>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex bg-black/40 p-0.5 rounded-lg border border-neutral-800 backdrop-blur-xs">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 text-[10px] font-sans rounded transition-all cursor-pointer ${
                language === "en" ? "bg-[#8b0000] text-white font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("zh")}
              className={`px-2 py-0.5 text-[10px] font-sans rounded transition-all cursor-pointer ${
                language === "zh" ? "bg-[#8b0000] text-white font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              中
            </button>
          </div>

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
            title={language === "zh" ? "切换翻页音效" : "Toggle Page Turn Sound"}
            className="p-1.5 text-[#dbbe8b]/50 hover:text-[#dbbe8b] border border-transparent hover:border-[#dbbe8b]/20 rounded-md transition-all cursor-pointer"
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleResetAllIllustrations}
            title={UI_TRANSLATIONS[language].resetIllustrations}
            className="p-1.5 text-[#dbbe8b]/50 hover:text-[#dbbe8b] border border-transparent hover:border-[#dbbe8b]/20 rounded-md transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Ribbon Tabs for smaller screens */}
      <div className="xl:hidden w-full max-w-5xl mx-auto px-4 mt-4 flex justify-center overflow-x-auto py-1 z-30 relative scrollbar-none">
        <div className="flex bg-[#160f09]/80 backdrop-blur-sm p-1 sm:p-1.5 rounded-xl border border-[#3a2c1b]/30 gap-1 sm:gap-1.5 shadow-md">
          <button
            onClick={() => {
              setShowDirectory(true);
              triggerPageTurnSound();
            }}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-serif font-bold transition-all whitespace-nowrap cursor-pointer ${
              showDirectory
                ? "bg-[#8b0000] text-[#f3e5c8] shadow border border-[#8b0000]/50"
                : "text-[#c8a67a] hover:text-[#dbbe8b] hover:bg-[#3a2c1b]/30"
            }`}
          >
            {language === "zh" ? "全书总目" : "Index"}
          </button>
          {chaptersList.map((ch, idx) => {
            const isActive = !showDirectory && idx === activeChapterIndex;
            const shortLabels = language === "zh"
              ? ["大事记", "饮食篇", "古建筑", "旧信仰", "兵戈志"]
              : ["Chronicle", "Diet", "Settlement", "Faith", "Wars"];
            return (
              <button
                key={ch.id}
                onClick={() => selectChapter(idx)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-serif font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#8b0000] text-[#f3e5c8] shadow border border-[#8b0000]/50"
                    : "text-[#c8a67a] hover:text-[#dbbe8b] hover:bg-[#3a2c1b]/30"
                }`}
              >
                {shortLabels[idx]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Double-Page Book Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-10 flex items-center justify-center relative z-10">
        <div className="relative w-full bg-[#3a2c1b] p-2 sm:p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-2 md:border-4 border-[#281d12] flex flex-col">
          {/* Prominent Floating Side Navigation Handles (Highly visible page-turn controls) */}
          {/* Left Handle */}
          <button
            onClick={handlePrevPage}
            className="absolute -left-4 sm:-left-7 md:-left-9 lg:-left-12 top-1/2 -translate-y-1/2 z-40 group flex flex-col items-center justify-center w-9 sm:w-12 md:w-14 h-20 sm:h-24 bg-gradient-to-b from-[#3a2c1b] to-[#251a10] hover:from-[#8b0000] hover:to-[#5c0000] border border-2 border-[#dbbe8b] rounded-l-xl sm:rounded-l-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-x-1 hover:brightness-110 active:scale-95 cursor-pointer focus:outline-none"
            title={UI_TRANSLATIONS[language].prevFolio}
          >
            {/* Inner frame/rim */}
            <div className="absolute inset-1 border border-[#dbbe8b]/20 rounded-l-xl pointer-events-none" />
            {/* Small decorative metallic rivets/studs */}
            <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#dbbe8b]/60 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.8)]" />
            <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-[#dbbe8b]/60 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.8)]" />
            
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-[#dbbe8b] group-hover:scale-125 transition-transform duration-300" />
            <span className="hidden sm:block text-[7px] md:text-[8px] font-mono tracking-widest text-[#dbbe8b]/70 uppercase group-hover:text-white transition-colors mt-1 font-bold">
              {language === "zh" ? "前页" : "PREV"}
            </span>
          </button>

          {/* Right Handle */}
          <button
            onClick={handleNextPage}
            className="absolute -right-4 sm:-right-7 md:-right-9 lg:-right-12 top-1/2 -translate-y-1/2 z-40 group flex flex-col items-center justify-center w-9 sm:w-12 md:w-14 h-20 sm:h-24 bg-gradient-to-b from-[#3a2c1b] to-[#251a10] hover:from-[#8b0000] hover:to-[#5c0000] border border-2 border-[#dbbe8b] rounded-r-xl sm:rounded-r-2xl shadow-[-5px_5px_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:translate-x-1 hover:brightness-110 active:scale-95 cursor-pointer focus:outline-none"
            title={UI_TRANSLATIONS[language].nextFolio}
          >
            {/* Inner frame/rim */}
            <div className="absolute inset-1 border border-[#dbbe8b]/20 rounded-r-xl pointer-events-none" />
            {/* Small decorative metallic rivets/studs */}
            <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#dbbe8b]/60 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.8)]" />
            <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-[#dbbe8b]/60 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.8)]" />
            
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-[#dbbe8b] group-hover:scale-125 transition-transform duration-300" />
            <span className="hidden sm:block text-[7px] md:text-[8px] font-mono tracking-widest text-[#dbbe8b]/70 uppercase group-hover:text-white transition-colors mt-1 font-bold">
              {language === "zh" ? "后页" : "NEXT"}
            </span>
          </button>

          {/* Golden Corner Guards */}
          <div className="absolute top-1 left-1 w-6 h-6 border-t-4 border-l-4 border-[#dbbe8b] rounded-tl-lg opacity-80 pointer-events-none" />
          <div className="absolute top-1 right-1 w-6 h-6 border-t-4 border-r-4 border-[#dbbe8b] rounded-tr-lg opacity-80 pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-6 h-6 border-b-4 border-l-4 border-[#dbbe8b] rounded-bl-lg opacity-80 pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-6 h-6 border-b-4 border-r-4 border-[#dbbe8b] rounded-br-lg opacity-80 pointer-events-none" />

          {/* Book Pages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 relative rounded-2xl overflow-hidden shadow-[inset_0_0_45px_rgba(0,0,0,0.08)] bg-[#f3e5c8]">
            {/* LEFT PAGE: Historical Chronicle Text or Interactive Timeline Map */}
            {showDirectory ? (
              <div className="left-page-immersive rounded-xl lg:rounded-l-2xl lg:rounded-r-none p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[480px] sm:min-h-[550px] lg:h-[700px] relative overflow-hidden">
                {/* Premium Gilded Decorative Corners */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-l-2 border-[#c5a870] opacity-80 pointer-events-none" />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-r-2 border-[#c5a870] opacity-80 pointer-events-none" />
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-l-2 border-[#c5a870] opacity-80 pointer-events-none" />
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-r-2 border-[#c5a870] opacity-80 pointer-events-none" />

                {/* Monastic Double Gilded Frame */}
                <div className="absolute inset-2 sm:inset-3 border border-[#c5a870]/30 rounded-lg pointer-events-none" />
                <div className="absolute inset-[11px] sm:inset-[15px] border border-[#dbbe8b]/20 rounded-lg pointer-events-none border-dashed" />

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
                  <div className="mb-4 pb-2 border-b border-[#3a2c1b]/20 flex items-center justify-between">
                    <div>
                      <h3 className="font-gothic text-base sm:text-lg text-[#8b0000] tracking-wide font-black">
                        {language === "zh" ? "修道院手卷：全书总目" : "Scriptorium Codex: Index"}
                      </h3>
                      <p className="text-[9px] font-mono tracking-widest text-[#8e724b] uppercase mt-0.5">
                        {language === "zh" ? "ᛏᛅᛒᛚᛅ ᚢᚠ ᚴᚢᚾᛏᛅᚾᛏᛋ • 简约优雅复古" : "TABULA OF CONTENTS • RETRO MINIMALIST"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] font-mono font-bold text-[#8e724b] uppercase tracking-widest bg-[#8e724b]/10 px-2 py-0.5 rounded">
                        {language === "zh" ? "总览" : "INDEX"}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Tree Directory Scroll Area */}
                  <div className="relative flex-1 overflow-y-auto max-h-[360px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[500px] pr-2 custom-scrollbar pl-1 min-h-[300px]">
                    <div className="space-y-4">
                      {chaptersList.map((ch, chIdx) => {
                        return (
                          <div key={ch.id} className="space-y-2">
                            {/* Chapter Header Link */}
                            <div
                              onClick={() => handleJumpToPage(chIdx, 0)}
                              className="group flex items-start gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-[#c8a67a]/15 transition-all"
                            >
                              <div className="mt-0.5 w-5 h-5 rounded-full bg-[#8b0000]/10 border border-[#8b0000]/35 flex items-center justify-center text-[10px] text-[#8b0000] font-mono font-black shrink-0 shadow-sm">
                                {chIdx + 1}
                              </div>
                              <div>
                                <h4 className="font-serif text-[13px] font-black text-[#3a2c1b] group-hover:text-[#8b0000] transition-colors leading-tight">
                                  {ch.gothicTitle}
                                </h4>
                                <span className="text-[9px] font-mono text-[#8e724b]/80 font-semibold block mt-0.5">
                                  {ch.englishTitle} {ch.era && `• ${ch.era}`}
                                </span>
                              </div>
                            </div>

                            {/* Tree branch pages list with vertical tree line */}
                            <div className="pl-6 border-l border-dashed border-[#c5a870]/40 ml-4 space-y-2 py-0.5">
                              {ch.pages.map((p, pIdx) => {
                                const isCurrentPage = !showDirectory && activeChapterIndex === chIdx && activePageIndex === pIdx;
                                return (
                                  <div
                                    key={p.id}
                                    onClick={() => handleJumpToPage(chIdx, pIdx)}
                                    className="group/page flex items-center gap-2 cursor-pointer relative py-0.5"
                                  >
                                    {/* Horizontal branch line */}
                                    <div className="absolute -left-6 w-3.5 border-t border-dashed border-[#c5a870]/40 top-1/2" />
                                    
                                    {/* Tree node indicator */}
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                                      isCurrentPage
                                        ? "bg-[#8b0000] scale-125 shadow-[0_0_4px_#8b0000]"
                                        : "bg-[#8e724b]/40 group-hover/page:bg-[#8b0000]"
                                    }`} />

                                    {/* Page Title text */}
                                    <span className={`font-serif text-xs transition-colors leading-tight ${
                                      isCurrentPage
                                        ? "text-[#8b0000] font-bold"
                                        : "text-[#3a2c1b]/85 group-hover/page:text-[#8b0000] group-hover/page:translate-x-0.5 transition-transform"
                                    }`}>
                                      {p.title}
                                    </span>

                                    {/* Current reading badge */}
                                    {isCurrentPage && (
                                      <span className="text-[7px] font-mono text-[#8b0000]/90 bg-[#8b0000]/10 px-1 py-0.2 rounded font-black tracking-widest scale-90 uppercase">
                                        {language === "zh" ? "当前阅读" : "READING"}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Small decorative quote or guidance at bottom */}
                  <div className="pt-2 border-t border-[#3a2c1b]/10 text-center select-none shrink-0">
                    <p className="font-serif italic text-[#8e724b] text-[10px] leading-tight">
                      {language === "zh" 
                        ? "“历史是写在羊皮卷上的铁与血，点击任意篇章开启尘封绘卷。”" 
                        : "“History is iron and blood written on vellum. Select any page to unseal.”"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="left-page-immersive rounded-xl lg:rounded-l-2xl lg:rounded-r-none p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[480px] sm:min-h-[550px] lg:h-[700px] relative overflow-hidden">
              
              {/* Premium Gilded Decorative Corners */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-l-2 border-[#c5a870] opacity-80 pointer-events-none" />
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-r-2 border-[#c5a870] opacity-80 pointer-events-none" />
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-l-2 border-[#c5a870] opacity-80 pointer-events-none" />
              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-r-2 border-[#c5a870] opacity-80 pointer-events-none" />

              {/* Monastic Double Gilded Frame */}
              <div className="absolute inset-2 sm:inset-3 border border-[#c5a870]/30 rounded-lg pointer-events-none" />
              <div className="absolute inset-[11px] sm:inset-[15px] border border-[#dbbe8b]/20 rounded-lg pointer-events-none border-dashed" />

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
                  initial={{ opacity: 0, x: pageDirection === "next" ? -15 : 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: pageDirection === "next" ? 15 : -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full flex-1 flex flex-col justify-between h-full relative z-10"
                >
                  {activePage.isTimelineComponent ? (
                    /* ================== LEFT PAGE TIMELINE INTERACTIVE INTERFACE ================== */
                    <div className="w-full flex-1 flex flex-col justify-between h-full relative z-10" id="timeline-interactive-module">
                      {/* Timeline Header */}
                      <div className="mb-3 pb-2 border-b border-[#3a2c1b]/20 flex items-center justify-between">
                        <h3 className="font-gothic text-base text-[#8b0000] tracking-wide font-black">
                          {UI_TRANSLATIONS[language].timelineHeader}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#8b0000] animate-pulse"></div>
                          <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-[#3a2c1b]">
                            {language === "zh" ? "大事记" : "TIMELINE"}
                          </span>
                        </div>
                      </div>

                      {/* Main vertical scrollable timeline area */}
                      <div className="relative flex-1 overflow-y-auto max-h-[260px] sm:max-h-[380px] md:max-h-[460px] pr-2 custom-scrollbar min-h-[200px] sm:min-h-[280px]" id="chronicle-scroll-area">
                        {/* Decorative vertical antique braided leather strap / runic chain */}
                        <div className="absolute left-6 top-2 bottom-2 w-2 bg-[#2d1b10] rounded-full border-l border-r border-[#dbbe8b]/30 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.1)] z-0 flex flex-col justify-between items-center py-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#dbbe8b]/70 shadow-sm" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#dbbe8b]/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#dbbe8b]/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#dbbe8b]/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#dbbe8b]/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#dbbe8b]/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#dbbe8b]/70 shadow-sm" />
                        </div>

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
                                  className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all border ${
                                    isSelected 
                                      ? `${era.accentBg} border-[#3a2c1b]/35 shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] bg-[#c8a67a]/20` 
                                      : "border-transparent hover:bg-[#3a2c1b]/5"
                                  }`}
                                >
                                  {/* Badge Button: Realistic Medieval Wax Seal */}
                                  <div
                                    className="w-10 h-10 rounded-[45%_55%_50%_48%] flex items-center justify-center text-base shadow-[0_4px_8px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.4)] border-2 transition-all duration-300 group-hover:scale-110 shrink-0 relative group/seal"
                                    style={{
                                      backgroundColor: era.color,
                                      borderColor: isSelected ? "#dbbe8b" : "#a88a59",
                                      boxShadow: isSelected ? "0 0 12px rgba(219,190,139,0.5), inset 0 2px 4px rgba(255,255,255,0.3)" : ""
                                    }}
                                  >
                                    {/* Inner seal pattern effect */}
                                    <div className="absolute inset-0.5 rounded-[45%_55%_50%_48%] border border-black/10 mix-blend-overlay" />
                                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] select-none text-base relative z-10 group-hover/seal:scale-110 transition-transform">
                                      {era.badge}
                                    </span>
                                  </div>

                                  {/* Year & Label: Monastic Calligraphy Style */}
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-mono font-black tracking-widest block uppercase text-amber-950" style={{ color: isSelected ? "#8b0000" : era.color }}>
                                      {language === "zh" ? `纪元 AD ${era.yearRange}` : `Era AD ${era.yearRange}`}
                                    </span>
                                    <span className={`text-sm font-serif font-black block truncate leading-snug transition-colors duration-300 ${
                                      isSelected ? "text-[#8b0000] tracking-wide" : "text-[#3a2c1b]"
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
                                      transition={{ duration: 0.25 }}
                                      className="overflow-hidden pl-12 pr-2"
                                    >
                                      {/* Decorative thin curly bracket connect line */}
                                      <div className="py-2 border-l-2 border-[#8e724b]/30 pl-4 space-y-2 relative">
                                        {/* Decorative small metal leaf connector */}
                                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#dbbe8b] border border-[#3a2c1b]/40 shadow-xs" />

                                        {era.subTrack.map((event, idx) => {
                                          const runes = ["ᚱ", "ᚦ", "ᛒ", "ᚼ", "ᛅ", "ᛋ"];
                                          const rune = runes[idx % runes.length];
                                          const isEventSelected = selectedTimelineEvent?.year === event.year;

                                          return (
                                            <button
                                              key={idx}
                                              onClick={() => setSelectedTimelineEvent(event)}
                                              className={`w-full text-left p-2 rounded-lg transition-all flex items-start justify-between gap-2 border ${
                                                isEventSelected
                                                  ? "bg-[#ecd5a9] border-[#a88a59] shadow-md scale-[1.01] translate-x-0.5"
                                                  : "border-transparent hover:bg-[#3a2c1b]/10 hover:border-[#3a2c1b]/15"
                                              } group/item cursor-pointer`}
                                            >
                                              <div className="min-w-0 flex-1">
                                                <span className={`inline-block text-[9px] font-mono font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider mr-2 border ${
                                                  isEventSelected 
                                                    ? "bg-[#8b0000] text-[#f3e5c8] border-[#8b0000]" 
                                                    : "bg-[#8b0000]/10 text-[#8b0000] border-[#8b0000]/20"
                                                }`}>
                                                  {event.year}
                                                </span>
                                                <span className={`text-xs font-serif font-black transition-colors leading-tight block mt-1 ${
                                                  isEventSelected ? "text-[#8b0000] italic" : "text-[#3a2c1b] group-hover/item:text-[#8b0000]"
                                                }`}>
                                                  {event.title[language]}
                                                </span>
                                              </div>
                                              
                                              {/* Holy Monk Monogram Runic Stamp */}
                                              <div className={`w-5 h-5 rounded-sm flex items-center justify-center border text-[10px] font-mono font-bold transition-all shrink-0 ${
                                                isEventSelected 
                                                  ? "bg-[#8b0000] text-white border-[#dbbe8b] shadow-sm rotate-12" 
                                                  : "bg-[#c8a67a]/20 text-[#8e724b] border-[#3a2c1b]/10 group-hover/item:border-[#8b0000]/30"
                                              }`}>
                                                {rune}
                                              </div>
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
                      <div className="mt-2 p-2 border border-[#3a2c1b]/10 bg-[#c8a67a]/20 rounded-lg shrink-0">
                        <p className="text-[10px] italic text-[#3a2c1b] leading-relaxed">
                          {UI_TRANSLATIONS[language].sovereignSub}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* ================== STANDARD CHAPTER PROSE WRITING ================== */
                    <div className="flex-1 flex flex-col justify-between h-full relative z-10">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Chapter Meta */}
                          <div className="flex items-center justify-between text-[#3a2c1b] opacity-70 font-mono text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1 sm:mb-2">
                            <span>Capitulum {activeChapterIndex + 1} — {language === "zh" ? "古籍手卷" : "The Folio"}</span>
                            <span className="text-[#8b0000] font-bold">{activeChapter.era}</span>
                          </div>

                          {/* Main Gothic Chapter Title */}
                          <h2 className="font-gothic text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#3a2c1b] tracking-wide mb-1 text-center select-text" style={{ filter: "drop-shadow(1px 1px 0px rgba(255,255,255,0.3))" }}>
                            {activeChapter.gothicTitle}
                          </h2>

                          {/* Runic subtitle block */}
                          <div className="flex flex-col items-center mb-1.5 sm:mb-2.5">
                            <span className="font-mono text-[10px] sm:text-xs text-[#3a2c1b] opacity-80 tracking-[0.2em] sm:tracking-[0.3em] font-semibold text-center select-text">
                              {activeChapter.runicSubtitle}
                            </span>
                            <div className="h-0.5 w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#3a2c1b]/30 to-transparent mt-1" />
                          </div>

                          {/* Sub-page Specific Title */}
                          <div className="text-center mb-2">
                            <span className="font-serif italic text-xs sm:text-sm text-[#8b0000] font-black tracking-wide">
                              — {activePage.title} —
                            </span>
                          </div>

                          {/* Scrollable paragraph content container to guarantee same height */}
                          <div className="overflow-y-auto max-h-[240px] sm:max-h-[340px] md:max-h-[400px] pr-1.5 custom-scrollbar select-text mt-1">
                            <div className="space-y-3 font-serif text-[13.5px] sm:text-[14.5px] md:text-[15.5px] lg:text-[16px] leading-relaxed text-[#3a2c1b]">
                              {activePage.paragraphs.map((p, idx) => (
                                <p key={idx} className="first-letter:float-left first-letter:text-4xl sm:first-letter:text-5xl md:first-letter:text-6xl first-letter:leading-[0.85] first-letter:mr-2 first-letter:mt-0.5 first-letter:font-black first-letter:text-[#8b0000] first-letter:font-gothic text-justify">
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

              {/* Little water stain decoration */}
              <div className="absolute right-4 bottom-4 w-12 h-12 bg-[#c8a67a] opacity-10 rounded-full blur-xl pointer-events-none" />

              {/* Left Page Turn Button (Retro Brass Corner Ribbon) */}
              <button
                onClick={handlePrevPage}
                className="absolute left-0 bottom-0 w-12 h-12 group cursor-pointer overflow-hidden rounded-bl-xl sm:rounded-bl-2xl z-30 flex items-end justify-start focus:outline-none"
                title={UI_TRANSLATIONS[language].prevFolio}
              >
                {/* Visual metal leaf / triangle corner */}
                <div className="absolute w-full h-full bg-[#3a2c1b]/5 group-hover:bg-[#3a2c1b]/10 transition-colors duration-300 pointer-events-none" />
                <div className="absolute w-10 h-10 bg-[#8e724b]/40 border-r border-t border-[#3a2c1b]/40 rotate-45 -translate-x-5 translate-y-5 group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-300 shadow-[2px_-2px_6px_rgba(0,0,0,0.15)] pointer-events-none" />
                <ChevronLeft className="w-4 h-4 text-[#3a2c1b]/70 group-hover:text-[#8b0000] relative m-1.5 z-40 transition-colors" />
              </button>
            </div>
            )}

            {/* RIGHT PAGE with 3D Turn Animation around the spine */}
            {showDirectory ? (
              <div className="right-page-immersive rounded-xl lg:rounded-r-2xl lg:rounded-l-none p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[480px] sm:min-h-[550px] lg:h-[700px] relative overflow-hidden">
                {/* Premium Gilded Decorative Corners */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-l-2 border-[#c5a870] opacity-80 pointer-events-none" />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-r-2 border-[#c5a870] opacity-80 pointer-events-none" />
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-l-2 border-[#c5a870] opacity-80 pointer-events-none" />
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-r-2 border-[#c5a870] opacity-80 pointer-events-none" />

                {/* Monastic Double Gilded Frame */}
                <div className="absolute inset-2 sm:inset-3 border border-[#c5a870]/30 rounded-lg pointer-events-none" />
                <div className="absolute inset-[11px] sm:inset-[15px] border border-[#dbbe8b]/20 rounded-lg pointer-events-none border-dashed" />

                {/* Viking Longship Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] mix-blend-multiply select-none z-0">
                  <svg viewBox="0 0 200 200" className="w-96 h-96 text-[#3a2c1b]">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </div>

                <div className="flex flex-col items-center justify-center relative z-10 w-full h-full my-auto">
                  {/* Illustration Panel Header */}
                  <div className="w-full flex items-center justify-between mb-4 border-b border-[#3a2c1b]/20 pb-2 select-none">
                    <h3 className="text-sm font-bold italic text-[#3a2c1b]">
                      {language === "zh" ? "手卷扉页画卷" : "Chronicle Frontispiece"}
                    </h3>
                    <span className="text-[10px] font-mono text-[#8e724b]/80 uppercase tracking-widest font-bold">
                      {language === "zh" ? "英格兰编年史" : "Illuminated Codex"}
                    </span>
                  </div>

                  {/* Carved Wood/Bronze Picture Frame */}
                  <div className="relative w-full max-w-[280px] sm:max-w-[400px] aspect-[3/4] bg-[#281d12] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-xl border-2 border-[#5a422d] group">
                    <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative border border-[#1c120a] bg-stone-900 shadow-inner">
                      <img
                        src="/src/assets/images/viking_timeline_1784019399632.jpg"
                        alt="The Viking Chronicle Frontispiece"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />

                      {/* Low-saturation old-photo look */}
                      <div className="absolute inset-0 bg-amber-900/10 mix-blend-color pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                    </div>
                  </div>

                  {/* Decorative caption below image */}
                  <div className="mt-4 text-center select-none max-w-[280px] sm:max-w-[400px]">
                    <span className="text-[10px] font-serif italic text-[#3a2c1b]/60 block leading-normal">
                      {language === "zh" 
                        ? "“林迪斯法恩圣岛劫掠与征服之始 (公元 793 年)”" 
                        : "“The Raid on Lindisfarne & The Dawn of Conquest (793 AD)”"}
                    </span>
                  </div>
                </div>

                {/* Right Page Turn Button (Retro Brass Corner Ribbon) */}
                <button
                  onClick={handleNextPage}
                  className="absolute right-0 bottom-0 w-12 h-12 group cursor-pointer overflow-hidden rounded-br-xl sm:rounded-br-2xl z-30 flex items-end justify-end focus:outline-none"
                  title={UI_TRANSLATIONS[language].nextFolio}
                >
                  <div className="absolute w-full h-full bg-[#3a2c1b]/5 group-hover:bg-[#3a2c1b]/10 transition-colors duration-300 pointer-events-none" />
                  <div className="absolute w-10 h-10 bg-[#8e724b]/40 border-l border-t border-[#3a2c1b]/40 rotate-45 translate-x-5 translate-y-5 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300 shadow-[-2px_-2px_6px_rgba(0,0,0,0.15)] pointer-events-none" />
                  <ChevronRight className="w-4 h-4 text-[#3a2c1b]/70 group-hover:text-[#8b0000] relative m-1.5 z-40 transition-colors" />
                </button>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl lg:rounded-r-2xl lg:rounded-l-none" style={{ perspective: 1200 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${activeChapterIndex}-${activePageIndex}`}
                  initial={{ 
                    opacity: 0.1, 
                    rotateY: pageDirection === "next" ? 75 : -75,
                    scale: 0.94,
                    x: pageDirection === "next" ? 25 : -25
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0,
                    scale: 1,
                    x: 0
                  }}
                  exit={{ 
                    opacity: 0.1, 
                    rotateY: pageDirection === "next" ? -75 : 75,
                    scale: 0.94,
                    x: pageDirection === "next" ? -25 : 25
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 110,
                    damping: 22,
                    mass: 0.8
                  }}
                  style={{ 
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden" 
                  }}
                  className="right-page-immersive rounded-xl lg:rounded-r-2xl lg:rounded-l-none p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[480px] sm:min-h-[550px] lg:h-[700px] relative overflow-hidden"
                >
                  
                  {/* Premium Gilded Decorative Corners */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-l-2 border-[#c5a870] opacity-80 pointer-events-none" />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-r-2 border-[#c5a870] opacity-80 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-l-2 border-[#c5a870] opacity-80 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-r-2 border-[#c5a870] opacity-80 pointer-events-none" />

                  {/* Monastic Double Gilded Frame */}
                  <div className="absolute inset-2 sm:inset-3 border border-[#c5a870]/30 rounded-lg pointer-events-none" />
                  <div className="absolute inset-[11px] sm:inset-[15px] border border-[#dbbe8b]/20 rounded-lg pointer-events-none border-dashed" />

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

                  {activePage.isTimelineComponent ? (
                    /* ================== CHAPTER 2 TIMELINE EVENT DETAIL DISPLAY ================== */
                    (() => {
                      const currentEvent = selectedTimelineEvent || TIMELINE_ERAS[0].subTrack[0];
                      const currentEventImage = timelineEventImages[currentEvent.year] || "/src/assets/images/viking_timeline_1784019399632.jpg";

                      return (
                        <div className="w-full flex-1 flex flex-col justify-between h-full select-none relative z-10" id="timeline-detail-module">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              {/* Event Header */}
                              <div className="mb-2 pb-1 border-b border-[#3a2c1b]/20 flex items-center justify-between">
                                <span className="text-[10px] font-mono font-black text-[#8b0000] bg-[#8b0000]/10 px-2.5 py-0.5 rounded uppercase tracking-widest">
                                  {currentEvent.year}
                                </span>
                                <span className="text-[9px] font-mono font-bold text-[#8e724b] uppercase tracking-widest">
                                  {language === "zh" ? "历史纪事详析" : "Chronology Details"}
                                </span>
                              </div>

                              {/* Event Title */}
                              <h4 className="font-gothic text-base sm:text-lg md:text-xl font-black text-[#3a2c1b] tracking-wide mb-2 sm:mb-3 text-center leading-snug select-text">
                                {currentEvent.title[language]}
                              </h4>

                              {/* Interactive Event Illustration - Landscape and Enlarged */}
                              <div className="relative aspect-[16/10] w-[180px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[350px] mx-auto bg-[#281d12] p-1.5 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.5)] border-2 border-[#5a422d]/60 group mb-3 sm:mb-4 shrink-0 transition-all duration-300 hover:border-[#dbbe8b]">
                                <div className="w-full h-full rounded-lg overflow-hidden relative border border-[#1c120a] bg-stone-900 shadow-inner">
                                  <img
                                    src={currentEventImage}
                                    alt={currentEvent.title[language]}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.05]"
                                  />
                                  <div className="absolute inset-0 bg-amber-900/10 mix-blend-color pointer-events-none" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                                  
                                  {/* Configure Illustration Button */}
                                  <button
                                    onClick={() => {
                                      setEditingTimelineYear(currentEvent.year);
                                      setTempTimelineImageUrl(currentEventImage);
                                      setIsEditingTimelineImage(true);
                                    }}
                                    className="absolute bottom-2 right-2 flex items-center gap-1 text-[9px] sm:text-[10px] bg-black/75 hover:bg-black/90 text-[#dbbe8b] font-serif font-bold transition-all px-2.5 py-1 rounded border border-[#dbbe8b]/30 cursor-pointer z-10 shadow-md opacity-80 hover:opacity-100"
                                  >
                                    <ImageIcon className="w-3 h-3" />
                                    <span>{language === "zh" ? "配置配图" : "Configure Image"}</span>
                                  </button>
                                </div>
                              </div>

                              {/* Sovereigns comparison boxes */}
                              <div className="grid grid-cols-2 gap-2 mb-2 sm:mb-3 shrink-0">
                                {/* Anglo-Saxon King */}
                                <div className="bg-[#c8a67a]/20 border border-[#3a2c1b]/15 p-1 sm:p-2 rounded-lg sm:rounded-xl text-center">
                                  <span className="text-[7px] sm:text-[8px] font-mono uppercase text-[#3a2c1b]/60 block mb-0.5 font-bold tracking-wider">
                                    {UI_TRANSLATIONS[language].saxonKing}
                                  </span>
                                  <span className="text-[10px] sm:text-xs font-serif font-black text-emerald-950 block truncate leading-tight">
                                    {currentEvent.saxons[language]}
                                  </span>
                                </div>

                                {/* Viking Chieftain */}
                                <div className="bg-[#c8a67a]/20 border border-[#3a2c1b]/15 p-1 sm:p-2 rounded-lg sm:rounded-xl text-center">
                                  <span className="text-[7px] sm:text-[8px] font-mono uppercase text-[#3a2c1b]/60 block mb-0.5 font-bold tracking-wider">
                                    {UI_TRANSLATIONS[language].vikingKing}
                                  </span>
                                  <span className="text-[10px] sm:text-xs font-serif font-black text-red-950 block truncate leading-tight">
                                    {currentEvent.vikings[language]}
                                  </span>
                                </div>
                              </div>

                              {/* Detailed Content / Text Analysis - Larger scroll box on desktop */}
                              <div className="overflow-y-auto h-[100px] sm:h-[135px] md:h-[155px] lg:h-[190px] xl:h-[230px] pr-1.5 custom-scrollbar select-text bg-[#c8a67a]/15 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#3a2c1b]/15">
                                <span className="text-[8px] sm:text-[9px] font-mono uppercase text-[#8e724b] block mb-1 font-bold tracking-wider">
                                  {language === "zh" ? "✦ 史实详析与人物介绍" : "✦ Historical Analysis & Characters"}
                                </span>
                                <p className="font-serif text-[11px] sm:text-xs leading-relaxed text-[#3a2c1b] text-justify whitespace-pre-line">
                                  {currentEvent.details[language]}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Inline configuration dialog/overlay if editing */}
                          <AnimatePresence>
                            {isEditingTimelineImage && (
                              <div className="absolute inset-0 bg-[#0c0804]/95 backdrop-blur-xs flex items-center justify-center p-4 z-30 rounded-2xl">
                                <motion.div
                                  initial={{ scale: 0.95, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.95, opacity: 0 }}
                                  className="w-full max-w-[340px] bg-[#ecd5a9] rounded-xl border-2 border-[#5a422d] p-4 relative flex flex-col justify-between"
                                >
                                  <div>
                                    <h5 className="font-gothic text-sm text-[#8b0000] tracking-wider mb-2 text-center">
                                      {language === "zh" ? `配置 ${editingTimelineYear} 史实配图` : `Configure Image for ${editingTimelineYear}`}
                                    </h5>
                                    <p className="text-[10px] font-serif text-[#3a2c1b]/70 mb-3 text-center leading-tight">
                                      {language === "zh" 
                                        ? "请输入该事件在羊皮卷轴中展示的插图的网络链接。" 
                                        : "Please input the image URL to represent this specific event in the scroll."}
                                    </p>
                                    
                                    <input
                                      type="text"
                                      value={tempTimelineImageUrl}
                                      onChange={(e) => setTempTimelineImageUrl(e.target.value)}
                                      placeholder="https://example.com/image.jpg"
                                      className="w-full px-2.5 py-1.5 text-xs bg-[#f4ebd0] border border-[#5a422d]/40 rounded-lg text-[#3a2c1b] font-mono focus:outline-none focus:border-[#8b0000] mb-3"
                                    />
                                    
                                    {tempTimelineImageUrl && (
                                      <div className="w-full h-[100px] rounded-lg overflow-hidden border border-[#5a422d]/20 mb-3 bg-stone-900">
                                        <img
                                          src={tempTimelineImageUrl}
                                          alt="Preview"
                                          referrerPolicy="no-referrer"
                                          className="w-full h-full object-cover"
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/src/assets/images/viking_timeline_1784019399632.jpg";
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex gap-2 justify-end">
                                    <button
                                      onClick={() => {
                                        setIsEditingTimelineImage(false);
                                        setEditingTimelineYear("");
                                        setTempTimelineImageUrl("");
                                      }}
                                      className="px-3 py-1 bg-transparent hover:bg-black/5 text-[#3a2c1b] border border-[#3a2c1b]/30 rounded text-xs font-serif transition-all cursor-pointer"
                                    >
                                      {language === "zh" ? "取消" : "Cancel"}
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleUpdateTimelineEventImage(editingTimelineYear, tempTimelineImageUrl);
                                        setIsEditingTimelineImage(false);
                                        setEditingTimelineYear("");
                                        setTempTimelineImageUrl("");
                                      }}
                                      className="px-3 py-1 bg-[#8b0000] text-[#f3e5c8] rounded text-xs font-serif font-bold hover:brightness-110 transition-all cursor-pointer"
                                    >
                                      {language === "zh" ? "保存配置" : "Save Image"}
                                    </button>
                                  </div>
                                </motion.div>
                              </div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })()
                  ) : (
                    /* ================== STANDARD HOTSPOTS INTERFACE ================== */
                    <>
                      <div className="flex flex-col items-center relative z-10 w-full">
                        {/* Illustration Panel Header */}
                        <div className="w-full flex items-center justify-between mb-4 border-b border-[#3a2c1b]/20 pb-2 select-none">
                          <h3 className="text-sm font-bold italic text-[#3a2c1b]">
                            {language === "zh" ? "古籍插画" : "Manuscript Illustration"}
                          </h3>
                          <span className="text-[10px] font-mono text-[#8e724b]/80 uppercase tracking-widest font-bold">
                            {language === "zh" ? "画卷详析" : "Illumination details"}
                          </span>
                        </div>

                        {/* Carved Wood/Bronze Picture Frame */}
                        <div className="relative w-full max-w-[280px] sm:max-w-[400px] aspect-[3/4] bg-[#281d12] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#5a422d] group">
                          <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative border border-[#1c120a] bg-stone-900">
                            <img
                              src={activeImage}
                              alt={activeChapter.englishTitle}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />

                            {/* Low-saturation old-photo look */}
                            <div className="absolute inset-0 bg-amber-900/10 mix-blend-color pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

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
                                    className="relative flex items-center justify-center w-6 h-6 -ml-3 -mt-3 focus:outline-none"
                                  >
                                    <span className="pulse-circle w-10 h-10 -ml-5 -mt-5" />
                                    <motion.span
                                      animate={{ scale: isActive ? [1, 1.25, 1] : 1 }}
                                      transition={{ repeat: isActive ? Infinity : 0, duration: 1.5 }}
                                      className={`relative z-10 w-4 h-4 rounded-full border-2 text-[10px] font-bold flex items-center justify-center shadow-md transition-all ${
                                        isActive
                                          ? "bg-[#8b0000] border-[#dbbe8b] text-[#dbbe8b] scale-125"
                                          : "bg-[#2c1b12]/90 border-[#8e724b] text-[#dbbe8b] hover:bg-[#8b0000] hover:border-amber-400"
                                      }`}
                                    >
                                      ⚔️
                                    </motion.span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Legend / Explanation display box below image */}
                      <div className="mt-3 sm:mt-4 border-t border-[#8e724b]/20 pt-2 sm:pt-4 h-[100px] sm:h-[120px] flex flex-col justify-between relative z-10 w-full">
                        <AnimatePresence mode="wait">
                          {selectedHotspot ? (
                            <motion.div
                              key={selectedHotspot.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="bg-[#c8a67a]/20 border border-[#3a2c1b]/15 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm relative text-[#3a2c1b] select-text h-full overflow-y-auto custom-scrollbar"
                            >
                              <button
                                onClick={() => setSelectedHotspot(null)}
                                className="absolute top-2 right-2 text-neutral-500 hover:text-[#8b0000] focus:outline-none"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <h4 className="font-gothic text-sm text-[#8b0000] tracking-wider mb-1 font-black">
                                {language === "zh" ? ((selectedHotspot as any).nameZh || selectedHotspot.name) : selectedHotspot.name}
                              </h4>
                              <p className="font-serif text-[11px] leading-relaxed text-[#3a2c1b]">
                                {language === "zh" ? ((selectedHotspot as any).descriptionZh || selectedHotspot.description) : selectedHotspot.description}
                              </p>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="no-selection"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex flex-col items-center justify-center py-4 text-center h-full"
                            >
                              <Compass className="w-5 h-5 text-[#8e724b]/50 mb-1 animate-pulse" />
                              <p className="font-serif italic text-[11px] text-neutral-500 max-w-[280px]">
                                {UI_TRANSLATIONS[language].legendPlaceholder}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}

                  {/* Right Page Turn Button (Retro Brass Corner Ribbon) */}
                  <button
                    onClick={handleNextPage}
                    className="absolute right-0 bottom-0 w-12 h-12 group cursor-pointer overflow-hidden rounded-br-xl sm:rounded-br-2xl z-30 flex items-end justify-end focus:outline-none"
                    title={UI_TRANSLATIONS[language].nextFolio}
                  >
                    {/* Visual metal leaf / triangle corner */}
                    <div className="absolute w-full h-full bg-[#3a2c1b]/5 group-hover:bg-[#3a2c1b]/10 transition-colors duration-300 pointer-events-none" />
                    <div className="absolute w-10 h-10 bg-[#8e724b]/40 border-l border-t border-[#3a2c1b]/40 rotate-45 translate-x-5 translate-y-5 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300 shadow-[-2px_-2px_6px_rgba(0,0,0,0.15)] pointer-events-none" />
                    <ChevronRight className="w-4 h-4 text-[#3a2c1b]/70 group-hover:text-[#8b0000] relative m-1.5 z-40 transition-colors" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
            )}

            {/* Elegant Gilded Book Spine (Middle crease) with Exquisite Gold Ridges */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-6 -ml-3 bg-gradient-to-r from-[#1c120a] via-[#3d2716] to-[#1c120a] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] z-30 pointer-events-none">
              {/* Left Gold Gilded Line */}
              <div className="absolute left-[1px] top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#a88a59] via-[#ffd700] to-[#a88a59] opacity-75" />
              {/* Right Gold Gilded Line */}
              <div className="absolute right-[1px] top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#a88a59] via-[#ffd700] to-[#a88a59] opacity-75" />
              {/* Center Embossed Gold Spine Ridge */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2.5px] -ml-[1.25px] bg-gradient-to-b from-[#dfba6b] via-[#ffe699] to-[#dfba6b] opacity-90 shadow-[0_0_4px_rgba(255,215,0,0.6)]" />
              {/* Subtle metallic studs / binder rivets */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#ffe89c] to-[#997d4c] border border-black/30 shadow-sm" />
              <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#ffe89c] to-[#997d4c] border border-black/30 shadow-sm" />
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#ffe89c] to-[#997d4c] border border-black/30 shadow-sm" />
              <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#ffe89c] to-[#997d4c] border border-black/30 shadow-sm" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#ffe89c] to-[#997d4c] border border-black/30 shadow-sm" />
            </div>
          </div>
        </div>
      </main>

      {/* MODULAR COMPONENT SIDEBARS */}

      <AdminConsole
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        language={language}
        illustrationOverrides={illustrationOverrides}
        customHotspots={customHotspots}
        onSave={handleSaveAdminConfig}
      />

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
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gradient-to-r from-[#2a1b10] via-[#432d1c] to-[#2a1b10] border-2 border-[#dbbe8b] px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer select-none active:scale-95 transition-transform"
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
            
            <div className="flex flex-col">
              <span className="text-[11px] font-serif font-black text-[#f3e5c8] leading-none">
                {language === "zh" ? "↓ 已经滑到底部，即将自动翻页..." : "↓ Reached end, turning page soon..."}
              </span>
              <span className="text-[8px] font-mono text-[#dbbe8b]/70 mt-0.5 leading-none">
                {language === "zh" ? "点击此处可直接翻开新篇章" : "Click here to turn page immediately"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { Chapter, Hotspot } from "../types";
import { CHAPTERS_DATA } from "../data";
import { CHAPTERS_DATA_ZH } from "../data_zh";
import {
  Settings,
  Upload,
  Link as LinkIcon,
  Plus,
  Trash2,
  Save,
  X,
  RefreshCw,
  Image as ImageIcon,
  Check,
  Compass,
  ArrowLeft,
  ChevronRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "zh";
  illustrationOverrides: { [key: string]: string };
  customHotspots: { [chapterId: string]: Hotspot[] };
  onSave: (overrides: { [key: string]: string }, hotspots: { [chapterId: string]: Hotspot[] }) => void;
}

export default function AdminConsole({
  isOpen,
  onClose,
  language,
  illustrationOverrides,
  customHotspots,
  onSave
}: AdminConsoleProps) {
  // Use CHAPTERS_DATA as base template
  const baseChapters = CHAPTERS_DATA;

  // Local state copy
  const [localOverrides, setLocalOverrides] = useState<{ [key: string]: string }>({});
  const [localHotspots, setLocalHotspots] = useState<{ [chapterId: string]: Hotspot[] }>({});
  
  // Active selected chapter index
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Active selected sub-page index
  const [activePageIdx, setActivePageIdx] = useState(0);

  useEffect(() => {
    setActivePageIdx(0);
  }, [selectedIdx]);

  // Active selected hotspot id (for editing)
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);

  // Tracks if there are unsaved configurations
  const [isDirty, setIsDirty] = useState(false);

  // Active dragging hotspot id
  const [draggingHotspotId, setDraggingHotspotId] = useState<string | null>(null);

  // Temporary success/notification banner message
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Hotspot form state
  const [hotspotForm, setHotspotForm] = useState<{
    id: string;
    name: string;
    nameZh: string;
    description: string;
    descriptionZh: string;
    x: number;
    y: number;
  }>({
    id: "",
    name: "",
    nameZh: "",
    description: "",
    descriptionZh: "",
    x: 50,
    y: 50
  });

  // Image inputs state
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial props to local states
  useEffect(() => {
    if (isOpen) {
      setLocalOverrides({ ...illustrationOverrides });
      
      // Deep copy custom hotspots or fall back to defaults
      const initialHotspots: { [chapterId: string]: Hotspot[] } = {};
      baseChapters.forEach((ch) => {
        if (customHotspots[ch.id]) {
          initialHotspots[ch.id] = JSON.parse(JSON.stringify(customHotspots[ch.id]));
        } else {
          // Find matching Chinese chapter to get Chinese hotspot names if possible
          const zhCh = CHAPTERS_DATA_ZH.find((z) => z.id === ch.id);
          
          // Construct combined representation
          initialHotspots[ch.id] = ch.hotspots.map((h) => {
            const zhH = zhCh?.hotspots.find((zh) => zh.id === h.id);
            return {
              id: h.id,
              name: h.name,
              nameZh: zhH?.name || h.name,
              description: h.description,
              descriptionZh: zhH?.description || h.description,
              x: h.x,
              y: h.y
            };
          });
        }
      });
      setLocalHotspots(initialHotspots);
      setSelectedIdx(0);
      setSelectedHotspotId(null);
      setIsDirty(false);
    }
  }, [isOpen, illustrationOverrides, customHotspots]);

  // Clean form when changing chapter or selected hotspot
  useEffect(() => {
    const ch = baseChapters[selectedIdx];
    const hotspots = localHotspots[ch.id] || [];
    
    if (selectedHotspotId) {
      const found = hotspots.find((h) => h.id === selectedHotspotId);
      if (found) {
        setHotspotForm({
          id: found.id,
          name: found.name,
          nameZh: (found as any).nameZh || found.name,
          description: found.description,
          descriptionZh: (found as any).descriptionZh || found.description,
          x: found.x ?? 50,
          y: found.y ?? 50
        });
        return;
      }
    }

    // Reset to empty for creating new
    setHotspotForm({
      id: `hotspot_${Date.now()}`,
      name: "",
      nameZh: "",
      description: "",
      descriptionZh: "",
      x: 50,
      y: 50
    });
  }, [selectedIdx, selectedHotspotId, localHotspots]);

  if (!isOpen) return null;

  const activeChapter = baseChapters[selectedIdx];
  const activePage = activeChapter.pages[activePageIdx];
  const activeImageKey = activeChapter.id + "_" + activePage.id;
  const activeImage = localOverrides[activeImageKey] || localOverrides[activeChapter.id] || activePage.image;
  const activeHotspotsList = localHotspots[activeChapter.id] || [];

  // Compress image helper using HTML5 Canvas to keep local storage small
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          
          const MAX_DIM = 800; // Limit size to 800px max
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.7); // 70% quality jpeg
            resolve(compressed);
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => reject(new Error("Image load error"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsDataURL(file);
    });
  };

  // Handles image file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    try {
      if (file.size > 8 * 1024 * 1024) {
        throw new Error("File size exceeds 8MB limit.");
      }
      const base64Url = await compressImage(file);
      setLocalOverrides((prev) => ({ ...prev, [activeImageKey]: base64Url }));
      setIsDirty(true);
    } catch (err: any) {
      setUploadError(err.message || "Failed to process image.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handles pasting an Image URL
  const handleApplyUrl = () => {
    if (!imageUrlInput.trim()) return;
    setLocalOverrides((prev) => ({ ...prev, [activeImageKey]: imageUrlInput.trim() }));
    setImageUrlInput("");
    setIsDirty(true);
  };

  // Resets the chapter illustration to default
  const handleResetIllustration = () => {
    const updated = { ...localOverrides };
    delete updated[activeImageKey];
    setLocalOverrides(updated);
    setIsDirty(true);
  };

  // Capture coordinate percentage from clicking on the image canvas
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    
    // Calculate click coordinates as percentages (0 to 100)
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Bound coordinates
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setHotspotForm((prev) => ({ ...prev, x: boundedX, y: boundedY }));

    // If editing an existing hotspot, immediately update its coordinates so it moves instantly
    if (selectedHotspotId) {
      setLocalHotspots((prev) => {
        const list = prev[activeChapter.id] || [];
        const updated = list.map((item) => {
          if (item.id === selectedHotspotId) {
            return { ...item, x: boundedX, y: boundedY };
          }
          return item;
        });
        return { ...prev, [activeChapter.id]: updated };
      });
      setIsDirty(true);
    }
  };

  // Drag handlers
  const handleMarkerMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedHotspotId(id);
    setDraggingHotspotId(id);
  };

  const handleMarkerTouchStart = (e: React.TouchEvent, id: string) => {
    e.stopPropagation();
    setSelectedHotspotId(id);
    setDraggingHotspotId(id);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingHotspotId || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setHotspotForm((prev) => ({ ...prev, x: boundedX, y: boundedY }));

    setLocalHotspots((prev) => {
      const list = prev[activeChapter.id] || [];
      const updated = list.map((item) => {
        if (item.id === draggingHotspotId) {
          return { ...item, x: boundedX, y: boundedY };
        }
        return item;
      });
      return { ...prev, [activeChapter.id]: updated };
    });
    setIsDirty(true);
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!draggingHotspotId || !imageRef.current || e.touches.length === 0) return;
    const rect = imageRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    
    const x = Math.round(((touch.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((touch.clientY - rect.top) / rect.height) * 100);

    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setHotspotForm((prev) => ({ ...prev, x: boundedX, y: boundedY }));

    setLocalHotspots((prev) => {
      const list = prev[activeChapter.id] || [];
      const updated = list.map((item) => {
        if (item.id === draggingHotspotId) {
          return { ...item, x: boundedX, y: boundedY };
        }
        return item;
      });
      return { ...prev, [activeChapter.id]: updated };
    });
    setIsDirty(true);
  };

  const handleCanvasMouseUp = () => {
    if (draggingHotspotId) {
      setDraggingHotspotId(null);
    }
  };

  // Real-time keyboard input adjusters
  const handleXChange = (val: number) => {
    const boundedX = Math.max(0, Math.min(100, val));
    setHotspotForm((prev) => ({ ...prev, x: boundedX }));
    if (selectedHotspotId) {
      setLocalHotspots((prev) => {
        const list = prev[activeChapter.id] || [];
        const updated = list.map((item) => {
          if (item.id === selectedHotspotId) {
            return { ...item, x: boundedX };
          }
          return item;
        });
        return { ...prev, [activeChapter.id]: updated };
      });
      setIsDirty(true);
    }
  };

  const handleYChange = (val: number) => {
    const boundedY = Math.max(0, Math.min(100, val));
    setHotspotForm((prev) => ({ ...prev, y: boundedY }));
    if (selectedHotspotId) {
      setLocalHotspots((prev) => {
        const list = prev[activeChapter.id] || [];
        const updated = list.map((item) => {
          if (item.id === selectedHotspotId) {
            return { ...item, y: boundedY };
          }
          return item;
        });
        return { ...prev, [activeChapter.id]: updated };
      });
      setIsDirty(true);
    }
  };

  // Saves or appends a hotspot to the local copy
  const handleSaveHotspot = () => {
    const finalNameZh = hotspotForm.nameZh.trim() || hotspotForm.name.trim();
    const finalNameEn = hotspotForm.name.trim() || hotspotForm.nameZh.trim();

    if (!finalNameZh && !finalNameEn) {
      alert(language === "zh" ? "请输入热点名称！" : "Please enter a hotspot name!");
      return;
    }

    const finalDescZh = hotspotForm.descriptionZh.trim() || hotspotForm.description.trim() || (language === "zh" ? "暂无描述" : "No description");
    const finalDescEn = hotspotForm.description.trim() || hotspotForm.descriptionZh.trim() || "No description";

    const newHotspot: Hotspot = {
      id: hotspotForm.id || `hotspot_${Date.now()}`,
      name: finalNameEn,
      description: finalDescEn,
      x: hotspotForm.x,
      y: hotspotForm.y,
      ...({
        nameZh: finalNameZh,
        descriptionZh: finalDescZh
      } as any)
    };

    const chapterHotspots = [...activeHotspotsList];
    const index = chapterHotspots.findIndex((h) => h.id === newHotspot.id);

    if (index >= 0) {
      chapterHotspots[index] = newHotspot;
    } else {
      chapterHotspots.push(newHotspot);
    }

    setLocalHotspots((prev) => ({ ...prev, [activeChapter.id]: chapterHotspots }));
    setSelectedHotspotId(null); // Reset form to 'new hotspot' mode
    setIsDirty(true);

    // Provide a beautiful, non-blocking notification instead of an annoying alert dialog
    const msg = language === "zh"
      ? `✨ 点位「${finalNameZh}」已成功暂存！别忘了点击上方绿色【保存所有更改】以永久保存。`
      : `✨ Hotspot "${finalNameEn}" staged successfully! Don't forget to click 'Save All Changes' above.`;
    
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage((prev) => prev === msg ? null : prev);
    }, 4000);
  };

  // Deletes a hotspot
  const handleDeleteHotspot = (id: string) => {
    if (!confirm(language === "zh" ? "确定要删除此关键点位吗？" : "Are you sure you want to delete this hotspot?")) {
      return;
    }
    const filtered = activeHotspotsList.filter((h) => h.id !== id);
    setLocalHotspots((prev) => ({ ...prev, [activeChapter.id]: filtered }));
    setIsDirty(true);
    if (selectedHotspotId === id) {
      setSelectedHotspotId(null);
    }
  };

  // Reset all settings for this chapter to initial
  const handleResetChapterAll = () => {
    if (!confirm(language === "zh" ? "确定要重置该篇章的所有自定义配图与点位吗？" : "Are you sure you want to reset this chapter's illustrations and hotspots to default?")) {
      return;
    }

    // Reset illustration
    const updatedOverrides = { ...localOverrides };
    delete updatedOverrides[activeChapter.id];
    setLocalOverrides(updatedOverrides);

    // Reset hotspots
    const updatedHotspots = { ...localHotspots };
    const zhCh = CHAPTERS_DATA_ZH.find((z) => z.id === activeChapter.id);
    updatedHotspots[activeChapter.id] = activeChapter.hotspots.map((h) => {
      const zhH = zhCh?.hotspots.find((zh) => zh.id === h.id);
      return {
        id: h.id,
        name: h.name,
        nameZh: zhH?.name || h.name,
        description: h.description,
        descriptionZh: zhH?.description || h.description,
        x: h.x,
        y: h.y
      };
    });
    setLocalHotspots(updatedHotspots);
    setSelectedHotspotId(null);
    setIsDirty(true);
  };

  const handleCloseAttempt = () => {
    if (isDirty) {
      const confirmExit = confirm(
        language === "zh"
          ? "您有未保存的自定义配置，确定要退出管理后台吗？所有未保存的修改都将丢失。"
          : "You have unsaved custom configurations. Are you sure you want to exit? Unsaved changes will be lost."
      );
      if (!confirmExit) return;
    }
    onClose();
  };

  const handleGlobalSave = () => {
    onSave(localOverrides, localHotspots);
    setIsDirty(false); // Clear dirty state
    alert(language === "zh" ? "配置已成功保存！" : "Configurations saved successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#120a05] text-[#dbbe8b] font-sans flex flex-col h-screen overflow-hidden select-text">
      {/* Admin Panel Header */}
      <header className="bg-[#1c120a] border-b border-[#3a2c1b] px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8b0000] text-white rounded-lg shadow-inner">
            <Settings className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-gothic text-xl sm:text-2xl text-[#f3dfbf] tracking-wider">
              {language === "zh" ? "手抄本数字修道院管理后台" : "Scriptorium Admin Console"}
            </h1>
            <p className="text-xs text-neutral-400 font-serif">
              {language === "zh" ? "自定义配置手抄本插图、微缩彩绘热点与史实注释" : "Configure manuscript illustrations, miniature painting hotspots, and historical glossaries"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleGlobalSave}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white rounded-lg font-serif font-bold transition-all shadow-md cursor-pointer text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{language === "zh" ? "保存所有更改" : "Save All Changes"}</span>
          </button>
          <button
            onClick={handleCloseAttempt}
            className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-all border border-neutral-700 cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "zh" ? "退出" : "Back"}</span>
          </button>
        </div>
      </header>

      {isDirty && (
        <div className="bg-[#8b0000]/90 text-[#f3dfbf] px-6 py-2.5 text-xs text-center font-serif flex items-center justify-center gap-2 border-b border-[#3a2c1b] animate-pulse">
          <span>⚠️ <strong>{language === "zh" ? "您有未保存的自定义修改！" : "Unsaved Custom Configurations!"}</strong> {language === "zh" ? "当前点位和配图修改仅为『临时暂存』。请记得点击右上角的【保存所有更改】绿色按钮，否则退出后将丢失！" : "Your current adjustments are temporarily staged. Remember to click the green 'Save All Changes' button, or they will be lost!"}</span>
        </div>
      )}

      {/* Main Grid Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT COLUMN: Chapter/Folio Selector */}
        <div className="w-full lg:w-72 bg-[#170e07] border-b lg:border-b-0 lg:border-r border-[#3a2c1b] overflow-y-auto p-4 flex flex-col gap-3">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8e724b] font-bold border-b border-[#3a2c1b]/50 pb-2 mb-1">
            {language === "zh" ? "手稿纸草页目录" : "Folio Catalogue"}
          </h2>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 custom-scrollbar pb-2 lg:pb-0">
            {baseChapters.map((ch, idx) => {
              const isSelected = idx === selectedIdx;
              const hasOverride = !!localOverrides[ch.id];
              const hotspotsCount = (localHotspots[ch.id] || []).length;
              const zhCh = CHAPTERS_DATA_ZH[idx];
              
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setSelectedHotspotId(null);
                  }}
                  className={`w-56 lg:w-full flex-shrink-0 flex items-center gap-3 p-3 rounded-xl border transition-all text-left cursor-pointer ${
                    isSelected
                      ? "bg-[#3a2c1b] border-[#dbbe8b] text-white shadow-md"
                      : "bg-[#1f150d]/60 border-transparent hover:bg-[#251b12] text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <div className="w-12 h-16 rounded overflow-hidden bg-stone-950 border border-[#3a2c1b] flex-shrink-0 relative">
                    <img
                      src={localOverrides[ch.id] || ch.defaultImage}
                      alt={ch.englishTitle}
                      className="w-full h-full object-cover"
                    />
                    {hasOverride && (
                      <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black" title="Customized" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono block text-[#8e724b] uppercase font-bold tracking-wider">
                      Folio {idx + 1}
                    </span>
                    <h3 className="font-serif font-black text-xs truncate leading-tight mt-0.5 text-[#f3dfbf]">
                      {language === "zh" ? zhCh.englishTitle : ch.englishTitle}
                    </h3>
                    <p className="text-[10px] truncate opacity-70 mt-1 font-sans">
                      {hotspotsCount} {language === "zh" ? "个关键点位" : "hotspots"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-4 border-t border-[#3a2c1b]/30 hidden lg:block">
            <div className="bg-[#24170d] p-3.5 rounded-xl border border-[#3a2c1b]/50 text-xs flex flex-col gap-2">
              <span className="font-serif font-bold text-[#dbbe8b] flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#8b0000]" />
                {language === "zh" ? "操作指南" : "Instructions"}
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                {language === "zh" 
                  ? "1. 在右侧面板配置篇章的配图。\n2. 点击插图上的任意位置，可直接调整或新建点位的经纬度比例。\n3. 在最右侧表单中输入点位的中英文名称和对应的历史描述。"
                  : "1. Update the folio illustration in the middle.\n2. Click anywhere on the illustration image to relocate or place a hotspot.\n3. Fill in both English and Chinese labels on the right panel form."}
              </p>
              <button
                onClick={handleResetChapterAll}
                className="mt-2 w-full py-1.5 bg-[#8b0000]/20 hover:bg-[#8b0000]/40 text-[#f3dfbf] rounded-lg border border-[#8b0000]/40 text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
              >
                {language === "zh" ? "↩ 重置当前篇章" : "↩ Reset Current Folio"}
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Illustration Viewer & Hotspots Click Canvas */}
        <div className="flex-1 bg-[#120a05] p-4 sm:p-6 overflow-y-auto flex flex-col gap-4">
          <div className="bg-[#1f150d] p-4 rounded-xl border border-[#3a2c1b]/50 shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-mono text-[#8e724b] uppercase font-bold tracking-widest">
                  Folio {selectedIdx + 1} / {baseChapters.length}
                </span>
                <h2 className="font-gothic text-lg sm:text-2xl text-[#f3dfbf] tracking-wide mt-0.5">
                  {language === "zh" ? CHAPTERS_DATA_ZH[selectedIdx].gothicTitle : activeChapter.gothicTitle}
                </h2>
              </div>
              
              <button
                onClick={handleResetIllustration}
                disabled={!localOverrides[activeImageKey]}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-all ${
                  localOverrides[activeImageKey]
                    ? "bg-[#8b0000]/10 border-[#8b0000]/30 text-[#dbbe8b] hover:bg-[#8b0000]/20 cursor-pointer"
                    : "opacity-40 text-neutral-500 border-neutral-800 cursor-not-allowed"
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{language === "zh" ? "恢复默认图片" : "Restore Default Illustration"}</span>
              </button>
            </div>

            {/* Sub-chapters selector (Pages of this chapter) */}
            <div className="flex flex-col gap-1.5 mb-4 pb-3 border-b border-[#3a2c1b]/30">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e724b] font-bold">
                {language === "zh" ? "选择小章节进行图片配置" : "Select Sub-Chapter Page to Configure Image"}
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-[#3a2c1b]/40 overflow-x-auto custom-scrollbar">
                {activeChapter.pages.map((p, pIdx) => {
                  const isPageSelected = pIdx === activePageIdx;
                  const isPageOverridden = !!localOverrides[activeChapter.id + "_" + p.id];
                  const zhPage = CHAPTERS_DATA_ZH[selectedIdx]?.pages[pIdx];
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActivePageIdx(pIdx);
                        setSelectedHotspotId(null);
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-serif font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                        isPageSelected
                          ? "bg-[#8b0000] text-white shadow-inner"
                          : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                      }`}
                    >
                      <span>
                        {language === "zh" ? zhPage?.title || p.title : p.title}
                      </span>
                      {isPageOverridden && (
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" title="Customized image" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Config Box: URL & Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#3a2c1b]/30 pt-4">
              {/* Image URL input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-serif font-bold text-[#f3dfbf] flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-[#8e724b]" />
                  {language === "zh" ? "网页图片链接 (URL)" : "Web Image Link (URL)"}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 bg-black/50 border border-[#3a2c1b] rounded px-3 py-1.5 text-xs text-[#f3dfbf] focus:outline-none focus:border-[#dbbe8b] font-sans"
                  />
                  <button
                    onClick={handleApplyUrl}
                    className="px-3 py-1.5 bg-[#8b0000] hover:bg-[#a21212] text-white rounded text-xs font-serif font-bold transition-all cursor-pointer"
                  >
                    {language === "zh" ? "应用链接" : "Apply"}
                  </button>
                </div>
              </div>

              {/* Local file uploader */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-serif font-bold text-[#f3dfbf] flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5 text-[#8e724b]" />
                  {language === "zh" ? "本地图片上传" : "Local Image Upload"}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 text-xs transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {isUploading
                        ? (language === "zh" ? "正在压缩并上传..." : "Compressing...")
                        : (language === "zh" ? "选择本地图片 (支持拖拽)" : "Choose local image file")}
                    </span>
                  </button>
                </div>
                {uploadError && <p className="text-[10px] text-red-400">{uploadError}</p>}
              </div>
            </div>
          </div>

          {/* Interactive Click Canvas */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-[350px] bg-black/60 rounded-2xl border-2 border-dashed border-[#3a2c1b] p-4 relative group">
            <div className="text-center mb-2 pointer-events-none z-10 bg-black/70 px-3.5 py-1.5 rounded-full border border-[#3a2c1b]/30 text-[10px] font-mono tracking-wider uppercase text-neutral-300">
              {draggingHotspotId ? (
                <span className="text-cyan-400 animate-pulse">
                  {language === "zh" ? "✨ 正在按住拖拽定位中..." : "✨ Dragging/repositioning marker..."}
                </span>
              ) : selectedHotspotId ? (
                <span className="text-amber-400">
                  {language === "zh" ? "📍 已选中点位。在地图上直接点击或拖拽即可快速挪动位置！" : "📍 Hotspot selected. Click anywhere or drag to reposition it!"}
                </span>
              ) : (
                <span>
                  {language === "zh"
                    ? "💡 点击插图任意位置即可直接打点，也可按住已有徽章进行拖动挪位"
                    : "💡 Click anywhere to place a point, or click & drag any badge to reposition"}
                </span>
              )}
            </div>

            <div className="relative max-w-[320px] sm:max-w-[400px] aspect-[3/4] bg-[#281d12] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-2xl border border-[#5a422d]">
              <div
                className="w-full h-full rounded-lg overflow-hidden relative cursor-crosshair select-none"
                onClick={handleImageClick}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                onTouchMove={handleCanvasTouchMove}
                onTouchEnd={handleCanvasMouseUp}
              >
                <img
                  ref={imageRef}
                  src={activeImage}
                  alt="Admin Hotspot Editor Canvas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover pointer-events-none"
                />
                
                {/* Vintage overlay effect matching main view */}
                <div className="absolute inset-0 bg-amber-900/10 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent pointer-events-none" />

                {/* Draw saved hotspots */}
                {activeHotspotsList.map((h) => {
                  if (h.x === undefined || h.y === undefined) return null;
                  const isSelected = h.id === selectedHotspotId;
                  return (
                    <div
                      key={h.id}
                      className="absolute"
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    >
                      <button
                        onMouseDown={(e) => handleMarkerMouseDown(e, h.id)}
                        onTouchStart={(e) => handleMarkerTouchStart(e, h.id)}
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid updating coordinate on canvas click
                          setSelectedHotspotId(h.id);
                        }}
                        className="relative flex items-center justify-center w-6 h-6 -ml-3 -mt-3 focus:outline-none z-20 group/marker cursor-grab active:cursor-grabbing"
                        title={language === "zh" ? "拖动点位或点击它进行编辑" : "Drag hotspot or click to edit"}
                      >
                        <span className={`absolute inset-0 rounded-full animate-ping opacity-45 duration-1000 ${isSelected ? "bg-[#8b0000]" : "bg-amber-500"}`} />
                        <span
                          className={`relative w-4 h-4 rounded-full border text-[10px] font-bold flex items-center justify-center shadow-md transition-all ${
                            isSelected
                              ? "bg-[#8b0000] border-[#dbbe8b] text-[#dbbe8b] scale-125 z-30"
                              : "bg-[#2c1b12]/90 border-[#8e724b] text-[#dbbe8b] hover:bg-[#8b0000] hover:border-amber-400"
                          }`}
                        >
                          ⚔️
                        </span>

                        {/* Hover Name Badge */}
                        <span className="absolute bottom-6 bg-black/90 text-[#dbbe8b] border border-[#3a2c1b] rounded px-2 py-0.5 text-[10px] font-serif whitespace-nowrap opacity-0 group-hover/marker:opacity-100 pointer-events-none transition-all scale-90 group-hover/marker:scale-100 shadow">
                          {language === "zh" ? ((h as any).nameZh || h.name) : h.name}
                        </span>
                      </button>
                    </div>
                  );
                })}

                {/* Draw temporary preview crosshair coordinates */}
                {hotspotForm.x !== undefined && hotspotForm.y !== undefined && !selectedHotspotId && (
                  <div
                    className="absolute"
                    style={{ left: `${hotspotForm.x}%`, top: `${hotspotForm.y}%` }}
                  >
                    <div className="relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4 pointer-events-none z-30">
                      <div className="absolute w-6 h-0.5 bg-cyan-400" />
                      <div className="absolute h-6 w-0.5 bg-cyan-400" />
                      <div className="w-3 h-3 rounded-full border-2 border-cyan-400 animate-pulse bg-cyan-950/40" />
                      
                      <span className="absolute bottom-6 bg-cyan-950 text-cyan-200 border border-cyan-800 rounded px-1.5 py-0.5 text-[9px] font-mono whitespace-nowrap shadow-md">
                        X:{hotspotForm.x}% Y:{hotspotForm.y}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Hotspot Details Form & Form Editor */}
        <div className="w-full lg:w-[420px] bg-[#1a110a] border-t lg:border-t-0 lg:border-l border-[#3a2c1b] flex flex-col overflow-hidden h-[450px] lg:h-auto">
          {/* Section Header */}
          <div className="bg-[#1f150d] p-4 border-b border-[#3a2c1b] flex items-center justify-between shadow-sm">
            <h3 className="font-serif font-black text-sm text-[#f3dfbf] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#8e724b]" />
              <span>{language === "zh" ? "关键历史点位配置" : "Configure Hotspots"}</span>
            </h3>
            {selectedHotspotId ? (
              <button
                onClick={() => setSelectedHotspotId(null)}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-0.5 cursor-pointer bg-neutral-800/50 px-2 py-0.5 rounded border border-neutral-700/50"
              >
                <Plus className="w-3 h-3" />
                <span>{language === "zh" ? "新建点位" : "New Point"}</span>
              </button>
            ) : (
              <span className="text-[10px] bg-cyan-950/50 text-cyan-400 border border-cyan-900 px-2 py-0.5 rounded font-mono">
                {language === "zh" ? "✎ 新建点位模式" : "✎ New Hotspot Mode"}
              </span>
            )}
          </div>

          {/* Scrolling Split list and form editor */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            
            {/* Hotspots List Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-[#8e724b] uppercase font-bold tracking-wider">
                {language === "zh" ? "已定义点位列表" : "Defined Points"}
              </label>
              {activeHotspotsList.length === 0 ? (
                <div className="bg-[#120a05]/50 border border-dashed border-[#3a2c1b] rounded-xl p-4 text-center text-xs text-neutral-500 font-serif italic">
                  {language === "zh" ? "暂无点位。点击左侧大图即可开始打点配置。" : "No points yet. Click the illustration above to place your first hotspot."}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto custom-scrollbar p-1">
                  {activeHotspotsList.map((h) => {
                    const isSelected = h.id === selectedHotspotId;
                    const displayName = language === "zh" ? ((h as any).nameZh || h.name) : h.name;
                    return (
                      <div
                        key={h.id}
                        className={`flex items-center justify-between p-2 rounded-lg border transition-all text-xs ${
                          isSelected
                            ? "bg-[#8b0000]/20 border-[#dbbe8b] text-[#f3dfbf]"
                            : "bg-[#1f150d]/80 border-[#3a2c1b]/60 text-neutral-400 hover:bg-[#251b12] hover:text-neutral-200"
                        }`}
                      >
                        <button
                          onClick={() => setSelectedHotspotId(h.id)}
                          className="flex-1 text-left font-serif truncate cursor-pointer font-bold pr-2"
                        >
                          📍 {displayName}
                        </button>
                        <button
                          onClick={() => handleDeleteHotspot(h.id)}
                          className="text-neutral-500 hover:text-red-400 p-0.5 rounded transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Editing Form */}
            <div className="bg-[#1f150d] p-3.5 rounded-xl border border-[#3a2c1b]/50 shadow-inner flex flex-col gap-3.5 mt-1">
              
              <div className="grid grid-cols-2 gap-3">
                {/* Coordinate X */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">X-Coordinate (%)</span>
                  <div className="flex gap-1.5 items-center bg-black/40 border border-[#3a2c1b] rounded px-2.5 py-1 text-xs">
                    <span className="text-[#8e724b] font-mono">X:</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={hotspotForm.x}
                      onChange={(e) => handleXChange(parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-[#dbbe8b] font-mono w-12 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Coordinate Y */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Y-Coordinate (%)</span>
                  <div className="flex gap-1.5 items-center bg-black/40 border border-[#3a2c1b] rounded px-2.5 py-1 text-xs">
                    <span className="text-[#8e724b] font-mono">Y:</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={hotspotForm.y}
                      onChange={(e) => handleYChange(parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-[#dbbe8b] font-mono w-12 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Hotspot ID (locked/hidden unless you want) */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Hotspot Identifier ID (for mapping keywords)</span>
                <input
                  type="text"
                  value={hotspotForm.id}
                  disabled={!!selectedHotspotId} // Can't change existing ID
                  onChange={(e) => setHotspotForm((prev) => ({ ...prev, id: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") }))}
                  className="bg-black/40 border border-[#3a2c1b] rounded px-2.5 py-1 text-xs text-[#dbbe8b] focus:outline-none focus:border-[#dbbe8b] disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                  placeholder="e.g. pattern_sword"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Chinese Name */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e724b] font-bold">点位中文名称 (ZH) *</span>
                  <input
                    type="text"
                    value={hotspotForm.nameZh}
                    onChange={(e) => setHotspotForm((prev) => ({ ...prev, nameZh: e.target.value }))}
                    className="bg-black/50 border border-[#3a2c1b] rounded px-2.5 py-1.5 text-xs text-[#f3dfbf] focus:outline-none focus:border-[#dbbe8b]"
                    placeholder="例如: 大马士革宝剑"
                  />
                </div>

                {/* English Name */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e724b] font-bold">Point Name English (EN) *</span>
                  <input
                    type="text"
                    value={hotspotForm.name}
                    onChange={(e) => setHotspotForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-black/50 border border-[#3a2c1b] rounded px-2.5 py-1.5 text-xs text-[#f3dfbf] focus:outline-none focus:border-[#dbbe8b]"
                    placeholder="e.g. Pattern-welded Sword"
                  />
                </div>
              </div>

              {/* Chinese Description */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">点位中文描述详解 (ZH)</span>
                <textarea
                  rows={3}
                  value={hotspotForm.descriptionZh}
                  onChange={(e) => setHotspotForm((prev) => ({ ...prev, descriptionZh: e.target.value }))}
                  className="bg-black/50 border border-[#3a2c1b] rounded px-2.5 py-1.5 text-xs text-[#f3dfbf] focus:outline-none focus:border-[#dbbe8b] resize-none"
                  placeholder="请输入历史详析，该内容在手抄本右侧底栏展现..."
                />
              </div>

              {/* English Description */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Point Historical Details (EN)</span>
                <textarea
                  rows={3}
                  value={hotspotForm.description}
                  onChange={(e) => setHotspotForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-black/50 border border-[#3a2c1b] rounded px-2.5 py-1.5 text-xs text-[#f3dfbf] focus:outline-none focus:border-[#dbbe8b] resize-none"
                  placeholder="Enter detailed English historical information here..."
                />
              </div>

              {/* Success Staged Toast Indicator inside Form */}
              {successMessage && (
                <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 p-2.5 rounded-lg text-xs font-sans text-center animate-pulse">
                  {successMessage}
                </div>
              )}

              {/* Action Buttons Grid */}
              <div className="flex flex-col gap-2 mt-2">
                {selectedHotspotId ? (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={handleSaveHotspot}
                        className="col-span-2 py-2.5 bg-gradient-to-r from-[#8e724b] to-[#c8a67a] hover:brightness-110 active:brightness-90 text-[#120a05] rounded-lg font-serif font-bold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{language === "zh" ? "保存并更新" : "Save Update"}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteHotspot(selectedHotspotId)}
                        className="py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-800/40 hover:border-red-700 text-red-200 rounded-lg font-serif font-bold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-1"
                        title={language === "zh" ? "删除点位" : "Delete Hotspot"}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === "zh" ? "删除" : "Delete"}</span>
                      </button>
                    </div>
                    <button
                      onClick={() => setSelectedHotspotId(null)}
                      className="w-full py-2 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 rounded-lg text-[11px] font-mono tracking-wider transition-all border border-neutral-700/50 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>{language === "zh" ? "✕ 取消编辑 (返回新建点位)" : "✕ Cancel Edit (Back to New)"}</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSaveHotspot}
                    className="w-full py-2.5 bg-gradient-to-r from-[#8e724b] to-[#c8a67a] hover:brightness-110 active:brightness-90 text-[#120a05] rounded-lg font-serif font-bold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{language === "zh" ? "添加保存为新点位" : "Save as New Hotspot"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

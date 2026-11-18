"use client";

import React, { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, RotateCcw, Share2, Volume2, Gamepad2, Shield, Heart } from "lucide-react";

interface FullscreenGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  gameCode: string;
  language: string;
  authorName?: string;
  onShare?: () => void;
}

export default function FullscreenGameModal({
  isOpen,
  onClose,
  gameTitle,
  gameCode,
  language,
  authorName = "پارسا خیری",
  onShare,
}: FullscreenGameModalProps) {
  const [iframeKey, setIframeKey] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseWithAnimation();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRestart = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleCloseWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl transition-all duration-300 ${
        isClosing
          ? "opacity-0 scale-95 pointer-events-none"
          : "opacity-100 scale-100 animate-in zoom-in-95"
      }`}
      dir="rtl"
    >
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-cyan-500/30 shadow-lg neon-glow-cyan z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>{gameTitle || "بازی تعاملی"}</span>
              <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                تمام صفحه فعال
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              سازنده: <span className="text-cyan-300 font-semibold">{authorName}</span> | پارسا خیری & جمینای
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onShare && (
            <button
              onClick={onShare}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition"
              title="اشتراک بازی برای دوستان"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">اشتراک بازی</span>
            </button>
          )}

          <button
            onClick={handleRestart}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition"
            title="شروع مجدد بازی"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">اجرای دوباره</span>
          </button>

          {/* Exit Fullscreen Button */}
          <button
            onClick={handleCloseWithAnimation}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-rose-600/30"
            title="خروج از تمام صفحه (Esc)"
          >
            <Minimize2 className="w-4 h-4" />
            <span>خروج تمام‌صفحه</span>
          </button>
        </div>
      </div>

      {/* Main Game Screen Canvas / Iframe */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-black flex items-center justify-center p-1 sm:p-2">
        <iframe
          key={iframeKey}
          title={gameTitle}
          srcDoc={gameCode}
          sandbox="allow-scripts allow-modals allow-same-origin allow-popups"
          className="w-full h-full border-none rounded-xl bg-black shadow-2xl transition-all"
        />

        {/* Ambient controls reminder overlay */}
        <div className="absolute bottom-3 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 px-3 py-1.5 rounded-full pointer-events-none hidden sm:flex items-center gap-2">
          <span>🎮 کلیدهای جهت‌نما یا ماوس برای کنترل</span>
          <span>•</span>
          <span>دکمه Esc برای بستن تمام‌صفحه</span>
        </div>
      </div>
    </div>
  );
}

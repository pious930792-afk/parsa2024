"use client";

import React, { useState, useEffect } from "react";
import { Globe, Gamepad2, Heart, Eye, Lock, Unlock, Play, Share2, Copy, Check, Code, Sparkles, Filter } from "lucide-react";

interface PublicGamesGalleryProps {
  onPlayGameInStudio: (game: any) => void;
  onOpenFullscreen: (game: any) => void;
  onOpenShareModal: (game: any) => void;
}

export default function PublicGamesGallery({
  onPlayGameInStudio,
  onOpenFullscreen,
  onOpenShareModal,
}: PublicGamesGalleryProps) {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [lockedAlertId, setLockedAlertId] = useState<number | null>(null);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/games");
      if (res.ok) {
        const data = await res.json();
        setGames(data.games || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleLike = async (gameId: number) => {
    try {
      const res = await fetch(`/api/games/${gameId}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setGames((prev) =>
          prev.map((g) => (g.id === gameId ? { ...g, likes_count: data.likes } : g))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyCode = (game: any) => {
    if (game.is_code_protected) {
      setLockedAlertId(game.id);
      setTimeout(() => setLockedAlertId(null), 3500);
      return;
    }

    navigator.clipboard.writeText(game.code);
    setCopiedId(game.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredGames = games.filter((g) => {
    const matchesFilter = filter === "all" || g.category?.includes(filter) || (filter === "protected" && g.is_code_protected);
    const matchesSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.author_name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-cyan-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>گالری عمومی بازی‌های تمام مردم</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            بازی‌های اشتراک‌گذاری شده توسط سازندگان 🕹️
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            در این بخش می‌توانید تمام بازی‌هایی که توسط برنامه‌نویسان و پارسا خیری به اشتراک گذاشته شده را بازی کنید، به دوستانتان بفرستید یا سورس‌کدهای مجاز را بررسی کنید.
          </p>
        </div>

        <div className="text-left bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 shrink-0">
          <span>مجموع بازی‌ها:</span>{" "}
          <span className="font-bold text-cyan-400 text-sm">{games.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filter === "all"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            همه بازی‌ها
          </button>
          <button
            onClick={() => setFilter("بازی ۲ بعدی")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filter === "بازی ۲ بعدی"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            دو بعدی و گرافیکی
          </button>
          <button
            onClick={() => setFilter("پایتون")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filter === "پایتون"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            کدهای پایتون
          </button>
          <button
            onClick={() => setFilter("protected")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filter === "protected"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            🔒 فقط کدهای محافظت شده
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی نام بازی یا سازنده..."
          className="w-full sm:w-64 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none"
        />
      </div>

      {/* Games Grid */}
      {loading ? (
        <div className="p-12 text-center text-cyan-400 text-sm animate-pulse">
          در حال بارگذاری بازی‌های عمومی... ⏳
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-500 text-xs sm:text-sm">
          بازی‌ای با این مشخصات یافت نشد. می‌توانید خودتان اولین بازی را در محیط کدنویسی بسازید و اشتراک بگذارید!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 p-5 shadow-xl hover:shadow-cyan-900/20 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Bar inside card */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-1 bg-slate-800/80 rounded-xl border border-slate-700/80">
                      {game.author_avatar || "👨‍💻"}
                    </span>
                    <div>
                      <span className="text-[11px] text-slate-400 block">سازنده:</span>
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                        {game.author_name}
                        {game.author_name === "پارسا خیری" && (
                          <span className="text-[10px] text-amber-300 bg-amber-950/80 border border-amber-500/40 px-1.5 py-0.2 rounded font-semibold">
                            مدیر
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Anti-copy Status Badge */}
                  {game.is_code_protected ? (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 flex items-center gap-1 shrink-0">
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>کد محافظت شده</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 shrink-0">
                      <Unlock className="w-3 h-3 text-emerald-400" />
                      <span>کد باز</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition mb-1">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {game.description || "بازی ساخته شده در پلتفرم کدنویسی پارسا خیری"}
                </p>
              </div>

              {/* Locked Alert notification if user tried to copy protected code */}
              {lockedAlertId === game.id && (
                <div className="mb-3 p-2.5 rounded-xl bg-amber-950/90 border border-amber-500 text-amber-200 text-xs leading-relaxed animate-in fade-in">
                  🔒 سازنده بازی ({game.author_name}) کپی کردن کد را قفل کرده است تا کسی نتواند کد را بدزدد! اما می‌توانید با دکمه زیر بازی کنید.
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(game.id)}
                      className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition"
                      title="پسندیدن بازی"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500/30 text-rose-500 hover:fill-rose-500" />
                      <span>{game.likes_count}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>{game.views_count}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-500">{game.category}</span>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenFullscreen(game)}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-600/30 transition flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>اجرای تمام‌صفحه</span>
                  </button>

                  <button
                    onClick={() => onPlayGameInStudio(game)}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <Code className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ورود به استودیو</span>
                  </button>
                </div>

                {/* Secondary tools: Share & Copy Code */}
                <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                  <button
                    onClick={() => onOpenShareModal(game)}
                    className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition"
                  >
                    <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ارسال به رفقا</span>
                  </button>

                  <button
                    onClick={() => handleCopyCode(game)}
                    className={`flex items-center gap-1 transition ${
                      game.is_code_protected
                        ? "text-amber-400 hover:text-amber-300"
                        : "text-slate-400 hover:text-emerald-300"
                    }`}
                  >
                    {game.is_code_protected ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>کد قفل است</span>
                      </>
                    ) : copiedId === game.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">کد کپی شد!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>کپی سورس‌کد</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Share2, Lock, Unlock, Globe, Users, Copy, Check, Send, Sparkles, ShieldCheck, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface ShareGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameCode: string;
  language: string;
  defaultTitle?: string;
  onPublished?: (game: any) => void;
}

export default function ShareGameModal({
  isOpen,
  onClose,
  gameCode,
  language,
  defaultTitle = "بازی جدید من",
  onPublished,
}: ShareGameModalProps) {
  const [tab, setTab] = useState<"friends" | "public">("public");
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("بازی ۲ بعدی");
  const [isCodeProtected, setIsCodeProtected] = useState(false); // Code protection toggle!
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [publishedGame, setPublishedGame] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Generate shareable link
  const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareableUrl = publishedGame
    ? `${currentUrl}/?gameId=${publishedGame.id}`
    : `${currentUrl}/?title=${encodeURIComponent(title)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublishForEveryone = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          code: gameCode,
          language,
          category,
          is_public: true,
          is_code_protected: isCodeProtected, // User requested toggle to prevent code copying!
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "خطا در اشتراک‌گذاری بازی");
      }

      setPublishedGame(data.game);
      if (onPublished) onPublished(data.game);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setError(err.message || "خطا در ارسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-[#0a1120] border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-7 shadow-2xl neon-glow-cyan"
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
        >
          ✕
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>مرکز انتشار و اشتراک بازی</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100">
            اشتراک بازی با رفقا و تمام مردم
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            بازی ساخته‌شده‌تان را منتشر کنید و تعیین کنید آیا دیگران بتوانند کد را کپی کنند یا خیر!
          </p>
        </div>

        {/* Tab options: Share with friends vs Public Gallery */}
        <div className="flex rounded-xl bg-slate-950 p-1 mb-5 border border-slate-800">
          <button
            type="button"
            onClick={() => setTab("public")}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
              tab === "public"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>اشتراک‌گذاری برای همه مردم</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("friends")}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
              tab === "friends"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ارسال اختصاصی به رفقا</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {publishedGame ? (
          <div className="space-y-4 py-2 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
              🎉
            </div>
            <h4 className="text-lg font-bold text-emerald-300">
              بازی با موفقیت منتشر شد!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              بازی شما اکنون در گالری عمومی تمام مردم قرار گرفت و همه می‌توانند آن را بازی کنند.
            </p>

            {/* Anti-copy status reminder */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-center gap-2">
              {publishedGame.is_code_protected ? (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300">🔒 سورس‌کد قفل شد: دیگران فقط می‌توانند بازی کنند و کپی غیرمجاز است!</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">🔓 سورس‌کد باز: علاقه‌مندان می‌توانند کد را مشاهده و یاد بگیرند.</span>
                </>
              )}
            </div>

            {/* Link Copy */}
            <div className="flex items-center gap-2 mt-4 bg-slate-950 border border-slate-800 rounded-xl p-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 bg-transparent text-xs text-slate-200 outline-none px-2 font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "کپی شد!" : "کپی لینک"}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              بستن پنجره
            </button>
          </div>
        ) : tab === "public" ? (
          <form onSubmit={handlePublishForEveryone} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                نام بازی شما:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثلاً: جنگنده‌های کهکشان ۲"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                دسته‌بندی بازی:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
              >
                <option value="بازی ۲ بعدی">بازی ۲ بعدی و گرافیکی</option>
                <option value="آرکید و سرگرمی">آرکید و نوستالژیک</option>
                <option value="اکشن و فضایی">اکشن و جنگ فضایی</option>
                <option value="معمایی و فکری">معمایی و پازل</option>
                <option value="پایتون و هوش مصنوعی">پایتون و محاسبات هوش مصنوعی</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                توضیح کوتاه درباره بازی:
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیح دهید بازی چطور کار می‌کند و چطور باید امتیاز گرفت..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none resize-none"
              />
            </div>

            {/* CRUCIAL REQUIREMENT: CODE COPY PROTECTION TOGGLE */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-md">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isCodeProtected}
                  onChange={(e) => setIsCodeProtected(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-slate-700"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>قفل کردن سورس‌کد (جلوگیری از کپی کد بازی)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    با فعال کردن این گزینه، بقیه مردم می‌توانند بازی را اجرا کرده و لذت ببرند، اما نمی‌توانند کد بازی شما را ببینند یا کپی کنند!
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 transition flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>{loading ? "در حال ثبت..." : "اشتراک‌گذاری برای همه مردم"}</span>
            </button>
          </form>
        ) : (
          /* Share with friends tab */
          <div className="space-y-4 py-1">
            <p className="text-xs text-slate-300 leading-relaxed">
              لینک اختصاصی بازی را کپی کنید و برای دوستانتان بفرستید تا سریعاً در مرورگر خود باز کرده و بدون نیاز به نصب بازی کنند:
            </p>

            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 bg-transparent text-xs text-slate-200 outline-none px-2 font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "کپی شد!" : "کپی"}</span>
              </button>
            </div>

            {/* Quick messenger share buttons */}
            <div className="pt-2">
              <span className="block text-xs font-medium text-slate-400 mb-2">
                ارسال مستقیم به پیام‌رسان‌ها:
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(shareableUrl)}&text=${encodeURIComponent(`بیا این بازی که با پارسا خیری و جمینای ساختم رو بازی کن: ${title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-sky-950/60 hover:bg-sky-900 border border-sky-600/40 text-sky-200 text-center flex items-center justify-center gap-1 transition"
                >
                  <span>تلگرام</span>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`بیا بازی منو ببین: ${shareableUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-200 text-center flex items-center justify-center gap-1 transition"
                >
                  <span>واتساپ</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: title,
                        text: `بازی دست‌ساز من در پلتفرم پارسا خیری و جمینای!`,
                        url: shareableUrl,
                      }).catch(() => {});
                    } else {
                      handleCopyLink();
                    }
                  }}
                  className="p-2 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-600/40 text-purple-200 text-center flex items-center justify-center gap-1 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>اشتراک عمومی</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

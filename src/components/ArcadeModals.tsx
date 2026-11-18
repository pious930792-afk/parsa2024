"use client";

import React, { useState, useRef } from "react";
import { AVATAR_PRESETS } from "@/lib/code-presets";
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  Share2,
  Lock,
  Unlock,
  Sparkles,
  UserPlus,
  LogIn,
  Upload,
  Check,
  Copy,
  Send,
  Globe,
  Users,
  ShieldAlert,
  Play,
} from "lucide-react";

export interface UserProfile {
  id: number;
  username: string;
  avatarUrl: string;
  bio?: string | null;
  role?: string;
}

export interface GameItem {
  id: number;
  title: string;
  description: string;
  language: string;
  code: string;
  authorId: number | null;
  authorName: string;
  authorAvatar: string;
  isPublic: boolean;
  allowCodeCopy: boolean;
  sharedWithFriendName?: string | null;
  likesCount: number;
  playsCount: number;
  createdAt?: string;
}

interface FullscreenStageProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  language: string;
  code: string;
  pythonOutput: string[];
  allowCodeCopy: boolean;
  onRunAgain: () => void;
  onExplainCode: () => void;
  onOpenShareFriend: () => void;
  onOpenPublishPublic: () => void;
}

export function FullscreenGameStage({
  isOpen,
  onClose,
  title,
  language,
  code,
  pythonOutput,
  allowCodeCopy,
  onRunAgain,
  onExplainCode,
  onOpenShareFriend,
  onOpenPublishPublic,
}: FullscreenStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  if (!isOpen) return null;

  const isHtmlPlayable =
    language === "html" ||
    code.includes("<html") ||
    code.includes("<canvas") ||
    code.includes("<body") ||
    code.includes("<script");

  const toggleBrowserFullscreen = async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
        setIsNativeFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsNativeFullscreen(false);
      }
    } catch {
      // Fallback to viewport overlay which is already 100vw x 100vh
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#06070B]/95 backdrop-blur-2xl animate-fullscreen-launch"
    >
      {/* Top Cyber HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#00F0FF]/30 bg-[#12141E]/90 px-6 py-3.5 shadow-[0_4px_30px_rgba(0,240,255,0.15)]">
        <div className="flex items-center gap-3">
          <span className="flex h-3.5 w-3.5 rounded-full bg-[#10B981] shadow-[0_0_12px_#10B981] animate-pulse" />
          <h2 className="text-lg font-extrabold text-white tracking-wide">
            🎮 اجرای تمام‌صفحه: <span className="text-[#00F0FF]">{title}</span>
          </h2>
          <span className="rounded-full border border-[#A855F7]/40 bg-[#A855F7]/15 px-3 py-0.5 text-xs font-semibold text-[#C084FC]">
            {isHtmlPlayable ? "موتور بازی HTML5 Canvas" : "مفسر پایتون (Python)"}
          </span>
          {!allowCodeCopy ? (
            <span className="flex items-center gap-1 rounded-full border border-[#FF2A85]/40 bg-[#FF2A85]/15 px-3 py-0.5 text-xs font-semibold text-[#FF2A85]">
              <Lock className="h-3.5 w-3.5" /> کد بازی قفل شده (ضد کپی)
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full border border-[#10B981]/40 bg-[#10B981]/15 px-3 py-0.5 text-xs font-semibold text-[#10B981]">
              <Unlock className="h-3.5 w-3.5" /> کپی کد آزاد
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setIframeKey((k) => k + 1);
              onRunAgain();
            }}
            className="flex items-center gap-1.5 rounded-xl border border-[#10B981]/50 bg-[#10B981]/20 px-3.5 py-2 text-xs font-bold text-[#10B981] transition hover:bg-[#10B981] hover:text-[#090A0F]"
          >
            <RotateCcw className="h-4 w-4" />
            اجرای مجدد بازی
          </button>

          <button
            onClick={onExplainCode}
            className="flex items-center gap-1.5 rounded-xl border border-[#A855F7]/50 bg-[#A855F7]/20 px-3.5 py-2 text-xs font-bold text-[#E9D5FF] transition hover:bg-[#A855F7] hover:text-white"
          >
            <Sparkles className="h-4 w-4" />
            توضیح هوش مصنوعی
          </button>

          <button
            onClick={onOpenShareFriend}
            className="flex items-center gap-1.5 rounded-xl border border-[#00F0FF]/50 bg-[#00F0FF]/15 px-3.5 py-2 text-xs font-bold text-[#00F0FF] transition hover:bg-[#00F0FF] hover:text-[#090A0F]"
          >
            <Share2 className="h-4 w-4" />
            ارسال برای رفیق
          </button>

          <button
            onClick={onOpenPublishPublic}
            className="flex items-center gap-1.5 rounded-xl border border-[#FF2A85]/50 bg-[#FF2A85]/15 px-3.5 py-2 text-xs font-bold text-[#FF2A85] transition hover:bg-[#FF2A85] hover:text-white"
          >
            <Globe className="h-4 w-4" />
            اشتراک برای همه
          </button>

          <button
            onClick={toggleBrowserFullscreen}
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-white/20"
            title="تمام‌صفحه مانیتور"
          >
            {isNativeFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
            زوم کامل مانیتور
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-xl bg-[#EF4444] px-4 py-2 text-xs font-extrabold text-white shadow-[0_0_16px_rgba(239,68,68,0.5)] transition hover:bg-[#DC2626]"
          >
            <X className="h-4 w-4" />
            خروج از تمام‌صفحه
          </button>
        </div>
      </div>

      {/* Main Animated Fullscreen Game Viewport */}
      <div className="relative flex-1 p-4 md:p-6 flex items-center justify-center overflow-hidden">
        <div className="relative h-full w-full max-w-6xl overflow-hidden rounded-2xl border-2 border-[#00F0FF]/50 bg-[#070810] animate-neon-frame flex flex-col">
          {isHtmlPlayable ? (
            <iframe
              key={iframeKey}
              title={title}
              srcDoc={code}
              sandbox="allow-scripts allow-modals"
              className="h-full w-full flex-1 border-0 bg-[#070810]"
            />
          ) : (
            <div
              dir="ltr"
              className="font-code flex-1 overflow-auto p-8 text-left text-base text-[#10B981] bg-[#070810]"
            >
              <div className="mb-4 border-b border-white/10 pb-3 text-xs text-[#9CA3AF]">
                Python 3.12 Interactive Cyber Terminal — Fullscreen Execution
              </div>
              {pythonOutput.map((line, i) => (
                <div key={i} className="py-1 leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface AuthModalProps {
  isOpen: boolean;
  initialMode: "register" | "login";
  onClose: () => void;
  onSuccess: (user: UserProfile, msg: string) => void;
}

export function AuthModal({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<"register" | "login">(initialMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    setMode(initialMode);
    setError("");
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const finalAvatar = customAvatarUrl.trim() || selectedAvatar;
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          username,
          password,
          avatarUrl: finalAvatar,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد.");
      } else {
        onSuccess(data.user, data.message);
        onClose();
      }
    } catch {
      setError("خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fullscreen-launch">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#00F0FF]/40 bg-[#12141E] p-6 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-lg bg-white/5 p-2 text-gray-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Mode Switch Tabs: ثبت‌نام vs ورود */}
        <div className="mb-6 flex rounded-xl bg-[#090A0F] p-1.5 border border-white/10">
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-extrabold transition ${
              mode === "register"
                ? "bg-gradient-to-r from-[#00F0FF] to-[#7C3AED] text-[#090A0F] shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            ثبت‌نام (حساب جدید)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-extrabold transition ${
              mode === "login"
                ? "bg-gradient-to-r from-[#FF2A85] to-[#A855F7] text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LogIn className="h-4 w-4" />
            ورود (ثبت‌نام کرده‌ها)
          </button>
        </div>

        <h3 className="mb-1 text-xl font-black text-white">
          {mode === "register"
            ? "✨ ثبت‌نام در استودیو کدنویسی پارسا"
            : "🔑 ورود به حساب کاربری قبلی"}
        </h3>
        <p className="mb-5 text-xs text-gray-400">
          {mode === "register"
            ? "اسم، رمز عبور و عکس پروفایل خود را انتخاب کنید تا بتوانید بازی بسازید، دوست پیدا کنید و گزارش باگ بفرستید."
            : "اگر قبلاً ثبت‌نام کرده‌اید، اسم و رمز عبور خود را وارد کنید."}
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-[#EF4444]/50 bg-[#EF4444]/15 p-3 text-xs font-bold text-[#FCA5A5]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-300">
              نام کاربری / اسم شما:
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="مثلاً: امیر کدر یا پارسا خیری"
              className="w-full rounded-xl border border-white/15 bg-[#090A0F] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#00F0FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-300">
              رمز عبور:
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور خود را وارد کنید..."
              className="w-full rounded-xl border border-white/15 bg-[#090A0F] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#00F0FF] focus:outline-none"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="mb-2 block text-xs font-bold text-gray-300">
                انتخاب عکس پروفایل:
              </label>
              <div className="mb-3 flex items-center gap-4 rounded-xl border border-white/10 bg-[#090A0F] p-3">
                <img
                  src={customAvatarUrl.trim() || selectedAvatar}
                  alt="پیش‌نمایش پروفایل"
                  className="h-16 w-16 rounded-full border-2 border-[#00F0FF] object-cover shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                />
                <div className="flex-1 space-y-2">
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-3 py-1.5 text-xs font-bold text-[#00F0FF] hover:bg-[#00F0FF]/20">
                    <Upload className="h-3.5 w-3.5" />
                    آپلود عکس از دستگاه
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    placeholder="یا لینک عکس پروفایل (اختیاری)"
                    className="w-full rounded-lg border border-white/10 bg-[#12141E] px-2.5 py-1 text-xs text-white placeholder-gray-500 focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {AVATAR_PRESETS.map((av) => {
                  const active =
                    !customAvatarUrl.trim() && selectedAvatar === av.url;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        setCustomAvatarUrl("");
                        setSelectedAvatar(av.url);
                      }}
                      className={`group relative flex flex-col items-center rounded-xl p-1.5 border transition ${
                        active
                          ? "border-[#00F0FF] bg-[#00F0FF]/15 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                          : "border-white/10 bg-[#090A0F] hover:border-white/30"
                      }`}
                      title={av.label}
                    >
                      <img
                        src={av.url}
                        alt={av.label}
                        className="h-10 w-10 rounded-full"
                      />
                      {active && (
                        <span className="absolute -top-1 -right-1 rounded-full bg-[#00F0FF] p-0.5 text-[#090A0F]">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {mode === "login" && (
            <div className="rounded-xl border border-white/10 bg-[#090A0F]/80 p-3 text-xs text-gray-400">
              💡 <b className="text-[#00F0FF]">حساب‌های آماده تست سریع:</b>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setUsername("پارسا خیری");
                    setPassword("parsa1388");
                  }}
                  className="rounded-lg border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-2.5 py-1 text-[#00F0FF] hover:bg-[#00F0FF]/20"
                >
                  ورود به حساب پارسا خیری
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUsername("آرش گیمر");
                    setPassword("arash1234");
                  }}
                  className="rounded-lg border border-[#A855F7]/30 bg-[#A855F7]/10 px-2.5 py-1 text-[#C084FC] hover:bg-[#A855F7]/20"
                >
                  ورود به حساب آرش گیمر
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#FF2A85] py-3.5 text-sm font-black text-white shadow-[0_0_24px_rgba(0,240,255,0.3)] transition hover:opacity-95 disabled:opacity-50"
          >
            {loading
              ? "در حال انجام..."
              : mode === "register"
              ? "تکمیل ثبت‌نام و ورود به سایت"
              : "ورود به حساب کاربری"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface ShareGameModalProps {
  isOpen: boolean;
  mode: "friend" | "public";
  onClose: () => void;
  defaultTitle: string;
  language: string;
  code: string;
  currentUser: UserProfile | null;
  friendsList: string[];
  onPublished: (newGame: GameItem, msg: string) => void;
}

export function ShareGameModal({
  isOpen,
  mode,
  onClose,
  defaultTitle,
  language,
  code,
  currentUser,
  friendsList,
  onPublished,
}: ShareGameModalProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(
    "این بازی را در استودیو کدنویسی پارسا خیری ساختم! حتماً اجراش کن."
  );
  const [allowCodeCopy, setAllowCodeCopy] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(
    friendsList[0] || "آرش گیمر"
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setTitle(defaultTitle);
    if (friendsList.length > 0) {
      setSelectedFriend(friendsList[0]);
    }
  }, [defaultTitle, friendsList, isOpen]);

  if (!isOpen) return null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/?play=${encodeURIComponent(title)}`
      : "https://parsa-code-arcade.ir";

  const handleCopyShareLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `🎮 بیا بازی «${title}» که ساختم رو بازی کن!\nلینک ورود به بازی: ${shareUrl}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          language,
          code,
          authorId: currentUser?.id || null,
          authorName: currentUser?.username || "کدنویس مهمان",
          authorAvatar: currentUser?.avatarUrl || AVATAR_PRESETS[0].url,
          isPublic: true,
          allowCodeCopy,
          sharedWithFriendName: mode === "friend" ? selectedFriend : null,
        }),
      });
      const data = await res.json();
      if (res.ok && data.game) {
        onPublished(data.game, data.message);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fullscreen-launch">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#00F0FF]/40 bg-[#12141E] p-6 shadow-[0_0_50px_rgba(168,85,247,0.25)]">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-lg bg-white/5 p-2 text-gray-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00F0FF]/20 to-[#FF2A85]/20 border border-[#00F0FF]/40">
            {mode === "friend" ? (
              <Users className="h-6 w-6 text-[#00F0FF]" />
            ) : (
              <Globe className="h-6 w-6 text-[#FF2A85]" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              {mode === "friend"
                ? "🤝 اشتراک بازی برای رفیقامون"
                : "🌍 اشتراک‌گذاری بازی برای همه مردم"}
            </h3>
            <p className="text-xs text-gray-400">
              {mode === "friend"
                ? "بازی خود را مستقیم برای دوستانت بفرست یا لینک اختصاصی آن را کپی کن."
                : "بازی شما به بخش «آرکید همگانی» می‌رود تا همه مردم بتوانند آن را ببینند و بازی کنند!"}
            </p>
          </div>
        </div>

        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-300">
              نام بازی شما:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#090A0F] px-3.5 py-2.5 text-sm text-white focus:border-[#00F0FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-gray-300">
              توضیح کوتاه درباره بازی:
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#090A0F] px-3.5 py-2 text-sm text-white focus:border-[#00F0FF] focus:outline-none"
            />
          </div>

          {mode === "friend" && (
            <div className="rounded-xl border border-[#00F0FF]/30 bg-[#090A0F] p-3.5 space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#00F0FF]">
                  انتخاب دوست برای ارسال مستقیم بازی:
                </label>
                <input
                  type="text"
                  value={selectedFriend}
                  onChange={(e) => setSelectedFriend(e.target.value)}
                  placeholder="نام دوست (مثلاً: آرش گیمر یا پارسا خیری)"
                  className="w-full rounded-lg border border-white/15 bg-[#12141E] px-3 py-2 text-sm text-white focus:border-[#00F0FF] focus:outline-none"
                />
                {friendsList.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {friendsList.map((fr) => (
                      <button
                        key={fr}
                        type="button"
                        onClick={() => setSelectedFriend(fr)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                          selectedFriend === fr
                            ? "bg-[#00F0FF] text-[#090A0F]"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        {fr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                <span className="text-xs text-gray-400">
                  کپی دعوت‌نامه بازی برای تلگرام / واتساپ رفیق:
                </span>
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="flex items-center gap-1.5 rounded-lg border border-[#00F0FF]/40 bg-[#00F0FF]/15 px-3 py-1.5 text-xs font-bold text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#090A0F]"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> کپی شد!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> کپی لینک برای رفیق
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Code Copy Protection Toggle ("وقتی بازی اشتراک میکنیم میتونیم تغییر بدیم که کسی کد بازی کپی نکنه") */}
          <div className="rounded-xl border border-[#FF2A85]/40 bg-gradient-to-r from-[#FF2A85]/10 to-[#A855F7]/10 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {!allowCodeCopy ? (
                  <Lock className="h-5 w-5 text-[#FF2A85]" />
                ) : (
                  <Unlock className="h-5 w-5 text-[#10B981]" />
                )}
                <div>
                  <div className="text-sm font-black text-white">
                    محافظت از کد بازی (جلوگیری از کپی شدن کد)
                  </div>
                  <div className="text-xs text-gray-300">
                    {!allowCodeCopy
                      ? "🔒 فعال: هیچ‌کس نمی‌تواند کد بازی شما را ببیند یا کپی کند (فقط می‌توانند بازی کنند)."
                      : "🔓 غیرفعال: بقیه مردم می‌توانند کد بازی شما را ببینند و کپی کنند."}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAllowCodeCopy((prev) => !prev)}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                  !allowCodeCopy ? "bg-[#FF2A85]" : "bg-[#10B981]"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    !allowCodeCopy ? "-translate-x-8" : "-translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setAllowCodeCopy(false)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-bold border transition ${
                  !allowCodeCopy
                    ? "border-[#FF2A85] bg-[#FF2A85] text-white"
                    : "border-white/10 bg-[#090A0F] text-gray-400"
                }`}
              >
                🔒 قفل کردن کپی کد (پیشنهادی)
              </button>
              <button
                type="button"
                onClick={() => setAllowCodeCopy(true)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-bold border transition ${
                  allowCodeCopy
                    ? "border-[#10B981] bg-[#10B981] text-[#090A0F]"
                    : "border-white/10 bg-[#090A0F] text-gray-400"
                }`}
              >
                🔓 اجازه کپی کد به دیگران
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#FF2A85] py-3.5 text-sm font-black text-white shadow-[0_0_24px_rgba(255,42,133,0.35)] transition hover:opacity-95 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {loading
              ? "در حال ارسال..."
              : mode === "friend"
              ? `ارسال بازی برای رفیق (${selectedFriend}) و ثبت در آرکید`
              : "انتشار بازی برای همه مردم در آرکید همگانی"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface CodeInspectModalProps {
  game: GameItem | null;
  onClose: () => void;
  onLoadIntoStudio: (game: GameItem) => void;
}

export function CodeInspectModal({
  game,
  onClose,
  onLoadIntoStudio,
}: CodeInspectModalProps) {
  const [copied, setCopied] = useState(false);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fullscreen-launch">
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#00F0FF]/40 bg-[#12141E] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-lg bg-white/5 p-2 text-gray-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-black text-white mb-1">
          بررسی سورس کد بازی: <span className="text-[#00F0FF]">{game.title}</span>
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          سازنده: {game.authorName}
        </p>

        {!game.allowCodeCopy ? (
          <div
            onContextMenu={(e) => e.preventDefault()}
            className="select-none rounded-2xl border-2 border-[#FF2A85]/50 bg-[#FF2A85]/10 p-8 text-center space-y-3"
          >
            <ShieldAlert className="mx-auto h-14 w-14 text-[#FF2A85]" />
            <h4 className="text-lg font-black text-white">
              🔒 کد این بازی توسط سازنده ({game.authorName}) قفل شده است!
            </h4>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              سازنده هنگام اشتراک‌گذاری گزینه «جلوگیری از کپی شدن کد بازی» را فعال کرده است تا کسی نتواند کد آن را کپی کند. شما می‌توانید بازی را اجرا و تمام‌صفحه بازی کنید!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <pre
              dir="ltr"
              className="font-code max-h-80 overflow-auto rounded-xl border border-white/10 bg-[#090A0F] p-4 text-left text-xs text-[#00F0FF]"
            >
              {game.code}
            </pre>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(game.code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-2 rounded-xl bg-[#00F0FF] px-4 py-2.5 text-xs font-black text-[#090A0F]"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "کد بازی کپی شد!" : "کپی کردن کد بازی"}
              </button>
              <button
                onClick={() => {
                  onLoadIntoStudio(game);
                  onClose();
                }}
                className="flex items-center gap-2 rounded-xl border border-[#A855F7] bg-[#A855F7]/20 px-4 py-2.5 text-xs font-black text-white hover:bg-[#A855F7]"
              >
                <Play className="h-4 w-4" />
                باز کردن و ویرایش در استودیو کد
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

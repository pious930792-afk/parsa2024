"use client";

import React, { useState } from "react";
import { User, Lock, Image as ImageIcon, Sparkles, LogIn, UserPlus, AlertCircle, CheckCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  initialMode?: "login" | "register";
}

const AVATAR_OPTIONS = [
  "👨‍💻", "👩‍💻", "👑", "🚀", "⚡", "🎮", "👾", "🤖", "🐱", "🧙‍♂️", "🦊", "🦁"
];

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = "register" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("👨‍💻");
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const selectedAvatar = customAvatarUrl.trim() ? customAvatarUrl.trim() : avatar;

      const payload = mode === "register" 
        ? { username, password, avatar: selectedAvatar, bio }
        : { username, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطایی در فرآیند رخ داد.");
      }

      setSuccessMsg(data.message || (mode === "register" ? "ثبت‌نام با موفقیت انجام شد!" : "ورود موفقیت‌آمیز بود!"));
      setTimeout(() => {
        onSuccess(data.user);
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.message || "خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-[#0c1222] border border-cyan-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl neon-glow-cyan"
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
        >
          ✕
        </button>

        {/* Tab switch between Register and Login */}
        <div className="flex rounded-xl bg-slate-950 p-1 mb-5 border border-slate-800">
          <button
            type="button"
            onClick={() => { setMode("register"); setError(null); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === "register"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>ثبت‌نام کاربر جدید</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode("login"); setError(null); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === "login"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>ورود قبلی‌ها</span>
          </button>
        </div>

        <div className="text-center mb-5">
          <h3 className="text-xl font-bold text-cyan-300">
            {mode === "register" ? "عضویت در پلتفرم کدنویسی" : "خوش آمدید! ورود به حساب"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "register"
              ? "اسم، رمز عبور و عکس پروفایل خود را مشخص کنید"
              : "نام کاربری و رمز عبوری که قبلاً ثبت‌نام کردید را بزنید"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              نام و نام کاربری:
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="مثلاً: علی_کدر یا پارسا"
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition"
              />
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              رمز عبور:
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="حداقل ۳ کاراکتر"
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition"
              />
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Avatar selector (Only in register mode) */}
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                انتخاب عکس پروفایل:
              </label>
              <div className="grid grid-cols-6 gap-2 mb-2 p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setAvatar(emoji);
                      setCustomAvatarUrl("");
                    }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                      avatar === emoji && !customAvatarUrl
                        ? "bg-cyan-500/30 border-2 border-cyan-400 scale-110 shadow-sm shadow-cyan-500"
                        : "hover:bg-slate-800 border border-transparent"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Custom avatar image URL optional */}
              <input
                type="text"
                value={customAvatarUrl}
                onChange={(e) => setCustomAvatarUrl(e.target.value)}
                placeholder="یا لینک دلخواه عکس پروفایل (اختیاری)"
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 outline-none"
              />
            </div>
          )}

          {/* Bio in register mode */}
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                درباره من / بیوگرافی (اختیاری):
              </label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="مثلاً: برنامه‌نویس پایتون و سازنده بازی"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block animate-spin">⏳ در حال پردازش...</span>
            ) : mode === "register" ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>ثبت‌نام و ورود به سایت</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>ورود به حساب کاربری</span>
              </>
            )}
          </button>
        </form>

        {/* Creator / Quick Test hints */}
        <div className="mt-5 pt-3 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            طراحی شده با عشق توسط{" "}
            <span className="text-cyan-400 font-semibold">پارسا خیری با کمک جمینای</span>
          </p>
        </div>
      </div>
    </div>
  );
}

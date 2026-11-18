"use client";

import React from "react";
import { Code2, Bot, Globe, Users, Bug, Crown, LogIn, UserPlus, LogOut, Sparkles } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: any;
  onOpenAuth: (mode?: "login" | "register") => void;
  onOpenCreators: () => void;
  onLogout: () => void;
  friendRequestsCount?: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenCreators,
  onLogout,
  friendRequestsCount = 0,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4" dir="rtl">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab("studio")}
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-purple-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-all">
              <Code2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400">
                کد پلاس | پارسا خیری
              </div>
              <div className="text-[10px] text-cyan-400/80 flex items-center gap-1 font-medium">
                <Sparkles className="w-2.5 h-2.5" />
                <span>با کمک جمینای (Gemini AI)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab("studio")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "studio"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>کدنویسی و ساخت بازی</span>
          </button>

          <button
            onClick={() => setActiveTab("bot")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "bot"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>بات هوشمند جمینای</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "gallery"
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>گالری عمومی بازی‌ها</span>
          </button>

          <button
            onClick={() => setActiveTab("friends")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 relative ${
              activeTab === "friends"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>دوستان</span>
            {friendRequestsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("bugs")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "bugs"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>گزارش باگ</span>
          </button>

          {/* CREATORS BUTTON HIGHLIGHTED: «پارسا خیری با کمک جمینای» */}
          <button
            onClick={onOpenCreators}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 flex items-center gap-1.5 shadow-sm transition"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>سازندگان</span>
          </button>
        </nav>

        {/* Right side: User Profile or Register/Login */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-slate-900 border border-cyan-500/30">
                <span className="text-xl">{currentUser.avatar || "👨‍💻"}</span>
                <span className="text-xs font-bold text-slate-200 hidden sm:inline">
                  {currentUser.username}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-800 text-xs transition"
                title="خروج از حساب"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth("register")}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/25 transition flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>ثبت‌نام</span>
              </button>
              <button
                onClick={() => onOpenAuth("login")}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>ورود</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden items-center justify-around px-2 py-2 bg-slate-950/95 border-t border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab("studio")}
          className={`p-2 rounded-lg ${activeTab === "studio" ? "text-cyan-400 font-bold" : "text-slate-400"}`}
        >
          💻 کدنویسی
        </button>
        <button
          onClick={() => setActiveTab("bot")}
          className={`p-2 rounded-lg ${activeTab === "bot" ? "text-purple-400 font-bold" : "text-slate-400"}`}
        >
          🤖 بات
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`p-2 rounded-lg ${activeTab === "gallery" ? "text-blue-400 font-bold" : "text-slate-400"}`}
        >
          🌐 بازی‌ها
        </button>
        <button
          onClick={() => setActiveTab("friends")}
          className={`p-2 rounded-lg ${activeTab === "friends" ? "text-cyan-400 font-bold" : "text-slate-400"}`}
        >
          🤝 دوستان
        </button>
        <button
          onClick={() => setActiveTab("bugs")}
          className={`p-2 rounded-lg ${activeTab === "bugs" ? "text-rose-400 font-bold" : "text-slate-400"}`}
        >
          🐛 باگ
        </button>
        <button
          onClick={onOpenCreators}
          className="p-2 rounded-lg text-amber-400 font-bold"
        >
          👑 سازندگان
        </button>
      </div>
    </header>
  );
}

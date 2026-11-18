"use client";

import React from "react";
import { Sparkles, Crown, Bot, Award, Heart, CheckCircle2, Code2, Cpu } from "lucide-react";

interface CreatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatorsModal({ isOpen, onClose }: CreatorsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-[#0a0f1e] to-slate-950 border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl neon-glow-cyan max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-700"
          aria-label="بستن"
        >
          ✕
        </button>

        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-sm font-semibold mb-3 shadow-lg shadow-cyan-900/30">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>صفحه اختصاصی سازندگان و طراحان پلتفرم</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 mt-1">
            پارسا خیری با کمک جمینای
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
            خلق‌شده برای برنامه‌نویسان و سازندگان بازی‌های تعاملی ایران با پیشرفته‌ترین فناوری‌های وب
          </p>
        </div>

        {/* The Two Creators Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {/* Parsa Kheyri Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900/90 border border-amber-500/40 shadow-lg relative overflow-hidden group hover:border-amber-400 transition-all duration-300">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-md shadow-amber-500/20">
                👑
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-300 flex items-center gap-1.5">
                  پارسا خیری
                  <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                </h3>
                <span className="text-xs text-amber-200/80 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/30">
                  خالق و توسعه‌دهنده اصلی
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              برنامه‌نویس و سازنده خلاق این سامانه. طراح بستر ساخت بازی‌های تحت وب، سیستم اشتراک‌گذاری عمومی و نظارت بر بروزرسانی‌ها و باگ‌ها.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>مدیریت و پشتیبانی مداوم پلتفرم</span>
            </div>
          </div>

          {/* Gemini AI Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-900/90 border border-purple-500/40 shadow-lg relative overflow-hidden group hover:border-purple-400 transition-all duration-300">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-3xl shadow-md shadow-purple-500/20">
                🤖
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-300 flex items-center gap-1.5">
                  جمینای (Gemini AI)
                  <Bot className="w-4 h-4 text-purple-400" />
                </h3>
                <span className="text-xs text-purple-200/80 bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-500/30">
                  دستیار هوش مصنوعی
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              هوش مصنوعی پیشرفته که وظیفه تحلیل و توضیح خط‌به‌خط کدهای HTML و پایتون، پاسخ به تمام سوالات برنامه‌نویسی و تقویت کدهای بازی را دارد.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-purple-400/90 font-medium">
              <Cpu className="w-3.5 h-3.5" />
              <span>موتور تحلیل کد و پشتیبانی الگوریتم‌ها</span>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-300 space-y-2 mb-6">
          <div className="font-semibold text-cyan-400 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            هدف این سامانه:
          </div>
          <p className="text-slate-400 leading-relaxed">
            این سایت توسط «پارسا خیری با کمک جمینای» برای علاقه‌مندان به کدنویسی توسعه یافته است؛ تا بتوانید هر کدی از HTML و پایتون را اجرا کنید، بازی بسازید، تمام‌صفحه بازی کنید، برای دوستانتان بفرستید، در صورت تمایل کدتان را قفل کنید تا کپی نشود و با دیگر برنامه‌نویسان دوست شوید!
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            ساخته شده با <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> توسط <span className="text-cyan-300 font-bold">پارسا خیری با کمک جمینای</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition shadow-md shadow-cyan-600/30"
          >
            متوجه شدم و بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}

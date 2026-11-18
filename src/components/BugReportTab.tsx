"use client";

import React, { useState, useEffect } from "react";
import { Bug, Lock, Send, AlertTriangle, CheckCircle2, Clock, Sparkles, UserCheck, MessageSquare } from "lucide-react";

interface BugReportTabProps {
  currentUser: any;
  onOpenAuth: () => void;
}

export default function BugReportTab({ currentUser, onOpenAuth }: BugReportTabProps) {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("متوسط");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bugs");
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError("برای ارسال باگ اول باید ثبت‌نام کرده و وارد شوید!");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, severity }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "خطا در ثبت گزارش باگ");
      }

      setSuccessMsg(data.message || "گزارش شما ارسال شد و در آپدیت بعدی رسیدگی می‌شود.");
      setTitle("");
      setDescription("");
      await fetchReports();
    } catch (err: any) {
      setError(err.message || "خطا در ارسال گزارش");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950 border border-rose-500/40 text-rose-300 text-xs font-semibold mb-2">
              <Bug className="w-3.5 h-3.5 text-rose-400" />
              <span>مرکز گزارش اشکال و باگ‌های سایت</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100">
              مشکلت رو بنویس تا پارسا خیری سایت رو آپدیت بده! 🛠️
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
              هر گونه مشکل یا پیشنهادی در اجرای بازی، هوش مصنوعی، کادر کدنویسی یا ثبت‌نام دیدید بنویسید تا پارسا خیری سریعاً در نسخه جدید برطرف کند.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 shrink-0">
            <span className="block text-cyan-300 font-semibold mb-0.5">وضعیت آپدیت‌ها:</span>
            <span>نسخه فعال ۲.۵ پایدار</span>
          </div>
        </div>
      </div>

      {/* STRICT REQUIREMENT: IF NOT LOGGED IN, USER CANNOT SUBMIT */}
      {!currentUser ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#101424] border-2 border-amber-500/40 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-amber-300">
              ثبت‌نام الزامی است! ابتدا باید عضو سایت شوید
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              طبق قوانین سایت، برای نوشتن مشکل و ارسال گزارش باگ برای پارسا خیری، اول باید ثبت‌نام کنید؛ در غیر این صورت فرم گزارش قفل می‌باشد.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenAuth}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition active:scale-95"
            >
              🔐 ثبت‌نام و ورود جهت فعال‌سازی فرم باگ
            </button>
          </div>
        </div>
      ) : (
        /* Form Unlocked for Logged-In User */
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentUser.avatar || "👨‍💻"}</span>
              <div>
                <span className="text-xs text-slate-400">ارسال‌کننده گزارش:</span>
                <span className="text-sm font-bold text-cyan-300 block">{currentUser.username}</span>
              </div>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>هویت تایید شده</span>
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  عنوان مشکل یا باگ:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: دکمه تمام‌صفحه در گوشی یا باگ در ذخیره بازی..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  درجه اهمیت:
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 outline-none"
                >
                  <option value="کم">کم (پیشنهاد بهبود)</option>
                  <option value="متوسط">متوسط (اشکال در عملکرد)</option>
                  <option value="زیاد">زیاد (باگ در اجرای بازی یا کد)</option>
                  <option value="فوری">فوری (خطای اساسی)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                توضیحات مشکل به پارسا خیری:
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیح دهید مشکل دقیقاً چطور به وجود آمد تا پارسا خیری بتواند آن را تست و در آپدیت جدید سایت رفع کند..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "در حال ارسال..." : "ارسال گزارش باگ برای پارسا خیری"}</span>
            </button>
          </form>
        </div>
      )}

      {/* List of Reported Bugs & Tracker */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>پیگیری وضعیت گزارش‌ها و آپدیت‌های سایت</span>
          </h3>
          <span className="text-xs text-slate-400">{reports.length} مورد ثبت شده</span>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{report.user_avatar || "👨‍💻"}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{report.title}</h4>
                    <span className="text-[11px] text-slate-400">
                      ارسال توسط <span className="text-slate-200 font-semibold">{report.username}</span> • اهمیت: {report.severity}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="self-start sm:self-auto">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 ${
                      report.status.includes("برطرف شده")
                        ? "bg-emerald-950 border border-emerald-500/40 text-emerald-300"
                        : report.status.includes("تایید شده")
                        ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300"
                        : "bg-amber-950 border border-amber-500/40 text-amber-300"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{report.status}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                {report.description}
              </p>

              {/* Admin Note from Parsa Kheyri */}
              {report.admin_notes && (
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">پاسخ پارسا خیری:</span>
                  <span className="leading-relaxed">{report.admin_notes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

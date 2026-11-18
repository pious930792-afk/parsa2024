"use client";

import React, { useState, useEffect } from "react";
import { Users, UserPlus, Check, X, Shield, Sparkles, Heart, Gamepad2, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface FriendsTabProps {
  currentUser: any;
  onOpenAuth: () => void;
  onSelectGameByAuthor?: (authorName: string) => void;
}

export default function FriendsTab({ currentUser, onOpenAuth, onSelectGameByAuthor }: FriendsTabProps) {
  const [incoming, setIncoming] = useState<any[]>([]);
  const [outgoing, setOutgoing] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchFriendsData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await fetch("/api/friends");
      if (res.ok) {
        const data = await res.json();
        setIncoming(data.incoming || []);
        setOutgoing(data.outgoing || []);
        setFriends(data.friends || []);
        setAllUsers(data.otherUsers || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendsData();
  }, [currentUser]);

  // Handle Accept or Reject
  const handleRequestAction = async (requestId: number, action: "accept" | "reject") => {
    setActionLoading(requestId);
    try {
      const res = await fetch("/api/friends", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        if (action === "accept") {
          confetti({ particleCount: 50, spread: 60 });
        }
        await fetchFriendsData();
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // Send request
  const handleSendRequest = async (targetUsername: string) => {
    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverUsername: targetUsername }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        await fetchFriendsData();
        setTimeout(() => setMessage(null), 3500);
      } else {
        setMessage(data.error || "خطا در ارسال");
        setTimeout(() => setMessage(null), 3500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) {
    return (
      <div className="p-8 text-center glass-panel-glow rounded-2xl max-w-xl mx-auto my-8 border border-cyan-500/30">
        <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-3xl mx-auto mb-4">
          🤝
        </div>
        <h3 className="text-xl font-bold text-cyan-300 mb-2">سیستم دوستی و شبکه‌سازی برنامه‌نویسان</h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          برای دیدن درخواست‌های دوستی، فشردن دکمه «پذیرفتن» و افزودن دوستان برنامه‌نویس، ابتدا وارد حساب خود شوید.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition"
        >
          ورود یا ثبت‌نام سریع
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6" dir="rtl">
      {/* Toast Alert */}
      {message && (
        <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-200 text-xs sm:text-sm flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>دوستان و همراهان کدنویسی</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            با سایر سازندگان بازی و برنامه‌نویسان دوست شوید، بازی‌های یکدیگر را ببینید و تجربیاتتان را به اشتراک بگذارید.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <span>دوستان فعال:</span>
          <span className="font-bold text-cyan-400 text-sm">{friends.length}</span>
        </div>
      </div>

      {/* INCOMING REQUESTS WITH ACCEPT BUTTON (دکمه پذیرفتن) */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
            <span>درخواست‌های دوستی دریافتی</span>
            {incoming.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold animate-pulse">
                {incoming.length} جدید
              </span>
            )}
          </h3>
          <span className="text-xs text-slate-500">برای دوستی، روی دکمه سبز رنگ «پذیرفتن» بزنید</span>
        </div>

        {incoming.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800/60">
            در حال حاضر درخواست دوستی جدیدی ندارید. از لیست پایین به سایر برنامه‌نویسان درخواست بفرستید!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {incoming.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-slate-950 border-2 border-amber-500/40 flex items-center justify-between gap-3 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-amber-500/40 flex items-center justify-center text-2xl">
                    {req.sender_avatar || "👨‍💻"}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-100">{req.sender_username}</div>
                    <div className="text-xs text-amber-400/80">می‌خواهد با شما دوست شود! 🤝</div>
                  </div>
                </div>

                {/* THE REQUESTED ACCEPT BUTTON: «دکمه پذیرفتن» */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleRequestAction(req.id, "accept")}
                    disabled={actionLoading === req.id}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-emerald-600/30 transition active:scale-95"
                    title="پذیرفتن درخواست دوستی"
                  >
                    <Check className="w-4 h-4" />
                    <span>پذیرفتن</span>
                  </button>
                  <button
                    onClick={() => handleRequestAction(req.id, "reject")}
                    disabled={actionLoading === req.id}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 text-xs transition"
                    title="رد کردن"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACCEPTED FRIENDS LIST */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
          <span>لیست دوستان شما</span>
          <span className="text-xs text-slate-400 font-normal">({friends.length} نفر)</span>
        </h3>

        {friends.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800/60">
            هنوز دوستی به لیست شما اضافه نشده است. درخواست‌های ارسالی یا دریافتی را بررسی کنید!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {friends.map((friend) => {
              const friendName =
                friend.sender_username === currentUser.username
                  ? friend.receiver_username
                  : friend.sender_username;
              const friendAvatar =
                friend.sender_username === currentUser.username
                  ? "🎮"
                  : friend.sender_avatar || "👨‍💻";

              return (
                <div
                  key={friend.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-400/60 flex items-center justify-between gap-2 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-xl">
                      {friendAvatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200">{friendName}</div>
                      <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                        <span>دوست شما</span>
                      </div>
                    </div>
                  </div>

                  {onSelectGameByAuthor && (
                    <button
                      onClick={() => onSelectGameByAuthor(friendName)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs transition"
                      title="مشاهده بازی‌های این دوست"
                    >
                      <Gamepad2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DISCOVER DEVELOPERS / SUGGESTED USERS */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-cyan-400" />
          <span>پیشنهاد دوستی با سایر برنامه‌نویسان</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {allUsers.map((user) => {
            const isAlreadyFriend = friends.some(
              (f) => f.sender_username === user.username || f.receiver_username === user.username
            );
            const isPendingOutgoing = outgoing.some((o) => o.receiver_username === user.username);

            return (
              <div
                key={user.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                    {user.avatar || "👨‍💻"}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1">
                      {user.username}
                      {user.username === "پارسا خیری" && (
                        <span className="text-[10px] text-amber-300 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/40">
                          مدیر
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[120px]">
                      {user.bio || "برنامه‌نویس و سازنده بازی"}
                    </div>
                  </div>
                </div>

                {isAlreadyFriend ? (
                  <span className="text-[11px] text-emerald-400 px-2 py-1 rounded bg-emerald-950/50 border border-emerald-800">
                    دوست
                  </span>
                ) : isPendingOutgoing ? (
                  <span className="text-[11px] text-amber-400 px-2 py-1 rounded bg-amber-950/50 border border-amber-800">
                    ارسال شد
                  </span>
                ) : (
                  <button
                    onClick={() => handleSendRequest(user.username)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-medium transition flex items-center gap-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>درخواست</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

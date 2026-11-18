"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User, Copy, Check, Terminal, Code, Lightbulb, Zap, Crown } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PRESET_QUESTIONS = [
  "چطور با HTML و جاوااسکریپت بازی بسازم؟ 🎮",
  "پایتون چیه و از کجا باید شروع کنم؟ 🐍",
  "چگونه در بازی‌ها فیزیک پرش و جاذبه بنویسیم؟ 🚀",
  "فرق بین زبان فرانت‌اند و بک‌اند چیست؟ 🌐",
  "چطور در این سایت بازی را قفل کنیم تا کپی نشود؟ 🔒",
  "درباره سازنده این پلتفرم (پارسا خیری) بگو 👑",
];

export default function AIBotTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `سلام برنامه‌نویس خلاق! 🤖✨  
من **بات هوشمند کدنویسی** شما هستم که با همکاری **«پارسا خیری و جمینای (Gemini)»** طراحی شده‌ام.

هر سوالی درباره دنیای کدنویسی، زبان‌های برنامه‌نویسی (مثل HTML, CSS, جاوا اسکریپت و پایتون)، ساخت بازی‌های ویدیویی، حل ارورها و الگوریتم‌ها داری از من بپرس تا کامل برات توضیح بدم!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    if (!messageText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          message: textToSend,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "متاسفانه مشکلی در ارتباط رخ داد، اما نگران نباشید! لطفاً دوباره بپرسید یا کد خود را ارسال کنید.",
          },
        ]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "خطا در دریافت پاسخ. لطفاً ارتباط اینترنت خود را بررسی کنید.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4" dir="rtl">
      {/* Bot Header Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
              <span>بات هوشمند کدنویسی</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-purple-950 border border-purple-400/40 text-purple-300">
                موتور جمینای فعال
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              دستیار تخصصی کدنویسی تحت نظارت <span className="text-cyan-300 font-semibold">پارسا خیری</span>
            </p>
          </div>
        </div>

        {/* Quick hint badge */}
        <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl">
          <Crown className="w-4 h-4 text-amber-400 shrink-0" />
          <span>پاسخگویی به تمام زبان‌های برنامه‌نویسی</span>
        </div>
      </div>

      {/* Preset Questions Slider */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PRESET_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5 shrink-0"
          >
            <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="h-[480px] sm:h-[520px] overflow-y-auto p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm shadow-md ${
                msg.role === "user"
                  ? "bg-cyan-600 text-white shadow-cyan-600/30"
                  : "bg-purple-600 text-white shadow-purple-600/30"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg relative ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none"
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none font-normal"
              }`}
            >
              {/* Copy message button */}
              {msg.role === "assistant" && (
                <button
                  onClick={() => handleCopy(msg.content, i)}
                  className="absolute top-2 left-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                  title="کپی پاسخ"
                >
                  {copiedIndex === i ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              <div className="whitespace-pre-wrap select-text leading-relaxed">
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-purple-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>جمینای در حال تایپ و تحلیل کدنویسی است...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-2 bg-slate-900 border border-slate-800 focus-within:border-purple-500 rounded-2xl shadow-xl transition"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="هر سوالی درباره کدنویسی، ساخت بازی، HTML یا پایتون داری بپرس..."
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-600/30 transition disabled:opacity-40 flex items-center gap-1.5"
        >
          <span>ارسال</span>
          <Send className="w-3.5 h-3.5 rotate-180" />
        </button>
      </form>
    </div>
  );
}

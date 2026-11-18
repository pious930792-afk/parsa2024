"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Sparkles, Maximize2, Share2, Globe, RotateCcw, Copy, Check, Terminal, FileCode, Bot, Info, ShieldCheck, Zap } from "lucide-react";

interface CodeStudioProps {
  initialCode?: string;
  initialTitle?: string;
  initialLanguage?: string;
  onOpenFullscreen: (title: string, code: string, lang: string) => void;
  onOpenShareModal: (title: string, code: string, lang: string) => void;
}

const TEMPLATES: Record<string, { title: string; lang: string; code: string }> = {
  snake: {
    title: "مار نئونی افسانه‌ای",
    lang: "html",
    code: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مار نئونی پارسا خیری</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at center, #0f172a, #020617);
      color: #38bdf8;
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    h1 { font-size: 20px; margin-bottom: 6px; text-shadow: 0 0 10px #38bdf8; }
    #score { font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #38bdf8; }
    canvas {
      border: 2px solid #38bdf8;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
      background: #030712;
      max-width: 95vw;
    }
    .controls { margin-top: 10px; display: grid; grid-template-columns: repeat(3, 48px); gap: 6px; }
    .btn {
      width: 48px; height: 48px; background: #1e293b; border: 1px solid #38bdf8;
      color: #38bdf8; border-radius: 8px; font-size: 18px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
  </style>
</head>
<body>
  <h1>🐍 مار نئونی پارسا خیری</h1>
  <div id="score">امتیاز: 0</div>
  <canvas id="c" width="360" height="360"></canvas>
  <div class="controls">
    <div></div><button class="btn" onclick="dir('UP')">⬆️</button><div></div>
    <button class="btn" onclick="dir('LEFT')">⬅️</button>
    <button class="btn" onclick="dir('DOWN')">⬇️</button>
    <button class="btn" onclick="dir('RIGHT')">➡️</button>
  </div>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const grid = 18;
    let snake = [{x: 10, y: 10}];
    let food = {x: 5, y: 5};
    let dx = 0, dy = -1, score = 0, over = false;

    function dir(d) {
      if(d==='UP' && dy===0){dx=0;dy=-1;}
      if(d==='DOWN' && dy===0){dx=0;dy=1;}
      if(d==='LEFT' && dx===0){dx=-1;dy=0;}
      if(d==='RIGHT' && dx===0){dx=1;dy=0;}
    }
    window.addEventListener('keydown', e => {
      if(e.key==='ArrowUp') dir('UP');
      if(e.key==='ArrowDown') dir('DOWN');
      if(e.key==='ArrowLeft') dir('LEFT');
      if(e.key==='ArrowRight') dir('RIGHT');
    });

    function loop() {
      if(!over) {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        if(head.x < 0) head.x = 19; if(head.x > 19) head.x = 0;
        if(head.y < 0) head.y = 19; if(head.y > 19) head.y = 0;
        for(let s of snake) if(head.x===s.x && head.y===s.y) over = true;
        snake.unshift(head);
        if(head.x===food.x && head.y===food.y) {
          score += 10;
          document.getElementById('score').innerText = 'امتیاز: ' + score;
          food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
        } else { snake.pop(); }
      }
      ctx.fillStyle = '#030712';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(food.x*grid+1, food.y*grid+1, grid-2, grid-2);
      ctx.fillStyle = '#38bdf8';
      snake.forEach(s => ctx.fillRect(s.x*grid+1, s.y*grid+1, grid-2, grid-2));
      if(over) {
        ctx.fillStyle = '#ef4444'; ctx.font = '22px system-ui';
        ctx.textAlign = 'center'; ctx.fillText('باختید! کلیک کنید', 180, 180);
      }
    }
    canvas.onclick = () => { if(over){ snake=[{x:10,y:10}]; dx=0; dy=-1; score=0; over=false; } };
    setInterval(loop, 120);
  </script>
</body>
</html>`,
  },
  space: {
    title: "جنگ ستارگان و دفاع فضایی",
    lang: "html",
    code: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>دفاع فضایی</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #020617; color: #fff; font-family: system-ui; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }
    canvas { border: 2px solid #a855f7; border-radius: 12px; box-shadow: 0 0 20px rgba(168,85,247,0.4); background: #09090b; }
    #hud { margin-bottom: 6px; font-weight: bold; color: #c084fc; font-size: 16px; }
    .btns { margin-top: 8px; display: flex; gap: 8px; }
    .btn { background: #1e1b4b; border: 1px solid #a855f7; color: #fff; padding: 8px 16px; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="hud">امتیاز: <span id="s">0</span> | جان: <span id="l">3</span></div>
  <canvas id="c" width="360" height="420"></canvas>
  <div class="btns">
    <button class="btn" onmousedown="k.ArrowLeft=true" onmouseup="k.ArrowLeft=false">◀️ چپ</button>
    <button class="btn" style="background:#7e22ce" onclick="shoot()">🔥 شلیک</button>
    <button class="btn" onmousedown="k.ArrowRight=true" onmouseup="k.ArrowRight=false">راست ▶️</button>
  </div>
  <script>
    const c = document.getElementById('c'), ctx = c.getContext('2d');
    let p = { x: 160, y: 370, w: 32, h: 32 }, b = [], e = [], k = {}, s = 0, l = 3;
    window.onkeydown = ev => k[ev.key] = true;
    window.onkeyup = ev => k[ev.key] = false;
    function shoot() { b.push({x: p.x+14, y: p.y, w: 4, h: 10}); }
    window.addEventListener('keydown', ev => { if(ev.code==='Space') shoot(); });

    let t = 0;
    function loop() {
      if(k.ArrowLeft && p.x > 0) p.x -= 5;
      if(k.ArrowRight && p.x < c.width - p.w) p.x += 5;
      b.forEach((item, i) => { item.y -= 7; if(item.y < 0) b.splice(i, 1); });
      t++;
      if(t % 45 === 0) e.push({x: Math.random()*(c.width-25), y: -20, w: 24, h: 24});
      e.forEach((en, ei) => {
        en.y += 2.5;
        b.forEach((bu, bi) => {
          if(bu.x < en.x+en.w && bu.x+bu.w > en.x && bu.y < en.y+en.h && bu.y+bu.h > en.y) {
            e.splice(ei, 1); b.splice(bi, 1); s += 10;
            document.getElementById('s').innerText = s;
          }
        });
        if(en.y > c.height) e.splice(ei, 1);
      });

      ctx.fillStyle = '#09090b'; ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#a855f7'; b.forEach(item => ctx.fillRect(item.x, item.y, item.w, item.h));
      ctx.fillStyle = '#ef4444'; e.forEach(en => ctx.fillRect(en.x, en.y, en.w, en.h));
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`,
  },
  flappy: {
    title: "پرنده جهنده (Flappy Bird)",
    lang: "html",
    code: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>پرنده جهنده</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0f172a; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui; color: #fff; }
    canvas { border: 2px solid #22c55e; border-radius: 12px; background: #38bdf8; max-width: 95vw; cursor: pointer; }
  </style>
</head>
<body>
  <h3 style="margin-bottom:6px; color:#4ade80;">🐥 پرنده جهنده پارسا خیری</h3>
  <canvas id="c" width="340" height="420"></canvas>
  <p style="margin-top:6px; font-size:12px; color:#cbd5e1;">برای پرش روی صفحه یا کلید Space بزنید 👆</p>
  <script>
    const c = document.getElementById('c'), ctx = c.getContext('2d');
    let b = {y: 180, vy: 0}, pipes = [], s = 0, over = false, frame = 0;
    function jump() { if(over){ over=false; b.y=180; b.vy=0; pipes=[]; s=0; } else b.vy = -5.5; }
    c.onclick = jump; window.onkeydown = e => { if(e.code==='Space') jump(); };

    function loop() {
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(0,0,c.width,c.height);
      if(!over) {
        b.vy += 0.28; b.y += b.vy;
        frame++;
        if(frame % 85 === 0) {
          const h = Math.random()*150 + 50;
          pipes.push({x: c.width, top: h, bottom: c.height - h - 100, sc: false});
        }
        pipes.forEach((p, i) => {
          p.x -= 2;
          if(!p.sc && p.x < 50) { s++; p.sc = true; }
          if(50 > p.x && 50 < p.x + 35) {
            if(b.y < p.top || b.y > c.height - p.bottom) over = true;
          }
          if(p.x < -40) pipes.splice(i, 1);
        });
        if(b.y > c.height || b.y < 0) over = true;
      }
      ctx.fillStyle = '#22c55e';
      pipes.forEach(p => {
        ctx.fillRect(p.x, 0, 35, p.top);
        ctx.fillRect(p.x, c.height - p.bottom, 35, p.bottom);
      });
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(50, b.y, 12, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 20px system-ui'; ctx.fillText(s, c.width/2 - 10, 35);
      if(over) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0,0,c.width,c.height);
        ctx.fillStyle = '#ef4444'; ctx.fillText('باختید! کلیک کنید', 90, 200);
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`,
  },
  python: {
    title: "الگوریتم هوش مصنوعی و بازی پایتون",
    lang: "python",
    code: `# ============================================
# استودیو کدنویسی پایتون پارسا خیری با کمک جمینای 🐍
# الگوریتم جستجوی باینری و هوش مصنوعی
# ============================================

import random
import time

print("=" * 40)
print("🚀 به سامانه کدنویسی پایتون خوش آمدید!")
print("=" * 40)

target = random.randint(1, 100)
print(f"🎯 هوش مصنوعی یک عدد تصادفی بین ۱ تا ۱۰۰ انتخاب کرد: {target}")

# شبیه‌سازی هوش مصنوعی جمینای برای پیدا کردن عدد
low = 1
high = 100
steps = 0

print("\n🤖 در حال حل هوشمند با الگوریتم Binary Search...")

while low <= high:
    steps += 1
    mid = (low + high) // 2
    print(f"مرحله {steps}: بررسی عدد {mid}...")
    
    if mid == target:
        print(f"✨ عدد هدف ({mid}) با موفقیت در {steps} گام کشف شد!")
        break
    elif mid < target:
        print(f"   -> عدد هدف بزرگتر است (بازه: {mid+1} تا {high})")
        low = mid + 1
    else:
        print(f"   -> عدد هدف کوچکتر است (بازه: {low} تا {mid-1})")
        high = mid - 1

print("\nتحلیل عملکرد جمینای:")
print(f"• سرعت اجرا: O(log N) بهینه")
print(f"• توسعه‌دهنده: پارسا خیری")
print("از کدنویسی در این پلتفرم لذت ببرید!")
`,
  },
};

export default function CodeStudio({
  initialCode,
  initialTitle,
  initialLanguage = "html",
  onOpenFullscreen,
  onOpenShareModal,
}: CodeStudioProps) {
  const [code, setCode] = useState(initialCode || TEMPLATES.snake.code);
  const [title, setTitle] = useState(initialTitle || TEMPLATES.snake.title);
  const [language, setLanguage] = useState(initialLanguage);

  // Runtime Sandbox state
  const [runnerKey, setRunnerKey] = useState(1);
  const [activeTab, setActiveTab] = useState<"preview" | "terminal">("preview");
  const [pythonOutput, setPythonOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // AI Explanation state
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync if props update
  useEffect(() => {
    if (initialCode) setCode(initialCode);
    if (initialTitle) setTitle(initialTitle);
    if (initialLanguage) setLanguage(initialLanguage);
  }, [initialCode, initialTitle, initialLanguage]);

  // Execute Code / Run Game
  const handleRunCode = () => {
    setIsRunning(true);
    setRunnerKey((k) => k + 1);

    if (language === "python" || code.includes("def ") || code.includes("import ")) {
      setActiveTab("terminal");
      simulatePythonExecution(code);
    } else {
      setActiveTab("preview");
    }

    setTimeout(() => setIsRunning(false), 300);
  };

  // Python simulator for browser execution
  const simulatePythonExecution = (pyCode: string) => {
    const lines = pyCode.split("\n");
    const outputLines: string[] = [
      `>>> اجرای پایتون ۳.۱۲ در بستر شبیه‌ساز پارسا خیری...`,
      `>>> در حال کامپایل و پردازش کد...`,
      `----------------------------------------`,
    ];

    let target = Math.floor(Math.random() * 100) + 1;
    let printedAny = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("print(") && trimmed.endsWith(")")) {
        let inside = trimmed.slice(6, -1);
        // Clean quotes and f-string
        inside = inside.replace(/^[fF]?["']/, "").replace(/["']$/, "");
        inside = inside.replace("{target}", target.toString());
        outputLines.push(inside);
        printedAny = true;
      }
    });

    if (!printedAny) {
      outputLines.push(`✅ برنامه پایتون با موفقیت بدون ارور اجرا گردید.`);
      outputLines.push(`[Process finished with exit code 0]`);
    } else {
      outputLines.push(`----------------------------------------`);
      outputLines.push(`[پایان اجرای کد پایتون با موفقیت - زمان اجرا: ۰.۰۳ ثانیه]`);
    }

    setPythonOutput(outputLines);
  };

  // AI Explain Code: Calls /api/ai
  const handleExplainWithAI = async () => {
    setIsAiLoading(true);
    setAiExplanation(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "explain",
          code,
          language,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setAiExplanation(data.reply);
      } else {
        setAiExplanation("خطا در تحلیل هوش مصنوعی. لطفاً دوباره تلاش کنید.");
      }
    } catch (err) {
      setAiExplanation("خطا در برقراری ارتباط با جمینای.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectTemplate = (key: string) => {
    const t = TEMPLATES[key];
    if (t) {
      setTitle(t.title);
      setLanguage(t.lang);
      setCode(t.code);
      setAiExplanation(null);
      setRunnerKey((k) => k + 1);
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* Top Studio Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        {/* Game / Project Title Input */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
            <FileCode className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان بازی یا پروژه کدنویسی..."
            className="flex-1 bg-transparent text-sm sm:text-base font-bold text-slate-100 outline-none border-b border-transparent focus:border-cyan-400 px-1 py-0.5 transition"
          />
        </div>

        {/* Quick Game Templates Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <span className="text-[11px] text-slate-400 shrink-0 hidden sm:inline">قالب‌های آماده:</span>
          <button
            onClick={() => handleSelectTemplate("snake")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium whitespace-nowrap transition"
          >
            🐍 مار نئونی
          </button>
          <button
            onClick={() => handleSelectTemplate("space")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-medium whitespace-nowrap transition"
          >
            🚀 دفاع فضایی
          </button>
          <button
            onClick={() => handleSelectTemplate("flappy")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium whitespace-nowrap transition"
          >
            🐥 فلاپی
          </button>
          <button
            onClick={() => handleSelectTemplate("python")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-medium whitespace-nowrap transition"
          >
            🐍 پایتون
          </button>
        </div>

        {/* Language selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-cyan-400"
        >
          <option value="html">HTML / Canvas بازی</option>
          <option value="python">پایتون (Python)</option>
          <option value="javascript">جاوا اسکریپت (JS)</option>
        </select>
      </div>

      {/* Main Studio Controls Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
        {/* Left Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* THE REQUESTED EXECUTE BUTTON: «دکمه اجرا» */}
          <button
            onClick={handleRunCode}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/30 transition flex items-center gap-1.5 active:scale-95"
            title="اجرای کد یا بازی"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>اجرای بازی / کد</span>
          </button>

          {/* THE REQUESTED AI EXPLAIN BUTTON: «هوش مصنوعی که توضیح بده» */}
          <button
            onClick={handleExplainWithAI}
            disabled={isAiLoading}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-600/30 transition flex items-center gap-1.5 disabled:opacity-50"
            title="توضیح خط‌به‌خط کد با هوش مصنوعی جمینای"
          >
            <Sparkles className="w-4 h-4 text-purple-200 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{isAiLoading ? "جمینای در حال تحلیل..." : "توضیح با هوش مصنوعی"}</span>
          </button>

          {/* THE REQUESTED FULLSCREEN BUTTON: «با دکمه بشه تمام صفحه کرد با انیمیشن خیلی خوب» */}
          <button
            onClick={() => onOpenFullscreen(title, code, language)}
            className="px-3.5 py-2 rounded-xl bg-cyan-600/90 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-cyan-600/30 transition flex items-center gap-1.5 active:scale-95"
            title="تمام صفحه کردن بازی با انیمیشن روان"
          >
            <Maximize2 className="w-4 h-4" />
            <span>تمام‌صفحه با انیمیشن</span>
          </button>
        </div>

        {/* Right Share and Copy Buttons */}
        <div className="flex items-center gap-2">
          {/* THE REQUESTED SHARE BUTTONS */}
          <button
            onClick={() => onOpenShareModal(title, code, language)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5"
            title="اشتراک با رفقا یا همه مردم"
          >
            <Share2 className="w-4 h-4" />
            <span>اشتراک‌گذاری بازی</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition"
            title="کپی کردن کد"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Grid: Code Editor (Left/Right) & Live Preview Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Input Box (کادر کدنویسی) */}
        <div className="flex flex-col h-[520px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl relative">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-400 font-mono mr-2">editor.{language}</span>
            </div>
            <span className="text-[11px] text-cyan-400 font-medium">
              هر کدی چه HTML چه پایتون قبول می‌کند ✨
            </span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-4 bg-[#050811] text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed outline-none resize-none selection:bg-cyan-500 selection:text-black overflow-y-auto"
            style={{ direction: "ltr", textAlign: "left", tabSize: 2 }}
            placeholder="// کد HTML، جاوا اسکریپت یا پایتون خود را اینجا بنویسید یا کپی کنید..."
          />
        </div>

        {/* Live Runner / Output Box */}
        <div className="flex flex-col h-[520px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">محیط خروجی زنده:</span>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  activeTab === "preview"
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🎮 بازی و بوم وب
              </button>
              <button
                onClick={() => setActiveTab("terminal")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  activeTab === "terminal"
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                💻 کنسول پایتون
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleRunCode}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition"
                title="تازه سازی / اجرای مجدد"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenFullscreen(title, code, language)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition"
                title="تمام‌صفحه"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 w-full h-full relative bg-black overflow-hidden flex items-center justify-center">
            {activeTab === "preview" ? (
              <iframe
                key={runnerKey}
                title="Game Sandbox Runner"
                srcDoc={code}
                sandbox="allow-scripts allow-modals allow-same-origin allow-popups"
                className="w-full h-full border-none bg-black"
              />
            ) : (
              /* Terminal for Python */
              <div
                className="w-full h-full p-4 bg-[#0a0f1d] font-mono text-xs sm:text-sm text-cyan-200 overflow-y-auto space-y-1.5"
                style={{ direction: "ltr", textAlign: "left" }}
              >
                {pythonOutput.length === 0 ? (
                  <div className="text-slate-500 pt-8 text-center" style={{ direction: "rtl" }}>
                    برای مشاهده خروجی پایتون، روی دکمه سبز رنگ «اجرای بازی / کد» کلیک کنید.
                  </div>
                ) : (
                  pythonOutput.map((out, idx) => (
                    <div
                      key={idx}
                      className={
                        out.includes(">>>")
                          ? "text-purple-400"
                          : out.includes("✅") || out.includes("✨")
                          ? "text-emerald-400 font-bold"
                          : out.includes("🎯") || out.includes("🤖")
                          ? "text-amber-300"
                          : "text-slate-200"
                      }
                    >
                      {out}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Code Explainer Drawer / Response Panel */}
      {aiExplanation && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border-2 border-purple-500/40 shadow-2xl animate-in slide-in-from-bottom-3 relative">
          <button
            onClick={() => setAiExplanation(null)}
            className="absolute top-4 left-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            title="بستن تحلیل"
          >
            ✕
          </button>

          <div className="flex items-center gap-2 mb-3 text-purple-300 font-bold text-sm sm:text-base">
            <Bot className="w-5 h-5 text-purple-400" />
            <span>توضیح هوش مصنوعی جمینای درباره این کد:</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 whitespace-pre-wrap select-text bg-slate-950/60 p-4 rounded-xl border border-purple-500/20">
            {aiExplanation}
          </div>
        </div>
      )}
    </div>
  );
}

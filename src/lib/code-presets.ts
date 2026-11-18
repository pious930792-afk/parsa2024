export interface AvatarPreset {
  id: string;
  label: string;
  url: string;
}

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: "cyber-parsa",
    label: "هکر نئون سایبر",
    url: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00F0FF"/>
            <stop offset="100%" stop-color="#7C3AED"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="#0E111D"/>
        <circle cx="60" cy="60" r="56" fill="none" stroke="url(#g1)" stroke-width="4"/>
        <circle cx="60" cy="46" r="20" fill="url(#g1)"/>
        <rect x="42" y="40" width="36" height="10" rx="5" fill="#090A0F"/>
        <rect x="46" y="43" width="10" height="4" rx="2" fill="#00F0FF"/>
        <rect x="64" y="43" width="10" height="4" rx="2" fill="#FF2A85"/>
        <path d="M28 98 C28 74 92 74 92 98" fill="url(#g1)"/>
      </svg>
    `),
  },
  {
    id: "gemini-bot",
    label: "هوش مصنوعی جمینای",
    url: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#A855F7"/>
            <stop offset="50%" stop-color="#EC4899"/>
            <stop offset="100%" stop-color="#00F0FF"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="#121024"/>
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#g2)" stroke-width="4"/>
        <path d="M60 18 C64 42 78 56 102 60 C78 64 64 78 60 102 C56 78 42 64 18 60 C42 56 56 42 60 18 Z" fill="url(#g2)"/>
        <circle cx="60" cy="60" r="10" fill="#FFFFFF"/>
      </svg>
    `),
  },
  {
    id: "arcade-knight",
    label: "شوالیه بازی‌ساز",
    url: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FF2A85"/>
            <stop offset="100%" stop-color="#F59E0B"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="#170E18"/>
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#g3)" stroke-width="4"/>
        <polygon points="60,22 86,44 78,86 42,86 34,44" fill="url(#g3)"/>
        <rect x="44" y="48" width="32" height="10" rx="4" fill="#090A0F"/>
        <circle cx="52" cy="53" r="3" fill="#00F0FF"/>
        <circle cx="68" cy="53" r="3" fill="#00F0FF"/>
      </svg>
    `),
  },
  {
    id: "python-master",
    label: "استاد پایتون",
    url: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#10B981"/>
            <stop offset="100%" stop-color="#3B82F6"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="#0B1917"/>
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#g4)" stroke-width="4"/>
        <rect x="34" y="34" width="52" height="52" rx="16" fill="url(#g4)"/>
        <text x="60" y="68" font-family="monospace" font-weight="bold" font-size="28" fill="#090A0F" text-anchor="middle">PY</text>
      </svg>
    `),
  },
  {
    id: "html-architect",
    label: "معمار وب HTML",
    url: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="g5" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#F97316"/>
            <stop offset="100%" stop-color="#EC4899"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="#1A110D"/>
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#g5)" stroke-width="4"/>
        <circle cx="60" cy="60" r="36" fill="url(#g5)"/>
        <text x="60" y="68" font-family="monospace" font-weight="bold" font-size="24" fill="#FFFFFF" text-anchor="middle">&lt;/&gt;</text>
      </svg>
    `),
  },
  {
    id: "pixel-queen",
    label: "ملکه پیکسل",
    url: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="g6" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#EC4899"/>
            <stop offset="100%" stop-color="#06B6D4"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="#170E21"/>
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#g6)" stroke-width="4"/>
        <polygon points="34,52 44,32 60,46 76,32 86,52 82,82 38,82" fill="url(#g6)"/>
        <circle cx="50" cy="64" r="4" fill="#FFFFFF"/>
        <circle cx="70" cy="64" r="4" fill="#FFFFFF"/>
      </svg>
    `),
  },
];

export interface CodeTemplate {
  id: string;
  title: string;
  language: "html" | "python" | "javascript";
  badge: string;
  description: string;
  code: string;
}

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: "space-defender",
    title: "بازی نبرد سفینه نئونی (HTML5 Canvas)",
    language: "html",
    badge: "بازی کامل HTML5",
    description:
      "یک بازی آرکید فضایی کامل ساخته شده با HTML5 و JavaScript! با کلیدهای جهت‌نما یا ماوس/لمس سفینه را حرکت دهید و با کلید Space یا کلیک شلیک کنید.",
    code: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>نبرد سفینه نئونی - پارسا کد</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      background: radial-gradient(circle at center, #11162B 0%, #06070C 100%);
      color: #F3F4F6;
      font-family: Tahoma, sans-serif;
      overflow: hidden;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    #hud {
      position: fixed;
      top: 12px;
      left: 16px;
      right: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(18, 20, 30, 0.85);
      border: 1px solid rgba(0, 240, 255, 0.35);
      padding: 8px 18px;
      border-radius: 12px;
      backdrop-filter: blur(8px);
      z-index: 10;
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
    }
    .stat { font-size: 15px; font-weight: bold; color: #00F0FF; }
    .stat span { color: #FF2A85; font-size: 18px; margin-right: 4px; }
    canvas {
      border: 2px solid rgba(0, 240, 255, 0.4);
      border-radius: 16px;
      box-shadow: 0 0 35px rgba(0, 240, 255, 0.2);
      background: #070810;
      max-width: 96vw;
      max-height: 82vh;
      cursor: crosshair;
    }
    #controls-hint {
      margin-top: 8px;
      font-size: 12px;
      color: #9CA3AF;
    }
    .btn-restart {
      background: linear-gradient(135deg, #00F0FF, #7C3AED);
      color: #090A0F;
      border: none;
      padding: 5px 14px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="hud">
    <div class="stat">امتیاز: <span id="score">0</span></div>
    <div class="stat">مرحله: <span id="wave">1</span></div>
    <div class="stat">جان: <span id="lives">❤️❤️❤️</span></div>
    <button class="btn-restart" onclick="resetGame()">شروع مجدد</button>
  </div>
  <canvas id="game" width="720" height="460"></canvas>
  <div id="controls-hint">حرکت با ماوس یا کلیدهای چپ/راست (⬅️ ➡️) | شلیک خودکار و کلیک</div>

  <script>
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    const waveEl = document.getElementById('wave');
    const livesEl = document.getElementById('lives');

    let score = 0, wave = 1, lives = 3, gameOver = false;
    const player = { x: 360, y: 405, w: 44, h: 32, speed: 7 };
    let bullets = [], enemies = [], particles = [], stars = [];
    const keys = {};

    for (let i = 0; i < 65; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2 + 0.5,
        v: Math.random() * 1.5 + 0.4
      });
    }

    function spawnWave() {
      const cols = Math.min(8, 4 + wave);
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < cols; c++) {
          enemies.push({
            x: 80 + c * 74,
            y: 45 + r * 52,
            w: 36,
            h: 28,
            vx: (1.4 + wave * 0.25) * (r % 2 === 0 ? 1 : -1),
            color: r === 0 ? '#FF2A85' : '#A855F7',
            hp: r === 0 ? 2 : 1
          });
        }
      }
    }

    function createExplosion(x, y, color) {
      for (let i = 0; i < 16; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 7,
          vy: (Math.random() - 0.5) * 7,
          life: 28,
          color
        });
      }
    }

    window.addEventListener('keydown', e => keys[e.code] = true);
    window.addEventListener('keyup', e => keys[e.code] = false);
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      player.x = (e.clientX - rect.left) * scaleX;
    });
    canvas.addEventListener('click', () => {
      if (gameOver) resetGame();
      else shoot();
    });

    function shoot() {
      bullets.push({ x: player.x - 10, y: player.y - 16, vy: -9 });
      bullets.push({ x: player.x + 10, y: player.y - 16, vy: -9 });
    }

    let frame = 0;
    function resetGame() {
      score = 0; wave = 1; lives = 3; gameOver = false;
      bullets = []; enemies = []; particles = [];
      scoreEl.textContent = score;
      waveEl.textContent = wave;
      livesEl.textContent = '❤️❤️❤️';
      spawnWave();
    }

    spawnWave();

    function loop() {
      requestAnimationFrame(loop);
      ctx.fillStyle = '#070810';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = '#00F0FF';
      stars.forEach(st => {
        st.y += st.v;
        if (st.y > canvas.height) { st.y = 0; st.x = Math.random() * canvas.width; }
        ctx.globalAlpha = 0.5;
        ctx.fillRect(st.x, st.y, st.s, st.s);
      });
      ctx.globalAlpha = 1;

      if (gameOver) {
        ctx.fillStyle = '#FF2A85';
        ctx.font = 'bold 34px Tahoma';
        ctx.textAlign = 'center';
        ctx.fillText('پایان بازی! امتیاز شما: ' + score, canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillStyle = '#00F0FF';
        ctx.font = '18px Tahoma';
        ctx.fillText('برای بازی دوباره کلیک کنید', canvas.width / 2, canvas.height / 2 + 32);
        return;
      }

      frame++;
      if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
      if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
      player.x = Math.max(30, Math.min(canvas.width - 30, player.x));

      if (frame % 16 === 0) shoot();

      // Draw Player Ship
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#00F0FF';
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(22, 16);
      ctx.lineTo(0, 8);
      ctx.lineTo(-22, 16);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Bullets
      ctx.fillStyle = '#10B981';
      bullets.forEach((b, bi) => {
        b.y += b.vy;
        ctx.fillRect(b.x - 2, b.y, 4, 12);
        if (b.y < 0) bullets.splice(bi, 1);
      });

      // Enemies
      if (enemies.length === 0) {
        wave++;
        waveEl.textContent = wave;
        spawnWave();
      }

      enemies.forEach((en, ei) => {
        en.x += en.vx;
        if (en.x < 30 || en.x > canvas.width - 30) {
          en.vx *= -1;
          en.y += 18;
        }

        ctx.save();
        ctx.translate(en.x, en.y);
        ctx.shadowColor = en.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = en.color;
        ctx.fillRect(-en.w / 2, -en.h / 2, en.w, en.h);
        ctx.fillStyle = '#070810';
        ctx.fillRect(-10, -4, 6, 6);
        ctx.fillRect(4, -4, 6, 6);
        ctx.restore();

        // Hit detection
        bullets.forEach((b, bi) => {
          if (Math.abs(b.x - en.x) < en.w / 2 && Math.abs(b.y - en.y) < en.h / 2) {
            bullets.splice(bi, 1);
            en.hp--;
            if (en.hp <= 0) {
              createExplosion(en.x, en.y, en.color);
              enemies.splice(ei, 1);
              score += 25;
              scoreEl.textContent = score;
            }
          }
        });

        if (en.y > player.y - 20) {
          enemies.splice(ei, 1);
          lives--;
          livesEl.textContent = '❤️'.repeat(Math.max(0, lives));
          createExplosion(player.x, player.y, '#FF2A85');
          if (lives <= 0) gameOver = true;
        }
      });

      // Particles
      particles.forEach((p, pi) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 28;
        ctx.fillRect(p.x, p.y, 4, 4);
        if (p.life <= 0) particles.splice(pi, 1);
      });
      ctx.globalAlpha = 1;
    }
    loop();
  </script>
</body>
</html>`,
  },
  {
    id: "cyber-snake",
    title: "مار نئونی سایبرپانک (Cyber Snake)",
    language: "html",
    badge: "بازی کلاسیک نئون",
    description:
      "بازی محبوب مار با گرافیک نئونی و دکمه‌های لمسی و کیبورد! انرژی‌های سایبری را جمع کنید و رکورد بزنید.",
    code: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مار نئونی سایبر</title>
  <style>
    body {
      margin: 0;
      background: #08090F;
      color: #fff;
      font-family: Tahoma, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
    }
    .bar {
      display: flex;
      gap: 24px;
      align-items: center;
      margin-bottom: 10px;
      background: #12141E;
      padding: 8px 20px;
      border-radius: 12px;
      border: 1px solid #A855F7;
    }
    canvas {
      background: #0D0F18;
      border: 2px solid #00F0FF;
      border-radius: 14px;
      box-shadow: 0 0 28px rgba(0, 240, 255, 0.22);
    }
    .dpad {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .dpad button {
      background: #1C1F2E;
      color: #00F0FF;
      border: 1px solid #00F0FF;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="bar">
    <div>امتیاز: <b id="sc" style="color:#00F0FF">0</b></div>
    <div>بهترین رکورد: <b id="hi" style="color:#FF2A85">0</b></div>
    <button onclick="init()" style="background:#00F0FF;border:none;padding:4px 12px;border-radius:6px;cursor:pointer;font-weight:bold;">شروع دوباره</button>
  </div>
  <canvas id="c" width="440" height="360"></canvas>
  <div class="dpad">
    <button onclick="setDir(0,-1)">⬆️</button>
    <button onclick="setDir(0,1)">⬇️</button>
    <button onclick="setDir(-1,0)">⬅️</button>
    <button onclick="setDir(1,0)">➡️</button>
  </div>
  <script>
    const c = document.getElementById('c');
    const ctx = c.getContext('2d');
    const grid = 20;
    let snake, dir, food, score, high = 0;

    function init() {
      snake = [{x: 10, y: 9}, {x: 9, y: 9}, {x: 8, y: 9}];
      dir = {x: 1, y: 0};
      score = 0;
      document.getElementById('sc').textContent = 0;
      placeFood();
    }

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * (c.width / grid)),
        y: Math.floor(Math.random() * (c.height / grid))
      };
    }

    function setDir(x, y) {
      if (dir.x !== -x && dir.y !== -y) dir = {x, y};
    }

    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') setDir(0, -1);
      if (e.key === 'ArrowDown') setDir(0, 1);
      if (e.key === 'ArrowLeft') setDir(-1, 0);
      if (e.key === 'ArrowRight') setDir(1, 0);
    });

    init();
    setInterval(() => {
      const head = {
        x: (snake[0].x + dir.x + c.width / grid) % (c.width / grid),
        y: (snake[0].y + dir.y + c.height / grid) % (c.height / grid)
      };

      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        init();
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        if (score > high) high = score;
        document.getElementById('sc').textContent = score;
        document.getElementById('hi').textContent = high;
        placeFood();
      } else {
        snake.pop();
      }

      ctx.fillStyle = '#0D0F18';
      ctx.fillRect(0, 0, c.width, c.height);

      // Food
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#FF2A85';
      ctx.fillStyle = '#FF2A85';
      ctx.beginPath();
      ctx.arc(food.x * grid + 10, food.y * grid + 10, 8, 0, Math.PI * 2);
      ctx.fill();

      // Snake
      snake.forEach((p, idx) => {
        ctx.shadowColor = '#00F0FF';
        ctx.fillStyle = idx === 0 ? '#00F0FF' : '#7C3AED';
        ctx.fillRect(p.x * grid + 2, p.y * grid + 2, grid - 4, grid - 4);
      });
      ctx.shadowBlur = 0;
    }, 105);
  </script>
</body>
</html>`,
  },
  {
    id: "crystal-breakout",
    title: "توپ‌شکن کهکشانی (Neon Breakout)",
    language: "html",
    badge: "فیزیک و آرکید",
    description:
      "با حرکت دادن راکت نئونی، بلوک‌های کریستالی را بشکنید و امتیاز جمع کنید. مناسب برای یادگیری برخورد در بازی‌سازی.",
    code: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>توپ‌شکن کهکشانی</title>
  <style>
    body {
      margin: 0;
      background: #07080E;
      color: #fff;
      font-family: Tahoma, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    canvas {
      background: #0E101A;
      border: 2px solid #FF2A85;
      border-radius: 14px;
      box-shadow: 0 0 30px rgba(255, 42, 133, 0.25);
    }
  </style>
</head>
<body>
  <h3 style="color:#00F0FF;margin-bottom:8px;">توپ‌شکن نئون | امتیاز: <span id="pts">0</span></h3>
  <canvas id="brk" width="560" height="360"></canvas>
  <script>
    const canvas = document.getElementById('brk');
    const ctx = canvas.getContext('2d');
    let paddleX = 230, score = 0;
    const ball = { x: 280, y: 280, vx: 4, vy: -4, r: 8 };
    const bricks = [];
    const colors = ['#FF2A85', '#00F0FF', '#A855F7', '#10B981'];

    function setupBricks() {
      bricks.length = 0;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 7; c++) {
          bricks.push({ x: 24 + c * 74, y: 35 + r * 32, w: 64, h: 20, color: colors[r], alive: true });
        }
      }
    }
    setupBricks();

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      paddleX = (e.clientX - rect.left) * (canvas.width / rect.width) - 50;
    });

    function draw() {
      requestAnimationFrame(draw);
      ctx.fillStyle = '#0E101A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Paddle
      ctx.fillStyle = '#00F0FF';
      ctx.fillRect(paddleX, 330, 100, 12);

      // Ball
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < 10 || ball.x > canvas.width - 10) ball.vx *= -1;
      if (ball.y < 10) ball.vy *= -1;
      if (ball.y > 322 && ball.x > paddleX && ball.x < paddleX + 100) {
        ball.vy = -Math.abs(ball.vy);
      }
      if (ball.y > canvas.height) {
        ball.x = 280; ball.y = 260; ball.vy = -4;
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      // Bricks
      bricks.forEach(b => {
        if (!b.alive) return;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        if (ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) {
          b.alive = false;
          ball.vy *= -1;
          score += 15;
          document.getElementById('pts').textContent = score;
          if (bricks.every(k => !k.alive)) setupBricks();
        }
      });
    }
    draw();
  </script>
</body>
</html>`,
  },
  {
    id: "python-rpg-engine",
    title: "شبیه‌ساز نبرد و الگوریتم به زبان پایتون (Python)",
    language: "python",
    badge: "کد پایتون (Python)",
    description:
      "این کد پایتون را اجرا کنید تا خروجی زنده حلقه‌ها، توابع، لیست‌ها و شبیه‌ساز بازی متنی پایتون را ببینید!",
    code: `# برنامه پایتون: شبیه‌ساز قهرمان کدنویسی و الگوریتم‌ها
# ساخته شده در استودیو پارسا خیری با کمک جمینای

player_name = "پارسا"
level = 5
skills = ["HTML5", "Python", "JavaScript", "ساخت بازی"]

print("=== خوش آمدید به موتور اجرای پایتون ===")
print("نام قهرمان:", player_name)
print("سطح فعلی:", level)
print("مهارت‌های کسب شده:", ", ".join(skills))

def calculate_power(lvl, bonus):
    return (lvl * 120) + bonus

hero_power = calculate_power(level, 250)
print("قدرت کل کدنویسی شما:", hero_power, "امتیاز نئون!")

print("\\n--- شبیه‌سازی ۳ مرحله نبرد با باگ‌های سیستم ---")
for stage in range(1, 4):
    xp_gain = stage * 75
    print(f"مرحله {stage}: باگ شکست داده شد! +{xp_gain} امتیاز تجربه")

# محاسبه دنباله فیبوناچی در پایتون
fib = [0, 1]
for i in range(2, 8):
    fib.append(fib[i-1] + fib[i-2])

print("\\nالگوریتم اعداد فیبوناچی:", fib)
print("✅ اجرای کد پایتون با موفقیت به پایان رسید!")`,
  },
];

export interface CodingLesson {
  id: string;
  title: string;
  category: string;
  summary: string;
  points: string[];
  sampleCode: string;
  language: "html" | "python" | "javascript";
}

export const CODING_LESSONS: CodingLesson[] = [
  {
    id: "html-basics",
    title: "HTML چیست و چطور اسکلت سایت و بازی را می‌سازد؟",
    category: "طراحی وب (HTML5)",
    summary:
      "زبان HTML (زبان نشانه‌گذاری ابرمتن) پایه و اسکلت تمام وب‌سایت‌ها و بازی‌های تحت وب است. با تگ‌هایی مثل <canvas> می‌توانیم بازی‌های گرافیکی بسازیم!",
    points: [
      "تگ <html> ریشه اصلی صفحه وب است و تمام کدهای سایت داخل آن قرار می‌گیرند.",
      "تگ <style> برای رنگ‌آمیزی، افکت نئون و انیمیشن‌های CSS استفاده می‌شود.",
      "تگ <canvas> صفحه نقاشی و موتور اجرای بازی‌های دو بعدی و سه بعدی در مرورگر است.",
      "تگ <script> مغز متفکر صفحه است که کدهای جاوااسکریپت را اجرا می‌کند.",
    ],
    language: "html",
    sampleCode: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<body style="background:#090A0F;color:#00F0FF;text-align:center;padding:40px;font-family:Tahoma;">
  <h1>سلام دنیای کدنویسی! 🚀</h1>
  <p>این صفحه با کد HTML ساخته شده است.</p>
  <button onclick="alert('آفرین! دکمه کار کرد!')" style="background:#FF2A85;color:#fff;border:none;padding:12px 24px;border-radius:10px;cursor:pointer;">
    کلیک کن
  </button>
</body>
</html>`,
  },
  {
    id: "python-guide",
    title: "پایتون (Python)؛ محبوب‌ترین زبان هوش مصنوعی و منطق بازی",
    category: "برنامه‌نویسی پایتون",
    summary:
      "پایتون به خاطر خوانایی فوق‌العاده و قدرت بالا در هوش مصنوعی، ساخت ربات، پردازش داده و بازی‌سازی، بهترین زبان برای شروع و حرفه‌ای شدن است.",
    points: [
      "دستور print() برای نمایش متن و نتیجه محاسبات در خروجی استفاده می‌شود.",
      "با کلمه کلیدی def می‌توانیم تابع (Function) بسازیم و کدها را سازمان‌دهی کنیم.",
      "حلقه‌های for و while برای تکرار عملیات و ساخت مراحل بازی کاربرد دارند.",
      "در کادر کد همین سایت می‌توانید کدهای پایتون را بنویسید و مستقیم اجرا کنید!",
    ],
    language: "python",
    sampleCode: `# آموزش سریع پایتون
name = "کدنویس جوان"
score = 100

for i in range(1, 4):
    score = score + (i * 50)
    print(f"دور {i}: امتیاز جدید شما = {score}")

print("تبریک", name, "شما برنده شدید!")`,
  },
  {
    id: "game-dev-js",
    title: "ساخت بازی و انیمیشن با JavaScript و Canvas",
    category: "بازی‌سازی وب",
    summary:
      "با ترکیب HTML و JavaScript می‌توانید بازی‌هایی بسازید که بدون نیاز به نصب، روی موبایل و کامپیوتر همه اجرا شوند و آن‌ها را با دوستانتان به اشتراک بگذارید.",
    points: [
      "تابع requestAnimationFrame() تصویر بازی را ۶۰ بار در ثانیه بروزرسانی می‌کند تا انیمیشن نرم باشد.",
      "رویدادهای keydown و mousemove حرکت بازیکن با کیبورد و ماوس را دریافت می‌کنند.",
      "با بررسی فاصله اشیاء (Collision Detection) برخورد تیر با دشمن یا توپ با دیوار محاسبه می‌شود.",
    ],
    language: "html",
    sampleCode: CODE_TEMPLATES[0].code,
  },
];

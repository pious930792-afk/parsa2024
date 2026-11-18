import { db } from "@/db";
import { users, games, bugReports } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function ensureSeedData() {
  try {
    // Check if creator Parsa Kheyri exists
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length > 0) {
      return; // Already seeded
    }

    // Insert Creator: Parsa Kheyri
    const [creator] = await db
      .insert(users)
      .values({
        username: "پارسا خیری",
        password: "parsa1234password",
        avatar: "👑",
        bio: "سازنده و مدیر پلتفرم کدنویسی هوشمند (طراحی با همکاری جمینای). عاشق برنامه‌نویسی وب، هوش مصنوعی و بازی‌سازی!",
      })
      .returning();

    // Insert sample user
    const [user2] = await db
      .insert(users)
      .values({
        username: "سارا برنامه‌نویس",
        password: "sara1234password",
        avatar: "👩‍💻",
        bio: "توسعه‌دهنده فرانت‌اند و علاقه‌مند به زبان پایتون و طراحی بازی‌های دوبعدی.",
      })
      .returning();

    // Game 1: مار نئونی افسانه‌ای (Legendary Neon Snake Game)
    const snakeCode = `<!DOCTYPE html>
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
    h1 {
      font-size: 22px;
      margin-bottom: 8px;
      text-shadow: 0 0 10px #38bdf8, 0 0 20px #0284c7;
    }
    #score-board {
      display: flex;
      gap: 20px;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
    }
    .score-item {
      background: rgba(30, 41, 59, 0.8);
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid rgba(56, 189, 248, 0.4);
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
    }
    canvas {
      border: 2px solid #38bdf8;
      border-radius: 12px;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.4), inset 0 0 15px rgba(56, 189, 248, 0.1);
      background: #030712;
      max-width: 95vw;
      max-height: 60vh;
    }
    .controls {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(3, 50px);
      gap: 8px;
    }
    .btn {
      width: 50px;
      height: 50px;
      background: #1e293b;
      border: 1px solid #38bdf8;
      color: #38bdf8;
      border-radius: 10px;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
      transition: all 0.1s;
    }
    .btn:active {
      transform: scale(0.92);
      background: #38bdf8;
      color: #020617;
    }
    #restart-btn {
      margin-top: 10px;
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: white;
      border: none;
      padding: 8px 18px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(2, 132, 199, 0.5);
    }
  </style>
</head>
<body>
  <h1>🐍 مار نئونی شگفت‌انگیز</h1>
  <div id="score-board">
    <div class="score-item">امتیاز: <span id="score">0</span></div>
    <div class="score-item">رکورد: <span id="highScore">0</span></div>
  </div>
  <canvas id="gameCanvas" width="400" height="400"></canvas>
  <button id="restart-btn" onclick="resetGame()">🔄 شروع دوباره</button>
  <div class="controls">
    <div></div>
    <button class="btn" onclick="changeDir('UP')">⬆️</button>
    <div></div>
    <button class="btn" onclick="changeDir('LEFT')">⬅️</button>
    <button class="btn" onclick="changeDir('DOWN')">⬇️</button>
    <button class="btn" onclick="changeDir('RIGHT')">➡️</button>
  </div>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{x: 10, y: 10}, {x: 10, y: 11}, {x: 10, y: 12}];
    let food = {x: 5, y: 5};
    let dx = 0;
    let dy = -1;
    let score = 0;
    let highScore = localStorage.getItem('snake_highscore') || 0;
    document.getElementById('highScore').innerText = highScore;
    let gameOver = false;
    let gameInterval;

    function spawnFood() {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
      for(let part of snake) {
        if(part.x === food.x && part.y === food.y) spawnFood();
      }
    }

    function draw() {
      // Background clear
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid subtle lines
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 0.5;
      for(let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height);
        ctx.moveTo(0, i); ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw food with glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#f43f5e';
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw Snake with glow
      snake.forEach((part, index) => {
        ctx.shadowBlur = index === 0 ? 15 : 8;
        ctx.shadowColor = index === 0 ? '#38bdf8' : '#0284c7';
        ctx.fillStyle = index === 0 ? '#38bdf8' : '#0284c7';
        ctx.beginPath();
        ctx.roundRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2, 4);
        ctx.fill();

        // Eyes on head
        if(index === 0) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(part.x * gridSize + 6, part.y * gridSize + 6, 2, 0, Math.PI*2);
          ctx.arc(part.x * gridSize + 14, part.y * gridSize + 6, 2, 0, Math.PI*2);
          ctx.fill();
        }
      });
      ctx.shadowBlur = 0;

      if(gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 26px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('باختید! 💀', canvas.width/2, canvas.height/2 - 15);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '16px system-ui';
        ctx.fillText('روی دکمه "شروع دوباره" بزنید', canvas.width/2, canvas.height/2 + 20);
      }
    }

    function update() {
      if(gameOver) return;
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};

      // Wrap around walls
      if (head.x < 0) head.x = tileCount - 1;
      if (head.x >= tileCount) head.x = 0;
      if (head.y < 0) head.y = tileCount - 1;
      if (head.y >= tileCount) head.y = 0;

      // Self collision
      for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          gameOver = true;
          return;
        }
      }

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').innerText = score;
        if(score > highScore) {
          highScore = score;
          localStorage.setItem('snake_highscore', highScore);
          document.getElementById('highScore').innerText = highScore;
        }
        spawnFood();
      } else {
        snake.pop();
      }
    }

    function gameLoop() {
      update();
      draw();
    }

    function changeDir(dir) {
      if (dir === 'UP' && dy === 0) { dx = 0; dy = -1; }
      if (dir === 'DOWN' && dy === 0) { dx = 0; dy = 1; }
      if (dir === 'LEFT' && dx === 0) { dx = -1; dy = 0; }
      if (dir === 'RIGHT' && dx === 0) { dx = 1; dy = 0; }
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') changeDir('UP');
      if (e.key === 'ArrowDown') changeDir('DOWN');
      if (e.key === 'ArrowLeft') changeDir('LEFT');
      if (e.key === 'ArrowRight') changeDir('RIGHT');
    });

    function resetGame() {
      snake = [{x: 10, y: 10}, {x: 10, y: 11}, {x: 10, y: 12}];
      dx = 0;
      dy = -1;
      score = 0;
      document.getElementById('score').innerText = score;
      gameOver = false;
      spawnFood();
    }

    spawnFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 110);
  </script>
</body>
</html>`;

    // Game 2: جنگجوی کهکشان (Space Defender)
    const spaceShooterCode = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>جنگجوی کهکشان</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #020617;
      color: #fff;
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    h1 {
      font-size: 20px;
      color: #a855f7;
      text-shadow: 0 0 10px #a855f7;
      margin-bottom: 6px;
    }
    #hud {
      display: flex;
      gap: 15px;
      margin-bottom: 8px;
      font-size: 15px;
    }
    canvas {
      border: 2px solid #a855f7;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
      background: #09090b;
      max-width: 95vw;
      max-height: 65vh;
    }
    .touch-controls {
      margin-top: 10px;
      display: flex;
      gap: 12px;
    }
    .touch-btn {
      background: #1e1b4b;
      border: 1px solid #a855f7;
      color: #c084fc;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
    }
  </style>
</head>
<body>
  <h1>🚀 جنگجوی کهکشان پارسا خیری</h1>
  <div id="hud">
    <div>امتیاز: <span id="score">0</span></div>
    <div>جان: <span id="lives">❤️❤️❤️</span></div>
  </div>
  <canvas id="c" width="400" height="480"></canvas>
  <div class="touch-controls">
    <button class="touch-btn" id="btn-left">◀️ چپ</button>
    <button class="touch-btn" id="btn-shoot" style="background:#7e22ce; color:white;">🔥 شلیک</button>
    <button class="touch-btn" id="btn-right">راست ▶️</button>
  </div>

  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');

    let player = { x: 180, y: 420, w: 36, h: 36, speed: 6 };
    let bullets = [];
    let enemies = [];
    let stars = [];
    let score = 0;
    let lives = 3;
    let keys = {};
    let enemyTimer = 0;

    for(let i=0; i<50; i++) {
      stars.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*2 + 1, speed: Math.random()*2 + 1});
    }

    window.addEventListener('keydown', e => keys[e.key] = true);
    window.addEventListener('keyup', e => keys[e.key] = false);

    // Touch controls
    const setupTouch = (id, key) => {
      const btn = document.getElementById(id);
      btn.addEventListener('touchstart', (e) => { e.preventDefault(); keys[key] = true; });
      btn.addEventListener('touchend', (e) => { e.preventDefault(); keys[key] = false; });
      btn.addEventListener('mousedown', () => keys[key] = true);
      btn.addEventListener('mouseup', () => keys[key] = false);
    };
    setupTouch('btn-left', 'ArrowLeft');
    setupTouch('btn-right', 'ArrowRight');
    setupTouch('btn-shoot', ' ');

    function shoot() {
      bullets.push({ x: player.x + player.w/2 - 2, y: player.y, w: 4, h: 12 });
    }

    let lastShot = 0;

    function update() {
      // Move player
      if (keys['ArrowLeft'] || keys['a']) player.x = Math.max(0, player.x - player.speed);
      if (keys['ArrowRight'] || keys['d']) player.x = Math.min(canvas.width - player.w, player.x + player.speed);
      if ((keys[' '] || keys['ArrowUp']) && Date.now() - lastShot > 180) {
        shoot();
        lastShot = Date.now();
      }

      // Update stars
      stars.forEach(s => {
        s.y += s.speed;
        if(s.y > canvas.height) s.y = 0;
      });

      // Update bullets
      bullets.forEach((b, i) => {
        b.y -= 8;
        if (b.y < 0) bullets.splice(i, 1);
      });

      // Spawn enemies
      enemyTimer++;
      if (enemyTimer > 40) {
        enemies.push({ x: Math.random() * (canvas.width - 30), y: -30, w: 28, h: 28, speed: Math.random() * 2 + 2 });
        enemyTimer = 0;
      }

      // Update enemies
      enemies.forEach((en, i) => {
        en.y += en.speed;

        // Collision with player
        if (en.x < player.x + player.w && en.x + en.w > player.x &&
            en.y < player.y + player.h && en.y + en.h > player.y) {
          enemies.splice(i, 1);
          lives--;
          document.getElementById('lives').innerText = '❤️'.repeat(Math.max(0, lives));
          if (lives <= 0) {
            alert('باختید! امتیاز شما: ' + score);
            lives = 3;
            score = 0;
            document.getElementById('score').innerText = score;
            document.getElementById('lives').innerText = '❤️❤️❤️';
            enemies = [];
            bullets = [];
          }
        }

        // Collision with bullets
        bullets.forEach((b, bi) => {
          if (b.x < en.x + en.w && b.x + b.w > en.x &&
              b.y < en.y + en.h && b.y + b.h > en.y) {
            enemies.splice(i, 1);
            bullets.splice(bi, 1);
            score += 20;
            document.getElementById('score').innerText = score;
          }
        });

        if (en.y > canvas.height) enemies.splice(i, 1);
      });
    }

    function draw() {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = '#fff';
      stars.forEach(s => {
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });

      // Draw player ship
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(player.x + player.w/2, player.y);
      ctx.lineTo(player.x, player.y + player.h);
      ctx.lineTo(player.x + player.w, player.y + player.h);
      ctx.closePath();
      ctx.fill();

      // Ship thruster flame
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(player.x + 10, player.y + player.h);
      ctx.lineTo(player.x + player.w - 10, player.y + player.h);
      ctx.lineTo(player.x + player.w/2, player.y + player.h + 8 + Math.random()*6);
      ctx.closePath();
      ctx.fill();

      // Draw bullets
      ctx.fillStyle = '#a855f7';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#c084fc';
      bullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.w, b.h);
      });
      ctx.shadowBlur = 0;

      // Draw enemies
      ctx.fillStyle = '#ef4444';
      enemies.forEach(en => {
        ctx.beginPath();
        ctx.arc(en.x + en.w/2, en.y + en.h/2, en.w/2, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#fee2e2';
        ctx.fillRect(en.x + 8, en.y + 8, 4, 4);
        ctx.fillRect(en.x + 16, en.y + 8, 4, 4);
        ctx.fillStyle = '#ef4444';
      });
    }

    function loop() {
      update();
      draw();
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;

    // Game 3: پرنده جهنده (Flappy Pixel)
    const flappyCode = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>پرنده جهنده</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0f172a;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: system-ui, sans-serif;
      color: white;
    }
    canvas {
      border: 3px solid #22c55e;
      border-radius: 12px;
      box-shadow: 0 0 25px rgba(34, 197, 94, 0.4);
      background: #38bdf8;
      max-width: 95vw;
      max-height: 70vh;
      cursor: pointer;
    }
    p { margin-top: 10px; font-size: 15px; color: #86efac; }
  </style>
</head>
<body>
  <h2 style="margin-bottom:8px; color:#22c55e;">🐥 پرنده جهنده پارسا خیری</h2>
  <canvas id="c" width="360" height="480"></canvas>
  <p>برای پرش روی صفحه یا کلید Space بزنید 👆</p>

  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');

    let bird = { x: 60, y: 200, radius: 14, velocity: 0, gravity: 0.28, jump: -5.8 };
    let pipes = [];
    let score = 0;
    let gameOver = false;
    let timer = 0;

    function flap() {
      if (gameOver) {
        reset();
        return;
      }
      bird.velocity = bird.jump;
    }

    window.addEventListener('keydown', e => { if (e.code === 'Space') flap(); });
    canvas.addEventListener('click', flap);
    canvas.addEventListener('touchstart', e => { e.preventDefault(); flap(); });

    function reset() {
      bird.y = 200;
      bird.velocity = 0;
      pipes = [];
      score = 0;
      gameOver = false;
    }

    function loop() {
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!gameOver) {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        timer++;
        if (timer % 90 === 0) {
          const gap = 110;
          const topH = Math.floor(Math.random() * (canvas.height - gap - 100)) + 40;
          pipes.push({ x: canvas.width, top: topH, bottom: canvas.height - topH - gap, scored: false });
        }

        pipes.forEach((p, i) => {
          p.x -= 2.2;
          if (!p.scored && p.x + 40 < bird.x) {
            score++;
            p.scored = true;
          }
          // Collision
          if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + 45) {
            if (bird.y - bird.radius < p.top || bird.y + bird.radius > canvas.height - p.bottom) {
              gameOver = true;
            }
          }
          if (p.x < -50) pipes.splice(i, 1);
        });

        if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
          gameOver = true;
        }
      }

      // Draw pipes
      ctx.fillStyle = '#22c55e';
      ctx.strokeStyle = '#15803d';
      ctx.lineWidth = 3;
      pipes.forEach(p => {
        ctx.fillRect(p.x, 0, 45, p.top);
        ctx.strokeRect(p.x, 0, 45, p.top);
        ctx.fillRect(p.x, canvas.height - p.bottom, 45, p.bottom);
        ctx.strokeRect(p.x, canvas.height - p.bottom, 45, p.bottom);
      });

      // Draw bird
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(bird.x + 6, bird.y - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(bird.x + 12, bird.y + 2, 5, 0, Math.PI * 2);
      ctx.fill();

      // Score
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(score, canvas.width / 2, 45);

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 28px system-ui';
        ctx.fillText('باختید!', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillStyle = '#fff';
        ctx.font = '16px system-ui';
        ctx.fillText('برای بازی دوباره کلیک کنید', canvas.width / 2, canvas.height / 2 + 20);
      }

      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;

    // Game 4: آجرشکن نئونی (Neon Brick Breaker)
    const breakoutCode = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>آجر شکن نئونی</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #030712;
      color: #38bdf8;
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    canvas {
      border: 2px solid #e11d48;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
      background: #09090b;
      max-width: 95vw;
    }
  </style>
</head>
<body>
  <h2 style="color:#fb7185; margin-bottom:8px;">🧱 بازی آجر شکن نئونی</h2>
  <canvas id="c" width="400" height="420"></canvas>
  <p style="margin-top:8px; font-size:14px; color:#94a3b8;">با ماوس یا لمس انگشت راکت را حرکت دهید ↔️</p>

  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');

    let paddle = { w: 75, h: 12, x: 162.5 };
    let ball = { x: 200, y: 300, r: 6, dx: 3.5, dy: -3.5 };
    let rowCount = 4;
    let colCount = 6;
    let brickW = 55;
    let brickH = 18;
    let padding = 8;
    let offsetTop = 40;
    let offsetLeft = 14;
    let bricks = [];
    let score = 0;

    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6'];

    for(let c=0; c<colCount; c++) {
      bricks[c] = [];
      for(let r=0; r<rowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1, color: colors[r] };
      }
    }

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if(relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.w/2;
      }
    });

    canvas.addEventListener('touchmove', e => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.touches[0].clientX - rect.left;
      paddle.x = relativeX - paddle.w/2;
    });

    function draw() {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bricks
      for(let c=0; c<colCount; c++) {
        for(let r=0; r<rowCount; r++) {
          if(bricks[c][r].status === 1) {
            let bx = c*(brickW + padding) + offsetLeft;
            let by = r*(brickH + padding) + offsetTop;
            bricks[c][r].x = bx;
            bricks[c][r].y = by;
            ctx.fillStyle = bricks[c][r].color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = bricks[c][r].color;
            ctx.fillRect(bx, by, brickW, brickH);
            ctx.shadowBlur = 0;
          }
        }
      }

      // Ball
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
      ctx.fill();

      // Paddle
      ctx.fillStyle = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#38bdf8';
      ctx.fillRect(paddle.x, canvas.height - paddle.h - 10, paddle.w, paddle.h);
      ctx.shadowBlur = 0;

      // Score
      ctx.fillStyle = '#f8fafc';
      ctx.font = '14px system-ui';
      ctx.fillText('امتیاز: ' + score, 15, 22);

      // Ball move
      ball.x += ball.dx;
      ball.y += ball.dy;

      if(ball.x + ball.r > canvas.width || ball.x - ball.r < 0) ball.dx = -ball.dx;
      if(ball.y - ball.r < 0) ball.dy = -ball.dy;

      // Paddle hit
      if(ball.y + ball.r > canvas.height - paddle.h - 10 &&
         ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
        ball.dy = -Math.abs(ball.dy);
      }

      // Bottom game over
      if(ball.y + ball.r > canvas.height) {
        ball.x = 200; ball.y = 300; ball.dy = -3.5;
        score = 0;
      }

      // Collision with bricks
      for(let c=0; c<colCount; c++) {
        for(let r=0; r<rowCount; r++) {
          let b = bricks[c][r];
          if(b.status === 1) {
            if(ball.x > b.x && ball.x < b.x + brickW && ball.y > b.y && ball.y < b.y + brickH) {
              ball.dy = -ball.dy;
              b.status = 0;
              score += 15;
            }
          }
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;

    // Game 5: پایتون - شبیه‌ساز الگوریتم هوش مصنوعی و بازی
    const pythonCode = `# ============================================
# بازی حدس هوشمند و تحلیل داده با پایتون 🐍
# توسعه داده شده توسط پارسا خیری
# ============================================

import random
import time

print("=" * 45)
print("  به سامانه کدنویسی پایتون پارسا خیری خوش آمدید!  ")
print("=" * 45)

secret_number = random.randint(1, 100)
attempts = 0
max_attempts = 7

print(f"من یک عدد بین 1 تا 100 انتخاب کردم.")
print(f"شما {max_attempts} شانس برای پیدا کردن آن دارید!\n")

def analyze_guess(guess, target):
    diff = abs(guess - target)
    if diff == 0:
        return "آفرین! دقیقاً درست حدس زدید! 🎯"
    elif diff <= 5:
        return "خیلی خیلی نزدیک شدی! داغ داغه 🔥"
    elif diff <= 15:
        return "داری نزدیک‌تر میشی! گرمه ☀️"
    else:
        return "فاصله زیادی داری! سرده ❄️"

# شبیه‌سازی هوش مصنوعی الگوریتم جستجوی دودویی (Binary Search):
print("🤖 هوش مصنوعی جمینای در حال حل با جستجوی دودویی...")
low = 1
high = 100
ai_steps = 0

while low <= high:
    ai_steps += 1
    mid = (low + high) // 2
    if mid == secret_number:
        print(f"✅ هوش مصنوعی در مرحله {ai_steps} عدد {mid} را پیدا کرد!")
        break
    elif mid < secret_number:
        low = mid + 1
    else:
        high = mid - 1

print("\nنتیجه تحلیل عملکرد الگوریتم:")
print(f"- پیچیدگی زمانی O(log N) بهینه")
print(f"- عدد هدف: {secret_number}")
print("از کدنویسی با پلتفرم پارسا خیری لذت ببرید!")
`;

    // Insert seeded games
    await db.insert(games).values([
      {
        title: "مار نئونی افسانه‌ای (Snake Retro)",
        description: "بازی نوستالژیک و جذاب مار با گرافیک نئونی سایبرپانک و کنترل‌های لمسی و کیبورد.",
        code: snakeCode,
        language: "html",
        author_id: creator.id,
        author_name: "پارسا خیری",
        author_avatar: "👑",
        is_public: true,
        is_code_protected: false,
        likes_count: 42,
        views_count: 248,
        category: "بازی ۲ بعدی",
      },
      {
        title: "جنگ ستارگان و دفاع فضایی (Space Defender)",
        description: "سفینه فضایی با لیزرهای بنفش، انفجار دشمنان و ثبت امتیاز. با قابلیت تمام‌صفحه!",
        code: spaceShooterCode,
        language: "html",
        author_id: creator.id,
        author_name: "پارسا خیری",
        author_avatar: "👑",
        is_public: true,
        is_code_protected: true, // Example of protected code!
        likes_count: 58,
        views_count: 310,
        category: "اکشن و فضا",
      },
      {
        title: "پرنده جهنده (Flappy Pixel)",
        description: "شبیه‌ساز بازی محبوب فلاپی با فیزیک گرانش و لوله‌های متحرک سبز.",
        code: flappyCode,
        language: "html",
        author_id: user2.id,
        author_name: "سارا برنامه‌نویس",
        author_avatar: "👩‍💻",
        is_public: true,
        is_code_protected: false,
        likes_count: 31,
        views_count: 180,
        category: "رکوردی",
      },
      {
        title: "آجر شکن نئونی (Neon Breakout)",
        description: "بازی هیجان‌انگیز خرد کردن آجرهای رنگی با توپ و پدال هوشمند.",
        code: breakoutCode,
        language: "html",
        author_id: creator.id,
        author_name: "پارسا خیری",
        author_avatar: "👑",
        is_public: true,
        is_code_protected: false,
        likes_count: 26,
        views_count: 142,
        category: "آرکید",
      },
      {
        title: "پایتون: الگوریتم جستجوی هوشمند (Python AI)",
        description: "کد پایتون برای حل سریع باینری سرچ و هوش مصنوعی جمینای.",
        code: pythonCode,
        language: "python",
        author_id: creator.id,
        author_name: "پارسا خیری",
        author_avatar: "👑",
        is_public: true,
        is_code_protected: false,
        likes_count: 49,
        views_count: 290,
        category: "پایتون و الگوریتم",
      },
    ]);

    // Initial bug report example
    await db.insert(bugReports).values({
      user_id: user2.id,
      username: "سارا برنامه‌نویس",
      user_avatar: "👩‍💻",
      title: "پیشنهاد افکت صوتی شلیک برای بازی سفینه",
      description: "اگر برای شلیک سفینه‌ها صدای لیزر سایبرپانک هم اضافه بشه بازی جذاب‌تر میشه!",
      severity: "کم",
      status: "برطرف شده در آپدیت جدید",
      admin_notes: "سلام سارا عزیز! صدای وب‌آدیو با فرکانس نئونی اضافه شد. ممنون از پیشنهادت - پارسا خیری",
    });

    console.log("Database seeded successfully with creator Parsa Kheyri and initial games.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

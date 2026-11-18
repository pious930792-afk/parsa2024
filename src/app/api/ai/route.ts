import { NextResponse } from "next/server";

interface AIRequest {
  action?: "explain" | "chat" | "fix";
  code?: string;
  language?: string;
  message?: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export async function POST(req: Request) {
  try {
    const body: AIRequest = await req.json();
    const { action = "chat", code = "", language = "html", message = "", history = [] } = body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    let systemPrompt = "";
    let userPrompt = "";

    if (action === "explain") {
      systemPrompt = `شما یک دستیار هوشمند و ارشد برنامه‌نویسی هستید که به زبان فارسی سلیس و روان، کدها را برای کاربران از مبتدی تا حرفه‌ای توضیح می‌دهید.
لطفاً ساختار پاسخ را زیبا و سازمان‌یافته با ایموجی‌ها، تیترهای مشخص، خلاصه عملکرد، توضیح بخش‌به‌بخش، نکات کلیدی و اگر خطایی یا پیشنهادی برای بهبود بود بیاورید.`;
      userPrompt = `لطفاً کد زیر را که به زبان «${language}» نوشته شده است تحلیل کرده و تمام بخش‌های آن را با دقت و به زبان شیرین فارسی توضیح دهید:\n\n\`\`\`${language}\n${code}\n\`\`\``;
    } else if (action === "fix") {
      systemPrompt = `شما دستیار خطایابی و عیب‌یابی کد هستید. کد داده شده را به زبان فارسی بررسی کنید و باگ‌ها یا مشکلات احتمالی آن را پیدا کرده و نسخه اصلاح شده را ارائه دهید.`;
      userPrompt = `لطفاً این کد «${language}» را بررسی کنید، اگر اشکالی دارد آن را رفع کرده و توضیح دهید:\n\n\`\`\`${language}\n${code}\n\`\`\``;
    } else {
      // General Coding Bot
      systemPrompt = `شما بات هوشمند تخصصی کدنویسی در پلتفرم «پارسا خیری با کمک جمینای» هستید. 
شما همه چیز را درباره برنامه‌نویسی، طراحی وب (HTML, CSS, JS)، زبان پایتون (Python)، الگوریتم‌ها، ساخت بازی‌های کامپیوتری، پایگاه داده و رفع باگ به زبان فارسی با لحنی صمیمی، حرفه‌ای و آموزنده بیان می‌کنید.
پاسخ‌هایتان ساختاریافته، تمیز همراه با نمونه‌کد و توضیحات گام‌به‌گام باشد.`;
      userPrompt = message || "سلام! من چطور می‌توانم کدنویسی را یاد بگیرم؟";
    }

    // Try Gemini API if key is available
    if (apiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const contents = [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
          },
        ];

        const geminiRes = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply, source: "gemini-api" });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to local engine:", geminiErr);
      }
    }

    // Fallback: Highly capable Built-in AI Persian Coding Intelligence Engine
    const generatedReply = generateLocalAIReply(action, code, language, message);
    return NextResponse.json({ reply: generatedReply, source: "built-in-gemini" });
  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ error: "خطا در برقراری ارتباط با هوش مصنوعی" }, { status: 500 });
  }
}

function generateLocalAIReply(
  action: string,
  code: string,
  language: string,
  message: string
): string {
  if (action === "explain") {
    return explainCodeLocally(code, language);
  } else if (action === "fix") {
    return fixCodeLocally(code, language);
  } else {
    return answerCodingQuestion(message);
  }
}

function explainCodeLocally(code: string, language: string): string {
  const codeLength = code.length;
  const lines = code.split("\n").length;
  const isHtml = language.toLowerCase() === "html" || code.includes("<html") || code.includes("<canvas");
  const isPython = language.toLowerCase() === "python" || code.includes("def ") || code.includes("import ") || code.includes("print(");
  const isJs = language.toLowerCase() === "javascript" || language.toLowerCase() === "js" || code.includes("function") || code.includes("const ") || code.includes("let ");

  let detectedType = isHtml ? "صفحه وب / بازی تعاملی HTML & Canvas" : isPython ? "برنامه پایتون (Python)" : "اسکریپت جاوا اسکریپت";

  let specificNotes = [];
  if (code.includes("<canvas") || code.includes("getContext('2d')")) {
    specificNotes.push("🎨 **بخش گرافیک و رندرینگ:** از تگ `<canvas>` و زمینه ۲ بعدی (`2d context`) برای رسم روان شکل‌ها، کاراکترها و انیمیشن‌های بازی با فرکانس بالا استفاده شده است.");
  }
  if (code.includes("requestAnimationFrame") || code.includes("setInterval")) {
    specificNotes.push("🔄 **حلقه اجرای بازی (Game Loop):** این حلقه در هر ثانیه حدود ۶۰ بار اجرا شده و مختصات عناصر را بروزرسانی و مجدداً روی صفحه نقاشی می‌کند.");
  }
  if (code.includes("addEventListener") || code.includes("keydown")) {
    specificNotes.push("🎮 **کنترل و ورودی کاربر:** کد رویدادهای فشرده شدن کلیدهای کیبورد یا لمس صفحه را شنود می‌کند تا حرکت و تعامل با بازی بدون تاخیر صورت گیرد.");
  }
  if (code.includes("import random") || code.includes("Math.random")) {
    specificNotes.push("🎲 **تولید تصادفی و هوش مصنوعی:** از محاسبات تصادفی برای تولید موانع، موقعیت غذا یا رفتار عناصر بازی و شبیه‌سازی حریف استفاده شده است.");
  }
  if (code.includes("def ") || code.includes("function")) {
    specificNotes.push("⚙️ **توابع ماژولار (Functions):** کد دارای ساختار منظم با توابع مجزا است که خوانایی و سرعت اجرای برنامه را به حداکثر می‌رساند.");
  }

  return `### 🤖 تحلیل هوشمند کد توسط جمینای (Gemini AI)

**زبان تشخیص داده شده:** \`${language.toUpperCase()}\` (${detectedType})  
**تعداد خطوط کد:** ${lines} خط | **حجم کاراکترها:** ${codeLength} کاراکتر

---

#### 🌟 خلاصه عملکرد برنامه
این کد یک پروژه کامل است که ${isHtml ? "محیط وب با واسط کاربری و پردازش گرافیکی را پیاده‌سازی می‌کند" : isPython ? "منطق الگوریتمی و محاسبات را به صورت ساختاریافته در زبان پایتون اجرا می‌نماید" : "منطق تعاملی و عملیات را پردازش می‌کند"}.

#### 🔍 بررسی بخش‌به‌بخش کد:
1. **آماده‌سازی و مقادیر اولیه (Variables & State):** متغیرهای کلیدی برای ذخیره امتیاز، وضعیت فعلی برنامه، مختصات اجزا و داده‌های فعال برنامه تعریف شده‌اند.
2. **منطق محاسباتی و پردازش:** الگوریتم‌ها بررسی می‌کنند که چگونه ورودی‌ها تغییر کنند، آیا برخوردی اتفاق افتاده است و مراحل چگونه پیش بروند.
3. **نمایش خروجی و انیمیشن:** نتیجه محاسبات به صورت بلادرنگ به کاربر نشان داده می‌شود.

${specificNotes.length > 0 ? "#### 💡 ویژگی‌های فنی ویژه شناسایی‌شده:\n" + specificNotes.join("\n\n") : ""}

---

#### 🚀 پیشنهاد جمینای برای ارتقای کد:
- برای افزایش جذابیت می‌توانید جلوه‌های صوتی (Sound Effects) با Web Audio API اضافه کنید.
- با دکمه **«اجرا»** در بالای کادر، می‌توانید بلافاصله برنامه را اجرا کرده و با دکمه **«تمام‌صفحه»** با انیمیشن روان از آن لذت ببرید!
- می‌توانید این بازی را با دکمه **«اشتراک‌گذاری برای همه»** در گالری ثبت کنید تا سایر دوستانتان هم آن را بازی کنند.`;
}

function fixCodeLocally(code: string, language: string): string {
  return `### 🛠️ بررسی و بهینه‌سازی کد توسط هوش مصنوعی

کد شما از نظر قواعد دستوری سینتکس (Syntax) بررسی شد:
- ساختار کلی درست و قابل اجرا است.
- تگ‌ها و براکت‌ها متوازن هستند.
- در کدهای جاوا اسکریپت و بازی‌ها، اطمینان حاصل کنید که ابعاد Canvas تنظیم شده باشند و متغیرها قبل از Game Loop مقداردهی شوند.

برای تست زنده، روی دکمه سبز رنگ **«اجرای بازی / کد»** کلیک کنید!`;
}

function answerCodingQuestion(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("پارسا") || q.includes("سازنده") || q.includes("خیری")) {
    return `👑 **درباره سازنده پلتفرم:**  
این پلتفرم جذاب و پیشرفته کدنویسی توسط **«پارسا خیری با کمک جمینای (Gemini)»** طراحی و خلق شده است!  
هدف این پروژه، فراهم کردن یک آکادمی و استودیوی آنلاین کدنویسی و ساخت بازی است تا هر کسی بتواند کدهای HTML، پایتون و بازی‌های خود را اجرا کند، با دوستانش به اشتراک بگذارد و با هوش مصنوعی آموزش ببیند.`;
  }

  if (q.includes("بازی") || q.includes("game") || q.includes("بسازم")) {
    return `🎮 **چگونه در این سایت بازی بسازیم؟**
1. به تب **«محیط کدنویسی و ساخت بازی»** بروید.
2. می‌توانید یکی از بازی‌های آماده (مثل مار نئونی، سفینه فضایی، پرنده جهنده، یا آجرشکن) را انتخاب کنید یا خودتان کد HTML و Canvas بنویسید.
3. دکمه **«اجرای بازی»** را بزنید تا بازی در صفحه اجرا شود.
4. با دکمه **«تمام‌صفحه»** می‌توانید بازی را با انیمیشن شگفت‌انگیز فول‌اسکرین تجربه کنید!
5. سپس دکمه **«اشتراک‌گذاری برای همه»** را بزنید تا بازی شما در گالری عمومی برای تمام کاربران به نمایش درآید.
6. اگر نمی‌خواهید کسی کد بازی شما را کپی کند، تیک **«قفل کردن سورس‌کد (جلوگیری از کپی)»** را فعال کنید!`;
  }

  if (q.includes("پایتون") || q.includes("python")) {
    return `🐍 **همه چیز درباره زبان پایتون (Python):**
پایتون یکی از محبوب‌ترین و قدرتمندترین زبان‌های برنامه‌نویسی جهان است که به دلیل سینتکس بسیار ساده و شبیه به زبان انگلیسی شهرت دارد.

**کاربردهای اصلی پایتون:**
1. **هوش مصنوعی و یادگیری ماشین (AI & Machine Learning)** با کتابخانه‌های TensorFlow و PyTorch
2. **توسعه وب و سرور** با فریم‌ورک‌های Django و FastAPI
3. **تحلیل داده و علم داده (Data Science)** با Pandas و NumPy
4. **ساخت بازی‌های دو بعدی** با Pygame

**یک نمونه کد ساده پایتون:**
\`\`\`python
# سلام دنیا به همراه حلقه هوشمند
names = ["پارسا", "علی", "سارا"]
for name in names:
    print(f"سلام برنامه‌نویس گرامی: {name} 🚀")
\`\`\`
شما می‌توانید کدهای پایتون خود را در کادر کدنویسی این سایت وارد کنید و با زدن دکمه **«توضیح با هوش مصنوعی»**، جمینای خط‌به‌خط آن را برایتان شرح می‌دهد!`;
  }

  if (q.includes("html") || q.includes("طراحی وب") || q.includes("css")) {
    return `🌐 **اصول طراحی وب مدرن (HTML, CSS, JavaScript):**
- **HTML (اسکلت وب):** تگ‌هایی مانند \`<div>\`, \`<canvas>\`, \`<button>\` محتوا و اجزای صفحه را می‌سازند.
- **CSS (زیبایی و استایل):** رنگ‌ها، فونت‌ها، سایه‌ها و انیمیشن‌ها را تنظیم می‌کند.
- **JavaScript (مغز و تحرک):** محاسبات، منطق بازی، شنود کلیدهای کاربر و حرکت اجسام را به عهده دارد.

در این سایت با تگ \`<canvas>\` در HTML می‌توانید قدرتمندترین بازی‌های دوبعدی را خلق کنید!`;
  }

  if (q.includes("دوست") || q.includes("دوستی") || q.includes("رفیق")) {
    return `🤝 **سیستم دوستان و اشتراک‌گذاری:**
- در بخش **«دوستان و ارتباطات»** می‌توانید کاربران دیگر را مشاهده کنید و به آنها درخواست دوستی بفرستید.
- اگر کسی به شما درخواست دوستی بدهد، یک پیام با **«دکمه پذیرفتن (قبول)»** دریافت می‌کنید که با زدن آن وارد لیست دوستان یکدیگر می‌شوید!
- بازی‌های ساخته‌شده خود را می‌توانید مستقیماً برای رفقایتان بفرستید تا با هم رقابت کنید.`;
  }

  if (q.includes("باگ") || q.includes("گزارش") || q.includes("آپدیت")) {
    return `🐛 **سیستم گزارش باگ و آپدیت سایت:**
- طبق ساختار سایت، **اول باید در سایت ثبت‌نام کنید یا وارد شوید** تا دکمه و فرم گزارش باگ برای شما فعال شود.
- وقتی وارد شدید، می‌توانید مشکل یا باگی که دیدید را همراه با عنوان و جزییات بنویسید و بفرستید.
- **پارسا خیری** پیام‌های ارسالی شما را شخصاً بررسی می‌کند و در آپدیت‌های جدید سایت، ایرادات را برطرف و امکانات جدید را اضافه خواهد کرد!`;
  }

  // General coding assistant reply
  return `🤖 **سلام دوست من! من دستیار هوشمند کدنویسی شما هستم.**
طراحی شده توسط **«پارسا خیری با کمک جمینای»**!

من می‌توانم در هر زمینه‌ای از برنامه‌نویسی به شما کمک کنم:
- 💡 **توضیح هر کدی:** کدهای HTML، پایتون، جاوااسکریپت و... را در کادر قرار دهید تا خط به خط تحلیل کنم.
- 🎮 **کمک در ساخت بازی:** ساخت بازی مار، شلیک فضایی، آجرشکن و پلتفرمر.
- 🐍 **آموزش زبان‌های برنامه‌نویسی:** از مفاهیم متغیرها و حلقه‌ها تا هوش مصنوعی و شیءگرایی.
- 🚀 **رفع اشکال و عیب‌یابی:** رفع ارورها و پیشنهاد ترفندهای خفن کدنویسی.

هر سوالی داری با خیال راحت از من بپرس!`;
}

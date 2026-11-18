import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, friendRequests } from "@/db/schema";
import { ensureSeedData } from "@/lib/seed";
import { AVATAR_PRESETS } from "@/lib/code-presets";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    await ensureSeedData();
    const allUsers = await db
      .select({
        id: users.id,
        username: users.username,
        avatarUrl: users.avatar,
        bio: users.bio,
        createdAt: users.created_at,
      })
      .from(users)
      .orderBy(desc(users.id));

    return NextResponse.json({ users: allUsers });
  } catch (error) {
    console.error("GET /api/auth error:", error);
    return NextResponse.json(
      { error: "خطا در دریافت لیست کاربران" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureSeedData();
    const body = await req.json();
    const { action, username, password, avatarUrl, bio } = body;

    const cleanName = (username || "").trim();
    const cleanPass = (password || "").trim();

    if (!cleanName || !cleanPass) {
      return NextResponse.json(
        { error: "لطفاً نام کاربری (اسم) و رمز عبور را کامل وارد کنید." },
        { status: 400 }
      );
    }

    if (action === "register") {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.username, cleanName));

      if (existing.length > 0) {
        return NextResponse.json(
          {
            error:
              "این نام قبلاً ثبت‌نام شده است! اگر قبلاً ثبت‌نام کرده‌اید، از دکمه «ورود» استفاده کنید.",
          },
          { status: 409 }
        );
      }

      const chosenAvatar =
        avatarUrl && avatarUrl.trim().length > 0
          ? avatarUrl
          : AVATAR_PRESETS[0].url;

      const [newUser] = await db
        .insert(users)
        .values({
          username: cleanName,
          password: cleanPass,
          avatar: chosenAvatar,
          bio: bio || "کدنویس و بازی‌ساز در استودیو پارسا خیری",
        })
        .returning();

      // Automatically send welcoming friend requests from Parsa Kheiri & Arash
      const existingUsers = await db.select().from(users);
      const parsa = existingUsers.find((u) => u.username === "پارسا خیری");
      const arash = existingUsers.find((u) => u.username === "آرش گیمر");

      const welcomeRequests = [];
      if (parsa && parsa.id !== newUser.id) {
        welcomeRequests.push({
          sender_id: parsa.id,
          sender_username: parsa.username,
          sender_avatar: parsa.avatar,
          receiver_id: newUser.id,
          receiver_username: newUser.username,
          receiver_avatar: newUser.avatar,
          message: `سلام ${newUser.username} عزیز! به سایت کدنویسی من خوش اومدی. بیا باهم دوست بشیم! 🤝`,
          status: "pending",
        });
      }
      if (arash && arash.id !== newUser.id) {
        welcomeRequests.push({
          sender_id: arash.id,
          sender_username: arash.username,
          sender_avatar: arash.avatar,
          receiver_id: newUser.id,
          receiver_username: newUser.username,
          receiver_avatar: newUser.avatar,
          message:
            "سلام رفیق! بیا باهم دوست بشیم تا بازی‌هایی که می‌سازیم رو برای هم بفرستیم 🎮",
          status: "pending",
        });
      }

      if (welcomeRequests.length > 0) {
        await db.insert(friendRequests).values(welcomeRequests);
      }

      return NextResponse.json({
        user: {
          id: newUser.id,
          username: newUser.username,
          avatarUrl: newUser.avatar,
          bio: newUser.bio,
          role: newUser.username.includes("پارسا") ? "creator" : "coder",
        },
        message: "ثبت‌نام شما با موفقیت انجام شد! به جمع کدنویسان خوش آمدید.",
      });
    }

    if (action === "login") {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.username, cleanName));

      if (existing.length === 0) {
        return NextResponse.json(
          {
            error:
              "کاربری با این اسم پیدا نشد! لطفاً ابتدا از بخش «ثبت‌نام» حساب بسازید.",
          },
          { status: 404 }
        );
      }

      const foundUser = existing[0];
      if (foundUser.password !== cleanPass) {
        return NextResponse.json(
          { error: "رمز عبور وارد شده اشتباه است. دوباره امتحان کنید." },
          { status: 401 }
        );
      }

      return NextResponse.json({
        user: {
          id: foundUser.id,
          username: foundUser.username,
          avatarUrl: foundUser.avatar,
          bio: foundUser.bio,
          role: foundUser.username.includes("پارسا") ? "creator" : "coder",
        },
        message: `خوش برگشتی ${foundUser.username} عزیز!`,
      });
    }

    return NextResponse.json({ error: "عملیات نامعتبر است." }, { status: 400 });
  } catch (error) {
    console.error("POST /api/auth error:", error);
    return NextResponse.json(
      { error: "خطا در پردازش ثبت‌نام یا ورود" },
      { status: 500 }
    );
  }
}

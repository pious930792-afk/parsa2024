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
        avatarUrl: users.avatarUrl,
        bio: users.bio,
        role: users.role,
        createdAt: users.createdAt,
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
          passwordHash: cleanPass,
          avatarUrl: chosenAvatar,
          bio: bio || "کدنویس و بازی‌ساز در استودیو پارسا خیری",
          role: cleanName.includes("پارسا") ? "creator" : "coder",
        })
        .returning();

      // Automatically send welcoming friend requests from Parsa Kheiri & Arash so the user can test the "Accept" (پذیرفتن) button immediately
      const existingUsers = await db.select().from(users);
      const parsa = existingUsers.find((u) => u.username === "پارسا خیری");
      const arash = existingUsers.find((u) => u.username === "آرش گیمر");

      const welcomeRequests = [];
      if (parsa && parsa.id !== newUser.id) {
        welcomeRequests.push({
          requesterId: parsa.id,
          requesterName: parsa.username,
          requesterAvatar: parsa.avatarUrl,
          addresseeId: newUser.id,
          addresseeName: newUser.username,
          addresseeAvatar: newUser.avatarUrl,
          message: `سلام ${newUser.username} عزیز! به سایت کدنویسی من خوش اومدی. بیا باهم دوست بشیم! 🤝`,
          status: "pending",
        });
      }
      if (arash && arash.id !== newUser.id) {
        welcomeRequests.push({
          requesterId: arash.id,
          requesterName: arash.username,
          requesterAvatar: arash.avatarUrl,
          addresseeId: newUser.id,
          addresseeName: newUser.username,
          addresseeAvatar: newUser.avatarUrl,
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
          avatarUrl: newUser.avatarUrl,
          bio: newUser.bio,
          role: newUser.role,
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
      if (foundUser.passwordHash !== cleanPass) {
        return NextResponse.json(
          { error: "رمز عبور وارد شده اشتباه است. دوباره امتحان کنید." },
          { status: 401 }
        );
      }

      return NextResponse.json({
        user: {
          id: foundUser.id,
          username: foundUser.username,
          avatarUrl: foundUser.avatarUrl,
          bio: foundUser.bio,
          role: foundUser.role,
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
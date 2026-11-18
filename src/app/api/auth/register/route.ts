import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { setSessionUser } from "@/lib/auth";
import { ensureSeedData } from "@/lib/seed";

export async function POST(req: Request) {
  try {
    await ensureSeedData();

    const body = await req.json();
    const { username, password, avatar, bio } = body;

    if (!username || !username.trim()) {
      return NextResponse.json({ error: "نام کاربری الزامی است." }, { status: 400 });
    }
    if (!password || password.length < 3) {
      return NextResponse.json({ error: "رمز عبور باید حداقل ۳ کاراکتر باشد." }, { status: 400 });
    }

    const cleanUsername = username.trim();

    // Check existing
    const existing = await db.select().from(users).where(eq(users.username, cleanUsername)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: "این نام کاربری قبلاً ثبت شده است. لطفاً نام دیگری انتخاب کنید یا وارد شوید." }, { status: 400 });
    }

    // Default avatars if not given
    const userAvatar = avatar || "👨‍💻";

    const [newUser] = await db
      .insert(users)
      .values({
        username: cleanUsername,
        password: password, // For this playground we store simple or hashed
        avatar: userAvatar,
        bio: bio?.trim() || "علاقه‌مند به دنیای کدنویسی و توسعه بازی",
      })
      .returning();

    const sessionData = {
      id: newUser.id,
      username: newUser.username,
      avatar: newUser.avatar,
      bio: newUser.bio,
    };

    await setSessionUser(sessionData);

    return NextResponse.json({
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد! به دنیای کدنویسی خوش آمدید.",
      user: sessionData,
    });
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "خطایی در ثبت‌نام رخ داد. لطفاً دوباره تلاش کنید." }, { status: 500 });
  }
}

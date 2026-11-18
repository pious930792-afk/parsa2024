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
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "لطفاً نام کاربری و رمز عبور را وارد کنید." }, { status: 400 });
    }

    const cleanUsername = username.trim();

    const [user] = await db.select().from(users).where(eq(users.username, cleanUsername)).limit(1);

    if (!user) {
      return NextResponse.json({ error: "کاربری با این نام یافت نشد. لطفاً ابتدا ثبت‌نام کنید." }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "رمز عبور اشتباه است." }, { status: 401 });
    }

    const sessionData = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
    };

    await setSessionUser(sessionData);

    return NextResponse.json({
      success: true,
      message: `خوش آمدید، ${user.username}!`,
      user: sessionData,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "خطایی در ورود رخ داد." }, { status: 500 });
  }
}

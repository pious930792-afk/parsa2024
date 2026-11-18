import { NextResponse } from "next/server";
import { db } from "@/db";
import { games } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { ensureSeedData } from "@/lib/seed";

export async function GET(req: Request) {
  try {
    await ensureSeedData();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const authorId = searchParams.get("authorId");

    let query = db.select().from(games);

    const allGames = await db
      .select()
      .from(games)
      .where(eq(games.is_public, true))
      .orderBy(desc(games.created_at));

    return NextResponse.json({ games: allGames });
  } catch (error: any) {
    console.error("Error fetching games:", error);
    return NextResponse.json({ error: "خطا در دریافت بازی‌ها" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureSeedData();
    const currentUser = await getCurrentUser();

    const body = await req.json();
    const { title, description, code, language, is_public, is_code_protected, category } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "عنوان بازی نمی‌تواند خالی باشد." }, { status: 400 });
    }
    if (!code || !code.trim()) {
      return NextResponse.json({ error: "کد بازی نمی‌تواند خالی باشد." }, { status: 400 });
    }

    const authorName = currentUser?.username || "برنامه‌نویس مهمان";
    const authorId = currentUser?.id || null;
    const authorAvatar = currentUser?.avatar || "👨‍💻";

    const [newGame] = await db
      .insert(games)
      .values({
        title: title.trim(),
        description: description?.trim() || "ساخته شده در استودیو پارسا خیری",
        code: code,
        language: language || "html",
        author_id: authorId,
        author_name: authorName,
        author_avatar: authorAvatar,
        is_public: is_public !== undefined ? Boolean(is_public) : true,
        is_code_protected: Boolean(is_code_protected),
        category: category || "بازی و سرگرمی",
        likes_count: 1,
        views_count: 1,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: newGame.is_public
        ? "بازی شما با موفقیت برای تمام مردم به اشتراک گذاشته شد!"
        : "بازی ذخیره شد و لینک اشتراک آماده است.",
      game: newGame,
    });
  } catch (error: any) {
    console.error("Error creating game:", error);
    return NextResponse.json({ error: "خطا در ثبت بازی" }, { status: 500 });
  }
}

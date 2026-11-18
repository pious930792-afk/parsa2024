import { NextResponse } from "next/server";
import { db } from "@/db";
import { games } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameId = parseInt(id, 10);
    if (isNaN(gameId)) {
      return NextResponse.json({ error: "شناسه بازی نامعتبر است" }, { status: 400 });
    }

    // Increment views
    await db
      .update(games)
      .set({ views_count: sql`${games.views_count} + 1` })
      .where(eq(games.id, gameId));

    const [game] = await db.select().from(games).where(eq(games.id, gameId)).limit(1);

    if (!game) {
      return NextResponse.json({ error: "بازی مورد نظر پیدا نشد." }, { status: 404 });
    }

    return NextResponse.json({ game });
  } catch (error: any) {
    console.error("Error getting game:", error);
    return NextResponse.json({ error: "خطا در دریافت بازی" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameId = parseInt(id, 10);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "برای حذف باید وارد شوید." }, { status: 401 });
    }

    const [game] = await db.select().from(games).where(eq(games.id, gameId)).limit(1);
    if (!game) {
      return NextResponse.json({ error: "بازی یافت نشد." }, { status: 404 });
    }

    // Only author or admin Parsa Kheyri can delete
    if (game.author_id !== currentUser.id && currentUser.username !== "پارسا خیری") {
      return NextResponse.json({ error: "شما اجازه حذف این بازی را ندارید." }, { status: 403 });
    }

    await db.delete(games).where(eq(games.id, gameId));

    return NextResponse.json({ success: true, message: "بازی با موفقیت حذف شد." });
  } catch (error: any) {
    console.error("Error deleting game:", error);
    return NextResponse.json({ error: "خطا در حذف بازی" }, { status: 500 });
  }
}

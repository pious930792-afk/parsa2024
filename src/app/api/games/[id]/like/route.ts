import { NextResponse } from "next/server";
import { db } from "@/db";
import { games } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameId = parseInt(id, 10);
    if (isNaN(gameId)) {
      return NextResponse.json({ error: "شناسه نامعتبر است" }, { status: 400 });
    }

    const [updated] = await db
      .update(games)
      .set({ likes_count: sql`${games.likes_count} + 1` })
      .where(eq(games.id, gameId))
      .returning();

    return NextResponse.json({ success: true, likes: updated?.likes_count || 0 });
  } catch (error: any) {
    return NextResponse.json({ error: "خطا در پسندیدن بازی" }, { status: 500 });
  }
}

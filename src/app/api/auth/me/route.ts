import { NextResponse } from "next/server";
import { getCurrentUser, clearSessionUser } from "@/lib/auth";
import { ensureSeedData } from "@/lib/seed";

export async function GET() {
  try {
    await ensureSeedData();
    const user = await getCurrentUser();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}

export async function POST() {
  try {
    await clearSessionUser();
    return NextResponse.json({ success: true, message: "با موفقیت خارج شدید." });
  } catch (error) {
    return NextResponse.json({ error: "خطا در خروج" }, { status: 500 });
  }
}

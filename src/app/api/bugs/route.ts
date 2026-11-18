import { NextResponse } from "next/server";
import { db } from "@/db";
import { bugReports } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { ensureSeedData } from "@/lib/seed";

export async function GET() {
  try {
    await ensureSeedData();
    const reports = await db
      .select()
      .from(bugReports)
      .orderBy(desc(bugReports.created_at));

    return NextResponse.json({ reports });
  } catch (error: any) {
    console.error("Error fetching bug reports:", error);
    return NextResponse.json({ error: "خطا در دریافت گزارش‌ها" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureSeedData();
    const currentUser = await getCurrentUser();

    // STRICT REQUIREMENT AS REQUESTED BY USER:
    // "اول باید ثبت نام کنیم، نکنیم نمیشه توش مشکلمون بنویسیم و بفرستیم"
    if (!currentUser) {
      return NextResponse.json(
        {
          error: "دسترسی غیرمجاز! برای نوشتن مشکل و ارسال گزارش باگ، حتماً ابتدا باید در سایت ثبت‌نام کرده و وارد شوید.",
          requiresAuth: true,
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, severity } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "لطفاً عنوان مشکل یا باگ را بنویسید." }, { status: 400 });
    }

    if (!description || !description.trim()) {
      return NextResponse.json({ error: "لطفاً توضیحات مشکل را با جزییات بنویسید تا پارسا خیری بتواند آن را بررسی و آپدیت کند." }, { status: 400 });
    }

    const [newReport] = await db
      .insert(bugReports)
      .values({
        user_id: currentUser.id,
        username: currentUser.username,
        user_avatar: currentUser.avatar,
        title: title.trim(),
        description: description.trim(),
        severity: severity || "متوسط",
        status: "در حال بررسی توسط پارسا خیری",
        admin_notes: "پیام شما دریافت شد و پارسا خیری در آپدیت بعدی سایت آن را برطرف خواهد کرد.",
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "گزارش باگ با موفقیت ارسال شد! پارسا خیری پیام شما را بررسی کرده و سایت را آپدیت خواهد داد. ممنون از کمکتان! 🚀",
      report: newReport,
    });
  } catch (error: any) {
    console.error("Error submitting bug report:", error);
    return NextResponse.json({ error: "خطا در ثبت گزارش باگ" }, { status: 500 });
  }
}

// Update bug report status (e.g. for Parsa Kheyri)
export async function PATCH(req: Request) {
  try {
    await ensureSeedData();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "عدم دسترسی" }, { status: 401 });
    }

    const body = await req.json();
    const { reportId, status, adminNotes } = body;

    if (!reportId) {
      return NextResponse.json({ error: "شناسه گزارش نامعتبر است." }, { status: 400 });
    }

    const [updated] = await db
      .update(bugReports)
      .set({
        status: status || "تایید شده برای آپدیت بعدی",
        admin_notes: adminNotes || "توسط پارسا خیری بررسی شد.",
      })
      .where(eq(bugReports.id, reportId))
      .returning();

    return NextResponse.json({ success: true, report: updated });
  } catch (error: any) {
    return NextResponse.json({ error: "خطا در بروزرسانی وضعیت باگ" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { friendRequests, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq, or, and, ne } from "drizzle-orm";
import { ensureSeedData } from "@/lib/seed";

export async function GET() {
  try {
    await ensureSeedData();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({
        incoming: [],
        friends: [],
        allUsers: [],
        message: "لطفاً ابتدا وارد شوید",
      });
    }

    // Incoming pending requests
    const incoming = await db
      .select()
      .from(friendRequests)
      .where(
        and(
          eq(friendRequests.receiver_id, currentUser.id),
          eq(friendRequests.status, "pending")
        )
      );

    // Accepted friends
    const acceptedList = await db
      .select()
      .from(friendRequests)
      .where(
        and(
          or(
            eq(friendRequests.receiver_id, currentUser.id),
            eq(friendRequests.sender_id, currentUser.id)
          ),
          eq(friendRequests.status, "accepted")
        )
      );

    // Outgoing pending
    const outgoing = await db
      .select()
      .from(friendRequests)
      .where(
        and(
          eq(friendRequests.sender_id, currentUser.id),
          eq(friendRequests.status, "pending")
        )
      );

    // Other users to add
    const otherUsers = await db
      .select({
        id: users.id,
        username: users.username,
        avatar: users.avatar,
        bio: users.bio,
      })
      .from(users)
      .where(ne(users.id, currentUser.id))
      .limit(10);

    return NextResponse.json({
      incoming,
      outgoing,
      friends: acceptedList,
      otherUsers,
    });
  } catch (error: any) {
    console.error("Error fetching friends:", error);
    return NextResponse.json({ error: "خطا در دریافت لیست دوستان" }, { status: 500 });
  }
}

// Send friend request
export async function POST(req: Request) {
  try {
    await ensureSeedData();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "برای ارسال درخواست دوستی ابتدا باید وارد حساب خود شوید." }, { status: 401 });
    }

    const body = await req.json();
    const { receiverUsername, receiverId } = body;

    let targetUser;
    if (receiverId) {
      const [u] = await db.select().from(users).where(eq(users.id, receiverId)).limit(1);
      targetUser = u;
    } else if (receiverUsername) {
      const [u] = await db.select().from(users).where(eq(users.username, receiverUsername.trim())).limit(1);
      targetUser = u;
    }

    if (!targetUser) {
      return NextResponse.json({ error: "کاربر مورد نظر یافت نشد." }, { status: 404 });
    }

    if (targetUser.id === currentUser.id) {
      return NextResponse.json({ error: "نمی‌توانید به خودتان درخواست دوستی بفرستید!" }, { status: 400 });
    }

    // Check if request already exists
    const existing = await db
      .select()
      .from(friendRequests)
      .where(
        or(
          and(
            eq(friendRequests.sender_id, currentUser.id),
            eq(friendRequests.receiver_id, targetUser.id)
          ),
          and(
            eq(friendRequests.sender_id, targetUser.id),
            eq(friendRequests.receiver_id, currentUser.id)
          )
        )
      )
      .limit(1);

    if (existing.length > 0) {
      const prev = existing[0];
      if (prev.status === "accepted") {
        return NextResponse.json({ error: "شما در حال حاضر با این کاربر دوست هستید! 🤝" }, { status: 400 });
      }
      if (prev.status === "pending") {
        return NextResponse.json({ error: "یک درخواست دوستی قبلاً بین شما ارسال شده است." }, { status: 400 });
      }
    }

    const [newRequest] = await db
      .insert(friendRequests)
      .values({
        sender_id: currentUser.id,
        sender_username: currentUser.username,
        sender_avatar: currentUser.avatar,
        receiver_id: targetUser.id,
        receiver_username: targetUser.username,
        status: "pending",
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: `درخواست دوستی شما با موفقیت برای «${targetUser.username}» ارسال شد! ✨`,
      request: newRequest,
    });
  } catch (error: any) {
    console.error("Error sending friend request:", error);
    return NextResponse.json({ error: "خطا در ارسال درخواست دوستی" }, { status: 500 });
  }
}

// Accept or Reject friend request
export async function PUT(req: Request) {
  try {
    await ensureSeedData();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "ابتدا باید وارد حساب خود شوید." }, { status: 401 });
    }

    const body = await req.json();
    const { requestId, action } = body; // action: 'accept' or 'reject'

    if (!requestId || !action) {
      return NextResponse.json({ error: "اطلاعات ناقص است." }, { status: 400 });
    }

    const [request] = await db
      .select()
      .from(friendRequests)
      .where(eq(friendRequests.id, requestId))
      .limit(1);

    if (!request) {
      return NextResponse.json({ error: "درخواست دوستی پیدا نشد." }, { status: 404 });
    }

    // Only receiver can accept or reject
    if (request.receiver_id !== currentUser.id) {
      return NextResponse.json({ error: "شما اجازه پاسخ به این درخواست را ندارید." }, { status: 403 });
    }

    const newStatus = action === "accept" ? "accepted" : "rejected";

    const [updated] = await db
      .update(friendRequests)
      .set({ status: newStatus })
      .where(eq(friendRequests.id, requestId))
      .returning();

    return NextResponse.json({
      success: true,
      message:
        action === "accept"
          ? `🎉 عالیه! شما درخواست دوستی «${request.sender_username}» را پذیرفتید.`
          : `درخواست دوستی «${request.sender_username}» رد شد.`,
      request: updated,
    });
  } catch (error: any) {
    console.error("Error updating friend request:", error);
    return NextResponse.json({ error: "خطا در پردازش درخواست دوستی" }, { status: 500 });
  }
}

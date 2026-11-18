import { cookies } from "next/headers";
import { db } from "@/db";
import { users, User } from "@/db/schema";
import { eq } from "drizzle-orm";

const COOKIE_NAME = "arena_coder_user";

export interface SessionUser {
  id: number;
  username: string;
  avatar: string;
  bio?: string | null;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const parsed = JSON.parse(sessionCookie.value) as SessionUser;
    if (!parsed || !parsed.id) return null;

    // Verify user exists in database
    const [user] = await db.select().from(users).where(eq(users.id, parsed.id)).limit(1);
    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
    };
  } catch {
    return null;
  }
}

export async function setSessionUser(user: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(user), {
    httpOnly: false, // Accessible to client for quick state sync
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearSessionUser() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

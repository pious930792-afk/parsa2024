import { pgTable, serial, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  avatar: text("avatar").notNull().default("👨‍💻"),
  bio: text("bio").default("برنامه‌نویس و سازنده بازی در آکادمی پارسا"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 150 }).notNull(),
  description: text("description").default(""),
  code: text("code").notNull(),
  language: varchar("language", { length: 30 }).default("html").notNull(),
  author_id: integer("author_id").references(() => users.id, { onDelete: "cascade" }),
  author_name: varchar("author_name", { length: 50 }).notNull(),
  author_avatar: text("author_avatar").default("👨‍💻"),
  is_public: boolean("is_public").default(true).notNull(),
  is_code_protected: boolean("is_code_protected").default(false).notNull(), // if true, code cannot be copied
  likes_count: integer("likes_count").default(0).notNull(),
  views_count: integer("views_count").default(0).notNull(),
  category: varchar("category", { length: 50 }).default("بازی و گرافیک"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const friendRequests = pgTable("friend_requests", {
  id: serial("id").primaryKey(),
  sender_id: integer("sender_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  sender_username: varchar("sender_username", { length: 50 }).notNull(),
  sender_avatar: text("sender_avatar").default("👨‍💻"),
  receiver_id: integer("receiver_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  receiver_username: varchar("receiver_username", { length: 50 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // 'pending', 'accepted', 'rejected'
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const bugReports = pgTable("bug_reports", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  username: varchar("username", { length: 50 }).notNull(),
  user_avatar: text("user_avatar").default("👨‍💻"),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  severity: varchar("severity", { length: 30 }).default("متوسط").notNull(), // کم, متوسط, زیاد, فوری
  status: varchar("status", { length: 100 }).default("در حال بررسی توسط پارسا خیری").notNull(),
  admin_notes: text("admin_notes").default("با تشکر از گزارش شما، در آپدیت بعدی رسیدگی می‌شود."),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;
export type FriendRequest = typeof friendRequests.$inferSelect;
export type BugReport = typeof bugReports.$inferSelect;

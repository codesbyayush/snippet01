import {
  mysqlTable,
  int,
  text,
  datetime,
  varchar,
  date,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const snippet = mysqlTable("snippet", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  language: text("language").notNull(),
  stdin: text("stdin").notNull(),
  srccode: text("srccode").notNull(),
  createdAt: datetime("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// export const users = mysqlTable("users", {
//   id: int("id").primaryKey(),
//   name: text("name").notNull(),
//   email: varchar("email", { length: 200 }).unique().notNull(),
// });

// export const posts = mysqlTable("posts", {
//   id: int("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   userId: int("user_id")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   createdAt: datetime("created_at")
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
// });

// export type InsertUser = typeof users.$inferInsert;
// export type SelectUser = typeof users.$inferSelect;

// export type InsertPost = typeof posts.$inferInsert;
// export type SelectPost = typeof posts.$inferSelect;

export type SelectSnippet = typeof snippet.$inferSelect;
export type InsertSnippet = typeof snippet.$inferInsert;

import { index, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

import { createdAt, primaryId, updatedAt } from "@/db/schema/_shared";
import { postStatusEnum } from "@/db/schema/enums";
import { users } from "@/db/schema/users";

export const posts = pgTable(
  "posts",
  {
    id: primaryId(),
    title: text("title").notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    status: postStatusEnum("status").default("draft").notNull(),
    publishedAt: timestamp("published_at", {
      withTimezone: true,
      mode: "date",
    }),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("posts_slug_key").on(table.slug),
    index("posts_author_id_idx").on(table.authorId),
    index("posts_status_published_at_idx").on(table.status, table.publishedAt),
  ],
);

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

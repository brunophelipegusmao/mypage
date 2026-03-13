import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { createdAt, primaryId, updatedAt } from "@/db/schema/_shared";

export const users = pgTable(
  "users",
  {
    id: primaryId(),
    name: text("name"),
    email: varchar("email", { length: 320 }).notNull(),
    passwordHash: text("password_hash"),
    isAdmin: boolean("is_admin").default(false).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("users_email_key").on(table.email),
    uniqueIndex("users_single_admin_key")
      .on(table.isAdmin)
      .where(sql`${table.isAdmin} = true`),
  ],
);

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

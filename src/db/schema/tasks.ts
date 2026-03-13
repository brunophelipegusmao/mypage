import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createdAt, primaryId, updatedAt } from "@/db/schema/_shared";
import { taskStatusEnum } from "@/db/schema/enums";
import { users } from "@/db/schema/users";

export const tasks = pgTable(
  "tasks",
  {
    id: primaryId(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    status: taskStatusEnum("status").default("todo").notNull(),
    dueAt: timestamp("due_at", {
      withTimezone: true,
      mode: "date",
    }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    index("tasks_owner_id_idx").on(table.ownerId),
    index("tasks_owner_status_idx").on(table.ownerId, table.status),
  ],
);

export type InsertTask = typeof tasks.$inferInsert;
export type SelectTask = typeof tasks.$inferSelect;

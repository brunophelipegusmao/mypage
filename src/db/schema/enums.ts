import { pgEnum } from "drizzle-orm/pg-core";

export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);
export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in_progress",
  "done",
]);

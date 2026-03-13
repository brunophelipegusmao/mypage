import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { TaskNotFoundError } from "@/services/tasks/task-errors";
import type { TaskService } from "@/services/tasks/task-service.contract";
import type { TaskRecord } from "@/types/task";

const serializeTaskRecord = (task: typeof tasks.$inferSelect): TaskRecord => ({
  ...task,
});

export const taskService: TaskService = {
  async listTasksByOwner(ownerId) {
    const records = await db
      .select()
      .from(tasks)
      .where(eq(tasks.ownerId, ownerId))
      .orderBy(desc(tasks.createdAt));

    return records.map(serializeTaskRecord);
  },
  async createTask(ownerId, input) {
    const [createdTask] = await db
      .insert(tasks)
      .values({
        ownerId,
        title: input.title,
        description: input.description,
        status: input.status,
        dueAt: input.dueAt,
      })
      .returning();

    return serializeTaskRecord(createdTask);
  },
  async updateTask(ownerId, taskId, input) {
    const [updatedTask] = await db
      .update(tasks)
      .set({
        title: input.title,
        description: input.description,
        status: input.status,
        dueAt: input.dueAt,
        updatedAt: new Date(),
      })
      .where(and(eq(tasks.id, taskId), eq(tasks.ownerId, ownerId)))
      .returning();

    if (!updatedTask) {
      throw new TaskNotFoundError();
    }

    return serializeTaskRecord(updatedTask);
  },
  async deleteTask(ownerId, taskId) {
    const [deletedTask] = await db
      .delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.ownerId, ownerId)))
      .returning({ id: tasks.id });

    if (!deletedTask) {
      throw new TaskNotFoundError();
    }
  },
};

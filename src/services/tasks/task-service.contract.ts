import type { TaskEditorInput, TaskRecord } from "@/types/task";

export interface TaskService {
  listTasksByOwner(ownerId: string): Promise<TaskRecord[]>;
  createTask(ownerId: string, input: TaskEditorInput): Promise<TaskRecord>;
  updateTask(
    ownerId: string,
    taskId: string,
    input: TaskEditorInput,
  ): Promise<TaskRecord>;
  deleteTask(ownerId: string, taskId: string): Promise<void>;
}

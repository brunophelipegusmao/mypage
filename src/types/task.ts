export type TaskStatus = "todo" | "in_progress" | "done";

export interface TaskRecord {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskEditorInput {
  title: TaskRecord["title"];
  description: TaskRecord["description"];
  status: TaskRecord["status"];
  dueAt: TaskRecord["dueAt"];
}

export interface TaskApiRecord {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskEditorValues {
  title: string;
  description: string;
  status: TaskStatus;
  dueAt: string;
}

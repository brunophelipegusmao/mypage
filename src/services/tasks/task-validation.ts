import { TaskValidationError } from "@/services/tasks/task-errors";
import type { TaskEditorInput, TaskStatus } from "@/types/task";

const taskStatuses: TaskStatus[] = ["todo", "in_progress", "done"];

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseOptionalText = (
  value: unknown,
  fieldName: string,
  maxLength: number,
) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new TaskValidationError(`${fieldName} precisa ser um texto válido.`);
  }

  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  if (normalized.length > maxLength) {
    throw new TaskValidationError(
      `${fieldName} deve ter no máximo ${maxLength} caracteres.`,
    );
  }

  return normalized;
};

const parseTitle = (value: unknown) => {
  if (typeof value !== "string") {
    throw new TaskValidationError("Título é obrigatório.");
  }

  const normalized = value.trim();

  if (!normalized) {
    throw new TaskValidationError("Título é obrigatório.");
  }

  if (normalized.length > 140) {
    throw new TaskValidationError("Título deve ter no máximo 140 caracteres.");
  }

  return normalized;
};

const parseStatus = (value: unknown, fallback: TaskStatus = "todo") => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (typeof value !== "string" || !taskStatuses.includes(value as TaskStatus)) {
    throw new TaskValidationError("Status de tarefa inválido.");
  }

  return value as TaskStatus;
};

const parseDueAt = (value: unknown) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new TaskValidationError("Prazo precisa ser uma data válida.");
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new TaskValidationError("Prazo precisa ser uma data válida.");
  }

  return parsedDate;
};

export const parseTaskId = (taskId: unknown) => {
  if (typeof taskId !== "string") {
    throw new TaskValidationError("Identificador de tarefa inválido.");
  }

  const normalized = taskId.trim();

  if (!normalized) {
    throw new TaskValidationError("Identificador de tarefa inválido.");
  }

  return normalized;
};

export const parseTaskEditorInput = (payload: unknown): TaskEditorInput => {
  if (!isPlainObject(payload)) {
    throw new TaskValidationError("Payload de tarefa inválido.");
  }

  return {
    title: parseTitle(payload.title),
    description: parseOptionalText(payload.description, "Descrição", 2000),
    status: parseStatus(payload.status),
    dueAt: parseDueAt(payload.dueAt),
  };
};

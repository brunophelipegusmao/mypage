"use client";

import clsx from "clsx";
import {
  CheckCircle2,
  Circle,
  Clock3,
  LoaderCircle,
  PencilLine,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Input, Label, Textarea } from "@/components/Input";
import { routeCatalog } from "@/lib/navigation/app-routes";
import type {
  TaskApiRecord,
  TaskEditorValues,
  TaskStatus,
} from "@/types/task";

type LoadState = "loading" | "ready" | "error";

const taskEditorDefaults: TaskEditorValues = {
  title: "",
  description: "",
  status: "todo",
  dueAt: "",
};

const statusLabels: Record<TaskStatus, string> = {
  todo: "Pendente",
  in_progress: "Em andamento",
  done: "Concluída",
};

const statusBadgeClasses: Record<TaskStatus, string> = {
  todo: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  in_progress: "border-sky-500/25 bg-sky-500/10 text-sky-200",
  done: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
};

const inputClasses =
  "focus:ring-primary hover:border-primary/40 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-foreground transition-colors focus:border-primary/35 focus:ring-2 focus:outline-none";

const getErrorMessage = (error: unknown) =>
  error instanceof Error
    ? error.message
    : "Não foi possível concluir a operação de tarefas.";

const toTaskPayload = (values: TaskEditorValues) => ({
  title: values.title,
  description: values.description.trim() ? values.description : null,
  status: values.status,
  dueAt: values.dueAt ? new Date(values.dueAt).toISOString() : null,
});

const toEditorValues = (task: TaskApiRecord): TaskEditorValues => ({
  title: task.title,
  description: task.description ?? "",
  status: task.status,
  dueAt: toDateTimeLocalValue(task.dueAt),
});

function toDateTimeLocalValue(value: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

async function requestTasksApi<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof body?.error === "string"
        ? body.error
        : "Não foi possível concluir a operação de tarefas.",
    );
  }

  return body as T;
}

function TaskEditorFields({
  values,
  onChange,
  disableStatus = false,
  disabled = false,
}: {
  values: TaskEditorValues;
  onChange: (field: keyof TaskEditorValues, value: string) => void;
  disableStatus?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-4">
        <div>
          <Label htmlFor="task-title" required>
            Título
          </Label>
          <Input
            id="task-title"
            value={values.title}
            onChange={(event) => onChange("title", event.target.value)}
            placeholder="Ex.: revisar draft do próximo post"
            disabled={disabled}
          />
        </div>

        <div>
          <Label htmlFor="task-description">Descrição</Label>
          <Textarea
            id="task-description"
            value={values.description}
            onChange={(event) => onChange("description", event.target.value)}
            rows={4}
            placeholder="Contexto curto da tarefa, links ou próximos passos."
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="task-status">Status</Label>
          <select
            id="task-status"
            value={values.status}
            onChange={(event) => onChange("status", event.target.value)}
            className={clsx(inputClasses, "appearance-none")}
            disabled={disabled || disableStatus}
          >
            <option value="todo">Pendente</option>
            <option value="in_progress">Em andamento</option>
            <option value="done">Concluída</option>
          </select>
        </div>

        <div>
          <Label htmlFor="task-due-at">Prazo</Label>
          <input
            id="task-due-at"
            type="datetime-local"
            value={values.dueAt}
            onChange={(event) => onChange("dueAt", event.target.value)}
            className={inputClasses}
            disabled={disabled}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/4 p-4 text-sm text-foreground/65">
          <div className="mb-2 flex items-center gap-2 text-foreground">
            <Clock3 className="h-4 w-4" />
            <span className="font-medium">Persistência real</span>
          </div>
          <p className="leading-6">
            Todas as mutações passam pelos handlers internos de `/api/tasks` e
            ficam vinculadas ao proprietário autenticado no banco.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TodoWorkspace() {
  const [tasks, setTasks] = useState<TaskApiRecord[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [createValues, setCreateValues] = useState<TaskEditorValues>(
    taskEditorDefaults,
  );
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<TaskEditorValues>(
    taskEditorDefaults,
  );
  const [isCreating, setIsCreating] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadTasks = async () => {
      setLoadState("loading");
      setLoadError(null);

      try {
        const data = await requestTasksApi<TaskApiRecord[]>(
          routeCatalog.apiTasks,
          {
            signal: controller.signal,
          },
        );

        setTasks(data);
        setLoadState("ready");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setLoadError(getErrorMessage(error));
        setLoadState("error");
      }
    };

    void loadTasks();

    return () => controller.abort();
  }, []);

  const openTasksCount = tasks.filter((task) => task.status !== "done").length;
  const completedTasksCount = tasks.length - openTasksCount;

  const handleCreateFieldChange = (
    field: keyof TaskEditorValues,
    value: string,
  ) => {
    setCreateValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleEditFieldChange = (
    field: keyof TaskEditorValues,
    value: string,
  ) => {
    setEditingValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleRetry = async () => {
    setLoadState("loading");
    setLoadError(null);

    try {
      const data = await requestTasksApi<TaskApiRecord[]>(routeCatalog.apiTasks);
      setTasks(data);
      setLoadState("ready");
    } catch (error) {
      setLoadError(getErrorMessage(error));
      setLoadState("error");
    }
  };

  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);
    setMutationError(null);

    try {
      const createdTask = await requestTasksApi<TaskApiRecord>(
        routeCatalog.apiTasks,
        {
          method: "POST",
          body: JSON.stringify(toTaskPayload(createValues)),
        },
      );

      setTasks((current) => [createdTask, ...current]);
      setCreateValues(taskEditorDefaults);
    } catch (error) {
      setMutationError(getErrorMessage(error));
    } finally {
      setIsCreating(false);
    }
  };

  const handleStartEditing = (task: TaskApiRecord) => {
    setEditingTaskId(task.id);
    setEditingValues(toEditorValues(task));
    setMutationError(null);
  };

  const handleCancelEditing = () => {
    setEditingTaskId(null);
    setEditingValues(taskEditorDefaults);
  };

  const handleUpdateTask = async (
    event: React.FormEvent<HTMLFormElement>,
    taskId: string,
  ) => {
    event.preventDefault();
    setActiveTaskId(taskId);
    setMutationError(null);

    try {
      const updatedTask = await requestTasksApi<TaskApiRecord>(
        routeCatalog.apiTask(taskId),
        {
          method: "PATCH",
          body: JSON.stringify(toTaskPayload(editingValues)),
        },
      );

      setTasks((current) =>
        current.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
      handleCancelEditing();
    } catch (error) {
      setMutationError(getErrorMessage(error));
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleToggleTaskCompletion = async (task: TaskApiRecord) => {
    setActiveTaskId(task.id);
    setMutationError(null);

    const nextStatus: TaskStatus = task.status === "done" ? "todo" : "done";

    try {
      const updatedTask = await requestTasksApi<TaskApiRecord>(
        routeCatalog.apiTask(task.id),
        {
          method: "PATCH",
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            dueAt: task.dueAt,
            status: nextStatus,
          }),
        },
      );

      setTasks((current) =>
        current.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask,
        ),
      );
    } catch (error) {
      setMutationError(getErrorMessage(error));
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setActiveTaskId(taskId);
    setMutationError(null);

    try {
      await requestTasksApi<{ success: true }>(routeCatalog.apiTask(taskId), {
        method: "DELETE",
      });

      setTasks((current) => current.filter((task) => task.id !== taskId));

      if (editingTaskId === taskId) {
        handleCancelEditing();
      }
    } catch (error) {
      setMutationError(getErrorMessage(error));
    } finally {
      setActiveTaskId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden" hover={false}>
          <CardHeader className="mb-0">
            <p className="text-xs tracking-[0.18em] uppercase text-foreground/55">
              Total
            </p>
            <CardTitle className="mt-3 text-3xl" hover={false}>
              {tasks.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Base completa de tarefas privadas persistidas no banco.
          </CardContent>
        </Card>

        <Card className="overflow-hidden" hover={false}>
          <CardHeader className="mb-0">
            <p className="text-xs tracking-[0.18em] uppercase text-foreground/55">
              Abertas
            </p>
            <CardTitle className="mt-3 text-3xl" hover={false}>
              {openTasksCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Tarefas que ainda exigem ação do proprietário.
          </CardContent>
        </Card>

        <Card className="overflow-hidden" hover={false}>
          <CardHeader className="mb-0">
            <p className="text-xs tracking-[0.18em] uppercase text-foreground/55">
              Concluídas
            </p>
            <CardTitle className="mt-3 text-3xl" hover={false}>
              {completedTasksCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Itens finalizados e mantidos no histórico privado.
          </CardContent>
        </Card>
      </section>

      <Card hover={false}>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-primary text-xs tracking-[0.16em] uppercase">
                Nova tarefa
              </p>
              <CardTitle className="mt-3" hover={false}>
                Criar item do to-do
              </CardTitle>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/60">
              Persistido em Neon + Drizzle
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleCreateTask}>
            <TaskEditorFields
              values={createValues}
              onChange={handleCreateFieldChange}
              disabled={isCreating}
            />

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="submit"
                size="sm"
                className="inline-flex items-center gap-2"
                disabled={isCreating}
              >
                {isCreating ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Criar tarefa
              </Button>

              <Button
                type="button"
                size="sm"
                variant="muted"
                onClick={() => setCreateValues(taskEditorDefaults)}
                disabled={isCreating}
              >
                Limpar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {mutationError ? (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {mutationError}
        </div>
      ) : null}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-primary text-xs tracking-[0.16em] uppercase">
              Lista privada
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Tarefas atuais</h2>
          </div>

          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="inline-flex items-center gap-2"
            onClick={() => void handleRetry()}
            disabled={loadState === "loading"}
          >
            {loadState === "loading" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Recarregar
          </Button>
        </div>

        {loadState === "loading" ? (
          <Card hover={false}>
            <CardContent className="flex min-h-48 flex-col items-center justify-center gap-3 py-12 text-center">
              <LoaderCircle className="text-primary h-8 w-8 animate-spin" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">Carregando tarefas</p>
                <p className="text-sm text-foreground/60">
                  Consultando a área privada no banco real.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {loadState === "error" && loadError ? (
          <Card hover={false}>
            <CardContent className="space-y-4 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10 text-red-100">
                <X className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-foreground">
                  Não foi possível carregar o to-do
                </p>
                <p className="text-sm text-foreground/60">{loadError}</p>
              </div>
              <div className="flex justify-center">
                <Button
                  type="button"
                  size="sm"
                  className="inline-flex items-center gap-2"
                  onClick={() => void handleRetry()}
                >
                  <RefreshCw className="h-4 w-4" />
                  Tentar novamente
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {loadState === "ready" && tasks.length === 0 ? (
          <Card hover={false}>
            <CardContent className="space-y-4 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Circle className="text-primary h-6 w-6" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-foreground">
                  Nenhuma tarefa criada ainda
                </p>
                <p className="mx-auto max-w-xl text-sm leading-6 text-foreground/60">
                  Esse espaço já está conectado ao banco e pronto para fluxo
                  real. Crie a primeira tarefa acima para começar o histórico
                  privado do to-do.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {loadState === "ready" && tasks.length > 0 ? (
          <div className="grid gap-4">
            {tasks.map((task) => {
              const isEditing = editingTaskId === task.id;
              const isMutating = activeTaskId === task.id;

              return (
                <Card key={task.id} hover={false} className="overflow-hidden">
                  {isEditing ? (
                    <CardContent className="space-y-5 pt-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-primary text-xs tracking-[0.16em] uppercase">
                            Editando tarefa
                          </p>
                          <h3 className="mt-2 text-xl font-semibold text-foreground">
                            {task.title}
                          </h3>
                        </div>
                        <span
                          className={clsx(
                            "rounded-full border px-3 py-1 text-xs font-medium",
                            statusBadgeClasses[task.status],
                          )}
                        >
                          {statusLabels[task.status]}
                        </span>
                      </div>

                      <form
                        className="space-y-5"
                        onSubmit={(event) => void handleUpdateTask(event, task.id)}
                      >
                        <TaskEditorFields
                          values={editingValues}
                          onChange={handleEditFieldChange}
                          disabled={isMutating}
                        />

                        <div className="flex flex-wrap items-center gap-3">
                          <Button
                            type="submit"
                            size="sm"
                            className="inline-flex items-center gap-2"
                            disabled={isMutating}
                          >
                            {isMutating ? (
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                            ) : (
                              <PencilLine className="h-4 w-4" />
                            )}
                            Salvar alterações
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant="muted"
                            onClick={handleCancelEditing}
                            disabled={isMutating}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  ) : (
                    <CardContent className="space-y-5 pt-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => void handleToggleTaskCompletion(task)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-primary/35 hover:text-primary"
                              aria-label={
                                task.status === "done"
                                  ? "Reabrir tarefa"
                                  : "Concluir tarefa"
                              }
                              disabled={isMutating}
                            >
                              {isMutating ? (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                              ) : task.status === "done" ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                              ) : (
                                <Circle className="h-5 w-5" />
                              )}
                            </button>

                            <div>
                              <h3 className="text-xl font-semibold text-foreground">
                                {task.title}
                              </h3>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span
                                  className={clsx(
                                    "rounded-full border px-3 py-1 text-xs font-medium",
                                    statusBadgeClasses[task.status],
                                  )}
                                >
                                  {statusLabels[task.status]}
                                </span>
                                {task.dueAt ? (
                                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/65">
                                    Prazo:{" "}
                                    {new Intl.DateTimeFormat("pt-BR", {
                                      dateStyle: "short",
                                      timeStyle: "short",
                                    }).format(new Date(task.dueAt))}
                                  </span>
                                ) : (
                                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/50">
                                    Sem prazo
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {task.description ? (
                            <p className="max-w-3xl text-sm leading-6 text-foreground/68">
                              {task.description}
                            </p>
                          ) : (
                            <p className="text-sm text-foreground/45">
                              Sem descrição adicional.
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            className="inline-flex items-center gap-2"
                            onClick={() => handleStartEditing(task)}
                            disabled={isMutating}
                          >
                            <PencilLine className="h-4 w-4" />
                            Editar
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant="muted"
                            className="inline-flex items-center gap-2"
                            onClick={() => void handleDeleteTask(task.id)}
                            disabled={isMutating}
                          >
                            <Trash2 className="h-4 w-4" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}

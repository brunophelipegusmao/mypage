import { NextResponse } from "next/server";

import { getOwnerIdentity } from "@/lib/auth/owner-session";
import {
  TaskNotFoundError,
  TaskValidationError,
} from "@/services/tasks/task-errors";
import type { OwnerIdentity } from "@/types/auth";

const noStoreHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
} as const;

export const jsonNoStore = (body: unknown, init?: ResponseInit) =>
  NextResponse.json(body, {
    ...init,
    headers: {
      ...noStoreHeaders,
      ...init?.headers,
    },
  });

export const getApiOwnerIdentity = async (): Promise<OwnerIdentity | null> =>
  getOwnerIdentity();

export const unauthorizedTaskResponse = () =>
  jsonNoStore({ error: "Acesso não autorizado para esta área privada." }, { status: 401 });

export const handleTaskRouteError = (error: unknown) => {
  if (error instanceof TaskValidationError) {
    return jsonNoStore(
      {
        error: error.message,
        issues: error.issues,
      },
      { status: 400 },
    );
  }

  if (error instanceof TaskNotFoundError) {
    return jsonNoStore({ error: error.message }, { status: 404 });
  }

  if (error instanceof SyntaxError) {
    return jsonNoStore({ error: "Payload JSON inválido." }, { status: 400 });
  }

  console.error("Unhandled task route error:", error);

  return jsonNoStore(
    { error: "Não foi possível processar a operação de tarefas." },
    { status: 500 },
  );
};

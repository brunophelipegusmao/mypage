import { NextResponse } from "next/server";

import { getOwnerIdentity } from "@/lib/auth/owner-session";
import {
  PostNotFoundError,
  PostSlugConflictError,
  PostValidationError,
} from "@/services/posts/post-errors";
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

export const unauthorizedPostResponse = () =>
  jsonNoStore({ error: "Acesso não autorizado para a administração do blog." }, { status: 401 });

export const handlePostRouteError = (error: unknown) => {
  if (error instanceof PostValidationError) {
    return jsonNoStore(
      {
        error: error.message,
        issues: error.issues,
      },
      { status: 400 },
    );
  }

  if (error instanceof PostSlugConflictError) {
    return jsonNoStore({ error: error.message }, { status: 409 });
  }

  if (error instanceof PostNotFoundError) {
    return jsonNoStore({ error: error.message }, { status: 404 });
  }

  if (error instanceof SyntaxError) {
    return jsonNoStore({ error: "Payload JSON inválido." }, { status: 400 });
  }

  console.error("Unhandled post route error:", error);

  return jsonNoStore(
    { error: "Não foi possível processar a operação editorial." },
    { status: 500 },
  );
};

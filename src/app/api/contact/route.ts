import { NextResponse } from "next/server";

import {
  ContactConfigurationError,
  ContactDeliveryError,
  sendContactSubmission,
} from "@/services/contact/contact-service";
import {
  ContactValidationError,
  parseContactSubmission,
} from "@/services/contact/contact-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
} as const;

const jsonNoStore = (body: unknown, init?: ResponseInit) =>
  NextResponse.json(body, {
    ...init,
    headers: {
      ...noStoreHeaders,
      ...init?.headers,
    },
  });

export async function POST(request: Request) {
  try {
    const submission = parseContactSubmission(await request.json());
    const result = await sendContactSubmission(submission);

    return jsonNoStore(
      {
        success: true,
        id: result.id,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ContactValidationError) {
      return jsonNoStore(
        {
          error: error.message,
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    if (error instanceof ContactConfigurationError) {
      console.error("Contact flow misconfigured:", error.message);

      return jsonNoStore(
        {
          error: "Fluxo de contato indisponível por configuração incompleta.",
        },
        { status: 503 },
      );
    }

    if (error instanceof ContactDeliveryError) {
      console.error("Contact email delivery failed:", error.message);

      return jsonNoStore(
        {
          error: "Não foi possível enviar a mensagem no momento.",
        },
        { status: 502 },
      );
    }

    if (error instanceof SyntaxError) {
      return jsonNoStore(
        {
          error: "Payload JSON inválido.",
        },
        { status: 400 },
      );
    }

    console.error("Unhandled contact route error:", error);

    return jsonNoStore(
      {
        error: "Falha inesperada ao processar o contato.",
      },
      { status: 500 },
    );
  }
}

import { PostValidationError } from "@/services/posts/post-errors";
import type { PostEditorDraft, PostStatus } from "@/types/post";

const postStatuses: PostStatus[] = ["draft", "published"];

const maxSlugLength = 200;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseRequiredText = (
  value: unknown,
  fieldName: string,
  maxLength: number,
) => {
  if (typeof value !== "string") {
    throw new PostValidationError(`${fieldName} é obrigatório.`);
  }

  const normalized = value.trim();

  if (!normalized) {
    throw new PostValidationError(`${fieldName} é obrigatório.`);
  }

  if (normalized.length > maxLength) {
    throw new PostValidationError(
      `${fieldName} deve ter no máximo ${maxLength} caracteres.`,
    );
  }

  return normalized;
};

const parseOptionalText = (
  value: unknown,
  fieldName: string,
  maxLength: number,
) => {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value !== "string") {
    throw new PostValidationError(`${fieldName} precisa ser um texto válido.`);
  }

  const normalized = value.trim();

  if (normalized.length > maxLength) {
    throw new PostValidationError(
      `${fieldName} deve ter no máximo ${maxLength} caracteres.`,
    );
  }

  return normalized;
};

const parsePostContent = (value: unknown) => {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value !== "string") {
    throw new PostValidationError("Conteúdo precisa ser um texto válido.");
  }

  if (value.length > 50_000) {
    throw new PostValidationError(
      "Conteúdo deve ter no máximo 50000 caracteres.",
    );
  }

  return value.trim();
};

const parsePostStatus = (
  value: unknown,
  fallback: PostStatus = "draft",
): PostStatus => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (typeof value !== "string" || !postStatuses.includes(value as PostStatus)) {
    throw new PostValidationError("Status editorial inválido.");
  }

  return value as PostStatus;
};

export const normalizePostSlug = (rawSlug: string, titleFallback = "") => {
  const candidate = (rawSlug.trim() || titleFallback.trim())
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const normalized = candidate.slice(0, maxSlugLength).replace(/-+$/g, "");

  if (!normalized) {
    throw new PostValidationError(
      "Slug inválido. Informe um slug ou um título que gere um slug válido.",
    );
  }

  return normalized;
};

export const isCanonicalPostSlug = (slug: string) => {
  const trimmedSlug = slug.trim();

  if (!trimmedSlug) {
    return false;
  }

  try {
    return normalizePostSlug(trimmedSlug) === trimmedSlug;
  } catch {
    return false;
  }
};

export const parsePostId = (postId: unknown) => {
  if (typeof postId !== "string") {
    throw new PostValidationError("Identificador de post inválido.");
  }

  const normalized = postId.trim();

  if (!normalized) {
    throw new PostValidationError("Identificador de post inválido.");
  }

  return normalized;
};

export const parsePostSlugParam = (slug: unknown) => {
  if (typeof slug !== "string") {
    throw new PostValidationError("Slug de post inválido.");
  }

  return normalizePostSlug(slug);
};

export const parseCanonicalPostSlugParam = (slug: unknown) => {
  if (typeof slug !== "string") {
    throw new PostValidationError("Slug de post inválido.");
  }

  const trimmedSlug = slug.trim();

  if (!isCanonicalPostSlug(trimmedSlug)) {
    throw new PostValidationError("Slug de post inválido.");
  }

  return trimmedSlug;
};

export const parsePostEditorInput = (payload: unknown): PostEditorDraft => {
  if (!isPlainObject(payload)) {
    throw new PostValidationError("Payload de post inválido.");
  }

  return {
    title: parseRequiredText(payload.title, "Título", 180),
    slug: parseOptionalText(payload.slug, "Slug", maxSlugLength),
    excerpt: parseOptionalText(payload.excerpt, "Resumo", 320),
    content: parsePostContent(payload.content),
    status: parsePostStatus(payload.status),
  };
};

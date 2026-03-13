import { routeCatalog } from "@/lib/navigation/app-routes";
import type {
  PostApiRecord,
  PostEditorValues,
  PostStatus,
} from "@/types/post";

export const emptyPostEditorValues: PostEditorValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "draft",
};

export const postStatusLabels: Record<PostStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
};

export const postStatusBadgeClasses: Record<PostStatus, string> = {
  draft: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  published: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
};

export const createSlugSuggestion = (value: string) =>
  value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200)
    .replace(/-+$/g, "");

export const toPostPayload = (values: PostEditorValues) => ({
  title: values.title,
  slug: values.slug,
  excerpt: values.excerpt,
  content: values.content,
  status: values.status,
});

export const toEditorValues = (post: PostApiRecord): PostEditorValues => ({
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content,
  status: post.status,
});

export const formatPostDate = (value: string | null) => {
  if (!value) {
    return "Ainda não publicado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

export const getPostErrorMessage = (error: unknown) =>
  error instanceof Error
    ? error.message
    : "Não foi possível concluir a operação editorial.";

export async function requestPostsApi<T>(
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
        : "Não foi possível concluir a operação editorial.",
    );
  }

  return body as T;
}

export const fetchAdminPosts = () =>
  requestPostsApi<PostApiRecord[]>(routeCatalog.apiPosts);

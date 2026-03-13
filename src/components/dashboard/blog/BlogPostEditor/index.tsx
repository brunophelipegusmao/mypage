"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/Card";
import {
  createSlugSuggestion,
  emptyPostEditorValues,
  formatPostDate,
  getPostErrorMessage,
  requestPostsApi,
  toEditorValues,
  toPostPayload,
} from "@/components/dashboard/blog/post-client";
import PostStatusBadge from "@/components/dashboard/blog/PostStatusBadge";
import { Input, Label, Textarea } from "@/components/Input";
import { routeCatalog } from "@/lib/navigation/app-routes";
import type { PostApiRecord, PostEditorValues, PostStatus } from "@/types/post";

type BlogPostEditorProps = {
  initialPost?: PostApiRecord;
};

export default function BlogPostEditor({ initialPost }: BlogPostEditorProps) {
  const router = useRouter();
  const [post, setPost] = useState<PostApiRecord | null>(initialPost ?? null);
  const [values, setValues] = useState<PostEditorValues>(
    initialPost ? toEditorValues(initialPost) : emptyPostEditorValues,
  );
  const [hasManualSlug, setHasManualSlug] = useState(Boolean(initialPost));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isEditing = Boolean(post);

  const handleFieldChange = (field: keyof PostEditorValues, value: string) => {
    setSuccessMessage(null);

    setValues((current) => {
      const nextValues = {
        ...current,
        [field]: value,
      };

      if (field === "title" && !hasManualSlug) {
        nextValues.slug = createSlugSuggestion(value);
      }

      return nextValues;
    });
  };

  const regenerateSlug = () => {
    setHasManualSlug(false);
    setValues((current) => ({
      ...current,
      slug: createSlugSuggestion(current.title),
    }));
  };

  const savePost = async (targetStatus?: PostStatus) => {
    const nextValues = {
      ...values,
      status: targetStatus ?? values.status,
    };
    const currentPost = post;

    setIsSubmitting(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      const savedPost = await requestPostsApi<PostApiRecord>(
        isEditing && currentPost
          ? routeCatalog.apiPost(currentPost.id)
          : routeCatalog.apiPosts,
        {
          method: isEditing ? "PATCH" : "POST",
          body: JSON.stringify(toPostPayload(nextValues)),
        },
      );

      setPost(savedPost);
      setValues(toEditorValues(savedPost));
      setHasManualSlug(true);
      setSuccessMessage(
        savedPost.status === "published"
          ? "Post publicado com sucesso."
          : "Rascunho salvo com sucesso.",
      );

      if (!isEditing || (currentPost && savedPost.slug !== currentPost.slug)) {
        router.replace(routeCatalog.dashboardEditBlogPost(savedPost.slug));
      }

      router.refresh();
    } catch (error) {
      setFormError(getPostErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePost = async () => {
    if (!post) {
      return;
    }

    setIsDeleting(true);
    setFormError(null);

    try {
      await requestPostsApi<{ success: true }>(routeCatalog.apiPost(post.id), {
        method: "DELETE",
      });

      router.replace(routeCatalog.dashboardBlog);
      router.refresh();
    } catch (error) {
      setFormError(getPostErrorMessage(error));
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <p className="text-primary text-xs tracking-[0.18em] uppercase">
          {isEditing ? "Dashboard / Blog / Edição" : "Dashboard / Blog / Novo"}
        </p>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {isEditing ? values.title || "Editar post" : "Novo post"}
            </h1>
            <PostStatusBadge status={values.status} />
          </div>
          <p className="max-w-3xl text-sm leading-6 text-foreground/70 md:text-base">
            Editor simples para markdown persistido no banco. Rascunhos seguem
            privados; publicar libera o post para a leitura pública.
          </p>
        </div>
      </header>

      {formError ? (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {formError}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          {successMessage}
        </div>
      ) : null}

      <Card hover={false}>
        <CardHeader>
          <CardTitle hover={false}>Metadados editoriais</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div>
              <Label htmlFor="post-title" required>
                Título
              </Label>
              <Input
                id="post-title"
                value={values.title}
                onChange={(event) => handleFieldChange("title", event.target.value)}
                placeholder="Ex.: como estou organizando meu dashboard pessoal"
                disabled={isSubmitting || isDeleting}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <Label htmlFor="post-slug">Slug</Label>
                <button
                  type="button"
                  className="text-primary text-xs font-medium"
                  onClick={regenerateSlug}
                  disabled={isSubmitting || isDeleting}
                >
                  Gerar do título
                </button>
              </div>
              <Input
                id="post-slug"
                value={values.slug}
                onChange={(event) => {
                  setHasManualSlug(true);
                  handleFieldChange("slug", event.target.value);
                }}
                placeholder="slug-do-post"
                disabled={isSubmitting || isDeleting}
              />
            </div>

            <div>
              <Label htmlFor="post-excerpt">Resumo</Label>
              <Textarea
                id="post-excerpt"
                rows={4}
                value={values.excerpt}
                onChange={(event) =>
                  handleFieldChange("excerpt", event.target.value)
                }
                placeholder="Resumo curto para listagem, SEO e compartilhamento."
                disabled={isSubmitting || isDeleting}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="post-status">Status editorial</Label>
              <select
                id="post-status"
                value={values.status}
                onChange={(event) =>
                  handleFieldChange("status", event.target.value as PostStatus)
                }
                className="focus:ring-primary hover:border-primary/40 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-foreground transition-colors focus:border-primary/35 focus:ring-2 focus:outline-none"
                disabled={isSubmitting || isDeleting}
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 text-sm text-foreground/65">
              <div className="space-y-2">
                <p>
                  <span className="text-foreground font-medium">URL pública:</span>{" "}
                  /blog/{createSlugSuggestion(values.slug || values.title) || "slug-do-post"}
                </p>
                <p>
                  <span className="text-foreground font-medium">
                    Publicado em:
                  </span>{" "}
                  {formatPostDate(post?.publishedAt ?? null)}
                </p>
                {post ? (
                  <p>
                    <span className="text-foreground font-medium">
                      Atualizado em:
                    </span>{" "}
                    {formatPostDate(post.updatedAt)}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 text-sm leading-6 text-foreground/65">
              Markdown em texto puro no banco. Nada de editor rico nesta fase.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card hover={false}>
        <CardHeader>
          <CardTitle hover={false}>Conteúdo</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <Label htmlFor="post-content">Markdown</Label>
            <Textarea
              id="post-content"
              rows={18}
              value={values.content}
              onChange={(event) => handleFieldChange("content", event.target.value)}
              placeholder="# Título\n\nEscreva o post em markdown puro."
              disabled={isSubmitting || isDeleting}
              className="min-h-[420px] font-mono text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              size="sm"
              className="inline-flex items-center gap-2"
              onClick={() => void savePost()}
              disabled={isSubmitting || isDeleting}
            >
              {isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : null}
              {isEditing ? "Salvar alterações" : "Criar post"}
            </Button>

            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => void savePost("draft")}
              disabled={isSubmitting || isDeleting}
            >
              Salvar como rascunho
            </Button>

            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() =>
                void savePost(values.status === "published" ? "draft" : "published")
              }
              disabled={isSubmitting || isDeleting}
            >
              {values.status === "published" ? "Despublicar" : "Publicar agora"}
            </Button>

            {post ? (
              <Button
                type="button"
                size="sm"
                variant="muted"
                className="inline-flex items-center gap-2"
                onClick={() => void deletePost()}
                disabled={isSubmitting || isDeleting}
              >
                {isDeleting ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Excluir
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

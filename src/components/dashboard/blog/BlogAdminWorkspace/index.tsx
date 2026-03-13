"use client";

import { LoaderCircle, PencilLine, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/Card";
import {
  fetchAdminPosts,
  formatPostDate,
  getPostErrorMessage,
  requestPostsApi,
  toPostPayload,
} from "@/components/dashboard/blog/post-client";
import PostStatusBadge from "@/components/dashboard/blog/PostStatusBadge";
import { routeCatalog } from "@/lib/navigation/app-routes";
import type { PostApiRecord, PostStatus } from "@/types/post";

type LoadState = "loading" | "ready" | "error";

export default function BlogAdminWorkspace() {
  const [posts, setPosts] = useState<PostApiRecord[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoadState("loading");
    setLoadError(null);

    try {
      const data = await fetchAdminPosts();
      setPosts(data);
      setLoadState("ready");
    } catch (error) {
      setLoadError(getPostErrorMessage(error));
      setLoadState("error");
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const handleStatusChange = async (
    post: PostApiRecord,
    nextStatus: PostStatus,
  ) => {
    setActivePostId(post.id);
    setMutationError(null);

    try {
      const updatedPost = await requestPostsApi<PostApiRecord>(
        routeCatalog.apiPost(post.id),
        {
          method: "PATCH",
          body: JSON.stringify({
            ...toPostPayload(post),
            status: nextStatus,
          }),
        },
      );

      setPosts((current) =>
        current.map((item) => (item.id === updatedPost.id ? updatedPost : item)),
      );
    } catch (error) {
      setMutationError(getPostErrorMessage(error));
    } finally {
      setActivePostId(null);
    }
  };

  const handleDeletePost = async (postId: string) => {
    setActivePostId(postId);
    setMutationError(null);

    try {
      await requestPostsApi<{ success: true }>(routeCatalog.apiPost(postId), {
        method: "DELETE",
      });

      setPosts((current) => current.filter((post) => post.id !== postId));
    } catch (error) {
      setMutationError(getPostErrorMessage(error));
    } finally {
      setActivePostId(null);
    }
  };

  const draftCount = posts.filter((post) => post.status === "draft").length;
  const publishedCount = posts.length - draftCount;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Total",
            value: posts.length,
            description: "Base editorial persistida no banco.",
          },
          {
            label: "Rascunhos",
            value: draftCount,
            description: "Itens privados fora da leitura pública.",
          },
          {
            label: "Publicados",
            value: publishedCount,
            description: "Posts liberados para o blog público.",
          },
        ].map((item) => (
          <Card key={item.label} hover={false}>
            <CardHeader className="mb-0">
              <p className="text-xs tracking-[0.18em] uppercase text-foreground/55">
                {item.label}
              </p>
              <CardTitle className="mt-3 text-3xl" hover={false}>
                {item.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">{item.description}</CardContent>
          </Card>
        ))}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-primary text-xs tracking-[0.16em] uppercase">
            Blog admin
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Posts do dashboard</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="inline-flex items-center gap-2"
            onClick={() => void loadPosts()}
            disabled={loadState === "loading"}
          >
            {loadState === "loading" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Recarregar
          </Button>

          <Button
            href={routeCatalog.dashboardNewBlogPost}
            size="sm"
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo post
          </Button>
        </div>
      </div>

      {mutationError ? (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {mutationError}
        </div>
      ) : null}

      {loadState === "loading" ? (
        <Card hover={false}>
          <CardContent className="flex min-h-48 flex-col items-center justify-center gap-3 py-12 text-center">
            <LoaderCircle className="text-primary h-8 w-8 animate-spin" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">Carregando posts</p>
              <p className="text-sm text-foreground/60">
                Lendo a camada editorial privada no banco.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {loadState === "error" && loadError ? (
        <Card hover={false}>
          <CardContent className="space-y-4 py-10 text-center">
            <div className="space-y-1">
              <p className="text-lg font-medium text-foreground">
                Não foi possível carregar os posts
              </p>
              <p className="text-sm text-foreground/60">{loadError}</p>
            </div>
            <div className="flex justify-center">
              <Button
                type="button"
                size="sm"
                className="inline-flex items-center gap-2"
                onClick={() => void loadPosts()}
              >
                <RefreshCw className="h-4 w-4" />
                Tentar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {loadState === "ready" && posts.length === 0 ? (
        <Card hover={false}>
          <CardContent className="space-y-4 py-12 text-center">
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                Nenhum post cadastrado ainda
              </p>
              <p className="mx-auto max-w-xl text-sm leading-6 text-foreground/60">
                A camada editorial já está pronta para rascunho, publicação e
                exclusão. Crie o primeiro post para abrir o fluxo privado.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {loadState === "ready" && posts.length > 0 ? (
        <div className="grid gap-4">
          {posts.map((post) => {
            const isMutating = activePostId === post.id;

            return (
              <Card key={post.id} hover={false}>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-foreground">
                          {post.title}
                        </h3>
                        <PostStatusBadge status={post.status} />
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-foreground/55">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          /blog/{post.slug}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Publicado: {formatPostDate(post.publishedAt)}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Atualizado: {formatPostDate(post.updatedAt)}
                        </span>
                      </div>

                      <p className="max-w-3xl text-sm leading-6 text-foreground/68">
                        {post.excerpt || "Sem resumo ainda. O post segue privado até publicação."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={routeCatalog.dashboardEditBlogPost(post.slug)}
                        size="sm"
                        variant="secondary"
                        className="inline-flex items-center gap-2"
                      >
                        <PencilLine className="h-4 w-4" />
                        Editar
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant="muted"
                        className="inline-flex items-center gap-2"
                        onClick={() =>
                          void handleStatusChange(
                            post,
                            post.status === "published" ? "draft" : "published",
                          )
                        }
                        disabled={isMutating}
                      >
                        {isMutating ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : null}
                        {post.status === "published" ? "Despublicar" : "Publicar"}
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant="muted"
                        className="inline-flex items-center gap-2"
                        onClick={() => void handleDeletePost(post.id)}
                        disabled={isMutating}
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4 text-sm leading-6 text-foreground/58">
                    {post.content ? (
                      <p className="line-clamp-3 whitespace-pre-wrap break-words">
                        {post.content}
                      </p>
                    ) : (
                      <p>Conteúdo ainda não preenchido.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

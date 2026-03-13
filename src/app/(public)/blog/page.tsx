import type { Metadata } from "next";
import Link from "next/link";

import Card, { CardContent, CardHeader, CardTitle } from "@/components/Card";
import { routeCatalog } from "@/lib/navigation/app-routes";
import { buildAbsoluteUrl } from "@/lib/site-metadata";
import { publicPostFeedService } from "@/services/posts/public-post-feed";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos públicos publicados a partir do banco, com leitura aberta e administração separada no dashboard privado.",
  alternates: {
    canonical: "/blog",
  },
  keywords: ["blog", "artigos", "engenharia de produto", "next.js"],
  openGraph: {
    title: "Blog | Bruno Mulim",
    description:
      "Leitura pública dos posts publicados vindos do banco.",
    url: buildAbsoluteUrl("/blog"),
  },
};

const formatPublishedDate = (date: Date | null) =>
  date
    ? new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "medium",
      }).format(date)
    : "Sem data de publicação";

export default async function BlogIndexPage() {
  const posts = await publicPostFeedService.listPublishedPosts();

  return (
    <main className="bg-background text-foreground px-4 py-10 md:py-14">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="max-w-3xl space-y-4">
          <p className="text-primary text-xs tracking-[0.18em] uppercase">
            Blog público
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Posts publicados
            </h1>
            <p className="text-sm leading-6 text-foreground/70 md:text-base">
              Leitura pública ligada ao banco, exibindo apenas conteúdos com
              status <code>published</code>.
            </p>
          </div>
        </header>

        {posts.length === 0 ? (
          <Card hover={false}>
            <CardContent className="py-12 text-center text-sm text-foreground/60">
              Ainda não há posts publicados.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5">
            {posts.map((post) => (
              <Card key={post.id} hover={false}>
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                      Publicado
                    </span>
                    <span className="text-xs text-foreground/55">
                      {formatPublishedDate(post.publishedAt)}
                    </span>
                  </div>
                  <CardTitle hover={false}>
                    <Link
                      href={routeCatalog.blogPost(post.slug)}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-foreground/72">
                    {post.excerpt}
                  </p>
                  <div>
                    <Link
                      href={routeCatalog.blogPost(post.slug)}
                      className="text-primary text-sm font-medium"
                    >
                      Ler post
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

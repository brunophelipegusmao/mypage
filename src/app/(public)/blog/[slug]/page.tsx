import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MarkdownContent from "@/components/blog/MarkdownContent";
import { buildAbsoluteUrl } from "@/lib/site-metadata";
import { publicPostFeedService } from "@/services/posts/public-post-feed";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await publicPostFeedService.getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.title, post.slug, "blog", "artigo"],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: buildAbsoluteUrl(`/blog/${post.slug}`),
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

const formatPublishedDate = (date: Date | null) =>
  date
    ? new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "long",
      }).format(date)
    : "Sem data de publicação";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await publicPostFeedService.getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Person",
      name: "Bruno Mulim",
    },
  };

  return (
    <main className="bg-background text-foreground px-4 py-10 md:py-14">
      <article className="mx-auto max-w-3xl space-y-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
        <header className="space-y-4">
          <p className="text-primary text-xs tracking-[0.18em] uppercase">
            Post público
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="text-sm leading-6 text-foreground/70 md:text-base">
              {post.excerpt}
            </p>
          </div>
          <div className="text-sm text-foreground/55">
            Publicado em {formatPublishedDate(post.publishedAt)}
          </div>
        </header>

        <div className="rounded-3xl border border-white/10 bg-card/40 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)] md:p-8">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </main>
  );
}

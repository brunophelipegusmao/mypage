import { notFound } from "next/navigation";

import BlogPostEditor from "@/components/dashboard/blog/BlogPostEditor";
import { requireOwnerIdentity } from "@/lib/auth/owner-session";
import { postAdminService } from "@/services/posts/post-admin-service";
import type { PostApiRecord, PostRecord } from "@/types/post";

type DashboardBlogEditorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const toPostApiRecord = (post: PostRecord): PostApiRecord => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content,
  status: post.status,
  publishedAt: post.publishedAt?.toISOString() ?? null,
  authorId: post.authorId,
  createdAt: post.createdAt.toISOString(),
  updatedAt: post.updatedAt.toISOString(),
});

export default async function DashboardBlogEditorPage({
  params,
}: DashboardBlogEditorPageProps) {
  const { slug } = await params;
  const owner = await requireOwnerIdentity();
  const post = await postAdminService.getPostBySlug(owner.id, slug);

  if (!post) {
    notFound();
  }

  return <BlogPostEditor initialPost={toPostApiRecord(post)} />;
}

import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { PostValidationError } from "@/services/posts/post-errors";
import { parseCanonicalPostSlugParam } from "@/services/posts/post-validation";
import type { PublicPostFeedService } from "@/services/posts/public-post-feed.contract";
import type { PostRecord, PublicPostListItem } from "@/types/post";

const serializePostRecord = (post: typeof posts.$inferSelect): PostRecord => ({
  ...post,
});

export const publicPostFeedService: PublicPostFeedService = {
  async listPublishedPosts() {
    const records = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        publishedAt: posts.publishedAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt), desc(posts.createdAt));

    return records as PublicPostListItem[];
  },
  async getPublishedPostBySlug(slug) {
    let normalizedSlug: string;

    try {
      normalizedSlug = parseCanonicalPostSlugParam(slug);
    } catch (error) {
      if (error instanceof PostValidationError) {
        return null;
      }

      throw error;
    }

    const [post] = await db
      .select()
      .from(posts)
      .where(
        and(eq(posts.slug, normalizedSlug), eq(posts.status, "published")),
      )
      .limit(1);

    return post ? serializePostRecord(post) : null;
  },
};

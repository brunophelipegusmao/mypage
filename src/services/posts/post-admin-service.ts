import "server-only";

import { and, desc, eq, ne } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schema";
import type { PostAdminService } from "@/services/posts/post-admin.contract";
import {
  PostNotFoundError,
  PostSlugConflictError,
  PostValidationError,
} from "@/services/posts/post-errors";
import {
  normalizePostSlug,
  parsePostSlugParam,
} from "@/services/posts/post-validation";
import type { PostEditorDraft, PostRecord } from "@/types/post";

const serializePostRecord = (post: typeof posts.$inferSelect): PostRecord => ({
  ...post,
});

const isPostgresUniqueViolation = (error: unknown): error is { code: string } =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "23505";

const ensurePostCanBePublished = (input: PostEditorDraft) => {
  if (input.status !== "published") {
    return;
  }

  if (!input.excerpt.trim()) {
    throw new PostValidationError(
      "Resumo é obrigatório para publicar o post.",
    );
  }

  if (!input.content.trim()) {
    throw new PostValidationError(
      "Conteúdo é obrigatório para publicar o post.",
    );
  }
};

const ensureUniqueSlug = async (slug: string, currentPostId?: string) => {
  const [existingPost] = await db
    .select({
      id: posts.id,
    })
    .from(posts)
    .where(
      currentPostId
        ? and(eq(posts.slug, slug), ne(posts.id, currentPostId))
        : eq(posts.slug, slug),
    )
    .limit(1);

  if (existingPost) {
    throw new PostSlugConflictError();
  }
};

const resolvePersistedPostInput = (
  input: PostEditorDraft,
  currentPost?: PostRecord,
) => {
  ensurePostCanBePublished(input);

  return {
    title: input.title,
    slug: normalizePostSlug(input.slug, input.title),
    excerpt: input.excerpt,
    content: input.content,
    status: input.status,
    publishedAt:
      input.status === "published"
        ? currentPost?.publishedAt ?? new Date()
        : null,
  };
};

const getPostByIdForAuthor = async (authorId: string, postId: string) => {
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.id, postId), eq(posts.authorId, authorId)))
    .limit(1);

  if (!post) {
    throw new PostNotFoundError();
  }

  return serializePostRecord(post);
};

export const postAdminService: PostAdminService = {
  async listAllPostsByAuthor(authorId) {
    const records = await db
      .select()
      .from(posts)
      .where(eq(posts.authorId, authorId))
      .orderBy(desc(posts.updatedAt));

    return records.map(serializePostRecord);
  },
  async getPostById(authorId, postId) {
    const [post] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.id, postId), eq(posts.authorId, authorId)))
      .limit(1);

    return post ? serializePostRecord(post) : null;
  },
  async getPostBySlug(authorId, slug) {
    const normalizedSlug = parsePostSlugParam(slug);

    const [post] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.authorId, authorId), eq(posts.slug, normalizedSlug)))
      .limit(1);

    return post ? serializePostRecord(post) : null;
  },
  async createPost(authorId, input) {
    const resolvedInput = resolvePersistedPostInput(input);
    await ensureUniqueSlug(resolvedInput.slug);

    try {
      const [createdPost] = await db
        .insert(posts)
        .values({
          authorId,
          title: resolvedInput.title,
          slug: resolvedInput.slug,
          excerpt: resolvedInput.excerpt,
          content: resolvedInput.content,
          status: resolvedInput.status,
          publishedAt: resolvedInput.publishedAt,
        })
        .returning();

      return serializePostRecord(createdPost);
    } catch (error) {
      if (isPostgresUniqueViolation(error)) {
        throw new PostSlugConflictError();
      }

      throw error;
    }
  },
  async updatePost(authorId, postId, input) {
    const currentPost = await getPostByIdForAuthor(authorId, postId);
    const resolvedInput = resolvePersistedPostInput(input, currentPost);
    await ensureUniqueSlug(resolvedInput.slug, currentPost.id);

    try {
      const [updatedPost] = await db
        .update(posts)
        .set({
          title: resolvedInput.title,
          slug: resolvedInput.slug,
          excerpt: resolvedInput.excerpt,
          content: resolvedInput.content,
          status: resolvedInput.status,
          publishedAt: resolvedInput.publishedAt,
          updatedAt: new Date(),
        })
        .where(and(eq(posts.id, currentPost.id), eq(posts.authorId, authorId)))
        .returning();

      if (!updatedPost) {
        throw new PostNotFoundError();
      }

      return serializePostRecord(updatedPost);
    } catch (error) {
      if (isPostgresUniqueViolation(error)) {
        throw new PostSlugConflictError();
      }

      throw error;
    }
  },
  async deletePost(authorId, postId) {
    const [deletedPost] = await db
      .delete(posts)
      .where(and(eq(posts.id, postId), eq(posts.authorId, authorId)))
      .returning({ id: posts.id });

    if (!deletedPost) {
      throw new PostNotFoundError();
    }
  },
};

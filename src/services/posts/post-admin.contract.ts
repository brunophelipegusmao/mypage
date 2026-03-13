import type { PostEditorDraft, PostRecord } from "@/types/post";

export interface PostAdminService {
  listAllPostsByAuthor(authorId: string): Promise<PostRecord[]>;
  getPostById(authorId: string, postId: string): Promise<PostRecord | null>;
  getPostBySlug(authorId: string, slug: string): Promise<PostRecord | null>;
  createPost(authorId: string, input: PostEditorDraft): Promise<PostRecord>;
  updatePost(
    authorId: string,
    postId: string,
    input: PostEditorDraft,
  ): Promise<PostRecord>;
  deletePost(authorId: string, postId: string): Promise<void>;
}

import type { PostRecord, PublicPostListItem } from "@/types/post";

export interface PublicPostFeedService {
  listPublishedPosts(): Promise<PublicPostListItem[]>;
  getPublishedPostBySlug(slug: string): Promise<PostRecord | null>;
}

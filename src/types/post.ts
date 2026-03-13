export type PostStatus = "draft" | "published";

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  publishedAt: Date | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicPostListItem {
  id: PostRecord["id"];
  title: PostRecord["title"];
  slug: PostRecord["slug"];
  excerpt: PostRecord["excerpt"];
  publishedAt: PostRecord["publishedAt"];
  updatedAt: PostRecord["updatedAt"];
}

export interface PostEditorDraft {
  title: PostRecord["title"];
  slug: PostRecord["slug"];
  excerpt: PostRecord["excerpt"];
  content: PostRecord["content"];
  status: PostRecord["status"];
}

export interface PostApiRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  publishedAt: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostEditorValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PostStatus;
}

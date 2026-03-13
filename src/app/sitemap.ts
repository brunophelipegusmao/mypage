import { MetadataRoute } from "next";

import {
  buildAbsoluteUrl,
  publicSitePaths,
  shouldIndexSite,
} from "@/lib/site-metadata";
import { publicPostFeedService } from "@/services/posts/public-post-feed";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!shouldIndexSite) {
    return [];
  }

  const priorities = new Map<string, number>([
    ["/", 1],
    ["/services", 0.85],
    ["/blog", 0.82],
    ["/portfolio", 0.8],
    ["/contact", 0.75],
  ]);

  const staticEntries = publicSitePaths.map((path) => ({
    url: buildAbsoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: priorities.get(path) ?? 0.7,
  }));

  let publishedPosts: Awaited<
    ReturnType<typeof publicPostFeedService.listPublishedPosts>
  > = [];

  try {
    publishedPosts = await publicPostFeedService.listPublishedPosts();
  } catch (error) {
    console.error("Unable to load published posts for sitemap:", error);
  }

  const postEntries = publishedPosts.map((post) => ({
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.76,
  }));

  return [...staticEntries, ...postEntries];
}

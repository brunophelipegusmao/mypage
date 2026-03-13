import type { Metadata } from "next";

import BlogPostEditor from "@/components/dashboard/blog/BlogPostEditor";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Novo post",
  description:
    "Rota reservada para criação privada de novos posts no blog admin.",
  alternates: {
    canonical: "/dashboard/blog/new",
  },
  openGraph: {
    title: "Novo post | Bruno Mulim",
    description:
      "Rota reservada para criação privada de novos posts no blog admin.",
    url: buildAbsoluteUrl("/dashboard/blog/new"),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewDashboardBlogPostPage() {
  return <BlogPostEditor />;
}

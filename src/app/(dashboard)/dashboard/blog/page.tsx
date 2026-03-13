import type { Metadata } from "next";

import BlogAdminWorkspace from "@/components/dashboard/blog/BlogAdminWorkspace";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Rota reservada para a administração privada do blog no dashboard.",
  alternates: {
    canonical: "/dashboard/blog",
  },
  openGraph: {
    title: "Blog | Bruno Mulim",
    description:
      "Rota reservada para a administração privada do blog no dashboard.",
    url: buildAbsoluteUrl("/dashboard/blog"),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardBlogPage() {
  return (
    <section className="space-y-8">
      <header className="max-w-3xl space-y-4">
        <p className="text-primary text-xs tracking-[0.18em] uppercase">
          Dashboard / Blog
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Administração privada do blog
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-foreground/70 md:text-base">
            Área editorial owner-only para criar, editar, publicar,
            despublicar e excluir posts persistidos no banco, sem CMS externo e
            sem expor rascunhos publicamente.
          </p>
        </div>
      </header>

      <BlogAdminWorkspace />
    </section>
  );
}

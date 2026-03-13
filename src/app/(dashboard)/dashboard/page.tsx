import type { Metadata } from "next";

import DashboardSectionCard from "@/components/dashboard/DashboardSectionCard";
import { routeCatalog } from "@/lib/navigation/app-routes";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Visão geral da área privada reservada para o proprietário autenticado.",
  alternates: {
    canonical: "/dashboard",
  },
  openGraph: {
    title: "Dashboard | Bruno Mulim",
    description: "Área privada reservada para o proprietário.",
    url: buildAbsoluteUrl("/dashboard"),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-8">
      <div className="rounded-3xl border border-white/10 bg-card/45 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.24)] md:p-8">
        <p className="text-primary text-xs tracking-[0.18em] uppercase">
          Dashboard privado
        </p>
        <h1 className="mt-3 text-3xl font-bold text-balance md:text-4xl">
          Base autenticada para uso pessoal
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">
          O dashboard já está ancorado em <code>/dashboard</code>, protegido no
          servidor e separado do site público. A área privada ficou organizada
          em dois fluxos centrais: to-do pessoal e administração do blog.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Owner-only", "JWT", "Credentials", "Sem exposição pública"].map(
            (tag) => (
              <span key={tag} className="tech-chip">
                {tag}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardSectionCard
          eyebrow="Tarefas"
          title="To-do pessoal"
          description="Espaço privado para organizar tarefas do proprietário sem misturar fluxo editorial e operacional."
          href={routeCatalog.dashboardTodo}
          cta="Abrir to-do"
          bullets={[
            "Base pronta para listagem e mutações autenticadas.",
            "Escopo restrito ao proprietário autenticado.",
            "Sem cache público em dados privados.",
          ]}
        />

        <DashboardSectionCard
          eyebrow="Blog"
          title="Administração editorial"
          description="Área reservada para gerir o blog público a partir do banco, sem CMS externo e sem arquivo local como fonte principal."
          href={routeCatalog.dashboardBlog}
          cta="Abrir blog admin"
          bullets={[
            "Rascunhos permanecem privados.",
            "Estrutura pronta para criação, edição e publicação.",
            "Base alinhada com posts persistidos no banco.",
          ]}
        />
      </div>
    </section>
  );
}

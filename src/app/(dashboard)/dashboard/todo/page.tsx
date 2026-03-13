import type { Metadata } from "next";

import TodoWorkspace from "@/components/dashboard/todo/TodoWorkspace";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "To-do",
  description: "Dashboard privado para gerenciamento pessoal de tarefas.",
  alternates: {
    canonical: "/dashboard/todo",
  },
  openGraph: {
    title: "To-do | Bruno Mulim",
    description: "Dashboard privado para gerenciamento pessoal de tarefas.",
    url: buildAbsoluteUrl("/dashboard/todo"),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardTodoPage() {
  return (
    <section className="space-y-8">
      <header className="max-w-3xl space-y-4">
        <p className="text-primary text-xs tracking-[0.18em] uppercase">
          Dashboard / To-do
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Tarefas privadas do proprietário
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-foreground/70 md:text-base">
            O fluxo do to-do agora roda em cima do banco real, com rotas
            server-side internas do Next e vínculo obrigatório com a sessão do
            proprietário autenticado.
          </p>
        </div>
      </header>

      <TodoWorkspace />
    </section>
  );
}

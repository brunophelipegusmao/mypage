import type { Metadata } from "next";
import Link from "next/link";

import SwaggerApiReference from "@/components/docs/SwaggerApiReference";
import { routeCatalog } from "@/lib/navigation/app-routes";
import { openApiSurfaceAreas } from "@/lib/openapi/openapi-contract";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "API Docs",
  description:
    "Documentação OpenAPI real da API interna do projeto, incluindo sessão, tasks, posts e healthcheck.",
  alternates: {
    canonical: routeCatalog.docs,
  },
  openGraph: {
    title: "API Docs | Bruno Mulim",
    description:
      "Swagger UI pública conectada ao contrato OpenAPI real da aplicação.",
    url: buildAbsoluteUrl(routeCatalog.docs),
  },
};

export default function DocsPage() {
  return (
    <main className="bg-background text-foreground px-4 py-10 md:py-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-[28px] border border-white/10 bg-card/45 p-6">
            <div className="space-y-3">
              <p className="text-primary text-xs tracking-[0.2em] uppercase">
                OpenAPI
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                Contrato e UI servidos pelo próprio app
              </h1>
              <p className="text-sm leading-6 text-foreground/72">
                Esta documentação reflete apenas endpoints reais do projeto.
                Sessão usa o endpoint concreto do Auth.js em
                {" "}
                <code>/api/auth/session</code>
                {" "}
                e os domínios privados seguem protegidos por sessão owner-only.
              </p>
            </div>

            <div className="space-y-3 text-sm text-foreground/72">
              {openApiSurfaceAreas.map((surface) => (
                <article
                  key={surface.tag}
                  className="rounded-2xl border border-white/10 bg-background/45 p-4"
                >
                  <p className="text-primary text-xs tracking-[0.14em] uppercase">
                    {surface.tag}
                  </p>
                  <p className="mt-2 leading-6">{surface.summary}</p>
                  <p className="mt-2 text-xs text-foreground/55">
                    Rota pública:
                    {" "}
                    {surface.publicRoute}
                  </p>
                  <p className="text-xs text-foreground/55">
                    API:
                    {" "}
                    {surface.apiRoute}
                  </p>
                </article>
              ))}
            </div>

            <Link
              href={routeCatalog.openApiSpec}
              className="inline-flex rounded-xl border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
            >
              Abrir spec JSON
            </Link>
          </aside>

          <SwaggerApiReference />
        </section>
      </div>
    </main>
  );
}

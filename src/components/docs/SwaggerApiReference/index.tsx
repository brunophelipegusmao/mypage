"use client";

import dynamic from "next/dynamic";

import { routeCatalog } from "@/lib/navigation/app-routes";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl border border-white/10 bg-card/55 p-6 text-sm text-foreground/70">
      Carregando a referência interativa da API...
    </div>
  ),
});

export default function SwaggerApiReference() {
  return (
    <div className="swagger-shell overflow-hidden rounded-[28px] border border-white/10 bg-white">
      <SwaggerUI
        url={routeCatalog.openApiSpec}
        deepLinking
        defaultModelsExpandDepth={1}
        displayRequestDuration
        docExpansion="list"
      />
    </div>
  );
}

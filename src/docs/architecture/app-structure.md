# Estrutura do App Router

- `(public)`: site institucional, blog público e rota `/docs`.
- `(auth)`: entrada exclusiva do proprietário.
- `(dashboard)`: área privada servida em `/dashboard`.
- `api/`: rota interna reservada para handlers do próprio Next.js.
- `src/db`: camada única de banco com env, client, schema e migrations.

## Regras

- `/dashboard` é URL pública privada; `app` é apenas convenção técnica.
- Blog público lê posts do banco e só expõe `published`.
- Administração do blog e to-do vivem dentro do dashboard.
- OpenAPI e Swagger UI continuam no mesmo app.
- `Neon + Drizzle` sustentam `users`, `tasks` e `posts`.
- Não existe `service worker` ativo nem `manifest.webmanifest` exposto nesta fase.
- Superfícies privadas e rotas sensíveis usam política explícita de `no-store`.

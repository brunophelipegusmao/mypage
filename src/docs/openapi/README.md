# OpenAPI e Swagger

## Rotas públicas de documentação

- Spec JSON: `/api/openapi.json`
- Swagger UI: `/docs`

## Regra operacional

- O contrato OpenAPI só documenta endpoints reais.
- A UI Swagger consome o spec servido pelo próprio app.
- Toda mudança em handler deve atualizar o contrato no mesmo ciclo.

## Cobertura atual

- Auth/session:
  - `GET /api/auth/session`
- Health:
  - `GET /api/health`
- Contact:
  - `POST /api/contact`
- Tasks:
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `PATCH /api/tasks/{taskId}`
  - `DELETE /api/tasks/{taskId}`
- Posts:
  - `GET /api/posts`
  - `POST /api/posts`
  - `GET /api/posts/{postId}`
  - `PATCH /api/posts/{postId}`
  - `DELETE /api/posts/{postId}`

## Padronização atual

- Endpoints privados de tasks e posts usam envelope de erro consistente:
  - `{ error: string, issues?: string[] }`
- Exclusões retornam:
  - `{ success: true }`
- O endpoint de sessão documenta o comportamento real do Auth.js:
  - `session` autenticada ou `null`
- O healthcheck é um liveness check simples:
  - `{ status: "ok", timestamp: string }`

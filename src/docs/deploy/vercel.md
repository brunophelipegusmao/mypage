# Deploy na Vercel

## Modelo operacional

- Um único projeto `Next.js` full-stack.
- `Neon` como banco principal.
- `Auth.js Credentials` com sessão `JWT`.
- Dashboard privado owner-only em `/dashboard`.
- Blog público lendo posts publicados do banco.
- Documentação ativa em `/docs` e `/api/openapi.json`.

## Variáveis customizadas obrigatórias

- `NEXT_PUBLIC_SITE_URL`
  - Use `http://localhost:3000` em desenvolvimento local.
  - Em produção, use a origem canônica pública final.
  - Em preview na Vercel, pode ficar igual à origem de produção para manter canonical estável.
- `DATABASE_URL`
  - URL pooled do Neon para runtime.
- `DATABASE_URL_DIRECT`
  - URL direta do Neon para migrations e bootstrap controlado.
- `AUTH_SECRET`
  - Segredo longo e aleatório do Auth.js.
- `RESEND_API_KEY`
  - Chave da API do Resend usada apenas pelo fluxo público de contato.
- `CONTACT_FROM_EMAIL`
  - Remetente verificado no Resend para o formulário público.
- `CONTACT_TO_EMAIL`
  - Destinatário final das mensagens do formulário público.

## Variáveis de bootstrap controlado do administrador

- `ADMIN_EMAIL`
  - Email do único administrador.
- `ADMIN_PASSWORD`
  - Senha inicial longa e forte, usada no bootstrap.
- `ADMIN_NAME`
  - Nome opcional do administrador.

Observação:

- `ADMIN_*` não é necessário para o runtime normal depois do bootstrap;
- mantenha esses valores apenas no momento de criar ou rotacionar o admin;
- o projeto não tem cadastro público nem recuperação de senha nesta fase.

## Variáveis de sistema da Vercel usadas pela aplicação

- `VERCEL`
- `VERCEL_ENV`
- `VERCEL_URL`
- `VERCEL_BRANCH_URL`
- `VERCEL_PROJECT_PRODUCTION_URL`

Observação:

- habilite a exposição de System Environment Variables na Vercel;
- a aplicação usa `VERCEL_PROJECT_PRODUCTION_URL` para estabilizar canonical quando `NEXT_PUBLIC_SITE_URL` não estiver setada;
- a aplicação usa `VERCEL_BRANCH_URL` ou `VERCEL_URL` para reconhecer a origem efetiva do deploy.

## Neon

- `DATABASE_URL` deve apontar para a connection pooled.
- `DATABASE_URL_DIRECT` deve apontar para a connection direta.
- O app em runtime usa `DATABASE_URL`.
- O Drizzle tooling usa `DATABASE_URL_DIRECT`, com fallback para `DATABASE_URL`.
- Antes do primeiro deploy útil em preview/production, rode as migrations no banco alvo.

## Bootstrap do administrador

1. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD` e opcionalmente `ADMIN_NAME`.
2. Aponte `DATABASE_URL_DIRECT` para o banco alvo.
3. Rode:

```bash
npm run admin:bootstrap
```

O comando cria ou atualiza o único administrador autorizado a entrar no dashboard.
Se houver apenas um usuário legado no banco e nenhum admin marcado, esse usuário é promovido para preservar ownership de `posts` e `tasks`.

## SEO e indexação

- A origem canônica é derivada de `NEXT_PUBLIC_SITE_URL` e, na falta dela, de `VERCEL_PROJECT_PRODUCTION_URL`.
- Deploys preview ficam `noindex` automaticamente.
- `robots.ts` bloqueia preview e `sitemap.ts` não emite sitemap em preview.
- `/dashboard` e páginas privadas seguem `noindex`.

## Checklist de publicação

1. Criar o projeto na Vercel e conectar o repositório.
2. Habilitar System Environment Variables.
3. Configurar `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `DATABASE_URL_DIRECT`, `AUTH_SECRET`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` e `CONTACT_TO_EMAIL` em Development, Preview e Production.
4. Aplicar `npm run db:migrate` no banco alvo antes do primeiro deploy funcional.
5. Rodar `npm run admin:bootstrap` contra o banco alvo para criar o administrador único.
6. Validar `npm run build` localmente com envs equivalentes.
7. Publicar um preview e verificar:
   - `/login`
   - `/dashboard`
   - `/blog`
   - `/docs`
   - `/api/openapi.json`
8. Publicar em production e verificar:
   - login e senha do administrador;
   - listagem pública do blog;
   - CRUD privado de tasks;
   - CRUD privado de posts;
   - `/docs` e `/api/openapi.json`;
   - `robots.txt` e `sitemap.xml`.

## Estado atual da base

- build pronto para Vercel;
- docs OpenAPI e Swagger funcionando;
- dashboard protegido no servidor;
- APIs privadas com `no-store`;
- PWA desabilitada nesta fase para não conflitar com auth e dados privados.

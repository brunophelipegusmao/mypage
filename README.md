# Bruno Mulim

Base em `Next.js` App Router para um site pessoal e profissional que evolui no mesmo app para blog público, autenticação do proprietário, dashboard privado e dados persistidos em banco.

## Estado atual

- Site institucional com páginas públicas de apresentação, serviços, portfólio e contato.
- Estrutura de route groups separando público, auth e dashboard.
- Tema claro/escuro com `ThemeContext`.
- SEO técnico básico centralizado no App Router.
- Contato público com envio server-side via `Resend`, isolado de auth e dashboard.
- Camada de banco preparada com `Neon Postgres + Drizzle ORM`.
- Autenticação real com `Auth.js Credentials` e sessão `JWT` owner-only.

## Direção do projeto

As decisões estruturais estão fixadas em [AGENTS.md](./AGENTS.md). Em resumo:

- arquitetura apenas em `Next.js` full-stack;
- sem serviços paralelos nem runtime separado nesta fase;
- dashboard futuro em `/dashboard`;
- blog público com posts persistidos no banco;
- autenticação própria com login e senha apenas para o proprietário;
- `Neon + Drizzle` como camada de dados do próprio app;
- deploy único na Vercel.

## Stack atual

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Framer Motion`
- `Lucide React`
- `Neon Postgres`
- `Drizzle ORM`
- `Auth.js`

## Estrutura principal

```text
src/
  app/
    layout.tsx
    (public)/
    (auth)/
    (dashboard)/
    api/
    robots.ts
    sitemap.ts
  db/
  components/
  contexts/
  lib/
  services/
  types/
public/
```

## Execução local

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run admin:bootstrap
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_SITE_URL`: origem canônica pública usada por metadata e canonical.
- `DATABASE_URL`: conexão pooled do Neon para runtime do app.
- `DATABASE_URL_DIRECT`: conexão direta do Neon para migrations e tooling do Drizzle.
- `AUTH_SECRET`: segredo usado para criptografar JWTs e cookies do Auth.js.
- `RESEND_API_KEY`: chave da API do Resend usada apenas no fluxo público de contato.
- `CONTACT_FROM_EMAIL`: remetente verificado no Resend para o email do contato.
- `CONTACT_TO_EMAIL`: destinatário final das mensagens do formulário público.
- `ADMIN_EMAIL`: email do administrador usado no bootstrap controlado.
- `ADMIN_PASSWORD`: senha inicial do administrador usada no bootstrap controlado.
- `ADMIN_NAME`: nome opcional do administrador usado no bootstrap controlado.

Na Vercel, a app também consome System Environment Variables quando expostas:

- `VERCEL`
- `VERCEL_ENV`
- `VERCEL_URL`
- `VERCEL_BRANCH_URL`
- `VERCEL_PROJECT_PRODUCTION_URL`

Bootstrap inicial do administrador:

```bash
npm run admin:bootstrap
```

O comando usa `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `ADMIN_NAME` para criar ou atualizar o único administrador autorizado a entrar no dashboard.
Se o banco vier de uma fase anterior e ainda tiver apenas um usuário legado sem admin configurado, o bootstrap promove esse usuário existente para preservar o vínculo de `posts` e `tasks`.

## SEO e metadata

As fontes principais de metadata técnica estão no App Router:

- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/lib/site-metadata.ts`

O manifest de PWA está desabilitado nesta fase para não misturar superfície pública com dashboard, auth e dados privados.

Não mantenha versões paralelas desses artefatos em `public/`.

Deploy operacional: [src/docs/deploy/vercel.md](./src/docs/deploy/vercel.md)

## Contato

- O formulário público envia no servidor por `POST /api/contact`.
- O handler usa `Resend` apenas para entrega do email do contato.
- O fluxo de contato não participa de auth, dashboard, blog admin ou to-do.
- Email: `bruno.mulim.prog@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/bruno-mulim/`
- GitHub: `https://github.com/brunophelipegusmao`

## Banco e dados

- Schema inicial mínimo com `users`, `tasks` e `posts`.
- `posts.content` é armazenado como markdown em texto no banco.
- Não existe `sessions` table nesta fase.

## Autenticação

- Login e senha existem apenas para o proprietário.
- O dashboard em `/dashboard` lê a sessão no servidor.
- Não existe cadastro público.
- O administrador inicial é criado por bootstrap controlado com `npm run admin:bootstrap`.

## Próximas etapas previstas

- validar o fluxo completo com credenciais reais do Neon e do administrador;
- endurecer observabilidade e readiness antes do deploy final;
- adicionar cobertura automatizada para auth, tasks e posts;
- publicar o ambiente final na Vercel com bootstrap controlado do admin.

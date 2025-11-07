# Corelayer — Pacote de Assets & Deploy

Este pacote contém logos (escuro/claro), favicons (escuro/claro), imagem Open Graph e um guia rápido de publicação na Vercel.

## Arquivos

- `corelayer-logo-dark.svg` — para fundos claros.
- `corelayer-logo-light.svg` — para fundos escuros.
- `favicon-dark.svg` — fundo escuro, texto CL em branco.
- `favicon-light.svg` — fundo claro, texto CL em preto.
- `og-corelayer.png` — 1200×630, para Open Graph / redes sociais.
- `README-DEPLOY.md` — este guia.

## Como usar no Next.js (App Router)

1. Copie os SVGs de logo e favicon para `public/` do seu projeto.
2. No `app/layout.tsx`, ajuste o metadata se quiser:
   ```ts
   export const metadata = {
     metadataBase: new URL('https://corelayer.dev'),
     title: { default: 'Corelayer', template: '%s • Corelayer' },
     description: 'Arquitetura limpa, entrega previsível. Sistemas sob medida para web e mobile.',
     openGraph: {
       title: 'Corelayer',
       description: 'Arquitetura limpa, entrega previsível.',
       url: 'https://corelayer.dev',
       images: [{ url: '/og-corelayer.png', width: 1200, height: 630 }],
     },
     icons: { icon: '/favicon-dark.svg' } // ou /favicon-light.svg
   }
   ```
3. Para o logo no header, importe o SVG ou use inline.
4. Para o OG image, coloque `og-corelayer.png` em `public/`.

## Dica de aplicação

- **Claro**: use `corelayer-logo-dark.svg` (texto preto/graphite).
- **Escuro**: use `corelayer-logo-light.svg` (texto branco).
- Favicons: escolha o que contrasta melhor com o tema do navegador/dispositivo.

## Passo a passo — Deploy Vercel

1. Suba o código no Git (GitHub/GitLab/Bitbucket).
2. Vercel → **New Project** → importe o repositório.
3. Framework **Next.js**. Build: `next build` (padrão). Output: `.next` (padrão).
4. Em **Settings → Domains**, configure seu domínio (opcional).
5. Em **Settings → Git**, habilite auto-deploy a cada push em `main`.
6. Gere a imagem `/public/og-corelayer.png` (já incluída neste pacote) e confirme no `app/layout.tsx`.

## Cores de marca

- Primário CTA: `#1B6AFF`
- Azul 2: `#2780FF`
- Azul 3: `#3B8CFF`
- Fundo escuro: `#0E0E10`
- Texto claro: `#FFFFFF`

---

Qualquer ajuste (variação horizontal, somente ícone, PB), é só avisar.

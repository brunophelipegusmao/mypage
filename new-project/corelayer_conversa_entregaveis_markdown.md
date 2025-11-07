# Corelayer — Conversa + Entregáveis

Documento em **Markdown** com o histórico resumido da conversa e **todos os códigos** entregues (hero, seções, layout, scripts, rotas, assets e automações para deploy). Ideal para salvar no repositório como `docs/corelayer-entregaveis.md`.

---

## 1) Decisões de Branding
- **Nome:** Corelayer  
- **Slogan:** *Arquitetura limpa, entrega previsível.*  
- **Vibe:** engenharia/stack; ótimo para diagramas, cases técnicos e propostas.  
- **Paleta:**  
  - Fundo: `#0E0E10`  
  - Azul 1 (CTA): `#1B6AFF`  
  - Azul 2: `#2780FF`  
  - Azul 3: `#3B8CFF`  
  - Texto: `#FFFFFF` / `white/80` / `white/60`  
- **Logo:** símbolo de **três camadas** (barras azuis) + wordmark CORELAYER.

### Downloads úteis
- Pacote principal: **`corelayer-assets.zip`** (logo dark/light, favicon dark/light, OG)  
  Link: `sandbox:/mnt/data/corelayer-assets.zip`
- Pacote extra: **`corelayer-assets-extra.zip`** (wordmark horizontal, ícone-only PNG 512/192/32, favicon.ico)  
  Link: `sandbox:/mnt/data/corelayer-assets-extra.zip`
- Pacote no‑deps: **`corelayer-branding-no-deps.zip`** (assets prontos + script de cópia sem libs)  
  Link: `sandbox:/mnt/data/corelayer-branding-no-deps.zip`

---

## 2) Hero (HTML + Tailwind)
> Coloque no topo da página. Compatível com **Next.js 15 / React 19** (App Router).

```html
<header class="bg-[#0E0E10] text-white">
  <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
    <div class="flex items-center gap-3">
      <!-- Logo compacta no header -->
      <svg aria-hidden="true" class="h-8 w-8" viewBox="0 0 64 64" fill="none">
        <rect x="10" y="14" width="44" height="10" rx="2" fill="#1B6AFF"/>
        <rect x="14" y="28" width="36" height="10" rx="2" fill="#2780FF"/>
        <rect x="18" y="42" width="28" height="10" rx="2" fill="#3B8CFF"/>
      </svg>
      <span class="font-semibold tracking-tight text-xl">Corelayer</span>
    </div>
    <div class="hidden md:flex items-center gap-8 text-sm text-white/80">
      <a href="#servicos" class="hover:text-white">Serviços</a>
      <a href="#portfolio" class="hover:text-white">Portfólio</a>
      <a href="#contato" class="hover:text-white">Contato</a>
    </div>
  </nav>

  <section class="mx-auto max-w-7xl px-6 pb-24 pt-10 md:pt-16">
    <div class="grid gap-10 md:grid-cols-12 md:gap-8">
      <div class="md:col-span-7">
        <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Arquitetura limpa, entrega previsível.
        </h1>
        <p class="mt-5 max-w-2xl text-white/80">
          Sistemas sob medida para web e mobile. Do planejamento ao deploy, com foco em
          performance, DX e qualidade de produção.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a href="#contato" class="rounded-xl px-5 py-3 text-sm font-medium bg-[#1B6AFF] hover:bg-[#1456CC]">Começar um projeto</a>
          <a href="#portfolio" class="rounded-xl px-5 py-3 text-sm font-medium bg-white/10 hover:bg-white/15">Ver portfólio</a>
        </div>

        <div class="mt-8 flex items-center gap-6 text-xs text-white/60">
          <div class="flex items-center gap-2"><span class="inline-block h-2 w-2 rounded-full bg-[#1B6AFF]"></span>Clean Architecture</div>
          <div class="flex items-center gap-2"><span class="inline-block h-2 w-2 rounded-full bg-[#2780FF]"></span>APIs & Dashboards</div>
          <div class="flex items-center gap-2"><span class="inline-block h-2 w-2 rounded-full bg-[#3B8CFF]"></span>Web & Mobile</div>
        </div>
      </div>

      <div class="md:col-span-5">
        <div class="relative mx-auto w-full max-w-md">
          <div class="absolute -inset-6 rounded-3xl bg-white/5 blur-2xl"></div>
          <div class="relative space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div class="h-3 w-24 rounded bg-[#1B6AFF]/80"></div>
              <div class="mt-4 space-y-2">
                <div class="h-2 w-11/12 rounded bg-white/10"></div>
                <div class="h-2 w-9/12 rounded bg-white/10"></div>
                <div class="h-2 w-10/12 rounded bg-white/10"></div>
              </div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div class="h-3 w-16 rounded bg-[#2780FF]/80"></div>
              <div class="mt-4 grid grid-cols-3 gap-3">
                <div class="h-12 rounded bg-white/10"></div>
                <div class="h-12 rounded bg-white/10"></div>
                <div class="h-12 rounded bg-white/10"></div>
              </div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div class="h-3 w-20 rounded bg-[#3B8CFF]/80"></div>
              <div class="mt-4 space-y-2">
                <div class="h-2 w-10/12 rounded bg-white/10"></div>
                <div class="h-2 w-8/12 rounded bg-white/10"></div>
              </div>
            </div>
          </div>
          <p class="mt-4 text-center text-xs text-white/50">Diagrama ilustrativo de camadas — a sua stack, organizada.</p>
        </div>
      </div>
    </div>
  </section>
</header>
```

---

## 3) Tailwind (cores base)
```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        core: {
          bg: "#0E0E10",
          fg: "#FFFFFF",
          mute: "rgba(255,255,255,0.80)",
          subtle: "rgba(255,255,255,0.60)",
          line: "rgba(255,255,255,0.10)",
          blue1: "#1B6AFF",
          blue2: "#2780FF",
          blue3: "#3B8CFF",
        },
      },
      borderRadius: { xl: "0.875rem", "2xl": "1rem" },
      letterSpacing: { tightish: "-0.02em" },
      boxShadow: { soft: "0 8px 24px rgba(0,0,0,0.25)" },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 4) Página consolidada (`app/page.tsx`) + Layout (`app/layout.tsx`)
> Estrutura com **Hero → Serviços → Portfólio → Contato → Sobre → Footer** e ícones inline.

```tsx
"use client";

export default function Home() {
  return (
    <main>
      <HeaderHero />
      <Services />
      <Portfolio />
      <Contact />
      <About />
      <Footer />
    </main>
  );
}

function HeaderHero() { /* ...conteúdo igual ao HERO acima... */ }

function Services() { /* ...cards de serviços com textos reescritos... */ }

function Portfolio() { /* ...seção com 6 cards e cores blue1/2/3... */ }

function Contact() { /* ...formulário (mock) + InfoRow... */ }

function About() { /* ...texto institucional enxuto... */ }

function Footer() { /* ...rodapé com navegação e copyright... */ }

// Componentes auxiliares: ServiceCard, PortfolioCard, InfoRow, LogoMark, Icones SVG
```

**Layout com metadata, favicons por tema e OG:**
```tsx
// app/layout.tsx
export const metadata = {
  metadataBase: new URL("https://corelayer.dev"),
  title: { default: "Corelayer", template: "%s • Corelayer" },
  description: "Corelayer — Arquitetura limpa, entrega previsível. Sistemas sob medida para web e mobile, do planejamento ao deploy.",
  openGraph: {
    type: "website",
    title: "Corelayer",
    description: "Arquitetura limpa, entrega previsível. Sistemas sob medida para web e mobile.",
    url: "https://corelayer.dev",
    images: [{ url: "/og-corelayer.png", width: 1200, height: 630, alt: "Corelayer — Arquitetura limpa, entrega previsível." }],
  },
  icons: {
    icon: [
      { url: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-multisize.ico", sizes: "any" },
    ],
    apple: [
      { url: "/corelayer-icon-light-192.png", sizes: "192x192" },
      { url: "/corelayer-icon-light-512.png", sizes: "512x512" },
    ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0E10" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh bg-[#0E0E10] text-white antialiased">{children}</body>
    </html>
  );
}
```

> Observação: o `page.tsx` completo está no canvas original para copiar e colar.

---

## 5) Rotas utilitárias (App Router)

### `app/robots.txt/route.ts`
```ts
import { NextResponse } from "next/server";

export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://corelayer.dev/sitemap.xml`;
  return new NextResponse(body, { headers: { "Content-Type": "text/plain" } });
}
```

### `app/sitemap.xml/route.ts`
```ts
import { NextResponse as NextResponse2 } from "next/server";

export function GET() {
  const urls = ["/", "/#servicos", "/#portfolio", "/#contato"]; // ajuste
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map((u) => `<url><loc>https://corelayer.dev${u}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join("") +
    `</urlset>`;
  return new NextResponse2(xml, { headers: { "Content-Type": "application/xml" } });
}
```

### `app/manifest.webmanifest/route.ts`
```ts
import { NextResponse as NextResponse3 } from "next/server";

export function GET() {
  const json = {
    name: "Corelayer",
    short_name: "Corelayer",
    description: "Arquitetura limpa, entrega previsível.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0E10",
    theme_color: "#1B6AFF",
    icons: [
      { src: "/corelayer-icon-light-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/corelayer-icon-light-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/favicon-dark.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }
    ]
  };
  return NextResponse3.json(json);
}
```

---

## 6) Configuração Next/Vercel

### `next.config.mjs`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["lucide-react"] }, // remova se não usar
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  async redirects() {
    return [ { source: "/bgm", destination: "/", permanent: true } ];
  },
};

export default nextConfig;
```

> `vercel.json` é opcional (preferir headers pelo `next.config.mjs`).

---

## 7) Automação de assets (duas opções)

### Opção A — **com dependências** (`sharp` e `png-to-ico`)
**`scripts/generate-assets.mjs`**
```js
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const pub = path.resolve('public');
await fs.mkdir(pub, { recursive: true });

// ... (templates SVG para logos e ícones) ...
// (no canvas há a versão completa com todos os templates e geração de PNG/ICO/OG)

console.log('✅ Assets verificados/gerados em /public');
```

**`package.json`**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "pnpm generate:assets && next build",
    "start": "next start",
    "generate:assets": "node scripts/generate-assets.mjs"
  },
  "devDependencies": {
    "sharp": "^0.33.4",
    "png-to-ico": "^2.1.8"
  }
}
```

### Opção B — **sem dependências** (copia assets prontos)
**`scripts/copy-branding.mjs`**
```js
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const branding = path.resolve(__dirname, '../public-branding');
const pub = path.resolve(process.cwd(), 'public');

async function copyDir(src, dest){
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries){
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()){
      await copyDir(s, d);
    } else {
      await fs.copyFile(s, d);
      console.log('copied', e.name);
    }
  }
}

await copyDir(branding, pub);
console.log('✅ Branding assets copiados para /public');
```

**`package.json`**
```json
{
  "scripts": {
    "branding:copy": "node scripts/copy-branding.mjs",
    "prebuild": "node scripts/copy-branding.mjs",
    "build": "next build"
  }
}
```

> A pasta `public-branding/` vem no zip **no-deps** e contém SVG/PNG/ICO prontos.

---

## 8) Logos e Favicons (SVGs)

### `corelayer-logo-dark.svg`
```svg
<svg width="640" height="140" viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corelayer (dark)">
  <defs><style>.title { font: 700 48px 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; letter-spacing: -0.02em; }</style></defs>
  <g transform="translate(8,22)">
    <rect x="0"  y="0"  rx="6" ry="6" width="96" height="24" fill="#1B6AFF"/>
    <rect x="10" y="28" rx="6" ry="6" width="76" height="24" fill="#2780FF"/>
    <rect x="20" y="56" rx="6" ry="6" width="56" height="24" fill="#3B8CFF"/>
  </g>
  <text x="128" y="82" class="title" fill="#0E0E10">CORELAYER</text>
  <text x="128" y="112" font-size="16" fill="#0E0E10" opacity="0.7">Arquitetura limpa, entrega previsível.</text>
</svg>
```

### `corelayer-logo-light.svg`
```svg
<svg width="640" height="140" viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corelayer (light)">
  <defs><style>.title { font: 700 48px 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; letter-spacing: -0.02em; }</style></defs>
  <g transform="translate(8,22)">
    <rect x="0"  y="0"  rx="6" ry="6" width="96" height="24" fill="#1B6AFF"/>
    <rect x="10" y="28" rx="6" ry="6" width="76" height="24" fill="#2780FF"/>
    <rect x="20" y="56" rx="6" ry="6" width="56" height="24" fill="#3B8CFF"/>
  </g>
  <text x="128" y="82" class="title" fill="#FFFFFF">CORELAYER</text>
  <text x="128" y="112" font-size="16" fill="#FFFFFF" opacity="0.7">Arquitetura limpa, entrega previsível.</text>
</svg>
```

### `favicon-dark.svg`
```svg
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corelayer favicon (dark)">
  <rect width="256" height="256" rx="40" fill="#0E0E10"/>
  <g transform="translate(56,54)">
    <rect x="0"  y="0"  rx="8" width="144" height="28" fill="#1B6AFF"/>
    <rect x="12" y="36" rx="8" width="120" height="28" fill="#2780FF"/>
    <rect x="24" y="72" rx="8" width="96"  height="28" fill="#3B8CFF"/>
  </g>
  <text x="128" y="198" font-family="Inter, system-ui, Arial" font-size="60" font-weight="700" text-anchor="middle" fill="#FFFFFF">CL</text>
</svg>
```

### `favicon-light.svg`
```svg
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corelayer favicon (light)">
  <rect width="256" height="256" rx="40" fill="#FFFFFF"/>
  <g transform="translate(56,54)">
    <rect x="0"  y="0"  rx="8" width="144" height="28" fill="#1B6AFF"/>
    <rect x="12" y="36" rx="8" width="120" height="28" fill="#2780FF"/>
    <rect x="24" y="72" rx="8" width="96"  height="28" fill="#3B8CFF"/>
  </g>
  <text x="128" y="198" font-family="Inter, system-ui, Arial" font-size="60" font-weight="700" text-anchor="middle" fill="#0E0E10">CL</text>
</svg>
```

### Wordmark horizontal (extra)
```svg
<svg width="720" height="140" viewBox="0 0 720 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corelayer horizontal (dark)">
  <defs><style>.title { font: 800 44px 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; letter-spacing: -0.02em; }</style></defs>
  <g transform="translate(8,26)">
    <rect x="0"  y="0"  rx="6" width="88" height="22" fill="#1B6AFF"/>
    <rect x="9"  y="26" rx="6" width="70" height="22" fill="#2780FF"/>
    <rect x="18" y="52" rx="6" width="52" height="22" fill="#3B8CFF"/>
  </g>
  <text x="124" y="84" class="title" fill="#0E0E10">CORELAYER</text>
</svg>
```

---

## 9) Checklist de Deploy
1. Copiar `app/layout.tsx` e `app/page.tsx` → **App Router** ok.  
2. Criar rotas `robots.txt`, `sitemap.xml`, `manifest.webmanifest`.  
3. Definir favicons (dark/light/ico) e OG image.  
4. Escolher automação de assets (com **sharp** ou **no-deps**).  
5. **Vercel**: importar repo, `next build`, domínio, auto‑deploy no `main`.  

---

## 10) Observações finais
- A marca **Corelayer** está preparada para **consultoria e produto**.  
- Paleta em **preto + azuis técnicos** comunica seriedade e TI.  
- O símbolo de **camadas** funciona como favicon, loader e marca d’água em cards/cases.  

> Qualquer ajuste (ex.: menu com sticky, seção de “Cases” detalhada ou página **/propostas** em PDF/HTML), podemos estender com o mesmo sistema de cores e layout.


import { Metadata } from "next";
import Image from "next/image";

import { ServiceCard } from "@/components";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços em engenharia de produto e sistemas com foco em Next.js full-stack, SEO técnico, clareza estrutural e evolução sustentável da base.",
  keywords: [
    "serviços digitais",
    "next.js full-stack",
    "seo técnico",
    "arquitetura enxuta",
    "engenharia de produto",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Serviços | Bruno Mulim",
    description:
      "Serviços voltados a estruturação, evolução e operação de produtos digitais em Next.js full-stack.",
    url: buildAbsoluteUrl("/services"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços | Bruno Mulim",
    description:
      "Estrutura técnica, SEO e evolução de produto em uma base Next.js full-stack.",
  },
};

const services = [
  {
    title: "Base institucional com direção clara",
    description:
      "Estruturação de sites e experiências públicas com foco em mensagem, legibilidade, performance e margem de evolução.",
    features: [
      "Next.js + React + TypeScript",
      "Design responsivo e UI orientada a produto",
      "Animações e hierarquia visual sem excesso",
      "SEO técnico e metadata consistente",
    ],
  },
  {
    title: "Saneamento estrutural e SEO técnico",
    description:
      "Correção de drift, naming, crawlability e pontos que travam a evolução segura da base.",
    features: [
      "Canonical, Open Graph e Twitter alinhados",
      "robots.ts e sitemap.ts como fonte única",
      "Manifest e headers sem duplicidade",
      "README coerente com a realidade",
    ],
  },
  {
    title: "Preparação para produto simples",
    description:
      "Base pensada para receber blog, dashboard privado, autenticação do proprietário e dados persistidos sem recomeçar do zero.",
    features: [
      "Arquitetura em Next.js full-stack",
      "App Router com Route Handlers",
      "Crescimento em um único deploy",
      "Prioridade para simplicidade operacional",
    ],
  },
];

const stackTags = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "Framer Motion",
  "Metadata API",
  "SEO técnico",
  "App Router",
  "Vercel",
];

const delayClasses = [
  "animate-delay-200",
  "animate-delay-300",
  "animate-delay-400",
];

const serviceVisuals = [
  {
    src: "/illustrations/tech-command-center.svg",
    alt: "Painel moderno de monitoramento para aplicações web",
    label: "Web Apps",
  },
  {
    src: "/illustrations/mobile-cloud.svg",
    alt: "Fluxo visual de operação digital com interfaces conectadas",
    label: "Estrutura pronta para crescer",
  },
  {
    src: "/og-image.svg",
    alt: "Identidade visual do site pessoal e profissional",
    label: "Identidade técnica limpa",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground tech-page min-h-screen px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="tech-panel mb-10 md:mb-12">
          <span className="text-primary text-xs tracking-[0.18em] uppercase">
            Serviços
          </span>
          <h1 className="mt-3 text-balance text-4xl leading-tight font-bold md:text-5xl">
            Serviços para organizar a base antes de acelerar a entrega.
          </h1>
          <p className="text-foreground/75 mt-4 max-w-3xl text-base md:text-lg">
            O trabalho aqui é menos sobre empilhar ferramentas e mais sobre
            garantir uma base coerente, sustentável e pronta para evoluir em
            Next.js full-stack.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {stackTags.map((tag) => (
              <span key={tag} className="tech-chip">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {serviceVisuals.map((visual, index) => (
              <article
                key={visual.src}
                className={`tech-panel animate-fade-in-up ${delayClasses[index]}`}
              >
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    width={960}
                    height={640}
                    className="h-40 w-full object-cover"
                  />
                </div>
                <p className="text-foreground/80 mt-3 text-sm font-medium">
                  {visual.label}
                </p>
              </article>
            ))}
          </div>

          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              features={service.features}
              animation={`animate-fade-in-up ${delayClasses[index]}`}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

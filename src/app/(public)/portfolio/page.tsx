import { Metadata } from "next";

import { ProjectCard } from "@/components";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Projetos selecionados com foco em produto, interfaces web, SEO técnico e evolução prática de aplicações modernas.",
  keywords: [
    "portfólio",
    "next.js",
    "react",
    "typescript",
    "produto digital",
    "seo técnico",
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfólio | Bruno Mulim",
    description:
      "Projetos recentes com foco em produto, execução visual e construção prática de interfaces.",
    url: buildAbsoluteUrl("/portfolio"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio | Bruno Mulim",
    description:
      "Seleção de projetos com foco em produto, execução visual e clareza técnica.",
  },
};

const projects = [
  {
    title: "Chronos Pomodoro - Timer de Produtividade",
    description:
      "Aplicação da técnica Pomodoro com controle de ciclos, histórico de sessões e navegação SPA para uso diário de foco.",
    technologies: [
      "React 19",
      "TypeScript",
      "Vite 7",
      "React Router 7",
      "date-fns",
      "Lucide React",
    ],
    image: "/covers/chronos-pomodoro-og.png",
    placeholderImage: "/covers/chronos-pomodoro-og.png",
    projectUrl: "https://chronospomodoro.vercel.app/",
    githubUrl: "https://github.com/brunophelipegusmao/chronos-pomodoro",
  },
  {
    title: "Aura Frontend - Plataforma Web",
    description:
      "Frontend moderno com navegação fluida, transições de página e experiência responsiva baseada em stack React/Next atual.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "MUI 7",
      "Tailwind CSS 4",
      "Framer Motion",
      "Swup",
    ],
    image: "/covers/aura-frontend-og.png",
    placeholderImage: "/covers/aura-frontend-og.png",
    projectUrl: "https://aura-frontend-lovat.vercel.app",
    githubUrl: "https://github.com/brunophelipegusmao/aura-frontend",
  },
  {
    title: "JM Store - E-commerce de Suplementos",
    description:
      "Loja online com catálogo de 500+ produtos, carrinho, avaliações e fluxo de compra orientado a conversão.",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Tailwind CSS",
      "Shadcn/ui",
      "Auth.js",
    ],
    image: "/ChatGPT Image 12 de nov. de 2025, 09_34_50.png",
    placeholderImage: "/ChatGPT Image 12 de nov. de 2025, 09_34_50.png",
    projectUrl: "https://ecommerce-jm.vercel.app/",
    githubUrl: "https://github.com/brunophelipegusmao/ecommerce-jm",
  },
  {
    title: "daCoach Confeitaria Fina - E-commerce Artesanal",
    description:
      "Website institucional com catálogo, integração com WhatsApp e painel administrativo para gestão de produtos e categorias.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "Turbopack",
    ],
    image: "/dacoachsimp.png",
    placeholderImage: "/dacoachsimp.png",
    projectUrl: "https://dacoach-confeitariafina.vercel.app/",
    githubUrl: "https://github.com/brunophelipegusmao/dacoach-confeitariafina",
  },
  {
    title: "JM Studio Fitness - Gestão de Academia",
    description:
      "Sistema para academias com controle de alunos, check-ins, gestão financeira e dashboards por perfil de usuário.",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Tailwind CSS",
      "JWT",
      "Shadcn/ui",
    ],
    image: "/covers/jmstudio.svg",
    placeholderImage: "/covers/jmstudio.svg",
    projectUrl: "https://www.jmfitnessstudio.com.br",
    githubUrl: "https://github.com/brunophelipegusmao/jm-bmstudiofitness",
  },
];

const stackTags = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Drizzle ORM",
  "PostgreSQL",
  "Auth.js",
  "SEO técnico",
];

const delayClasses = [
  "animate-delay-200",
  "animate-delay-300",
  "animate-delay-400",
  "animate-delay-500",
  "animate-delay-600",
  "animate-delay-700",
];

export default function PortfolioPage() {
  return (
    <main className="bg-background text-foreground tech-page min-h-screen px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="tech-panel mb-10 md:mb-12">
          <span className="text-primary text-xs tracking-[0.18em] uppercase">
            Projetos e execução
          </span>
          <h1 className="mt-3 text-4xl leading-tight font-bold text-balance md:text-5xl">
            Portfólio com foco em produto, clareza e entrega utilizável.
          </h1>
          <p className="text-foreground/75 mt-4 max-w-3xl text-base md:text-lg">
            A seleção abaixo prioriza projetos que ajudam a entender meu recorte
            atual: interfaces web, estrutura técnica enxuta e evolução orientada
            a produto.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {stackTags.map((tag) => (
              <span key={tag} className="tech-chip">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              placeholderImage={project.placeholderImage}
              href={project.projectUrl}
              githubUrl={project.githubUrl}
              animation={`animate-fade-in-up ${delayClasses[index % delayClasses.length]}`}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

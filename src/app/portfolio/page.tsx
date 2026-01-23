import { Metadata } from "next";

import { ProjectCard } from "@/components";

export const metadata: Metadata = {
  title: "Portfólio - Corelayer | Projetos Desenvolvidos",
  description:
    "Conheça os projetos desenvolvidos pela Corelayer. Sistemas web completos, e-commerce, aplicações modernas com Next.js, React e TypeScript.",
  keywords:
    "portfólio, projetos web, next.js, react, typescript, e-commerce, sistema academia, desenvolvimento full stack",
  openGraph: {
    title: "Portfólio - Corelayer",
    description: "Conheça os projetos desenvolvidos pela Corelayer",
    url: "https://bgm-tecnologia.vercel.app/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio - Corelayer",
    description: "Conheça os projetos desenvolvidos pela Corelayer",
  },
};

export default function PortfolioPage() {
  const projects = [
    {
      title: "JM Store - E-commerce de Suplementos",
      description:
        "Loja online completa para venda de suplementos alimentares com catálogo de 500+ produtos, sistema de categorias, carrinho de compras, avaliações de clientes e gestão de pedidos. Interface moderna e responsiva com foco em conversão.",
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
      projectUrl: "https://ecommerce-jm-6l3x.vercel.app/",
      githubUrl: "https://github.com/bmulim/ecommerce-jm",
    },
    {
      title: "Navarro Advocacia - Website Institucional",
      description:
        "Website institucional moderno para escritório de advocacia especializado em Direito Empresarial, Civil e Trabalhista. Blog jurídico com sistema de gestão de conteúdo, painel administrativo completo e integração com modo dark/light.",
      technologies: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "NestJS",
        "Tailwind CSS 4",
        "Turbopack",
        "SSG",
      ],
      image: "/navarro.png",
      placeholderImage: "/navarro.png",
      projectUrl: "https://navarro-adv.vercel.app/",
      githubUrl: "https://github.com/bmulim/navarro_adv",
    },
    {
      title: "daCoach Confeitaria Fina - E-commerce Artesanal",
      description:
        "Website institucional para confeitaria artesanal com catálogo de produtos (doces e salgados), integração direta com WhatsApp, painel administrativo para gestão de produtos e categorias. Design elegante com animações fluidas.",
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
      githubUrl: "https://github.com/bmulim/dacoach-confeitariafina",
    },
    {
      title: "JM Studio Fitness - Sistema de Gerenciamento de Academia",
      description:
        "Sistema completo de gerenciamento para academias com controle de alunos, check-ins automáticos, gestão financeira e dashboards administrativos. Inclui 3 tipos de usuário (Admin, Professor, Aluno) com sistema de permissões robusto.",
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
      githubUrl: "https://github.com/bmulim/jm-bmstudiofitness",
    },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-primary animate-fade-in mb-8 text-center text-4xl font-bold">
          Portfólio
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              placeholderImage={project.placeholderImage}
              href={project.projectUrl}
              animation={`animate-fade-in-up animation-delay-${200 + index * 100}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

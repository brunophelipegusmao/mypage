import { Metadata } from "next";

import { ProjectCard } from "@/components";

export const metadata: Metadata = {
  title: "Portfólio - BGM Tecnologia Web | Projetos Desenvolvidos",
  description:
    "Conheça os projetos desenvolvidos por Bruno Gusmão Mulim. Sistemas web completos, aplicações modernas com Next.js, React e TypeScript.",
  keywords:
    "portfólio, projetos web, next.js, react, typescript, sistema academia, desenvolvimento full stack",
  openGraph: {
    title: "Portfólio - BGM Tecnologia Web",
    description: "Conheça os projetos desenvolvidos por Bruno Gusmão Mulim",
    url: "https://bgm-tecnologia.vercel.app/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio - BGM Tecnologia Web",
    description: "Conheça os projetos desenvolvidos por Bruno Gusmão Mulim",
  },
};

export default function PortfolioPage() {
  const projects = [
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
      projectUrl: "https://github.com/bmulim/jm-bmstudiofitness",
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

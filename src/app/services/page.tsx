import { Metadata } from "next";
import Image from "next/image";

import { ServiceCard } from "@/components";

export const metadata: Metadata = {
  title: "Serviços - Corelayer | Desenvolvimento e Consultoria",
  description:
    "Serviços de desenvolvimento web, backend, mobile e consultoria técnica com foco em análise de sistemas, performance e escalabilidade.",
  keywords:
    "desenvolvimento web, consultoria técnica, next.js, react, nestjs, typescript, integração de sistemas, análise de sistemas",
  openGraph: {
    title: "Serviços - Corelayer",
    description: "Desenvolvimento e consultoria técnica para produtos digitais",
    url: "https://bgm-tecnologia.vercel.app/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços - Corelayer",
    description: "Desenvolvimento e consultoria técnica para produtos digitais",
  },
};

const services = [
  {
    title: "Produtos Web de Alta Conversão",
    description:
      "Criação de aplicações web modernas com foco em experiência fluida, performance e evolução contínua.",
    features: [
      "Next.js + React + TypeScript",
      "Design responsivo e UI orientada a produto",
      "Animações com Framer Motion e transições avançadas",
      "SEO técnico e otimização de Core Web Vitals",
    ],
  },
  {
    title: "Backends e APIs Escaláveis",
    description:
      "Análise técnica e implementação de APIs robustas para sistemas com regras de negócio complexas.",
    features: [
      "NestJS para camadas de domínio bem definidas",
      "PostgreSQL e modelagem orientada a produção",
      "Drizzle ORM com migrações seguras",
      "Autenticação com Better Auth/Auth.js e JWT",
    ],
  },
  {
    title: "Automação e Operação Técnica",
    description:
      "Integração entre sistemas, automações e suporte técnico para acelerar operação e entrega.",
    features: [
      "Workflows com n8n para processos recorrentes",
      "Integrações com serviços de terceiros",
      "Ajustes de performance e observabilidade",
      "Consultoria técnica e code review",
    ],
  },
];

const stackTags = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "Framer Motion",
  "NestJS",
  "Drizzle ORM",
  "PostgreSQL",
  "Better Auth",
  "React Native",
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
    src: "/illustrations/api-topology.svg",
    alt: "Topologia de integração entre serviços de backend e banco de dados",
    label: "APIs Escaláveis",
  },
  {
    src: "/illustrations/mobile-cloud.svg",
    alt: "Aplicação mobile conectada a serviços em nuvem",
    label: "Mobile + Cloud",
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
            Análise e desenvolvimento de sistemas com resultado real.
          </h1>
          <p className="text-foreground/75 mt-4 max-w-3xl text-base md:text-lg">
            Atuação independente do frontend ao backend, com soluções completas
            em stacks modernas e padrão de qualidade consistente entre design e
            código.
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

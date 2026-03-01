"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Code2,
  Database,
  Rocket,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";
import Image from "next/image";

import Button from "@/components/Button";

const highlights = [
  {
    label: "Repositórios públicos",
    value: "20+",
    icon: Boxes,
  },
  {
    label: "Stack full cycle",
    value: "Web + Mobile + API",
    icon: Workflow,
  },
  {
    label: "Foco de entrega",
    value: "Performance e DX",
    icon: Rocket,
  },
];

const techGroups = [
  {
    title: "Frontend",
    icon: Code2,
    items: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "MUI 7",
      "Swup",
    ],
  },
  {
    title: "Backend e Dados",
    icon: Database,
    items: [
      "NestJS",
      "Drizzle ORM",
      "PostgreSQL",
      "Better Auth",
      "JWT",
      "Zod",
    ],
  },
  {
    title: "Mobile e Automação",
    icon: Smartphone,
    items: [
      "React Native",
      "React Navigation",
      "n8n Workflows",
      "Integrações com APIs",
    ],
  },
];

const deliveryFlow = [
  {
    title: "Análise de Requisitos",
    description: "Mapeamento de domínio, riscos e prioridades de produto.",
  },
  {
    title: "Construção",
    description: "Implementação incremental com foco em legibilidade e escala.",
  },
  {
    title: "Operação",
    description: "Deploy, observabilidade e ajustes orientados por uso real.",
  },
];

export default function HomeExperience() {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <main className="bg-background text-foreground tech-page relative min-h-screen overflow-hidden">
      <section className="relative px-4 pb-20 pt-20 md:pb-24 md:pt-28">
        <div className="tech-grid-overlay" aria-hidden />
        <div className="tech-spotlight pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            }
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary"
          >
            <ShieldCheck className="h-4 w-4" />
            Analista de Sistemas com execução previsível
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <h1 className="text-balance text-4xl leading-tight font-bold md:text-5xl">
                Produto digital com
                <span className="text-gradient-primary"> visual moderno</span>,
                análise técnica e stack real de produção.
              </h1>

              <p className="text-foreground/75 mt-6 max-w-2xl text-lg leading-relaxed">
                Atuo de forma independente como Analista de Sistemas e
                Desenvolvedor, criando sistemas web, mobile e APIs com foco em
                performance, manutenção e experiência de uso.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href="/portfolio"
                  variant="primary"
                  size="lg"
                  className="inline-flex items-center gap-2"
                >
                  Explorar Portfólio
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Iniciar Projeto
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 26 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
              }
              className="tech-panel"
            >
              <div className="mb-5 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/illustrations/tech-command-center.svg"
                  alt="Painel tecnológico com métricas de produto e monitoramento"
                  width={960}
                  height={640}
                  className="h-44 w-full object-cover"
                  priority
                />
              </div>
              <h2 className="mb-5 text-lg font-semibold">Snapshot Técnico</h2>
              <div className="space-y-3">
                {highlights.map((highlight) => {
                  const Icon = highlight.icon;

                  return (
                    <div
                      key={highlight.label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="text-primary h-4 w-4" />
                        <span className="text-sm">{highlight.label}</span>
                      </div>
                      <strong className="text-gradient-primary text-sm font-semibold">
                        {highlight.value}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        {...revealProps}
        className="relative mx-auto max-w-6xl px-4 pb-20 md:pb-24"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Stack que eu uso nos meus repositórios
          </h2>
          <p className="text-foreground/70 mt-3">
            Tecnologias aplicadas nos projetos que mantenho no GitHub e
            refletidas no posicionamento visual do site.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {techGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.title}
                initial={
                  shouldReduceMotion ? undefined : { opacity: 0, y: 24 }
                }
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 0.65, delay: 0.1 + index * 0.08 }
                }
                className="tech-panel h-full"
              >
                <div className="mb-5 flex items-center gap-2">
                  <span className="bg-primary/15 text-primary rounded-lg p-2">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tech-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        {...revealProps}
        className="relative mx-auto max-w-6xl px-4 pb-24"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Fluxo de execução</h2>
          <p className="text-foreground/70 mt-3">
            Estrutura de entrega orientada a previsibilidade, sem sacrificar
            velocidade.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {deliveryFlow.map((step, index) => (
            <motion.div
              key={step.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.6, delay: 0.1 + index * 0.08 }
              }
              className="tech-panel h-full"
            >
              <span className="text-primary/80 text-xs tracking-[0.18em] uppercase">
                Etapa {index + 1}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-foreground/75 mt-3">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

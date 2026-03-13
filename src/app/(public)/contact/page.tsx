import { Metadata } from "next";
import Image from "next/image";

import {
  AvailabilityCard,
  ContactForm,
  ContactInfoCard,
  type ContactInfoProps,
  SocialLinksCard,
} from "@/components";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Canal direto para conversar sobre projetos, saneamento estrutural, SEO técnico e evolução de produto em Next.js.",
  keywords: [
    "contato",
    "bruno mulim",
    "next.js",
    "seo técnico",
    "consultoria",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contato | Bruno Mulim",
    description:
      "Canal direto para discutir projetos, ajustes estruturais e evolução técnica da base.",
    url: buildAbsoluteUrl("/contact"),
  },
  twitter: {
    card: "summary",
    title: "Contato | Bruno Mulim",
    description:
      "Contato direto para discutir projetos, estrutura técnica e próximos passos.",
  },
};

export default function ContactPage() {
  const contactInfo: ContactInfoProps[] = [
    { icon: "📧", label: "bruno.mulim.prog@gmail.com" },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 text-green-500"
          fill="currentColor"
        >
          <path d="M12 2a10 10 0 0 0-8.58 15.13L2 22l4.98-1.31A10 10 0 1 0 12 2m0 18.18c-1.6 0-3.15-.43-4.5-1.24l-.32-.19-2.95.78.79-2.88-.2-.34A8.18 8.18 0 1 1 12 20.18m4.49-6.14c-.25-.13-1.48-.73-1.71-.81-.23-.08-.39-.13-.55.12-.16.25-.64.81-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.52.12-.12.25-.29.37-.43.12-.15.16-.25.25-.41.08-.16.04-.31-.02-.44-.06-.13-.55-1.33-.76-1.82-.2-.48-.41-.41-.55-.41h-.47c-.16 0-.41.06-.63.31s-.82.8-.82 1.95.84 2.26.96 2.42c.12.16 1.65 2.52 4 3.53.56.24 1 .38 1.34.49.56.18 1.07.16 1.48.1.45-.07 1.39-.57 1.58-1.13.2-.56.2-1.04.14-1.13-.06-.1-.22-.16-.47-.29" />
        </svg>
      ),
      label: "WhatsApp: (21) 99870-8634",
      href: "https://wa.me/5521998708634",
    },
    { icon: "📍", label: "Rio de Janeiro, RJ - Brasil" },
    { icon: "💼", label: "LinkedIn: /in/bruno-mulim" },
  ];

  const availability = [
    { day: "Segunda - Sexta", time: "9h às 18h", available: true },

    { day: " Sábado e Domingo", time: "Indisponível", available: false },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/brunophelipegusmao" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/bruno-mulim/" },
  ];

  const stackTags = [
    "Next.js",
    "React",
    "TypeScript",
    "SEO técnico",
    "App Router",
    "Tailwind CSS",
  ];

  return (
    <main className="bg-background text-foreground tech-page min-h-screen px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="tech-panel animate-fade-in mb-10 md:mb-12">
          <span className="text-primary text-xs tracking-[0.18em] uppercase">
            Contato
          </span>
          <h1 className="mt-3 text-balance text-4xl leading-tight font-bold md:text-5xl">
            Contato direto, com envio real no servidor.
          </h1>
          <p className="text-foreground/75 mt-4 max-w-3xl text-base md:text-lg">
            Compartilhe o contexto do seu projeto. Atuo sozinho como Analista de
            Sistemas e Desenvolvedor, com foco em clareza técnica,
            previsibilidade e entrega utilizável. O formulário público deste
            site envia a mensagem no servidor, sem depender de cliente de email
            local e sem se misturar com auth, dashboard ou administração.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {stackTags.map((tag) => (
              <span key={tag} className="tech-chip">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ContactForm animation="animate-fade-in-up animate-delay-200" />

          <div className="animate-fade-in-up animate-delay-400 space-y-6">
            <article className="tech-panel">
              <div className="overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/illustrations/mobile-cloud.svg"
                  alt="Fluxo visual de trabalho digital e coordenação de interfaces"
                  width={960}
                  height={640}
                  className="h-44 w-full object-cover"
                />
              </div>
              <p className="text-foreground/80 mt-3 text-sm">
                O contato público usa um fluxo server-side isolado, com entrega
                de email dedicada e sem acoplamento com o restante do produto.
              </p>
            </article>

            <ContactInfoCard contacts={contactInfo} />

            <AvailabilityCard
              availability={availability}
              description="Estou disponível para novos projetos e consultorias. Respondo todas as mensagens em até 24 horas."
            />

            <SocialLinksCard links={socialLinks} />
          </div>
        </section>
      </div>
    </main>
  );
}

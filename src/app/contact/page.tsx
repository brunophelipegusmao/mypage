import { Metadata } from "next";

import {
  AvailabilityCard,
  ContactForm,
  ContactInfoCard,
  SocialLinksCard,
} from "@/components";

export const metadata: Metadata = {
  title: "Contato - BGM Tecnologia Web | Entre em Contato",
  description:
    "Entre em contato com Bruno Gusmão Mulim para projetos de desenvolvimento web, consultoria técnica e soluções personalizadas. Resposta em até 24 horas.",
  keywords:
    "contato, bruno mulim, desenvolvedor, consultoria, orçamento, projeto web, desenvolvimento",
  openGraph: {
    title: "Contato - BGM Tecnologia Web",
    description:
      "Entre em contato para projetos e consultoria em desenvolvimento web",
    url: "https://bgm-tecnologia.vercel.app/contact",
  },
  twitter: {
    card: "summary",
    title: "Contato - BGM Tecnologia Web",
    description:
      "Entre em contato para projetos e consultoria em desenvolvimento web",
  },
};

export default function ContactPage() {
  const contactInfo = [
    { icon: "📧", label: "bruno.mulim.prog@gmail.com" },
    { icon: "📱", label: "(21) 99870-8634" },
    { icon: "📍", label: "Rio de Janeiro, RJ - Brasil" },
    { icon: "💼", label: "LinkedIn: /in/bruno-mulim" },
  ];

  const availability = [
    { day: "Segunda - Sexta", time: "9h às 18h", available: true },

    { day: " Sábado e Domingo", time: "Indisponível", available: false },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/bmulim" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/bruno-mulim/" },
    { name: "Instagram", href: "https://instagram.com/brunopmulim" },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-primary fade-in mb-8 text-center text-4xl font-bold">
          Entre em Contato
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Formulário de Contato */}
          <ContactForm animation="fade-in-up animate-delay-200" />

          {/* Informações de Contato */}
          <div className="fade-in-up animate-delay-400 space-y-6">
            <ContactInfoCard contacts={contactInfo} />

            <AvailabilityCard
              availability={availability}
              description="Estou disponível para novos projetos e consultorias. Respondo todas as mensagens em até 24 horas."
            />

            <SocialLinksCard links={socialLinks} />
          </div>
        </div>
      </div>
    </main>
  );
}

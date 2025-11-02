import { Metadata } from "next";

import { Button, Card, CardContent, CardTitle } from "@/components";

export const metadata: Metadata = {
  title: "BGM Tecnologia Web - Bruno Gusmão Mulim | Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack especializado em Next.js, React e TypeScript. Criação de websites modernos, aplicações web e consultoria técnica no Rio de Janeiro.",
  keywords:
    "bruno gusmão mulim, desenvolvedor full stack, next.js, react, typescript, desenvolvimento web, rio de janeiro, bgm tecnologia",
  openGraph: {
    title: "BGM Tecnologia Web - Desenvolvedor Full Stack",
    description:
      "Soluções modernas em desenvolvimento web com Next.js, React e TypeScript",
    url: "https://bgm-tecnologia.vercel.app",
    images: [
      {
        url: "/og-image.svg", // Atualizado para SVG
        width: 1200,
        height: 630,
        alt: "BGM Tecnologia Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BGM Tecnologia Web - Desenvolvedor Full Stack",
    description: "Soluções modernas em desenvolvimento web",
  },
};

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-primary animate-fade-in mb-6 text-4xl font-bold md:text-6xl">
            Bem-vindo a BGM Tecnologia Web
          </h1>
          <p className="text-foreground/80 animate-fade-in animation-delay-300 mb-8 text-xl md:text-2xl">
            Desenvolvedor Full Stack especializado em soluções modernas e
            inovadoras
          </p>
          <div className="animate-fade-in animation-delay-600 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/portfolio" variant="primary" size="lg">
              Ver Portfólio
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Entre em Contato
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/20 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-foreground animate-slide-up mb-12 text-center text-3xl font-bold md:text-4xl">
            Serviços Oferecidos
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full max-w-sm md:w-80">
              <Card
                animation="animate-fade-in-up animation-delay-200"
                className="h-full text-center"
              >
                <CardTitle className="text-center">
                  Desenvolvimento Web
                </CardTitle>
                <CardContent className="text-center">
                  Criação de websites e aplicações web modernas, responsivas e
                  otimizadas.
                </CardContent>
              </Card>
            </div>

            <div className="w-full max-w-sm md:w-80">
              <Card
                animation="animate-fade-in-up animation-delay-600"
                className="h-full text-center"
              >
                <CardTitle className="text-center">Consultoria Tech</CardTitle>
                <CardContent className="text-center">
                  Assessoria em tecnologia e arquitetura de sistemas para sua
                  empresa.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Demo do Header Responsivo */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-foreground animate-slide-up mb-6 text-3xl font-bold">
            Análise e Desenvolmimento de Sistemas
          </h2>
          <p className="text-foreground/80 animate-fade-in animation-delay-200 mb-8 text-lg">
            Criamos sistemas personalisados de acordo com a sua necessidade
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card
              variant="muted"
              animation="animate-slide-in-left animation-delay-400"
            >
              <CardTitle className="text-muted-foreground mb-3">
                Sites e LandigPages
              </CardTitle>
              <CardContent className="text-muted-foreground/80">
                Para apresentação e oferecimento de serviços
              </CardContent>
            </Card>
            <Card
              variant="muted"
              animation="animate-slide-in-right animation-delay-600"
            >
              <CardTitle className="text-muted-foreground mb-3">
                Smartphones
              </CardTitle>
              <CardContent className="text-muted-foreground/80">
                Deixamos todos essas páginas responsivas e utilizáveis no
                smartphones e tablets
              </CardContent>
            </Card>
          </div>
          <p className="text-foreground/60 animation-delay-1000 mt-8 animate-bounce text-sm">
            💡 Redimensione a janela ou use as ferramentas de desenvolvedor para
            testar a responsividade
          </p>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-primary mb-6 text-4xl font-bold md:text-6xl">
            Bem-vindo ao meu portfólio
          </h1>
          <p className="text-foreground/80 mb-8 text-xl md:text-2xl">
            Desenvolvedor Full Stack especializado em soluções modernas e
            inovadoras
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/portfolio"
              className="bg-primary text-primary-foreground rounded-lg px-8 py-3 font-semibold transition-opacity hover:opacity-90"
            >
              Ver Portfólio
            </Link>
            <Link
              href="/contact"
              className="bg-secondary text-secondary-foreground rounded-lg px-8 py-3 font-semibold transition-opacity hover:opacity-90"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/20 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
            Serviços Oferecidos
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card text-card-foreground border-border rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Desenvolvimento Web
              </h3>
              <p className="text-card-foreground/80">
                Criação de websites e aplicações web modernas, responsivas e
                otimizadas.
              </p>
            </div>
            <div className="bg-card text-card-foreground border-border rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">Aplicações Mobile</h3>
              <p className="text-card-foreground/80">
                Desenvolvimento de aplicativos nativos e híbridos para iOS e
                Android.
              </p>
            </div>
            <div className="bg-card text-card-foreground border-border rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">Consultoria Tech</h3>
              <p className="text-card-foreground/80">
                Assessoria em tecnologia e arquitetura de sistemas para sua
                empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo do Header Responsivo */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-foreground mb-6 text-3xl font-bold">
            Header Responsivo Implementado
          </h2>
          <p className="text-foreground/80 mb-8 text-lg">
            O header se adapta automaticamente a diferentes tamanhos de tela:
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-muted-foreground mb-3 text-xl font-semibold">
                Desktop & Tablet
              </h3>
              <p className="text-muted-foreground/80">
                Navegação tradicional com links visíveis e logo completo
              </p>
            </div>
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-muted-foreground mb-3 text-xl font-semibold">
                Smartphone
              </h3>
              <p className="text-muted-foreground/80">
                Menu hambúrguer com animação suave e overlay de fundo
              </p>
            </div>
          </div>
          <p className="text-foreground/60 mt-8 text-sm">
            💡 Redimensione a janela ou use as ferramentas de desenvolvedor para
            testar a responsividade
          </p>
        </div>
      </section>
    </main>
  );
}
